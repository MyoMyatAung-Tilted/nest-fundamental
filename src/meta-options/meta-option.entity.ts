import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'json', nullable: false })
  metaValue: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => Post, (post) => post.metaOption, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: Post;
}
