import { Exclude } from 'class-transformer';
import { Item } from '../items/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
