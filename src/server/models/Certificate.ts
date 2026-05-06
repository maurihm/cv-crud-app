import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CertificateAttributes {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CertificateCreationAttributes extends Optional<CertificateAttributes, 'id'> {}

class Certificate extends Model<CertificateAttributes, CertificateCreationAttributes> implements CertificateAttributes {
  public id!: number;
  public name!: string;
  public issuer!: string;
  public issueDate!: string;
  public expiryDate?: string;
  public credentialUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Certificate.init(
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
    issuer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    credentialUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'certificates',
    timestamps: true,
  },
);

export default Certificate;
