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

  async function update(request: Request, response: Response) {
    const { params = {}, body = {} } = request;
    const { id } = params;
    const {
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched = false,
      isBeingWatched = false,
    } = body;

    const { rows = [] } = await connection.query(
      `DELETE FROM movie WHERE id=${id} RETURNING *`,
    );

    const [movie] = rows;

    if (!movie) {
      return response.status(400).json({
        ok: false,
        error: {
          code: 400,
          message: 'Movie was not found',
        },
      });
    }

    const queryCommandColumns =
      'id, title, synopsis, release_date, categories, has_been_watched, is_being_watched';

    const queryCommand =
      `INSERT INTO movie (${queryCommandColumns})` +
      'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    const values = [
      id,
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched,
      isBeingWatched,
    ];

    const { rows: movieRows = [] } = await connection.query(
      queryCommand,
      values,
    );

    const [newMovie] = movieRows;

    return response.json({
      ok: true,
      data: newMovie,
      error: null,
    });
  }

  async function remove(request: Request, response: Response) {
    const { params = {} } = request;
    const { id } = params;

    const { rows = [] } = await connection.query(
      `DELETE FROM movie WHERE id=${id} RETURNING *`,
    );

    const [removedMovie] = rows;

    if (!removedMovie) {
      return response.status(400).json({
        ok: false,
        data: null,
        error: {
          code: 400,
          message: 'Movie was not found',
        },
      });
    }

    return response.json({
      ok: true,
      data: removedMovie,
      error: null,
    });
  }

  return {
    getAll,
    create,
    update,
    remove,
  };
}

export default MovieController();
