import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/sequelize';
import { Content } from './content.entity';

@Controller('content')
export class AppController {
  constructor(
    private readonly appService: AppService,
@InjectModel(Content) private nameName: typeof Content) {}
  @Post('create')
  async create(@Body() content: Content): Promise<Content> {
    if (content.parentId.toString() == '') {
      content.parentId = null;
    }
    const res = await this.nameName.create(content);
    return res as any;
  }
  @Get(['getContent'])
  async getHello(): Promise<Content> {
    const res = await this.nameName.findAll();
    return res as any;
  }

  @Get(['getContentByName'])
  async getContentByName(): Promise<Content> {
    const res = await this.nameName.findAll({
      attributes: ['name', 'id', 'parentId']
    });
    return res as any;
  }
}
