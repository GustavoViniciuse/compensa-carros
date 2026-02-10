export interface SimulationPayload {
  carValue: number;
  monthlyRent: number;
  interestRate: number;
  loanTerm: number;
  downPayment?: number;
}

export interface ScenarioMetrics {
  label: string;
  initialPayment: number;    
  monthlyPayment: number;   
  totalOutOfPocket: number;  
  futureAssetValue: number;  
  finalEconomicCost: number; 
}

export interface SimulationResult {
  months: number;
  bestChoice: string;       
  scenarios: {
    rent: ScenarioMetrics;
    cash: ScenarioMetrics;
    financed: ScenarioMetrics;
  };
}