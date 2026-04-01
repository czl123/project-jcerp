import React from 'react';
import { User } from 'lucide-react';
import { SubTitle, InfoItem } from '../DetailCommon.jsx';

const ResponsiblesSection = ({ formData, isEditing, updateField, setIsEditing, sectionRef }) => {
  return (
    <div ref={sectionRef} className="space-y-6">
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 border-b border-slate-100 dark:border-gray-800 flex items-center space-x-2 text-slate-800 dark:text-gray-100 font-bold text-[14px] transition-colors duration-300">
        <User size={16} className="text-blue-500" /><span>负责人信息</span>
      </div>
      <div className="space-y-6 px-2">
        <div className="grid grid-cols-4 gap-6 items-start">
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-300">
            <SubTitle title="开发负责人" en="Dev" color="blue" />
            <div className="space-y-1">
              <InfoItem label="产品团队负责人" value={formData.responsibles.dev.leader} fieldPath="responsibles.dev.leader" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="产品经理" value={formData.responsibles.dev.pm} fieldPath="responsibles.dev.pm" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="初始产品经理" value={formData.responsibles.dev.initialPm} fieldPath="responsibles.dev.initialPm" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            </div>
          </div>
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-300">
            <SubTitle title="采购负责人" en="Procurement" color="orange" />
            <div className="space-y-1">
              <InfoItem label="前端采购人员" value={formData.responsibles.procurement.frontend} fieldPath="responsibles.procurement.frontend" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="后端采购人员" value={formData.responsibles.procurement.backend} fieldPath="responsibles.procurement.backend" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="初始采购人员" value={formData.responsibles.procurement.initial} fieldPath="responsibles.procurement.initial" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            </div>
          </div>
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-300">
            <SubTitle title="运营负责人" en="Ops" color="green" />
            <div className="space-y-1">
              <InfoItem label="运营人员" value={formData.responsibles.ops.staff} fieldPath="responsibles.ops.staff" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="初始运营人员" value={formData.responsibles.ops.initial} fieldPath="responsibles.ops.initial" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            </div>
          </div>
          <div className="bg-slate-50/30 dark:bg-gray-800/40 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-300">
            <SubTitle title="其他支持" en="Others" color="purple" />
            <div className="space-y-1">
              <InfoItem label="PMC人员" value={formData.responsibles.others.pmc} fieldPath="responsibles.others.pmc" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
              <InfoItem label="仓储人员" value={formData.responsibles.others.warehouse} fieldPath="responsibles.others.warehouse" isEditing={isEditing} updateField={updateField} setIsEditing={setIsEditing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiblesSection;
