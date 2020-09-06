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

  async function create(request: Request, response: Response) {
    const { body = {} } = request;
    const {
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched = false,
      isBeingWatched = false,
    } = body;

    const queryCommandColumns =
      'title, synopsis, release_date, categories, ' +
      'has_been_watched, is_being_watched';

    const queryCommand =
      `INSERT INTO movie(${queryCommandColumns})` +
      'VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

    const values = [
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched,
      isBeingWatched,
    ];

    const { rows } = await connection.query(queryCommand, values);

    return response?.json({
      ok: true,
      data: rows,
      error: null,
    });
  }

  return {
    getAll,
    create,
  };
}

export default MovieController();
