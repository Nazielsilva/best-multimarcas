import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Lock, LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff, X, Upload, LayoutDashboard, Package, Settings, Search } from 'lucide-react';
import Mascots from '../components/Mascots';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('admin@bestmultimarcas.com');
  const [password, setPassword] = useState('Best@2025');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Camisetas', image: null });
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchProducts();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProducts = async () => {
    // Busca produtos (a implementar integração real em breve)
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;
    
    setIsUploading(true);
    let imageUrl = '';

    try {
      if (newProduct.image) {
        const imageRef = ref(storage, `products/${Date.now()}_${newProduct.image.name}`);
        const uploadTask = await uploadBytesResumable(imageRef, newProduct.image);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        image: imageUrl,
        createdAt: new Date()
      });

      setNewProduct({ name: '', price: '', category: 'Camisetas', image: null });
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Firebase error:', err.code, err.message);
      setError(`Erro: ${err.code}`);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Carregando painel...</div>;
  }

  // --- TELA DE LOGIN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <div className="w-full bg-white p-10 rounded-[2rem] shadow-xl relative overflow-hidden" style={{ maxWidth: '420px', border: '1px solid #f3f4f6' }}>

          <Mascots isPasswordFocused={isPasswordFocused} />

          <h1 className="text-2xl font-bold text-zinc-900 text-center mb-2 font-sans tracking-tight">Olá, que bom te ver!</h1>
          <p className="text-zinc-400 text-center mb-8 text-xs font-semibold uppercase tracking-wider">Gestão da Loja · Best Multimarcas</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">E-mail</label>
              <input
                type="email"
                placeholder="E-mail do administrador"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center font-semibold bg-red-50 py-2 rounded-xl">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-all duration-200 mt-2 text-sm tracking-wide shadow-md"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TELA DO PAINEL (DASHBOARD) COM SIDEBAR ---
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden selection:bg-amber-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950/50 border-r border-zinc-800/50 flex flex-col justify-between hidden md:flex z-10 backdrop-blur-xl relative">
        {/* Efeito de luz sutil no fundo da sidebar */}
        <div className="absolute top-0 left-0 w-full h-32 bg-amber-500/5 blur-[80px] -z-10 rounded-full" />
        
        <div className="p-6">
          <div className="mb-10">
            <h1 className="text-xl font-black text-white tracking-tighter">BEST<span className="text-amber-500">MULTIMARCAS</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Admin Pro</p>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-500 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all">
              <LayoutDashboard className="w-5 h-5" />
              Visão Geral
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl transition-all">
              <Package className="w-5 h-5" />
              Meus Produtos
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
              Configurações
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin</p>
              <p className="text-xs text-zinc-500 truncate max-w-[120px]">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 py-3 rounded-xl transition-all text-sm font-semibold border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Glow de fundo na área principal */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
          
          {/* HEADER DO CONTEÚDO */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-white">Estoque Atual</h2>
              <p className="text-zinc-400 text-sm mt-1">Gerencie seu catálogo de roupas e acessórios.</p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar peça..." 
                  className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 backdrop-blur-md transition-all"
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">NOVO PRODUTO</span>
              </button>
            </div>
          </header>

          {/* ESTATÍSTICAS (GLASSMORPHISM) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-6 rounded-3xl hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total de Peças</p>
                  <p className="text-3xl font-black mt-1">{products.length}</p>
                </div>
              </div>
            </div>
            {/* Espaços para mais estatísticas futuras */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-6 rounded-3xl opacity-50">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Valor em Estoque</p>
              <p className="text-lg font-medium text-zinc-400">Em breve...</p>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-6 rounded-3xl opacity-50">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Mais Vendido</p>
              <p className="text-lg font-medium text-zinc-400">Em breve...</p>
            </div>
          </div>

          {/* LISTA DE PRODUTOS */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-900/20">
              <h3 className="font-bold text-lg">Catálogo Recente</h3>
            </div>
            
            <div className="p-6">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-zinc-500 border-2 border-dashed border-zinc-800/40 rounded-2xl bg-zinc-950/20">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <ImageIcon className="w-8 h-8 opacity-40" />
                  </div>
                  <p className="font-semibold text-zinc-400">Sua vitrine está vazia.</p>
                  <p className="text-sm mt-1 text-zinc-600">Clique em "Novo Produto" para adicionar a primeira peça.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <div key={product.id} className="group relative bg-zinc-950/50 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300">
                      {/* Botões de Ação (Aparecem no hover) */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-amber-500 hover:bg-black transition-all border border-zinc-700/50">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-red-500 hover:bg-black transition-all border border-zinc-700/50">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                      </div>
                      
                      <div className="p-5 relative">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-zinc-100 group-hover:text-amber-500 transition-colors line-clamp-1">{product.name}</h4>
                          <p className="text-amber-500 font-black text-sm whitespace-nowrap ml-2">R$ {product.price}</p>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md inline-block">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Novo Produto */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Novo Produto</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">Nome da Peça</label>
                  <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">Preço (R$)</label>
                    <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">Categoria</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" required>
                      <option>Camisetas</option>
                      <option>Calças</option>
                      <option>Tênis</option>
                      <option>Casacos</option>
                      <option>Acessórios</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-1 ml-1">Foto do Produto</label>
                  <div className="w-full bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center text-zinc-500 hover:border-amber-500 transition-colors cursor-pointer relative overflow-hidden">
                    <input type="file" accept="image/*" onChange={e => setNewProduct({...newProduct, image: e.target.files[0]})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {newProduct.image ? (
                      <div className="text-amber-500 text-sm font-semibold truncate px-2 w-full text-center">
                        {newProduct.image.name}
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-xs">Clique ou arraste uma imagem</span>
                      </>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={isUploading} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-black py-4 rounded-2xl transition-colors mt-6 flex justify-center items-center gap-2">
                  {isUploading ? (
                    <span className="animate-pulse">SALVANDO...</span>
                  ) : (
                    <>SALVAR PRODUTO</>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
