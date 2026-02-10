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

// Considerei valores médios do mercado

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

    // ========================
    // ALUGUEL
    // ========================
    // Aluguel mensal × número de meses
    // Dinheiro 100% gasto, sem retorno patrimonial
    const rentTotalCost = monthlyRent * loanTerm;

    // ========================
    // DEPRECIAÇÃO DO VEÍCULO
    // ========================
    // Valor estimado de revenda ao final do período
    const resaleValue = carValue * Math.pow(1 - ANNUAL_DEPRECIATION, years);

    // Perda real de valor do bem
    const depreciationCost = carValue - resaleValue;

    // ========================
    // MANUTENÇÃO
    // ========================
    // Baseada no valor médio do carro durante o período
    const averageCarValue = (carValue + resaleValue) / 2;

    const maintenanceCost = averageCarValue * ANNUAL_MAINTENANCE * years;

    // ========================
    // COMPRA À VISTA
    // ========================
    /*
      Compra ocorre no início e há revenda ao final.
      Custos reais considerados:
      - Depreciação (perda patrimonial)
      - Manutenção
    */

    const cashBuyTotalCost = depreciationCost + maintenanceCost;

    // Informação adicional (não entra na comparação final)
    const opportunityCostCash = this.compound(carValue, OPPORTUNITY_RATE, years) - carValue;

    // ========================
    // COMPRA FINANCIADA
    // ========================
    /*
      Custos reais:
      - Juros pagos ao banco
      - Depreciação
      - Manutenção

      OBS:
      O custo de oportunidade da entrada é informativo,
      mas não entra no custo total comparativo.
    */

    const loanAmount = carValue - downPayment;
    const monthlyRate = interestRate / 100;

    // Fórmula da parcela 
    const installment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Total pago ao banco
    const totalPaidToBank = installment * loanTerm;

    // Juros efetivamente pagos
    const interestPaid = totalPaidToBank - loanAmount;

    const financedBuyTotalCost =
      interestPaid + depreciationCost + maintenanceCost;

    // Informação adicional
    const opportunityCostDownPayment =
      this.compound(downPayment, OPPORTUNITY_RATE, years) - downPayment;

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
          monthlyAvg: Number((cashBuyTotalCost / loanTerm).toFixed(2)),
          opportunityCost: Number(opportunityCostCash.toFixed(2))
        },
        financedBuy: {
          totalCost: Number(financedBuyTotalCost.toFixed(2)),
          monthlyAvg: Number((financedBuyTotalCost / loanTerm).toFixed(2)),
          installmentValue: Number(installment.toFixed(2)),
          interestPaid: Number(interestPaid.toFixed(2)),
          opportunityCostDownPayment: Number(opportunityCostDownPayment.toFixed(2))
        }
      },
      recommendation: this.getRecommendation(
        rentTotalCost,
        cashBuyTotalCost,
        financedBuyTotalCost
      )
    };
  }

  // Recomendação baseada no menor impacto financeiro real
  private getRecommendation(
    rent: number,
    cash: number,
    financed: number
  ): string {
    const min = Math.min(rent, cash, financed);

    if (min === rent)
      return 'Alugar é financeiramente mais vantajoso neste cenário.';

    if (min === cash)
      return 'Comprar à vista é a opção mais econômica no período analisado.';

    return 'Financiar apresentou o menor custo total (verifique as taxas).';
  }
}
