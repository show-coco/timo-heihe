import { InputType, Field } from '@nestjs/graphql';
import { UpdateTeamInput } from '../../teams/dto/update-team.input';
import { UserInput } from '../../users/dto/user.input';

@InputType()
export class CreateTeamMembersUserInput {
  @Field(() => UserInput)
  user: UserInput;

  @Field(() => UpdateTeamInput, { nullable: true })
  team: UpdateTeamInput;
}
