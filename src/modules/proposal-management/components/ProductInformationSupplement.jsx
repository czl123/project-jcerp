import React, { useState } from 'react';
import { X, Sidebar as SidebarIcon, Table as TableIcon, ChevronDown, ChevronUp } from 'lucide-react';
import SampleListSidebar from './SampleListSidebar';
import ProductInformationSupplementList from './ProductInformationSupplementList';
import SampleEditSection from './SampleEditSection';
import SampleTileSection from './SampleTileSection';
import SupplementActionFooter from './SupplementActionFooter';

const ProductDetailModal = ({ onClose }) => {
  const [layoutMode, setLayoutMode] = useState('classic'); // 'classic', 'list'
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [samples, setSamples] = useState([
    { id: 'KFY-2026030002', name: '样品 01', status: 'completed', isDirty: true, purchaser: '张三' },
    { id: 'KFY-2026030003', name: '样品 02', status: 'pending', isDirty: false, purchaser: '李四' }
  ]);
  const [activeTab, setActiveTab] = useState(samples[0].id);
  const [selectedIds, setSelectedIds] = useState([]);

  // --- 状态与同步/提交逻辑 ---
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ type: '', msg: '' });

  const handleSyncAll = () => {
    setSyncStatus({ type: '', msg: '' });
    if (!selectedIds || selectedIds.length !== 1) {
      setSyncStatus({ type: 'error', msg: '请先勾选一个“待提交”样品作为模板' });
      setTimeout(() => setSyncStatus({ type: '', msg: '' }), 3000);
      return;
    }
    const sourceSample = samples.find(s => s.id === selectedIds[0]);
    if (!sourceSample || sourceSample.status === 'completed') {
      setSyncStatus({ type: 'error', msg: '所选样品必须是“待提交”状态' });
      setTimeout(() => setSyncStatus({ type: '', msg: '' }), 3000);
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      setSamples(prev => prev.map(s => s.status === 'completed' ? { ...s, isDirty: true } : s));
      setIsSyncing(false);
      setSyncStatus({ type: 'success', msg: '同步成功！已应用到所有待编辑样品' });
      setTimeout(() => setSyncStatus({ type: '', msg: '' }), 3000);
    }, 800);
  };

  const handleSubmitAll = () => {
    setSyncStatus({ type: '', msg: '' });
    const incompleteSample = samples.find(s => !s.brand && !s.material && false); // 模拟逻辑，实际应检查真实字段
    if (incompleteSample) {
      setSyncStatus({ type: 'error', msg: `样品 [${incompleteSample.id}] 信息不完整` });
      return;
    }
    setIsSyncing(true);
    setSyncStatus({ type: 'success', msg: '校验通过，正在提交数据...' });
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus({ type: 'success', msg: '全部提交成功！即将关闭窗口' });
      setTimeout(() => onClose && onClose(), 1200);
    }, 1000);
  };

  const handleSaveAll = () => {
    setSyncStatus({ type: 'success', msg: '所有样品已保存成功' });
    setTimeout(() => setSyncStatus({ type: '', msg: '' }), 2000);
  };

  // --- 全选/反选逻辑 ---
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(samples.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = () => {
    if (window.confirm(`确定要删除选中的 ${selectedIds.length} 个样品吗？`)) {
      const newSamples = samples.filter(s => !selectedIds.includes(s.id));
      setSamples(newSamples);
      setSelectedIds([]);
      if (newSamples.length > 0) {
        setActiveTab(newSamples[0].id);
      }
    }
  };

  const handleCopy = (sample) => {
    const newId = `${sample.id}-copy-${Math.floor(Math.random() * 1000)}`;
    const newSample = {
      ...sample,
      id: newId,
      name: `${sample.name} (副本)`,
      status: 'pending',
      isDirty: true
    };
    setSamples([...samples, newSample]);
  };

  const handleDelete = (id) => {
    if (samples.length <= 1) return alert('至少保留一个样品');
    const newSamples = samples.filter(s => s.id !== id);
    setSamples(newSamples);
    setSelectedIds(prev => prev.filter(item => item !== id));
    if (activeTab === id) {
      setActiveTab(newSamples[0].id || '');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans text-slate-800 dark:text-gray-200 antialiased transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-[1480px] max-w-full h-[95vh] rounded-md shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-gray-700 animate-in zoom-in-95 duration-200">
        
        {/* 1. 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-[3px] h-3.5 bg-sky-500 rounded-full"></span>
              <h2 className="text-[13px] font-bold dark:text-gray-100 flex items-center">
                样品信息完善
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <X size={18} className="text-slate-400 dark:text-gray-500 cursor-pointer hover:text-red-500 transition-colors" onClick={onClose} />
          </div>
        </div>

        {/* 2. 顶部汇总信息栏 - 现在在平铺和列表视图下都显示 */}
        {(layoutMode === 'classic' || layoutMode === 'list') && (
          <div className={`px-4 ${isHeaderCollapsed ? 'py-1.5' : 'py-3'} border-b border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 transition-all duration-300 relative`}>
            <div className="flex items-center justify-between mb-1">
               {isHeaderCollapsed ? (
                 <div className="flex items-center space-x-6 text-[11px] text-slate-500 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex items-center">
                      <span className="text-slate-400 mr-2">SPU:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">ZM0007</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-slate-400 mr-2">产品名称:</span>
                      <span className="font-bold text-slate-700 dark:text-gray-300">工作灯</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-slate-400 mr-2">款式:</span>
                      <span className="font-medium text-slate-600 dark:text-gray-400">带支架款</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-slate-400 mr-2">产品经理:</span>
                      <span className="font-medium text-slate-600 dark:text-gray-400">储张玲</span>
                    </div>
                 </div>
               ) : (
                 <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">汇总信息</div>
               )}
               <button 
                 onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
                 className="p-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded transition-colors text-slate-400 hover:text-blue-500 flex items-center space-x-1"
                 title={isHeaderCollapsed ? "展开" : "折叠"}
               >
                 <span className="text-[10px] font-bold">{isHeaderCollapsed ? '展开详情' : '折叠'}</span>
                 {isHeaderCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
               </button>
            </div>

            {!isHeaderCollapsed && (
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200 origin-top">
                <div className="border border-slate-200 dark:border-gray-700 rounded-sm overflow-hidden text-[11px]">
                  <table className="w-full border-collapse text-center">
                    <tbody>
                      <tr className="bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700">
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700 w-[15%]">运营大类</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700 w-[15%] text-sky-600 dark:text-sky-400 font-bold">团队负责人</td>
                        <td colSpan={5}></td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 font-medium text-slate-700 dark:text-gray-200">
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">照明用品</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700 text-sky-600 dark:text-sky-400">张雪健</td>
                        <td colSpan={5}></td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700">
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">产品名称</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">款式</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">主材料</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">适用品牌或对象</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">型号</td>
                        <td className="py-1.5 border-r border-slate-200 dark:border-gray-700">SPU</td>
                        <td className="py-1.5 px-2">产品经理</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-900 font-medium text-slate-700 dark:text-gray-200">
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">工作灯</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">带支架款</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">PC+铝合金+尼龙</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">-</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700">-</td>
                        <td className="py-2 border-r border-slate-200 dark:border-gray-700 font-mono text-[10px]">ZM0007</td>
                        <td className="py-2">储张玲</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 底部标签信息 - 参考图片样式 */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex border border-slate-200 dark:border-gray-700 rounded-sm overflow-hidden text-[11px] h-7 w-[250px]">
                    <div className="bg-slate-50 dark:bg-gray-800 px-3 flex items-center text-slate-500 dark:text-gray-400 border-r border-slate-200 dark:border-gray-700 min-w-[70px]">
                      开发品牌:
                    </div>
                    <div className="bg-white dark:bg-gray-900 px-3 flex items-center text-slate-700 dark:text-gray-200 flex-1">
                      MoKo
                    </div>
                  </div>

                  <div className="flex border border-slate-200 dark:border-gray-700 rounded-sm overflow-hidden text-[11px] h-7 w-[250px]">
                    <div className="bg-slate-50 dark:bg-gray-800 px-3 flex items-center text-slate-500 dark:text-gray-400 border-r border-slate-200 dark:border-gray-700 min-w-[70px]">
                      季节标签:
                    </div>
                    <div className="bg-white dark:bg-gray-900 px-3 flex items-center text-slate-700 dark:text-gray-200 flex-1">
                      无
                    </div>
                  </div>

                  <div className="flex border border-slate-200 dark:border-gray-700 rounded-sm overflow-hidden text-[11px] h-7 w-[250px]">
                    <div className="bg-slate-50 dark:bg-gray-800 px-3 flex items-center text-slate-500 dark:text-gray-400 border-r border-slate-200 dark:border-gray-700 min-w-[70px]">
                      节日标签:
                    </div>
                    <div className="bg-white dark:bg-gray-900 px-3 flex items-center text-slate-700 dark:text-gray-200 flex-1">
                      春节
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. 模式切换工具栏 */}
        {(layoutMode === 'classic' || layoutMode === 'list') && (
          <div className="px-4 py-2 border-b border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-[3px] h-4 bg-blue-600 rounded-full"></span>
              <span className="text-[13px] font-bold text-slate-700 dark:text-gray-200">提案-物料预建</span>
              <span className="ml-2 px-1.5 py-0.5 bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 text-[10px] rounded border border-slate-200 dark:border-gray-700 font-bold flex items-center space-x-3">
                <span>当前展示：<span className="text-blue-600 dark:text-blue-400">{samples.length}</span> 个样品</span>
                <span className="w-px h-2.5 bg-slate-300 dark:bg-gray-600"></span>
                <span className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                  待编辑：{samples.filter(s => s.status === 'completed').length}
                </span>
                <span className="flex items-center text-orange-600 dark:text-orange-400">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                  待提交：{samples.filter(s => s.status !== 'completed').length}
                </span>
              </span>

              <div className="h-4 w-px bg-slate-200 dark:bg-gray-700 mx-1"></div>

              {/* 导出操作 */}
              <div className="flex items-center space-x-1">
                <button className="flex items-center space-x-1 px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded transition-colors group">
                  <span className="text-emerald-500 group-hover:scale-110 transition-transform">↑</span>
                  <span>导出清单</span>
                </button>
              </div>

              <div className="h-4 w-px bg-slate-200 dark:bg-gray-700 mx-2"></div>

              {/* 全局全选 */}
              <label className="flex items-center space-x-2 cursor-pointer group px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" 
                  checked={selectedIds.length === samples.length && samples.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span className="text-[10px] font-black text-slate-600 dark:text-gray-300 group-hover:text-blue-600">全选样品</span>
              </label>
            </div>
            
            <div className="flex items-center bg-slate-100 dark:bg-gray-800 p-0.5 rounded-md">
               <button 
                 onClick={() => setLayoutMode('classic')}
                 className={`flex items-center space-x-1.5 px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${layoutMode === 'classic' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <SidebarIcon size={12} />
                 <span>平铺视图</span>
               </button>
               <button 
                 onClick={() => setLayoutMode('list')}
                 className={`flex items-center space-x-1.5 px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${layoutMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <TableIcon size={12} />
                 <span>列表视图</span>
               </button>
            </div>
          </div>
        )}

        {/* 4. 根据模式渲染主体内容 */}
        {layoutMode === 'classic' && (
          <SampleTileSection 
            samples={samples} 
            activeTab={activeTab} 
            setLayoutMode={setLayoutMode} 
            onUpdateSamples={setSamples}
            onActiveTabChange={setActiveTab}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onClose={onClose}
          />
        )}

        {layoutMode === 'list' && (
          <ProductInformationSupplementList 
            samples={samples} 
            onUpdateSamples={setSamples}
            setActiveTab={setActiveTab} 
            setLayoutMode={setLayoutMode} 
            onCopy={handleCopy}
            onDelete={handleDelete}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
          />
        )}

        {layoutMode === 'edit' && (
          <SampleEditSection samples={samples} activeTab={activeTab} setActiveTab={setActiveTab} setLayoutMode={setLayoutMode} />
        )}

        {/* 5. 底部公共操作按钮 */}
        <SupplementActionFooter
          isSyncing={isSyncing}
          syncStatus={syncStatus}
          onSyncAll={handleSyncAll}
          onSaveAll={layoutMode === 'list' ? null : handleSaveAll}
          onSubmitAll={handleSubmitAll}
          onCancel={onClose}
        />        </div>
        </div>
  );
};

export default ProductDetailModal;
