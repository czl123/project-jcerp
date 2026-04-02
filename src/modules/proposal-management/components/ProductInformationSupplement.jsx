import React, { useState } from 'react';
import { X, Layout, Sidebar as SidebarIcon, Table as TableIcon } from 'lucide-react';
import SampleListSidebar from './SampleListSidebar';
import ProductInformationSupplementFocused from './ProductInformationSupplementFocused';
import ProductInformationSupplementList from './ProductInformationSupplementList';

const ProductDetailModal = ({ onClose }) => {
  const [layoutMode, setLayoutMode] = useState('classic'); // 'classic', 'focused', 'list'
  const [samples, setSamples] = useState([
    { id: 'KFY-2026030002', name: '样品 01', status: 'completed', isDirty: true },
    { id: 'KFY-2026030003', name: '样品 02', status: 'pending', isDirty: false }
  ]);
  const [activeTab, setActiveTab] = useState(samples[0].id);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans text-slate-800 dark:text-gray-200 antialiased transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-[1480px] max-w-full h-[95vh] rounded-md shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-gray-700 animate-in zoom-in-95 duration-200">
        
        {/* 1. 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-[3px] h-3.5 bg-sky-500 rounded-full"></span>
              <h2 className="text-[13px] font-bold dark:text-gray-100">样品信息完善</h2>
            </div>
            
            {/* 布局切换开关 */}
            <div className="flex items-center bg-slate-100 dark:bg-gray-800 p-0.5 rounded-md ml-4">
               <button 
                 onClick={() => setLayoutMode('classic')}
                 className={`flex items-center space-x-1.5 px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${layoutMode === 'classic' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <SidebarIcon size={12} />
                 <span>侧边栏</span>
               </button>
               <button 
                 onClick={() => setLayoutMode('focused')}
                 className={`flex items-center space-x-1.5 px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${layoutMode === 'focused' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <Layout size={12} />
                 <span>聚焦模式</span>
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
          <X size={18} className="text-slate-400 dark:text-gray-500 cursor-pointer hover:text-red-500 transition-colors" onClick={onClose} />
        </div>

        {/* 2. 根据模式渲染主体内容 */}
        {layoutMode === 'classic' && (
          <>
            <div className="px-4 py-3 border-b border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 space-y-3">
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
            </div>
            <SampleListSidebar samples={samples} activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}

        {layoutMode === 'focused' && (
          <ProductInformationSupplementFocused samples={samples} activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose} />
        )}

        {layoutMode === 'list' && (
          <ProductInformationSupplementList samples={samples} setActiveTab={setActiveTab} setLayoutMode={setLayoutMode} />
        )}

        {/* 5. 底部公共操作按钮 */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-gray-700 flex justify-end space-x-3 bg-white dark:bg-gray-900 shrink-0">
          <button className="px-9 py-1.5 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 rounded-[3px] text-[12px] font-bold hover:bg-slate-200 dark:hover:bg-gray-700 transition-all" onClick={onClose}>取消</button>
          <button className="px-9 py-1.5 bg-sky-600 dark:bg-sky-700 text-white rounded-[3px] text-[12px] font-bold hover:bg-sky-700 dark:hover:bg-sky-600 shadow-md transition-all">保存当前样品</button>
          <button className="px-9 py-1.5 bg-emerald-500 dark:bg-emerald-600 text-white rounded-[3px] text-[12px] font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all">全部提交</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
