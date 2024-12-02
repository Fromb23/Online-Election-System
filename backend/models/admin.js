module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define('Admin', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
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
