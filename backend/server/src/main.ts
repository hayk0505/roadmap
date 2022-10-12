import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // app.enableCors(
  //   { 
  //     origin: ["http://localhost:4200/"],
  //     //methods: ["GET", "POST"],
  //     //allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //     credentials: true,
  //   }
  // );
}
bootstrap();