import type { SimulationResult } from '../../types/Simulation';
import './styles.css';

interface Props {
  data: SimulationResult | null;
}

export function SimulationResults({ data }: Props) {
  const toBRL = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  if (!data) {
    return (
      <div className={'emptyState'}>
        <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</span>
        <h3>Aguardando dados...</h3>
        <p>Preencha os campos ao lado para simular.</p>
      </div>
    );
  }

  return (
    <div className={'container'}>
      <div className={'recommendation'}>
        <small style={{ opacity: 0.9, fontWeight: 600 }}>CONCLUSÃO:</small>
        <h2>{data.recommendation}</h2>
      </div>

      <div className={'resultCard'}>
        <div className={'cardHeader'}>Aluguel:</div>
        <div className={'cardValues'}>
          <div className={'valueGroup'}>
            <small>Custo Total</small>
            <strong>{toBRL(data.results.rent.totalCost)}</strong>
          </div>
          <div className={'valueGroup'} style={{ textAlign: 'right' }}>
            <small>Mensalidade</small>
            <strong>{toBRL(data.results.rent.monthlyAvg)}</strong>
          </div>
        </div>
      </div>

      <div className={'resultCard'}>
        <div className={'cardHeader'}>Compra Financiada</div>
        <div className={'cardValues'}>
          <div className={'valueGroup'}>
            <small>Custo Total (+ Juros)</small>
            <strong>{toBRL(data.results.financedBuy.totalCost)}</strong>
          </div>
          <div className={'valueGroup'} style={{ textAlign: 'right' }}>
            <small>Parcela</small>
            <strong>{toBRL(data.results.financedBuy.installmentValue)}</strong>
          </div>
        </div>
      </div>

      <div className={'resultCard'}>
        <div className={'cardHeader'}>Compra à Vista</div>
        <div className={'cardValues'}>
          <div className={'valueGroup'}>
            <small>Custo Total (+ Depreciação)</small>
            <strong>{toBRL(data.results.cashBuy.totalCost)}</strong>
          </div>
          <div className={'valueGroup'} style={{ textAlign: 'right' }}>
            <small>Média Mensal</small>
            <strong>{toBRL(data.results.cashBuy.monthlyAvg)}</strong>
          </div>
        </div>
      </div>

      <p className={'disclaimer'}>
        *Considera depreciação anual (12%) e custos de propriedade (3% ao ano).
      </p>
    </div>
  );
}