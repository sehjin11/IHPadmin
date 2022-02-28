import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('통합관리자 API')
    .setDescription('IHP 통합관리자 API 문서입니다.')
    .setVersion('1.0.0')
    .addCookieAuth(
      'auth-cookie',
      {
        type: 'http',
        in: 'header',
        scheme: 'Bearer',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
