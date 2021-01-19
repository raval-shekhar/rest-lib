import { Request, Response } from 'express';
import Joi from 'joi';
import { ApiRouter, MapRoutes, Methods } from 'src';

const loginController = async (req: Request, res: Response): Promise<any> => {
  return res.send('Ok')
}

const authRoutes: ApiRouter[] = [
  {
    path: '/login',
    method: Methods.POST,
    controller: loginController,
    validator: {
      body: {
        name: Joi.string().required(),
      }
    }
  }
];

export const AuthRoutes = MapRoutes(authRoutes);