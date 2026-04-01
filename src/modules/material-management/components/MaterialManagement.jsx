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
    <div className="flex h-screen w-full bg-[#f0f2f5] dark:bg-gray-900 overflow-hidden text-[12px] font-sans antialiased text-gray-800 dark:text-gray-200 transition-colors duration-300">

      {/* 2. 主界面 */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 核心筛选与内容区 */}
        <main className="flex-1 overflow-hidden flex flex-col">

          {/* 筛选面板 */}
          <div className="bg-white dark:bg-gray-800 m-[8px] mb-0 p-3 rounded-t border-x border-t dark:border-gray-700 shadow-sm space-y-3 shrink-0 transition-colors duration-300">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
              <div className="flex bg-gray-100 dark:bg-gray-700 p-[2px] rounded-sm mr-2 transition-colors duration-300">
                <button className="bg-white dark:bg-gray-800 shadow-sm px-3 py-1 text-blue-600 dark:text-blue-400 rounded-sm font-medium border border-gray-100 dark:border-gray-600 transition-colors duration-300">普通产品</button>
                <button className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">组合产品</button>
                <button className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">BTB产品</button>
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

            <div className="flex items-center justify-between border-t border-dashed dark:border-gray-600 pt-3 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <div className="flex items-center border dark:border-gray-600 rounded focus-within:border-blue-500 dark:focus-within:border-blue-400 h-[28px] overflow-hidden transition-colors duration-300">
                  <span className="bg-gray-50 dark:bg-gray-700 px-3 py-1 text-gray-500 dark:text-gray-400 border-r dark:border-gray-600 text-[11px] transition-colors duration-300">物料编码</span>
                  <input className="bg-white dark:bg-gray-800 px-2 py-1 outline-none w-36 text-[11px] dark:text-gray-200 transition-colors duration-300" placeholder="请输入内容" />
                  <div className="px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center h-full transition-colors duration-300"><Search size={12} className="text-gray-400" /></div>
                </div>
                <button className="border dark:border-gray-600 h-[28px] px-3 rounded flex items-center space-x-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-gray-700 dark:text-gray-300">
                   <RotateCcw size={12} className="text-gray-500 dark:text-gray-400" /><span>重置</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#1890ff] dark:bg-blue-600 text-white px-4 h-[28px] rounded flex items-center hover:bg-blue-600 dark:hover:bg-blue-500 shadow-sm"
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
          <div className="bg-white dark:bg-gray-800 mx-[8px] flex-1 border-x border-b dark:border-gray-700 shadow-sm overflow-hidden flex flex-col transition-colors duration-300">
            <div className="flex justify-end bg-white/95 dark:bg-gray-800/95 px-3 py-1.5 space-x-3 border-b dark:border-gray-700 text-gray-400 transition-colors duration-300">
               <RotateCcw size={14} className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" />
               <Download size={14} className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" />
               <Settings size={14} className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" />
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse min-w-[2200px]">
                <thead className="bg-[#fafafa] dark:bg-gray-700 border-b dark:border-gray-600 text-gray-500 dark:text-gray-400 text-[11px] sticky top-0 z-10 transition-colors duration-300">
                  <tr>
                    <th className="p-2.5 w-10 border-r dark:border-gray-600 text-center"><input type="checkbox" className="dark:accent-blue-500" /></th>
                    <th className="p-2.5 w-10 text-center border-r dark:border-gray-600 font-medium">#</th>
                    <th className="p-2.5 w-14 border-r dark:border-gray-600 text-center font-medium">缩略图</th>
                    <th className="p-2.5 w-24 border-r dark:border-gray-600 font-medium">SPU</th>
                    <th className="p-2.5 w-24 border-r dark:border-gray-600 font-medium">物料编码</th>
                    <th className="p-2.5 w-40 border-r dark:border-gray-600 font-medium">提案编号</th>
                    <th className="p-2.5 w-32 border-r dark:border-gray-600 font-medium">运营大类</th>
                    <th className="p-2.5 w-32 border-r dark:border-gray-600 font-medium">产品名称</th>
                    <th className="p-2.5 w-20 border-r dark:border-gray-600 text-center font-medium">物料状态</th>
                    <th className="p-2.5 w-32 border-r dark:border-gray-600 font-medium">款式</th>
                    <th className="p-2.5 w-20 border-r dark:border-gray-600 font-medium">主材料</th>
                    <th className="p-2.5 w-28 border-r dark:border-gray-600 font-medium">适用品牌或对象</th>
                    <th className="p-2.5 w-28 border-r dark:border-gray-600 font-medium">型号</th>
                    <th className="p-2.5 w-28 border-r dark:border-gray-600 font-medium">公司品牌</th>
                    <th className="p-3 w-[120px] text-center font-medium text-gray-600 dark:text-gray-300 sticky right-0 bg-[#fafafa] dark:bg-gray-700 z-20 shadow-[-3px_0_5px_rgba(0,0,0,0.04)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-200 dark:before:bg-gray-600 transition-colors duration-300">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {mockTableData.map((row, index) => (
                    <tr key={row.id} className="border-b dark:border-gray-700 hover:bg-[#e6f7ff]/40 dark:hover:bg-blue-900/20 transition-colors relative hover:z-20">
                      <td className="p-2 border-r dark:border-gray-600 text-center"><input type="checkbox" className="dark:accent-blue-500" /></td>
                      <td className="p-2 border-r dark:border-gray-600 text-center text-gray-400">{index + 1}</td>
                      <td className="p-2 border-r dark:border-gray-600">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-sm flex items-center justify-center text-[8px] text-gray-400 border border-dashed dark:border-gray-600 mx-auto transition-colors duration-300">无图</div>
                      </td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400">{row.spu}</td>
                      <td className="p-2 border-r dark:border-gray-600">{row.code}</td>
                      <td className="p-2 border-r text-[#1890ff] dark:text-blue-400 hover:underline cursor-pointer">{row.prop}</td>
                      <td className="p-2 border-r dark:border-gray-600">{row.cat}</td>
                      <td className="p-2 border-r dark:border-gray-600 font-medium">{row.name}</td>
                      <td className="p-2 border-r dark:border-gray-600 text-center">
                        <span className="bg-[#52c41a] dark:bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-[10px]">正常</span>
                      </td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400 truncate">{row.style}</td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400">{row.material}</td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400">{row.brand}</td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400">{row.model}</td>
                      <td className="p-2 border-r dark:border-gray-600 text-gray-500 dark:text-gray-400">MoKo</td>
                      
                      <td className="p-2 sticky right-0 bg-white dark:bg-gray-800 group-hover/row:bg-[#f5faff] dark:group-hover/row:bg-gray-700 z-10 transition-colors shadow-[-3px_0_5px_rgba(0,0,0,0.02)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-200 dark:before:bg-gray-600">
                        <div className="flex items-center justify-center space-x-1.5 text-[12px]">
                          
                          <span 
                            className="text-[#1890ff] dark:text-blue-400 cursor-pointer hover:font-semibold transition-all"
                            onClick={() => {
                              setSelectedMaterial(row);
                              setIsDetailOpen(true);
                            }}
                          >
                            详情
                          </span>
                          
                          <span className="text-gray-300 dark:text-gray-600 font-light select-none pb-[2px]">|</span>
                          
                          <div className="relative group/dropdown cursor-pointer">
                            <div className="flex items-center text-[#1890ff] dark:text-blue-400 hover:font-semibold transition-all">
                              <span>操作</span>
                              <ChevronDown 
                                size={12} 
                                className="ml-0.5 transition-transform duration-200 group-hover/dropdown:rotate-180" 
                              />
                            </div>

                            <div className="absolute right-[-10px] top-full mt-1.5 w-[140px] bg-white dark:bg-gray-800 rounded shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 py-1.5 hidden group-hover/dropdown:block z-50 transition-colors duration-300">
                              
                              <div className="absolute -top-[5px] right-4 w-2.5 h-2.5 bg-white dark:bg-gray-800 border-t border-l border-gray-100 dark:border-gray-700 rotate-45 z-0"></div>
                              
                              <div className="relative z-10 bg-white dark:bg-gray-800 flex flex-col text-left text-[12px] transition-colors duration-300">
                                <div className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-[#e6f7ff] dark:hover:bg-blue-900/30 hover:text-[#1890ff] dark:hover:text-blue-400 transition-colors">编辑采购信息</div>
                                <div className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-[#e6f7ff] dark:hover:bg-blue-900/30 hover:text-[#1890ff] dark:hover:text-blue-400 transition-colors">编辑一般属性</div>
                                <div className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-[#e6f7ff] dark:hover:bg-blue-900/30 hover:text-[#1890ff] dark:hover:text-blue-400 transition-colors">编辑特殊属性</div>
                                <div className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-[#e6f7ff] dark:hover:bg-blue-900/30 hover:text-[#1890ff] dark:hover:text-blue-400 transition-colors">编辑卖点设计信息</div>
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
            <div className="bg-white dark:bg-gray-800 p-2 border-t dark:border-gray-700 flex justify-end items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
               <div className="flex items-center space-x-1 mr-4">
                 <span className="px-2 py-0.5 border dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">&lt;</span>
                 <span className="px-2 py-0.5 bg-blue-600 dark:bg-blue-700 text-white rounded">1</span>
                 <span className="px-2 py-0.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">2</span>
                 <span className="px-2 py-0.5 cursor-pointer">...</span>
                 <span className="px-2 py-0.5 border dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">&gt;</span>
               </div>
               <div className="flex items-center border dark:border-gray-600 rounded px-2 py-0.5 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
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
      ? 'bg-[#e6f7ff] dark:bg-blue-900/30 text-[#1890ff] dark:text-blue-400 border-t-[2px] border-[#1890ff] dark:border-blue-400 font-medium' 
      : 'bg-transparent text-gray-400 hover:text-white'
  }`}>
    {label} <span className="ml-2 opacity-30">×</span>
  </div>
);

const FilterSelect = ({ placeholder, label, icon }) => (
  <div className="flex items-center border dark:border-gray-600 rounded h-[28px] px-2 text-gray-400 dark:text-gray-500 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer bg-white dark:bg-gray-800 transition-all min-w-[90px] duration-300">
    {label && <span className="text-gray-700 dark:text-gray-300 mr-2 border-r dark:border-gray-600 pr-2 transition-colors duration-300">{label}</span>}
    {icon && <span className="mr-1">{icon}</span>}
    <span className="truncate text-[11px]">{placeholder}</span>
    <ChevronDown size={12} className="ml-auto" />
  </div>
);

const ActionBtn = ({ label, hasArrow }) => (
  <button className="border dark:border-gray-600 h-[28px] px-3 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center">
    {label} {hasArrow && <ChevronDown size={12} className="ml-1" />}
  </button>
);

export default MaterialManagement;