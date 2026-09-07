import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const user = await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Email o contraseña inválida');
    }

    const isPasswordValid = await this.userService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Email o contraseña inválida');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }
}
