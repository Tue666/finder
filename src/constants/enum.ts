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

export enum FilterByDate {
  SEVEN_DAYS_AGO = 'SEVEN_DAYS_AGO',
  THIRTY_DAYS_AGO = 'THIRTY_DAYS_AGO',
  THIS_YEAR = 'THIS_YEAR',
  LAST_YEAR = 'LAST_YEAR',
}
registerEnumType(FilterByDate, {
  name: 'FilterByDate',
});

export enum SortOption {
  AZ = 'AZ',
  ZA = 'ZA',
  AGE = 'AGE',
}
registerEnumType(SortOption, {
  name: 'SortOption',
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

export enum LookingFor {
  MEN = 'Men',
  WOMEN = 'Women',
  ALL = 'All',
}
registerEnumType(LookingFor, {
  name: 'LookingFor',
});

export enum StatusActive {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}
registerEnumType(StatusActive, {
  name: 'StatusActive',
});

export enum TagType {
  INTERESTED = 'Interested',
  LIFE_STYLE = 'Life_style',
  EDUCATION = 'Education',
  PETS = 'Pets',
  DIETARY_PREFERENCE = 'Dietary_Preference',
  PERSONALITY_TYPE = 'Personality_Type',
  ZODIAC = 'Zodiac',
  SMOKE_QUESTION = 'Smoke_question',
}
registerEnumType(TagType, {
  name: 'TagType',
});
