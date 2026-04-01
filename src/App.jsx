import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes';
import Sidebar from './Sidebar';
import { X } from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. 状态：当前打开的标签页列表 (初始给个欢迎页)
  const [tabs, setTabs] = useState([
    { title: '欢迎页', path: '/welcome' }
  ]);

  // 2. 监听路由变化，自动增加标签页
  useEffect(() => {
    // 简单的路径到名称的映射映射（实际可以从 menuConfig 匹配）
    const pathMap = {
      '/product/material': '物料管理',
      '/product/propose': '提案管理',
      '/product/spu': 'SPU管理',
      '/welcome': '欢迎页',
      '/finance/reimburse': '费用报销'
    };

    const currentTitle = pathMap[location.pathname];
    
    if (currentTitle && !tabs.find(t => t.path === location.pathname)) {
      setTabs([...tabs, { title: currentTitle, path: location.pathname }]);
    }
  }, [location.pathname]);

  // 3. 关闭标签逻辑
  const closeTab = (e, path) => {
    e.stopPropagation(); // 防止触发切换事件
    if (tabs.length === 1) return; // 剩最后一个不让关

    const newTabs = tabs.filter(t => t.path !== path);
    setTabs(newTabs);

    // 如果关闭的是当前页，自动跳到最后一个标签
    if (location.pathname === path) {
      navigate(newTabs[newTabs.length - 1].path);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f2f5]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* --- 动态顶部 Header Tab 栏 --- */}
        <div className="h-9 bg-[#001529] flex items-center px-2 shrink-0 shadow-sm overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-[2px] h-full pt-1.5">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <div 
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`group px-3 py-1 text-[11px] rounded-t-sm flex items-center cursor-pointer transition-all duration-200 min-w-[80px] justify-between
                    ${isActive 
                      ? 'bg-[#f0f2f5] text-blue-600 font-bold' 
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                    }`}
                >
                  <span className="truncate">{tab.title}</span>
                  <X 
                    size={12} 
                    className={`ml-2 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white rounded-full p-[1px] transition-all
                      ${isActive ? 'opacity-40 text-gray-500' : ''}`}
                    onClick={(e) => closeTab(e, tab.path)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 主内容区 --- */}
        <div className="flex-1 overflow-hidden relative">
          <AppRoutes />
        </div>

      </div>
    </div>
  );
}

export default App;