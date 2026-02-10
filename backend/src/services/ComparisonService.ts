export interface SimulationInput {
  carValue: number;
  monthlyRent: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

// CUSTO DE PROPRIEDADE
const ANNUAL_DEPRECIATION = 0.06; // 6% MÉDIA DE DESVALORIZAÇÃO DO VEICULO

// Custos anuais do carro:
const RATE_IPVA = 0.03;        // 3% MÉDIA DO IPVA
const RATE_INSURANCE = 0.03;   // 3% MÉDIA DO SEGURO
const RATE_MAINTENANCE = 0.01; // 1% MÉDIA DA REVISÃO

// Custo Total de Propriedade ao Ano = 7% do valor do carro
const TOTAL_OWNERSHIP_RATE = RATE_IPVA + RATE_INSURANCE + RATE_MAINTENANCE;

export class ComparisonService {

  public compare(data: SimulationInput) {
    const { carValue, monthlyRent, interestRate, loanTerm, downPayment } = data;
    const years = loanTerm / 12;

    //CÁLCULO DO FUTURO VALOR DO CARRO
    const futureCarValue = carValue * Math.pow(1 - ANNUAL_DEPRECIATION, years);


    //CÁLCULO DOS CUSTOS DE PROPRIEDADE (IPVA, SEGURO, ETC)
    const avgCarValue = (carValue + futureCarValue) / 2;

    //CUSTO TOTAL DO VEICULO
    const totalOwnershipCost = avgCarValue * TOTAL_OWNERSHIP_RATE * years;

    //CUSTO MENSAL PARA MANTER O CARRO
    const monthlyOwnershipCost = totalOwnershipCost / loanTerm;


    //CENÁRIO 1: ALUGUEL
    const rentTotalPaid = monthlyRent * loanTerm;

    const rentScenario = {
      label: "Aluguel",
      initialPayment: 0,
      monthlyPayment: monthlyRent,
      totalOutOfPocket: rentTotalPaid,
      futureAssetValue: 0,
      finalEconomicCost: rentTotalPaid
    };


    //CENÁRIO 2: COMPRA À VISTA
    const cashTotalPaid = carValue + totalOwnershipCost;

    const cashScenario = {
      label: "Compra à Vista",
      initialPayment: carValue,
      monthlyPayment: monthlyOwnershipCost,
      totalOutOfPocket: cashTotalPaid,
      futureAssetValue: futureCarValue,
      finalEconomicCost: cashTotalPaid - futureCarValue
    };


    //CENÁRIO 3: FINANCIAMENTO
    const loanAmount = carValue - downPayment;
    const monthlyInterestRate = interestRate / 100;

    //CALCULO DA PARCELA MENSAL DO FINANCIAMENTO, FORMULA PRICE
    const bankInstallment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

    const totalBankPaid = bankInstallment * loanTerm;

    //TOTAL GASTO: Entrada + Parcelas Banco + Custos
    const financedTotalPaid = downPayment + totalBankPaid + totalOwnershipCost;

    const financedScenario = {
      label: "Financiamento",
      initialPayment: downPayment,
      monthlyPayment: bankInstallment + monthlyOwnershipCost,
      totalOutOfPocket: financedTotalPaid,
      futureAssetValue: futureCarValue,
      finalEconomicCost: financedTotalPaid - futureCarValue
    };

    return {
      months: loanTerm,
      scenarios: {
        rent: rentScenario,
        cash: cashScenario,
        financed: financedScenario
      },
      bestChoice: this.getRecommendation(rentScenario.finalEconomicCost, cashScenario.finalEconomicCost, financedScenario.finalEconomicCost)
    };
  }

  private getRecommendation(rent: number, cash: number, financed: number): string {
    const min = Math.min(rent, cash, financed);

    if (min === rent) return 'Alugar o veiculo é a opção mais econômica nesse caso.';
    if (min === cash) return 'Comprar à vista é a melhor opção nesse caso.';
    return 'Financiar vale a pena nesse caso.';
  }
}