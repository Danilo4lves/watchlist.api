// Dependencies
import { Router } from 'express';

// Controller
import { SerieController } from '../../controllers';

export const SerieRouter = Router();

SerieRouter.get('/serie', SerieController?.getAll);
SerieRouter.post('/serie', SerieController?.create);
SerieRouter.put('/serie/:id', SerieController?.update);
SerieRouter.delete('/serie/:id', SerieController?.remove);
