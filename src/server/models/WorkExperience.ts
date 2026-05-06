import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface WorkExperienceAttributes {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WorkExperienceCreationAttributes extends Optional<WorkExperienceAttributes, 'id'> {}

class WorkExperience extends Model<WorkExperienceAttributes, WorkExperienceCreationAttributes> implements WorkExperienceAttributes {
  public id!: number;
  public company!: string;
  public position!: string;
  public startDate!: string;
  public endDate!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkExperience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
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
    tableName: 'work_experience',
    timestamps: true,
  },
);

export default WorkExperience;
