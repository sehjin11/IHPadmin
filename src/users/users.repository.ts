import { Users, Watches } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}

@EntityRepository(Watches)
export class WatchesRepository extends Repository<Watches> {}
