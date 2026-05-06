import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface HeaderAttributes {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HeaderCreationAttributes extends Optional<HeaderAttributes, 'id'> {}

class Header extends Model<HeaderAttributes, HeaderCreationAttributes> implements HeaderAttributes {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public phone!: string;
  public location!: string;
  public about!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Header.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'headers',
    timestamps: true,
  },
);

export default Header;
