import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Holiday } from './holiday.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => User, (user) => user.location, { cascade: true })
  users: User[];

  @OneToMany(() => Holiday, (holiday) => holiday.location, { cascade: true })
  holidays: Holiday[];
}


// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { User } from './user.entity';
// import { Holiday } from './holiday.entity';

// @Entity('locations')
// export class Location {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 200 })
//   name: string;

//   @Column()
//   is_active: boolean;

//   @OneToMany(() => User, (user) => user.location, { cascade: true })
//   users: User[];

//   @OneToMany(() => Holiday, (holiday) => holiday.location, { cascade: true })
//   holidays: Holiday[];
// }

