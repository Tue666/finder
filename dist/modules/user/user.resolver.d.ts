import { PaginationInput } from '../common/dto/common.dto';
import { FilterGetAllUser, FilterStatisticUser, MySettingInput, UpdateUserInput } from './dto/create-user.dto';
import { Address, User, UserResult } from './entities/user.entities';
import { UserHelper } from './helper/user.helper';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    private userHelper;
    constructor(userService: UserService, userHelper: UserHelper);
    updateProfile(user: User, input: UpdateUserInput): Promise<boolean>;
    changeSetting(user: User, input: MySettingInput): Promise<boolean>;
    skipUser(user_id: string, user: User): Promise<boolean>;
    unSkipUser(user_id: string, user: User): Promise<boolean>;
    likeUser(user_id: string, user: User): Promise<boolean>;
    unlikeUser(user_id: string, user: User): Promise<boolean>;
    reportUser(reasonReport: string, user_id: string, user: User): Promise<boolean>;
    confirmBlockUser(user_id: string): Promise<boolean>;
    declineBlockUser(user_id: string): Promise<boolean>;
    getAllReportsUser(pagination: PaginationInput): Promise<UserResult>;
    statisticUser(pagination: PaginationInput, filter: FilterStatisticUser): Promise<UserResult>;
    createMultiUser(): Promise<boolean>;
    getCurrentAddress(user: User): Promise<Address>;
    getAllUser(pagination: PaginationInput, filter: FilterGetAllUser): Promise<UserResult>;
}
