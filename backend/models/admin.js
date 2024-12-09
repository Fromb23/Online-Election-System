module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define('Admin', {
		adminId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		tableName: 'admins',
		timestamps: true,
	});

	return Admin;
};
