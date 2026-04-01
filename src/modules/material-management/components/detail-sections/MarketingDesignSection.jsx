import React from 'react';
import { Lightbulb, Search, Edit3, Package, ExternalLink, Check, Copy } from 'lucide-react';
import { SubTitle, InfoItem } from '../DetailCommon.jsx';

const MarketingDesignSection = ({ formData, isEditing, updateField, handleCopy, copyFeedback, setIsEditing, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-6">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <Lightbulb size={16} className="text-blue-500" /><span>卖点设计信息</span>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <div className="flex items-stretch overflow-hidden rounded border border-cyan-200 dark:border-cyan-900 shadow-sm">
            <div className="bg-cyan-500 w-1"></div>
            <div className="bg-cyan-50 dark:bg-cyan-900/30 px-2 py-0.5 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold">
              图片等级: <span className="text-cyan-900 dark:text-cyan-300 ml-1">{formData.marketing.imgLevel}</span>
            </div>
          </div>
          <div className="flex items-stretch overflow-hidden rounded border border-indigo-200 dark:border-indigo-900 shadow-sm">
            <div className="bg-indigo-500 w-1"></div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold">
              文案等级: <span className="text-indigo-900 dark:text-indigo-300 ml-1">{formData.marketing.copyLevel}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8 px-2">
        <div className="bg-slate-50/30 dark:bg-gray-800/40 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-8 transition-colors duration-300">
          <div>
            <SubTitle title="核心卖点" en="Key Selling Points" color="blue" />
            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-slate-100 dark:border-gray-700 min-h-[60px] shadow-inner transition-colors duration-300">
              <InfoItem label="开发卖点" value={formData.remarks.sellingPoints} fieldPath="remarks.sellingPoints" editType="textarea" span={4} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100/60 dark:border-gray-700/60">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-[11px] uppercase tracking-wider ml-1">
                <Search size={14} /> 图片拍摄/设计要求
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-slate-50 dark:border-gray-700/50 transition-colors">
                <InfoItem label="图片要求" value={formData.marketing.imgReq} fieldPath="marketing.imgReq" editType="textarea" span={4} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wider ml-1">
                <Edit3 size={14} /> 文案创作/翻译要求
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-slate-50 dark:border-gray-700/50 transition-colors">
                <InfoItem label="文案要求" value={formData.marketing.copyReq} fieldPath="marketing.copyReq" editType="textarea" span={4} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100/60 dark:border-gray-700/60">
            <div className="space-y-3">
              <SubTitle title="参考图片" en="Ref Images" color="orange" />
              <div className="flex gap-3 px-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="group relative w-16 h-16 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-slate-300 dark:text-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-zoom-in shadow-sm">
                    <Package size={24} />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors rounded-lg"></div>
                  </div>
                ))}
                <button className="w-16 h-16 border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-slate-400 dark:text-gray-500 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
                  <Search size={16} />
                  <span className="text-[9px] mt-1 font-bold">查看全部</span>
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <SubTitle title="参考链接" en="Ref Links" color="blue" />
              <div className="space-y-2 px-2 max-h-[80px] overflow-y-auto no-scrollbar">
                {formData.marketing.refLinks.map((link, i) => (
                  <div key={i} className="group/link flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-1.5 rounded-lg border border-slate-100/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <ExternalLink size={12} className="text-slate-300 dark:text-gray-600" />
                    <span className="flex-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate font-mono text-[10px]">{link}</span>
                    <button onClick={() => handleCopy(link, `ref-link-${i}`)} className="opacity-0 group-hover/link:opacity-100 p-1 text-slate-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400">
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
  );
};

export default MarketingDesignSection;
