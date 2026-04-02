import React from 'react';
import { RefreshCw, HelpCircle } from 'lucide-react';

const SupplementActionFooter = ({ 
  isSyncing, 
  syncStatus, 
  onSyncAll, 
  onSaveAll, 
  onSubmitAll, 
  onCancel 
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 px-6 py-2.5 flex justify-between items-center shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex flex-col">
         <div className="flex items-center space-x-2">
           <HelpCircle size={12} className="text-slate-400" />
           <span className="text-slate-400 font-bold text-[10px]">一键应用：勾选一个“待提交”模板，同步至所有“待编辑”项。</span>
         </div>
         {syncStatus.msg && (
           <div className={`mt-1 font-black text-[10px] flex items-center animate-in slide-in-from-left-2 ${syncStatus.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
             <span className="mr-1">{syncStatus.type === 'error' ? '✕' : '✓'}</span>
             {syncStatus.msg}
           </div>
         )}
      </div>
      <div className="flex space-x-3">
        <button 
          disabled={isSyncing}
          onClick={onSyncAll}
          className={`px-5 py-1 border border-emerald-500 rounded-[3px] text-[11px] font-bold transition-all flex items-center group ${isSyncing ? 'bg-emerald-50 text-emerald-400 border-emerald-200' : 'text-emerald-600 hover:bg-emerald-50 active:scale-95'}`}
        >
          <RefreshCw size={12} className={`mr-2 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          {isSyncing ? '同步中...' : '一键应用到所有样品'}
        </button>
        <button 
          onClick={onCancel}
          className="px-8 py-1 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 rounded-[3px] text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-gray-700 transition-all active:scale-95 uppercase tracking-wider"
        >
          取消
        </button>
        <button 
          onClick={onSaveAll}
          className="px-8 py-1 bg-emerald-500 dark:bg-emerald-600 text-white rounded-[3px] text-[11px] font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all active:scale-95 uppercase tracking-wider"
        >
          全部保存
        </button>
        <button 
          disabled={isSyncing}
          onClick={onSubmitAll}
          className="px-8 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded-[3px] text-[11px] font-bold hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md transition-all active:scale-95 uppercase tracking-wider"
        >
          {isSyncing ? '提交中...' : '全部提交'}
        </button>
      </div>
    </div>
  );
};

export default SupplementActionFooter;
