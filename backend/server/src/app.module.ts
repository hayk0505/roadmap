import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Content } from './content.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'frontend',
      password: 'Frontend1*',
      database: 'frontend_roadmap',
      models: [Content],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Content])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
