import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		SequelizeModule.forRoot({
			dialect: 'mariadb',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '',
			database: 'nest',
			models: [],
			autoLoadModels: true
		}),
	]
})
export class AppModule { }