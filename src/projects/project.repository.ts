import { Project, Project_site } from './project.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {}

@EntityRepository(Project_site)
export class SiteRepository extends Repository<Project_site> {}
