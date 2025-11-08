import { sequelize, DataTypes } from "./model.js";
const Product = sequelize.define('products', {
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    gambar: DataTypes.STRING
});
export default Product;