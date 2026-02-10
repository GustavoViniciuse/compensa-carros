import { Request, Response } from 'express';
import { ComparisonService } from '../services/ComparisonService';

export class SimulationController {
  
  handle(req: Request, res: Response) {
    try {
      const { carValue, monthlyRent, interestRate, loanTerm, downPayment } = req.body;

      if (!carValue || !monthlyRent || !loanTerm) {
        return res.status(400).json({ error: "Campos obrigatórios" });
      }

      const service = new ComparisonService();
      
      const result = service.compare({
        carValue: Number(carValue),
        monthlyRent: Number(monthlyRent),
        interestRate: Number(interestRate || 1.5),
        loanTerm: Number(loanTerm),
        downPayment: Number(downPayment || 0)
      });

      return res.json(result);

    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor de cálculo." });
    }
  }
}