import ApiService from './api';

class MaterialService {
  static async getMaterials(params = {}) {
    return ApiService.get('/materials', params);
  }

  static async createMaterial(data) {
    return ApiService.post('/materials', data);
  }

  static async updateMaterial(id, data) {
    return ApiService.put(`/materials/${id}`, data);
  }

  static async deleteMaterial(id) {
    return ApiService.delete(`/materials/${id}`);
  }
}

export default MaterialService;