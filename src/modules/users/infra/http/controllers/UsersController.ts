import { Request, Response } from 'express';
import {container  } from "tsyringe"

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {name, email, password} = req.body;
    // const createUser = container.resolve()

  }
}
