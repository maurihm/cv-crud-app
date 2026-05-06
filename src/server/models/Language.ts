import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface LanguageAttributes {
  id: number;
  name: string;
  proficiency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LanguageCreationAttributes extends Optional<LanguageAttributes, 'id'> {}

class Language extends Model<LanguageAttributes, LanguageCreationAttributes> implements LanguageAttributes {
  public id!: number;
  public name!: string;
  public proficiency!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proficiency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'languages',
    timestamps: true,
  },
);

export default Language;
