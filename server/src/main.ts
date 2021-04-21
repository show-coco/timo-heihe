import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      'https://timo-heihe-git-feature-deploy-show-coco.vercel.app',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
