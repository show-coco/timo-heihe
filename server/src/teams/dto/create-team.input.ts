import { InputType, Field } from '@nestjs/graphql';
import { CreateTeamMembersUserInput } from '../../team-members-user/dto/create-team-members-user.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateTeamInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  owner: ConnectUserInput;

  @Field(() => [CreateTeamMembersUserInput])
  members: CreateTeamMembersUserInput[];

  @Field({ nullable: true })
  rectuiting: boolean;
}
