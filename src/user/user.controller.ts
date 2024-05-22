// user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: any) {
    console.log(newUser);
    return this.userService.createUser(newUser);
  }

  @Patch(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updatedData: any,
  ) {
    return this.userService.updateUser(username, updatedData);
  }

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }

  @Get()
  async searchUser(@Query() query: any) {
    return this.userService.searchUser(query);
  }
}
