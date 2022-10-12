import { EntitySchema } from 'typeorm';
import { Content } from './content.entity';



export const UserSchema = new EntitySchema<Content>({
  name: 'User',
  target: Content,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    sectionName: {
      type: String,
    },
    subsectionName: {
      type: String,
    },
    content: {
        type: String,
      },
    
  },
  relations: {
  
  },
});