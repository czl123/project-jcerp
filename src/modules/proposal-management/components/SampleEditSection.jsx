import React, { useState, useRef, useEffect } from 'react';
import { Package, HelpCircle, ChevronDown, Upload, Calendar, Plus, X, RefreshCw, ChevronRight, CheckCircle2, List } from 'lucide-react';
import { SectionHeader, InputRow, SizeRow, TextAreaGroup, WeightInputRow } from './FormComponents';

const SampleEditSection = ({ samples, activeTab, setActiveTab, setLayoutMode }) => {
  const [isMultiPackage, setIsMultiPackage] = useState(false); // 是否一品多包
  const [packageCount, setPackageCount] = useState(2); // 默认包裹数量
  const [patentType, setPatentType] = useState('无专利'); // 专利说明状态

  // --- 导航逻辑：查找下一个样品 ---
  const currentIndex = samples.findIndex(s => s.id === activeTab);
  const nextSample = samples[currentIndex + 1];
  const isLastSample = !nextSample;

  // --- 优化：Toast 提示 ---
  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  // --- 优化1：未保存状态提醒 ---
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleFormChange = () => setHasChanges(true);

  const handleCancelClick = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      setLayoutMode('list');
    }
  };

  const handleSaveClick = () => {
    setHasChanges(false);
    showToast(`样品 ${activeTab} 已成功保存`);
    setTimeout(() => setLayoutMode('list'), 500);
  };

  const handleSaveAndNext = () => {
    const savedId = activeTab;
    setHasChanges(false);
    if (nextSample) {
      setActiveTab(nextSample.id);
      showToast(`样品 ${savedId} 保存成功，已切换到下一个`);
      document.querySelector('.overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast(`所有样品已保存，正在返回列表`);
      setTimeout(() => setLayoutMode('list'), 1000);
    }
  };

  // --- 进阶优化1：键盘快捷键 ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveClick();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSaveAndNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, nextSample, hasChanges]);

  // --- 优化2：图片预览功能 ---
  const [patentImage, setPatentImage] = useState(null);
  const [refImage, setRefImage] = useState(null);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
        handleFormChange();
      };
      reader.readAsDataURL(file);
    }
  };

  const currentSample = samples.find(s => s.id === activeTab) || samples[0];

  // 提取专利证书上传区域为局部变量，方便复用
  const certificateUpload = (
    <div className="flex flex-col space-y-1 text-[10px]">
      <span className="text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider">专利证书：</span>
      <label className="border border-dashed border-slate-200 dark:border-gray-600 rounded-md p-4 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-gray-800/50 hover:bg-white transition-all cursor-pointer shadow-inner relative overflow-hidden group h-[88px]">
        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setPatentImage)} />
        {patentImage ? (
          <>
            <img src={patentImage} alt="Patent" className="absolute inset-0 w-full h-full object-contain p-1 opacity-90 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span className="text-white font-bold text-[10px]">更换图片</span>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); setPatentImage(null); handleFormChange(); }}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </>
        ) : (
          <>
            <Upload size={16} className="text-blue-500 mb-1.5" />
            <span className="text-[9px] font-bold text-blue-600 uppercase">Upload File</span>
          </>
        )}
      </label>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative transition-colors duration-300 bg-white dark:bg-gray-900 font-sans" onChange={handleFormChange}>
      
      {/* Toast 提示容器 */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-full shadow-2xl flex items-center space-x-3 border border-slate-600">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-[12px] font-bold tracking-wide">{toast}</span>
          </div>
        </div>
      )}

      {/* 顶部标题栏 */}
      <div className="bg-slate-50/50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-700 px-6 py-2.5 flex items-center justify-end sticky top-0 z-20 shadow-sm transition-colors duration-300">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-400">
          <Package size={12} />
          <span>正在编辑: <span className="text-blue-600 dark:text-blue-400">{currentSample?.id}</span> <span className="ml-2 text-slate-500 dark:text-gray-400 border-l border-slate-200 dark:border-gray-700 pl-2">{currentSample?.purchaser}</span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar scroll-smooth bg-slate-50/30 dark:bg-gray-950/30">
        <div className="border border-slate-200 dark:border-gray-700 rounded-md flex flex-col shadow-sm bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
          
          <div className="p-6 space-y-8">
            {/* 1. 基本信息区块 */}
            <section>
              <SectionHeader title="基本信息" icon={Package} />
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                <InputRow label="公司品牌" required isSelect />
                <InputRow label="图案" required placeholder="-" />
                <InputRow label="颜色" required value="灰色" />
                <InputRow label="是否带电" required value="是" isSelect />
                <InputRow label="是否CE类" required value="否" isSelect />
                <InputRow label="规格" required value="英规" isSelect />
                <InputRow label="包装方式" required value="盒装" isSelect />
                <InputRow 
                  label="包装数量" 
                  required 
                  value="1pack" 
                  helpText={"示例1: 1pack\n示例2: 1pack+2pack+3pack"}
                />
                <InputRow label="色号" placeholder="-" />
                <InputRow label="二级类目" isSelect />
                <InputRow label="Logo可替换" required isSelect />
                <InputRow label="建议物流方式" required isSelect />
                <InputRow label="首单物流方式" required isSelect />
                <div className="flex flex-col space-y-1">
                   <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-95 origin-left whitespace-nowrap uppercase tracking-tight">
                     <span className="text-red-500 mr-0.5">*</span>一品多包：
                   </div>
                   <div className="relative group">
                     <select 
                       className="w-full border border-slate-200 dark:border-gray-600 rounded-md px-2 h-7 outline-none focus:border-sky-400 dark:focus:border-sky-500 text-slate-800 dark:text-gray-200 appearance-none bg-white dark:bg-gray-800 transition-colors shadow-sm"
                       value={isMultiPackage ? '是' : '否'}
                       onChange={(e) => { setIsMultiPackage(e.target.value === '是'); handleFormChange(); }}
                     >
                       <option>否</option>
                       <option>是</option>
                     </select>
                     <ChevronDown size={11} className="absolute right-2 top-2 text-slate-300 dark:text-gray-600 pointer-events-none group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                   </div>
                </div>
                {isMultiPackage && (
                  <div className="flex flex-col space-y-1 text-[10.5px]">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold scale-95 origin-left whitespace-nowrap uppercase tracking-tight">
                      <span className="text-red-500 mr-0.5">*</span>包裹数量：
                    </div>
                    <input 
                      type="number"
                      className="w-full border border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-900/20 rounded-md px-2 h-7 outline-none focus:border-blue-400 dark:focus:border-blue-500 text-slate-800 dark:text-gray-200 transition-colors shadow-sm"
                      value={packageCount}
                      onChange={(e) => { setPackageCount(Math.max(1, parseInt(e.target.value) || 1)); handleFormChange(); }}
                    />
                  </div>
                )}
                <div className="col-span-2 grid grid-cols-2 gap-x-6">
                   <TextAreaGroup label="适用机型" limit="0 / 160" height="h-14" />
                   <TextAreaGroup label="材质明细" required limit="0 / 160" height="h-14" defaultValue="PC+铝合金+尼龙" />
                </div>
              </div>
            </section>

            {/* 1.5 包裹信息列表区块 (仅在一品多包开启时显示) */}
            {isMultiPackage && (
              <section className="pt-4 border-t border-slate-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-300">
                <SectionHeader title="包裹信息列表" icon={Package} />
                <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-gray-700 shadow-sm">
                  <table className="w-full text-[10px] border-collapse bg-white dark:bg-gray-900">
                    <thead>
                      <tr className="text-slate-400 dark:text-gray-500 bg-slate-50/50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-700 transition-colors duration-300">
                        <th className="py-2 px-6 font-bold text-left uppercase w-32">Package Name</th>
                        <th className="py-2 px-4 font-bold uppercase text-center">Length (cm)</th>
                        <th className="py-2 px-4 font-bold uppercase text-center">Width (cm)</th>
                        <th className="py-2 px-4 font-bold uppercase text-center">Height (cm)</th>
                        <th className="py-2 px-4 font-bold uppercase text-center">Weight (kg)</th>
                        <th className="py-2 px-6 font-bold text-right w-16">Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: packageCount }).map((_, idx) => (
                        <tr key={idx} className="border-b border-slate-100 dark:border-gray-800 hover:bg-blue-50/10 dark:hover:bg-gray-800 transition-colors duration-200">
                          <td className="py-2 px-6 font-bold text-slate-700 dark:text-gray-200">
                            <input className="w-full border-none px-0 h-7 bg-transparent outline-none focus:text-blue-600 font-mono" defaultValue={`Package ${String.fromCharCode(65 + idx)}`} />
                          </td>
                          <td className="py-2 px-4"><input className="w-24 mx-auto block border border-slate-100 dark:border-gray-700 rounded text-center h-7 outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-[10px]" placeholder="0" /></td>
                          <td className="py-2 px-4"><input className="w-24 mx-auto block border border-slate-100 dark:border-gray-700 rounded text-center h-7 outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-[10px]" placeholder="0" /></td>
                          <td className="py-2 px-4"><input className="w-24 mx-auto block border border-slate-100 dark:border-gray-700 rounded text-center h-7 outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-[10px]" placeholder="0" /></td>
                          <td className="py-2 px-4"><input className="w-24 mx-auto block border border-slate-100 dark:border-gray-700 rounded text-center h-7 outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-[10px]" placeholder="0" /></td>
                          <td className="py-2 px-6 text-right text-slate-400 dark:text-gray-500 font-mono italic text-[9px]">{idx + 1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 2. 规格、专利与营销区块 */}
            <div className="grid grid-cols-12 gap-8">
               <div className="col-span-4 border-r border-slate-100 dark:border-gray-700 pr-8">
                  <SectionHeader title="规格参数" icon={Plus} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputRow label="尺码" required placeholder="-" />
                    <InputRow label="直径" required value="0" unit="cm" />
                    
                    <div className="col-span-2">
                      <InputRow label="容量" required value="0" unit="L" />
                    </div>

                    <WeightInputRow label="单品重量" required value="0.1" />
                    <WeightInputRow label="包装重量" required value="0.2" />

                    <div className="col-span-2">
                       <SizeRow label="单品尺寸" values={['10', '10', '10']} unit="cm" />
                    </div>
                    
                    <div className="col-span-2 mt-2">
                      <SizeRow label="包装尺寸" values={['长度', '宽度', '高度']} unit="cm" placeholder />
                    </div>
                  </div>
               </div>

               <div className="col-span-3 border-r border-slate-100 dark:border-gray-700 pr-8">
                 <SectionHeader title="专利信息" icon={Calendar} />
                 <div className="space-y-4">
                   <InputRow 
                     label="专利说明" 
                     isSelect 
                     options={['无专利', '工厂专利', '自主专利']} 
                     value={patentType}
                     onChange={(e) => { setPatentType(e.target.value); handleFormChange(); }}
                   />
                   
                   <InputRow 
                     label="下证日期" 
                     required={patentType === '工厂专利' || patentType === '自主专利'}
                     icon={<Calendar size={12} className="text-slate-300 dark:text-gray-600"/>} 
                   />
                   <InputRow label="版权说明" isSelect />
                   
                   {/* 固定在版权说明下方 */}
                   {certificateUpload}
                  </div>
               </div>

               <div className="col-span-5">
                  <SectionHeader title="营销卖点设计" icon={Package} />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                     <div className="col-span-2">
                        <InputRow label="运营负责人" required isSelect />
                     </div>
                     <InputRow label="文案等级" required isSelect />
                     <InputRow label="图片等级" required isSelect />
                     <div className="col-span-2 grid grid-cols-2 gap-4 mt-1">
                        <TextAreaGroup label="图片要求" required height="h-20" limit="0 / 1300" />
                        <TextAreaGroup label="文案要求" required height="h-20" limit="0 / 1300" />
                        
                        <TextAreaGroup label="开发卖点" required height="h-20" limit="0 / 1300" />
                        <div className="flex flex-col space-y-1">
                           <span className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-tight"><span className="text-red-500 mr-0.5">*</span>参考图片：</span>
                           <label className="h-[80px] border border-dashed border-slate-200 dark:border-gray-600 rounded-md bg-slate-50 dark:bg-gray-800 flex flex-col items-center justify-center text-blue-600 font-bold text-[9px] cursor-pointer hover:bg-blue-50 transition-all shadow-inner relative overflow-hidden group">
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setRefImage)} />
                              {refImage ? (
                                <>
                                  <img src={refImage} alt="Reference" className="absolute inset-0 w-full h-full object-contain p-1 opacity-90 group-hover:opacity-50 transition-opacity" />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <span className="text-white font-bold text-[10px]">更换图片</span>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.preventDefault(); setRefImage(null); handleFormChange(); }}
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={10} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <Upload size={14} className="mb-1" /> 
                                  <span>上传或拖拽</span>
                                </>
                              )}
                           </label>
                        </div>

                        <div className="col-span-2 mt-1">
                           <InputRow label="参考链接" required />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 3-5. 底部综合信息区域 */}
            <section className="pt-4 border-t border-slate-100 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <SectionHeader title="仓储识别标识" icon={Plus} />
                  <TextAreaGroup label="入库标签短描述" required limit="0 / 200" height="h-24" />
                </div>
                <div>
                  <SectionHeader title="营销核心卖点" icon={Plus} />
                  <TextAreaGroup label="产品要点" required limit="0 / 160" height="h-24" />
                </div>
                <div>
                  <SectionHeader title="质量与生产要求" icon={Plus} />
                  <TextAreaGroup label="质量要求点" required limit="0 / 160" height="h-24" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-4">
           {hasChanges && <span className="text-amber-500 font-bold text-[11px] animate-pulse ml-2 flex items-center"><RefreshCw size={12} className="mr-1.5" /> 您有未保存的修改</span>}
           <div className="flex items-center space-x-2 text-[9px] text-slate-400 font-medium">
              <span className="bg-slate-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-gray-700">Ctrl + S 保存</span>
              <span className="bg-slate-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-gray-700">Ctrl + Enter 下一个</span>
           </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSaveAndNext}
            className="px-6 py-1.5 border border-emerald-500 text-emerald-600 rounded-[3px] text-[12px] font-bold hover:bg-emerald-50 transition-all active:scale-95 flex items-center group"
          >
            {isLastSample ? '保存并返回列表' : '保存并编辑下一个'}
            {isLastSample ? (
              <List size={14} className="ml-1.5 text-slate-400" />
            ) : (
              <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
          <button 
            onClick={handleCancelClick}
            className="px-10 py-1.5 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 rounded-[3px] text-[12px] font-bold hover:bg-slate-200 dark:hover:bg-gray-700 transition-all active:scale-95 uppercase tracking-wider"
          >
            取消
          </button>
          <button 
            onClick={handleSaveClick}
            className="px-10 py-1.5 bg-emerald-500 dark:bg-emerald-600 text-white rounded-[3px] text-[12px] font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all active:scale-95 uppercase tracking-wider"
          >
            保存
          </button>
        </div>
      </div>

      {/* 拦截弹窗 */}
      {showConfirmDialog && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
             <h3 className="text-lg font-bold text-slate-800 dark:text-gray-100 mb-2">放弃修改？</h3>
             <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">您当前有未保存的修改内容，离开后将丢失。是否确认离开？</p>
             <div className="flex justify-end space-x-3">
               <button 
                 onClick={() => setShowConfirmDialog(false)}
                 className="px-4 py-2 bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 rounded font-bold hover:bg-slate-200 dark:hover:bg-gray-600 text-xs"
               >
                 继续编辑
               </button>
               <button 
                 onClick={() => { setShowConfirmDialog(false); setHasChanges(false); setLayoutMode('list'); }}
                 className="px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 text-xs shadow-md"
               >
                 确认放弃
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SampleEditSection;
