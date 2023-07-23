import axios from 'axios';
import queryString from 'query-string';
import { ExportOrderInterface, ExportOrderGetQueryInterface } from 'interfaces/export-order';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getExportOrders = async (
  query?: ExportOrderGetQueryInterface,
): Promise<PaginatedInterface<ExportOrderInterface>> => {
  const response = await axios.get('/api/export-orders', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createExportOrder = async (exportOrder: ExportOrderInterface) => {
  const response = await axios.post('/api/export-orders', exportOrder);
  return response.data;
};

export const updateExportOrderById = async (id: string, exportOrder: ExportOrderInterface) => {
  const response = await axios.put(`/api/export-orders/${id}`, exportOrder);
  return response.data;
};

export const getExportOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/export-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExportOrderById = async (id: string) => {
  const response = await axios.delete(`/api/export-orders/${id}`);
  return response.data;
};
