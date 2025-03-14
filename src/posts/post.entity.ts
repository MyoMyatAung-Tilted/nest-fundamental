import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PostType } from './enums/post-type.enum';
import { Status } from './enums/status.enum';
import { MetaOption } from '../meta-options/meta-option.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 512, nullable: false })
  title: string;
  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.post,
  })
  postType: PostType;
  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  slug: string;
  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.draft,
  })
  status: Status;
  @Column({ type: 'text', nullable: true })
  content?: string;
  @Column({ type: 'text', nullable: true })
  schema?: string;
  @Column({ type: 'varchar', length: 1024, nullable: true })
  featureImageUrl?: string;
  @Column({ type: 'timestamp' /** 'datetime' in MySQL */, nullable: true })
  publishOn?: Date;
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags?: Tag[];
  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  metaOption?: MetaOption;
}
