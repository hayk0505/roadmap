
import { DataTypes } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript'

interface ContentCration {
  id: number;
  sectionName: string;
  subsectionName: string;
  Content: string;
}

@Table({tableName: 'content'})
export class Content extends Model<ContentCration> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  id: number;

  @Column({ type: DataType.STRING, unique: false, })
  sectionName: string;

  @Column({ type: DataType.STRING, unique: false, })
  subsectionName: string;

  @Column({ type: DataType.TEXT('long'), unique: false, })
  content: string;

  @Column({ type: DataType.INTEGER, unique: false, })
  parentId: number;
}