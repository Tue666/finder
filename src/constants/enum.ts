import { registerEnumType } from '@nestjs/graphql';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
registerEnumType(GenderEnum, {
  name: 'GenderEnum',
});
export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
export enum PermissionEnum {
  FULL = 'FULL',

  READ_PRODUCT = 'READ_PRODUCT',
}
registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});

export enum MessageType {
  IMAGE = 'Image',
  TEXT = 'Text',
}
registerEnumType(MessageType, {
  name: 'MessageType',
});

export enum RegisterType {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  NORMAL = 'Normal',
}
registerEnumType(RegisterType, {
  name: 'RegisterType',
});
