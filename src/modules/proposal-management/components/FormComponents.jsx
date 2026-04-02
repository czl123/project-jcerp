import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-slate-50 dark:border-gray-700 transition-colors duration-300">
    <span className="text-[11px] font-black text-slate-700 dark:text-blue-400 flex items-center uppercase tracking-widest">
      {Icon && <Icon size={12} className="mr-2.5 text-blue-500 dark:text-blue-400" />}
      {title}
    </span>
  </div>
);
export const InputRow = ({ label, required, value, placeholder, isSelect, unit, icon, options, onChange, helpText }) => (
  <div className="flex flex-col space-y-1 text-[10.5px] group/row">
    <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-95 origin-left whitespace-nowrap uppercase tracking-tight group-focus-within/row:text-blue-600 transition-colors relative">
      {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
      {helpText && (
        <div className="ml-1 group/help relative cursor-help">
          <HelpCircle size={10} className="text-slate-300 hover:text-blue-500 transition-colors" />
          <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/help:block w-48 p-2 bg-slate-800 text-white text-[9px] rounded shadow-lg z-50 normal-case leading-relaxed animate-in fade-in slide-in-from-bottom-1 whitespace-pre-line">
            {helpText}
            <div className="absolute left-2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-800"></div>
          </div>
        </div>
      )}
    </div>
    <div className="relative flex items-center group">
      {options ? (
        <select 
          onChange={onChange}
          value={value}
          className="w-full border border-slate-200 dark:border-gray-600 rounded-md px-2.5 h-7 outline-none focus:border-blue-400 dark:focus:border-blue-500 text-slate-800 dark:text-gray-200 bg-white dark:bg-gray-800 transition-all shadow-sm appearance-none cursor-pointer"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          className="w-full border border-slate-200 dark:border-gray-600 rounded-md px-2.5 h-7 outline-none focus:border-blue-400 dark:focus:border-blue-500 text-slate-800 dark:text-gray-200 bg-white dark:bg-gray-800 transition-all shadow-sm" 
          defaultValue={value} 
          placeholder={placeholder} 
          onChange={onChange}
        />
      )}
      {unit && <span className="absolute right-2.5 text-slate-400 dark:text-gray-500 scale-90 font-bold pointer-events-none">{unit}</span>}
      {isSelect && <ChevronDown size={11} className="absolute right-2 text-slate-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 pointer-events-none" />}
      {icon && <span className="absolute right-2 text-slate-300 dark:text-gray-600">{icon}</span>}
    </div>
  </div>
);

export const SizeRow = ({ label, values, unit, placeholder, onChange }) => (
  <div className="flex flex-col space-y-1 text-[10.5px] group/row">
    <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-95 origin-left uppercase tracking-tight group-focus-within/row:text-blue-600 transition-colors">
      <span className="text-red-500 mr-0.5">*</span>{label}：
    </div>
    <div className="flex items-center space-x-2">
      {values.map((v, i) => (
        <input 
          key={i} 
          onChange={onChange}
          className="w-full border border-slate-200 dark:border-gray-600 rounded-md h-7 text-center outline-none focus:border-blue-400 dark:focus:border-blue-500 text-slate-800 dark:text-gray-200 bg-white dark:bg-gray-800 transition-all shadow-sm" 
          defaultValue={placeholder ? '' : v} 
          placeholder={placeholder ? v : ''} 
        />
      ))}
      <span className="bg-slate-100 dark:bg-gray-700 px-2.5 h-7 flex items-center justify-center text-slate-500 dark:text-gray-400 scale-90 rounded-md font-bold shrink-0 transition-colors">{unit}</span>
    </div>
  </div>
);

export const TextAreaGroup = ({ label, required, limit, height = "h-24", onChange, defaultValue = "" }) => {
  const [currentLength, setCurrentLength] = useState(defaultValue ? defaultValue.length : 0);
  const maxLength = typeof limit === 'string' && limit.includes('/') ? parseInt(limit.split('/')[1].trim()) : null;

  const handleChange = (e) => {
    setCurrentLength(e.target.value.length);
    if (onChange) onChange(e);
  };

  return (
    <div className="flex-1 flex flex-col space-y-1 text-[10.5px] group/row">
      <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-95 origin-left whitespace-nowrap uppercase tracking-tight group-focus-within/row:text-blue-600 transition-colors">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
      </div>
      <div className="relative">
        <textarea 
          onChange={handleChange}
          maxLength={maxLength}
          defaultValue={defaultValue}
          className={`w-full border border-slate-200 dark:border-gray-600 rounded-md p-3 ${height} outline-none focus:border-blue-400 dark:focus:border-blue-500 resize-none text-slate-800 dark:text-gray-200 shadow-sm font-medium bg-white dark:bg-gray-800 transition-all`} 
        />
        {limit && (
          <span className="absolute bottom-2 right-2 text-[9px] text-slate-300 dark:text-gray-600 font-mono pointer-events-none">
            {currentLength} / {maxLength || limit}
          </span>
        )}
      </div>
    </div>
  );
};

export const WeightInputRow = ({ label, required, value, onChange }) => {
  const [unit, setUnit] = useState('kg');
  return (
    <div className="flex flex-col space-y-1 text-[10.5px] group/row">
      <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-95 origin-left whitespace-nowrap uppercase tracking-tight group-focus-within/row:text-blue-600 transition-colors">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
      </div>
      <div className="relative flex items-center group">
        <input 
          onChange={onChange}
          className="w-full border border-slate-200 dark:border-gray-600 rounded-md px-2.5 h-7 outline-none focus:border-blue-400 dark:focus:border-blue-500 text-slate-800 dark:text-gray-200 bg-white dark:bg-gray-800 transition-all shadow-sm" 
          defaultValue={value} 
        />
        <div className="absolute right-1 flex items-center bg-slate-50 dark:bg-gray-700 rounded border border-slate-200 dark:border-gray-600 h-[22px] p-0.5 shadow-inner">
           <button 
             onClick={() => { setUnit('kg'); onChange && onChange(); }}
             className={`px-1.5 rounded-[2px] text-[9px] font-bold transition-all ${unit === 'kg' ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >kg</button>
           <button 
             onClick={() => { setUnit('g'); onChange && onChange(); }}
             className={`px-1.5 rounded-[2px] text-[9px] font-bold transition-all ${unit === 'g' ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >g</button>
        </div>
      </div>
    </div>
  );
};
