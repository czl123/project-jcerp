import React, { useState, useRef } from 'react';
import { X, Plus, Edit3, Search, Link2Off, Link2, Trash2, Copy, UploadCloud, Package, Calendar, HelpCircle, FileUp, Download, Info, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormSection, SelectRow, FormInputRow, TextareaRow, ImageUploader, DimensionInput, WeightInputRow } from './FormComponents.jsx';

// ===================== 模拟数据 =====================
const MOCK_CATEGORIES = ["电子产品", "手机配件", "运动户外", "家居用品"];
const MOCK_BRANDS = ["Apple", "Samsung", "Huawei", "Xiaomi", "Google"];
const MOCK_COMPANY_BRANDS = ["MoKo", "TiMoVO", "Fintie", "ZtotopCase"];
const MOCK_FESTIVALS = ["无", "圣诞节", "万圣节", "复人节", "感恩节"];
const MOCK_SEASONS = ["四季通用", "春季", "夏季", "秋季", "冬季"];
const MOCK_SPECS = ["通用", "标准", "大号", "小号", "定制"];

// ===================== 模拟部门与 Team 联动数据 =====================
const MOCK_DEPT_TEAMS = {
  "采购部": ["采购一组", "采购二组", "海外采购组"],
  "运营部": ["亚马逊Team", "独立站Team", "沃尔玛Team"],
  "销售部": ["国内销售组", "跨境销售组"],
  "产品部": ["研发Team", "设计Team", "规格Team"]
};

const MOCK_MAIN_MATERIALS = [
  { id: 1, name: "iPhone 15 Pro 磨砂手机壳", spu: "SPU-M001", code: "MAT-10001", category: "手机配件", spec: "6.1英寸 - 黑色" },
  { id: 2, name: "iPhone 15 Pro Max 磨砂手机壳", spu: "SPU-M001", code: "MAT-10002", category: "手机配件", spec: "6.7英寸 - 黑色" },
  { id: 3, name: "iPad Air 5 磁吸保护套", spu: "SPU-M002", code: "MAT-20001", category: "平板配件", spec: "10.9英寸 - 蓝色" },
  { id: 4, name: "USB-C 20W 快速充电头", spu: "SPU-M003", code: "MAT-30001", category: "电子配件", spec: "美规 - 白色" },
];

const NewMaterialModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('基本信息'); 
  const scrollContainerRef = useRef(null);
  
  // 1. 基本信息 (全量字段)
  const [basicInfo, setBasicInfo] = useState({
    category: '', name: '', style: '', mainMaterial: '', targetBrand: '', model: '',
    companyBrand: '', pattern: '', color: '', size: '', packQty: '',
    festival: '无', season: '四季通用', battery: '否', ce: '否', machine: '', materialDetail: '', colorCode: '', spec: '',
    sellingPoints: '', qualityReq: '', specModelDetail: '', labelDesc: ''
  });

  const [citeTarget, setCiteTarget] = useState(''); // 显式确保 citeTarget 存在

  // 2. 关联主物料
  const [mainMaterialSearch, setMainMaterialSearch] = useState('');
  const [foundMaterials, setFoundMaterials] = useState([]);
  const [associatedMaterials, setAssociatedMaterials] = useState([]);
  const [selectedFoundIds, setSelectedFoundIds] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 3. 采购与规格 (全量字段)
  const [procurementInfo, setProcurementInfo] = useState({
    productionCycle: '', moq: '', moqRemark: '',
    canInvoice: '是', invoiceName: '', invoiceSpec: '', customsMaterial: '', invoiceUnit: 'PCS',
    itemDim: { l: '', w: '', h: '' }, netWeight: { value: '', unit: 'kg' },
    packageDim: { l: '', w: '', h: '' }, grossWeight: { value: '', unit: 'kg' },
    procurementImages: []
  });

  // 4. 首单信息
  const [firstOrderRows, setFirstOrderRows] = useState([{ id: Date.now(), requester: '', dept: '', team: '', quantity: '', deadline: '' }]);

  const sectionRefs = { '基本信息': useRef(null), '关联主物料': useRef(null), '采购信息': useRef(null), '首单信息': useRef(null) };
  const isManualScrolling = useRef(false); 

  // 核心逻辑：滚动监听
  const handleScroll = () => {
    if (isManualScrolling.current) return; 
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollPos = container.scrollTop + 120; 
    const sections = Object.entries(sectionRefs);
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const [tab, ref] = sections[i];
      if (ref.current && scrollPos >= ref.current.offsetTop) {
        if (activeTab !== tab) setActiveTab(tab);
        break;
      }
    }
  };

  const handleBasicInfoChange = (field, value) => setBasicInfo(prev => ({ ...prev, [field]: value }));
  const handleProcurementChange = (field, value) => setProcurementInfo(prev => ({ ...prev, [field]: value }));

  const handleCiteSPU = (e) => {
    if (e.key === 'Enter' && citeTarget.trim()) {
      const mockCitedData = {
        category: "手机配件",
        name: "iPhone 15 Pro 磨砂手机壳",
        style: "简约商务",
        mainMaterial: "PC+TPU",
        targetBrand: "Apple",
        model: "iPhone 15 Pro"
      };
      setBasicInfo(prev => ({ ...prev, ...mockCitedData }));
      console.log(`已成功引用 SPU: ${citeTarget} 的同款属性`);
    }
  };

  const handleSearchMainMaterial = () => {
    setIsSearching(true); setHasSearched(false);
    setTimeout(() => {
      let filtered = mainMaterialSearch.trim() ? MOCK_MAIN_MATERIALS.filter(m => m.name.includes(mainMaterialSearch) || m.spu.includes(mainMaterialSearch)) : MOCK_MAIN_MATERIALS.slice(0, 4);
      setFoundMaterials(filtered); setSelectedFoundIds([]); setIsSearching(false); setHasSearched(true);
    }, 400);
  };

  const handleAddMaterials = () => {
    const toAdd = foundMaterials.filter(m => selectedFoundIds.includes(m.id)).filter(item => !associatedMaterials.some(a => a.id === item.id));
    setAssociatedMaterials(prev => [...prev, ...toAdd]); setSelectedFoundIds([]);
  };

  const handleSingleAssociate = (material) => {
    if (!associatedMaterials.some(a => a.id === material.id)) setAssociatedMaterials(prev => [...prev, material]);
  };

  const scrollToSection = (tab) => {
    setActiveTab(tab);
    if (sectionRefs[tab].current) {
      isManualScrolling.current = true; 
      sectionRefs[tab].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isManualScrolling.current = false; }, 800);
    }
  };

  const updateFirstOrderRow = (id, field, value) => {
    setFirstOrderRows(prev => prev.map(row => {
      if (row.id === id) {
        if (field === 'dept') { return { ...row, dept: value, team: '' }; }
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm p-2 text-slate-800 dark:text-gray-200 antialiased font-sans text-[12px] transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-[1560px] max-w-full h-[96vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-gray-700 transition-colors duration-300">
        
        {/* 顶部标题 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
            <h2 className="text-[13px] font-black text-slate-700 dark:text-gray-100">新建配件物料 <span className="text-slate-300 dark:text-gray-600 font-normal ml-2">COMPACT PRO</span></h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-md transition-colors"><X size={18} className="text-slate-400" /></button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* 左侧侧边栏 */}
          <div className="w-[180px] shrink-0 border-r border-slate-100 dark:border-gray-800 flex flex-col bg-slate-50/20 dark:bg-gray-800/20 transition-colors duration-300">
            <div className="p-4 border-b border-slate-100 dark:border-gray-800 flex flex-col items-center">
               <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg"><Package size={18} /></div>
               <div className="text-[11px] font-bold text-slate-700 dark:text-gray-200 truncate w-32 text-center">{basicInfo.name || '未命名配件'}</div>
            </div>
            <div className="flex-1 p-1 space-y-0.5">
              {[
                { name: '基本信息', icon: <Info size={13} /> },
                { name: '关联主物料', icon: <Link2 size={13} />, info: associatedMaterials.length },
                { name: '采购信息', icon: <Calendar size={13} /> },
                { name: '首单信息', icon: <Plus size={13} />, info: firstOrderRows.length }
              ].map((tab) => (
                <div key={tab.name} onClick={() => scrollToSection(tab.name)} className={`px-2.5 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-between ${activeTab === tab.name ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold shadow-sm border border-slate-100 dark:border-gray-700' : 'text-slate-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/60'}`}>
                  <div className="flex items-center space-x-2">{tab.icon}<span className="text-[11px]">{tab.name}</span></div>
                  {tab.info > 0 && <span className="text-[9px] bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 px-1.5 py-0.5 rounded-md font-bold">{tab.info}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 右侧主内容区 */}
          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-8 scroll-smooth no-scrollbar dark:bg-gray-900 transition-colors duration-300">
            
            {/* 1. 基本信息区块 */}
            <div ref={sectionRefs['基本信息']} className="space-y-4">
              <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between transition-colors duration-300">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[13px]"><Info size={14} className="text-blue-500" /><span>基本信息</span></div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-gray-800 px-2 py-0.5 rounded border border-slate-100 dark:border-gray-700 flex items-center gap-1 transition-colors duration-300">
                      <Search size={10}/> 引用 SPU: 
                      <input 
                        className="w-24 bg-transparent outline-none border-none text-blue-600 dark:text-blue-400 font-bold placeholder:font-normal" 
                        placeholder="回车填充" 
                        value={citeTarget}
                        onChange={(e) => setCiteTarget(e.target.value)}
                        onKeyDown={handleCiteSPU}
                      />
                   </span>
                </div>
              </div>

              <div className="bg-slate-50/30 dark:bg-gray-800/40 p-4 rounded-xl border border-slate-100 dark:border-gray-700 space-y-6 transition-colors duration-300">
                 <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                    <div className="col-span-3 flex items-center gap-2 text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1"><div className="w-1 h-3 bg-blue-500 rounded-full"></div> 同款属性 Identical</div>
                    <SelectRow label="运营大类" required options={MOCK_CATEGORIES} value={basicInfo.category} onChange={(v) => handleBasicInfoChange('category', v.target.value)} />
                    <FormInputRow label="产品名称" required value={basicInfo.name} onChange={(e) => handleBasicInfoChange('name', e.target.value)} />
                    <FormInputRow label="款式" required value={basicInfo.style} onChange={(e) => handleBasicInfoChange('style', e.target.value)} />
                    <FormInputRow label="主材料" required value={basicInfo.mainMaterial} onChange={(e) => handleBasicInfoChange('mainMaterial', e.target.value)} />
                    <FormInputRow label="适用品牌或对象" required value={basicInfo.targetBrand} onChange={(e) => handleBasicInfoChange('targetBrand', e.target.value)} />
                    <FormInputRow label="型号" required value={basicInfo.model} onChange={(e) => handleBasicInfoChange('model', e.target.value)} />
                    <div className="col-span-3 h-px bg-slate-100 dark:bg-gray-700"></div>
                    <div className="col-span-3 flex items-center gap-2 text-[11px] font-bold text-orange-600 dark:text-orange-400 mb-1"><div className="w-1 h-3 bg-orange-500 rounded-full"></div> 关键属性 Key Attrs</div>
                    <SelectRow label="公司品牌" required options={MOCK_COMPANY_BRANDS} value={basicInfo.companyBrand} onChange={(v) => handleBasicInfoChange('companyBrand', v.target.value)} />
                    <FormInputRow label="图案" required value={basicInfo.pattern} onChange={(e) => handleBasicInfoChange('pattern', e.target.value)} />
                    <FormInputRow label="颜色" required value={basicInfo.color} onChange={(e) => handleBasicInfoChange('color', e.target.value)} />
                    <FormInputRow label="尺码" required value={basicInfo.size} onChange={(e) => handleBasicInfoChange('size', e.target.value)} />
                    <FormInputRow label="包装数量" required unit="pcs" value={basicInfo.packQty} onChange={(e) => handleBasicInfoChange('packQty', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 gap-x-4 gap-y-3 pt-4 border-t border-slate-50 dark:border-gray-700">
                    <div className="col-span-4 flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase"><div className="w-1 h-3 bg-slate-300 dark:bg-gray-600 rounded-full"></div> 一般属性 General</div>
                    <SelectRow label="节日标签" options={MOCK_FESTIVALS} value={basicInfo.festival} onChange={(v) => handleBasicInfoChange('festival', v.target.value)} />
                    <SelectRow label="季节标签" options={MOCK_SEASONS} value={basicInfo.season} onChange={(v) => handleBasicInfoChange('season', v.target.value)} />
                    <SelectRow label="是否带电" options={["是", "否"]} value={basicInfo.battery} onChange={(v) => handleBasicInfoChange('battery', v.target.value)} />
                    <SelectRow label="是否CE类" options={["是", "否"]} value={basicInfo.ce} onChange={(v) => handleBasicInfoChange('ce', v.target.value)} />
                    <FormInputRow label="适用机型" value={basicInfo.machine} onChange={(e) => handleBasicInfoChange('machine', e.target.value)} />
                    <FormInputRow label="材质明细" value={basicInfo.materialDetail} onChange={(e) => handleBasicInfoChange('materialDetail', e.target.value)} />
                    <FormInputRow label="色号" value={basicInfo.colorCode} onChange={(e) => handleBasicInfoChange('colorCode', e.target.value)} />
                    <SelectRow label="规格" options={MOCK_SPECS} value={basicInfo.spec} onChange={(v) => handleBasicInfoChange('spec', v.target.value)} />
                    </div>

                 <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-slate-50 dark:border-gray-700">
                    <div className="col-span-2 flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1"><div className="w-1 h-3 bg-emerald-500 rounded-full"></div> 补充说明 Remarks</div>
                    <TextareaRow label="产品要点" value={basicInfo.sellingPoints} onChange={(e) => handleBasicInfoChange('sellingPoints', e.target.value)} />
                    <TextareaRow label="质量要求" value={basicInfo.qualityReq} onChange={(e) => handleBasicInfoChange('qualityReq', e.target.value)} />
                    <TextareaRow label="规格型号" value={basicInfo.specModelDetail} onChange={(e) => handleBasicInfoChange('specModelDetail', e.target.value)} />
                    <TextareaRow label="标签描述" value={basicInfo.labelDesc} onChange={(e) => handleBasicInfoChange('labelDesc', e.target.value)} />
                 </div>
              </div>
            </div>

            {/* 2. 关联主物料区块 */}
            <div ref={sectionRefs['关联主物料']} className="space-y-3">
               <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[13px] transition-colors duration-300"><Link2 size={14} className="text-blue-500" /><span>关联主物料</span></div>
               <div className="flex gap-2 px-2">
                  <div className="flex-1 relative flex items-center">
                     <Search size={13} className="absolute left-2.5 text-slate-400 dark:text-gray-500" />
                     <input className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded pl-8 pr-3 h-8 text-[11px] outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-slate-700 dark:text-gray-200" placeholder="输入名称或 SPU 搜索..." value={mainMaterialSearch} onChange={(e) => setMainMaterialSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearchMainMaterial()} />
                     {isSearching && <div className="absolute right-2.5 animate-spin text-blue-500"><Plus size={12} /></div>}
                  </div>
                  <button onClick={handleSearchMainMaterial} className="px-4 h-8 bg-slate-800 dark:bg-gray-700 text-white rounded font-bold text-[11px] hover:bg-slate-900 dark:hover:bg-gray-600 transition-all">搜索</button>
               </div>

               {/* 搜索结果面板 */}
               {(foundMaterials.length > 0 || (hasSearched && !isSearching)) && (
                  <div className="mx-2 mt-2 border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-1 transition-colors duration-300">
                     <div className="bg-blue-50/50 dark:bg-blue-900/20 px-3 py-1.5 border-b border-blue-100 dark:border-blue-900/50 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">搜索结果 ({foundMaterials.length})</span>
                        <button onClick={handleAddMaterials} disabled={selectedFoundIds.length === 0} className="text-[10px] font-bold bg-blue-600 dark:bg-blue-700 text-white px-2 py-0.5 rounded">关联所选 ({selectedFoundIds.length})</button>
                     </div>
                     <div className="max-h-[200px] overflow-y-auto">
                        <table className="w-full text-left text-[11px]">
                           <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                              {foundMaterials.map(m => {
                                 const isAdded = associatedMaterials.some(a => a.id === m.id);
                                 return (
                                   <tr key={m.id} className={`hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer ${selectedFoundIds.includes(m.id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`} onClick={() => !isAdded && setSelectedFoundIds(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])}>
                                      <td className="px-3 py-2 w-8"><input type="checkbox" disabled={isAdded} checked={selectedFoundIds.includes(m.id)} onChange={() => {}} className="rounded-sm text-blue-600 dark:accent-blue-500" /></td>
                                      <td className="px-2 py-2 font-bold dark:text-gray-200">{m.name} {isAdded && <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-1 rounded-full ml-1">已关联</span>}</td>
                                      <td className="px-2 py-2 text-slate-400 dark:text-gray-500 font-mono">{m.spu}</td>
                                      <td className="px-3 py-2 text-right">{!isAdded ? <button onClick={(e) => { e.stopPropagation(); handleSingleAssociate(m); }} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">关联</button> : <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400 ml-auto" />}</td>
                                   </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     </div>
                  </div>
               )}

               {/* 已关联清单 */}
               {associatedMaterials.length > 0 && (
                  <div className="mx-2 mt-2 border border-slate-100 dark:border-gray-700 rounded-lg overflow-hidden bg-slate-50/20 dark:bg-gray-800/20 shadow-sm transition-colors duration-300">
                     <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:text-gray-400 border-b border-slate-100 dark:border-gray-700 uppercase tracking-tight">已关联主物料清单</div>
                     <table className="w-full text-left text-[11px] bg-white dark:bg-gray-800 transition-colors duration-300">
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                           {associatedMaterials.map(m => (
                              <tr key={m.id} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10">
                                 <td className="px-3 py-1.5 font-bold text-slate-700 dark:text-gray-200">{m.name}</td>
                                 <td className="px-3 py-1.5 text-slate-400 dark:text-gray-500 font-mono">{m.spu} / {m.code}</td>
                                 <td className="px-3 py-1.5 text-right"><button onClick={() => setAssociatedMaterials(prev => prev.filter(i => i.id !== m.id))} className="text-slate-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 p-1"><Trash2 size={14} /></button></td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>

            {/* 3. 采购与规格信息区块 */}
            <div ref={sectionRefs['采购信息']} className="space-y-4">
               <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[13px] transition-colors duration-300"><Calendar size={14} className="text-blue-500" /><span>采购与规格信息</span></div>
               
               <div className="grid grid-cols-2 gap-4 px-2">
                  <div className="space-y-4 p-3 border border-slate-100 dark:border-gray-700 rounded-xl bg-slate-50/30 dark:bg-gray-800/40 shadow-sm transition-colors duration-300">
                     <div>
                        <div className="flex items-center gap-2 mb-3"><div className="w-1 h-3 bg-blue-500 rounded-full"></div><span className="text-[11px] font-bold text-slate-700 dark:text-gray-200">采购基础 Procurement</span></div>
                        <div className="grid grid-cols-2 gap-3">
                           <FormInputRow label="生产周期" unit="天" value={procurementInfo.productionCycle} onChange={(e) => handleProcurementChange('productionCycle', e.target.value)} />
                           <FormInputRow label="起订量" unit="PCS" value={procurementInfo.moq} onChange={(e) => handleProcurementChange('moq', e.target.value)} />
                           <FormInputRow label="起订备注" colspan={2} value={procurementInfo.moqRemark} onChange={(e) => handleProcurementChange('moqRemark', e.target.value)} />
                        </div>
                     </div>
                     <div className="h-px bg-slate-100 dark:bg-gray-700"></div>
                     <div>
                        <div className="flex items-center gap-2 mb-3"><div className="w-1 h-3 bg-emerald-500 rounded-full"></div><span className="text-[11px] font-bold text-slate-700 dark:text-gray-200">开票信息 Invoicing</span></div>
                        <div className="grid grid-cols-2 gap-3">
                           <SelectRow label="能否开票" options={["", "是", "否"]} value={procurementInfo.canInvoice} onChange={(v) => handleProcurementChange('canInvoice', v.target.value)} />
                           <SelectRow 
                              label="开票单位" 
                              required={procurementInfo.canInvoice === '是'} 
                              disabled={!procurementInfo.canInvoice || procurementInfo.canInvoice === '否'} 
                              options={["PCS", "SET", "KG", "M"]} 
                              value={procurementInfo.invoiceUnit} 
                              onChange={(v) => handleProcurementChange('invoiceUnit', v.target.value)} 
                           />
                           <FormInputRow 
                              label="开票品名" 
                              colspan={2} 
                              required={procurementInfo.canInvoice === '是'} 
                              disabled={!procurementInfo.canInvoice || procurementInfo.canInvoice === '否'} 
                              value={procurementInfo.invoiceName} 
                              onChange={(e) => handleProcurementChange('invoiceName', e.target.value)} 
                           />
                           <FormInputRow 
                              label="规格型号" 
                              required={procurementInfo.canInvoice === '是'} 
                              disabled={!procurementInfo.canInvoice || procurementInfo.canInvoice === '否'} 
                              value={procurementInfo.invoiceSpec} 
                              onChange={(e) => handleProcurementChange('invoiceSpec', e.target.value)} 
                           />
                           <FormInputRow 
                              label="报关材质" 
                              required={procurementInfo.canInvoice === '是'} 
                              disabled={!procurementInfo.canInvoice || procurementInfo.canInvoice === '否'} 
                              value={procurementInfo.customsMaterial} 
                              onChange={(e) => handleProcurementChange('customsMaterial', e.target.value)} 
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4 p-3 border border-slate-100 dark:border-gray-700 rounded-xl bg-slate-50/30 dark:bg-gray-800/40 shadow-sm transition-colors duration-300">
                     <div>
                        <div className="flex items-center gap-2 mb-3"><div className="w-1 h-3 bg-orange-500 rounded-full"></div><span className="text-[11px] font-bold text-slate-700 dark:text-gray-200">规格参数 Specifications</span></div>
                        <div className="space-y-3 px-1">
                           <DimensionInput label="单品规格" required value={procurementInfo.itemDim} onChange={(v) => handleProcurementChange('itemDim', v)} />
                           <DimensionInput label="包装规格" required value={procurementInfo.packageDim} onChange={(v) => handleProcurementChange('packageDim', v)} />
                           <div className="grid grid-cols-2 gap-3">
                              <WeightInputRow label="净重" required value={procurementInfo.netWeight} onChange={(v) => handleProcurementChange('netWeight', v)} />
                              <WeightInputRow label="毛重" value={procurementInfo.grossWeight} onChange={(v) => handleProcurementChange('grossWeight', v)} />
                           </div>
                        </div>
                     </div>
                     <div className="h-px bg-slate-100 dark:bg-gray-700"></div>
                     <div>
                        <div className="flex items-center gap-2 mb-3"><div className="w-1 h-3 bg-indigo-500 rounded-full"></div><span className="text-[11px] font-bold text-slate-700 dark:text-gray-200">产品图片 Images</span></div>
                        <ImageUploader images={procurementInfo.procurementImages} onUpload={(imgs) => handleProcurementChange('procurementImages', imgs)} />
                     </div>
                  </div>
               </div>
            </div>

            {/* 4. 首单需求区块 */}
            <div ref={sectionRefs['首单信息']} className="space-y-3">
               <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[13px]"><Calendar size={14} className="text-blue-500" /><span>首单需求</span></div>
                  <button onClick={() => setFirstOrderRows(prev => [...prev, { id: Date.now(), requester: '', dept: '', team: '', quantity: '', deadline: '' }])} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">+ 新增行</button>
               </div>
               <div className="mx-2 border border-slate-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
                  <table className="w-full text-left text-[11px]">
                     <thead className="bg-slate-50 dark:bg-gray-700 text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700 uppercase tracking-tighter">
                        <tr><th className="px-3 py-2 font-bold w-[20%]">需求人 *</th><th className="px-3 py-2 font-bold w-[30%]">部门/Team</th><th className="px-3 py-2 font-bold text-center w-[20%]">数量 *</th><th className="px-3 py-2 font-bold text-center w-[20%]">交期 *</th><th className="px-3 py-2 text-center w-[10%]">操作</th></tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-gray-700 transition-colors duration-300">
                        {firstOrderRows.map(row => (
                           <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50">
                              <td className="px-2 py-1"><input className="w-full h-7 bg-transparent px-2 outline-none focus:bg-white dark:focus:bg-gray-800 border border-transparent focus:border-blue-100 dark:focus:border-blue-900/50 rounded text-[11px] text-slate-700 dark:text-gray-200" placeholder="姓名" value={row.requester} onChange={e => updateFirstOrderRow(row.id, 'requester', e.target.value)} /></td>
                              <td className="px-2 py-1">
                                 <div className="flex gap-1">
                                    <select 
                                       className="w-1/2 h-7 bg-transparent px-1 outline-none focus:bg-white dark:focus:bg-gray-800 border border-transparent focus:border-blue-100 dark:focus:border-blue-900/50 rounded text-[11px] appearance-none cursor-pointer text-slate-700 dark:text-gray-200"
                                       value={row.dept}
                                       onChange={e => updateFirstOrderRow(row.id, 'dept', e.target.value)}
                                    >
                                       <option value="" className="dark:bg-gray-800">部门</option>
                                       {Object.keys(MOCK_DEPT_TEAMS).map(dept => <option key={dept} value={dept} className="dark:bg-gray-800">{dept}</option>)}
                                    </select>
                                    <select 
                                       className="w-1/2 h-7 bg-transparent px-1 outline-none focus:bg-white dark:focus:bg-gray-800 border border-transparent focus:border-blue-100 dark:focus:border-blue-900/50 rounded text-[11px] appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 text-slate-700 dark:text-gray-200"
                                       value={row.team}
                                       disabled={!row.dept}
                                       onChange={e => updateFirstOrderRow(row.id, 'team', e.target.value)}
                                    >
                                       <option value="" className="dark:bg-gray-800">Team</option>
                                       {row.dept && MOCK_DEPT_TEAMS[row.dept].map(team => <option key={team} value={team} className="dark:bg-gray-800">{team}</option>)}
                                    </select>
                                 </div>
                              </td>
                              <td className="px-2 py-1 text-center"><input type="number" className="w-full h-7 text-center bg-transparent px-2 outline-none focus:bg-white dark:focus:bg-gray-800 border border-transparent focus:border-blue-100 dark:focus:border-blue-900/50 rounded text-[11px] font-mono text-slate-700 dark:text-gray-200" placeholder="0" value={row.quantity} onChange={e => updateFirstOrderRow(row.id, 'quantity', e.target.value)} /></td>
                              <td className="px-2 py-1 text-center"><input type="date" className="w-full h-7 text-center bg-transparent px-2 outline-none focus:bg-white dark:focus:bg-gray-800 border border-transparent focus:border-blue-100 dark:focus:border-blue-900/50 rounded text-[11px] text-slate-500 dark:text-gray-400" value={row.deadline} onChange={e => updateFirstOrderRow(row.id, 'deadline', e.target.value)} /></td>
                              <td className="px-2 py-1 text-center"><button onClick={() => firstOrderRows.length > 1 && setFirstOrderRows(prev => prev.filter(r => r.id !== row.id))} className="p-1 text-slate-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 size={14} /></button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-gray-800 flex justify-end space-x-2 bg-white dark:bg-gray-900 shrink-0 shadow-inner transition-colors duration-300">
          <button className="px-5 py-1.5 bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 rounded font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-gray-700 transition-all" onClick={onClose}>取消</button>
          <button className="px-8 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded font-bold text-[11px] hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95">保存配件物料信息</button>
        </div>
      </div>
    </div>
  );
};

export default NewMaterialModal;
