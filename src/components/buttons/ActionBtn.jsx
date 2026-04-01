import { ChevronDown } from 'lucide-react';

const ActionBtn = ({ label, hasArrow }) => (
  <button className="border h-[28px] px-3 rounded text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center">
    {label} {hasArrow && <ChevronDown size={12} className="ml-1" />}
  </button>
);

export default ActionBtn;