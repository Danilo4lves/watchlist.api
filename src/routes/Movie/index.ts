// Dependencies
import { Router } from 'express';

// Controller
import { MovieController } from '../../controllers';

export const MovieRouter = Router();

MovieRouter.get('/movie', MovieController?.getAll);
MovieRouter.post('/movie', MovieController?.create);
