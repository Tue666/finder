/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Schema } from 'mongoose';
import { Address, ControlWhoSeesYou, ControlWhoYouSee, DiscoverySettings, GeoLocation, MatchRequest, MySetting, Reports, User } from '../entities/user.entities';
export declare const GeoLocationSchema: Schema<GeoLocation, Model<GeoLocation, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GeoLocation>;
export declare const MatchRequestSchema: Schema<MatchRequest, Model<MatchRequest, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MatchRequest>;
export declare const DiscoverySettingsSchema: Schema<DiscoverySettings, Model<DiscoverySettings, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DiscoverySettings>;
export declare const ControlWhoSeesYouSchema: Schema<ControlWhoSeesYou, Model<ControlWhoSeesYou, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ControlWhoSeesYou>;
export declare const ControlWhoYouSeeSchema: Schema<ControlWhoYouSee, Model<ControlWhoYouSee, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ControlWhoYouSee>;
export declare const AddressSchema: Schema<Address, Model<Address, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Address>;
export declare const MySettingSchema: Schema<MySetting, Model<MySetting, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MySetting>;
export declare const ReportsSchema: Schema<Reports, Model<Reports, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reports>;
export type UserModelType = Model<User>;
export declare const UserSchema: Schema<User, Model<User, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User>;
