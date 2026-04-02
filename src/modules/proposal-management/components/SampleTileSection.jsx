import React, { useState, useRef } from 'react';
import { Package, HelpCircle, ChevronDown, Upload, Calendar, Plus, X, RefreshCw } from 'lucide-react';
import { SectionHeader, InputRow, SizeRow, TextAreaGroup, WeightInputRow } from './FormComponents';

const SampleTileSection = ({ samples, activeTab, setLayoutMode, onUpdateSamples, onActiveTabChange, selectedIds, onToggleSelect, onClose }) => {
  const [isMultiPackage, setIsMultiPackage] = useState(false); // 是否一品多包
  const [packageCount, setPackageCount] = useState(2); // 默认包裹数量
  const [patentType, setPatentType] = useState('无专利'); // 专利说明状态

  // --- 复制样品功能 ---
  const handleCopy = (id) => {
    const currentIndex = samples.findIndex(s => s.id === id);
    if (currentIndex === -1) return;

    const targetSample = samples[currentIndex];
    const newId = `${targetSample.id}-copy-${Date.now().toString().slice(-4)}`;
    const newSample = {
      ...targetSample,
      id: newId,
      name: `${targetSample.name} (副本)`
    };

    const newSamples = [...samples];
    newSamples.splice(currentIndex + 1, 0, newSample);

    if (onUpdateSamples) {
      onUpdateSamples(newSamples);
      if (onActiveTabChange) {
        onActiveTabChange(newId);
      }
    }
  };

  const handleRemove = (id) => {
    if (samples.length <= 1) return;
    const newSamples = samples.filter(s => s.id !== id);
    if (onUpdateSamples) {
      onUpdateSamples(newSamples);
      if (activeTab === id && onActiveTabChange) {
        onActiveTabChange(newSamples[0].id);
      }
    }
  };

  const handleCancelClick = () => {
    if (onClose) onClose();
  };

  const handleSaveClick = () => {
    // 模拟保存逻辑
  };

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
    <div className="flex flex-col space-y-0.5 text-[9px]">
      <span className="text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider scale-90 origin-left">专利证书：</span>
      <label className="border border-dashed border-slate-200 dark:border-gray-600 rounded-md p-2 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-gray-800/50 hover:bg-white transition-all cursor-pointer shadow-inner relative overflow-hidden group h-[60px]">
        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setPatentImage)} />
        {patentImage ? (
          <>
            <img src={patentImage} alt="Patent" className="absolute inset-0 w-full h-full object-contain p-0.5 opacity-90 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white text-[8px]">更换</div>
            <button 
              onClick={(e) => { e.preventDefault(); setPatentImage(null); handleFormChange(); }}
              className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"
            >
              <X size={8} />
            </button>
          </>
        ) : (
          <>
            <Upload size={12} className="text-blue-500 mb-0.5" />
            <span className="text-[8px] font-bold text-blue-600 uppercase">Upload</span>
          </>
        )}
      </label>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative transition-colors duration-300 bg-white dark:bg-gray-900 font-sans">
      
      <div className="flex-1 overflow-y-auto p-2.5 space-y-4 no-scrollbar scroll-smooth bg-slate-50/30 dark:bg-gray-950/30">
        {samples.map((sample, sIdx) => (
          <div key={sample.id} className="border border-slate-200 dark:border-gray-700 rounded-md flex flex-col shadow-sm bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
            <div className="p-3.5">
              {/* 样品头部状态条 */}
              <div className="flex items-center justify-between px-3 py-0.5 border-b border-slate-100 dark:border-gray-700 mb-1.5 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2 text-[11px]">
                    <input 
                      type="checkbox" 
                      className="w-3.5 h-3.5 rounded border-slate-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer mr-1" 
                      checked={selectedIds?.includes(sample.id)}
                      onChange={() => onToggleSelect(sample.id)}
                    />
                    <span className="text-slate-400 font-bold uppercase tracking-tight">样品编码：</span>
                    <span className="text-slate-700 dark:text-gray-200 font-black tracking-tight">{sample.id}</span>
                    </div>

                    {/* 编辑状态标签 - 统一为 待编辑/待提交 */}
                    <div className={`flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider border transition-all duration-300 ${
                    sample.status === 'completed'
                    ? 'bg-blue-50 text-blue-600 border-blue-200' 
                    : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                    <div className={`w-1 h-1 rounded-full mr-1.5 ${sample.status === 'completed' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                    {sample.status === 'completed' ? '待编辑' : '待提交'}
                    </div>
                    </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="text-slate-400 font-bold">采购员：</span>
                  <span className="text-amber-500 font-black tracking-wider">{sample.purchaser}</span>
                </div>
              </div>

              {/* 核心区块整合到一行 - 样品图片 + 四大核心区块 */}
              <div className="flex divide-x divide-slate-100 dark:divide-gray-700 -mx-2">
                
                {/* 0. 样品图片列 */}
                <div className="px-3 w-[10%] shrink-0">
                  <div className="mb-1.5 scale-[0.9] origin-left"><SectionHeader title="样品图片" icon={Plus} /></div>
                  <div className="flex flex-col space-y-2">
                    <label className="aspect-square border border-dashed border-slate-200 dark:border-gray-600 rounded-md bg-slate-50 dark:bg-gray-800 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 transition-all relative overflow-hidden group shadow-inner">
                      <input type="file" className="hidden" accept="image/*" />
                      <div className="flex flex-col items-center text-slate-400 group-hover:text-blue-50 transition-colors">
                        <Upload size={16} />
                        <span className="text-[8px] font-bold mt-1 uppercase tracking-tighter">Main Image</span>
                      </div>
                    </label>
                    <p className="text-[8px] text-slate-400 text-center leading-tight">支持 JPG/PNG</p>
                  </div>
                </div>

                {/* 四大核心区块包裹层 */}
                <div className="flex flex-1 flex-col divide-y divide-slate-100 dark:divide-gray-700">
                  <div className="flex flex-1 divide-x divide-slate-100 dark:divide-gray-700">
                    {/* 1. 基本信息区块 */}
                    <div className="px-3 w-[33.3%] shrink-0">
                      <div className="mb-1.5 scale-[0.9] origin-left"><SectionHeader title="基本信息" icon={Package} /></div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <InputRow label="公司品牌" required isSelect />
                        <InputRow label="图案" required placeholder="-" />
                        <InputRow label="颜色" required value="灰色" />
                        <InputRow label="是否带电" required value="是" isSelect />
                        <InputRow label="是否CE类" required value="否" isSelect />
                        <InputRow label="规格" required value="英规" isSelect />
                        <InputRow label="包装方式" required value="盒装" isSelect />
                        <InputRow label="包装数量" required value="1pack" />
                        <InputRow label="色号" placeholder="-" />
                        <InputRow label="二级类目" isSelect />
                        <InputRow label="Logo可替换" required isSelect />
                        <InputRow label="建议物流方式" required isSelect />
                        <InputRow label="首单物流方式" required isSelect />
                        <InputRow label="适用机型" placeholder="-" />
                        <div className="flex flex-col space-y-0.5">                          <div className="flex items-center text-slate-400 dark:text-gray-500 font-bold scale-90 origin-left whitespace-nowrap uppercase tracking-tight">
                            <span className="text-red-500 mr-0.5">*</span>一品多包：
                          </div>
                          <div className="relative group">
                            <select 
                              className="w-full border border-slate-200 dark:border-gray-600 rounded-md px-2 h-6 outline-none focus:border-sky-400 dark:focus:border-sky-500 text-slate-800 dark:text-gray-200 appearance-none bg-white dark:bg-gray-800 transition-colors shadow-sm text-[10px]"
                              value={isMultiPackage ? '是' : '否'}
                              onChange={(e) => { setIsMultiPackage(e.target.value === '是'); }}
                            >
                              <option>否</option>
                              <option>是</option>
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1.5 text-slate-300 dark:text-gray-600 pointer-events-none" />
                          </div>
                        </div>
                        {isMultiPackage && (
                          <InputRow 
                            label="包裹数量" 
                            required 
                            type="number" 
                            value={packageCount} 
                            onChange={(e) => setPackageCount(parseInt(e.target.value) || 0)}
                          />
                        )}
                        <div className="col-span-2">
                          <TextAreaGroup label="材质明细" required limit="0 / 160" height="h-10" defaultValue="PC+铝合金+尼龙" />
                        </div>
                      </div>
                    </div>

                    {/* 2. 规格参数区块 */}
                    <div className="px-3 w-[22.2%] shrink-0">
                      <div className="mb-1.5 scale-[0.9] origin-left"><SectionHeader title="规格参数" icon={Plus} /></div>
                      <div className="space-y-1.5">
                        <InputRow label="尺码" required placeholder="-" />
                        <InputRow label="直径" required value="0" unit="cm" />
                        <InputRow label="容量" required value="0" unit="L" />
                        <WeightInputRow label="单品重量" required value="0.1" />
                        <WeightInputRow label="包装重量" required value="0.2" />
                        <div className="mt-1">
                          <SizeRow label="单品尺寸" values={['10', '10', '10']} unit="cm" />
                        </div>
                        <div className="mt-1">
                          <SizeRow label="包装尺寸" values={['长度', '宽度', '高度']} unit="cm" placeholder />
                        </div>
                        </div>
                        </div>
                    {/* 3. 专利信息区块 */}
                    <div className="px-3 w-[20%] shrink-0">
                      <div className="mb-1.5 scale-[0.9] origin-left"><SectionHeader title="专利信息" icon={Calendar} /></div>
                      <div className="space-y-2">
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
                          icon={<Calendar size={10} className="text-slate-300 dark:text-gray-600"/>} 
                        />
                        <InputRow label="版权说明" isSelect />
                        <div className="mt-1">{certificateUpload}</div>
                      </div>
                    </div>

                    {/* 4. 营销卖点设计区块 */}
                    <div className="px-3 w-[24.5%] shrink-0">
                      <div className="mb-1.5 scale-[0.9] origin-left"><SectionHeader title="营销卖点设计" icon={Package} /></div>
                      <div className="space-y-1.5">
                        <div className="grid grid-cols-2 gap-2">
                          <InputRow label="运营负责人" required isSelect />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <InputRow label="图片等级" required isSelect />
                          <InputRow label="文案等级" required isSelect />
                        </div>
                        <TextAreaGroup label="开发卖点" required height="h-10" limit="0 / 1300" />
                        <TextAreaGroup label="图片要求" required height="h-10" limit="0 / 1300" />
                        <TextAreaGroup label="文案要求" required height="h-10" limit="0 / 1300" />
                        <div className="space-y-1.5">
                          <InputRow label="参考链接" required />
                          <div className="flex flex-col space-y-0.5">
                            <span className="text-slate-400 dark:text-gray-500 text-[9px] font-bold uppercase tracking-tight scale-90 origin-left"><span className="text-red-500 mr-0.5">*</span>参考图片：</span>
                            <label className="h-[40px] border border-dashed border-slate-200 dark:border-gray-600 rounded-md bg-slate-50 dark:bg-gray-800 flex flex-col items-center justify-center text-blue-600 font-bold text-[8px] cursor-pointer hover:bg-blue-50 transition-all relative overflow-hidden group">
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setRefImage)} />
                                {refImage ? (
                                  <>
                                    <img src={refImage} alt="Reference" className="absolute inset-0 w-full h-full object-contain p-0.5" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white">更换</div>
                                  </>
                                ) : (
                                  <div className="flex items-center space-x-1"><Upload size={10} /> <span>上传</span></div>
                                )}
                            </label>
                          </div>
                        </div>                      </div>
                    </div>
                  </div>

                  {/* 1.5 包裹信息列表区块 (作为下方行) */}
                  {isMultiPackage && (
                    <div className="px-3 py-2 animate-in fade-in slide-in-from-top-1 duration-200 border-t border-slate-50 dark:border-gray-800/50">
                      <div className="mb-1.5 scale-[0.85] origin-left"><SectionHeader title="包裹信息列表" icon={Package} /></div>
                      <div className="overflow-x-auto rounded-sm border border-slate-100 dark:border-gray-700 shadow-sm">
                        <table className="w-full text-[10px] border-collapse bg-white dark:bg-gray-900">
                          <thead className="bg-slate-50/80 dark:bg-gray-800/50">
                            <tr className="text-slate-500 border-b border-slate-100 dark:border-gray-700 font-bold">
                              <th className="py-1.5 px-4 text-left w-32">包裹序号</th>
                              <th className="py-1.5 px-4 text-left">包裹名称</th>
                              <th className="py-1.5 px-2 text-center w-24">长(CM)</th>
                              <th className="py-1.5 px-2 text-center w-24">宽(CM)</th>
                              <th className="py-1.5 px-2 text-center w-24">高(CM)</th>
                              <th className="py-1.5 px-4 text-right w-28">毛重(kg)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: packageCount }).map((_, idx) => (
                              <tr key={idx} className="border-b border-slate-50 dark:border-gray-800 last:border-0 hover:bg-blue-50/20 transition-colors">
                                <td className="py-1.5 px-4 font-mono text-slate-400">
                                  PKG-{String(idx + 1).padStart(3, '0')}
                                </td>
                                <td className="py-1.5 px-4 font-black text-slate-700 dark:text-gray-200">
                                  <input className="w-full border-none bg-transparent outline-none focus:text-blue-600" defaultValue={`标准外箱-${String.fromCharCode(65 + idx)}`} />
                                </td>
                                <td className="py-1.5 px-2 text-center">
                                  <input className="w-16 border-b border-transparent hover:border-slate-200 focus:border-blue-400 text-center outline-none transition-all" defaultValue={(50 - idx * 5).toFixed(1)} />
                                </td>
                                <td className="py-1.5 px-2 text-center">
                                  <input className="w-16 border-b border-transparent hover:border-slate-200 focus:border-blue-400 text-center outline-none transition-all" defaultValue={(40 - idx * 5).toFixed(1)} />
                                </td>
                                <td className="py-1.5 px-2 text-center">
                                  <input className="w-16 border-b border-transparent hover:border-slate-200 focus:border-blue-400 text-center outline-none transition-all" defaultValue={(30 - idx * 5).toFixed(1)} />
                                </td>
                                <td className="py-1.5 px-4 text-right font-black text-blue-600 dark:text-blue-400">
                                  <input className="w-20 border-none bg-transparent text-right outline-none" defaultValue={(12.5 - idx * 2.3).toFixed(2)} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 3-5. 底部综合信息区域 (作为最下方行) */}
                  <div className="px-3 py-2.5 border-t border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                    <div className="grid grid-cols-3 gap-6">
                      {/* 3. 仓储识别标识 */}
                      <div className="space-y-2">
                        <div className="scale-90 origin-left">
                          <SectionHeader title="仓储识别标识" icon={Plus} iconColor="text-blue-500" />
                        </div>
                        <div className="pl-1">
                          <TextAreaGroup label="入库标签短描述" required limit="0 / 200" height="h-20" />
                        </div>
                      </div>

                      {/* 4. 营销核心卖点 */}
                      <div className="space-y-2">
                        <div className="scale-90 origin-left">
                          <SectionHeader title="营销核心卖点" icon={Plus} iconColor="text-blue-500" />
                        </div>
                        <div className="pl-1">
                          <TextAreaGroup label="产品要点" required limit="0 / 160" height="h-20" />
                        </div>
                      </div>

                      {/* 5. 质量与生产要求 */}
                      <div className="space-y-2">
                        <div className="scale-90 origin-left">
                          <SectionHeader title="质量与生产要求" icon={Plus} iconColor="text-blue-500" />
                        </div>
                        <div className="pl-1">
                          <TextAreaGroup label="质量要求点" required limit="0 / 160" height="h-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. 操作列 - 极简文字风格 */}
                <div className="w-[5%] shrink-0 flex flex-col items-center justify-center py-4 border-l border-slate-50 dark:border-gray-800">
                  <div className="flex flex-col space-y-6 w-full">
                    <button 
                      onClick={() => handleCopy(sample.id)}
                      className="w-full text-blue-600 dark:text-blue-400 font-black text-[11px] transition-all hover:text-blue-500 hover:scale-110 active:scale-95 text-center"
                      title="复制样品"
                    >
                      复制
                    </button>

                    <button 
                      onClick={handleSaveClick}
                      className="w-full text-emerald-600 dark:text-emerald-400 font-black text-[11px] transition-all hover:text-emerald-500 hover:scale-110 active:scale-95 text-center" 
                      title="保存修改"
                    >
                      保存
                    </button>

                    <button 
                      onClick={() => handleRemove(sample.id)}
                      className="w-full text-red-500 dark:text-red-400 font-black text-[11px] transition-all hover:text-red-600 hover:scale-110 active:scale-95 text-center"
                      title="删除样品"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleTileSection;
