import React, { useState } from 'react';
import { 
  Search, RotateCcw, Download, Calendar, Settings, ChevronDown, ChevronRight, Plus, HelpCircle
} from 'lucide-react';
// ✨ 引入 ECharts
import ReactECharts from 'echarts-for-react';
import ProductDetailModal from './ProductInformationSupplement';
import { useAppContext } from '../../../store/context';

const ProposalManagement = () => {
  // 管理已展开行的 ID 集合
  const [expandedRowKeys, setExpandedRowKeys] = useState(new Set());
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { isDarkMode } = useAppContext();

  const toggleRow = (id) => {
    setExpandedRowKeys(prevKeys => {
      const nextKeys = new Set(prevKeys);
      if (nextKeys.has(id)) nextKeys.delete(id);
      else nextKeys.add(id);
      return nextKeys;
    });
  };

  // 顶部待办状态数据
  const todoStats = [
    { label: '待设计', count: 3, color: 'sky' }, { label: '任务待发', count: 0, color: 'slate' }, { label: '定稿反馈', count: 1, color: 'emerald' },
    { label: '样品反馈', count: 5, color: 'amber' }, { label: '样品寄送', count: 0, color: 'slate' }, { label: '信息补充', count: 0, color: 'slate' },
    { label: '首单需求待采购', count: 2, color: 'rose' }, { label: '首单需求待询价', count: 0, color: 'slate' }, { label: '首单需求待确认', count: 0, color: 'slate' },
    { label: '定品待审', count: 0, color: 'slate' }, { label: '定品待市场', count: 1, color: 'violet' }, { label: '定品一级审批', count: 0, color: 'slate' },
    { label: '定品二级审批', count: 0, color: 'slate' }
  ];

  // 模拟表格数据
  const mockData = [
    { id: 1, no: 'TA-202603151', source: '需求提案', date: '2026-03-27', status: '待设计', statusCode: 'pending', spu: 'SW1126', platform: 'Amazon', category: '智能手表', name: '手表充电器', style: '圆盘充电底座', material: 'ABS', brand: '佳明', model: 'Fenix 8', pm: '白雪', devMode: '派生品-拓新', grade: 'D', reqTime: '2026-04', infringe: '-' },
    { id: 2, no: 'TA-202603150', source: '需求提案', date: '2026-03-27', status: '拿样中', statusCode: 'sampling', hasAlert: true, spu: 'SW1367', platform: 'Amazon', category: '智能手表', name: '手表表带', style: '回环编织...', material: '尼龙', brand: 'Hume', model: 'Health...', pm: '白雪', devMode: '全新品-定制', grade: 'D', reqTime: '2026-04', infringe: '-' },
    { id: 3, no: 'TA-202603149', source: '推样提案', date: '2026-03-27', status: '拿样中', statusCode: 'sampling', spu: 'SW1366', platform: 'Amazon', category: '智能手表', name: '手表表带', style: '光面硅胶型...', material: '硅胶', brand: '华为', model: 'Band 11', pm: '白雪', devMode: '全新品-现货', grade: 'D', reqTime: '-', infringe: '-' },
    { id: 4, no: 'TA-202603148', source: '开发提案', date: '2026-03-27', status: '设计完成', statusCode: 'done', spu: 'IF0316', platform: 'Amazon', category: '室内家具', name: '梳妆桌', style: '轻奢木纹款', material: '刨花板+碳钢', brand: '-', model: '-', pm: '亚慕凡', devMode: '全新品-定制', grade: 'S', reqTime: '-', infringe: '否' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-gray-900 overflow-hidden text-[12px] text-slate-800 dark:text-gray-200 antialiased font-sans transition-colors duration-300">
      
      {/* 待办状态横幅 */}
      <div className="bg-white dark:bg-gray-800 px-4 py-2 flex items-center space-x-2.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm z-10 border-b border-slate-100 dark:border-gray-700 transition-colors duration-300">
        <span className="text-slate-500 dark:text-gray-400 font-semibold whitespace-nowrap mr-1 tracking-tight">待处理提案 :</span>
        {todoStats.map((item, idx) => {
          const isActive = item.count > 0;
          return (
            <div key={idx} className={`flex items-center border rounded-full px-3.5 py-1.5 cursor-pointer transition-all duration-150 whitespace-nowrap shadow-sm hover:shadow-md ${isActive ? `bg-${item.color}-50 dark:bg-${item.color}-900/30 border-${item.color}-100 dark:border-${item.color}-800 hover:border-${item.color}-200` : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'}`}>
              <span className={isActive ? `text-${item.color}-700 dark:text-${item.color}-400 font-medium` : 'text-slate-600 dark:text-gray-400'}>{item.label}</span>
              <span className={`ml-1.5 font-mono text-[11px] ${isActive ? `text-${item.color}-600 dark:text-${item.color}-500` : 'text-slate-400 dark:text-gray-500'}`}>({item.count})</span>
            </div>
          );
        })}
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* 筛选区域 */}
        <div className="bg-white dark:bg-gray-800 m-3 mb-0 p-4 rounded-t-lg border border-slate-100 dark:border-gray-700 shadow-slate-200/50 shadow-md dark:shadow-none space-y-4 shrink-0 transition-colors duration-300">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-2.5">
            <FilterSelect label="立项日期" icon={<Calendar size={13} className="text-slate-400"/>} placeholder="开始时间 至 结束时间" w="w-56" />
            <FilterSelect placeholder="平台" />
            <FilterSelect placeholder="运营大类" />
            <FilterSelect placeholder="产品经理" />
            <FilterSelect placeholder="当前进度" />
            <FilterSelect placeholder="开发方式" />
            <FilterSelect placeholder="提案等级" />
            <FilterSelect placeholder="新品开发进度" />
            
            <div className="flex items-center border border-slate-200 dark:border-gray-600 rounded h-[30px] overflow-hidden bg-white dark:bg-gray-800 focus-within:border-sky-400 dark:focus-within:border-sky-500 focus-within:shadow-inner transition-all">
              <span className="bg-slate-50 dark:bg-gray-700 px-2 text-slate-500 dark:text-gray-400 border-r border-slate-200 dark:border-gray-600 flex items-center h-full cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-600 transition-colors">
                提案编号 <ChevronDown size={12} className="ml-1"/>
              </span>
              <input className="bg-transparent px-3 w-36 outline-none text-[11px] text-slate-700 dark:text-gray-200 placeholder:text-slate-300 dark:placeholder:text-gray-600" placeholder="请输入内容" />
              <div className="px-2.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center h-full border-l border-slate-100 dark:border-gray-600 transition-colors"><Search size={13} className="text-slate-400" /></div>
            </div>
            
            <button className="border border-slate-200 dark:border-gray-600 h-[30px] px-3.5 rounded text-slate-600 dark:text-gray-400 flex items-center space-x-1.5 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-gray-200 hover:border-slate-300 transition-all shadow-sm">
              <RotateCcw size={13} className="text-slate-400" /><span>重置</span>
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-slate-200 dark:border-gray-700 pt-3.5 transition-colors duration-300">
            <button className="bg-sky-600 dark:bg-sky-700 text-white px-4 h-[30px] rounded flex items-center hover:bg-sky-700 dark:hover:bg-sky-600 shadow-md transition-colors font-medium">
              创建提案
            </button>
            <div className="flex items-center space-x-3.5 text-slate-400 dark:text-gray-500">
              <RotateCcw size={15} className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors" />
              <Download size={15} className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors" />
              <Settings size={15} className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors" />
            </div>
          </div>
        </div>

        {/* 表格区域 */}
        <div className="bg-white dark:bg-gray-800 mx-3 flex-1 border border-t-0 border-slate-100 dark:border-gray-700 rounded-b-lg shadow-slate-200/50 dark:shadow-none shadow-md overflow-hidden flex flex-col relative z-0 transition-colors duration-300">
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1900px] relative z-0">
              <thead className="bg-slate-50 dark:bg-gray-700 border-b border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 text-[11px] sticky top-0 z-20 shadow-slate-100 dark:shadow-none shadow-inner transition-colors duration-300">
                <tr>
                  <th className="p-3 w-10 border-r border-slate-100 dark:border-gray-600 text-center"><input type="checkbox" className="dark:accent-sky-500" /></th>
                  <th className="p-3 w-10 text-center border-r border-slate-100 dark:border-gray-600 font-semibold">#</th>
                  <th className="p-3 w-8 text-center border-r border-slate-100 dark:border-gray-600"></th>
                  <th className="p-3 w-32 border-r border-slate-100 dark:border-gray-600 font-semibold tracking-tight">提案编号</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">提案来源</th>
                  <th className="p-3 w-28 border-r border-slate-100 dark:border-gray-600 font-semibold flex items-center justify-between">立项日期 <ChevronDown size={12}/></th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold text-center">当前进度</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold text-sky-600 dark:text-sky-400">SPU</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">平台</th>
                  <th className="p-3 w-32 border-r border-slate-100 dark:border-gray-600 font-semibold">运营大类</th>
                  <th className="p-3 w-32 border-r border-slate-100 dark:border-gray-600 font-semibold">产品名称</th>
                  <th className="p-3 w-32 border-r border-slate-100 dark:border-gray-600 font-semibold">款式</th>
                  <th className="p-3 w-20 border-r border-slate-100 dark:border-gray-600 font-semibold">主材料</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">适用品牌或对象</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">型号</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">产品经理</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold">开发方式</th>
                  <th className="p-3 w-20 border-r border-slate-100 dark:border-gray-600 font-semibold text-center">提案等级</th>
                  <th className="p-3 w-28 border-r border-slate-100 dark:border-gray-600 font-semibold">上架时间要求</th>
                  <th className="p-3 w-24 border-r border-slate-100 dark:border-gray-600 font-semibold text-center">是否预调研</th>
                  <th className="p-3 w-[120px] text-center font-semibold text-slate-700 dark:text-gray-200 sticky right-0 bg-slate-50 dark:bg-gray-700 z-30 shadow-[-4px_0_6px_-2px_rgba(15,23,42,0.04)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-gray-600 transition-colors duration-300">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-slate-700 dark:text-gray-300 relative z-0 transition-colors duration-300">
                {mockData.map((row, index) => {
                  const isExpanded = expandedRowKeys.has(row.id);
                  
                  return (
                    <React.Fragment key={row.id}>
                      {/* --- 主数据行 --- */}
                      <tr className={`border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors relative group/row ${isExpanded ? 'bg-slate-50/80 dark:bg-gray-700/80 border-0' : 'border-b hover:bg-slate-50/50 dark:hover:bg-gray-700/30'}`}>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center"><input type="checkbox" className="dark:accent-sky-500" /></td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center text-slate-400 dark:text-gray-500">{index + 1}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center" onClick={() => toggleRow(row.id)}>
                          <div className={`w-4 h-4 mx-auto flex items-center justify-center border rounded-sm transition-all duration-200 cursor-pointer hover:border-sky-400 ${isExpanded ? 'border-sky-400 text-sky-500' : 'border-slate-300 dark:border-gray-600 text-slate-400 hover:text-sky-500'}`}>
                            <ChevronRight size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                          </div>
                        </td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 font-mono tracking-tight font-medium">{row.no}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-sky-600 dark:text-sky-400 font-medium hover:underline cursor-pointer">{row.source}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.date}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center relative">
                          <div className="inline-block relative">
                            <StatusTag status={row.statusCode} label={row.status} />
                            {row.hasAlert && <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm shadow-red-200"></span>}
                          </div>
                        </td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 cursor-pointer hover:underline">{row.spu}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.platform}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400">{row.category}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-700 dark:text-gray-200">{row.name}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400 truncate">{row.style}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.material}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.brand}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.model}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400">{row.pm}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.devMode}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center font-medium">{row.grade}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-slate-500 dark:text-gray-400">{row.reqTime}</td>
                        <td className="p-2.5 border-r border-slate-100 dark:border-gray-700 text-center text-slate-500 dark:text-gray-400">{row.infringe}</td>
                        <td className="p-2.5 sticky right-0 z-10 group-hover/row:z-[60] transition-colors shadow-[-4px_0_6px_-2px_rgba(15,23,42,0.02)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-gray-600 w-[120px] min-w-[120px] bg-white dark:bg-gray-800 group-hover/row:bg-[#f8fbfd] dark:group-hover/row:bg-gray-700">
                        <div className="flex items-center justify-center space-x-1.5 text-[12px] whitespace-nowrap">
                            <span className="text-sky-600 dark:text-sky-400 cursor-pointer hover:font-semibold transition-all">详情</span>
                            <span className="text-slate-300 dark:text-gray-600 font-light pb-[2px]">|</span>
                            <div className="relative group/dropdown cursor-pointer">
                            <div className="flex items-center text-sky-600 dark:text-sky-400 hover:font-semibold transition-all">
                                <span>操作</span>
                                <ChevronDown size={12} className="ml-0.5 transition-transform duration-200 group-hover/dropdown:rotate-180" />
                            </div>
                            
                            <div className="absolute right-[-2px] top-full mt-1.5 w-[85px] bg-white dark:bg-gray-800 rounded-lg shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-gray-700 py-1 hidden group-hover/dropdown:block z-[999] animate-in fade-in slide-in-from-top-1 transition-colors duration-300">
                            
                            <div className="absolute -top-[5px] right-4 w-2.5 h-2.5 bg-white dark:bg-gray-800 border-t border-l border-slate-100 dark:border-gray-700 rotate-45 z-0"></div>
                            
                            <div className="relative z-10 bg-white dark:bg-gray-800 flex flex-col text-left text-[12px] transition-colors duration-300">
                                <DropdownItem>编辑</DropdownItem>
                                <DropdownItem>创建任务</DropdownItem>
                                <DropdownItem>定品申请</DropdownItem>
                                <DropdownItem>信息编辑</DropdownItem>
                                <DropdownItem>归档</DropdownItem>
                                <DropdownItem>转移</DropdownItem>
                            </div>
                            </div>
                            
                            </div>
                        </div>
                        </td>
                      </tr>

                      {/* --- 🎯 嵌套行：面板 (Dashboard Layout) --- */}
                      {isExpanded && (
                        <tr className="border-b border-slate-200 dark:border-gray-700 group/detail">
                          <td colSpan={20} className="p-0 z-0 bg-white dark:bg-gray-800 border-x border-sky-400 dark:border-sky-600 transition-colors duration-300">
                            <DashboardDetail setIsProductModalOpen={setIsProductModalOpen} isDarkMode={isDarkMode}/>
                          </td>
                          <td className="p-0 sticky right-0 bg-white dark:bg-gray-800 z-10 shadow-[-4px_0_6px_-2px_rgba(15,23,42,0.02)] before:absolute before:content-[''] before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-gray-600 w-[120px] min-w-[120px] transition-colors duration-300"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 p-2.5 border-t border-slate-100 dark:border-gray-700 flex justify-end items-center space-x-2 text-[12px] text-slate-500 dark:text-gray-400 shrink-0 relative z-10 transition-colors duration-300">
             <div className="flex items-center space-x-1.5 mr-5 relative">
               <PagerBtn>&lt;</PagerBtn> <PagerBtn active>1</PagerBtn> <PagerBtn>2</PagerBtn> <PagerBtn>3</PagerBtn>
               <span className="text-slate-300 dark:text-gray-600">...</span>
               <PagerBtn>109</PagerBtn> <PagerBtn>&gt;</PagerBtn>
             </div>
             <div className="flex items-center border border-slate-200 dark:border-gray-600 rounded px-2.5 h-[26px] cursor-pointer bg-white dark:bg-gray-800 hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
               <span>20条/页</span><ChevronDown size={12} className="ml-1" />
             </div>
             <span className="text-slate-500 dark:text-gray-400">前往 <input className="w-9 h-[26px] border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded mx-1.5 text-center outline-none focus:border-sky-400 dark:focus:border-sky-500 focus:shadow-inner text-slate-700 dark:text-gray-200" defaultValue="1" /> 页</span>
             <span className="ml-2 font-medium text-slate-600 dark:text-gray-300">共 2175 条记录</span>
          </div>
        </div>
      </main>
      {/* ✨ 重点：加在这里！就在 main 标签结束之后，根 div 结束之前 ✨ */}
      {isProductModalOpen && (
        <ProductDetailModal onClose={() => setIsProductModalOpen(false)} />
      )}
    </div>
  );
};

// --- ✨ 面板辅助组件 (加入真实的 ECharts) ---
const DashboardDetail = ({ setIsProductModalOpen, isDarkMode }) => {
  return (
    <div className="flex w-full px-8 py-6 gap-16 bg-white dark:bg-gray-800 animate-in fade-in slide-in-from-top-2 duration-200 shadow-[inset_0_4px_6px_-4px_rgba(0,0,0,0.05)] transition-colors duration-300">
      
      {/* 1. 统计 */}
      <div className="w-[280px] shrink-0">
        <h3 className="font-bold text-[14px] text-slate-800 dark:text-gray-100 mb-4 flex items-center transition-colors duration-300">统计</h3>
        <div className="flex flex-col space-y-3.5">
          <StatItem label="任务发布" value={<>共 <span className="font-bold">【0/0/0】</span> 轮</>} hasIcon />
          <StatItem label="开模次数" value={<>共 <span className="font-bold">【0】</span> 次</>} />
          <StatItem label="定品申请" value={<>共 <span className="font-bold">【0】</span> 轮</>} />
          <StatItem label="提案用时" value={<>共 <span className="font-bold">【<span className="text-red-500 dark:text-red-400">0</span>(0)】</span> 天</>} hasIcon />
          <StatItem label="样品数量" value={<>共 <span className="font-bold text-sky-600 dark:text-sky-400 cursor-pointer hover:underline">【0/0/0】</span> 件</>} hasIcon />
          <StatItem label="研发投入" value={<>共 <span className="font-bold">【0】</span> 元</>} />
        </div>
      </div>

      {/* 2. 待办 */}
      <div className="w-[320px] shrink-0">
        <h3 className="font-bold text-[14px] text-slate-800 dark:text-gray-100 mb-4 transition-colors duration-300">待办</h3>
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-8">
          <TodoItem label="任务待发" value="0" isLink />
          <TodoItem label="首单需求" value="待采集" isLink />
          <TodoItem label="定制反馈" value="0" isLink />
          <TodoItem label="定品待申" value="0" isLink />
          <TodoItem label="样品反馈" value="0" isLink />
          <div /> 
          <TodoItem label="样品待还" value="0" isLink />
          <div />
          {/* ✨ 直接在这里传 onClick */}
        <TodoItem 
        label="信息补充" 
        value="1" 
        isLink 
        onClick={() => {
            console.log('点击了信息补充'); // 用于调试，看看控制台有没有打印
            setIsProductModalOpen(true);
        }} 
        />
        </div>
      </div>

      {/* 3. 协作 (真实 ECharts) */}
      <div className="flex-1 flex flex-col min-w-[300px]">
        {/* 头部与图例 */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-[14px] text-slate-800 dark:text-gray-100 transition-colors duration-300">协作</h3>
          <div className="flex items-center space-x-4 text-[12px] text-slate-600 dark:text-gray-400">
            <div className="flex items-center"><div className="w-4 h-3 bg-indigo-500 rounded-sm mr-1.5"></div>时长</div>
            <div className="flex items-center"><div className="w-4 h-3 bg-[#73d13d] rounded-sm mr-1.5"></div>样品数</div>
            <div className="flex items-center">
              <div className="w-5 h-[2px] bg-amber-400 relative mr-1.5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full border border-amber-400 bg-white dark:bg-gray-800 absolute"></div>
              </div>
              费用
            </div>
          </div>
        </div>

        {/* ECharts 渲染区 */}
        <div className="flex-1 w-full h-[200px]">
          <CollaborationChart isDarkMode={isDarkMode} />
        </div>
      </div>

    </div>
  );
};

// ✨ 核心功能：ECharts 图表封装组件
const CollaborationChart = ({ isDarkMode }) => {
  // ECharts 配置项
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { fontSize: 12 }
    },
    // 调整网格边距，让图表撑满可用空间
    grid: {
      top: 30,
      bottom: 20,
      left: 30,
      right: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['立项', '设计', '开模', '打样', '定品', '首单'], // 模拟业务阶段
        axisPointer: { type: 'shadow' },
        axisLine: { lineStyle: { color: isDarkMode ? '#4b5563' : '#cbd5e1' } }, // 底部灰线 (X轴)
        axisLabel: { color: isDarkMode ? '#9ca3af' : '#64748b', fontSize: 11 } 
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数值',
        nameTextStyle: { color: isDarkMode ? '#6b7280' : '#94a3b8', padding: [0, 30, 0, 0], fontSize: 11 },
        min: 0,
        max: 50,
        interval: 10,
        axisLabel: { color: isDarkMode ? '#6b7280' : '#94a3b8', fontSize: 11 },
        // 左侧数值Y轴不需要横向虚线网格，保持干净
        splitLine: { show: false }
      },
      {
        type: 'value',
        name: '费用',
        nameTextStyle: { color: isDarkMode ? '#6b7280' : '#94a3b8', padding: [0, 0, 0, 30], fontSize: 11 },
        min: 0,
        max: 5000,
        interval: 1000,
        axisLabel: { color: isDarkMode ? '#6b7280' : '#94a3b8', fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '时长',
        type: 'bar',
        barWidth: '15%',
        // 蓝紫色的柱子，顶部带有一点圆角
        itemStyle: { color: '#6366f1', borderRadius: [2, 2, 0, 0] },
        data: [5, 12, 25, 18, 8, 4]
      },
      {
        name: '样品数',
        type: 'bar',
        barWidth: '15%',
        // 绿色的柱子
        itemStyle: { color: '#73d13d', borderRadius: [2, 2, 0, 0] },
        data: [0, 0, 2, 5, 1, 0]
      },
      {
        name: '费用',
        type: 'line',
        yAxisIndex: 1, // 绑定到右侧的Y轴
        // 橙黄色的折线
        itemStyle: { color: '#fbbf24' },
        lineStyle: { width: 2 },
        // 空心圆点标记
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: isDarkMode ? '#1f2937' : '#fff', // 圆心填充
          borderColor: '#fbbf24', // 边框橙黄色
          borderWidth: 2
        },
        data: [200, 500, 3500, 1200, 300, 0]
      }
    ]
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ height: '100%', width: '100%' }} 
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

// 统计条目组件
const StatItem = ({ label, value, hasIcon }) => (
  <div className="flex items-center text-[12px]">
    <span className="text-slate-700 dark:text-gray-400 w-[70px] font-medium transition-colors duration-300">{label}:</span>
    <div className="flex items-center text-slate-700 dark:text-gray-300 transition-colors duration-300">
      {value}
      {hasIcon && <HelpCircle size={13} className="ml-1 text-slate-400 dark:text-gray-500 cursor-help hover:text-slate-600 dark:hover:text-gray-300 transition-colors" />}
    </div>
  </div>
);

// 注意参数外面的那对 { }，这叫解构赋值，非常关键！
const TodoItem = ({ label, value, isLink, onClick }) => (
  <div 
    className="flex items-center justify-between text-[12px]"
    onClick={onClick} 
  >
    <span className="text-slate-700 dark:text-gray-400 font-medium transition-colors duration-300">{label}:</span>
    {isLink ? (
      <span className={`text-[#1890ff] dark:text-sky-400 cursor-pointer hover:underline ${value !== '0' ? 'font-bold' : ''}`}>
        {value}
      </span>
    ) : (
      <span className="text-slate-800 dark:text-gray-200 transition-colors duration-300">{value}</span>
    )}
  </div>
);

// 基础样式辅助组件
const StatusTag = ({ status, label }) => {
  const styles = { 
    pending: 'bg-[#1890ff] dark:bg-blue-600 text-white rounded-sm', 
    sampling: 'bg-[#fa8c16] dark:bg-amber-600 text-white rounded-sm', 
    done: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' 
  };
  return <span className={`px-2 py-0.5 text-[11px] whitespace-nowrap font-medium transition-colors duration-300 ${styles[status] || 'bg-slate-50 dark:bg-gray-700 text-slate-600 dark:text-gray-400 border border-slate-100 dark:border-gray-600'}`}>{label}</span>;
};

const FilterSelect = ({ placeholder, label, icon, w = "w-auto min-w-[105px]" }) => (
  <div className={`flex items-center border border-slate-200 dark:border-gray-600 rounded h-[30px] px-2.5 text-slate-400 dark:text-gray-500 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-sm cursor-pointer bg-white dark:bg-gray-800 transition-all ${w} duration-300`}>
    {label && <span className="text-slate-700 dark:text-gray-300 mr-2.5 border-r border-slate-200 dark:border-gray-600 pr-2.5 shrink-0 font-medium transition-colors duration-300">{label}</span>}
    {icon && <span className="mr-1.5 shrink-0">{icon}</span>}
    <span className="truncate text-[11px] flex-1 transition-colors duration-300">{placeholder}</span><ChevronDown size={12} className="ml-1.5 shrink-0 text-slate-400 dark:text-gray-500" />
  </div>
);

const PagerBtn = ({ children, active }) => (
  <span className={`flex items-center justify-center min-w-[26px] h-[26px] border rounded transition-all cursor-pointer text-[11px] font-mono duration-300 ${active ? 'bg-sky-600 dark:bg-sky-700 text-white border-sky-600 dark:border-sky-700 shadow-md font-semibold' : 'border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-400 bg-white dark:bg-gray-800 hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:shadow-sm'}`}>{children}</span>
);


// 👇 请把下面这 5 行代码，粘贴到这个位置 👇
const DropdownItem = ({ children, danger }) => (
  <div className={`px-4 py-2 cursor-pointer transition-colors text-[12px] duration-200 ${danger ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-slate-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-700 dark:hover:text-sky-400'}`}>
    {children}
  </div>
);
// 👆 -------------------------------------- 👆

export default ProposalManagement;