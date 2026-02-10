import axios from 'axios';
import type { SimulationPayload, SimulationResult } from '../types/Simulation';

const api = axios.create({
  baseURL: 'https://compensa-carros.vercel.app/api',
});

export const calculateSimulation = async (data: SimulationPayload): Promise<SimulationResult> => {
  const response = await api.post<SimulationResult>('/calculate', data);
  return response.data;
};