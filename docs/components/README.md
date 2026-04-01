# 组件文档

## 组件结构

```
src/
├── components/          # 共享组件
│   ├── tabs/            # 标签组件
│   │   └── TabItem.jsx   # 标签项组件
│   ├── filters/         # 筛选组件
│   │   └── FilterSelect.jsx # 筛选下拉组件
│   └── buttons/         # 按钮组件
│       └── ActionBtn.jsx # 操作按钮组件
```

## 组件说明

### TabItem
- **用途**: 顶部导航标签项
- **属性**:
  - `label`: 标签文本
  - `active`: 是否激活状态
- **样式**: 支持激活/非激活状态的样式切换

### FilterSelect
- **用途**: 筛选下拉选择框
- **属性**:
  - `placeholder`: 占位文本
  - `label`: 标签文本（可选）
  - `icon`: 图标（可选）
- **样式**: 统一的筛选框样式

### ActionBtn
- **用途**: 操作按钮
- **属性**:
  - `label`: 按钮文本
  - `hasArrow`: 是否显示下拉箭头
- **样式**: 统一的操作按钮样式

## 使用示例

```jsx
import { TabItem, FilterSelect, ActionBtn } from '../components';

// 标签组件
<TabItem label="物料管理" active />

// 筛选组件
<FilterSelect label="创建时间" icon={<Calendar />} placeholder="开始时间 至 结束时间" />

// 按钮组件
<ActionBtn label="新建配件" />
<ActionBtn label="批量操作" hasArrow />
```