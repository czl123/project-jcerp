import { Outlet, Link } from 'react-router-dom';
import { Box, Sun, Settings, Bell } from 'lucide-react';

function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-[12px] font-sans antialiased text-gray-800">

      

      {/* 2. 主界面 */}
      <div className="flex-1 flex flex-col min-w-0">


        {/* 主内容区域 */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// --- 子组件 ---

const TabItem = ({ label, active }) => (
  <div className={`px-4 flex items-center text-[11px] rounded-t-[3px] h-full cursor-pointer transition-colors ${
    active
      ? 'bg-[#e6f7ff] text-[#1890ff] border-t-[2px] border-[#1890ff] font-medium'
      : 'bg-transparent text-gray-400 hover:text-white'
  }`}>
    {label} <span className="ml-2 opacity-30">×</span>
  </div>
);

const Search = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

export default MainLayout;