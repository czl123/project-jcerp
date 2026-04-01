import React, { useState } from 'react';
import { Settings, Download, Cpu, FileSpreadsheet, Users, Search, Plus, Trash2, Upload } from 'lucide-react';

const ResumeAgentDashboard = () => {
  // 动态获取当前访问地址的主机名，确保局域网访问时 API 指向正确的服务器 IP
  const API_BASE_URL = `http://${window.location.hostname}:3001`;

  // 状态改为数组，支持多个岗位配置
  const [requirements, setRequirements] = useState([
    { id: 1, role: '高级前端开发工程师', experience: '5-10年', skills: 'React, TypeScript', education: '本科', salaryRange: '25k-45k', keywords: '架构设计', indicators: '1.架构设计能力(40%) 2.底层原理深度(30%) 3.团队管理经验(20%) 4.性能优化实践(10%)' },
    { id: 2, role: '中级后端开发工程师', experience: '3-5年', skills: 'Node.js, Go', education: '本科', salaryRange: '20k-35k', keywords: '高并发', indicators: '1.高并发处理经验(50%) 2.微服务架构(30%) 3.数据库调优(20%)' }
  ]);

  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleAddRow = () => {
    const newId = requirements.length > 0 ? Math.max(...requirements.map(r => r.id)) + 1 : 1;
    setRequirements([...requirements, { id: newId, role: '', experience: '', skills: '', education: '', salaryRange: '', keywords: '', indicators: '' }]);
  };

  const handleRemoveRow = (id) => {
    setRequirements(requirements.filter(r => r.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setRequirements(requirements.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleRunAutoPipeline = async () => {
    setStatus('running');
    addLog('🚀 启动全自动流水线...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/run-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements })
      });
      const data = await response.json();
      
      if (data.success) {
        addLog('✅ 岗位指标与画像已同步。');
        addLog('🤖 正在接管影刀 RPA 采集...');
        
        // 模拟等待影刀采集的过程 (实际开发中影刀可以回传状态)
        setTimeout(async () => {
          addLog('📂 发现影刀下载的简历文件，正在自动分析...');
          const screenRes = await fetch(`${API_BASE_URL}/api/run-screening`, { method: 'POST' });
          const screenData = await screenRes.json();
          addLog('✨ AI 智能筛选完成！已根据各岗位专有指标完成打分。');
          setStatus('success');
        }, 5000);

      } else {
        addLog('❌ 调度任务启动失败: ' + data.error);
        setStatus('error');
      }
    } catch (err) {
      addLog('❌ 网络连接错误: ' + err.message);
      setStatus('error');
    }
  };

  const handleRunSync = async () => {
    setStatus('running');
    addLog('正在同步画像数据并导出 Excel...');
    try {
      const res = await fetch(`${API_BASE_URL}/api/run-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements, onlyExport: true })
      });
      const data = await res.json();
      if (data.success) {
        addLog('✅ 同步成功！');
        addLog('📝 JSON: ' + data.jsonPath);
        addLog('📊 Excel: ' + data.excelPath);
      } else {
        addLog('❌ 同步失败');
      }
      setStatus('success');
    } catch (e) {
      addLog('❌ 同步出错: ' + e.message);
      setStatus('error');
    }
  };

  const handleRunTask = (taskName) => {
    addLog(`手动触发: ${taskName}`);
    // 这里可以添加具体的任务逻辑
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-blue-600" /> 简历筛选智能 Agent (全自主模式)
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={handleRunAutoPipeline}
            className="flex items-center gap-1 text-sm bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md animate-pulse"
          >
            <Cpu size={16} /> 一键全自动执行
          </button>
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'running' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-green-100 text-green-700'
          }`}>
            状态: {status === 'running' ? 'Agent接管中' : '空闲'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* 批量配置区域 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Settings size={18} /> 批量人才画像 & 评估指标配置
            </div>
            <button 
              onClick={handleAddRow}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-colors"
            >
              <Plus size={14} /> 新增岗位
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                  <th className="pb-3 font-medium w-40">招聘岗位</th>
                  <th className="pb-3 font-medium w-24">职级/经验</th>
                  <th className="pb-3 font-medium">核心技能</th>
                  <th className="pb-3 font-medium w-64">AI 评估维度与权重指标 (关键)</th>
                  <th className="pb-3 font-medium w-32">薪资/学历</th>
                  <th className="pb-3 font-medium">搜索关键词</th>
                  <th className="pb-3 font-medium w-16 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requirements.map((req) => (
                  <tr key={req.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 pr-2">
                      <input 
                        className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold" 
                        value={req.role} 
                        onChange={(e) => handleInputChange(req.id, 'role', e.target.value)}
                      />
                    </td>
                    <td className="py-3 pr-2 text-xs">
                      <input 
                        className="w-full bg-transparent border-none focus:ring-0" 
                        value={req.experience} 
                        onChange={(e) => handleInputChange(req.id, 'experience', e.target.value)}
                      />
                    </td>
                    <td className="py-3 pr-2 text-xs">
                      <input 
                        className="w-full bg-transparent border-none focus:ring-0" 
                        value={req.skills} 
                        onChange={(e) => handleInputChange(req.id, 'skills', e.target.value)}
                      />
                    </td>
                    <td className="py-3 pr-2">
                      <textarea 
                        className="w-full bg-blue-50/50 border-none rounded p-1 text-[10px] focus:ring-1 focus:ring-blue-400 leading-tight" 
                        rows="2"
                        placeholder="如：1.技术架构(40%) 2.项目经验(60%)"
                        value={req.indicators} 
                        onChange={(e) => handleInputChange(req.id, 'indicators', e.target.value)}
                      />
                    </td>
                    <td className="py-3 pr-2 text-xs">
                      <div className="flex flex-col gap-1">
                        <input className="bg-transparent border-none p-0 text-[10px]" value={req.salaryRange} onChange={(e) => handleInputChange(req.id, 'salaryRange', e.target.value)} />
                        <input className="bg-transparent border-none p-0 text-[10px] text-gray-400" value={req.education} onChange={(e) => handleInputChange(req.id, 'education', e.target.value)} />
                      </div>
                    </td>
                    <td className="py-3 pr-2">
                      <input 
                        className="w-full bg-transparent border-none focus:ring-0 text-sm font-mono text-xs text-blue-600" 
                        placeholder="用于RPA搜索"
                        value={req.keywords} 
                        onChange={(e) => handleInputChange(req.id, 'keywords', e.target.value)}
                      />
                    </td>
                    <td className="py-3 text-center">
                      <button 
                        onClick={() => handleRemoveRow(req.id)}
                        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex gap-4 mt-6 border-t pt-6">
            <button 
              onClick={handleRunSync}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md shadow-blue-100 transition-all"
            >
              <FileSpreadsheet size={18} /> 批量同步至后台并导出文档
            </button>
          </div>
        </div>

        {/* 下方控制台与日志并排 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700 border-b pb-2">
              <Cpu size={18} /> 批量自动化流水线
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/50 rounded-lg flex justify-between items-center border border-blue-100">
                <div>
                  <h3 className="font-medium text-blue-800 text-sm">阶段 1: 批量简历采集</h3>
                  <p className="text-[11px] text-blue-600 mt-0.5">将依次对 {requirements.length} 个岗位进行全网检索并下载简历。</p>
                </div>
                <button 
                  onClick={() => handleRunTask('RPA采集')}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
                >
                  开始批量采集
                </button>
              </div>
              <div className="p-4 bg-purple-50/50 rounded-lg flex justify-between items-center border border-purple-100">
                <div>
                  <h3 className="font-medium text-purple-800 text-sm">阶段 2: AI 智能筛选</h3>
                  <p className="text-[11px] text-purple-600 mt-0.5">多线程分析所有下载的简历，自动根据对应岗位打分。</p>
                </div>
                <button 
                  onClick={() => handleRunTask('AI筛选')}
                  className="bg-purple-600 text-white px-4 py-1.5 rounded text-sm hover:bg-purple-700"
                >
                  启动智能评估
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-500 border-b pb-2 uppercase text-xs tracking-widest">
              Execution Logs
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-40 overflow-y-auto text-[11px] font-mono leading-relaxed">
              {logs.length === 0 && <span className="opacity-50 tracking-widest">Waiting for command...</span>}
              {logs.map((log, i) => (
                <div key={i} className="mb-1 border-l-2 border-green-800 pl-2">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAgentDashboard;
