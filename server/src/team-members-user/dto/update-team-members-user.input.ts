import { CreateTeamMembersUserInput } from './create-team-members-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamMembersUserInput extends PartialType(
  CreateTeamMembersUserInput,
) {
  @Field(() => Int)
  id: number;
}
