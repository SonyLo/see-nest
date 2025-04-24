import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";



interface UsersCreationAttrs {
	email: string,
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {

	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	declare id: number;

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: 'pass', description: 'Пароль' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: true, description: 'Забанен или нет' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({ example: 'За что то', description: 'Причина бана' })
	@Column({ type: DataType.STRING, unique: true, allowNull: true })
	banReason: string;
}
