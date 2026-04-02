import React, { useState } from 'react';
import { X, Package, ChevronRight, CheckCircle2, Info, LayoutGrid, FileText, ShieldCheck, Zap, HelpCircle, Upload } from 'lucide-react';

const ProductInformationSupplementFocused = ({ samples, activeTab, setActiveTab, onClose }) => {
  const [activeSection, setActiveSection] = useState('basic'); // 当前聚焦的段落

  // 导航项定义
  const sections = [
    { id: 'basic', label: '基本信息', icon: Package, color: 'text-blue-500' },
    { id: 'specs', label: '规格信息', icon: LayoutGrid, color: 'text-purple-500' },
    { id: 'patent', label: '专利信息', icon: ShieldCheck, color: 'text-emerald-500' },
    { id: 'selling', label: '卖点设计', icon: Zap, color: 'text-amber-500' },
    { id: 'other', label: '其他信息', icon: FileText, color: 'text-slate-500' },
  ];

  const activeSample = samples.find(s => s.id === activeTab);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-gray-950 font-sans animate-in fade-in duration-500">
      
      {/* 1. 顶部样品大标签栏 (横向切换) */}
      <div className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 px-4 flex items-center space-x-1 shrink-0 overflow-x-auto no-scrollbar">
        {samples.map((sample) => (
          <button
            key={sample.id}
            onClick={() => setActiveTab(sample.id)}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === sample.id 
              ? 'border-blue-600 bg-blue-50/30 text-blue-700 dark:text-blue-400 font-bold' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${sample.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-400'} ${activeTab === sample.id ? 'animate-pulse' : ''}`} />
            <span className="text-[12px]">{sample.id}</span>
            <span className="text-[10px] opacity-60 font-normal">({sample.name})</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. 左侧垂直分段导航 (功能 Tab) */}
        <div className="w-[200px] shrink-0 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 flex flex-col space-y-1">
          <div className="px-2 py-1.5 mb-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">编辑章节</span>
          </div>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                activeSection === sec.id 
                ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none shadow-lg' 
                : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <sec.icon size={16} className={activeSection === sec.id ? 'text-white' : sec.color} />
                <span className="text-[12px] font-bold">{sec.label}</span>
              </div>
              {activeSection === sec.id && <ChevronRight size={14} className="animate-in slide-in-from-left-2" />}
            </button>
          ))}
          
          <div className="mt-auto p-3 bg-slate-50 dark:bg-gray-800/50 rounded-xl border border-slate-100 dark:border-gray-700">
             <div className="flex items-center space-x-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold">填报进度</span>
             </div>
             <div className="h-1.5 w-full bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '65%' }} />
             </div>
             <div className="mt-1 text-right text-[10px] text-slate-400 font-mono">65%</div>
          </div>
        </div>

        {/* 3. 中间核心表单区 (Focus Area) */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900/40 p-8 no-scrollbar">
          <div className="max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 章节标题 */}
            <div className="mb-8 border-b border-slate-100 dark:border-gray-800 pb-4 flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-gray-100 flex items-center space-x-3">
                    {sections.find(s => s.id === activeSection).label}
                  </h3>
                  <p className="text-[12px] text-slate-400 mt-1 italic">请填写样品 {activeTab} 的详细信息，带星号项为必填。</p>
               </div>
               <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400 font-mono">ID: {activeTab}</span>
                  {activeSample?.isDirty && <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">待保存</span>}
               </div>
            </div>

            {/* 动态渲染对应章节内容 */}
            {activeSection === 'basic' && (
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                 <BigInput label="公司品牌" required isSelect />
                 <BigInput label="图案" required placeholder="输入图案描述" />
                 <BigInput label="颜色" required value="灰色" />
                 <BigInput label="二级类目" required isSelect />
                 <BigInput label="是否带电" required value="是" isSelect />
                 <BigInput label="规格" required value="英规" isSelect />
                 <div className="col-span-2">
                    <span className="text-[13px] font-bold text-slate-700 dark:text-gray-300 mb-2 block">材质明细 <span className="text-red-500">*</span></span>
                    <textarea className="w-full border-2 border-slate-100 dark:border-gray-800 rounded-xl p-4 text-[13px] h-32 outline-none focus:border-blue-500 bg-slate-50/50 dark:bg-gray-900/50 transition-all" defaultValue="PC+铝合金+尼龙" />
                 </div>
              </div>
            )}

            {activeSection === 'specs' && (
              <div className="space-y-8">
                 <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <h4 className="text-[13px] font-bold text-blue-600 mb-4 flex items-center"><Info size={14} className="mr-2"/> 尺寸与重量</h4>
                    <div className="grid grid-cols-2 gap-8">
                        <BigInput label="尺码" placeholder="-" />
                        <BigInput label="单品重量" required value="0.1" unit="kg" />
                        <div className="col-span-2">
                           <span className="text-[13px] font-bold text-slate-700 dark:text-gray-300 mb-2 block">单品尺寸 (长 x 宽 x 高)</span>
                           <div className="flex space-x-4">
                              <input className="flex-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg h-12 text-center font-bold" defaultValue="10" />
                              <input className="flex-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg h-12 text-center font-bold" defaultValue="10" />
                              <input className="flex-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg h-12 text-center font-bold" defaultValue="10" />
                              <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-gray-900 rounded-lg text-[12px] font-bold text-slate-400">CM</div>
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
            )}
            
            {/* ... 其他章节类似 ... */}
            {['patent', 'selling', 'other'].includes(activeSection) && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                 <HelpCircle size={48} className="mb-4 opacity-20" />
                 <p className="text-[14px]">该章节详细字段待进一步配置...</p>
              </div>
            )}

          </div>
        </div>

        {/* 4. 右侧常驻预览卡片 (Summary Panel) */}
        <div className="w-[320px] shrink-0 bg-slate-50 dark:bg-gray-900/80 border-l border-slate-200 dark:border-gray-800 p-6 flex flex-col space-y-6">
           
           {/* 产品图片卡片 */}
           <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 group">
              <div className="aspect-square bg-slate-50 dark:bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
                <img src="https://img.alicdn.com/imgextra/i4/2206623910383/O1CN01r1Y3X21T8N1N1N1N1_!!2206623910383.jpg" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="mt-4 space-y-1">
                 <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">当前款式</div>
                 <div className="text-[14px] font-extrabold text-slate-800 dark:text-gray-100">ZM0007 带支架款</div>
              </div>
           </div>

           {/* 统计概览 */}
           <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
                 <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600"><Package size={16}/></div>
                    <span className="text-[12px] font-bold">样品总数</span>
                 </div>
                 <span className="text-[16px] font-mono font-bold text-blue-600">{samples.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
                 <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600"><CheckCircle2 size={16}/></div>
                    <span className="text-[12px] font-bold">已完成</span>
                 </div>
                 <span className="text-[16px] font-mono font-bold text-emerald-600">{samples.filter(s => s.status === 'completed').length}</span>
              </div>
           </div>

           {/* 快捷操作卡片 */}
           <div className="mt-auto bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <h4 className="text-[13px] font-extrabold mb-2">快速录入技巧</h4>
              <p className="text-[11px] opacity-80 leading-relaxed mb-4">您可以先在“基本信息”中设置好主材质，然后使用批量同步功能。点击下方按钮开始上传证书。</p>
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center transition-colors">
                <Upload size={14} className="mr-2" /> 专利证书上传
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- 子组件：聚焦模式下的输入框 ---
const BigInput = ({ label, required, value, placeholder, isSelect, unit }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-[13px] font-extrabold text-slate-700 dark:text-gray-300">
      {required && <span className="text-red-500 mr-1">*</span>}{label}
    </label>
    <div className="relative group">
      <input 
        className="w-full border-2 border-slate-100 dark:border-gray-800 rounded-xl px-4 h-12 text-[14px] outline-none focus:border-blue-500 bg-slate-50/50 dark:bg-gray-900/50 transition-all font-medium" 
        defaultValue={value} 
        placeholder={placeholder} 
      />
      {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-slate-400">{unit}</span>}
      {isSelect && <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" />}
    </div>
  </div>
);

export default ProductInformationSupplementFocused;
