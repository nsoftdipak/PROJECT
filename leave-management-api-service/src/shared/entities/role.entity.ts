import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './userrole.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.role, { cascade: true })
  userRoles: UserRole[];
}
