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

    return {
        getAll
    };
}

export default SerieController();