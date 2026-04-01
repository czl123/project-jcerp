// src/menuConfig.jsx
import React from 'react';
// src/menuConfig.jsx
// src/menuConfig.jsx
import { 
  Wallet, 
  Package, // 👈 检查这里
  Box,     // 👈 加上这个
  Layers, 
  Store, 
  Truck, 
  LifeBuoy, 
  Wrench, 
  Settings,
  Users
} from 'lucide-react';
export const MAIN_MENUS = [
  { id: 'resume-agent', icon: <Users size={18} />, label: 'AI 简历助手', type: 'link', path: '/resume-agent' },
  // src/menuConfig.jsx 里的产品配置部分
    {
    id: 'product',
    label: '产品',
    icon: <Box size={20} />, // 确保你之前引入了 Box
    groups: [
        {
        title: '产品规划',
        items: [
            { label: 'SPU管理', path: '/product/spu' },
            { label: '产品线管理', path: '/product/line' },
        ]
        },
        {
        title: '研发管理',
        items: [
            { label: '预案指派', path: '/product/assign' },
            { label: '预案审核', path: '/product/audit-plan' },
            { label: '预案一级审批', path: '/product/audit-1' },
            { label: '预案二级审批', path: '/product/audit-2' },
            { label: '定品审核', path: '/product/audit-final' },
            { label: '定品一级审批', path: '/product/final-1' },
            { label: '定品二级审批', path: '/product/final-2' },
            { label: '拓新定品审批', path: '/product/new-final' },
        ]
        },
        {
        title: '产品预案',
        items: [
            { label: '开发预案', path: '/product/dev-plan' },
            { label: '需求预案', path: '/product/req-plan' },
            { label: '推样预案', path: '/product/sample-plan' },
            { label: '预案反馈', path: '/product/feedback' },
        ]
        },
        {
        title: '研发费管理',
        items: [
            { label: '研发费支付', path: '/product/fee-pay' },
            { label: '研发费审批', path: '/product/fee-audit' },
            { label: '尾款支付管理', path: '/product/balance-pay' },
        ]
        },
        {
        title: '产品提案',
        items: [
            { label: '提案管理', path: '/product/propose' },
            { label: '开发样拿样任务', path: '/product/sample-task' },
            { label: '开发样处置', path: '/product/sample-handle' },
            { label: '开发样管理', path: '/product/sample-manage' },
            { label: '设置', path: '/product/settings' },
        ]
        },
        {
        title: '物料',
        items: [
            { label: '物料商检复核', path: '/product/inspect-review' },
            { label: '物料管理', path: '/product/material' }, // 👈 关联你的主功能页面
            { label: '物料拓新', path: '/product/new-material' },
            { label: '物料修改审核', path: '/product/modify-audit' },
            { label: '组合物料', path: '/product/combo' },
            { label: '多码物料管理', path: '/product/multi-code' },
        ]
        },
        {
        title: '产品运营',
        items: [
            { label: '首单采购需求', path: '/product/first-order-req' },
            { label: '首单采购管理', path: '/product/first-order-manage' },
            { label: '拓新首单管理', path: '/product/new-first-order' },
            { label: '拓新首单需求', path: '/product/new-first-req' },
        ]
        },
        {
        title: '大货样管理',
        items: [
            { label: '大货样拿样管理', path: '/product/bulk-sample-manage' },
            { label: '大货样DQE测试', path: '/product/dqe-test' },
            { label: '大货样样品管理', path: '/product/bulk-sample-stock' },
        ]
        }
    ]
    },
    { id: 'resource', icon: <Layers size={18} />, label: '资源', type: 'link', path: '/resource' },
    { id: 'operation', icon: <Store size={18} />, label: '运营', type: 'link', path: '/operation' },
    { id: 'supply', icon: <Truck size={18} />, label: '供应链', type: 'link', path: '/supply' },
    { id: 'third-party', icon: <LifeBuoy size={18} />, label: '第三方', type: 'link', path: '/third' },
    { id: 'tool', icon: <Wrench size={18} />, label: '工具', type: 'link', path: '/tool' },
    { id: 'settings', icon: <Settings size={18} />, label: '设置', type: 'link', path: '/settings' }
  // ... 其他菜单
];