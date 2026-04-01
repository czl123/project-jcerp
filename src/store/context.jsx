import { createContext, useContext, useState, useEffect } from 'react';

// 创建 Context
export const AppContext = createContext();

// 创建 Provider
export const AppProvider = ({ children }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 获取物料数据
  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      // 这里应该是实际的 API 调用
      // const data = await MaterialService.getMaterials();
      // setMaterials(data);

      // 模拟数据
      const mockData = [
        { id: 1, spu: "TC1837", code: "TC260588", prop: "S20190053-220712", cat: "平板电脑保...", name: "平板皮套", style: "电压款-三折...", material: "TPU", brand: "苹果", model: "iPad 10th 2" },
        { id: 2, spu: "SW0078", code: "SW260149", prop: "TX-202603102", cat: "智能手表", name: "手表表带", style: "三珠款+拆表...", material: "不锈钢", brand: "Fitbit", model: "Versa 4" },
        { id: 3, spu: "BA0754", code: "BA260084", prop: "TX-202603118", cat: "箱包", name: "手机绳", style: "易拉扣款配...", material: "金属+塑料", brand: "-", model: "-" },
      ];
      setMaterials(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    fetchMaterials();
  }, []);

  const value = {
    materials,
    loading,
    error,
    fetchMaterials,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义 Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};