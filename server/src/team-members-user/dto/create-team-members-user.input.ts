import { InputType, Field } from '@nestjs/graphql';
import { UpdateTeamInput } from 'src/teams/dto/update-team.input';
import { UserInput } from 'src/users/dto/user.input';

@InputType()
export class CreateTeamMembersUserInput {
  @Field(() => UserInput)
  user: UserInput;

  @Field(() => UpdateTeamInput)
  team: UpdateTeamInput;
}
