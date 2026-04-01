import { ChevronDown } from 'lucide-react';

const FilterSelect = ({ placeholder, label, icon }) => (
  <div className="flex items-center border rounded h-[28px] px-2 text-gray-400 hover:border-blue-400 cursor-pointer bg-white transition-all min-w-[90px]">
    {label && <span className="text-gray-700 mr-2 border-r pr-2">{label}</span>}
    {icon && <span className="mr-1">{icon}</span>}
    <span className="truncate text-[11px]">{placeholder}</span>
    <ChevronDown size={12} className="ml-auto" />
  </div>
);

export default FilterSelect;