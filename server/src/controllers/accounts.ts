import { NextFunction, Request, Response } from 'express';
import { HttpException } from 'src/exceptions/exception';
import * as AccountsService from 'src/services/accounts';
import logger from 'src/services/logger';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page as string);
    const perPage = Number(req.query.perPage as string);
    const field = req.query.field as string | undefined;
    const value = req.query.value as string | undefined;
    const accountsData = await AccountsService.listAccounts({ page, perPage, field, value });
    const documents = accountsData.revisions.map((rev) => rev.document);
    return res.status(200).json(documents);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const count = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const field = req.query.field as string | undefined;
    const value = req.query.value as string | undefined;
    const data = await AccountsService.countAccounts({ field, value });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    logger.error(err);
    next(err);
  }
};

export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newAccount = await AccountsService.addAccount(data);
    return res.status(200).json(newAccount);
  } catch (err) {
    if (err instanceof HttpException && err.status === 400) {
      return res.status(err.status).send({ status: err.status, message: err.message });
    }
    logger.error(err);
    next(err);
  }
};
