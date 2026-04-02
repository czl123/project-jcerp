import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Copy, Trash2, Edit3, ArrowUpDown, Filter, 
  ShieldCheck, Zap, Info, FileSearch, Image as ImageIcon, Link as LinkIcon 
} from 'lucide-react';

const ProductInformationSupplementList = ({ 
  samples, 
  setActiveTab, 
  setLayoutMode: setGlobalLayoutMode, 
  onCopy, 
  onDelete,
  selectedIds = [],
  onToggleSelect,
  onSelectAll
}) => {
  const [viewMode, setViewMode] = useState('全部字段视图');

  // 1. 定义大类分组基础配置
  const allGroups = [
    { id: 'base', label: '样品信息', color: 'bg-slate-100 text-slate-600' },
    { id: 'basic', label: '基本属性', color: 'bg-blue-50 text-blue-700' },
    { id: 'specs', label: '规格参数', color: 'bg-purple-50 text-purple-700' },
    { id: 'patent', label: '知识产权信息', color: 'bg-emerald-50 text-emerald-700' },
    { id: 'selling_design', label: '营销卖点设计', color: 'bg-amber-50 text-amber-700' },
    { id: 'selling_core', label: '营销核心卖点', color: 'bg-amber-50 text-amber-700' },
    { id: 'warehouse', label: '仓储识别标识', color: 'bg-indigo-50 text-indigo-700' },
    { id: 'quality_req', label: '质量与生产要求', color: 'bg-rose-50 text-rose-700' },
  ];

  // 2. 定义所有字段及其属性 (isRequired 严格按照需求)
  const allColumns = [
    { group: 'base', key: 'image', label: '样品图片', width: 'w-[80px]', sticky: true, offset: '48px', type: 'image' },
    { group: 'base', key: 'id', label: '样品编号', width: 'w-[140px]', sticky: true, offset: '128px', type: 'mono' },
    { group: 'base', key: 'purchaser', label: '采购员', width: 'w-[100px]', type: 'purchaser' },
    { group: 'base', key: 'status', label: '当前状态', width: 'w-[100px]', type: 'status' },
    
    { group: 'basic', key: 'brand', label: '公司品牌', width: 'w-[120px]', isRequired: true },
    { group: 'basic', key: 'pattern', label: '图案', width: 'w-[100px]', isRequired: true },
    { group: 'basic', key: 'color', label: '颜色', width: 'w-[80px]', isRequired: true },
    { group: 'basic', key: 'hasBattery', label: '是否带电', width: 'w-[80px]', isRequired: true },
    { group: 'basic', key: 'isCE', label: '是否CE类', width: 'w-[80px]', isRequired: true },
    { group: 'basic', key: 'spec', label: '规格', width: 'w-[80px]', isRequired: true },
    { group: 'basic', key: 'packaging', label: '包装方式', width: 'w-[100px]', isRequired: true },
    { group: 'basic', key: 'packQty', label: '包装数量', width: 'w-[80px]', isRequired: true },
    { group: 'basic', key: 'colorCode', label: '色号', width: 'w-[80px]', isRequired: false },
    { group: 'basic', key: 'category', label: '二级类目', width: 'w-[120px]', isRequired: false },
    { group: 'basic', key: 'logoReplace', label: 'Logo可替换', width: 'w-[100px]', isRequired: true },
    { group: 'basic', key: 'suggestLogistics', label: '建议物流方式', width: 'w-[110px]', isRequired: true },
    { group: 'basic', key: 'firstLogistics', label: '首单物流方式', width: 'w-[110px]', isRequired: true },
    { group: 'basic', key: 'models', label: '适用机型', width: 'w-[150px]', isRequired: false },
    { group: 'basic', key: 'material', label: '材质明细', width: 'w-[180px]', isRequired: true },
    { group: 'basic', key: 'isMulti', label: '是否一品多包', width: 'w-[100px]', isRequired: false },
    { group: 'basic', key: 'pkgQty', label: '包裹数量', width: 'w-[80px]', isRequired: false },
    
    { group: 'specs', key: 'size', label: '尺码', width: 'w-[80px]', isRequired: true },
    { group: 'specs', key: 'diameter', label: '直径', width: 'w-[80px]', isRequired: true },
    { group: 'specs', key: 'capacity', label: '容量', width: 'w-[80px]', isRequired: true },
    { group: 'specs', key: 'itemDim', label: '单品尺寸', width: 'w-[150px]', isRequired: true, type: 'mono' },
    { group: 'specs', key: 'itemWeight', label: '单品重量', width: 'w-[90px]', isRequired: true, type: 'mono' },
    { group: 'specs', key: 'packDim', label: '包装尺寸', width: 'w-[150px]', isRequired: true, type: 'mono' },
    { group: 'specs', key: 'packWeight', label: '包装重量', width: 'w-[90px]', isRequired: true, type: 'mono' },
    
    { group: 'patent', key: 'patentDesc', label: '专利说明', width: 'w-[150px]', isRequired: false },
    { group: 'patent', key: 'patentCert', label: '专利证书', width: 'w-[100px]', isRequired: false, type: 'button' },
    { group: 'patent', key: 'patentDate', label: '下证日期', width: 'w-[110px]', isRequired: false, type: 'mono' },
    { group: 'patent', key: 'copyDesc', label: '版权说明', width: 'w-[150px]', isRequired: false },
    
    { group: 'selling_design', key: 'operator', label: '运营负责人', width: 'w-[100px]', isRequired: true },
    { group: 'selling_design', key: 'copyLevel', label: '文案等级', width: 'w-[80px]', isRequired: true },
    { group: 'selling_design', key: 'copyReq', label: '文案要求', width: 'w-[200px]', isRequired: true },
    { group: 'selling_design', key: 'imgLevel', label: '图片等级', width: 'w-[80px]', isRequired: true },
    { group: 'selling_design', key: 'imgReq', label: '图片要求', width: 'w-[200px]', isRequired: true },
    { group: 'selling_design', key: 'refLink', label: '参考链接', width: 'w-[100px]', isRequired: true, type: 'link' },
    { group: 'selling_design', key: 'sellingPoints', label: '开发卖点', width: 'w-[200px]', isRequired: true },
    { group: 'selling_design', key: 'refImg', label: '参考图片', width: 'w-[100px]', isRequired: true, type: 'image_btn' },

    { group: 'selling_core', key: 'points', label: '产品要点', width: 'w-[150px]', isRequired: true },
    { group: 'warehouse', key: 'shortDesc', label: '入库标签短描述', width: 'w-[150px]', isRequired: true },
    { group: 'quality_req', key: 'quality', label: '质量要求点', width: 'w-[150px]', isRequired: true },
  ];

  // 3. 根据视图过滤
  const displayColumns = (() => {
    if (viewMode === '必填字段视图') return allColumns.filter(c => c.isRequired || c.group === 'base');
    if (viewMode === '唯一字段视图') {
      const keys = [
        'brand', 'pattern', 'color', 'hasBattery', 'isCE', 'spec', 'packaging', 
        'packQty', 'colorCode', 'category', 'suggestLogistics', 'firstLogistics', 
        'models', 'material', 'size', 'diameter', 'capacity', 'itemDim', 
        'itemWeight', 'packDim', 'packWeight'
      ];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    if (viewMode === '基础属性视图') {
      const keys = ['brand', 'pattern', 'color', 'hasBattery', 'isCE', 'spec', 'packaging', 'packQty', 'colorCode', 'category', 'logoReplace', 'suggestLogistics', 'firstLogistics', 'models', 'material'];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    if (viewMode === '规格参数视图') {
      const keys = ['size', 'diameter', 'capacity', 'itemDim', 'itemWeight', 'packDim', 'packWeight'];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    if (viewMode === '知识产权视图') {
      const keys = ['patentDesc', 'patentCert', 'patentDate', 'copyDesc'];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    if (viewMode === '营销卖点视图') {
      const keys = ['operator', 'copyLevel', 'copyReq', 'imgLevel', 'imgReq', 'refLink', 'sellingPoints', 'refImg'];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    if (viewMode === '其他视图') {
      const keys = ['shortDesc', 'points', 'quality'];
      return allColumns.filter(c => c.group === 'base' || keys.includes(c.key));
    }
    return allColumns;
  })();

  const currentGroups = allGroups.map(group => {
    const groupCols = displayColumns.filter(c => c.group === group.id);
    return { ...group, count: groupCols.length };
  }).filter(g => g.count > 0);

  const handleEdit = (id) => {
    setActiveTab(id);
    setGlobalLayoutMode('edit');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-950 animate-in fade-in duration-500">
      
      {/* 顶部工具栏 */}
      <div className="px-6 py-2.5 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between bg-slate-50/30 dark:bg-gray-900 shrink-0">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2 font-bold text-slate-500 text-[11px]">
              <Filter size={14} />
              <span>视图设置:</span>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-0.5 text-blue-600 outline-none shadow-sm"
              >
                <option>全部字段视图</option>
                <option>必填字段视图</option>
                <option>唯一字段视图</option>
                <option>基础属性视图</option>
                <option>规格参数视图</option>
                <option>知识产权视图</option>
                <option>营销卖点视图</option>
                <option>其他视图</option>
              </select>
           </div>
        </div>
        <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-4">
           <span>Displaying {displayColumns.length} columns</span>
        </div>
      </div>

      {/* 滚动容器 */}
      <div className="flex-1 overflow-auto no-scrollbar">
        {/* 使用 min-w-full 实现自适应：字段少时撑满，字段多时横滚 */}
        <table className="border-separate border-spacing-0 text-left min-w-full">
          <thead className="sticky top-0 z-30">
            {/* 分组表头 */}
            <tr className="bg-slate-50 dark:bg-gray-800">
              <th rowSpan={2} className="px-6 py-3 w-12 border-b border-slate-200 dark:border-gray-700 sticky left-0 z-50 bg-slate-50 dark:bg-gray-800 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0]">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300" 
                  checked={selectedIds?.length === samples.length && samples.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              {currentGroups.map(group => (
                <th 
                  key={group.id} 
                  colSpan={group.count} 
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider border-b border-r border-slate-200 dark:border-gray-700 text-center ${group.color} ${
                    group.id === 'base' ? 'sticky left-12 z-50 shadow-[1px_0_0_0_#e2e8f0]' : ''
                  }`}
                  style={group.id === 'base' ? { left: '48px' } : {}}
                >
                  {group.label}
                </th>
              ))}
              <th rowSpan={2} className="px-6 py-3 w-[120px] border-b border-slate-200 dark:border-gray-700 sticky right-0 z-50 bg-slate-50 dark:bg-gray-800 shadow-[-1px_0_0_0_#e2e8f0] text-center text-[11px] font-extrabold text-slate-400">操作</th>
            </tr>
            
            {/* 字段表头 */}
            <tr className="bg-white dark:bg-gray-900">
              {displayColumns.map(col => (
                <th 
                  key={col.key} 
                  className={`px-4 py-3 text-[11px] font-extrabold border-b border-r border-slate-100 dark:border-gray-800 uppercase tracking-wider text-center ${col.width} ${
                    col.sticky ? 'sticky z-40 bg-white dark:bg-gray-900 shadow-[1px_0_0_0_#f1f5f9]' : ''
                  } ${
                    col.group === 'basic' ? 'text-blue-600 bg-blue-50/10' : 
                    col.group === 'specs' ? 'text-purple-600 bg-purple-50/10' :
                    (col.group === 'selling_design' || col.group === 'selling_core') ? 'text-amber-600 bg-amber-50/10' : 
                    col.group === 'patent' ? 'text-emerald-600 bg-emerald-50/10' : 
                    col.group === 'warehouse' ? 'text-indigo-600 bg-indigo-50/10' :
                    col.group === 'quality_req' ? 'text-rose-600 bg-rose-50/10' : 'text-slate-500'
                  }`}
                  style={col.sticky ? { left: col.offset } : {}}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>{col.label}</span>
                    <ArrowUpDown size={10} className="text-slate-300 opacity-0 group-hover:opacity-100" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
            {samples.map((sample) => (
              <tr key={sample.id} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/5 transition-colors group">
                <td className="px-6 py-4 sticky left-0 z-20 bg-white dark:bg-gray-950 group-hover:bg-blue-50/50 transition-colors border-b border-r border-slate-100 dark:border-gray-800 text-center shadow-[1px_0_0_0_#f1f5f9]">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300" 
                    checked={selectedIds?.includes(sample.id)}
                    onChange={() => onToggleSelect(sample.id)}
                  />
                </td>

                {displayColumns.map(col => (
                  <DynamicCell key={col.key} col={col} sample={sample} onEdit={handleEdit} />
                ))}

                <td className="px-6 py-4 text-right sticky right-0 z-20 bg-white dark:bg-gray-950 group-hover:bg-blue-50/50 transition-colors shadow-[-1px_0_0_0_#f1f5f9] border-b border-slate-100 dark:border-gray-800">
                  <div className="flex items-center justify-end space-x-4">
                    <button 
                      onClick={() => handleEdit(sample.id)} 
                      className="text-emerald-600 dark:text-emerald-400 font-black text-[11px] transition-all hover:text-emerald-500 hover:scale-110 active:scale-95"
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => onCopy(sample)} 
                      className="text-blue-600 dark:text-blue-400 font-black text-[11px] transition-all hover:text-blue-500 hover:scale-110 active:scale-95"
                    >
                      复制
                    </button>
                    <button 
                      onClick={() => onDelete(sample.id)} 
                      className="text-red-500 dark:text-red-400 font-black text-[11px] transition-all hover:text-red-600 hover:scale-110 active:scale-95"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 子组件：动态单元格渲染器 ---
const DynamicCell = ({ col, sample, onEdit }) => {
  const commonClasses = `px-4 py-4 border-b border-r border-slate-50 dark:border-gray-800 text-center ${
    col.sticky ? 'sticky z-20 bg-white dark:bg-gray-950 shadow-[1px_0_0_0_#f1f5f9]' : ''
  }`;
  const style = col.sticky ? { left: col.offset } : {};

  const renderContent = () => {
    switch (col.type) {
      case 'image':
        return (
          <div className="w-10 h-10 mx-auto bg-slate-50 dark:bg-gray-800 rounded border border-slate-200 overflow-hidden flex items-center justify-center">
            <img src="https://img.alicdn.com/imgextra/i4/2206623910383/O1CN01r1Y3X21T8N1N1N1N1_!!2206623910383.jpg" className="max-w-full max-h-full object-contain" />
          </div>
        );
      case 'status':
        return (
          <div className="flex justify-center">
            {sample.status === 'completed' ? (
              <div className="flex items-center space-x-1.5 text-blue-600 font-black">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span className="text-[10px] uppercase">待编辑</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 text-orange-600 font-black">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                <span className="text-[10px] uppercase">待提交</span>
              </div>
            )}
          </div>
        );
      case 'purchaser':
        return (
          <div className="flex items-center justify-center space-x-2 text-[12px]">
             <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[9px] font-bold">储</div>
             <span className="text-slate-700 dark:text-gray-200">储张玲</span>
          </div>
        );
      case 'button':
        return <button className="text-emerald-600 font-bold text-[11px]">查看</button>;
      case 'link':
        return <button className="text-blue-500 hover:text-blue-700"><LinkIcon size={14} className="mx-auto" /></button>;
      case 'image_btn':
        return <button className="text-slate-400 hover:text-blue-500"><ImageIcon size={14} className="mx-auto" /></button>;
      default:
        return (
          <span className={`text-[12px] ${col.type === 'mono' ? 'font-mono' : 'font-medium'} text-slate-600 dark:text-gray-400 line-clamp-1`}>
            {sample[col.key] || '-'}
          </span>
        );
    }
  };

  return <td className={commonClasses} style={style}>{renderContent()}</td>;
};

export default ProductInformationSupplementList;
