import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByAccountName(accountName: string): Promise<User | undefined>;
  create({
    name,
    email,
    password,
    account_name,
  }: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
