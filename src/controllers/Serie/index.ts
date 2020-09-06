// Dependencies
import { Request, Response } from 'express';

// Database
import { connection } from '../../database';

// Types
import { SerieControllerInterface } from './types';

function SerieController(): SerieControllerInterface {
  async function getAll(request: Request, response: Response) {
    const { rows } = await connection?.query('SELECT * FROM serie');

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
      totalSeasons,
      totalEpisodes,
    } = body;

    const queryCommandColumns =
      'title, synopsis, release_date, categories, ' +
      'has_been_watched, is_being_watched, total_seasons, total_episodes';

    const queryCommand =
      `INSERT INTO serie (${queryCommandColumns})` +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const values = [
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched,
      isBeingWatched,
      totalSeasons,
      totalEpisodes,
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

export default SerieController();
