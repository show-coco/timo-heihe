import { InputType, Field, Int } from '@nestjs/graphql';
import { CategoryInput } from '../../category/dto/category.input';
import { SkillInput } from '../../skill/dto/skill.input';
import { CreateRoomMembersUserInput } from '../../room-members-user/dto/create-room-members-user.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateRoomInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  owner: ConnectUserInput;

  @Field(() => [CreateRoomMembersUserInput])
  members: CreateRoomMembersUserInput[];

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

  @Field(() => [Int])
  typeIds: number[];
}
