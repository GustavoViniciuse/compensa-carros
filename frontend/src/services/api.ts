import axios from 'axios';
import type { SimulationPayload, SimulationResult } from '../types/Simulation';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const calculateSimulation = async (data: SimulationPayload): Promise<SimulationResult> => {
  const response = await api.post<SimulationResult>('/calculate', data);
  return response.data;
};