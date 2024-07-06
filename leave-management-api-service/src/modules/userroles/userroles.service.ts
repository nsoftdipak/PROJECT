import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/shared/entities/userrole.entity';
import { User } from 'src/shared/entities/user.entity';
import { Role } from 'src/shared/entities/role.entity';
import { CreateUserroleDto } from './dto/create-userrole.dto';
import { UpdateUserroleDto } from './dto/update-userrole.dto';

@Injectable()
export class UserrolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userroleRepo: Repository<UserRole>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  // async create(createuserroletto:CreateUserroleDto): Promise<UserRole> {
  //   // const { user_ida, role_id, is_active } = createUserroleDto;

  //   const userId=1;
  //   const roleId=1;
  //   const user = await this.userRepo.findOne({ where: { id: userId } });
  //   const role = await this.roleRepo.findOne({ where: { id: roleId } });

  //   if (!user || !role) {
  //     throw new Error('User or Role not found');
  //   }

  //   const userrole = new UserRole();
  //   userrole.user = user;
  //   userrole.role = role;
  //   userrole.is_active = true;
  //   userrole.created_by = user; // Assuming the user who is creating is the same as the created_by
  //   userrole.updated_by = user; // Assuming the user who is creating is the same as the updated_by
  //   userrole.created_at = new Date();
  //   userrole.updated_at = new Date();

  //   return await this.userroleRepo.save(userrole);
  // }



  async create(createUserroleDto: CreateUserroleDto): Promise<UserRole> {
    try {
      console.log('Create method called with data:', createUserroleDto);
  
      const { user_id, role_id, is_active = true } = createUserroleDto;
  
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      const role = await this.roleRepo.findOne({ where: { id: role_id } });
  
      if (!user || !role) {
        throw new NotFoundException('User or Role not found');
      }
  
      const userrole = new UserRole();
      userrole.user = user;
      userrole.role = role;
      userrole.is_active = is_active;
      userrole.created_by = user; // Assuming the user who is creating is the same as the created_by
      userrole.updated_by = user; // Assuming the user who is creating is the same as the updated_by
      userrole.created_at = new Date();
      userrole.updated_at = new Date();
  
      return await this.userroleRepo.save(userrole);
    } catch (error) {
      console.error('Error occurred during user role creation:', error);
      throw error; // Rethrow the error to propagate it up to the controller
    }
  }
  

  async update(id: number, updateUserroleDto: UpdateUserroleDto): Promise<UserRole> {
    const userrole = await this.userroleRepo.findOne({ where: { id } });

    if (!userrole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }

    if (updateUserroleDto.user_id) {
      const user = await this.userRepo.findOne({ where: { id: updateUserroleDto.user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateUserroleDto.user_id} not found`);
      }
      userrole.user = user;
    }

    if (updateUserroleDto.role_id) {
      const role = await this.roleRepo.findOne({ where: { id: updateUserroleDto.role_id } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${updateUserroleDto.role_id} not found`);
      }
      userrole.role = role;
    }

    if (updateUserroleDto.is_active !== undefined) {
      userrole.is_active = updateUserroleDto.is_active;
    }

    if (updateUserroleDto.created_by) {
      const createdBy = await this.userRepo.findOne({ where: { id: updateUserroleDto.created_by } });
      if (!createdBy) {
        throw new NotFoundException(`User with ID ${updateUserroleDto.created_by} not found`);
      }
      userrole.created_by = createdBy;
    }

    if (updateUserroleDto.updated_by) {
      const updatedBy = await this.userRepo.findOne({ where: { id: updateUserroleDto.updated_by } });
      if (!updatedBy) {
        throw new NotFoundException(`User with ID ${updateUserroleDto.updated_by} not found`);
      }
      userrole.updated_by = updatedBy;
    }

    userrole.updated_at = new Date();

    return await this.userroleRepo.save(userrole);
  }


















  async findAll(): Promise<UserRole[]> {
    return await this.userroleRepo.find({ relations: ['user', 'role'] });
  }

  async findOne(id: number): Promise<UserRole> {
    return await this.userroleRepo.findOne({ where: { id }, relations: ['user', 'role'] });
  }

 
  async remove(id: number): Promise<void> {
    await this.userroleRepo.delete(id);
  }
}
