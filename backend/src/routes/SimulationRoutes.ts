import { Router } from 'express';
import { SimulationController } from '../controllers/SimulationController';

const router = Router();
const controller = new SimulationController();

router.post('/calculate', controller.handle);

export { router };