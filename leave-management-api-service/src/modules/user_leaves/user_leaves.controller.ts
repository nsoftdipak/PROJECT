import { Controller, Post, Body, Put, Param, Get, Patch, Delete, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserLeavesService } from './user_leaves.service';
import { CreateUserLeafDto } from './dto/create-user_leaf.dto';
import { UpdateUserLeafDto } from './dto/update-user_leaf.dto';

@Controller('user-leaves')
export class UserLeavesController {
  constructor(private readonly userLeavesService: UserLeavesService) {}

  @Post()
  async create(@Body() createUserLeafDto: CreateUserLeafDto) {
    console.log(createUserLeafDto)
    console.log("Request received: Create User Leave, User ID:", createUserLeafDto.assignedToId);
    console.log("Request received: Create User Leave, User ID:", createUserLeafDto.leaveTypeId);

    return this.userLeavesService.create(createUserLeafDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserLeafDto: UpdateUserLeafDto) {
    return await this.userLeavesService.update(id, updateUserLeafDto);
  }

  @Get('todaysLeave')
  findAll() {
    return this.userLeavesService.findTodaysApprovedLeaves();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeavesService.remove(+id);
  }

  @Get('pending')
  findPendingLeaves(): Promise<any[]> {
    return this.userLeavesService.findPendingLeaves();
  }



  @Get('pending-all')
  findAllPendingLeaves(@Query('status') status: string): Promise<any[]> {
    console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
    if (!status) {
      throw new NotFoundException('Status query parameter is required');
    }
    return this.userLeavesService.findLeavesByStatus(status);
  }


  
  @Get('leaves-by-status')
  async findPendingAdminLeaves(
    @Query('status') status: string,
    @Query('managerId') managerId: string
  ): Promise<any[]> {
    // Convert managerId to a number
    const mid = parseInt(managerId, 10);

    // Check if the conversion to number is valid
    if (isNaN(mid)) {
      throw new BadRequestException('Invalid manager ID');
    }

    // Call the service method to fetch pending leaves
    return this.userLeavesService.findPendingAdminLeaves(status, mid);
  }

  @Patch(':id/status/:status')
  async updateLeaveStatus(
    @Param('id') id: number,
    @Param('status') status: string,
    @Query('message') message?: string, // Use @Query to get the query parameter
  ): Promise<void> {
    console.log("Request received: Update Leave Status, ID:", id, "Status:", status, "message",message);
    await this.userLeavesService.updateLeaveStatus(id, status, message);
  }


  @Get(':userId')
  async getAllLeaves(@Param('userId') userId: number): Promise<any[]> {
    return await this.userLeavesService.getUserLeave(userId);
  }



  @Get()
  findLeavesByStatusAndUser(@Query('status') status: string, @Query('userId') userId: number): Promise<any[]> {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    if (!status || !userId) {
      throw new NotFoundException('Status and userId query parameters are required');
    }
    return this.userLeavesService.findLeavesByStatusAndUser(status, userId);
  }
}
