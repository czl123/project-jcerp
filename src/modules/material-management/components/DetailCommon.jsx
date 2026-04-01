import React from 'react';
import { HelpCircle, Check, Copy, Edit3, Sparkles } from 'lucide-react';
import { SelectRow, FormInputRow, TextareaRow } from './FormComponents.jsx';

// 子标题组件
export const SubTitle = ({ title, en, color = "blue" }) => {
  const colors = { 
    blue: "bg-blue-500", 
    orange: "bg-orange-500", 
    gray: "bg-slate-400 dark:bg-gray-500", 
    green: "bg-emerald-500", 
    purple: "bg-purple-500" 
  };
  return (
    <div className="flex items-center gap-2 mb-3 mt-2">
      <div className={`w-1 h-3 ${colors[color]} rounded-full`}></div>
      <h3 className="text-[11px] font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider transition-colors duration-300">
        {title} <span className="text-slate-300 dark:text-gray-600 font-normal ml-1">{en}</span>
      </h3>
    </div>
  );
};

// 核心信息项组件
export const InfoItem = ({ 
  label, value, fieldPath, isEditing, copyFeedback, 
  handleCopy, setIsEditing, updateField, 
  editType = 'input', options, span = 1, 
  copyable = false, required = false, help 
}) => {
  const isFieldCopying = copyFeedback === label;

  if (isEditing) {
    if (editType === 'select') return <div className={`px-2 py-1 col-span-${span}`}><SelectRow label={label} required={required} options={options} value={value} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
    if (editType === 'textarea') return <div className={`px-2 py-1 col-span-${span}`}><TextareaRow label={label} value={value} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
    return <div className={`px-2 py-1 col-span-${span}`}><FormInputRow label={label} required={required} value={value} help={help} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
  }

  return (
    <div className={`group flex items-start gap-3 py-1.5 px-2 border-b border-slate-50/50 dark:border-gray-700/30 text-[11px] col-span-${span} relative hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors duration-300`}>
      <div className="w-24 shrink-0 text-right flex items-center justify-end gap-1">
        {required && <span className="text-red-500 font-bold">*</span>}
        <div className="flex items-center gap-1 group/label">
          <span className="text-slate-400 dark:text-gray-500 leading-relaxed truncate">{label}:</span>
          {help && (
             <div title={help} className="text-slate-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <HelpCircle size={10} />
             </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center gap-2 overflow-hidden">
         <span className={`text-slate-700 dark:text-gray-300 font-semibold break-all leading-relaxed transition-colors ${label === '产品名称' ? 'text-[12px] text-blue-700 dark:text-blue-400' : ''}`}>{value || '-'}</span>
         {copyable && value && (
           <button onClick={() => handleCopy(value, label)} className="p-1 text-slate-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
             {isFieldCopying ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
           </button>
         )}
      </div>
      <button onClick={() => setIsEditing(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-200 dark:text-gray-700 hover:text-blue-400 dark:hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
         <Edit3 size={12} />
      </button>
    </div>
  );
};
