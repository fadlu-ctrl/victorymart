import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || "victorymart",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "12345",
  {
    host: process.env.DB_HOST || "victorymart-mysql", // <--- ini penting
    dialect: "mysql",
    timezone: "+07:00",
    logging: false,
  }
);

export { sequelize, DataTypes };
