import React, { useState, useRef } from 'react';
import { X, Info, Calendar, Lightbulb, User, Tag, Box, Link2, History, Package, Edit3, Save, RotateCcw } from 'lucide-react';

// 导入子区块组件
import BasicInfoSection from './detail-sections/BasicInfoSection.jsx';
import ProcurementSection from './detail-sections/ProcurementSection.jsx';
import MarketingDesignSection from './detail-sections/MarketingDesignSection.jsx';
import ResponsiblesSection from './detail-sections/ResponsiblesSection.jsx';
import AsinSection from './detail-sections/AsinSection.jsx';
import PackageSection from './detail-sections/PackageSection.jsx';
import AccessorySection from './detail-sections/AccessorySection.jsx';
import LogSection from './detail-sections/LogSection.jsx';

const MaterialDetailModal = ({ material, onClose }) => {
  const [activeTab, setActiveTab] = useState('基本信息');
  const [isEditing, setIsEditing] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const scrollContainerRef = useRef(null);
  const isManualScrolling = useRef(false);

  // 初始化数据
  const [formData, setFormData] = useState({
    ...material,
    spu: material?.spu || 'TC1837',
    code: material?.code || 'TC260588',
    status: '正常',
    syncStatus: '已同步',
    version: 'V1.0',
    marketingLevel: 'A级',
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

  const sectionRefs = { 
    '基本信息': useRef(null), 
    '采购信息': useRef(null), 
    '卖点设计信息': useRef(null), 
    '负责人信息': useRef(null), 
    'ASIN信息': useRef(null), 
    '包裹信息': useRef(null), 
    '配件信息': useRef(null), 
    '操作日志': useRef(null) 
  };

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

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(field);
    setTimeout(() => setCopyFeedback(''), 2000);
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

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm p-2 text-slate-800 dark:text-gray-200 antialiased font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-[1540px] max-w-full h-[96vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-gray-700 animate-in zoom-in-95 duration-200 transition-colors duration-300">
        
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-4 ${isEditing ? 'bg-orange-500 animate-pulse' : 'bg-blue-600'} rounded-full`}></div>
            <h2 className="text-[13px] font-black text-slate-700 dark:text-gray-100 uppercase">
              {isEditing ? '正在编辑物料' : '物料详情'} 
              <span className="text-slate-300 dark:text-gray-600 font-normal ml-2">{formData.code}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onClose} className="p-1 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-md transition-colors"><X size={18} className="text-slate-400" /></button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
          {/* 左侧侧边栏 */}
          <div className="w-[180px] shrink-0 border-r border-slate-100 dark:border-gray-800 flex flex-col bg-slate-50/20 dark:bg-gray-800/20 transition-colors duration-300">
            <div className="p-4 border-b border-slate-100 dark:border-gray-800 flex flex-col items-center">
               <div className={`w-9 h-9 ${isEditing ? 'bg-orange-500' : 'bg-emerald-600'} rounded-lg flex items-center justify-center text-white mb-2 shadow-lg transition-colors`}><Package size={18} /></div>
               <div className="text-[11px] font-bold text-slate-700 dark:text-gray-200 truncate w-32 text-center">{formData.identical.name}</div>
               <div className="text-[10px] text-slate-400 dark:text-gray-500 font-mono mt-1">{formData.spu}</div>
            </div>
            <div className="flex-1 p-2 space-y-1 overflow-y-auto no-scrollbar">
              {menuItems.map((item) => (
                <div key={item.name} onClick={() => scrollToSection(item.name)} className={`group px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between ${activeTab === item.name ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100 dark:shadow-none' : 'text-slate-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'}`}>
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
          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-16 scroll-smooth no-scrollbar text-[12px] dark:bg-gray-900 transition-colors duration-300">
            
            {/* 🎯 顶部固定悬浮概览条 */}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-50/90 via-white/90 to-white/90 dark:from-blue-900/50 dark:via-gray-900/95 dark:to-gray-900/95 backdrop-blur-md -mx-5 -mt-5 px-8 py-4 border-b border-blue-100/60 dark:border-blue-900/40 flex items-center justify-between shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-top-1 duration-500 transition-colors duration-300">
               <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                     <div className="bg-slate-800 dark:bg-gray-700 text-white px-2.5 py-0.5 rounded-md text-[11px] font-mono tracking-wider shadow-sm ring-1 ring-white/20 transition-colors">
                        {formData.code}
                     </div>
                     <span className="text-[18px] font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors">{formData.identical.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-gray-500 font-medium">
                     <span className="flex items-center gap-1.5 bg-white/50 dark:bg-gray-800/50 px-2 py-0.5 rounded border border-slate-100/50 dark:border-gray-700/50"><Box size={13} className="text-blue-400/60"/>{formData.identical.style}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                     <span className="flex items-center gap-1.5">{formData.identical.material}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                     <span className="flex items-center gap-1.5">{formData.identical.brand}</span>
                     <div className="w-1 h-1 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                     <span className="text-slate-500 dark:text-gray-400 font-mono tracking-tight bg-slate-100/50 dark:bg-gray-800/50 px-1.5 rounded">{formData.identical.model}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-2.5">
                  <span title="物料状态" className="flex items-center h-6 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20 text-[10px] font-bold shadow-sm">{formData.status}</span>
                  <span title="同步状态" className="flex items-center h-6 px-3 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 text-[10px] font-bold shadow-sm">{formData.syncStatus}</span>
                  <span title="物料版本" className="flex items-center h-6 px-3 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20 text-[10px] font-bold shadow-sm">{formData.version}</span>
                  <span title="营销等级" className="flex items-center h-6 px-3 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 ring-1 ring-inset ring-orange-500/20 text-[10px] font-bold shadow-sm">{formData.marketingLevel}</span>
               </div>
            </div>

            {/* 各详情区块组件 */}
            <BasicInfoSection 
               formData={formData} 
               isEditing={isEditing} 
               updateField={updateField} 
               handleCopy={handleCopy} 
               copyFeedback={copyFeedback} 
               setIsEditing={setIsEditing} 
               sectionRef={sectionRefs['基本信息']} 
            />

            <ProcurementSection 
               formData={formData} 
               isEditing={isEditing} 
               updateField={updateField} 
               setIsEditing={setIsEditing} 
               sectionRef={sectionRefs['采购信息']} 
            />

            <MarketingDesignSection 
               formData={formData} 
               isEditing={isEditing} 
               updateField={updateField} 
               handleCopy={handleCopy} 
               copyFeedback={copyFeedback} 
               setIsEditing={setIsEditing} 
               sectionRef={sectionRefs['卖点设计信息']} 
            />

            <ResponsiblesSection 
               formData={formData} 
               isEditing={isEditing} 
               updateField={updateField} 
               setIsEditing={setIsEditing} 
               sectionRef={sectionRefs['负责人信息']} 
            />

            <AsinSection 
               formData={formData} 
               handleCopy={handleCopy} 
               copyFeedback={copyFeedback} 
               sectionRef={sectionRefs['ASIN信息']} 
            />

            <PackageSection 
               formData={formData} 
               sectionRef={sectionRefs['包裹信息']} 
            />

            <AccessorySection 
               formData={formData} 
               sectionRef={sectionRefs['配件信息']} 
            />

            <LogSection 
               sectionRef={sectionRefs['操作日志']} 
            />

          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-gray-800 flex justify-end space-x-2 bg-white dark:bg-gray-900 shrink-0 shadow-inner transition-colors duration-300">
          {isEditing ? (
            <>
               <button onClick={() => setIsEditing(false)} className="px-5 py-1.5 bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 rounded font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-all"><RotateCcw size={14} /> 放弃修改</button>
               <button onClick={() => { setIsEditing(false); console.log('Saving...', formData); }} className="px-7 py-1.5 bg-emerald-600 text-white rounded font-bold text-[11px] hover:bg-emerald-700 flex items-center gap-1.5 shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-95"><Save size={14} /> 保存物料信息</button>
            </>
          ) : (
            <>
               <button className="px-5 py-1.5 bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 rounded font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-gray-700 transition-all" onClick={onClose}>关闭预览</button>
               <button onClick={() => setIsEditing(true)} className="px-7 py-1.5 bg-blue-600 text-white rounded font-bold text-[11px] hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95 flex items-center gap-1.5"><Edit3 size={14} /> 进入编辑模式</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
