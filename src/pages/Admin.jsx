import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Lock, LogOut, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import Mascots from '../components/Mascots';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('E-mail ou senha incorretos. Apenas administradores têm acesso.');
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full bg-white p-8 rounded-3xl shadow-2xl relative overflow-hidden" style={{ maxWidth: '420px' }}>
          
          <Mascots isPasswordFocused={isPasswordFocused} />
          
          <h1 className="text-3xl font-black text-zinc-900 text-center mb-1">Bem-vindo(a)! 👋</h1>
          <p className="text-zinc-400 text-center mb-8 text-sm font-medium">Acesso restrito · Best Multimarcas</p>
          
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="E-mail do administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-2xl px-4 py-3.5 text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-2xl px-4 py-3.5 text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center font-semibold bg-red-50 py-2 rounded-xl">
                {error}
              </p>
            )}
            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 mt-2 hover:shadow-xl hover:shadow-red-500/25 active:scale-[0.98] text-base tracking-wide"
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
            <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
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
                      <button className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-950 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
