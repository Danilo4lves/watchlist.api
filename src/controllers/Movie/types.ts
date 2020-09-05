// Dependencies
import { Request, Response } from 'express';

// Types
import { RequestSuccessfullInterface } from '../../infra/types';

export interface MovieInterface {
    title: string;
    synopsis: string;
    releaseDate: string;
    categories: string[];
    hasBeenWatched: boolean;
    isBeingWatched: boolean;
};

export interface MovieControllerInterface {
    getAll(request: Request, response: Response): Promise<Response<RequestSuccessfullInterface<MovieInterface[]>>>;
}