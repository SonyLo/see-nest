import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";



interface RoleCreationAttrs {
	value: string,
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {

	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	declare id: number;

	@ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли пользователя' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string;

	@ApiProperty({ example: 'Администратор', description: 'Описание роли' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string;

	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}
