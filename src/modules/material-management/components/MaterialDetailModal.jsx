import React, { useState, useRef, useEffect } from 'react';
import { X, Info, Calendar, Lightbulb, User, Tag, Box, Link2, History, Package, Search, Edit3, CheckCircle2, UserCircle2, ExternalLink, Copy, Check, Save, RotateCcw, Sparkles, ShieldCheck, FileText } from 'lucide-react';
import { SelectRow, FormInputRow, TextareaRow, DimensionInput, WeightInputRow, ImageUploader } from './FormComponents.jsx';

// ===================== 模拟数据字典 =====================
const MOCK_CATEGORIES = ["电子产品", "手机配件", "运动户外", "家居用品"];
const MOCK_BRANDS = ["Apple", "Samsung", "Huawei", "Xiaomi", "Google"];
const MOCK_COMPANY_BRANDS = ["MoKo", "TiMoVO", "Fintie", "ZtotopCase"];
const MOCK_FESTIVALS = ["无", "圣诞节", "万圣节", "复人节", "感恩节"];
const MOCK_SEASONS = ["四季通用", "春季", "夏季", "秋季", "冬季"];
const MOCK_SPECS = ["通用", "标准", "大号", "小号", "定制"];
const MOCK_DEPT_TEAMS = { "采购部": ["一组", "二组"], "运营部": ["美站", "德站"], "产品部": ["设计", "研发"] };

const MaterialDetailModal = ({ material, onClose }) => {
  const [activeTab, setActiveTab] = useState('基本信息');
  const [isEditing, setIsEditing] = useState(false); // 模式切换状态
  const [copyFeedback, setCopyFeedback] = useState(''); // 复制反馈状态
  const scrollContainerRef = useRef(null);
  const isManualScrolling = useRef(false);

  // 编辑状态下的临时数据
  const [formData, setFormData] = useState({
    ...material,
    // 补全缺失的详情字段
    spu: material?.spu || 'TC1837',
    code: material?.code || 'TC260588',
    status: '正常',
    syncStatus: '已同步',
    version: 'V1.0',
    marketingLevel: 'A级',
    // 1. 基本信息字段
    base: {
      proposalNo: material?.proposalNo || 'TA-202603001',
      source: material?.source || '自主研发',
      sourceCode: material?.sourceCode || 'OLD-999-XYZ',
      createTime: material?.createTime || '2026-03-31',
      updateTime: material?.updateTime || '2026-03-31',
      disableTime: material?.disableTime || '-',
      syncKingdeeTime: material?.syncKingdeeTime || '2026-03-31 10:00'
    },
    identical: { category: material?.cat || '手机配件', name: material?.name || '手机壳', style: material?.style || '防摔款', material: material?.material || 'TPU', brand: material?.brand || '苹果', model: material?.model || 'iPhone 15' },
    keyAttrs: { company: 'MoKo', pattern: '纯色', color: '黑色', size: '标准', packQty: '1' },
    general: { festival: '无', season: '四季通用', battery: '否', ce: '是', machine: 'iPhone 15', materialDetail: 'TPU底壳', colorCode: '#000', spec: '标准' },
    remarks: { 
      sellingPoints: '1. 防摔；2. 亲肤', 
      qualityReq: '无毛刺', 
      specModel: 'MK-15-BK', 
      inboundShortDesc: 'Case for iPhone',
      isBulkSampleReg: '是',
      isProductSpecReg: '是'
    },
    marketing: {
      imgLevel: 'A级',
      copyLevel: 'S级',
      imgReq: '需突出笔槽设计，展示三种支撑角度',
      copyReq: '文案需强调商务办公场景，字数控制在200字以内',
      refLinks: ['https://amazon.com/dp/B0CB123', 'https://ebay.com/itm/12345'],
      refImages: []
    },
    procurement: { 
      cycle: '15', 
      moq: '500', 
      remark: '首单减半', 
      firstOrderDate: '2026-04-01',
      firstOrderEstDelivery: '2026-04-15',
      firstOrderActDelivery: '2026-04-16',
      combinedOrderType: '同款不同色',
      combinedOrderMoq: '1000',
      combinedOrderRemark: '需与A供应商拼单',
      needInspection: '否',
      isOriginalBox: '是',
      canInvoice: '是', 
      invoiceUnit: 'PCS', 
      invoiceName: '保护壳', 
      invoiceSpec: 'BK-001', 
      customsMaterial: '塑料' 
    },
    specs: { itemDim: { l: '16', w: '8', h: '1' }, packageDim: { l: '20', w: '10', h: '2' }, netWeight: { value: '0.05', unit: 'kg' }, grossWeight: { value: '0.08', unit: 'kg' }, images: [] },
    asinList: [
      { id: 1, account: "MoKo-US", site: "US", asin: "B0CB6X6XXX", ver: "V1.0", op: "张运营", listing: "李编写" },
      { id: 2, account: "MoKo-DE", site: "DE", asin: "B0CBZZZYYY", ver: "V1.1", op: "王运营", listing: "赵编写" }
    ],
    packages: [
      { id: 1, name: "标准外箱-A", l: "50.0", w: "40.0", h: "30.0", weight: "12.50", index: "PKG-001" },
      { id: 2, name: "标准外箱-B", l: "45.0", w: "35.0", h: "25.0", weight: "10.20", index: "PKG-002" }
    ],
    accessories: [
      { id: 1, name: "数据线", sku: "ACC-001-C" },
      { id: 2, name: "充电头", sku: "ACC-002-W" },
      { id: 3, name: "说明书", sku: "ACC-003-M" }
    ],
    responsibles: {
      dev: { leader: '张团队', pm: '李经理', initialPm: '王初始' },
      procurement: { frontend: '赵前端', backend: '钱后端', initial: '孙初始' },
      ops: { staff: '周运营', initial: '吴初始' },
      others: { pmc: '郑PMC', warehouse: '王仓储' }
    }
  });

  const sectionRefs = { '基本信息': useRef(null), '采购信息': useRef(null), '卖点设计信息': useRef(null), '负责人信息': useRef(null), 'ASIN信息': useRef(null), '包裹信息': useRef(null), '配件信息': useRef(null), '操作日志': useRef(null) };

  const menuItems = [
    { name: '基本信息', icon: <Info size={14} /> },
    { name: '采购信息', icon: <Calendar size={14} /> },
    { name: '卖点设计信息', icon: <Lightbulb size={14} /> },
    { name: '负责人信息', icon: <User size={14} /> },
    { name: 'ASIN信息', icon: <Tag size={14} /> },
    { name: '包裹信息', icon: <Box size={14} /> },
    { name: '配件信息', icon: <Link2 size={14} /> },
    { name: '操作日志', icon: <History size={14} /> }
  ];

  // 一键复制
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(field);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const scrollToSection = (tab) => {
    setActiveTab(tab);
    if (sectionRefs[tab].current) {
      isManualScrolling.current = true;
      sectionRefs[tab].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => isManualScrolling.current = false, 800);
    }
  };

  const handleScroll = () => {
    if (isManualScrolling.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollPos = container.scrollTop + 150;
    const sections = Object.entries(sectionRefs);
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i][1].current && scrollPos >= sections[i][1].current.offsetTop) {
        if (activeTab !== sections[i][0]) setActiveTab(sections[i][0]);
        break;
      }
    }
  };

  // 核心展示项组件 (支持详情/编辑/复制)
  const InfoItem = ({ label, value, fieldPath, editType = 'input', options, span = 1, copyable = false, required = false }) => {
    const isFieldCopying = copyFeedback === label;

    if (isEditing) {
      // 编辑模式渲染
      if (editType === 'select') return <div className={`px-2 py-1 col-span-${span}`}><SelectRow label={label} required={required} options={options} value={value} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
      if (editType === 'textarea') return <div className={`px-2 py-1 col-span-${span}`}><TextareaRow label={label} value={value} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
      return <div className={`px-2 py-1 col-span-${span}`}><FormInputRow label={label} required={required} value={value} onChange={(e) => updateField(fieldPath, e.target.value)} /></div>;
    }

    // 详情模式渲染
    return (
      <div className={`group flex items-start gap-3 py-1.5 px-2 border-b border-slate-50/50 text-[11px] col-span-${span} relative hover:bg-blue-50/30 transition-colors`}>
        <div className="w-24 shrink-0 text-right flex items-center justify-end gap-1">
          {required && <span className="text-red-500 font-bold">*</span>}
          <span className="text-slate-400 leading-relaxed">{label}:</span>
        </div>
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
           <span className={`text-slate-700 font-semibold break-all leading-relaxed ${label === '产品名称' ? 'text-[12px] text-blue-700' : ''}`}>{value || '-'}</span>
           {copyable && value && (
             <button onClick={() => handleCopy(value, label)} className="p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
               {isFieldCopying ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
             </button>
           )}
        </div>
        <button onClick={() => setIsEditing(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-200 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
           <Edit3 size={12} />
        </button>
      </div>
    );
  };

  const updateField = (path, val) => {
    const keys = path.split('.');
    setFormData(prev => {
      let newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = val;
      return newData;
    });
  };

  const SubTitle = ({ title, en, color = "blue" }) => {
    const colors = { blue: "bg-blue-500", orange: "bg-orange-500", gray: "bg-slate-400", green: "bg-emerald-500", purple: "bg-purple-500" };
    return (
      <div className="flex items-center gap-2 mb-3 mt-2">
        <div className={`w-1 h-3 ${colors[color]} rounded-full`}></div>
        <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">{title} <span className="text-slate-300 font-normal ml-1">{en}</span></h3>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 text-slate-800 antialiased font-sans">
      <div className="bg-white w-[1540px] max-w-full h-[96vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-4 ${isEditing ? 'bg-orange-500 animate-pulse' : 'bg-blue-600'} rounded-full`}></div>
            <h2 className="text-[13px] font-black text-slate-700 uppercase">
              {isEditing ? '正在编辑编辑物料' : '物料详情'} 
              <span className="text-slate-300 font-normal ml-2">{formData.code}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-md"><X size={18} className="text-slate-400" /></button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden bg-white">
          {/* 左侧侧边栏 */}
          <div className="w-[180px] shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/20">
            <div className="p-4 border-b border-slate-100 flex flex-col items-center">
               <div className={`w-9 h-9 ${isEditing ? 'bg-orange-500' : 'bg-emerald-600'} rounded-lg flex items-center justify-center text-white mb-2 shadow-lg transition-colors`}><Package size={18} /></div>
               <div className="text-[11px] font-bold text-slate-700 truncate w-32 text-center">{formData.identical.name}</div>
               <div className="text-[10px] text-slate-400 font-mono mt-1">{formData.spu}</div>
            </div>
            <div className="flex-1 p-2 space-y-1 overflow-y-auto no-scrollbar">
              {menuItems.map((item) => (
                <div key={item.name} onClick={() => scrollToSection(item.name)} className={`group px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between ${activeTab === item.name ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}>
                  <div className="flex items-center space-x-3">
                    <span className={activeTab === item.name ? 'text-white' : 'text-slate-400 group-hover:text-blue-500 transition-colors'}>{item.icon}</span>
                    <span className="text-[11px] uppercase tracking-wide">{item.name}</span>
                  </div>
                  {activeTab === item.name && <div className="w-1.5 h-1.5 bg-white rounded-full animate-in zoom-in duration-300"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* 右侧主内容区 */}
          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-16 scroll-smooth no-scrollbar text-[12px]">
            
            {/* 🎯 顶部固定悬浮概览条 - 润色增强版 */}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-50/90 via-white/90 to-white/90 backdrop-blur-md -mx-5 -mt-5 px-8 py-4 border-b border-blue-100/60 flex items-center justify-between shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-top-1 duration-500">
               <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                     <div className="bg-slate-800 text-white px-2.5 py-0.5 rounded-md text-[11px] font-mono tracking-wider shadow-sm ring-1 ring-white/20">
                        {formData.code}
                     </div>
                     <span className="text-[18px] font-black text-slate-800 tracking-tight leading-none">{formData.identical.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                     <span className="flex items-center gap-1.5 bg-white/50 px-2 py-0.5 rounded border border-slate-100/50"><Box size={13} className="text-blue-400/60"/>{formData.identical.style}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                     <span className="flex items-center gap-1.5">{formData.identical.material}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                     <span className="flex items-center gap-1.5">{formData.identical.brand}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200"></div>
                     <span className="text-slate-500 font-mono tracking-tight bg-slate-100/50 px-1.5 rounded">{formData.identical.model}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-2.5">
                  {/* 状态标签组 - 统一药丸风格 */}
                  <span title="物料状态" className="flex items-center h-6 px-3 rounded-full bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-500/20 text-[10px] font-bold shadow-sm">
                     {formData.status}
                  </span>
                  <span title="同步状态" className="flex items-center h-6 px-3 rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 text-[10px] font-bold shadow-sm">
                     {formData.syncStatus}
                  </span>
                  <span title="物料版本" className="flex items-center h-6 px-3 rounded-full bg-purple-50 text-purple-600 ring-1 ring-inset ring-purple-500/20 text-[10px] font-bold shadow-sm">
                     {formData.version}
                  </span>
                  <span title="营销等级" className="flex items-center h-6 px-3 rounded-full bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-500/20 text-[10px] font-bold shadow-sm">
                     {formData.marketingLevel}
                  </span>
               </div>
            </div>

            {/* 1. 基本信息区块 */}
            <div ref={sectionRefs['基本信息']} className="space-y-6">
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center space-x-2 text-slate-800 font-bold text-[14px]">
                <Info size={16} className="text-blue-500" /><span>基本信息</span>
              </div>
              <div className="space-y-8 px-2">
                 <div>
                    <SubTitle title="基本信息" en="Basic Info" color="blue" />
                    <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">
                       <InfoItem label="物料编码" value={formData.code} copyable />
                       <InfoItem label="提案编号" value={formData.base.proposalNo} copyable />
                       <InfoItem label="提案来源" value={formData.base.source} />
                       <InfoItem label="源物料编码" value={formData.base.sourceCode} />
                       <InfoItem label="创建时间" value={formData.base.createTime} />
                       <InfoItem label="最后更新时间" value={formData.base.updateTime} />
                       <InfoItem label="禁用时间" value={formData.base.disableTime} />
                       <InfoItem label="同步金蝶时间" value={formData.base.syncKingdeeTime} />
                    </div>
                 </div>
                 <div>
                    <SubTitle title="同款属性" en="Identical Attributes" color="blue" />
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">
                       <InfoItem label="运营大类" value={formData.identical.category} fieldPath="identical.category" editType="select" options={MOCK_CATEGORIES} required />
                       <InfoItem label="产品名称" value={formData.identical.name} fieldPath="identical.name" span={2} required copyable />
                       <InfoItem label="款式" value={formData.identical.style} fieldPath="identical.style" />
                       <InfoItem label="主材料" value={formData.identical.material} fieldPath="identical.material" />
                       <InfoItem label="适用品牌或对象" value={formData.identical.brand} fieldPath="identical.brand" />
                       <InfoItem label="型号" value={formData.identical.model} fieldPath="identical.model" copyable />
                    </div>
                 </div>
                 <div>
                    <SubTitle title="关键属性" en="Key Attributes" color="orange" />
                    <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">
                       <InfoItem label="公司品牌" value={formData.keyAttrs.company} fieldPath="keyAttrs.company" editType="select" options={MOCK_COMPANY_BRANDS} />
                       <InfoItem label="图案" value={formData.keyAttrs.pattern} fieldPath="keyAttrs.pattern" />
                       <InfoItem label="颜色" value={formData.keyAttrs.color} fieldPath="keyAttrs.color" />
                       <InfoItem label="尺码" value={formData.keyAttrs.size} fieldPath="keyAttrs.size" />
                       <InfoItem label="包装数量" value={formData.keyAttrs.packQty} fieldPath="keyAttrs.packQty" />
                    </div>
                 </div>
                 <div>
                    <SubTitle title="一般属性" en="General Attributes" color="gray" />
                    <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">
                       <InfoItem label="节日标签" value={formData.general.festival} fieldPath="general.festival" editType="select" options={MOCK_FESTIVALS} />
                       <InfoItem label="季节标签" value={formData.general.season} fieldPath="general.season" editType="select" options={MOCK_SEASONS} />
                       <InfoItem label="是否带电" value={formData.general.battery} fieldPath="general.battery" editType="select" options={["是", "否"]} />
                       <InfoItem label="是否CE类" value={formData.general.ce} fieldPath="general.ce" editType="select" options={["是", "否"]} />
                       <InfoItem label="适用机型" value={formData.general.machine} fieldPath="general.machine" />
                       <InfoItem label="材质明细" value={formData.general.materialDetail} fieldPath="general.materialDetail" />
                       <InfoItem label="色号" value={formData.general.colorCode} fieldPath="general.colorCode" />
                       <InfoItem label="规格" value={formData.general.spec} fieldPath="general.spec" editType="select" options={MOCK_SPECS} />
                       <InfoItem label="二级类目" value={formData.general.subCategory} />
                       <InfoItem label="Logo可替换" value={formData.general.logoReplaceable} />
                       <InfoItem label="首单物流方式" value={formData.general.firstLogistics} />
                       <InfoItem label="建议物流方式" value={formData.general.suggestedLogistics} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <SubTitle title="其他信息" en="Additional Details" color="green" />
                    
                    {/* 状态登记项 - 恢复显示 */}
                    <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">
                       <InfoItem label="是否登记大货样" value={formData.remarks.isBulkSampleReg} fieldPath="remarks.isBulkSampleReg" editType="select" options={["是", "否"]} />
                       <InfoItem label="产品规格书" value={formData.remarks.isProductSpecReg} fieldPath="remarks.isProductSpecReg" editType="select" options={["是", "否"]} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       {/* 描述与标识卡片 - 仅保留底色块 */}
                       <div className="bg-blue-50/20 p-5 rounded-2xl border border-blue-100/50 shadow-sm space-y-4">
                          <div className="space-y-1.5">
                             <div className="text-[10px] text-blue-400 font-bold ml-1 flex items-center gap-1 uppercase">
                                <Sparkles size={10} /> 营销核心卖点
                             </div>
                             <InfoItem label="产品要点" value={formData.remarks.sellingPoints} fieldPath="remarks.sellingPoints" editType="textarea" span={4} />
                          </div>
                          <div className="space-y-1.5 pt-2 border-t border-blue-100/30">
                             <div className="text-[10px] text-blue-400 font-bold ml-1 flex items-center gap-1 uppercase">
                                <Tag size={10} /> 仓储识别标识
                             </div>
                             <InfoItem label="入库短标签描述" value={formData.remarks.inboundShortDesc} fieldPath="remarks.inboundShortDesc" span={4} />
                          </div>
                       </div>

                       {/* 生产与采购辅助卡片 - 仅保留底色块 */}
                       <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/50 shadow-sm space-y-4">
                          <div className="space-y-1.5">
                             <div className="text-[10px] text-emerald-400 font-bold ml-1 flex items-center gap-1 uppercase">
                                <Search size={10} /> 采购快速下单参考
                             </div>
                             <div className="bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/30">
                                <InfoItem label="规格型号" value={formData.remarks.specModel} fieldPath="remarks.specModel" span={4} copyable />
                             </div>
                          </div>
                          <div className="space-y-1.5 pt-2 border-t border-emerald-100/30">
                             <div className="text-[10px] text-emerald-400 font-bold ml-1 flex items-center gap-1 uppercase">
                                <CheckCircle2 size={10} /> 质量与生产要求
                             </div>
                             <InfoItem label="质量要求点" value={formData.remarks.qualityReq} fieldPath="remarks.qualityReq" editType="textarea" span={4} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* 2. 采购信息区块 */}
            <div ref={sectionRefs['采购信息']} className="space-y-6">
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center space-x-2 text-slate-800 font-bold text-[14px]">
                <Calendar size={16} className="text-blue-500" /><span>采购信息</span>
              </div>
              
              <div className="space-y-8 px-2">
                 
                 {/* 第一行：双分类卡片矩阵 */}
                 <div className="grid grid-cols-2 gap-6">
                    
                    {/* 卡片 1: 采购基础规则 与 拼单策略 */}
                    <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                       <div>
                          <SubTitle title="首单要求" en="First Order Req" color="blue" />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                             <InfoItem label="生产周期" value={`${formData.procurement.cycle} 天`} fieldPath="procurement.cycle" />
                             <InfoItem label="采购起订量" value={`${formData.procurement.moq} PCS`} fieldPath="procurement.moq" />
                             <InfoItem label="起订量备注" value={formData.procurement.remark} fieldPath="procurement.remark" span={2} />
                          </div>
                       </div>
                       <div className="pt-4 border-t border-slate-100/60">
                          <SubTitle title="拼单策略" en="Combined Strategy" color="green" />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                             <InfoItem label="拼单类型" value={formData.procurement.combinedOrderType} />
                             <InfoItem label="拼单起订量" value={formData.procurement.combinedOrderMoq} />
                             <InfoItem label="拼单备注" value={formData.procurement.combinedOrderRemark} span={2} />
                          </div>
                       </div>
                    </div>

                    {/* 卡片 2: 开票合规 与 商检发货要求 */}
                    <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                       <div>
                          <SubTitle title="开票合规" en="Invoicing" color="purple" />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                             <InfoItem label="能够开票" value={formData.procurement.canInvoice} editType="select" options={["是", "否"]} />
                             <InfoItem label="开票单位" value={formData.procurement.invoiceUnit} editType="select" options={["PCS", "SET", "KG"]} />
                             <InfoItem label="开票品名" value={formData.procurement.invoiceName} />
                             <InfoItem label="报关材质" value={formData.procurement.customsMaterial} />
                             <InfoItem label="开票规格型号" value={formData.procurement.invoiceSpec} span={2} />
                          </div>
                       </div>
                       <div className="pt-4 border-t border-slate-100/60">
                          <SubTitle title="商检发货要求" en="Compliance" color="blue" />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                             <InfoItem label="是否需要商检" value={formData.procurement.needInspection} />
                             <InfoItem label="是否原箱发货" value={formData.procurement.isOriginalBox} />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 卡片 3: 首单追踪 与 规格参数 (垂直分层大卡片) */}
                 <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div>
                       <SubTitle title="首单追踪" en="Timeline" color="orange" />
                       <div className="grid grid-cols-4 gap-x-6 gap-y-1">
                          <InfoItem label="首单日期" value={formData.procurement.firstOrderDate} />
                          <InfoItem label="首单预估交期" value={formData.procurement.firstOrderEstDelivery} />
                          <InfoItem label="首单实际交期" value={formData.procurement.firstOrderActDelivery} />
                       </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100/60">
                       <SubTitle title="规格参数" en="Specifications" color="blue" />
                       {isEditing ? (
                          <div className="grid grid-cols-2 gap-8 mt-2">
                             <DimensionInput label="单品规格" value={formData.specs.itemDim} onChange={(v) => updateField('specs.itemDim', v)} />
                             <DimensionInput label="包装规格" value={formData.specs.packageDim} onChange={(v) => updateField('specs.packageDim', v)} />
                             <WeightInputRow label="净重" value={formData.specs.netWeight} onChange={(v) => updateField('specs.netWeight', v)} />
                             <WeightInputRow label="毛重" value={formData.specs.grossWeight} onChange={(v) => updateField('specs.grossWeight', v)} />
                          </div>
                       ) : (
                          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                             <div className="grid grid-cols-1 gap-y-1">
                                <InfoItem label="单品规格" value={`${formData.specs.itemDim.l}*${formData.specs.itemDim.w}*${formData.specs.itemDim.h} cm`} />
                                <InfoItem label="净重" value={`${formData.specs.netWeight.value} ${formData.specs.netWeight.unit}`} />
                             </div>
                             <div className="grid grid-cols-1 gap-y-1">
                                <InfoItem label="包装规格" value={`${formData.specs.packageDim.l}*${formData.specs.packageDim.w}*${formData.specs.packageDim.h} cm`} />
                                <InfoItem label="毛重" value={`${formData.specs.grossWeight.value} ${formData.specs.grossWeight.unit}`} />
                             </div>
                          </div>
                       )}
                    </div>
                 </div>

                 {/* 图片展示 */}
                 <div className="grid grid-cols-2 gap-6">
                    <div><SubTitle title="产品图片" en="Product Images" color="blue" /><div className="bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm">{isEditing ? <ImageUploader images={formData.specs.images} onUpload={(imgs) => updateField('specs.images', imgs)} /> : <div className="flex gap-2">{[1,2].map(i=><div key={i} className="w-12 h-12 bg-white border rounded flex items-center justify-center text-slate-300 shadow-sm"><Package size={20}/></div>)}</div>}</div></div>
                    <div><SubTitle title="包装图片" en="Packaging Images" color="orange" /><div className="bg-slate-50/30 p-3 rounded-lg border border-slate-100 shadow-sm"><div className="flex gap-2">{[1].map(i=><div key={i} className="w-12 h-12 bg-white border rounded flex items-center justify-center text-slate-300 shadow-sm"><Box size={20}/></div>)}</div></div></div>
                 </div>
              </div>
            </div>

            {/* 3. 卖点设计信息 */}
            <div ref={sectionRefs['卖点设计信息']} className="space-y-6">
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center justify-between text-slate-800 font-bold text-[14px]">
                <div className="flex items-center space-x-2">
                  <Lightbulb size={16} className="text-blue-500" /><span>卖点设计信息</span>
                </div>
                <div className="flex items-center gap-3 pr-2">
                   <div className="flex items-stretch overflow-hidden rounded border border-cyan-200 shadow-sm">
                      <div className="bg-cyan-500 w-1"></div>
                      <div className="bg-cyan-50 px-2 py-0.5 text-cyan-700 text-[10px] font-bold">
                         图片等级: <span className="text-cyan-900 ml-1">{formData.marketing.imgLevel}</span>
                      </div>
                   </div>
                   <div className="flex items-stretch overflow-hidden rounded border border-indigo-200 shadow-sm">
                      <div className="bg-indigo-500 w-1"></div>
                      <div className="bg-indigo-50 px-2 py-0.5 text-indigo-700 text-[10px] font-bold">
                         文案等级: <span className="text-indigo-900 ml-1">{formData.marketing.copyLevel}</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="space-y-8 px-2">
                 
                 <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                    
                    {/* A. 核心卖点 - 优化为更宽展示 */}
                    <div>
                       <SubTitle title="核心卖点" en="Key Selling Points" color="blue" />
                       <div className="bg-white/60 p-4 rounded-xl border border-slate-100 min-h-[60px] shadow-inner">
                          <InfoItem label="开发卖点" value={formData.remarks.sellingPoints} fieldPath="remarks.sellingPoints" editType="textarea" span={4} />
                       </div>
                    </div>

                    {/* B. 详细创作要求 */}
                    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100/60">
                       <div className="space-y-3">
                          <div className="flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-wider ml-1">
                             <Search size={14} /> 图片拍摄/设计要求
                          </div>
                          <div className="bg-white/40 p-3 rounded-xl border border-slate-50">
                             <InfoItem label="图片要求" value={formData.marketing.imgReq} fieldPath="marketing.imgReq" editType="textarea" span={4} />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[11px] uppercase tracking-wider ml-1">
                             <Edit3 size={14} /> 文案创作/翻译要求
                          </div>
                          <div className="bg-white/40 p-3 rounded-xl border border-slate-50">
                             <InfoItem label="文案要求" value={formData.marketing.copyReq} fieldPath="marketing.copyReq" editType="textarea" span={4} />
                          </div>
                       </div>
                    </div>

                    {/* C. 参考资料库 */}
                    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100/60">
                       <div className="space-y-3">
                          <SubTitle title="参考图片" en="Ref Images" color="orange" />
                          <div className="flex gap-3 px-2">
                             {[1, 2, 3].map(i => (
                                <div key={i} className="group relative w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-300 hover:border-blue-400 transition-all cursor-zoom-in shadow-sm">
                                   <Package size={24} />
                                   <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors rounded-lg"></div>
                                </div>
                             ))}
                             <button className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
                                <Search size={16} />
                                <span className="text-[9px] mt-1 font-bold">查看全部</span>
                             </button>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <SubTitle title="参考链接" en="Ref Links" color="blue" />
                          <div className="space-y-2 px-2 max-h-[80px] overflow-y-auto no-scrollbar">
                             {formData.marketing.refLinks.map((link, i) => (
                                <div key={i} className="group/link flex items-center gap-2 bg-white/50 p-1.5 rounded-lg border border-slate-100/50 hover:bg-white transition-colors">
                                   <ExternalLink size={12} className="text-slate-300" />
                                   <span className="flex-1 text-blue-600 hover:underline cursor-pointer truncate font-mono text-[10px]">{link}</span>
                                   <button onClick={() => handleCopy(link, `ref-link-${i}`)} className="opacity-0 group-hover/link:opacity-100 p-1 text-slate-300 hover:text-blue-500">
                                      {copyFeedback === `ref-link-${i}` ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                   </button>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
            </div>

            {/* 4. 负责人信息 */}
            <div ref={sectionRefs['负责人信息']} className="space-y-6">
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center space-x-2 text-slate-800 font-bold text-[14px]">
                <User size={16} className="text-blue-500" /><span>负责人信息</span>
              </div>
              <div className="space-y-6 px-2">
                 <div className="grid grid-cols-4 gap-6 items-start">
                    
                    {/* 开发负责人 */}
                    <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                       <SubTitle title="开发负责人" en="Dev" color="blue" />
                       <div className="space-y-1">
                          <InfoItem label="产品团队负责人" value={formData.responsibles.dev.leader} fieldPath="responsibles.dev.leader" />
                          <InfoItem label="产品经理" value={formData.responsibles.dev.pm} fieldPath="responsibles.dev.pm" />
                          <InfoItem label="初始产品经理" value={formData.responsibles.dev.initialPm} fieldPath="responsibles.dev.initialPm" />
                       </div>
                    </div>

                    {/* 采购负责人 */}
                    <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                       <SubTitle title="采购负责人" en="Procurement" color="orange" />
                       <div className="space-y-1">
                          <InfoItem label="前端采购人员" value={formData.responsibles.procurement.frontend} fieldPath="responsibles.procurement.frontend" />
                          <InfoItem label="后端采购人员" value={formData.responsibles.procurement.backend} fieldPath="responsibles.procurement.backend" />
                          <InfoItem label="初始采购人员" value={formData.responsibles.procurement.initial} fieldPath="responsibles.procurement.initial" />
                       </div>
                    </div>

                    {/* 运营负责人 */}
                    <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                       <SubTitle title="运营负责人" en="Ops" color="green" />
                       <div className="space-y-1">
                          <InfoItem label="运营人员" value={formData.responsibles.ops.staff} fieldPath="responsibles.ops.staff" />
                          <InfoItem label="初始运营人员" value={formData.responsibles.ops.initial} fieldPath="responsibles.ops.initial" />
                       </div>
                    </div>

                    {/* 其他 */}
                    <div className="bg-slate-50/30 p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                       <SubTitle title="其他支持" en="Others" color="purple" />
                       <div className="space-y-1">
                          <InfoItem label="PMC人员" value={formData.responsibles.others.pmc} fieldPath="responsibles.others.pmc" />
                          <InfoItem label="仓储人员" value={formData.responsibles.others.warehouse} fieldPath="responsibles.others.warehouse" />
                       </div>
                    </div>

                 </div>
              </div>
            </div>

            {/* 5. ASIN 信息 */}
            <div ref={sectionRefs['ASIN信息']} className="space-y-4 scroll-mt-10">
               <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center space-x-2 text-slate-800 font-bold text-[14px]">
                  <Tag size={16} className="text-blue-500" /><span>ASIN 信息</span>
               </div>
               <div className="mx-2 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-[11px] border-collapse">
                     <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                           <th className="px-4 py-2.5 font-bold text-center w-12">序号</th>
                           <th className="px-4 py-2.5 font-bold">销售账号</th>
                           <th className="px-4 py-2.5 font-bold w-20 text-center">站点</th>
                           <th className="px-4 py-2.5 font-bold">ASIN</th>
                           <th className="px-4 py-2.5 font-bold w-24 text-center">版本</th>
                           <th className="px-4 py-2.5 font-bold text-center">运营人员</th>
                           <th className="px-4 py-2.5 font-bold text-center">Listing人员</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {formData.asinList.map((row, idx) => (
                           <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="px-4 py-2 text-center text-slate-400 font-mono">{idx + 1}</td>
                              <td className="px-4 py-2 font-bold text-slate-700">{row.account}</td>
                              <td className="px-4 py-2 text-center">
                                 <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">{row.site}</span>
                              </td>
                              <td className="px-4 py-2 font-mono text-blue-600 font-medium">
                                 <div className="flex items-center gap-2">
                                    <span className="hover:underline cursor-pointer">{row.asin}</span>
                                    <button onClick={() => handleCopy(row.asin, `asin-${idx}`)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-blue-500 transition-all">
                                       {copyFeedback === `asin-${idx}` ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                                    </button>
                                 </div>
                              </td>
                              <td className="px-4 py-2 text-center text-slate-500 font-medium">{row.ver}</td>
                              <td className="px-4 py-2 text-center">
                                 <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-bold border border-blue-100/50">{row.op}</span>
                              </td>
                              <td className="px-4 py-2 text-center">
                                 <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold border border-emerald-100/50">{row.listing}</span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* 6. 包裹信息 */}
            <div ref={sectionRefs['包裹信息']} className="space-y-4 scroll-mt-10">
               <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center justify-between text-slate-800 font-bold text-[14px]">
                  <div className="flex items-center space-x-2">
                     <Box size={16} className="text-blue-500" /><span>包裹信息</span>
                  </div>
                  <div className="pr-4 text-[10px] text-slate-400 font-normal">
                     共计 <span className="font-bold text-blue-600">{formData.packages.length}</span> 个包裹方案
                  </div>
               </div>
               <div className="mx-2 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-[11px] border-collapse">
                     <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                           <th className="px-4 py-2.5 font-bold text-center w-24">包裹序号</th>
                           <th className="px-4 py-2.5 font-bold">包裹名称</th>
                           <th className="px-4 py-2.5 font-bold text-center">长(CM)</th>
                           <th className="px-4 py-2.5 font-bold text-center">宽(CM)</th>
                           <th className="px-4 py-2.5 font-bold text-center">高(CM)</th>
                           <th className="px-4 py-2.5 font-bold text-center">毛重(kg)</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {formData.packages.map((pkg, idx) => (
                           <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="px-4 py-2 text-center text-slate-500 font-mono font-bold">{pkg.index}</td>
                              <td className="px-4 py-2 font-black text-slate-700">{pkg.name}</td>
                              <td className="px-4 py-2 text-center font-mono text-slate-600">{pkg.l}</td>
                              <td className="px-4 py-2 text-center font-mono text-slate-600">{pkg.w}</td>
                              <td className="px-4 py-2 text-center font-mono text-slate-600">{pkg.h}</td>
                              <td className="px-4 py-2 text-center font-mono text-blue-600 font-bold">{pkg.weight}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* 7. 配件信息 */}
            <div ref={sectionRefs['配件信息']} className="space-y-4 scroll-mt-10">
               <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center justify-between text-slate-800 font-bold text-[14px]">
                  <div className="flex items-center space-x-2">
                     <Link2 size={16} className="text-blue-500" /><span>配件信息</span>
                  </div>
                  <div className="pr-4 text-[10px] text-slate-400 font-normal">
                     共计 <span className="font-bold text-blue-600">{formData.accessories.length}</span> 个配件项
                  </div>
               </div>
               <div className="mx-2 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-[11px] border-collapse">
                     <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                           <th className="px-4 py-2.5 font-bold text-center w-24">序号</th>
                           <th className="px-4 py-2.5 font-bold">配件名称</th>
                           <th className="px-4 py-2.5 font-bold">配件SKU</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {formData.accessories.map((acc, idx) => (
                           <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="px-4 py-2 text-center text-slate-500 font-mono font-bold">{idx + 1}</td>
                              <td className="px-4 py-2 font-black text-slate-700">{acc.name}</td>
                              <td className="px-4 py-2 font-mono text-blue-600 font-bold">{acc.sku}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* 8. 操作日志 (差异化高亮) */}
            <div ref={sectionRefs['操作日志']} className="space-y-4 scroll-mt-10">
               <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pb-2 border-b border-slate-100 flex items-center space-x-2 text-slate-800 font-bold text-[14px]">
                  <History size={16} className="text-blue-500" /><span>操作日志</span>
               </div>
               <div className="px-4 py-2">
                  <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                     {[
                        { 
                           time: "2026-04-01 09:00", 
                           user: "李运营", 
                           action: "批量更新属性", 
                           diffs: [
                              { field: "款式", old: "防摔款", new: "商务款" },
                              { field: "主材料", old: "TPU", new: "真皮" },
                              { field: "产品名称", old: "手机壳", new: "iPhone 15 商务真皮套" }
                           ] 
                        },
                        { 
                           time: "2026-03-31 15:30", 
                           user: "张三", 
                           action: "规格变更", 
                           diffs: [{ field: "单品重量", old: "0.05kg", new: "0.045kg" }] 
                        },
                        { time: "2026-03-31 10:00", user: "Admin", action: "创建物料", detail: "初始物料录入完成" }
                     ].map((log, idx) => (
                        <div key={idx} className="relative pl-8">
                           <div className="absolute left-0 top-1 w-6 h-6 bg-white border border-blue-500 rounded-full flex items-center justify-center z-10 shadow-sm"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div></div>
                           <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 shadow-sm">
                              <div className="flex items-center justify-between mb-1"><span className="text-[11px] font-bold text-slate-700">{log.user}</span><span className="text-[10px] text-slate-400 font-mono">{log.time}</span></div>
                              <div className="text-[11px] text-blue-600 font-medium mb-1.5">{log.action}</div>
                              
                              {log.diffs ? (
                                <div className="space-y-1">
                                   {log.diffs.map((diff, dIdx) => (
                                      <div key={dIdx} className="text-[10px] flex items-center gap-2 bg-white p-1.5 rounded border border-slate-100">
                                         <span className="text-slate-400 font-bold w-16 shrink-0">[{diff.field}]</span>
                                         <span className="text-red-400 line-through truncate max-w-[100px]">{diff.old}</span>
                                         <span className="text-slate-300">→</span>
                                         <span className="text-emerald-500 font-bold truncate">{diff.new}</span>
                                      </div>
                                   ))}
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-500 italic pl-2 bg-white/50 p-1.5 rounded border border-dashed border-slate-200">{log.detail}</div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* 底部操作栏 (动态切换) */}
        <div className="px-4 py-2.5 border-t border-slate-100 flex justify-end space-x-2 bg-white shrink-0 shadow-inner">
          {isEditing ? (
            <>
               <button onClick={() => setIsEditing(false)} className="px-5 py-1.5 bg-slate-50 text-slate-500 rounded font-bold text-[11px] hover:bg-slate-100 flex items-center gap-1.5 transition-all"><RotateCcw size={14} /> 放弃修改</button>
               <button onClick={() => { setIsEditing(false); console.log('Saving...', formData); }} className="px-7 py-1.5 bg-emerald-600 text-white rounded font-bold text-[11px] hover:bg-emerald-700 flex items-center gap-1.5 shadow-lg shadow-emerald-100 transition-all active:scale-95"><Save size={14} /> 保存物料信息</button>
            </>
          ) : (
            <>
               <button className="px-5 py-1.5 bg-slate-50 text-slate-500 rounded font-bold text-[11px] hover:bg-slate-100 transition-all" onClick={onClose}>关闭预览</button>
               <button onClick={() => setIsEditing(true)} className="px-7 py-1.5 bg-blue-600 text-white rounded font-bold text-[11px] hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-1.5"><Edit3 size={14} /> 进入编辑模式</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
