import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, account_name } = req.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      account_name,
      email,
      name,
      password,
    });

    return res.json(classToClass(user));
  }
}
