import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { MAIN_MENUS } from './menuConfig'; 
import { useAppContext } from './store/context';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useAppContext();
  
  // 狀態管理
  const [activeMain, setActiveMain] = useState('product'); // 預設選中產品
  const [showPanel, setShowPanel] = useState(false); // 控制面板彈出
  const panelRef = useRef(null);

  // 點擊外部關閉面板
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 處理一級菜單點擊
  const handleMainClick = (menu) => {
    if (menu.id === 'product') {
      // 產品菜單：切換面板
      setActiveMain(menu.id);
      setShowPanel(!showPanel);
    } else {
      // 其他菜單：關閉面板並跳轉
      setActiveMain(menu.id);
      setShowPanel(false);
      if (menu.path) navigate(menu.path);
    }
  };

  // 處理三級菜單點擊
  const handleSubItemClick = (path) => {
    navigate(path);
    setShowPanel(false); // 點擊後收起面板
  };

  return (
    <div className="flex h-full shrink-0 relative" ref={panelRef}>
      
      {/* --- 第一層：窄條主菜單 (深色) --- */}
      <div className="w-[64px] bg-[#001529] dark:bg-black flex flex-col items-center py-3 z-[100] border-r border-white/5 shrink-0 transition-colors duration-300">
        {/* Logo */}
        <div className="h-12 flex items-center justify-center mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-[10px] shadow-lg shadow-blue-500/20">
            ERP
          </div>
        </div>
        
        {/* 菜單列表 */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar">
          {MAIN_MENUS.map((menu) => {
            const isActive = activeMain === menu.id;
            return (
              <div
                key={menu.id}
                onClick={() => handleMainClick(menu)}
                className={`w-full flex flex-col items-center py-3.5 cursor-pointer transition-all relative group
                  ${isActive 
                    ? 'bg-blue-600/90 text-white font-medium' // 選中時背景微亮且帶透明度
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {/* 1. 選中時的左側小亮條 (變更細) */}
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white rounded-r"></div>
                )}
                
                {/* 2. ✨關鍵優化：選中且面板展開時，顯示右側對接的小三角 ✨ */}
                {isActive && showPanel && (
                  <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-white dark:border-r-gray-800 z-[110] animate-in fade-in duration-300"></div>
                )}
                
                <div className="group-hover:scale-105 transition-transform">
                  {menu.icon}
                </div>
                <span className="text-[11px] mt-1.5 scale-95 origin-top tracking-tight text-center px-1">
                  {menu.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* --- 暗黑模式切換 --- */}
        <div 
          onClick={() => {
            console.log('Dark mode button clicked! Current mode:', isDarkMode);
            toggleDarkMode();
          }}
          className="w-full flex flex-col items-center py-4 cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 transition-all mt-auto border-t border-white/10"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-[10px] mt-1 opacity-60">
            {isDarkMode ? '日間' : '夜間'}
          </span>
        </div>
      </div>

      {/* --- 第二層：彈出式面板 (一體化優化版) --- */}
      {showPanel && activeMain === 'product' && (
        <div className="absolute left-[64px] top-0 h-full bg-white dark:bg-gray-800 z-[90] border-r border-gray-100 dark:border-gray-700 flex animate-in slide-in-from-left-1 duration-200 w-[420px] shadow-[15px_0_30px_-5px_rgba(0,0,0,0.08)]">
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-7 no-scrollbar">
            
            {/* 面板標題 (優化排版) */}
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">產品中心</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-wider">PRODUCT</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
            
            {/* ✨ 再次確認：使用 columns-2 實現緊湊的瀑布流排版 ✨ */}
            <div className="columns-2 gap-x-8 gap-y-10">
              {MAIN_MENUS.find(m => m.id === 'product')?.groups?.map((group, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col space-y-3.5 break-inside-avoid mb-9" // 確保分組不被截斷
                >
                  {/* 二級分组名 (改用背景色塊代替豎線，更整潔) */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-sm uppercase inline-block self-start">
                    {group.title}
                  </div>
                  
                  {/* 三級功能列表 */}
                  <div className="flex flex-col space-y-1.5 pl-1">
                    {group.items.map((item, i) => {
                      const isCurrent = location.pathname === item.path;
                      return (
                        <div
                          key={i}
                          onClick={() => handleSubItemClick(item.path)}
                          className={`text-[13px] py-1.5 px-3 rounded cursor-pointer transition-all relative flex items-center group
                            ${isCurrent 
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30 font-bold' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                        >
                          {/* 選中時的三級菜單左側小圓點 */}
                          {isCurrent && (
                            <div className="w-1 h-1 rounded-full bg-blue-500 absolute left-1"></div>
                          )}
                          <span className={isCurrent ? 'pl-2' : ''}>{item.label}</span>
                          
                          {/* 非選中時的鼠標懸停小箭頭 */}
                          {!isCurrent && (
                            <span className="ml-auto text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100">→</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;