import { InputType, Field } from '@nestjs/graphql';
import { UpdateTeamInput } from '../../teams/dto/update-team.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateTeamMembersUserInput {
  @Field(() => ConnectUserInput)
  user: ConnectUserInput;

  @Field(() => UpdateTeamInput, { nullable: true })
  team: UpdateTeamInput;
}
