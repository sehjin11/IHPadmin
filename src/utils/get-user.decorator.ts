import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//request에서 user 정보만
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
