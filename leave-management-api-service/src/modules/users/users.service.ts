import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/shared/entities/location.entity';
import { Company } from 'src/shared/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
    @InjectRepository(Company)
    private readonly comapnyRepo:Repository<Company>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log("Received data on backend:", createUserDto);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

  
    const location = await this.locationRepo.findOne({ where: { id: createUserDto.location_id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${createUserDto.location_id} not found`);
    }
  
    const createdByUser = await this.userRepository.findOne({ where: { id: createUserDto.created_by } });
  
    const userdata = new User();
    userdata.first_name = createUserDto.first_name;
    userdata.last_name = createUserDto.last_name;
    userdata.email = createUserDto.email;
    userdata.mobile_no = createUserDto.mobile_no;
    userdata.country_code = createUserDto.country_code;
    userdata.is_active = createUserDto.is_active;
    userdata.location = location;
    userdata.date_of_joining = createUserDto.date_of_joining;
    userdata.created_by = createdByUser;
    userdata.updated_by = createdByUser;
    userdata.created_at = createUserDto.created_at;
    userdata.updated_at = createUserDto.updated_at;
  
    if (createUserDto.company) {

      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      const company = await this.comapnyRepo.findOne({ where: { id: createUserDto.company } });
      if (!company) {
        throw new NotFoundException(`Company with ID ${createUserDto.company} not found`);
      }

      console.log(company)
      userdata.company = company;
    }
  
    return this.userRepository.save(userdata);
  }
  

  async  getUserByCompanyId(adminId: number): Promise<User[]> {
    const admin = await this.userRepository.findOne({
      where: { id: adminId },
      relations: ['company'],
    });

    if (!admin || !admin.company) {
      throw new Error('Admin or admin company not found');
    }

    const companyId = admin.company.id;

    return await this.userRepository.find({
      where: { company: { id: companyId } },
      relations: ['company', 'userCompanies'],
    });
  }

  async getUserById(id: string): Promise<any> {
    const userId = parseInt(id, 10);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.first_name) user.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name) user.last_name = updateUserDto.last_name;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.mobile_no) user.mobile_no = updateUserDto.mobile_no;
    if (updateUserDto.country_code) user.country_code = updateUserDto.country_code;
    if (updateUserDto.is_active !== undefined) user.is_active = updateUserDto.is_active;

    if (updateUserDto.location_id) {
      const location = await this.locationRepo.findOne({ where: { id: updateUserDto.location_id } });
      if (!location) {
        throw new NotFoundException(`Location with ID ${updateUserDto.location_id} not found`);
      }
      user.location = location;
    }

    if (updateUserDto.date_of_joining) user.date_of_joining = updateUserDto.date_of_joining;

    if (updateUserDto.created_by) {
      const createdByUser = await this.userRepository.findOne({ where: { id: updateUserDto.created_by } });
      if (!createdByUser) {
        throw new NotFoundException(`User with ID ${updateUserDto.created_by} not found`);
      }
      user.created_by = createdByUser;
    }

    if (updateUserDto.updated_by) {
      const updatedByUser = await this.userRepository.findOne({ where: { id: updateUserDto.updated_by } });
      if (!updatedByUser) {
        throw new NotFoundException(`User with ID ${updateUserDto.updated_by} not found`);
      }
      user.updated_by = updatedByUser;
    }

    if (updateUserDto.created_at) user.created_at = updateUserDto.created_at;
    if (updateUserDto.updated_at) user.updated_at = updateUserDto.updated_at;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAdminUsers(): Promise<{ id: number, first_name: string, last_name: string }[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userRoles', 'userRole')
      .leftJoin('userRole.role', 'role')
      .where('role.name = :roleName', { roleName: 'admin' })
      .select(['user.id', 'user.first_name', 'user.last_name'])
      .getMany();

    return users;
  }


  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('user.email = :email', { email })
      .getOne();
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user;
  }
}






