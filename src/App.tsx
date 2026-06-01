import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Utensils, Instagram, Facebook, Settings, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { MenuSection, menuData, MenuItem } from './data';
import MenuImage from './components/MenuImage';
import AdminPanel from './AdminPanel';

function App() {
  const [activeTab, setActiveTab] = useState(menuData[0].id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Persist menu changes to local storage
  const [activeMenuData, setActiveMenuData] = useState<MenuSection[]>(() => {
    const saved = localStorage.getItem('kawa_menu_data_v3');
    if (saved) return JSON.parse(saved);
    return menuData;
  });

  useEffect(() => {
    localStorage.setItem('kawa_menu_data_v3', JSON.stringify(activeMenuData));
  }, [activeMenuData]);

  useEffect(() => {
    if (isAdminMode) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = activeMenuData.map(cat => ({
        id: cat.id,
        el: document.getElementById(cat.id)
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el && section.el.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminMode, activeMenuData]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 250;
      navRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminSave = (newData: MenuSection[]) => {
    setActiveMenuData(newData);
    setIsAdminMode(false);
  };

  if (isAdminMode) {
    return <AdminPanel menuData={activeMenuData} onSave={handleAdminSave} onExit={() => setIsAdminMode(false)} />;
  }

  // Helper to render items inside grid cards
  const flattenCategoryItems = (category: MenuSection) => {
    let allItems = category.items ? category.items.filter(i => i.visible !== false) : [];
    if (category.subcategories) {
      category.subcategories
        .filter(sub => sub.visible !== false)
        .forEach(sub => {
          const titleBadge = sub.title ? `[ ${sub.title} ] ` : '';
          const subItems = sub.items
            .filter(item => item.visible !== false)
            .map(item => ({
              ...item,
              name: titleBadge + item.name
            }));
          allItems = [...allItems, ...subItems];
        });
    }
    return allItems;
  };

  return (
    <div className="min-h-screen relative font-sans text-kawa-cream selection:bg-kawa-gold selection:text-kawa-green-dark">
      {/* Background Decorative Graphic */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      {/* Hero Section */}
      <header className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 overflow-hidden z-10 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mask-image-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-kawa-green-dark/50 via-transparent to-kawa-green"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-6">
          <div className="w-32 h-32 rounded-full border-2 border-kawa-gold flex items-center justify-center p-2 mb-4 bg-kawa-green bg-opacity-90 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
             <div className="w-full h-full rounded-full border border-kawa-gold border-dashed flex items-center justify-center">
               <span className="font-cursive text-5xl text-kawa-gold leading-none tracking-tight pt-2">K</span >
             </div>
          </div>
          
          <h1 
            onDoubleClick={() => {
              setShowAdminLogin(true);
              setAdminPassword('');
              setAdminError(false);
            }}
            className="font-cursive text-7xl md:text-8xl text-kawa-gold tracking-wider drop-shadow-lg select-none cursor-default"
          >
            Kawa
          </h1>
          <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase pb-4">
            Sushi & Wok <span className="text-kawa-gold mx-2">—</span> Asiatic Food
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium bg-kawa-green-dark bg-opacity-70 px-8 py-4 rounded-full border border-kawa-green border-opacity-50 backdrop-blur-sm">
            <span className="flex items-center gap-2"><Utensils className="w-4 h-4 text-kawa-gold" /> Sur place</span>
            <span className="text-kawa-gold hidden sm:inline">•</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-kawa-gold" /> Livraison</span>
            <span className="text-kawa-gold hidden sm:inline">•</span>
            <span className="flex items-center gap-2"><Utensils className="w-4 h-4 text-kawa-gold" /> À emporter</span>
          </div>

          <div className="mt-8 flex items-center gap-3 text-lg">
             <Phone className="w-5 h-5 text-kawa-gold" />
             <a href="tel:0669554798" className="hover:text-kawa-gold transition-colors duration-300">06 69 55 47 98</a>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-kawa-green-dark shadow-2xl py-3 border-b border-kawa-gold/20' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto relative group flex items-center px-4 sm:px-6">
          <button 
            onClick={() => scrollNav('left')}
            className="absolute left-0 sm:left-4 z-10 p-1.5 sm:p-2 bg-[#051a0c] rounded-full border border-kawa-gold/30 text-kawa-gold hover:bg-kawa-gold hover:text-kawa-green-dark shadow-lg transition-colors ml-1 sm:ml-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div ref={navRef} className="flex overflow-x-auto hide-scrollbar space-x-2 sm:space-x-4 w-full px-8 md:px-12 scroll-smooth">
            {activeMenuData.filter(c => c.visible !== false).map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === category.id
                    ? 'bg-kawa-gold text-kawa-green-dark border-kawa-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                    : 'bg-kawa-green/50 text-kawa-cream border-kawa-gold/30 hover:border-kawa-gold hover:text-kawa-gold'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollNav('right')}
            className="absolute right-0 sm:right-4 z-10 p-1.5 sm:p-2 bg-[#051a0c] rounded-full border border-kawa-gold/30 text-kawa-gold hover:bg-kawa-gold hover:text-kawa-green-dark shadow-lg transition-colors mr-1 sm:mr-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Menu Categories (Grid Cards Version) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-24 relative z-10">
        {activeMenuData.filter(c => c.visible !== false).map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="mb-10 text-center flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-cursive text-kawa-gold tracking-wide">{category.name}</h3>
              {category.subtitle && (
                <p className="text-kawa-cream/70 uppercase tracking-widest text-sm mt-2">{category.subtitle}</p>
              )}
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-kawa-gold/50 to-transparent mt-6"></div>
              
              {/* Category Images Rendered Above Grid if they exist */}
              {category.categoryImages && category.categoryImages.length > 0 && (
                <div className="flex gap-4 justify-center mt-6">
                  {category.categoryImages.map((imgUrl, iIdx) => (
                    <MenuImage 
                      key={iIdx} 
                      src={imgUrl} 
                      alt={`${category.name} preview`} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-kawa-gold/20 object-cover shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                    />
                  ))}
                </div>
              )}
            </div>

            {category.layout === 'columns' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {category.subcategories?.filter(sub => sub.visible !== false).map((sub, sIdx) => (
                  <div key={sIdx} className={`space-y-6 ${!sub.title ? 'pt-10' : ''}`}>
                    {sub.title && (
                      <h4 className="text-xl text-kawa-gold font-bold tracking-widest border-b border-kawa-gold/20 pb-2">
                         {sub.title}
                      </h4>
                    )}
                    <div className="flex flex-col gap-y-4">
                      {sub.items.filter(item => item.visible !== false).map((item, iIdx) => (
                        <div key={iIdx} className="flex justify-between items-center group">
                          <span className="text-lg font-medium text-white group-hover:text-kawa-gold transition-colors">{item.name}</span>
                          {item.price && <span className="text-kawa-gold font-semibold bg-kawa-gold/10 px-2 py-1 rounded shrink-0">{item.price}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {flattenCategoryItems(category).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-kawa-green-dark/40 border border-kawa-green-dark hover:border-kawa-gold/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
                  >
                    {item.image && (
                      <div className="w-full h-48 sm:h-56 overflow-hidden bg-black/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-kawa-green-dark/80 to-transparent z-10"></div>
                        <MenuImage 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    )}
                    
                    <div className={`p-5 md:p-6 flex-1 flex flex-col justify-between ${item.image ? 'pt-4 relative z-20' : ''}`}>
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-lg md:text-xl font-medium tracking-tight text-white group-hover:text-kawa-gold transition-colors">
                            {item.name}
                          </h4>
                          {item.price && (
                            <span className="text-kawa-gold font-semibold text-lg whitespace-nowrap bg-kawa-gold/10 px-3 py-1 rounded-md shrink-0">
                              {item.price}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-kawa-cream/60 mt-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-kawa-green-dark border-t border-kawa-gold/20 pt-16 pb-8 relative z-10 mt-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="font-cursive text-5xl text-kawa-gold mb-8">Kawa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mb-12">
            <div className="flex flex-col items-center space-y-3">
              <MapPin className="w-6 h-6 text-kawa-gold mb-2" />
              <h4 className="text-lg font-medium text-kawa-gold">Adresse</h4>
              <p className="text-kawa-cream/70">Meknes, Morocco<br/>(kawasushi)</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <Clock className="w-6 h-6 text-kawa-gold mb-2" />
              <h4 className="text-lg font-medium text-kawa-gold">Heures d'ouverture</h4>
              <p className="text-kawa-cream/70">12:00h to 00:00h</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <Phone className="w-6 h-6 text-kawa-gold mb-2" />
              <h4 className="text-lg font-medium text-kawa-gold">Contact</h4>
              <a href="tel:0669554798" className="text-kawa-cream/70 hover:text-kawa-gold">06 69 55 47 98</a>
              <a href="https://www.kawasuhi.ma" target="_blank" rel="noopener noreferrer" className="text-kawa-cream/70 hover:text-kawa-gold">www.kawasuhi.ma</a>
            </div>
          </div>
          
          <div className="flex space-x-6 mb-8">
            <a href="https://www.instagram.com/kawasushi.ma/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-kawa-gold hover:text-kawa-green-dark transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://web.facebook.com/profile.php?id=61590671361276" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-kawa-gold hover:text-kawa-green-dark transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/212669554798" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-kawa-gold hover:text-kawa-green-dark transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-kawa-cream/40 text-sm">
            © {new Date().getFullYear()} Kawa Sushi & Wok. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          onClick={scrollToTop}
          className={`bg-[#051a0c] border border-kawa-gold/30 hover:bg-kawa-gold text-kawa-gold hover:text-[#12331f] p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 scale-0 opacity-0 ${isScrolled ? 'scale-100 opacity-100' : ''}`}
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-kawa-gold/30 rounded-xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-xl font-bold text-kawa-gold mb-4 text-center">Admin Access</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 mb-2 block">Password</label>
                <input 
                  type="password"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAdminError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const currentPwd = localStorage.getItem('kawa_admin_pwd') || 'kawaadmin';
                      if (adminPassword === currentPwd) {
                        setIsAdminMode(true);
                        setShowAdminLogin(false);
                      } else {
                        setAdminError(true);
                      }
                    }
                  }}
                  className={`w-full bg-neutral-950 border ${adminError ? 'border-red-500 text-red-500' : 'border-neutral-700 text-white'} rounded p-3 focus:outline-none focus:border-kawa-gold transition-colors`}
                  placeholder="Enter password..."
                  autoFocus
                />
                {adminError && <p className="text-red-500 text-xs mt-2">Incorrect password.</p>}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 bg-neutral-800 text-white p-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const currentPwd = localStorage.getItem('kawa_admin_pwd') || 'kawaadmin';
                    if (adminPassword === currentPwd) {
                      setIsAdminMode(true);
                      setShowAdminLogin(false);
                    } else {
                      setAdminError(true);
                    }
                  }}
                  className="flex-1 bg-kawa-gold text-black p-2 rounded font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar classes via inline style block for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        }
      `}} />
    </div>
  );
}

export default App;


