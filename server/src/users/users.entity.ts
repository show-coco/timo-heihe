import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  github_id: string;

  @Column({ nullable: true })
  twitter_id: string;
}
