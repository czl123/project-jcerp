import React, { useState } from 'react';
import {
  Box, Sun, Plus, Search, RotateCcw, Download, Calendar, Bell, Settings, ChevronDown
} from 'lucide-react';
import NewMaterialModal from './NewMaterialModal';
import MaterialDetailModal from './MaterialDetailModal';
import { useAppContext } from '../../../store/context';

const MaterialManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const { materials } = useAppContext();
  
  // 使用 Context 中的数据
  const mockTableData = materials || [
    { id: 1, spu: "TC1837", code: "TC260588", prop: "S20190053-220712", cat: "平板电脑保...", name: "平板皮套", style: "电压款-三折...", material: "TPU", brand: "苹果", model: "iPad 10th 2" },
    { id: 2, spu: "SW0078", code: "SW260149", prop: "TX-202603102", cat: "智能手表", name: "手表表带", style: "三珠款+拆表...", material: "不锈钢", brand: "Fitbit", model: "Versa 4" },
    { id: 3, spu: "BA0754", code: "BA260084", prop: "TX-202603118", cat: "箱包", name: "手机绳", style: "易拉扣款配...", material: "金属+塑料", brand: "-", model: "-" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-[12px] font-sans antialiased text-gray-800">

      {/* 2. 主界面 */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 核心筛选与内容区 */}
        <main className="flex-1 overflow-hidden flex flex-col">

          {/* 筛选面板 */}
          <div className="bg-white m-[8px] mb-0 p-3 rounded-t border-x border-t shadow-sm space-y-3 shrink-0">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
              <div className="flex bg-gray-100 p-[2px] rounded-sm mr-2">
                <button className="bg-white shadow-sm px-3 py-1 text-blue-600 rounded-sm font-medium border border-gray-100">普通产品</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">组合产品</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">BTB产品</button>
              </div>

              <FilterSelect label="创建时间" icon={<Calendar size={12}/>} placeholder="开始时间 至 结束时间" />
              <FilterSelect placeholder="公司品牌" />
              <FilterSelect placeholder="物料状态" />
              <FilterSelect placeholder="是否登记大货样" />
              <FilterSelect placeholder="同步状态" />
              <FilterSelect placeholder="产品经理" />
              <FilterSelect placeholder="运营人员" />
              <FilterSelect placeholder="采购人员" />
            </div>

            <div className="flex items-center justify-between border-t border-dashed pt-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center border rounded focus-within:border-blue-500 h-[28px] overflow-hidden">
                  <span className="bg-gray-50 px-3 py-1 text-gray-500 border-r text-[11px]">物料编码</span>
                  <input className="px-2 py-1 outline-none w-36 text-[11px]" placeholder="请输入内容" />
                  <div className="px-2 cursor-pointer hover:bg-gray-100 flex items-center h-full"><Search size={12} className="text-gray-400" /></div>
                </div>
                <button className="border h-[28px] px-3 rounded flex items-center space-x-1 hover:bg-gray-50 transition-colors">
                   <RotateCcw size={12} className="text-gray-500" /><span>重置</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#1890ff] text-white px-4 h-[28px] rounded flex items-center hover:bg-blue-600 shadow-sm"
                >
                  <Plus size={14} className="mr-1"/> 新建配件
                </button>
                <ActionBtn label="分配负责人" />
                <ActionBtn label="同步ERP" />
                <ActionBtn label="批量编辑" hasArrow />
                <ActionBtn label="批量操作" hasArrow />
              </div>
            </div>
          </div>

          {/* 表格面板 */}
          <div className="bg-white mx-[8px] flex-1 border-x border-b shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-end bg-white/95 px-3 py-1.5 space-x-3 border-b text-gray-400">
               <RotateCcw size={14} className="cursor-pointer hover:text-blue-500" />
               <Download size={14} className="cursor-pointer hover:text-blue-500" />
               <Settings size={14} className="cursor-pointer hover:text-blue-500" />
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse min-w-[2200px]">
                <thead className="bg-[#fafafa] border-b text-gray-500 text-[11px] sticky top-0 z-10">
                  <tr>
                    <th className="p-2.5 w-10 border-r text-center"><input type="checkbox" /></th>
                    <th className="p-2.5 w-10 text-center border-r font-medium">#</th>
                    <th className="p-2.5 w-14 border-r text-center font-medium">缩略图</th>
                    <th className="p-2.5 w-24 border-r font-medium">SPU</th>
                    <th className="p-2.5 w-24 border-r font-medium">物料编码</th>
                    <th className="p-2.5 w-40 border-r font-medium">提案编号</th>
                    <th className="p-2.5 w-32 border-r font-medium">运营大类</th>
                    <th className="p-2.5 w-32 border-r font-medium">产品名称</th>
                    <th className="p-2.5 w-20 border-r text-center font-medium">物料状态</th>
                    <th className="p-2.5 w-32 border-r font-medium">款式</th>
                    <th className="p-2.5 w-20 border-r font-medium">主材料</th>
                    <th className="p-2.5 w-28 border-r font-medium">适用品牌或对象</th>
                    <th className="p-2.5 w-28 border-r font-medium">型号</th>
                    <th className="p-2.5 w-28 border-r font-medium">公司品牌</th>
                    {/* 优化点 1：表头居中对齐，并使用统一的灰色调，避免深蓝色突兀 */}
                    <th className="p-3 w-[120px] text-center font-medium text-gray-600 sticky right-0 bg-[#fafafa] z-20 shadow-[-3px_0_5px_rgba(0,0,0,0.04)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-200">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-gray-700">
                  {mockTableData.map((row, index) => (
                    // 关键1：给 tr 加上 relative 和 hover:z-20，防止下拉菜单被下一行遮挡
                    <tr key={row.id} className="border-b hover:bg-[#e6f7ff]/40 transition-colors relative hover:z-20">
                      <td className="p-2 border-r text-center"><input type="checkbox" /></td>
                      <td className="p-2 border-r text-center text-gray-400">{index + 1}</td>
                      <td className="p-2 border-r">
                          <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center text-[8px] text-gray-400 border border-dashed mx-auto">无图</div>
                      </td>
                      <td className="p-2 border-r text-gray-500">{row.spu}</td>
                      <td className="p-2 border-r">{row.code}</td>
                      <td className="p-2 border-r text-[#1890ff] hover:underline cursor-pointer">{row.prop}</td>
                      <td className="p-2 border-r">{row.cat}</td>
                      <td className="p-2 border-r font-medium">{row.name}</td>
                      <td className="p-2 border-r text-center">
                        <span className="bg-[#52c41a] text-white px-1.5 py-0.5 rounded-sm text-[10px]">正常</span>
                      </td>
                      <td className="p-2 border-r text-gray-500 truncate">{row.style}</td>
                      <td className="p-2 border-r text-gray-500">{row.material}</td>
                      <td className="p-2 border-r text-gray-500">{row.brand}</td>
                      <td className="p-2 border-r text-gray-500">{row.model}</td>
                      <td className="p-2 border-r text-gray-500">MoKo</td>
                      
                      {/* 🎯 完全还原的“操作”列 */}
                      <td className="p-2 sticky right-0 bg-white group-hover/row:bg-[#f5faff] z-10 transition-colors shadow-[-3px_0_5px_rgba(0,0,0,0.02)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-200">
                        <div className="flex items-center justify-center space-x-1.5 text-[12px]">
                          
                          {/* 1. 详情链接 */}
                          <span 
                            className="text-[#1890ff] cursor-pointer hover:font-semibold transition-all"
                            onClick={() => {
                              setSelectedMaterial(row);
                              setIsDetailOpen(true);
                            }}
                          >
                            详情
                          </span>
                          
                          {/* 2. 浅色竖线分隔符 */}
                          <span className="text-gray-300 font-light select-none pb-[2px]">|</span>
                          
                          {/* 3. 操作下拉组件 */}
                          <div className="relative group/dropdown cursor-pointer">
                            {/* 触发文字与箭头 */}
                            <div className="flex items-center text-[#1890ff] hover:font-semibold transition-all">
                              <span>操作</span>
                              <ChevronDown 
                                size={12} 
                                // 鼠标移入时箭头翻转 180 度
                                className="ml-0.5 transition-transform duration-200 group-hover/dropdown:rotate-180" 
                              />
                            </div>

                            {/* 悬浮下拉菜单 (默认隐藏，hover时显示) */}
                            <div className="absolute right-[-10px] top-full mt-1.5 w-[140px] bg-white rounded shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-gray-100 py-1.5 hidden group-hover/dropdown:block z-50">
                              
                              {/* 顶部指向性小三角 */}
                              <div className="absolute -top-[5px] right-4 w-2.5 h-2.5 bg-white border-t border-l border-gray-100 rotate-45 z-0"></div>
                              
                              {/* 菜单内容区 */}
                              <div className="relative z-10 bg-white flex flex-col text-left text-[12px]">
                                <div className="px-3 py-1.5 text-gray-700 hover:bg-[#e6f7ff] hover:text-[#1890ff] transition-colors">编辑采购信息</div>
                                <div className="px-3 py-1.5 text-gray-700 hover:bg-[#e6f7ff] hover:text-[#1890ff] transition-colors">编辑一般属性</div>
                                <div className="px-3 py-1.5 text-gray-700 hover:bg-[#e6f7ff] hover:text-[#1890ff] transition-colors">编辑特殊属性</div>
                                <div className="px-3 py-1.5 text-gray-700 hover:bg-[#e6f7ff] hover:text-[#1890ff] transition-colors">编辑卖点设计信息</div>
                              </div>

                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页器 */}
            <div className="bg-white p-2 border-t flex justify-end items-center space-x-2 text-xs text-gray-500">
               <div className="flex items-center space-x-1 mr-4">
                 <span className="px-2 py-0.5 border rounded cursor-pointer hover:bg-gray-50">&lt;</span>
                 <span className="px-2 py-0.5 bg-blue-600 text-white rounded">1</span>
                 <span className="px-2 py-0.5 cursor-pointer hover:text-blue-600">2</span>
                 <span className="px-2 py-0.5 cursor-pointer">...</span>
                 <span className="px-2 py-0.5 border rounded cursor-pointer hover:bg-gray-50">&gt;</span>
               </div>
               <div className="flex items-center border rounded px-2 py-0.5 cursor-pointer hover:border-blue-400">
                 <span>20条/页</span><ChevronDown size={12} className="ml-1" />
               </div>
               <span>共 67045 条记录</span>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && <NewMaterialModal onClose={() => setIsModalOpen(false)} />}
      {isDetailOpen && (
        <MaterialDetailModal 
          material={selectedMaterial} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

// --- 子组件 ---

const TabItem = ({ label, active }) => (
  <div className={`px-4 flex items-center text-[11px] rounded-t-[3px] h-full cursor-pointer transition-colors ${
    active 
      ? 'bg-[#e6f7ff] text-[#1890ff] border-t-[2px] border-[#1890ff] font-medium' 
      : 'bg-transparent text-gray-400 hover:text-white'
  }`}>
    {label} <span className="ml-2 opacity-30">×</span>
  </div>
);

const FilterSelect = ({ placeholder, label, icon }) => (
  <div className="flex items-center border rounded h-[28px] px-2 text-gray-400 hover:border-blue-400 cursor-pointer bg-white transition-all min-w-[90px]">
    {label && <span className="text-gray-700 mr-2 border-r pr-2">{label}</span>}
    {icon && <span className="mr-1">{icon}</span>}
    <span className="truncate text-[11px]">{placeholder}</span>
    <ChevronDown size={12} className="ml-auto" />
  </div>
);

const ActionBtn = ({ label, hasArrow }) => (
  <button className="border h-[28px] px-3 rounded text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center">
    {label} {hasArrow && <ChevronDown size={12} className="ml-1" />}
  </button>
);

export default MaterialManagement;