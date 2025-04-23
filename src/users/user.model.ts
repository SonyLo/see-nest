import { Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";



interface UsersCreationAttrs {
	email: string,
	pass: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	declare id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	pass: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@Column({ type: DataType.STRING, unique: true, allowNull: true })
	banReason: string;
}
