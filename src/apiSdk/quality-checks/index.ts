import axios from 'axios';
import queryString from 'query-string';
import { QualityCheckInterface, QualityCheckGetQueryInterface } from 'interfaces/quality-check';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getQualityChecks = async (
  query?: QualityCheckGetQueryInterface,
): Promise<PaginatedInterface<QualityCheckInterface>> => {
  const response = await axios.get('/api/quality-checks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createQualityCheck = async (qualityCheck: QualityCheckInterface) => {
  const response = await axios.post('/api/quality-checks', qualityCheck);
  return response.data;
};

export const updateQualityCheckById = async (id: string, qualityCheck: QualityCheckInterface) => {
  const response = await axios.put(`/api/quality-checks/${id}`, qualityCheck);
  return response.data;
};

export const getQualityCheckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/quality-checks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQualityCheckById = async (id: string) => {
  const response = await axios.delete(`/api/quality-checks/${id}`);
  return response.data;
};
