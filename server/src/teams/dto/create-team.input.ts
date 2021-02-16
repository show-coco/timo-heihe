import { InputType, Field, Int } from '@nestjs/graphql';
import { CategoryInput } from 'src/category/dto/category.input';
import { SkillInput } from 'src/skill/dto/skill.input';
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

  @Field(() => [SkillInput])
  skills?: SkillInput[];

  @Field(() => [CategoryInput])
  categories: CategoryInput[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => Int)
  recruitNumbers: number;

  @Field()
  isRequired: boolean;
}
