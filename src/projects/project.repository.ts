import { Project_manager } from './entity/project_manager.entity';
import { Project } from './entity/project.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Project_site } from './entity/project_site.entity';
import { Project_user } from './entity/project_user.entity';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {}

@EntityRepository(Project_site)
export class SiteRepository extends Repository<Project_site> {}

@EntityRepository(Project_manager)
export class ManagerRepository extends Repository<Project_manager> {}

@EntityRepository(Project_user)
export class UserRepository extends Repository<Project_user> {}
