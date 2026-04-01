import { ChevronDown } from 'lucide-react';

const TabItem = ({ label, active }) => (
  <div className={`px-4 flex items-center text-[11px] rounded-t-[3px] h-full cursor-pointer transition-colors ${
    active
      ? 'bg-[#e6f7ff] text-[#1890ff] border-t-[2px] border-[#1890ff] font-medium'
      : 'bg-transparent text-gray-400 hover:text-white'
  }`}>
    {label} <span className="ml-2 opacity-30">×</span>
  </div>
);

export default TabItem;