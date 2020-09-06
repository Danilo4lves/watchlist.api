// Dependencies
import { Request, Response } from 'express';

// Database
import { connection } from '../../database';

// Types
import { MovieControllerInterface } from './types';

function MovieController(): MovieControllerInterface {
  async function getAll(request: Request, response: Response) {
    const { rows } = await connection.query('SELECT * FROM movie');

    return response?.json({
      ok: true,
      data: rows,
      error: null,
    });
  }

  return {
    getAll,
  };
}

export default MovieController();
