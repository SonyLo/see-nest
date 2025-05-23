import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';


@Injectable()
export class AuthService {

	constructor(private userService: UsersService, private jwtService: JwtService) { }


	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
		// throw new Error('Method not implemented.');
	}


	async registration(userDto: CreateUserDto) {

		const candidate = await this.userService.getUserByEmail(userDto.email)

		if (candidate) throw new HttpException('Пользователь с таким емейл существует', HttpStatus.BAD_REQUEST)

		const hashPassword = await bcrypt.hash(userDto.password, 5)

		const user = await this.userService.createUser({ ...userDto, password: hashPassword })

		return this.generateToken(user)
	}

	private async generateToken(user: User) {
		const payload = { email: user.dataValues.email, id: user.dataValues.id, roles: user.roles }

		return {
			token: this.jwtService.sign(payload)
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)
		if (!user) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
		const passwordEquals = await bcrypt.compare(userDto.password, user.dataValues.password)
		if (!passwordEquals) throw new HttpException('Указан неверный пароль', HttpStatus.BAD_REQUEST)
		return user

	}


}
