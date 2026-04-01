import React from 'react';
import { Tag, Check, Copy } from 'lucide-react';

const AsinSection = ({ formData, handleCopy, copyFeedback, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-4 scroll-mt-10">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <Tag size={16} className="text-blue-500" /><span>ASIN 信息</span>
      </div>
      <div className="mx-2 border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead className="bg-slate-50 dark:bg-gray-700 text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700">
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
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700 transition-colors duration-300">
            {formData.asinList.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors group">
                <td className="px-4 py-2 text-center text-slate-400 dark:text-gray-500 font-mono">{idx + 1}</td>
                <td className="px-4 py-2 font-bold text-slate-700 dark:text-gray-200">{row.account}</td>
                <td className="px-4 py-2 text-center">
                  <span className="bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-black uppercase transition-colors">{row.site}</span>
                </td>
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="hover:underline cursor-pointer">{row.asin}</span>
                    <button onClick={() => handleCopy(row.asin, `asin-${idx}`)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
                      {copyFeedback === `asin-${idx}` ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-center text-slate-500 dark:text-gray-400 font-medium">{row.ver}</td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md font-bold border border-blue-100/50 dark:border-blue-900/50 transition-colors">{row.op}</span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md font-bold border border-emerald-100/50 dark:border-emerald-900/50 transition-colors">{row.listing}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsinSection;
