export interface SimulationInput {
  carValue: number;      // Valor do carro (FIPE)
  monthlyRent: number;   // Aluguel mensal
  interestRate: number;  // Juros mensais
  loanTerm: number;      // Prazo total em meses
  downPayment: number;   // Entrada (opcional)
}

const ANNUAL_DEPRECIATION = 0.12;   // 12% a.a. desvalorização média
const ANNUAL_MAINTENANCE = 0.03;    // 3% a.a. (IPVA + seguro + manutenção)
const OPPORTUNITY_RATE = 0.08;      // 8% a.a. (CDI conservador)

// Considerei valores médio do mercado

export class ComparisonService {

  private compound(value: number, rate: number, years: number): number {
    return value * Math.pow(1 + rate, years);
  }

  public compare(data: SimulationInput) {
    const {
      carValue,
      monthlyRent,
      interestRate,
      loanTerm,
      downPayment
    } = data;

    const years = loanTerm / 12;

    // ALUGUEL: aluguel mensal × número de meses
    const rentTotalCost = monthlyRent * loanTerm;

    /// DEPRECIAÇÃO DO VEÍCULO: Valor do carro ao final do período
    const resaleValue = carValue * Math.pow(1 - ANNUAL_DEPRECIATION, years);
    
    // Custo real da depreciação (valor que efetivamente se perde)
    const depreciationCost = carValue - resaleValue;

    // CUSTO DE MANUTENÇÃO: Calculado com base no valor médio do carro ao longo do período (mais realista)
    const averageCarValue = (carValue + resaleValue) / 2;

    const maintenanceCost = averageCarValue * ANNUAL_MAINTENANCE * years;

    /* COMPRA À VISTA: considerada no início do período, com revenda ao final do horizonte de análise
     * Custos reais: Depreciação, Manutenção, Custo de oportunidade do capital
     * 
     * Custo de oportunidade: quanto o dinheiro renderia se fosse investido ao invés de ser usado para comprar o carro
     */
    const opportunityCostCash = this.compound(carValue, OPPORTUNITY_RATE, years) - carValue;

    const cashBuyTotalCost = depreciationCost + maintenanceCost + opportunityCostCash;

    /* COMPRA FINANCIADA
     * Custos reais:
     * - Juros pagos ao banco
     * - Depreciação
     * - Manutenção
     * - Custo de oportunidade da entrada
     */

    const loanAmount = carValue - downPayment;
    const monthlyRate = interestRate / 100;

    // Cálculo da parcela
    const installment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Total pago ao banco
    const totalPaidToBank = installment * loanTerm;

    // Juros pagos:
    const interestPaid = totalPaidToBank - loanAmount;

    // Custo de oportunidade da entrada
    const opportunityCostDownPayment = this.compound(downPayment, OPPORTUNITY_RATE, years) - downPayment;

    const financedBuyTotalCost = interestPaid + depreciationCost + maintenanceCost + opportunityCostDownPayment;

    // RESULTADO FINAL
    return {
      scenario: {
        months: loanTerm,
        resaleValue: Number(resaleValue.toFixed(2))
      },
      results: {
        rent: {
          totalCost: Number(rentTotalCost.toFixed(2)),
          monthlyAvg: Number((rentTotalCost / loanTerm).toFixed(2))
        },
        cashBuy: {
          totalCost: Number(cashBuyTotalCost.toFixed(2)),
          monthlyAvg: Number((cashBuyTotalCost / loanTerm).toFixed(2))
        },
        financedBuy: {
          totalCost: Number(financedBuyTotalCost.toFixed(2)),
          monthlyAvg: Number((financedBuyTotalCost / loanTerm).toFixed(2)),
          installmentValue: Number(installment.toFixed(2)),
          interestPaid: Number(interestPaid.toFixed(2))
        }
      },
      recommendation: this.getRecommendation(
        rentTotalCost,
        cashBuyTotalCost,
        financedBuyTotalCost
      )
    };
  }

  //Recomendação
  private getRecommendation(
    rent: number,
    cash: number,
    financed: number
  ): string {
    const min = Math.min(rent, cash, financed);

    if (min === rent)
      return 'Alugar é financeiramente mais vantajoso neste cenário.';

    if (min === cash)
      return 'Comprar à vista é a opção mais econômica no longo prazo.';

    return 'Financiar apresentou o menor custo total (verifique as taxas).';
  }
}
