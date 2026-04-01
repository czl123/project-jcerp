import React from 'react';
import { Link2 } from 'lucide-react';

const AccessorySection = ({ formData, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-4 scroll-mt-10">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <Link2 size={16} className="text-blue-500" /><span>配件信息</span>
        </div>
        <div className="pr-4 text-[10px] text-slate-400 dark:text-gray-500 font-normal">
          共计 <span className="font-bold text-blue-600 dark:text-blue-400">{formData.accessories.length}</span> 个配件项
        </div>
      </div>
      <div className="mx-2 border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead className="bg-slate-50 dark:bg-gray-700 text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-2.5 font-bold text-center w-24">序号</th>
              <th className="px-4 py-2.5 font-bold">配件名称</th>
              <th className="px-4 py-2.5 font-bold">配件SKU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700 transition-colors duration-300">
            {formData.accessories.map((acc, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors group">
                <td className="px-4 py-2 text-center text-slate-500 dark:text-gray-400 font-mono font-bold">{idx + 1}</td>
                <td className="px-4 py-2 font-black text-slate-700 dark:text-gray-200">{acc.name}</td>
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400 font-bold">{acc.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessorySection;
