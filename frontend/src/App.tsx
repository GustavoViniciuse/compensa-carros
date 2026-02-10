import { useState } from 'react';
import { Header } from './components/Header';
import { SimulationForm } from './components/SimulationForm';
import { SimulationResults } from './components/SimulationResults';
import { calculateSimulation } from './services/api';
import type { SimulationResult, SimulationPayload } from './types/Simulation';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleCalculate = async (payload: SimulationPayload) => {
    setLoading(true);
    try {
      const data = await calculateSimulation(payload);
      setResult(data);
    } catch (error) {
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="main-grid">
        <SimulationForm onSubmit={handleCalculate} isLoading={loading} />
        <SimulationResults data={result} />
      </main>
    </div>
  );
}

export default App;