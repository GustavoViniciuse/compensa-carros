import './styles.css';

interface ScenarioData {
  label: string;
  initialPayment: number;
  monthlyPayment: number;
  futureAssetValue: number;
  finalEconomicCost: number;
}

interface Props {
  data: {
    months: number;
    bestChoice: string;
    scenarios: {
      rent: ScenarioData;
      cash: ScenarioData;
      financed: ScenarioData;
    };
  } | null;
}

export function SimulationResults({ data }: Props) {
  const money = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  if (!data) return (
    <div className="empty-state">
      <div className="empty-icon">📊</div>
      <h3>Comprar, Financiar ou Alugar?</h3>
      <p>Preencha os campos ao lado para gerar o comparativo.</p>
    </div>
  );

  const VerdictSection = () => {
    const isRent = data.bestChoice.includes('Alugar');
    const isCash = data.bestChoice.includes('vista');

    let gradientClass = 'gradient-neutral';
    let icon = '⚖️';

    if (isRent) {
      gradientClass = 'gradient-rent';
      icon = '🔑';
    } else if (isCash) {
      gradientClass = 'gradient-cash';
      icon = '💰';
    } else {
      gradientClass = 'gradient-finance';
      icon = '🏦';
    }

    return (
      <div className={`verdict-card ${gradientClass}`}>
        <div className="verdict-icon">{icon}</div>
        <div className="verdict-content">
          <small>CONCLUSÃO DA ANÁLISE</small>
          <h2>{data.bestChoice}</h2>
          <p>Baseado no menor custo financeiro total ao final de {data.months} meses.</p>
        </div>
      </div>
    );
  };

  const ScenarioCard = ({ item, icon, isBest }: { item: ScenarioData; icon: string; isBest?: boolean }) => (
    <div className={`scenario-card ${isBest ? 'highlight-border' : ''}`}>
      {isBest && <div className="best-badge">🏆 Melhor Opção</div>}

      <div className="card-header">
        <span className="scenario-icon">{icon}</span>
        <h3>{item.label}</h3>
      </div>

      <div className="card-body">
        <div className="payment-grid">
          <div className="payment-item">
            <span className="label">Entrada (Hoje)</span>
            <strong className="value">{money(item.initialPayment)}</strong>
          </div>
          <div className="payment-item">
            <span className="label">Parcela Mensal</span>
            <strong className="value">{money(item.monthlyPayment)}</strong>
          </div>
        </div>

        <div className="future-block">
          <div className="row">
            <span className="label">Valor do Carro (Final)</span>
            <strong className="value-green">
              {item.futureAssetValue > 0 ? `+ ${money(item.futureAssetValue)}` : 'Sem valor patrimonial'}
            </strong>
          </div>
        </div>

        <div className="divider"></div>

        <div className="final-result">
          <span className="label-total">Custo Real Total</span>
          <strong className="value-total">{money(item.finalEconomicCost)}</strong>
          <small className="info-total">Perda patrimonial acumulada</small>
        </div>
      </div>
    </div>
  );

  return (
    <div className="results-container">
      <VerdictSection />

      <div className="cards-grid">
        <ScenarioCard
          item={data.scenarios.rent}
          icon="🚗"
          isBest={data.bestChoice.includes('Alugar')}
        />
        <ScenarioCard
          item={data.scenarios.financed}
          icon="📝"
          isBest={data.bestChoice.includes('Financiar')}
        />
        <ScenarioCard
          item={data.scenarios.cash}
          icon="💵"
          isBest={data.bestChoice.includes('vista')}
        />
      </div>

      <p className="disclaimer">
        * O <strong>Custo Real</strong> considera: Valores pagos, desvalorização do veículo e gastos com manutenção e IPVA.
      </p>
      <p className="disclaimer">
        <strong>Combustível não colocado em conta</strong>
      </p>
    </div>
  );
}