import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async refresh(refreshToken: string) {
    const isValid = await this.jwtService.verifyRefresh(refreshToken);
    if (!isValid) {
      throw new BadRequestException('Invalid refresh token');
    }

    const { accessToken } = await this.jwtService.sign({
      userId: isValid.userId,
    });

    return { accessToken };
  }

  public async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.jwtService.sign({ userId: user.id });

    delete user.password;
    return { user, tokens };
  }

  public async register(body: RegisterDto) {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await this.userService.create({
      ...body,
      password: hashedPassword,
    });

    const token = await this.jwtService.sign({ userId: newUser.id });

    delete newUser.password;
    return { user: newUser, token };
  }
}
