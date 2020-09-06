// Dependencies
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Routes
import { routers } from './routes';

function App() {
  const app = express();

  function useRoutes() {
    routers.forEach(router => {
      app.use(router);
    });
  }

  function useMiddlewares() {
    app.use(express.json());
    app.use(morgan('common'));
    app.use(helmet());
    app.use(cors());
  }

  useMiddlewares();
  useRoutes();

  return app;
}

export default App();
