import { Projects } from './projects.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {}
