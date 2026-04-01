import React from 'react';
import { Calendar, Box, Package } from 'lucide-react';
import { SubTitle, InfoItem } from '../DetailCommon.jsx';
import { DimensionInput, WeightInputRow, ImageUploader } from '../FormComponents.jsx';

const ProcurementSection = ({ formData, isEditing, updateField, setIsEditing, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-6">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <Calendar size={16} className="text-blue-500" /><span>采购信息</span>
      </div>
      <div className="space-y-8 px-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-5 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-6 transition-colors duration-300">
            <div>
              <SubTitle title="首单要求" en="First Order Req" color="blue" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <InfoItem label="生产周期" value={`${formData.procurement.cycle} 天`} fieldPath="procurement.cycle" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
                <InfoItem label="采购起订量" value={`${formData.procurement.moq} PCS`} fieldPath="procurement.moq" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
                <InfoItem label="起订量备注" value={formData.procurement.remark} fieldPath="procurement.remark" span={2} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100/60 dark:border-gray-700/60">
              <SubTitle title="拼单策略" en="Combined Strategy" color="green" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <InfoItem label="拼单类型" value={formData.procurement.combinedOrderType} isEditing={isEditing} setIsEditing={setIsEditing} />
                <InfoItem label="拼单起订量" value={formData.procurement.combinedOrderMoq} isEditing={isEditing} setIsEditing={setIsEditing} />
                <InfoItem label="拼单备注" value={formData.procurement.combinedOrderRemark} span={2} isEditing={isEditing} setIsEditing={setIsEditing} />
              </div>
            </div>
          </div>
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-5 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-6 transition-colors duration-300">
            <div>
              <SubTitle title="开票合规" en="Invoicing" color="purple" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <InfoItem label="能够开票" value={formData.procurement.canInvoice} editType="select" options={["是", "否"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
                <InfoItem label="开票单位" value={formData.procurement.invoiceUnit} editType="select" options={["PCS", "SET", "KG"]} isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
                <InfoItem label="开票品名" value={formData.procurement.invoiceName} isEditing={isEditing} setIsEditing={setIsEditing} />
                <InfoItem label="报关材质" value={formData.procurement.customsMaterial} isEditing={isEditing} setIsEditing={setIsEditing} />
                <InfoItem label="开票规格型号" value={formData.procurement.invoiceSpec} span={2} isEditing={isEditing} setIsEditing={setIsEditing} />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100/60 dark:border-gray-700/60">
              <SubTitle title="商检发货要求" en="Compliance" color="blue" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <InfoItem label="是否需要商检" value={formData.procurement.needInspection} isEditing={isEditing} setIsEditing={setIsEditing} />
                <InfoItem label="是否原箱发货" value={formData.procurement.isOriginalBox} isEditing={isEditing} setIsEditing={setIsEditing} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50/30 dark:bg-gray-800/40 p-5 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-6 transition-colors duration-300">
          <div>
            <SubTitle title="首单追踪" en="Timeline" color="orange" />
            <div className="grid grid-cols-4 gap-x-6 gap-y-1">
              <InfoItem label="首单日期" value={formData.procurement.firstOrderDate} isEditing={isEditing} setIsEditing={setIsEditing} />
              <InfoItem label="首单预估交期" value={formData.procurement.firstOrderEstDelivery} isEditing={isEditing} setIsEditing={setIsEditing} />
              <InfoItem label="首单实际交期" value={formData.procurement.firstOrderActDelivery} isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100/60 dark:border-gray-700/60">
            <SubTitle title="规格参数" en="Specifications" color="blue" />
            {isEditing ? (
              <div className="grid grid-cols-2 gap-8 mt-2">
                <DimensionInput label="单品规格" value={formData.specs.itemDim} onChange={(v) => updateField('specs.itemDim', v)} />
                <DimensionInput label="包装规格" value={formData.specs.packageDim} onChange={(v) => updateField('specs.packageDim', v)} />
                <WeightInputRow label="净重" value={formData.specs.netWeight} onChange={(v) => updateField('specs.netWeight', v)} />
                <WeightInputRow label="毛重" value={formData.specs.grossWeight} onChange={(v) => updateField('specs.grossWeight', v)} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="grid grid-cols-1 gap-y-1">
                  <InfoItem label="单品规格" value={`${formData.specs.itemDim.l}*${formData.specs.itemDim.w}*${formData.specs.itemDim.h} cm`} isEditing={isEditing} setIsEditing={setIsEditing} />
                  <InfoItem label="净重" value={`${formData.specs.netWeight.value} ${formData.specs.netWeight.unit}`} isEditing={isEditing} setIsEditing={setIsEditing} />
                </div>
                <div className="grid grid-cols-1 gap-y-1">
                  <InfoItem label="包装规格" value={`${formData.specs.packageDim.l}*${formData.specs.packageDim.w}*${formData.specs.packageDim.h} cm`} isEditing={isEditing} setIsEditing={setIsEditing} />
                  <InfoItem label="毛重" value={`${formData.specs.grossWeight.value} ${formData.specs.grossWeight.unit}`} isEditing={isEditing} setIsEditing={setIsEditing} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <SubTitle title="产品图片" en="Product Images" color="blue" />
            <div className="bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
              {isEditing ? <ImageUploader images={formData.specs.images} onUpload={(imgs) => updateField('specs.images', imgs)} /> : <div className="flex gap-2">{[1,2].map(i=><div key={i} className="w-12 h-12 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded flex items-center justify-center text-slate-300 dark:text-gray-600 shadow-sm"><Package size={20}/></div>)}</div>}
            </div>
          </div>
          <div>
            <SubTitle title="包装图片" en="Packaging Images" color="orange" />
            <div className="bg-slate-50/30 dark:bg-gray-800/40 p-3 rounded-lg border border-slate-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
              <div className="flex gap-2">{[1].map(i=><div key={i} className="w-12 h-12 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded flex items-center justify-center text-slate-300 dark:text-gray-600 shadow-sm"><Box size={20}/></div>)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementSection;
