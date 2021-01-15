import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  introduction: string;

  @Column()
  twitter_id: string;

  @Column()
  github_id: string;
}
