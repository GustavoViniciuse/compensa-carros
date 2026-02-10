import { useState } from 'react';
import type { FormEvent } from 'react';
import { InputGroup } from '../InputGroup';
import type { SimulationPayload } from '../../types/Simulation';
import './styles.css';

interface Props {
  onSubmit: (data: SimulationPayload) => void;
  isLoading: boolean;
}

export function SimulationForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState({
    carValue: '',
    monthlyRent: '',
    interestRate: '',
    loanTerm: '',
    downPayment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      carValue: Number(formData.carValue),
      monthlyRent: Number(formData.monthlyRent),
      interestRate: Number(formData.interestRate),
      loanTerm: Number(formData.loanTerm),
      downPayment: Number(formData.downPayment) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <InputGroup 
        label="Valor do Carro (FIPE)" 
        name="carValue" 
        type="number" 
        prefix="R$" 
        required
        value={formData.carValue}
        onChange={handleChange}
      />

      <InputGroup 
        label="Aluguel Mensal" 
        name="monthlyRent" 
        type="number" 
        prefix="R$" 
        required
        value={formData.monthlyRent}
        onChange={handleChange}
      />

      <div className="gridTwo">
        <InputGroup 
          label="Juros Mensal (%)" 
          name="interestRate" 
          type="number" 
          step="0.01" 
          prefix="%"
          value={formData.interestRate}
          onChange={handleChange}
        />
        <InputGroup 
          label="Prazo (Meses)" 
          name="loanTerm" 
          type="number"
          value={formData.loanTerm}
          onChange={handleChange}
        />
      </div>

      <InputGroup 
        label="Entrada (Opcional)" 
        name="downPayment" 
        type="number" 
        prefix="R$"
        value={formData.downPayment}
        onChange={handleChange}
      />

      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? 'Calculando...' : 'Comparar Cenários'}
      </button>
    </form>
  );
}
