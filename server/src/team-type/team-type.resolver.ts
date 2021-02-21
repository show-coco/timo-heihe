import { Query, Resolver } from '@nestjs/graphql';
import { TeamTypeModel } from './models/team-type.model';
import { TeamTypeService } from './team-type.service';

@Resolver()
export class TeamTypeResolver {
  constructor(private teamTypeService: TeamTypeService) {}

  @Query(() => [TeamTypeModel])
  teamTypes() {
    return this.teamTypeService.findAll();
  }
}
