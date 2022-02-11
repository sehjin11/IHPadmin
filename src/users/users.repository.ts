import { User, Watches } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}

@EntityRepository(Watches)
export class WatchesRepository extends Repository<Watches> {}
