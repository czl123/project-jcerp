import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Check, Search, X, UploadCloud, Edit3 } from 'lucide-react';

// 1. 表单区块容器
export const FormSection = ({ title, children, extra }) => (
  <div className="space-y-3 mb-6">
    <div className="flex items-center border-l-4 border-blue-600 pl-2 leading-none font-bold text-gray-800 dark:text-gray-100 text-[13px] transition-colors duration-300">
      {title} {extra}
    </div>
    {children}
  </div>
);

// 2. 普通输入框 (极致压缩版)
export const FormInputRow = ({ label, required, placeholder = "", unit, help, colspan = 1, value, onChange, disabled }) => (
  <div className={`flex items-center space-x-2 text-[11px] col-span-${colspan}`}>
    <div className="w-20 text-right text-slate-500 dark:text-gray-500 shrink-0 flex items-center justify-end gap-0.5">
      {required && !disabled && <span className="text-red-500">*</span>}
      <span className="truncate">{label}:</span>
    </div>
    <div className={`flex-1 flex items-center border rounded-md px-2 py-1 transition-colors ${disabled ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/5'}`}>
      <input 
        type="text" 
        className="flex-1 outline-none text-slate-700 dark:text-gray-200 bg-transparent disabled:cursor-not-allowed text-[12px] h-6" 
        placeholder={disabled ? '-' : placeholder} 
        value={value}  
        onChange={onChange}
        disabled={disabled}
      />
      {unit && <span className="text-slate-300 dark:text-gray-600 ml-1 font-bold scale-90 uppercase">{unit}</span>}
      {help && <HelpCircle size={12} className="text-slate-300 dark:text-gray-600 ml-1 cursor-pointer hover:text-blue-500" />}
    </div>
  </div>
);

// 3. 带下拉选项的选择框 (极致压缩版)
export const SelectRow = ({ label, required, placeholder = "选择", options = [], value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultOptions = options.length > 0 ? options : ["选项一", "选项二"];

  const handleSelect = (val) => {
    if (onChange && !disabled) {
      onChange({ target: { value: val } }); 
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 text-[11px] relative">
      <div className="w-20 text-right text-slate-500 dark:text-gray-500 shrink-0">
        {required && !disabled && <span className="text-red-500 mr-1">*</span>}{label}:
      </div>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex-1 flex items-center border rounded-md px-2 py-1 transition-all ${
          disabled ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 cursor-pointer hover:border-blue-400'
        } ${isOpen ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/5' : ''}`}
      >
        <span className={`flex-1 truncate text-[12px] h-6 flex items-center ${value && !disabled ? 'text-slate-700 dark:text-gray-200' : 'text-slate-400 dark:text-gray-600'}`}>
          {disabled && !value ? '-' : (value || placeholder)} 
        </span>
        <ChevronDown size={12} className={`text-slate-400 dark:text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-[190]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-[88px] right-0 mt-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-md shadow-xl z-[200] py-1 animate-in fade-in zoom-in-95 duration-150 transition-colors duration-300">
            {defaultOptions.map((opt, index) => (
              <div 
                key={index}
                onClick={() => handleSelect(opt)}
                className={`px-3 py-1.5 text-[12px] flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer ${value === opt ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-bold' : 'text-slate-600 dark:text-gray-400'}`}
              >
                <span>{opt}</span>
                {value === opt && <Check size={12} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 4. 大文本域 (极致压缩版)
export const TextareaRow = ({ label, value, onChange, placeholder = "" }) => (
  <div className="flex space-x-2 text-[11px] col-span-2">
    <div className="w-20 text-right text-slate-500 dark:text-gray-500 mt-1.5 shrink-0">
      {label}:
    </div>
    <div className="flex-1 border border-slate-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors">
      <textarea 
        className="w-full h-16 outline-none resize-none text-slate-700 dark:text-gray-200 bg-transparent text-[12px]" 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  </div>
);

// 5. 规格/尺寸输入
export const DimensionInput = ({ label, required, unit = "cm", value = { l: '', w: '', h: '' }, onChange }) => {
  const handleChange = (key, val) => {
    if (onChange) onChange({ ...value, [key]: val });
  };

  return (
    <div className="flex items-center space-x-2 text-[11px]">
      <div className="w-20 text-right text-slate-500 dark:text-gray-500 shrink-0">{required && <span className="text-red-500 mr-1">*</span>}{label}:</div>
      <div className="flex space-x-1 flex-1">
        <input type="number" placeholder="长" value={value.l} onChange={(e) => handleChange('l', e.target.value)} className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-[12px] h-8 text-slate-700 dark:text-gray-200 transition-colors" />
        <span className="text-slate-300 dark:text-gray-600 self-center">×</span>
        <input type="number" placeholder="宽" value={value.w} onChange={(e) => handleChange('w', e.target.value)} className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-[12px] h-8 text-slate-700 dark:text-gray-200 transition-colors" />
        <span className="text-slate-300 dark:text-gray-600 self-center">×</span>
        <input type="number" placeholder="高" value={value.h} onChange={(e) => handleChange('h', e.target.value)} className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-[12px] h-8 text-slate-700 dark:text-gray-200 transition-colors" />
        <div className="bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded px-2 py-1 text-slate-400 dark:text-gray-400 flex items-center h-8 font-bold transition-colors">{unit}</div>
      </div>
    </div>
  );
};

// 6. 重量输入框
export const WeightInputRow = ({ label, required, value, onChange, options = ["kg", "g"] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(value?.unit || options[0]);

  const handleValueChange = (val) => { if (onChange) onChange({ ...value, value: val }); };
  const handleUnitChange = (unit) => { setCurrentUnit(unit); if (onChange) onChange({ ...value, unit: unit }); setIsOpen(false); };

  return (
    <div className="flex items-center space-x-2 text-[11px] relative">
      <div className="w-20 text-right text-slate-500 dark:text-gray-500 shrink-0">
        {required && <span className="text-red-500 mr-1">*</span>}{label}:
      </div>
      <div className="flex-1 flex items-center border border-slate-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 overflow-hidden h-8 transition-colors">
        <input type="number" className="flex-1 outline-none text-slate-700 dark:text-gray-200 bg-transparent px-2 text-[12px]" placeholder="0.00" value={value?.value || ''} onChange={(e) => handleValueChange(e.target.value)} />
        <div onClick={() => setIsOpen(!isOpen)} className={`w-12 border-l border-slate-100 dark:border-gray-700 h-full flex items-center justify-between px-1.5 cursor-pointer text-slate-500 dark:text-gray-400 bg-slate-50/50 dark:bg-gray-700 transition-colors`}>
          <span className="font-bold">{currentUnit}</span>
          <ChevronDown size={10} />
        </div>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[190]" onClick={() => setIsOpen(false)}></div>
            <div className="absolute top-full right-0 w-16 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-xl z-[200] py-1 transition-colors duration-300">
              {options.map((opt) => (
                <div key={opt} onClick={() => handleUnitChange(opt)} className="px-3 py-1 text-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-[11px] dark:text-gray-300 transition-colors">{opt}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 7. 图片上传
export const ImageUploader = ({ onUpload, images = [] }) => {
  const fileInputRef = React.useRef(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onUpload) {
      const newImages = files.map(file => URL.createObjectURL(file));
      onUpload([...images, ...newImages]);
    }
    e.target.value = '';
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      <div onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center bg-slate-50/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group transition-colors duration-300">
        <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleFileChange} />
        <UploadCloud size={20} className="text-slate-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 mb-1" />
        <span className="text-[10px] text-slate-400 dark:text-gray-500 font-bold">上传</span>
      </div>
      {images.map((url, idx) => (
        <div key={idx} className="aspect-square border border-slate-100 dark:border-gray-700 rounded-lg relative group overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm transition-colors duration-300">
          <img src={url} alt="p" className="max-w-full max-h-full object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <X size={14} className="text-white cursor-pointer" onClick={() => onUpload(images.filter((_, i) => i !== idx))} />
          </div>
        </div>
      ))}
    </div>
  );
};
