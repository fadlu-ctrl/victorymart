import { sequelize,DataTypes } from './model.js';
const Admin = sequelize.define('admins',{
    username: DataTypes.STRING,
    email : DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.TINYINT
}, {
    timestamps: false // Tambahkan opsi ini untuk menonaktifkan kolom timestamp
});
export default Admin;