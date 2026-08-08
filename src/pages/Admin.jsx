import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Lock, LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff, X, Upload } from 'lucide-react';
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

  // --- TELA DO PAINEL (DASHBOARD) ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 glass p-6 rounded-3xl border border-zinc-800/50">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Gerenciador de Estoque</h1>
            <p className="text-zinc-400 text-sm">Controle as peças da vitrine e da promoção</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors bg-zinc-900/50 px-4 py-2 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Painel Esquerdo: Menu / Resumo */}
          <div className="md:col-span-1 space-y-4">
            <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Plus className="w-5 h-5" />
              NOVO PRODUTO
            </button>
            
            <div className="glass p-6 rounded-3xl border border-zinc-800/50 mt-4">
              <h3 className="font-bold text-zinc-300 mb-4">Estatísticas</h3>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                <span className="text-zinc-500 text-sm">Total na Vitrine</span>
                <span className="font-bold">{products.length} peças</span>
              </div>
            </div>
          </div>

          {/* Painel Direito: Lista de Produtos */}
          <div className="md:col-span-2 glass p-6 rounded-3xl border border-zinc-800/50 min-h-[500px]">
            <h2 className="text-xl font-bold mb-6">Suas Peças Atuais</h2>
            
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-zinc-500 border-2 border-dashed border-zinc-800/50 rounded-2xl">
                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                <p>Nenhum produto cadastrado ainda.</p>
                <p className="text-sm">Clique em Novo Produto para começar.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600"><ImageIcon className="w-6 h-6" /></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold">{product.name}</h4>
                        <p className="text-red-500 font-bold text-sm">R$ {product.price}</p>
                        <span className="text-xs text-zinc-500 px-2 py-1 bg-zinc-800 rounded-md mt-1 inline-block">{product.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-400 hover:text-amber-500 bg-zinc-950 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-950 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
