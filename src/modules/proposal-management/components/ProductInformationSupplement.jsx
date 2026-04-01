import React, { useState, useRef } from 'react';
import { X, Upload, Copy, Trash2, ChevronDown, Plus, Calendar, Package, CheckCircle2, HelpCircle, FileUp, Download } from 'lucide-react';

const ProductDetailModal = ({ onClose }) => {
  const [samples, setSamples] = useState([
    { id: 'KFY-2026030002', name: '样品 01', status: 'completed', isDirty: true },
    { id: 'KFY-2026030003', name: '样品 02', status: 'pending', isDirty: false }
  ]);
  const [activeTab, setActiveTab] = useState(samples[0].id);
  const [isMultiPackage, setIsMultiPackage] = useState(false); // 是否一品多包
  const [packageCount, setPackageCount] = useState(2); // 默认包裹数量

  // 锚点引用
  const scrollContainerRef = useRef(null);
  const sectionRefs = {
    basic: useRef(null),
    specs: useRef(null),
    patent: useRef(null),
    selling: useRef(null),
    other: useRef(null)
  };

  const scrollToSection = (key) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans text-slate-800 antialiased">
      <div className="bg-white w-[1480px] max-w-full h-[95vh] rounded-md shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* 1. 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-[3px] h-3.5 bg-sky-500 rounded-full"></span>
            <h2 className="text-[13px] font-bold">样品信息完善</h2>
          </div>
          <X size={18} className="text-slate-400 cursor-pointer hover:text-red-500 transition-colors" onClick={onClose} />
        </div>

        {/* 2. 顶部汇总信息 */}
        <div className="px-4 py-3 border-b border-slate-100 bg-white shrink-0 space-y-3">
          <div className="border border-slate-200 rounded-sm overflow-hidden text-[11px]">
            <table className="w-full border-collapse text-center">
              <tbody>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <td className="py-1.5 border-r border-slate-200 w-[15%]">运营大类</td>
                  <td className="py-1.5 border-r border-slate-200 w-[15%] text-sky-600 font-bold">团队负责人</td>
                  <td colSpan={5}></td>
                </tr>
                <tr className="bg-white border-b border-slate-200 font-medium text-slate-700">
                  <td className="py-2 border-r border-slate-200">照明用品</td>
                  <td className="py-2 border-r border-slate-200 text-sky-600">张雪健</td>
                  <td colSpan={5}></td>
                </tr>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <td className="py-1.5 border-r border-slate-200">产品名称</td>
                  <td className="py-1.5 border-r border-slate-200">款式</td>
                  <td className="py-1.5 border-r border-slate-200">主材料</td>
                  <td className="py-1.5 border-r border-slate-200">适用品牌或对象</td>
                  <td className="py-1.5 border-r border-slate-200">型号</td>
                  <td className="py-1.5 border-r border-slate-200">SPU</td>
                  <td className="py-1.5 px-2">产品经理</td>
                </tr>
                <tr className="bg-white font-medium text-slate-700">
                  <td className="py-2 border-r border-slate-200">工作灯</td>
                  <td className="py-2 border-r border-slate-200">带支架款</td>
                  <td className="py-2 border-r border-slate-200">PC+铝合金+尼龙</td>
                  <td className="py-2 border-r border-slate-200">-</td>
                  <td className="py-2 border-r border-slate-200">-</td>
                  <td className="py-2 border-r border-slate-200 font-mono text-[10px]">ZM0007</td>
                  <td className="py-2">储张玲</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 text-[11px]">
             <div className="flex-1 flex items-center border border-slate-200 rounded-sm px-3 py-1 bg-slate-50/20">
                <span className="text-slate-400">开发品牌：</span><span className="ml-4 font-bold">MoKo</span>
             </div>
             <div className="flex-1 flex items-center border border-slate-200 rounded-sm px-3 py-1 bg-slate-50/20">
                <span className="text-slate-400">季节标签：</span><span className="ml-4 text-slate-300">无</span>
             </div>
             <div className="flex-1 flex items-center border border-slate-200 rounded-sm px-3 py-1 bg-slate-50/20">
                <span className="text-slate-400">节日标签：</span><span className="ml-4 font-bold">春节</span>
             </div>
          </div>
        </div>

        {/* 3. 主内容区域：左侧列表 + 右侧表单 */}
        <div className="flex-1 flex overflow-hidden bg-slate-50/50">
          
          {/* 左侧样品列表侧边栏 */}
          <div className="w-[280px] shrink-0 border-r border-slate-200 flex flex-col bg-white">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center space-x-2">
                <Package size={14} className="text-slate-400" />
                <span className="text-[12px] font-bold text-slate-700">样品清单</span>
                <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{samples.length}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-slate-500 hover:text-blue-600 text-[11px] font-bold transition-colors group/btn">
                  <FileUp size={13} className="mr-1 text-slate-400 group-hover/btn:text-blue-500" /> 导入
                </button>
                <div className="w-[1px] h-3 bg-slate-200"></div>
                <button className="flex items-center text-slate-500 hover:text-blue-600 text-[11px] font-bold transition-colors group/btn">
                  <Download size={13} className="mr-1 text-slate-400 group-hover/btn:text-blue-500" /> 导出
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => setActiveTab(sample.id)}
                  className={`group relative p-3 rounded-md border transition-all cursor-pointer ${
                    activeTab === sample.id 
                    ? 'bg-blue-50/50 border-blue-200 shadow-sm ring-1 ring-blue-100' 
                    : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${activeTab === sample.id ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`}></div>
                      <span className={`text-[11px] font-bold ${activeTab === sample.id ? 'text-blue-700' : 'text-slate-700'}`}>
                        {sample.id}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5">
                        {/* 操作按钮 (仅在非完成或 Hover 时显示) */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                           <button className="p-1 hover:bg-blue-100 text-blue-600 rounded transition-colors" title="复制样品">
                             <Copy size={12} />
                           </button>
                           <button className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors" title="移除样品">
                             <Trash2 size={12} />
                           </button>
                        </div>
                        
                        {/* 状态标记 */}
                        {sample.isDirty && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.6)] animate-pulse" title="有未保存的修改"></div>
                        )}
                        
                        {sample.status === 'completed' ? (
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        ) : (
                          <div className="text-[9px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 font-bold whitespace-nowrap">待完善</div>
                        )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] text-slate-500">
                      <span className="w-12 shrink-0">样品名称:</span>
                      <span className="truncate font-medium text-slate-700">{sample.name}</span>
                    </div>
                    <div className="flex items-center text-[10px] text-slate-500">
                      <span className="w-12 shrink-0">采购员:</span>
                      <span className="font-medium text-slate-700">储张玲</span>
                    </div>
                  </div>

                  {activeTab === sample.id && (
                    <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>已选择: <span className="text-blue-600 font-bold">1</span> / {samples.length}</span>
                <div className="flex items-center group relative">
                  <button className="text-blue-600 hover:underline mr-1">批量同步</button>
                  <HelpCircle size={12} className="text-slate-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 leading-relaxed">
                    点击此按钮可将已完善的样品属性信息同步至批量未完善的样品属性上
                    <div className="absolute top-full right-1.5 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧详细表单滚动区 */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* 锚点导航栏 */}
            <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center space-x-6 sticky top-0 z-20 shadow-sm">
              {[
                { key: 'basic', label: '基本信息' },
                { key: 'specs', label: '规格信息' },
                { key: 'patent', label: '专利信息' },
                { key: 'selling', label: '卖点设计' },
                { key: 'other', label: '其他信息' }
              ].map(nav => (
                <button 
                  key={nav.key}
                  onClick={() => scrollToSection(nav.key)}
                  className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center"
                >
                  <div className="w-1 h-1 bg-slate-300 rounded-full mr-1.5"></div>
                  {nav.label}
                </button>
              ))}
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth">
              <div className="border border-slate-200 rounded-sm flex flex-col shadow-sm bg-white overflow-hidden">
                <div className="flex items-stretch min-h-[500px]">
                  {/* 左侧大图 */}
                  <div className="w-36 shrink-0 p-4 flex flex-col items-center border-r border-slate-50">
                    <div className="w-32 h-32 bg-white border border-slate-200 rounded flex items-center justify-center p-1 relative">
                      <img src="https://img.alicdn.com/imgextra/i4/2206623910383/O1CN01r1Y3X21T8N1N1N1N1_!!2206623910383.jpg" className="max-w-full max-h-full object-contain mix-blend-multiply" alt="p" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2">点击图片放大查看</span>
                  </div>

                  {/* 右侧表单内容 */}
                  <div className="flex-1 grid grid-cols-12 min-w-0 border-l border-slate-50">
                    {/* 1. 基本信息 */}
                    <div ref={sectionRefs.basic} className="col-span-3 p-4 border-r border-slate-100">
                      <SectionHeader title="基本信息" icon={Package} />
                      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                        <InputRow label="公司品牌" required isSelect />
                        <InputRow label="色号" placeholder="-" />
                        <InputRow label="图案" required placeholder="-" />
                        <InputRow label="二级类目" required isSelect />
                        <InputRow label="颜色" required value="灰色" />
                        <InputRow label="Logo可替换" isSelect />
                        <InputRow label="是否带电" required value="是" isSelect />
                        <InputRow label="建议物流方式" isSelect />
                        <InputRow label="是否CE类" required value="否" isSelect />
                        <InputRow label="首单物流方式" isSelect />
                        <InputRow label="规格" required value="英规" isSelect />
                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium">适用机型：</span>
                           <div className="relative">
                              <textarea className="w-full h-12 border border-slate-200 rounded-sm p-1 text-[10px] outline-none focus:border-blue-400 transition-colors" />
                              <span className="absolute bottom-0.5 right-1 text-[9px] text-slate-300">0 / 160</span>
                           </div>
                        </div>
                        <InputRow label="包装方式" required value="盒装" isSelect />
                        <InputRow label="包装数量" required value="1pack" icon={<HelpCircle size={11} className="text-slate-400"/>} />
                        
                        <div className="flex flex-col space-y-0.5 text-[10.5px]">
                          <div className="flex items-center text-slate-400 font-bold scale-95 origin-left whitespace-nowrap">
                            <span className="text-red-500 mr-0.5">*</span>一品多包：
                          </div>
                          <div className="relative group">
                            <select 
                              className="w-full border border-slate-200 rounded-sm px-1.5 h-6 outline-none focus:border-sky-400 text-slate-800 appearance-none bg-white"
                              value={isMultiPackage ? '是' : '否'}
                              onChange={(e) => setIsMultiPackage(e.target.value === '是')}
                            >
                              <option>否</option>
                              <option>是</option>
                            </select>
                            <ChevronDown size={11} className="absolute right-1 top-1.5 text-slate-300 pointer-events-none group-hover:text-blue-500" />
                          </div>
                        </div>

                        {isMultiPackage && (
                          <div className="flex flex-col space-y-0.5 text-[10.5px]">
                            <div className="flex items-center text-slate-400 font-bold scale-95 origin-left whitespace-nowrap text-blue-600">
                              <span className="text-red-500 mr-0.5">*</span>包裹数量：
                            </div>
                            <input 
                              type="number"
                              className="w-full border border-blue-200 bg-blue-50/20 rounded-sm px-1.5 h-6 outline-none focus:border-blue-400 text-slate-800"
                              value={packageCount}
                              onChange={(e) => setPackageCount(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                          </div>
                        )}

                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium"><span className="text-red-500">*</span>材质明细：</span>
                           <div className="relative">
                              <textarea className="w-full h-12 border border-slate-200 rounded-sm p-1 text-[10px] outline-none focus:border-blue-400 transition-colors" defaultValue="PC+铝合金+尼龙" />
                              <span className="absolute bottom-0.5 right-1 text-[9px] text-slate-300">9 / 160</span>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. 规格信息 & 包裹信息列表 */}
                    <div className={`${isMultiPackage ? 'col-span-9' : 'col-span-4'} flex flex-col min-w-0`}>
                      <div className="flex flex-1">
                        {/* 规格信息子列 */}
                        <div ref={sectionRefs.specs} className={`${isMultiPackage ? 'w-1/4' : 'w-1/2'} p-4 border-r border-slate-100 min-w-0`}>
                          <SectionHeader title="规格信息" icon={Package} />
                          <div className="space-y-2">
                            <InputRow label="尺码" placeholder="-" />
                            <InputRow label="直径" value="0" unit="cm" />
                            <InputRow label="容量" value="0" unit="L" />
                            <SizeRow label="单品尺寸" values={['10', '10', '10']} unit="cm" />
                            <InputRow label="单品重量" required value="0.1" unit="kg" isSelect />
                            {!isMultiPackage && (
                              <>
                                <SizeRow label="包装尺寸" values={['长度', '宽度', '高度']} unit="cm" placeholder />
                                <InputRow label="包装重量" value="重量" unit="kg" isSelect />
                              </>
                            )}
                          </div>
                        </div>

                        {/* 专利信息子列 */}
                        <div ref={sectionRefs.patent} className={`${isMultiPackage ? 'w-1/4' : 'w-1/2'} p-4 border-r border-slate-100 min-w-0`}>
                          <SectionHeader title="专利信息" icon={Calendar} />
                          <div className="space-y-2.5">
                            <InputRow label="专利说明" isSelect />
                            <div className="flex items-center text-[10px] py-1">
                              <span className="text-slate-400 w-16">专利证书：</span>
                              <button className="text-blue-600 flex items-center font-bold"><Upload size={12} className="mr-1"/> 点击上传</button>
                            </div>
                            <InputRow label="下证日期" icon={<Calendar size={12} className="text-slate-300"/>} />
                            <InputRow label="版权说明" isSelect />
                          </div>
                        </div>

                        {/* 包裹信息列表 (仅开启时显示) */}
                        {isMultiPackage && (
                          <div className="w-1/2 p-4 border-r border-slate-100 bg-slate-50/20">
                            <SectionHeader title="包裹信息列表" icon={Package} />
                            <div className="overflow-x-auto">
                              <table className="w-full text-[10px] border-collapse">
                                <thead>
                                  <tr className="text-slate-400 bg-white border-b border-slate-200">
                                    <th className="py-1 font-medium text-left">包裹名称</th>
                                    <th className="py-1 font-medium">长(cm)</th>
                                    <th className="py-1 font-medium">宽(cm)</th>
                                    <th className="py-1 font-medium">高(cm)</th>
                                    <th className="py-1 font-medium">毛重(kg)</th>
                                    <th className="py-1 font-medium text-right">序号</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: packageCount }).map((_, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 hover:bg-white transition-colors">
                                      <td className="py-1.5 font-medium text-slate-700">
                                        <input 
                                          className="w-full border border-transparent hover:border-slate-200 rounded-sm px-1 h-5 outline-none focus:bg-white focus:border-blue-400 transition-all" 
                                          defaultValue={`包裹 ${String.fromCharCode(65 + idx)}`} 
                                        />
                                      </td>
                                      <td className="py-1.5 px-0.5"><input className="w-full border border-slate-200 rounded-sm text-center h-5 outline-none focus:border-blue-400" placeholder="0" /></td>
                                      <td className="py-1.5 px-0.5"><input className="w-full border border-slate-200 rounded-sm text-center h-5 outline-none focus:border-blue-400" placeholder="0" /></td>
                                      <td className="py-1.5 px-0.5"><input className="w-full border border-slate-200 rounded-sm text-center h-5 outline-none focus:border-blue-400" placeholder="0" /></td>
                                      <td className="py-1.5 px-0.5"><input className="w-full border border-slate-200 rounded-sm text-center h-5 outline-none focus:border-blue-400" placeholder="0" /></td>
                                      <td className="py-1.5 text-right text-slate-400">{idx + 1} of {packageCount}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 4. 卖点设计信息 */}
                    <div ref={sectionRefs.selling} className={`${isMultiPackage ? 'col-span-12' : 'col-span-5'} p-4 border-t border-slate-100`}>
                      <SectionHeader title="卖点设计信息" icon={Plus} />
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <InputRow label="运营负责人" required isSelect />
                        <InputRow label="参考链接" required />
                        <InputRow label="文案等级" required isSelect />
                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium"><span className="text-red-500">*</span>开发卖点：</span>
                           <div className="relative group/field">
                              <textarea className="w-full h-16 border border-slate-200 rounded-sm p-1 text-[10px] resize-none outline-none focus:border-blue-400 transition-colors" />
                              <span className="absolute bottom-0.5 right-1 text-[9px] text-slate-300">0 / 1300</span>
                           </div>
                        </div>
                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium"><span className="text-red-500">*</span>文案要求：</span>
                           <div className="relative group/field">
                              <textarea className="w-full h-16 border border-slate-200 rounded-sm p-1 text-[10px] resize-none outline-none focus:border-blue-400 transition-colors" />
                              <span className="absolute bottom-0.5 right-1 text-[9px] text-slate-300">0 / 1300</span>
                           </div>
                        </div>
                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium"><span className="text-red-500">*</span>参考图片：</span>
                           <div className="h-16 border border-dashed border-slate-200 rounded bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                             <Upload size={14} className="mb-0.5" />
                             <span className="text-[9px] font-bold text-blue-600">上传图片</span>
                           </div>
                        </div>
                        <InputRow label="图片等级" required isSelect />
                        <div className="flex flex-col space-y-0.5">
                           <span className="text-slate-400 text-[10px] font-medium"><span className="text-red-500">*</span>图片要求：</span>
                           <div className="relative group/field">
                              <textarea className="w-full h-16 border border-slate-200 rounded-sm p-1 text-[10px] resize-none outline-none focus:border-blue-400 transition-colors" />
                              <span className="absolute bottom-0.5 right-1 text-[9px] text-slate-300">0 / 1300</span>
                           </div>
                        </div>
                      </div>

                      {/* 其他信息 */}
                      <div ref={sectionRefs.other} className="mt-6 pt-4 border-t border-slate-100">
                        <SectionHeader title="其他信息" icon={HelpCircle} />
                        <div className="grid grid-cols-3 gap-6 mt-2">
                          <TextAreaGroup label="入库标签短描述" required limit="0 / 200" />
                          <TextAreaGroup label="产品要点" required limit="0 / 160" />
                          <TextAreaGroup label="质量要求点" required limit="0 / 160" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 底部按钮 */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3 bg-white shrink-0 relative z-10">
          <button className="px-9 py-1.5 bg-slate-100 text-slate-600 rounded-[3px] text-[12px] font-bold hover:bg-slate-200 transition-all" onClick={onClose}>取消</button>
          <button className="px-9 py-1.5 bg-sky-600 text-white rounded-[3px] text-[12px] font-bold hover:bg-sky-700 shadow-md transition-all">保存当前样品</button>
          <button className="px-9 py-1.5 bg-emerald-500 text-white rounded-[3px] text-[12px] font-bold hover:bg-emerald-600 shadow-md transition-all">全部提交</button>
        </div>
      </div>
    </div>
  );
};

// --- 小组件复用 ---
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200">
    <span className="text-[11px] font-extrabold text-blue-700 flex items-center">
      {Icon && <Icon size={12} className="mr-1.5 text-blue-500" />}
      {title}
    </span>
  </div>
);

const InputRow = ({ label, required, value, placeholder, isSelect, unit, icon }) => (
  <div className="flex flex-col space-y-0.5 text-[10.5px] p-1 rounded-sm transition-colors focus-within:bg-blue-50/40 group/row">
    <div className="flex items-center text-slate-400 font-bold scale-95 origin-left whitespace-nowrap group-focus-within/row:text-blue-600 transition-colors">
      {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
    </div>
    <div className="relative flex items-center group">
      <input className="w-full border border-slate-200 rounded-sm px-1.5 h-6 outline-none focus:border-blue-400 text-slate-800 bg-transparent transition-all" defaultValue={value} placeholder={placeholder} />
      {unit && <span className="absolute right-1.5 text-slate-400 scale-90 bg-white/80 px-0.5 font-bold pointer-events-none">{unit}</span>}
      {isSelect && <ChevronDown size={11} className="absolute right-1 text-slate-300 group-hover:text-blue-500" />}
      {icon && <span className="absolute right-1 text-slate-300">{icon}</span>}
    </div>
  </div>
);

const SizeRow = ({ label, values, unit, placeholder }) => (
  <div className="flex flex-col space-y-0.5 text-[10.5px] p-1 rounded-sm transition-colors focus-within:bg-blue-50/40 group/row">
    <div className="flex items-center text-slate-400 font-bold scale-95 origin-left group-focus-within/row:text-blue-600 transition-colors">
      <span className="text-red-500 mr-0.5">*</span>{label}：
    </div>
    <div className="flex items-center space-x-1">
      {values.map((v, i) => (
        <input key={i} className="w-full border border-slate-200 rounded-sm h-6 text-center outline-none focus:border-blue-400 text-slate-800 bg-transparent transition-all" defaultValue={placeholder ? '' : v} placeholder={placeholder ? v : ''} />
      ))}
      <span className="border border-slate-200 bg-slate-50/50 px-1 h-6 flex items-center justify-center text-slate-400 scale-90 rounded-sm font-bold shrink-0">{unit}</span>
    </div>
  </div>
);

const TextAreaGroup = ({ label, required, limit }) => (
  <div className="flex-1 flex flex-col space-y-1.5 text-[10.5px] p-2 rounded-md transition-colors focus-within:bg-blue-50/40 group/row">
    <div className="flex items-center text-slate-500 font-bold tracking-tight group-focus-within/row:text-blue-600 transition-colors">
      {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
    </div>
    <div className="relative">
      <textarea className="w-full border border-slate-200 rounded p-2.5 h-20 outline-none focus:border-blue-400 resize-none text-slate-800 shadow-inner font-medium bg-transparent transition-all" />
      <span className="absolute bottom-1.5 right-2 text-[9px] text-slate-300 font-mono pointer-events-none">{limit}</span>
    </div>
  </div>
);

export default ProductDetailModal;