/* eslint-disable prettier/prettier */
// user.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  async createUser(newUser) {
    const { username } = newUser;

    if (this.users.some((user) => user.username === username)) {
      throw new ConflictException('Username already exists');
    }

    this.users.push(newUser);
    return { message: 'User created', user: newUser };
  }

  async updateUser(username: string, updatedData) {
    console.log(updatedData);

    const userIndex = this.users.findIndex(
      (user) => user.username === username,
    );

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    if (updatedData.username && updatedData.username !== username) {
      if (this.users.some((user) => user.username === updatedData.username)) {
        throw new ConflictException('Username already exists');
      }
    }

    const updatedUser = { ...this.users[userIndex], ...updatedData };
    this.users[userIndex] = updatedUser;

    return { message: `User updated at ${userIndex}`, user: updatedUser };
  }

  async deleteUser(username: string) {
    const userIndex = this.users.findIndex(
      (user) => user.username === username,
    );

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);

    return { message: 'User deleted' };
  }

  async searchUser(query: any) {
    let filteredUsers = this.users;
    console.log(query);

    if (query.username) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.includes(query.username),
      );
    }
    if (query.fullname) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullname.includes(query.fullname),
      );
    }
    if (query.role) {
      filteredUsers = filteredUsers.filter((user) =>
        user.role.includes(query.role),
      );
    }
    if (query.activeYn) {
      filteredUsers = filteredUsers.filter(
        (user) => user.activeYn === query.activeYn,
      );
    }

    return filteredUsers;
  }
}
