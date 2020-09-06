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
      totalSeasons,
      totalEpisodes,
    } = body;

    const { rows = [] } = await connection.query(
      `DELETE FROM serie WHERE id=${id} RETURNING *`,
    );

    const [deletedMovie] = rows;

    if (!deletedMovie) {
      return response.status(400).json({
        ok: false,
        data: null,
        error: {
          code: 400,
          message: 'Serie was not found',
        },
      });
    }

    const queryCommandColumns =
      'id, title, synopsis, release_date, categories, ' +
      'has_been_watched, is_being_watched, total_seasons, total_episodes';

    const queryCommand =
      `INSERT INTO serie (${queryCommandColumns})` +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
      'RETURNING *';

    const values = [
      id,
      title,
      synopsis,
      releaseDate,
      categories,
      hasBeenWatched,
      isBeingWatched,
      totalSeasons,
      totalEpisodes,
    ];

    const { rows: serieRows = [] } = await connection.query(
      queryCommand,
      values,
    );

    const [newSerie] = serieRows;

    return response.json({
      ok: true,
      data: newSerie,
      error: null,
    });
  }

  async function remove(request: Request, response: Response) {
    const { params = {} } = request;
    const { id } = params;

    const { rows = [] } = await connection.query(
      `DELETE FROM serie WHERE id=${id} RETURNING *`,
    );

    const [deletedSerie] = rows;

    if (!deletedSerie) {
      return response.status(400).json({
        ok: false,
        data: null,
        error: {
          code: 400,
          message: 'Serie was not found',
        },
      });
    }

    return response.json({
      ok: true,
      data: deletedSerie,
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

export default SerieController();
