import { EntityRepository, Repository } from 'typeorm';
import { Watch } from './entity/watch.entity';
import { Watch_history } from './entity/watch_history.entity';

@EntityRepository(Watch)
export class WatchRepository extends Repository<Watch> {}

@EntityRepository(Watch_history)
export class WatchHistoryRepository extends Repository<Watch_history> {}
