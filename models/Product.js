// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const { DECIMAL } = require('sequelize/lib/data-types');
const dataTypes = require('sequelize/lib/data-types');
const { INTEGER } = require('sequelize');
const Category = require('./Category');
const { NUMERIC } = require('sequelize');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  static newCategory(body, model) {
    return models.Category.create({
      category_id: body.category_id,
      category_name: body.category_name
    }).then(()=> {
    return Category.findAll({
      where: {
        id: body.category_id
      }
    });
  });
  }

}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull:false,
      validator: DECIMAL
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:10,
      validator:NUMERIC
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model:"category",
        key:"id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
