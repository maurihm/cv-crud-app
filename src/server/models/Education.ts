import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EducationAttributes {
  id: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EducationCreationAttributes extends Optional<EducationAttributes, 'id'> {}

class Education extends Model<EducationAttributes, EducationCreationAttributes> implements EducationAttributes {
  public id!: number;
  public school!: string;
  public degree!: string;
  public fieldOfStudy!: string;
  public startDate!: string;
  public endDate!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Education.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fieldOfStudy: {
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
    tableName: 'education',
    timestamps: true,
  },
);

export default Education;
