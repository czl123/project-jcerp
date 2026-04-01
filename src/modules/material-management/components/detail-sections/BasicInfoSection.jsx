import React from 'react';
import { Info, Sparkles, Tag, Search, CheckCircle2 } from 'lucide-react';
import { SubTitle, InfoItem } from '../DetailCommon.jsx';
import { MOCK_CATEGORIES, MOCK_COMPANY_BRANDS, MOCK_FESTIVALS, MOCK_SEASONS, MOCK_SPECS } from '../MaterialConstants.js';

const BasicInfoSection = ({ formData, isEditing, updateField, handleCopy, copyFeedback, setIsEditing, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-6">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <Info size={16} className="text-blue-500" /><span>基本信息</span>
      </div>
      <div className="space-y-8 px-2">
        <div>
          <SubTitle title="基本信息" en="Basic Info" color="blue" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <InfoItem label="物料编码" value={formData.code} copyable isEditing={isEditing} copyFeedback={copyFeedback} handleCopy={handleCopy} setIsEditing={setIsEditing} />
            <InfoItem label="提案编号" value={formData.base.proposalNo} copyable isEditing={isEditing} copyFeedback={copyFeedback} handleCopy={handleCopy} setIsEditing={setIsEditing} />
            <InfoItem label="提案来源" value={formData.base.source} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="源物料编码" value={formData.base.sourceCode} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="创建时间" value={formData.base.createTime} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="最后更新时间" value={formData.base.updateTime} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="禁用时间" value={formData.base.disableTime} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="同步金蝶时间" value={formData.base.syncKingdeeTime} isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
        </div>
        <div>
          <SubTitle title="同款属性" en="Identical Attributes" color="blue" />
          <div className="grid grid-cols-3 gap-x-6 gap-y-1 bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <InfoItem label="运营大类" value={formData.identical.category} fieldPath="identical.category" editType="select" options={MOCK_CATEGORIES} required isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="产品名称" value={formData.identical.name} fieldPath="identical.name" span={2} required copyable isEditing={isEditing} updateField={updateField} handleCopy={handleCopy} copyFeedback={copyFeedback} setIsEditing={setIsEditing} />
            <InfoItem label="款式" value={formData.identical.style} fieldPath="identical.style" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="主材料" value={formData.identical.material} fieldPath="identical.material" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="适用品牌或对象" value={formData.identical.brand} fieldPath="identical.brand" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="型号" value={formData.identical.model} fieldPath="identical.model" copyable isEditing={isEditing} updateField={updateField} handleCopy={handleCopy} copyFeedback={copyFeedback} setIsEditing={setIsEditing} />
          </div>
        </div>
        <div>
          <SubTitle title="关键属性" en="Key Attributes" color="orange" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <InfoItem label="公司品牌" value={formData.keyAttrs.company} fieldPath="keyAttrs.company" editType="select" options={MOCK_COMPANY_BRANDS} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="图案" value={formData.keyAttrs.pattern} fieldPath="keyAttrs.pattern" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="颜色" value={formData.keyAttrs.color} fieldPath="keyAttrs.color" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="尺码" value={formData.keyAttrs.size} fieldPath="keyAttrs.size" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="包装数量" value={formData.keyAttrs.packQty} fieldPath="keyAttrs.packQty" help={"示例1:1pack\n示例2:1pack+2pack+3pack"} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
          </div>
        </div>
        <div>
          <SubTitle title="一般属性" en="General Attributes" color="gray" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <InfoItem label="节日标签" value={formData.general.festival} fieldPath="general.festival" editType="select" options={MOCK_FESTIVALS} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="季节标签" value={formData.general.season} fieldPath="general.season" editType="select" options={MOCK_SEASONS} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="是否带电" value={formData.general.battery} fieldPath="general.battery" editType="select" options={["是", "否"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="是否CE类" value={formData.general.ce} fieldPath="general.ce" editType="select" options={["是", "否"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="适用机型" value={formData.general.machine} fieldPath="general.machine" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="材质明细" value={formData.general.materialDetail} fieldPath="general.materialDetail" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="色号" value={formData.general.colorCode} fieldPath="general.colorCode" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="规格" value={formData.general.spec} fieldPath="general.spec" editType="select" options={MOCK_SPECS} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="二级类目" value={formData.general.subCategory} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="Logo可替换" value={formData.general.logoReplaceable} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="首单物流方式" value={formData.general.firstLogistics} isEditing={isEditing} setIsEditing={setIsEditing} />
            <InfoItem label="建议物流方式" value={formData.general.suggestedLogistics} isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
        </div>
        <div className="space-y-4">
          <SubTitle title="其他信息" en="Additional Details" color="green" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-1 bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <InfoItem label="是否登记大货样" value={formData.remarks.isBulkSampleReg} fieldPath="remarks.isBulkSampleReg" editType="select" options={["是", "否"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            <InfoItem label="产品规格书" value={formData.remarks.isProductSpecReg} fieldPath="remarks.isProductSpecReg" editType="select" options={["是", "否"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50/20 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 shadow-sm space-y-4 transition-colors duration-300">
              <div className="space-y-1.5">
                <div className="text-[10px] text-blue-400 font-bold ml-1 flex items-center gap-1 uppercase">
                  <Sparkles size={10} /> 营销核心卖点
                </div>
                <InfoItem label="产品要点" value={formData.remarks.sellingPoints} fieldPath="remarks.sellingPoints" editType="textarea" span={4} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
              <div className="space-y-1.5 pt-2 border-t border-blue-100/30 dark:border-blue-900/30">
                <div className="text-[10px] text-blue-400 font-bold ml-1 flex items-center gap-1 uppercase">
                  <Tag size={10} /> 仓储识别标识
                </div>
                <InfoItem label="入库标签短描述" value={formData.remarks.inboundShortDesc} fieldPath="remarks.inboundShortDesc" span={4} help={"平板电脑保护套类：【适用品牌或对象】+【型号】+ 【款式】+【主材料】+【图案】+【颜色】+【包装数量】\n非平板电脑保护套类：手动录入"} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
            </div>
            <div className="bg-emerald-50/20 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 shadow-sm space-y-4 transition-colors duration-300">
              <div className="space-y-1.5">
                <div className="text-[10px] text-emerald-400 font-bold ml-1 flex items-center gap-1 uppercase">
                  <Search size={10} /> 采购快速下单参考
                </div>
                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-2 rounded-lg border border-emerald-100/30 dark:border-emerald-900/30 transition-colors duration-300">
                  <InfoItem label="规格型号" value={formData.remarks.specModel} fieldPath="remarks.specModel" span={4} copyable help={"非平板电脑保护套类：【适用品牌或对象】 + 【型号】 + 【款式】 + 【图案】 + 【颜色】 + 【主材料】 + 【色号】 + 【尺码】 + 【包装数量】 + 【规格】+【版本】\n平板电脑保护套类：【适用品牌或对象】 + 【型号】 + 【款式】 + 【主材料】 + 【图案】 + 【颜色】 + 【包装数量】 + 【版本】"} isEditing={isEditing} updateField={updateField} handleCopy={handleCopy} copyFeedback={copyFeedback} setIsEditing={setIsEditing} />
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-emerald-100/30 dark:border-emerald-900/30">
                <div className="text-[10px] text-emerald-400 font-bold ml-1 flex items-center gap-1 uppercase">
                  <CheckCircle2 size={10} /> 质量与生产要求
                </div>
                <InfoItem label="质量要求点" value={formData.remarks.qualityReq} fieldPath="remarks.qualityReq" editType="textarea" span={4} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
