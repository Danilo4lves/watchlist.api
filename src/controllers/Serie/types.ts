// Dependencies
import { Request, Response } from 'express';

// Types
import { RequestSuccessfullInterface } from '../../infra/types';

export interface SerieInterface {
  title: string;
  synopsis: string;
  releaseDate: string;
  categories: string[];
  hasBeenWatched: boolean;
  isBeingWatched: boolean;
  totalSeasons: number;
  totalEpisodes: number;
}

export interface SerieControllerInterface {
  getAll(
    request: Request,
    response: Response,
  ): Promise<Response<RequestSuccessfullInterface<SerieInterface[]>>>;
  create(
    request: Request,
    response: Response,
  ): Promise<Response<RequestSuccessfullInterface<SerieInterface>>>;
  update(
    request: Request,
    response: Response,
  ): Promise<Response<RequestSuccessfullInterface<SerieInterface>>>;
}
