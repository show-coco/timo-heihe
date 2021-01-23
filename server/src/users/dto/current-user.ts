import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Payload } from 'src/auth/types/payload';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Payload => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().user;
  },
);
