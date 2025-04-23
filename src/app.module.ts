import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from "sequelize";
import { User } from "./users/user.model";

@Module({
	controllers: [],
	providers: [],
	imports: [

		ConfigModule.forRoot({
			// envFilePath: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		SequelizeModule.forRoot({
			dialect: process.env.SEQUELIZE_DIALECT as Dialect,
			host: process.env.MARIABD_HOST,
			port: process.env.MARIABD_PORT ? parseInt(process.env.MARIABD_PORT) : 3306,
			username: process.env.MARIABD_USER,
			password: process.env.MARIABD_PASSWORD,
			database: process.env.MARIABD_DB,
			models: [User],
			autoLoadModels: true
		}),
		UsersModule,
	]
})
export class AppModule { }