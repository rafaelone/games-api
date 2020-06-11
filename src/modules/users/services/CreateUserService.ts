import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Users from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  account_name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    account_name,
    email,
    password,
  }: IRequest): Promise<Users> {
    const checkExistsUserWithSameAccount = await this.userRepository.findByAccountName(
      account_name,
    );

    if (checkExistsUserWithSameAccount) {
      throw new AppError('Account name already used!', 400);
    }

    const checkExistsUserWithSameEmail = await this.userRepository.findByEmail(
      email,
    );

    if (checkExistsUserWithSameEmail) {
      throw new AppError('E-mail already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      account_name,
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
