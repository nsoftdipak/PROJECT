import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  occasion: string;

  @Column()
  occasion_date: Date;

  @ManyToOne(() => Location, (location) => location.holidays)
  @JoinColumn({ name: 'location' })
  location: Location;

  @Column()
  is_optional: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}


// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Location } from './location.entity';
// import { User } from './user.entity';

// @Entity('holidays')
// export class Holiday {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 300 })
//   occasion: string;

//   @Column()
//   occasion_date: Date;

//   @ManyToOne(() => Location, (location) => location.holidays, { eager: true })
//   @JoinColumn({ name: 'location' })
//   location: Location;

//   @Column()
//   is_optional: boolean;

//   @ManyToOne(() => User, { eager: true })
//   @JoinColumn({ name: 'created_by' })
//   created_by: User;

//   @ManyToOne(() => User, { eager: true })
//   @JoinColumn({ name: 'updated_by' })
//   updated_by: User;

//   @Column({ type: 'timestamp' })
//   created_at: Date;

//   @Column({ type: 'timestamp' })
//   updated_at: Date;
// }

