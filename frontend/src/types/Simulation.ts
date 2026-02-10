export interface SimulationResult {
  scenario: {
    months: number;
    finalCarValue: number;
  };
  results: {
    rent: { totalCost: number; monthlyAvg: number };
    cashBuy: { totalCost: number; monthlyAvg: number };
    financedBuy: { totalCost: number; monthlyAvg: number; installmentValue: number };
  };
  recommendation: string;
}

export interface SimulationPayload {
  carValue: number;
  monthlyRent: number;
  interestRate: number;
  loanTerm: number;
  downPayment?: number;
}