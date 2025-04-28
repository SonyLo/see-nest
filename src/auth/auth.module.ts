import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
	imports: [
		// UsersModule,
		forwardRef(() => UsersModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('PRIVATE_KEY') || 'SECRET',
				signOptions: {
					expiresIn: '24h',
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [JwtModule, AuthService]

})
export class AuthModule { }
