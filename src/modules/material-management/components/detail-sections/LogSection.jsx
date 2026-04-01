import React from 'react';
import { History } from 'lucide-react';

const LogSection = ({ sectionRef }) => {
  // 模拟日志数据
  const logs = [
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
  ];

  return (
    <div ref={sectionRef} className="space-y-4 scroll-mt-10">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <History size={16} className="text-blue-500" /><span>操作日志</span>
      </div>
      <div className="px-4 py-2">
        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-gray-800">
          {logs.map((log, idx) => (
            <div key={idx} className="relative pl-8">
              <div className="absolute left-0 top-1 w-6 h-6 bg-white dark:bg-gray-800 border border-blue-500 rounded-full flex items-center justify-center z-10 shadow-sm transition-colors duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="bg-slate-50/50 dark:bg-gray-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-gray-200">{log.user}</span>
                  <span className="text-[10px] text-slate-400 dark:text-gray-500 font-mono">{log.time}</span>
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mb-1.5">{log.action}</div>
                
                {log.diffs ? (
                  <div className="space-y-1">
                    {log.diffs.map((diff, dIdx) => (
                      <div key={dIdx} className="text-[10px] flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded border border-slate-100 dark:border-gray-700 transition-colors duration-300">
                        <span className="text-slate-400 dark:text-gray-500 font-bold w-16 shrink-0">[{diff.field}]</span>
                        <span className="text-red-400 dark:text-red-500/80 line-through truncate max-w-[100px]">{diff.old}</span>
                        <span className="text-slate-300 dark:text-gray-600">→</span>
                        <span className="text-emerald-500 dark:text-emerald-400 font-bold truncate">{diff.new}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 italic pl-2 bg-white/50 dark:bg-gray-800/50 p-1.5 rounded border border-dashed border-slate-200 dark:border-gray-700 transition-colors duration-300">{log.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogSection;
