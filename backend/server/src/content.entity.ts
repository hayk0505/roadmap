
import { Table, Column, DataType, Model } from 'sequelize-typescript'

interface ContentCreation {
  id: number,
  name: string,
  content: string,
  parentId: number
}

@Table({tableName: 'content'})
export class Content extends Model<ContentCreation> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  id: number;

  @Column({ type: DataType.STRING, unique: false, })
  name: string;

  @Column({ type: DataType.TEXT('long'), unique: false, })
  content: string;

  @Column({ type: DataType.INTEGER, unique: false, })
  parentId: number;
}