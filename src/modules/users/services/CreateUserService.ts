import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(){
    
  }
}

export default CreateUserService;
