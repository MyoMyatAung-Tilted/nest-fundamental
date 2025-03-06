import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/post-type.enum';
import { Status } from './enums/status.enum';
import { MetaOption } from '../meta-options/meta-option.entity';

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
  tags?: string[];
  @OneToOne(() => MetaOption)
  @JoinColumn()
  metaOption?: MetaOption;
}
