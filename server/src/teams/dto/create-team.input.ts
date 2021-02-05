import { InputType, Field, GraphQLTimestamp, Int } from '@nestjs/graphql';
import { CreateTeamMembersUserInput } from '../../team-members-user/dto/create-team-members-user.input';
import { CategoryInput } from '../../category/dto/category.input';
import { SkillInput } from '../../skill/dto/skill.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateTeamInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field(() => [SkillInput])
  skills?: SkillInput[];

  @Field()
  owner: ConnectUserInput;

  @Field(() => [CreateTeamMembersUserInput])
  members: CreateTeamMembersUserInput[];

  @Field(() => [CategoryInput])
  categories: CategoryInput[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => Int)
  recruitNumbers: number;

  @Field()
  isRequired: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt: Date;
}
