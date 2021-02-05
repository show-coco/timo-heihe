import { Field, InputType, Int } from '@nestjs/graphql';
import { SkillInput } from '../../skill/dto/skill.input';

@InputType()
export class ConnectUserInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  introduction: string;

  @Field({ nullable: true })
  githubId: string;

  @Field({ nullable: true })
  twitterId: string;

  @Field(() => [SkillInput], { nullable: true })
  skills?: SkillInput[];
}
