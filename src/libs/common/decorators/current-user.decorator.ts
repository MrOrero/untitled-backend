// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { UserResponse__Output } from 'src/libs/hcmatrixV3.0-proto/src/package/authenticationPackage/UserResponse';

// export const getCurrentUserByContext = (
//   context: ExecutionContext,
// ): UserResponse__Output => {
//   if (context.getType() === 'http') {
//     return context.switchToHttp().getRequest().user;
//   }
// };

// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext) =>
//     getCurrentUserByContext(context),
// );
