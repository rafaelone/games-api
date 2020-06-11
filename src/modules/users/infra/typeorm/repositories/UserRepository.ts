import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Users from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByAccountName(
    account_name: string,
  ): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        account_name,
      },
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
