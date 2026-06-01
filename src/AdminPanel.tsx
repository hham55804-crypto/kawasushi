import React, { useState } from 'react';
import { MenuSection } from './data';
import { Save, Plus, ArrowLeft, Image as ImageIcon, Key, Eye, EyeOff } from 'lucide-react';

interface AdminProps {
  menuData: MenuSection[];
  onSave: (data: MenuSection[]) => void;
  onExit: () => void;
}

export default function AdminPanel({ menuData, onSave, onExit }: AdminProps) {
  const [data, setData] = useState<MenuSection[]>(JSON.parse(JSON.stringify(menuData)));
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleItemChange = (catIdx: number, itemIdx: number, field: string, value: string | boolean) => {
    const newData = [...data];
    if (newData[catIdx].items) {
      newData[catIdx].items[itemIdx] = { ...newData[catIdx].items[itemIdx], [field]: value };
      setData(newData);
    }
  };

  const handleSubItemChange = (catIdx: number, subIdx: number, itemIdx: number, field: string, value: string | boolean) => {
    const newData = [...data];
    if (newData[catIdx].subcategories) {
      newData[catIdx].subcategories[subIdx].items[itemIdx] = { 
        ...newData[catIdx].subcategories[subIdx].items[itemIdx], 
        [field]: value 
      };
      setData(newData);
    }
  };

  const handleSubcategoryChange = (catIdx: number, subIdx: number, field: string, value: string | boolean) => {
    const newData = [...data];
    if (newData[catIdx].subcategories) {
      newData[catIdx].subcategories[subIdx] = {
        ...newData[catIdx].subcategories[subIdx],
        [field]: value
      };
      setData(newData);
    }
  };

  const handleCategoryChange = (catIdx: number, field: string, value: string | boolean) => {
    const newData = [...data];
    newData[catIdx] = { ...newData[catIdx], [field]: value };
    setData(newData);
  };

  const handleAddCategory = () => {
    setData([...data, {
      id: `category-${Date.now()}`,
      name: 'NEW CATEGORY',
      layout: 'default',
      items: []
    }]);
  };

  const handleAddItem = (catIdx: number) => {
    const newData = [...data];
    if (!newData[catIdx].items) {
      newData[catIdx].items = [];
    }
    newData[catIdx].items.push({
      name: 'New Item',
      price: '0dh'
    });
    setData(newData);
  };

  const handleAddSubItem = (catIdx: number, subIdx: number) => {
    const newData = [...data];
    if (newData[catIdx].subcategories) {
      newData[catIdx].subcategories[subIdx].items.push({
        name: 'New Item',
        price: '0dh'
      });
      setData(newData);
    }
  };

  const handleAddSubcategory = (catIdx: number) => {
    const newData = [...data];
    if (!newData[catIdx].subcategories) {
      newData[catIdx].subcategories = [];
    }
    newData[catIdx].subcategories.push({
      title: 'NEW SECTION',
      items: []
    });
    setData(newData);
  };

  const handleItemImageUpload = (catIdx: number, itemIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      handleItemChange(catIdx, itemIdx, 'image', result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubItemImageUpload = (catIdx: number, subIdx: number, itemIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      handleSubItemChange(catIdx, subIdx, itemIdx, 'image', result);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-kawa-gold selection:text-black">
      <div className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800 p-4 shadow-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold tracking-wider text-kawa-gold">Control Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
            title="Change Password"
          >
            <Key className="w-5 h-5" />
          </button>
          <button 
            onClick={saveChanges}
            className="bg-kawa-gold text-black px-6 py-2 rounded-md font-semibold tracking-wide flex items-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-12 pb-32">
        {data.map((category, catIdx) => (
          <div key={catIdx} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-neutral-900 p-4 border-b border-neutral-800 font-bold text-lg tracking-widest text-kawa-gold flex gap-3 items-center">
              <button 
                onClick={() => handleCategoryChange(catIdx, 'visible', category.visible === false ? true : false)}
                className={`p-1.5 rounded transition-colors ${category.visible === false ? 'bg-neutral-800 text-neutral-500 hover:text-white' : 'text-kawa-gold hover:text-white'}`}
                title={category.visible === false ? 'Show Section' : 'Hide Section'}
              >
                {category.visible === false ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <input 
                type="text" 
                value={category.name} 
                onChange={(e) => handleCategoryChange(catIdx, 'name', e.target.value)}
                className="bg-transparent border-none outline-none w-full uppercase focus:text-white"
              />
            </div>
            
            <div className="p-6 space-y-8">
              {/* Main Items */}
              {category.items !== undefined && (
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-neutral-900/50 p-4 rounded-lg border border-neutral-800/50">
                      <div className="md:col-span-3">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Name</label>
                        <div className="flex gap-2 items-center">
                          <button 
                            onClick={() => handleItemChange(catIdx, itemIdx, 'visible', item.visible === false ? true : false)}
                            className={`p-2 rounded border border-neutral-700 transition-colors ${item.visible === false ? 'bg-neutral-800 text-neutral-500 hover:text-white' : 'bg-kawa-gold/20 text-kawa-gold hover:bg-kawa-gold hover:text-black'}`}
                            title={item.visible === false ? 'Show Item' : 'Hide Item'}
                          >
                            {item.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <input 
                            type="text" 
                            value={item.name} 
                            onChange={(e) => handleItemChange(catIdx, itemIdx, 'name', e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Price</label>
                        <input 
                          type="text" 
                          value={item.price || ''} 
                          onChange={(e) => handleItemChange(catIdx, itemIdx, 'price', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Description</label>
                        <textarea 
                          value={item.description || ''} 
                          onChange={(e) => handleItemChange(catIdx, itemIdx, 'description', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none resize-none h-10"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Image Path/URL</label>
                        <div className="relative flex items-center gap-2">
                          <label className="cursor-pointer p-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-kawa-gold transition-colors" title="Upload Image">
                            <ImageIcon className="w-5 h-5" />
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleItemImageUpload(catIdx, itemIdx, e)}
                            />
                          </label>
                          <input 
                            type="text" 
                            value={item.image || ''} 
                            placeholder="/images/file.png"
                            onChange={(e) => handleItemChange(catIdx, itemIdx, 'image', e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleAddItem(catIdx)} className="w-full py-3 border border-dashed border-neutral-700 hover:border-kawa-gold text-neutral-500 hover:text-kawa-gold rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                </div>
              )}

              {/* Subcategories */}
              {category.subcategories !== undefined && (
                <div className="space-y-4">
                  {category.subcategories.map((sub, subIdx) => (
                    <div key={subIdx} className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-neutral-800 pb-2">
                    <button 
                      onClick={() => handleSubcategoryChange(catIdx, subIdx, 'visible', sub.visible === false ? true : false)}
                      className={`p-1.5 rounded border border-neutral-700 transition-colors ${sub.visible === false ? 'bg-neutral-800 text-neutral-500 hover:text-white' : 'bg-kawa-gold/20 text-kawa-gold hover:bg-kawa-gold hover:text-black'}`}
                      title={sub.visible === false ? 'Show Subcategory' : 'Hide Subcategory'}
                    >
                      {sub.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <input 
                      type="text"
                      className="bg-transparent text-neutral-400 font-semibold uppercase tracking-wider outline-none focus:text-kawa-gold transition-colors w-full"
                      value={sub.title || ''}
                      onChange={(e) => handleSubcategoryChange(catIdx, subIdx, 'title', e.target.value)}
                      placeholder="Other Items"
                    />
                  </div>
                  {sub.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-neutral-900/50 p-4 rounded-lg border border-neutral-800/50">
                      <div className="md:col-span-3">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Name</label>
                        <div className="flex gap-2 items-center">
                          <button 
                            onClick={() => handleSubItemChange(catIdx, subIdx, itemIdx, 'visible', item.visible === false ? true : false)}
                            className={`p-2 rounded border border-neutral-700 transition-colors ${item.visible === false ? 'bg-neutral-800 text-neutral-500 hover:text-white' : 'bg-kawa-gold/20 text-kawa-gold hover:bg-kawa-gold hover:text-black'}`}
                            title={item.visible === false ? 'Show Item' : 'Hide Item'}
                          >
                            {item.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <input 
                            type="text" 
                            value={item.name} 
                            onChange={(e) => handleSubItemChange(catIdx, subIdx, itemIdx, 'name', e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Price</label>
                        <input 
                          type="text" 
                          value={item.price || ''} 
                          onChange={(e) => handleSubItemChange(catIdx, subIdx, itemIdx, 'price', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Description</label>
                        <textarea 
                          value={item.description || ''} 
                          onChange={(e) => handleSubItemChange(catIdx, subIdx, itemIdx, 'description', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none resize-none h-10"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs uppercase tracking-wider text-neutral-500 mb-1 block">Image Path/URL</label>
                        <div className="relative flex items-center gap-2">
                          <label className="cursor-pointer p-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-kawa-gold transition-colors" title="Upload Image">
                            <ImageIcon className="w-5 h-5" />
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleSubItemImageUpload(catIdx, subIdx, itemIdx, e)}
                            />
                          </label>
                          <input 
                            type="text" 
                            value={item.image || ''} 
                            placeholder="/images/file.png"
                            onChange={(e) => handleSubItemChange(catIdx, subIdx, itemIdx, 'image', e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-sm focus:border-kawa-gold outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleAddSubItem(catIdx, subIdx)} className="w-full py-3 border border-dashed border-neutral-700 hover:border-kawa-gold text-neutral-500 hover:text-kawa-gold rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                </div>
              ))}
              <button onClick={() => handleAddSubcategory(catIdx)} className="w-full py-3 border border-dashed border-neutral-700 hover:border-kawa-gold text-neutral-500 hover:text-kawa-gold rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Plus className="w-4 h-4" /> Add Subcategory
              </button>
            </div>
          )}

          {/* If category has neither items nor subcategories initialized */}
          {category.items === undefined && category.subcategories === undefined && (
            <div className="flex gap-4">
              <button onClick={() => handleAddItem(catIdx)} className="flex-1 py-4 border border-dashed border-neutral-700 hover:border-kawa-gold text-neutral-500 hover:text-kawa-gold rounded-lg flex flex-col items-center justify-center gap-2 transition-colors">
                <Plus className="w-6 h-6" /> Simple Items Layout
              </button>
              <button onClick={() => handleAddSubcategory(catIdx)} className="flex-1 py-4 border border-dashed border-neutral-700 hover:border-kawa-gold text-neutral-500 hover:text-kawa-gold rounded-lg flex flex-col items-center justify-center gap-2 transition-colors">
                <Plus className="w-6 h-6" /> Categorized Layout (e.g. Woks)
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
    <button onClick={handleAddCategory} className="w-full py-6 border-2 border-dashed border-kawa-gold/30 hover:border-kawa-gold text-kawa-gold/50 hover:text-kawa-gold tracking-widest rounded-xl flex items-center justify-center gap-3 transition-colors text-lg font-bold shadow-lg">
      <Plus className="w-6 h-6" /> ADD CATEGORY
    </button>
  </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-kawa-gold/30 rounded-xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-xl font-bold text-kawa-gold mb-4 text-center">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 mb-2 block">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-3 focus:outline-none focus:border-kawa-gold transition-colors"
                  placeholder="Enter new password..."
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-neutral-800 text-white p-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('kawa_admin_pwd', newPassword || 'kawaadmin');
                    setShowPasswordModal(false);
                    setNewPassword('');
                  }}
                  className="flex-1 bg-kawa-gold text-black p-2 rounded font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
