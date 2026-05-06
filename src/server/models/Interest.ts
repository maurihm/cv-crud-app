import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InterestAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface InterestCreationAttributes extends Optional<InterestAttributes, 'id'> {}

class Interest extends Model<InterestAttributes, InterestCreationAttributes> implements InterestAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Interest.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'interests',
    timestamps: true,
  },
);

export default Interest;
