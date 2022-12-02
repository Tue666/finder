"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappingDataSmokeQuestion = exports.mappingDataEducation = exports.mappingDataPets = exports.mappingDataDietaryPreference = exports.mappingDataPersonalityType = exports.mappingDataZodiac = exports.mappingDataPassion = exports.mappingData = void 0;
const enum_1 = require("../constants/enum");
const tag_entity_1 = require("../modules/tag/entities/tag.entity");
const user_entities_1 = require("../modules/user/entities/user.entities");
const string_utils_1 = require("../utils/string.utils");
function mappingData() {
    const obj = { data: { results: [] } };
    const results = obj.data.results;
    const users = [];
    results.map(item => {
        try {
            const user = new user_entities_1.User();
            user.images = [];
            const date = new Date(item.user.birth_date);
            if (date.toString() === 'Invalid Date') {
                return;
            }
            user.birthDays = new Date(item.user.birth_date);
            item.user.photos.forEach(image => {
                user.images.push(image.url);
            });
            user.username = item.user.name;
            user.aboutMe = item.user.bio;
            user.gender = enum_1.GenderEnum.FEMALE;
            user.registerType = enum_1.RegisterType.NORMAL;
            users.push(user);
        }
        catch (error) {
            return;
        }
    });
    return users;
}
exports.mappingData = mappingData;
function mappingDataPassion() {
    const passions = {
        meta: {
            status: 200,
        },
        data: {
            likes: {
                likes_remaining: 100,
            },
            offerings: {
                gold: {
                    purchase_type: 'subscription',
                    product_data: [
                        {
                            amount: 12,
                            offer_type: 'REGULAR',
                            refresh_interval: 12,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BEST_VALUE'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/gold/gold.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'gold_subscription_499_12m_2pd',
                                    discount: 65.5924071756362,
                                    require_zip: false,
                                    price: 731942,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 6,
                            offer_type: 'REGULAR',
                            refresh_interval: 6,
                            refresh_interval_unit: 'MONTH',
                            tags: ['PRIMARY', 'MOST_POPULAR'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/gold/gold.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'gold_subscription_499_6m_2pd',
                                    discount: 49.95828118481435,
                                    require_zip: false,
                                    price: 533382,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            refresh_interval: 1,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/gold/gold.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'gold_subscription_499_1m_2pd',
                                    discount: 0,
                                    require_zip: false,
                                    price: 173492,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {
                        data: {
                            superlike: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 5,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'WEEK',
                                },
                            },
                            boost: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 1,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'MONTH',
                                },
                            },
                            hide_ads: {
                                type: 'UNLIMITED',
                            },
                            hide_age: {
                                type: 'UNLIMITED',
                            },
                            hide_distance: {
                                type: 'UNLIMITED',
                            },
                            like: {
                                type: 'UNLIMITED',
                            },
                            control_who_sees_you: {
                                type: 'UNLIMITED',
                            },
                            passport: {
                                type: 'UNLIMITED',
                            },
                            rewind: {
                                type: 'UNLIMITED',
                            },
                            superboost_alc_access: {
                                type: 'UNLIMITED',
                            },
                            control_who_you_see: {
                                type: 'UNLIMITED',
                            },
                            toppicks: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 10,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'DAY',
                                },
                            },
                            toppicks_alc_access: {
                                type: 'UNLIMITED',
                            },
                            likes_you: {
                                type: 'UNLIMITED',
                            },
                        },
                        ordering: {
                            carousel: [
                                'likes_you',
                                'toppicks',
                                'like',
                                'boost',
                                'hide_age_and_distance',
                                'control_who_sees_you',
                                'passport',
                                'superlike',
                                'rewind',
                                'hide_ads',
                                'upsell_features',
                            ],
                            plus_screen: [
                                'like',
                                'boost',
                                'hide_age_and_distance',
                                'control_who_sees_you',
                                'passport',
                                'superlike',
                                'rewind',
                                'control_who_you_see',
                                'hide_ads',
                            ],
                        },
                        sub_page_data: {
                            cta: 'CÓ GIÁ TỪ {price}',
                            termed: false,
                            sections: [
                                {
                                    type: 'LIKES',
                                    heading: 'Nâng cấp lượt Thích',
                                    benefits: [
                                        {
                                            key: 'like',
                                            heading: 'Thích không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=like',
                                        },
                                        {
                                            key: 'likes_you',
                                            heading: 'Xem ai Thích bạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=likes_you',
                                        },
                                        {
                                            key: 'priority_likes',
                                            heading: 'Lượt Thích ưu tiên',
                                            description: 'Là hồ sơ đầu tiên được thấy bởi những người bạn Thích.',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=priority_likes',
                                        },
                                    ],
                                },
                                {
                                    type: 'ALC',
                                    heading: 'Nâng cấp trải nghiệm của bạn',
                                    benefits: [
                                        {
                                            key: 'rewind',
                                            heading: 'Quay lại không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=rewind',
                                        },
                                        {
                                            key: 'boost',
                                            heading: '1 lượt Tăng tốc miễn phí mỗi tháng',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=boost',
                                        },
                                        {
                                            key: 'superlike',
                                            heading: '5 lượt Siêu Thích miễn phí mỗi tuần',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=superlike',
                                        },
                                        {
                                            key: 'superlike_attach_message',
                                            heading: 'Nhắn tin trước khi tương hợp',
                                            description: 'Thêm lời nhắn gửi cùng lượt Siêu Thích của bạn.',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=superlike_attach_message',
                                        },
                                    ],
                                },
                                {
                                    type: 'DISCOVERY',
                                    heading: 'Tìm Kiếm Cao Cấp',
                                    benefits: [
                                        {
                                            key: 'passport',
                                            heading: 'Hộ chiếu',
                                            description: 'Tương hợp với các thành viên ở bất kỳ đâu trên thế giới.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=passport',
                                        },
                                    ],
                                },
                                {
                                    type: 'CONTROL',
                                    heading: 'Nắm quyền kiểm soát',
                                    benefits: [
                                        {
                                            key: 'hide_age_and_distance',
                                            heading: 'Kiểm soát Hồ sơ của bạn',
                                            description: 'Chỉ hiện những gì bạn muốn họ biết.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=hide_age_and_distance',
                                        },
                                        {
                                            key: 'control_who_sees_you',
                                            heading: 'Kiểm soát việc ai nhìn thấy bạn',
                                            description: 'Kiểm soát việc ai nhìn thấy bạn.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=control_who_sees_you',
                                        },
                                        {
                                            key: 'control_who_you_see',
                                            heading: 'Kiểm soát việc bạn nhìn thấy ai',
                                            description: 'Chọn mẫu người bạn muốn tương tác trên Tinder.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=like',
                                        },
                                        {
                                            key: 'hide_ads',
                                            heading: 'Ẩn quảng cáo',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=hide_ads',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                platinum: {
                    purchase_type: 'subscription',
                    product_data: [
                        {
                            amount: 12,
                            offer_type: 'REGULAR',
                            refresh_interval: 12,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BEST_VALUE'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/platinum/platinum.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'platinum_subscription_499_12m_2pd',
                                    discount: 66.64998888147655,
                                    require_zip: false,
                                    price: 1340032,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 6,
                            offer_type: 'REGULAR',
                            refresh_interval: 6,
                            refresh_interval_unit: 'MONTH',
                            tags: ['PRIMARY', 'MOST_POPULAR'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/platinum/platinum.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'platinum_subscription_499_6m_2pd',
                                    discount: 49.97776295307983,
                                    require_zip: false,
                                    price: 1004962,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            refresh_interval: 1,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/platinum/platinum.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'platinum_subscription_499_1m_2pd',
                                    discount: 0,
                                    require_zip: false,
                                    price: 334822,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {
                        data: {
                            superlike: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 5,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'WEEK',
                                },
                            },
                            boost: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 1,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'MONTH',
                                },
                            },
                            hide_ads: {
                                type: 'UNLIMITED',
                            },
                            hide_age: {
                                type: 'UNLIMITED',
                            },
                            hide_distance: {
                                type: 'UNLIMITED',
                            },
                            like: {
                                type: 'UNLIMITED',
                            },
                            control_who_sees_you: {
                                type: 'UNLIMITED',
                            },
                            passport: {
                                type: 'UNLIMITED',
                            },
                            rewind: {
                                type: 'UNLIMITED',
                            },
                            superboost_alc_access: {
                                type: 'UNLIMITED',
                            },
                            control_who_you_see: {
                                type: 'UNLIMITED',
                            },
                            toppicks: {
                                type: 'RENEWABLE',
                                renewal_data: {
                                    balance: 10,
                                    refresh_interval: 1,
                                    refresh_interval_unit: 'DAY',
                                },
                            },
                            toppicks_alc_access: {
                                type: 'UNLIMITED',
                            },
                            likes_you: {
                                type: 'UNLIMITED',
                            },
                            superlike_attach_message: {
                                type: 'UNLIMITED',
                            },
                            my_likes_lookback: {
                                type: 'UNLIMITED',
                                duration: 604800000,
                            },
                            priority_likes: {
                                type: 'UNLIMITED',
                            },
                        },
                        ordering: {
                            carousel: [
                                'superlike_attach_message',
                                'priority_likes',
                                'likes_you',
                                'upsell_features',
                            ],
                            plus_screen: [
                                'like',
                                'boost',
                                'hide_age_and_distance',
                                'control_who_sees_you',
                                'passport',
                                'superlike',
                                'rewind',
                                'control_who_you_see',
                                'hide_ads',
                            ],
                        },
                        sub_page_data: {
                            cta: 'CÓ GIÁ TỪ {price}',
                            termed: false,
                            sections: [
                                {
                                    type: 'LIKES',
                                    heading: 'Nâng cấp lượt Thích',
                                    benefits: [
                                        {
                                            key: 'like',
                                            heading: 'Thích không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'likes_you',
                                            heading: 'Xem ai Thích bạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=likes_you',
                                        },
                                        {
                                            key: 'priority_likes',
                                            heading: 'Lượt Thích ưu tiên',
                                            description: 'Là hồ sơ đầu tiên được thấy bởi những người bạn Thích.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=priority_likes',
                                        },
                                    ],
                                },
                                {
                                    type: 'ALC',
                                    heading: 'Nâng cấp trải nghiệm của bạn',
                                    benefits: [
                                        {
                                            key: 'rewind',
                                            heading: 'Quay lại không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'boost',
                                            heading: '1 lượt Tăng tốc miễn phí mỗi tháng',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'superlike',
                                            heading: '5 lượt Siêu Thích miễn phí mỗi tuần',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'superlike_attach_message',
                                            heading: 'Nhắn tin trước khi tương hợp',
                                            description: 'Thêm lời nhắn gửi cùng lượt Siêu Thích của bạn.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=superlike_attach_message',
                                        },
                                    ],
                                },
                                {
                                    type: 'DISCOVERY',
                                    heading: 'Tìm Kiếm Cao Cấp',
                                    benefits: [
                                        {
                                            key: 'passport',
                                            heading: 'Hộ chiếu',
                                            description: 'Tương hợp với các thành viên ở bất kỳ đâu trên thế giới.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                    ],
                                },
                                {
                                    type: 'CONTROL',
                                    heading: 'Nắm quyền kiểm soát',
                                    benefits: [
                                        {
                                            key: 'hide_age_and_distance',
                                            heading: 'Kiểm soát Hồ sơ của bạn',
                                            description: 'Chỉ hiện những gì bạn muốn họ biết.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'control_who_sees_you',
                                            heading: 'Kiểm soát việc ai nhìn thấy bạn',
                                            description: 'Kiểm soát việc ai nhìn thấy bạn.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'control_who_you_see',
                                            heading: 'Kiểm soát việc bạn nhìn thấy ai',
                                            description: 'Chọn mẫu người bạn muốn tương tác trên Tinder.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                        {
                                            key: 'hide_ads',
                                            heading: 'Ẩn quảng cáo',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=upsell_features',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                plus: {
                    purchase_type: 'subscription',
                    product_data: [
                        {
                            amount: 12,
                            offer_type: 'REGULAR',
                            refresh_interval: 12,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BEST_VALUE'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/plus/plus.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'plus_subscription_499_12m_2pd',
                                    discount: 66.61656646626585,
                                    require_zip: false,
                                    price: 446512,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 6,
                            offer_type: 'REGULAR',
                            refresh_interval: 6,
                            refresh_interval_unit: 'MONTH',
                            tags: ['PRIMARY', 'MOST_POPULAR'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/plus/plus.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'plus_subscription_499_6m_2pd',
                                    discount: 49.933199732798926,
                                    require_zip: false,
                                    price: 334822,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            refresh_interval: 1,
                            refresh_interval_unit: 'MONTH',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/plus/plus.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'plus_subscription_499_1m_2pd',
                                    discount: 0,
                                    require_zip: false,
                                    price: 111442,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {
                        data: {
                            hide_ads: {
                                type: 'UNLIMITED',
                            },
                            hide_age: {
                                type: 'UNLIMITED',
                            },
                            hide_distance: {
                                type: 'UNLIMITED',
                            },
                            like: {
                                type: 'UNLIMITED',
                            },
                            control_who_sees_you: {
                                type: 'UNLIMITED',
                            },
                            passport: {
                                type: 'UNLIMITED',
                            },
                            rewind: {
                                type: 'UNLIMITED',
                            },
                            superboost_alc_access: {
                                type: 'UNLIMITED',
                            },
                            control_who_you_see: {
                                type: 'UNLIMITED',
                            },
                        },
                        ordering: {
                            carousel: [
                                'like',
                                'hide_age_and_distance',
                                'control_who_sees_you',
                                'passport',
                                'rewind',
                                'hide_ads',
                            ],
                            plus_screen: [
                                'like',
                                'hide_age_and_distance',
                                'control_who_sees_you',
                                'passport',
                                'rewind',
                                'control_who_you_see',
                                'hide_ads',
                            ],
                        },
                        sub_page_data: {
                            cta: 'CÓ GIÁ TỪ {price}',
                            termed: false,
                            sections: [
                                {
                                    type: 'LIKES',
                                    heading: 'Nâng cấp lượt Thích',
                                    benefits: [
                                        {
                                            key: 'like',
                                            heading: 'Thích không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=like',
                                        },
                                        {
                                            key: 'likes_you',
                                            heading: 'Xem ai Thích bạn',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=likes_you',
                                        },
                                        {
                                            key: 'priority_likes',
                                            heading: 'Lượt Thích ưu tiên',
                                            description: 'Là hồ sơ đầu tiên được thấy bởi những người bạn Thích.',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=priority_likes',
                                        },
                                    ],
                                },
                                {
                                    type: 'ALC',
                                    heading: 'Nâng cấp trải nghiệm của bạn',
                                    benefits: [
                                        {
                                            key: 'rewind',
                                            heading: 'Quay lại không giới hạn',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=rewind',
                                        },
                                        {
                                            key: 'boost',
                                            heading: '1 lượt Tăng tốc miễn phí mỗi tháng',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=boost',
                                        },
                                        {
                                            key: 'superlike',
                                            heading: '5 lượt Siêu Thích miễn phí mỗi tuần',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=gold&feature=superlike',
                                        },
                                        {
                                            key: 'superlike_attach_message',
                                            heading: 'Nhắn tin trước khi tương hợp',
                                            description: 'Thêm lời nhắn gửi cùng lượt Siêu Thích của bạn.',
                                            included: false,
                                            deeplink: 'tinder://merchandising?tier=platinum&feature=superlike_attach_message',
                                        },
                                    ],
                                },
                                {
                                    type: 'DISCOVERY',
                                    heading: 'Tìm Kiếm Cao Cấp',
                                    benefits: [
                                        {
                                            key: 'passport',
                                            heading: 'Hộ chiếu',
                                            description: 'Tương hợp với các thành viên ở bất kỳ đâu trên thế giới.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=passport',
                                        },
                                    ],
                                },
                                {
                                    type: 'CONTROL',
                                    heading: 'Nắm quyền kiểm soát',
                                    benefits: [
                                        {
                                            key: 'hide_age_and_distance',
                                            heading: 'Kiểm soát Hồ sơ của bạn',
                                            description: 'Chỉ hiện những gì bạn muốn họ biết.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=hide_age_and_distance',
                                        },
                                        {
                                            key: 'control_who_sees_you',
                                            heading: 'Kiểm soát việc ai nhìn thấy bạn',
                                            description: 'Kiểm soát việc ai nhìn thấy bạn.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=control_who_sees_you',
                                        },
                                        {
                                            key: 'control_who_you_see',
                                            heading: 'Kiểm soát việc bạn nhìn thấy ai',
                                            description: 'Chọn mẫu người bạn muốn tương tác trên Tinder.',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=like',
                                        },
                                        {
                                            key: 'hide_ads',
                                            heading: 'Ẩn quảng cáo',
                                            included: true,
                                            deeplink: 'tinder://merchandising?tier=plus&feature=hide_ads',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                boost: {
                    purchase_type: 'consumable',
                    product_data: [
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/boost/boost_0.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'boost_consumable_599_1',
                                    discount: 0,
                                    require_zip: false,
                                    price: 123852,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 5,
                            offer_type: 'REGULAR',
                            tags: ['PRIMARY', 'MOST_POPULAR'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/boost/boost_1.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'boost_consumable_2499_5',
                                    discount: 16.56093489148582,
                                    require_zip: false,
                                    price: 558202,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 10,
                            offer_type: 'REGULAR',
                            tags: ['BEST_VALUE'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/boost/boost_2.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'boost_consumable_3999_10',
                                    discount: 33.23873121869783,
                                    require_zip: false,
                                    price: 893272,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {
                        upsell: 'gold',
                    },
                },
                readreceipt: {
                    purchase_type: 'consumable',
                    product_data: [
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/readreceipt/readreceipt_0.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'readreceipt_consumable_299_1',
                                    discount: 0,
                                    require_zip: false,
                                    price: 74212,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 5,
                            offer_type: 'REGULAR',
                            tags: ['PRIMARY'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/readreceipt/readreceipt_1.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'readreceipt_consumable_999_5',
                                    discount: 33.17725752508361,
                                    require_zip: false,
                                    price: 223132,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 20,
                            offer_type: 'REGULAR',
                            tags: [],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/readreceipt/readreceipt_2.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'readreceipt_consumable_1999_20',
                                    discount: 66.57190635451505,
                                    require_zip: false,
                                    price: 446512,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {},
                },
                superboost: {
                    purchase_type: 'consumable',
                    product_data: [
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            tags: ['BASE_GROUP'],
                            duration: 10800000,
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superboost/superboost_10800000.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superboost_consumable_3999_1',
                                    discount: 0,
                                    require_zip: false,
                                    price: 893272,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            tags: ['PRIMARY', 'MOST_POPULAR'],
                            duration: 21600000,
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superboost/superboost_21600000.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superboost_consumable_6999_1',
                                    discount: 12.490622655663921,
                                    require_zip: false,
                                    price: 1563412,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 1,
                            offer_type: 'REGULAR',
                            tags: ['BEST_VALUE'],
                            duration: 43200000,
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superboost/superboost_43200000.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superboost_consumable_12999_1',
                                    discount: 18.73593398349587,
                                    require_zip: false,
                                    price: 2903692,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {},
                },
                superlike: {
                    purchase_type: 'consumable',
                    product_data: [
                        {
                            amount: 3,
                            offer_type: 'REGULAR',
                            tags: ['BASE_GROUP'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superlike/superlike_0.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superlike_consumable_999_3',
                                    discount: 0,
                                    require_zip: false,
                                    price: 223132,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 15,
                            offer_type: 'REGULAR',
                            tags: ['PRIMARY'],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superlike/superlike_1.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superlike_consumable_3899_15',
                                    discount: 21.941941941941938,
                                    require_zip: false,
                                    price: 868452,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                        {
                            amount: 30,
                            offer_type: 'REGULAR',
                            tags: [],
                            icon_url: 'https://images-ssl.gotinder.com/product_images/superlike/superlike_2.png',
                            payment_methods: [
                                {
                                    platform: 'credit_card',
                                    sku_id: 'superlike_consumable_5999_30',
                                    discount: 39.949949949949946,
                                    require_zip: false,
                                    price: 1340032,
                                    is_vat: false,
                                    tax_rate: 0,
                                    currency: 'VND',
                                },
                            ],
                        },
                    ],
                    merchandising: {
                        upsell: 'gold',
                    },
                },
            },
            plus_control: {},
            purchase: {
                purchases: [],
                subscription_expired: false,
            },
            user: {
                _id: '6227f86982f22c01000cf60c',
                age_filter_max: 27,
                age_filter_min: 18,
                birth_date: '2001-08-02T00:00:00.000Z',
                create_date: '2022-03-09T00:44:25.553Z',
                crm_id: 'd3b9d2ba5db7ddb8695aa2a743d2b0d077961f3d',
                pos_info: {
                    country: {
                        name: 'Vietnam',
                        cc: 'VN',
                        alpha3: 'VNM',
                    },
                    timezone: 'Asia/Ho_Chi_Minh',
                },
                discoverable: true,
                distance_filter: 14,
                global_mode: {
                    is_enabled: false,
                    display_language: 'vi',
                    language_preferences: [
                        {
                            language: 'vi',
                            is_selected: true,
                        },
                        {
                            language: 'en',
                            is_selected: true,
                        },
                    ],
                },
                auto_expansion: {
                    age_toggle: true,
                    distance_toggle: false,
                },
                gender: 0,
                gender_filter: 1,
                show_gender_on_profile: false,
                name: 'Giang',
                photos: [
                    {
                        id: '8bee8b2d-e6d1-424d-ab04-73f6d74095a1',
                        crop_info: {
                            processed_by_bullseye: true,
                            user_customized: false,
                        },
                        url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/original_8bee8b2d-e6d1-424d-ab04-73f6d74095a1.jpeg',
                        fbId: 'directupload',
                        processedFiles: [
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/640x800_75_8bee8b2d-e6d1-424d-ab04-73f6d74095a1.webp',
                                height: 800,
                                width: 640,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/320x400_75_8bee8b2d-e6d1-424d-ab04-73f6d74095a1.webp',
                                height: 400,
                                width: 320,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/172x216_75_8bee8b2d-e6d1-424d-ab04-73f6d74095a1.webp',
                                height: 216,
                                width: 172,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/84x106_75_8bee8b2d-e6d1-424d-ab04-73f6d74095a1.webp',
                                height: 106,
                                width: 84,
                            },
                        ],
                        assets: [],
                        media_type: 'image',
                    },
                    {
                        id: 'f1f5e813-01fd-41df-99f3-6aded29424a5',
                        crop_info: {
                            processed_by_bullseye: true,
                            user_customized: false,
                        },
                        url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/original_f1f5e813-01fd-41df-99f3-6aded29424a5.jpeg',
                        fbId: 'directupload',
                        processedFiles: [
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/640x800_75_f1f5e813-01fd-41df-99f3-6aded29424a5.webp',
                                height: 800,
                                width: 640,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/320x400_75_f1f5e813-01fd-41df-99f3-6aded29424a5.webp',
                                height: 400,
                                width: 320,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/172x216_75_f1f5e813-01fd-41df-99f3-6aded29424a5.webp',
                                height: 216,
                                width: 172,
                            },
                            {
                                url: 'https://images-ssl.gotinder.com/6227f86982f22c01000cf60c/84x106_75_f1f5e813-01fd-41df-99f3-6aded29424a5.webp',
                                height: 106,
                                width: 84,
                            },
                        ],
                        assets: [],
                        media_type: 'image',
                    },
                ],
                photos_processing: false,
                photo_optimizer_enabled: true,
                ping_time: '2022-11-12T12:18:07.525Z',
                schools: [],
                badges: [
                    {
                        type: 'selfie_not_verified',
                    },
                ],
                phone_id: '84344329446',
                interested_in: [1],
                pos: {
                    lat: 11.084,
                    lon: 106.659,
                },
                billing_info: {
                    supported_payment_methods: [
                        'Mastercard',
                        'Visa',
                        'Diners',
                        'JCB',
                        'Discover',
                    ],
                },
                autoplay_video: 'always',
                top_picks_discoverable: true,
                photo_tagging_enabled: false,
                user_interests: {
                    selected_interests: [
                        {
                            id: 'it_2117',
                            name: 'Thể thao điện tử',
                        },
                        {
                            id: 'it_2',
                            name: 'Đi uống gì đó',
                        },
                        {
                            id: 'it_2122',
                            name: 'Sinh viên',
                        },
                    ],
                    available_interests: [
                        {
                            id: 'it_2033',
                            name: 'Thế Hệ 9x',
                        },
                        {
                            id: 'it_2275',
                            name: 'Harry Potter',
                        },
                        {
                            id: 'it_2396',
                            name: 'SoundCloud',
                        },
                        {
                            id: 'it_2397',
                            name: 'Spa',
                        },
                        {
                            id: 'it_2155',
                            name: 'Chăm sóc bản thân',
                        },
                        {
                            id: 'it_2276',
                            name: 'Heavy Metal',
                        },
                        {
                            id: 'it_2031',
                            name: 'Tiệc gia đình',
                        },
                        {
                            id: 'it_2152',
                            name: 'Gin Tonic',
                        },
                        {
                            id: 'it_2273',
                            name: 'Thể dục dụng cụ',
                        },
                        {
                            id: 'it_2279',
                            name: 'Hot Yoga',
                        },
                        {
                            id: 'it_2159',
                            name: 'Thiền',
                        },
                        {
                            id: 'it_2035',
                            name: 'Sushi',
                        },
                        {
                            id: 'it_2398',
                            name: 'Spotify',
                        },
                        {
                            id: 'it_2277',
                            name: 'Hockey',
                        },
                        {
                            id: 'it_2156',
                            name: 'Bóng rổ',
                        },
                        {
                            id: 'it_2036',
                            name: 'Đấu thơ',
                        },
                        {
                            id: 'it_2278',
                            name: 'Tập luyện tại nhà',
                        },
                        {
                            id: 'it_2157',
                            name: 'Nhà hát',
                        },
                        {
                            id: 'it_33',
                            name: 'Khám phá quán cafe',
                        },
                        {
                            id: 'it_36',
                            name: 'Thủy cung',
                        },
                        {
                            id: 'it_2039',
                            name: 'Giày Sneaker',
                        },
                        {
                            id: 'it_35',
                            name: 'Instagram',
                        },
                        {
                            id: 'it_30',
                            name: 'Suối nước nóng',
                        },
                        {
                            id: 'it_31',
                            name: 'Đi dạo',
                        },
                        {
                            id: 'it_4',
                            name: 'Chạy bộ',
                        },
                        {
                            id: 'it_7',
                            name: 'Du lịch',
                        },
                        {
                            id: 'it_6',
                            name: 'Giao lưu ngôn ngữ',
                        },
                        {
                            id: 'it_9',
                            name: 'Phim ảnh',
                        },
                        {
                            id: 'it_2271',
                            name: 'Chơi guitar',
                        },
                        {
                            id: 'it_2392',
                            name: 'Phát triển xã hội',
                        },
                        {
                            id: 'it_2272',
                            name: 'Tập gym',
                        },
                        {
                            id: 'it_2393',
                            name: 'Mạng xã hội',
                        },
                        {
                            id: 'it_2030',
                            name: 'Hip Hop',
                        },
                        {
                            id: 'it_2390',
                            name: 'Chăm sóc da',
                        },
                        {
                            id: 'it_2022',
                            name: 'J-Pop',
                        },
                        {
                            id: 'it_2386',
                            name: 'Shisha',
                        },
                        {
                            id: 'it_2023',
                            name: 'Cricket',
                        },
                        {
                            id: 'it_2020',
                            name: 'Phim truyền hình Hàn Quốc',
                        },
                        {
                            id: 'it_2262',
                            name: 'Làm việc tự do',
                        },
                        {
                            id: 'it_27',
                            name: 'K-Pop',
                        },
                        {
                            id: 'it_2389',
                            name: 'Trượt ván',
                        },
                        {
                            id: 'it_2268',
                            name: 'Gospel',
                        },
                        {
                            id: 'it_2269',
                            name: 'Group X',
                        },
                        {
                            id: 'it_2027',
                            name: 'Potterhead',
                        },
                        {
                            id: 'it_26',
                            name: 'Thử những thứ mới',
                        },
                        {
                            id: 'it_29',
                            name: 'Nhiếp ảnh',
                        },
                        {
                            id: 'it_2024',
                            name: 'Bollywood',
                        },
                        {
                            id: 'it_28',
                            name: 'Đọc sách',
                        },
                        {
                            id: 'it_2388',
                            name: 'Hát',
                        },
                        {
                            id: 'it_23',
                            name: 'Thể thao',
                        },
                        {
                            id: 'it_2028',
                            name: 'Thơ',
                        },
                        {
                            id: 'it_2029',
                            name: 'Hài độc thoại',
                        },
                        {
                            id: 'it_1',
                            name: 'Cafe',
                        },
                        {
                            id: 'it_3',
                            name: 'Karaoke',
                        },
                        {
                            id: 'it_2260',
                            name: 'Fortnite',
                        },
                        {
                            id: 'it_2261',
                            name: 'Lặn tự do',
                        },
                        {
                            id: 'it_2382',
                            name: 'Phát triển bản thân',
                        },
                        {
                            id: 'it_2055',
                            name: 'Nhận thức về sức khỏe tâm thần',
                        },
                        {
                            id: 'it_19',
                            name: 'Tour ẩm thực',
                        },
                        {
                            id: 'it_2053',
                            name: 'Quyền cử tri',
                        },
                        {
                            id: 'it_2295',
                            name: 'Jiu-jitsu',
                        },
                        {
                            id: 'it_2054',
                            name: 'Biến đổi khí hậu',
                        },
                        {
                            id: 'it_16',
                            name: 'Triển lãm trưng bày',
                        },
                        {
                            id: 'it_15',
                            name: 'Dắt chó đi dạo',
                        },
                        {
                            id: 'it_2057',
                            name: 'Quyền cho cộng đồng LGBTQ+',
                        },
                        {
                            id: 'it_2058',
                            name: 'Nữ quyền',
                        },
                        {
                            id: 'it_12',
                            name: 'Phòng thực tế ảo',
                        },
                        {
                            id: 'it_11',
                            name: 'Escape Café',
                        },
                        {
                            id: 'it_14',
                            name: 'Mua sắm',
                        },
                        {
                            id: 'it_10',
                            name: 'Bữa brunch',
                        },
                        {
                            id: 'it_2290',
                            name: 'Đầu tư',
                        },
                        {
                            id: 'it_2293',
                            name: 'Mô tô nước',
                        },
                        {
                            id: 'it_2172',
                            name: 'Dòng nhạc Reggaeton',
                        },
                        {
                            id: 'it_2051',
                            name: 'Quần áo second-hand',
                        },
                        {
                            id: 'it_2052',
                            name: 'Đấu tranh cho Người Da Đen',
                        },
                        {
                            id: 'it_2294',
                            name: 'Chạy bộ',
                        },
                        {
                            id: 'it_2050',
                            name: 'Phượt',
                        },
                        {
                            id: 'it_2171',
                            name: 'Thời trang Vintage',
                        },
                        {
                            id: 'it_2165',
                            name: 'Vũ điệu Vogue',
                        },
                        {
                            id: 'it_2166',
                            name: 'Du lịch Couchsurfing',
                        },
                        {
                            id: 'it_2163',
                            name: 'Happy Hour',
                        },
                        {
                            id: 'it_2285',
                            name: 'Sự hòa nhập',
                        },
                        {
                            id: 'it_2048',
                            name: 'Nhạc đồng quê',
                        },
                        {
                            id: 'it_2049',
                            name: 'Bóng đá',
                        },
                        {
                            id: 'it_2288',
                            name: 'Trượt patin',
                        },
                        {
                            id: 'it_2289',
                            name: 'Đầu tư',
                        },
                        {
                            id: 'it_2161',
                            name: 'Quần vợt',
                        },
                        {
                            id: 'it_2282',
                            name: 'Kem',
                        },
                        {
                            id: 'it_2283',
                            name: 'Trượt băng',
                        },
                        {
                            id: 'it_2280',
                            name: 'Quyền con người',
                        },
                        {
                            id: 'it_2160',
                            name: 'Triển lãm',
                        },
                        {
                            id: 'it_2352',
                            name: 'Lợn quay',
                        },
                        {
                            id: 'it_1021',
                            name: 'Trượt tuyết',
                        },
                        {
                            id: 'it_2232',
                            name: 'Chèo cano',
                        },
                        {
                            id: 'it_2111',
                            name: 'Nhạc kịch West End',
                        },
                        {
                            id: 'it_1022',
                            name: 'Trượt ván tuyết',
                        },
                        {
                            id: 'it_2353',
                            name: 'Pilates',
                        },
                        {
                            id: 'it_2351',
                            name: 'Năm môn phối hợp',
                        },
                        {
                            id: 'it_2230',
                            name: 'Sân khấu Broadway',
                        },
                        {
                            id: 'it_2356',
                            name: 'PlayStation',
                        },
                        {
                            id: 'it_2235',
                            name: 'Cheerleading',
                        },
                        {
                            id: 'it_2236',
                            name: 'Hợp xướng',
                        },
                        {
                            id: 'it_2357',
                            name: 'Múa cột',
                        },
                        {
                            id: 'it_2115',
                            name: 'Bóng đá mini',
                        },
                        {
                            id: 'it_2233',
                            name: 'Đua xe ô tô',
                        },
                        {
                            id: 'it_2354',
                            name: 'Pinterest',
                        },
                        {
                            id: 'it_1024',
                            name: 'Lễ hội',
                        },
                        {
                            id: 'it_2113',
                            name: 'Trò câu đố tại quán rượu',
                        },
                        {
                            id: 'it_2234',
                            name: 'Catan',
                        },
                        {
                            id: 'it_2239',
                            name: 'Cosplay',
                        },
                        {
                            id: 'it_2119',
                            name: 'Đua motor thể thao',
                        },
                        {
                            id: 'it_2237',
                            name: 'Quán cafe',
                        },
                        {
                            id: 'it_2117',
                            name: 'Thể thao điện tử',
                        },
                        {
                            id: 'it_2238',
                            name: 'Sáng tạo nội dung',
                        },
                        {
                            id: 'it_2220',
                            name: 'Đua xe đạp',
                        },
                        {
                            id: 'it_2221',
                            name: 'Cày TV show',
                        },
                        {
                            id: 'it_1011',
                            name: 'Sáng tác nhạc',
                        },
                        {
                            id: 'it_2224',
                            name: 'Body Combat',
                        },
                        {
                            id: 'it_1014',
                            name: 'Xăm hình',
                        },
                        {
                            id: 'it_2346',
                            name: 'Sơn',
                        },
                        {
                            id: 'it_2225',
                            name: 'Body Jam',
                        },
                        {
                            id: 'it_2343',
                            name: 'Chèo ván SUP',
                        },
                        {
                            id: 'it_2344',
                            name: 'Padel',
                        },
                        {
                            id: 'it_2223',
                            name: 'Blackpink',
                        },
                        {
                            id: 'it_1013',
                            name: 'Lướt sóng',
                        },
                        {
                            id: 'it_2228',
                            name: 'Chơi bowling',
                        },
                        {
                            id: 'it_2107',
                            name: 'Nhạc điện tử Grime',
                        },
                        {
                            id: 'it_2108',
                            name: 'Nhạc Pop UK thập niên 90',
                        },
                        {
                            id: 'it_2226',
                            name: 'Body Pump',
                        },
                        {
                            id: 'it_2106',
                            name: 'Bar bên bờ biển',
                        },
                        {
                            id: 'it_2227',
                            name: 'Body Step',
                        },
                        {
                            id: 'it_2348',
                            name: 'Dù lượn',
                        },
                        {
                            id: 'it_2109',
                            name: 'Upcycling',
                        },
                        {
                            id: 'it_2132',
                            name: 'V-Pop',
                        },
                        {
                            id: 'it_2253',
                            name: 'Sự bình đẳng',
                        },
                        {
                            id: 'it_2011',
                            name: 'Chiêm tinh',
                        },
                        {
                            id: 'it_2133',
                            name: 'Xe phân khối lớn',
                        },
                        {
                            id: 'it_2254',
                            name: 'Cưỡi ngựa',
                        },
                        {
                            id: 'it_2130',
                            name: 'Bún chả',
                        },
                        {
                            id: 'it_2251',
                            name: 'Khởi nghiệp',
                        },
                        {
                            id: 'it_2372',
                            name: 'Rượu Sake',
                        },
                        {
                            id: 'it_2131',
                            name: 'BTS',
                        },
                        {
                            id: 'it_2010',
                            name: 'Nấu ăn',
                        },
                        {
                            id: 'it_2252',
                            name: 'Bảo vệ môi trường',
                        },
                        {
                            id: 'it_2257',
                            name: 'Đấu kiếm',
                        },
                        {
                            id: 'it_2015',
                            name: 'Bóng đá',
                        },
                        {
                            id: 'it_2378',
                            name: 'Chơi saxophone',
                        },
                        {
                            id: 'it_2379',
                            name: 'Sci-Fi',
                        },
                        {
                            id: 'it_2016',
                            name: 'Nhảy',
                        },
                        {
                            id: 'it_2258',
                            name: 'Liên hoan phim',
                        },
                        {
                            id: 'it_2134',
                            name: 'Freeletics',
                        },
                        {
                            id: 'it_2013',
                            name: 'Làm vườn',
                        },
                        {
                            id: 'it_2135',
                            name: 'Đầu bếp nghiệp dư',
                        },
                        {
                            id: 'it_2256',
                            name: 'Chương trình du học trao đổi',
                        },
                        {
                            id: 'it_2377',
                            name: 'Đi Xông Hơi',
                        },
                        {
                            id: 'it_2014',
                            name: 'Nghệ thuật',
                        },
                        {
                            id: 'it_2019',
                            name: 'Chính trị',
                        },
                        {
                            id: 'it_2259',
                            name: 'Flamenco',
                        },
                        {
                            id: 'it_2017',
                            name: 'Bảo tàng',
                        },
                        {
                            id: 'it_2018',
                            name: 'Hoạt động xã hội',
                        },
                        {
                            id: 'it_2371',
                            name: 'Running Man',
                        },
                        {
                            id: 'it_2242',
                            name: 'Tổ chức tự trị phi tập trung',
                        },
                        {
                            id: 'it_2363',
                            name: 'Bất động sản',
                        },
                        {
                            id: 'it_2121',
                            name: 'Podcast',
                        },
                        {
                            id: 'it_2243',
                            name: 'Quyền cho người khuyết tật',
                        },
                        {
                            id: 'it_2361',
                            name: 'Rap Việt',
                        },
                        {
                            id: 'it_2362',
                            name: 'Đi quẩy',
                        },
                        {
                            id: 'it_2120',
                            name: 'Pimms',
                        },
                        {
                            id: 'it_2125',
                            name: 'BBQ',
                        },
                        {
                            id: 'it_2246',
                            name: 'Xem phim ngoài trời',
                        },
                        {
                            id: 'it_2367',
                            name: 'Leo núi đá',
                        },
                        {
                            id: 'it_2004',
                            name: 'Bia thủ công',
                        },
                        {
                            id: 'it_2126',
                            name: 'Trà đá',
                        },
                        {
                            id: 'it_2247',
                            name: 'Chơi trống',
                        },
                        {
                            id: 'it_2005',
                            name: 'Trà',
                        },
                        {
                            id: 'it_2002',
                            name: 'Board games',
                        },
                        {
                            id: 'it_2365',
                            name: 'Roblox',
                        },
                        {
                            id: 'it_2123',
                            name: 'Quán rượu',
                        },
                        {
                            id: 'it_2366',
                            name: 'Rock',
                        },
                        {
                            id: 'it_2124',
                            name: 'Vũ điệu Tango',
                        },
                        {
                            id: 'it_2245',
                            name: 'Vẽ',
                        },
                        {
                            id: 'it_2003',
                            name: 'Giải đố',
                        },
                        {
                            id: 'it_2129',
                            name: 'Phở',
                        },
                        {
                            id: 'it_2008',
                            name: 'Đi tình nguyện',
                        },
                        {
                            id: 'it_2009',
                            name: 'Môi trường',
                        },
                        {
                            id: 'it_2369',
                            name: 'Rollerskating',
                        },
                        {
                            id: 'it_2006',
                            name: 'Rượu',
                        },
                        {
                            id: 'it_2248',
                            name: 'Dungeons & Dragons',
                        },
                        {
                            id: 'it_2128',
                            name: 'Lẩu',
                        },
                        {
                            id: 'it_2007',
                            name: 'Làm video blog',
                        },
                        {
                            id: 'it_2249',
                            name: 'Nhạc EDM',
                        },
                        {
                            id: 'it_2360',
                            name: 'Mì ramen',
                        },
                        {
                            id: 'it_2430',
                            name: 'Nâng tạ',
                        },
                        {
                            id: 'it_2312',
                            name: 'Nhạc Live',
                        },
                        {
                            id: 'it_2433',
                            name: 'Viết',
                        },
                        {
                            id: 'it_2434',
                            name: 'Xbox',
                        },
                        {
                            id: 'it_2431',
                            name: 'Hòa bình cho thế giới',
                        },
                        {
                            id: 'it_2432',
                            name: 'Đấu vật',
                        },
                        {
                            id: 'it_2311',
                            name: 'Văn học',
                        },
                        {
                            id: 'it_2316',
                            name: 'Manga',
                        },
                        {
                            id: 'it_2437',
                            name: 'Tháng Tự hào',
                        },
                        {
                            id: 'it_2317',
                            name: 'Chạy marathon',
                        },
                        {
                            id: 'it_2314',
                            name: 'Trang điểm',
                        },
                        {
                            id: 'it_2435',
                            name: 'Trao quyền cho giới trẻ',
                        },
                        {
                            id: 'it_2436',
                            name: 'YouTube',
                        },
                        {
                            id: 'it_2318',
                            name: 'Võ thuật',
                        },
                        {
                            id: 'it_2319',
                            name: 'Marvel',
                        },
                        {
                            id: 'it_2422',
                            name: 'Nấu đồ chay',
                        },
                        {
                            id: 'it_2423',
                            name: 'Vermouth',
                        },
                        {
                            id: 'it_2302',
                            name: 'Đồ ăn Hàn Quốc',
                        },
                        {
                            id: 'it_2420',
                            name: 'Twitter',
                        },
                        {
                            id: 'it_2426',
                            name: 'Bóng chuyền',
                        },
                        {
                            id: 'it_2427',
                            name: 'Tour đi bộ',
                        },
                        {
                            id: 'it_2424',
                            name: 'Vinyasa',
                        },
                        {
                            id: 'it_2425',
                            name: 'Thực tế ảo',
                        },
                        {
                            id: 'it_2309',
                            name: 'Liên Minh Huyền Thoại',
                        },
                        {
                            id: 'it_2334',
                            name: 'NFT',
                        },
                        {
                            id: 'it_2213',
                            name: 'Khám phá quán bar',
                        },
                        {
                            id: 'it_2335',
                            name: 'Nintendo',
                        },
                        {
                            id: 'it_2214',
                            name: 'Bóng chày',
                        },
                        {
                            id: 'it_1001',
                            name: 'Tiệc tùng',
                        },
                        {
                            id: 'it_2211',
                            name: 'Múa ba lê',
                        },
                        {
                            id: 'it_2212',
                            name: 'Ban nhạc',
                        },
                        {
                            id: 'it_2338',
                            name: 'Game online',
                        },
                        {
                            id: 'it_2217',
                            name: 'Battle Ground',
                        },
                        {
                            id: 'it_2218',
                            name: 'Tennis bãi biển',
                        },
                        {
                            id: 'it_99',
                            name: 'Cuộc sống về đêm',
                        },
                        {
                            id: 'it_2339',
                            name: 'Mua sắm online',
                        },
                        {
                            id: 'it_1005',
                            name: 'Thuyền buồm',
                        },
                        {
                            id: 'it_2336',
                            name: 'Thể dục dụng cụ Olympic',
                        },
                        {
                            id: 'it_2215',
                            name: 'Chơi đàn bass',
                        },
                        {
                            id: 'it_2337',
                            name: 'Môi giới online',
                        },
                        {
                            id: 'it_94',
                            name: 'Quân đội',
                        },
                        {
                            id: 'it_2320',
                            name: 'Meme',
                        },
                        {
                            id: 'it_2202',
                            name: 'Among Us',
                        },
                        {
                            id: 'it_2323',
                            name: 'Đua xe máy',
                        },
                        {
                            id: 'it_2324',
                            name: 'Lái xe máy',
                        },
                        {
                            id: 'it_2321',
                            name: 'Metaverse',
                        },
                        {
                            id: 'it_2322',
                            name: 'Chánh niệm',
                        },
                        {
                            id: 'it_2201',
                            name: 'Acapella',
                        },
                        {
                            id: 'it_2327',
                            name: 'Nhạc cụ',
                        },
                        {
                            id: 'it_2206',
                            name: 'Triển lãm nghệ thuật',
                        },
                        {
                            id: 'it_2328',
                            name: 'Viết nhạc',
                        },
                        {
                            id: 'it_88',
                            name: 'Đi bộ đường trường',
                        },
                        {
                            id: 'it_2207',
                            name: 'Thể dục nghệ thuật',
                        },
                        {
                            id: 'it_2325',
                            name: 'Những ngọn núi',
                        },
                        {
                            id: 'it_2205',
                            name: 'Bắn cung',
                        },
                        {
                            id: 'it_2208',
                            name: 'Atari',
                        },
                        {
                            id: 'it_2209',
                            name: 'Phượt',
                        },
                        {
                            id: 'it_86',
                            name: 'Câu cá',
                        },
                        {
                            id: 'it_2075',
                            name: 'Đi quẩy',
                        },
                        {
                            id: 'it_2079',
                            name: 'Đồ ăn đường phố',
                        },
                        {
                            id: 'it_78',
                            name: 'Crossfit',
                        },
                        {
                            id: 'it_76',
                            name: 'Hòa nhạc',
                        },
                        {
                            id: 'it_75',
                            name: 'Leo núi',
                        },
                        {
                            id: 'it_70',
                            name: 'Nướng bánh',
                        },
                        {
                            id: 'it_72',
                            name: 'Cắm trại',
                        },
                        {
                            id: 'it_71',
                            name: 'Viết blog',
                        },
                        {
                            id: 'it_2070',
                            name: 'Sưu tập',
                        },
                        {
                            id: 'it_2072',
                            name: 'Xe hơi',
                        },
                        {
                            id: 'it_2066',
                            name: 'Khởi nghiệp',
                        },
                        {
                            id: 'it_2067',
                            name: 'Trà sữa',
                        },
                        {
                            id: 'it_2064',
                            name: 'Giải bóng chày trường cấp ba (Đài Loan)',
                        },
                        {
                            id: 'it_2069',
                            name: 'Cầu lông',
                        },
                        {
                            id: 'it_66',
                            name: 'Phong cách sống năng động',
                        },
                        {
                            id: 'it_63',
                            name: 'Thời trang',
                        },
                        {
                            id: 'it_62',
                            name: 'Anime',
                        },
                        {
                            id: 'it_2062',
                            name: 'NBA',
                        },
                        {
                            id: 'it_2063',
                            name: 'MLB (Liên đoàn bóng chày Mỹ)',
                        },
                        {
                            id: 'it_2099',
                            name: 'Nhạc Funk',
                        },
                        {
                            id: 'it_2097',
                            name: 'Cocktail Caipirinha',
                        },
                        {
                            id: 'it_59',
                            name: 'Các hoạt động trong nhà',
                        },
                        {
                            id: 'it_2410',
                            name: 'Tempeh',
                        },
                        {
                            id: 'it_56',
                            name: 'Tự làm mọi việc',
                        },
                        {
                            id: 'it_2416',
                            name: 'Các lễ hội trong thành phố',
                        },
                        {
                            id: 'it_55',
                            name: 'Đạp xe',
                        },
                        {
                            id: 'it_58',
                            name: 'Hoạt động ngoài trời',
                        },
                        {
                            id: 'it_2414',
                            name: 'TikTok',
                        },
                        {
                            id: 'it_57',
                            name: 'Đi picnic',
                        },
                        {
                            id: 'it_2419',
                            name: 'Twitch',
                        },
                        {
                            id: 'it_51',
                            name: 'Hài kịch',
                        },
                        {
                            id: 'it_2417',
                            name: 'Nhạc Trap',
                        },
                        {
                            id: 'it_54',
                            name: 'Âm nhạc',
                        },
                        {
                            id: 'it_2418',
                            name: 'Ba môn phối hợp',
                        },
                        {
                            id: 'it_53',
                            name: 'Netflix',
                        },
                        {
                            id: 'it_50',
                            name: 'Disney',
                        },
                        {
                            id: 'it_2090',
                            name: 'Bóng bầu dục',
                        },
                        {
                            id: 'it_2095',
                            name: 'Açaí',
                        },
                        {
                            id: 'it_2093',
                            name: 'Vũ điệu Samba',
                        },
                        {
                            id: 'it_2094',
                            name: 'Bói bài Tarot',
                        },
                        {
                            id: 'it_2400',
                            name: 'Chứng khoán',
                        },
                        {
                            id: 'it_2401',
                            name: 'Cổ phiếu',
                        },
                        {
                            id: 'it_48',
                            name: 'Bơi lội',
                        },
                        {
                            id: 'it_2404',
                            name: 'Bóng bàn',
                        },
                        {
                            id: 'it_41',
                            name: 'Giết thời gian',
                        },
                        {
                            id: 'it_43',
                            name: 'Luyện tập thể thao',
                        },
                        {
                            id: 'it_42',
                            name: 'Tập yoga',
                        },
                        {
                            id: 'it_2080',
                            name: 'Phim kinh dị',
                        },
                        {
                            id: 'it_2081',
                            name: 'Quyền anh',
                        },
                        {
                            id: 'it_2082',
                            name: 'Đi chill tại bar',
                        },
                        {
                            id: 'it_2122',
                            name: 'Sinh viên',
                        },
                        {
                            id: 'it_2',
                            name: 'Đi uống gì đó',
                        },
                    ],
                    min_interests: 3,
                    max_interests: 5,
                },
                recommended_sort_discoverable: true,
                selfie_verification: 'not_verified',
                noonlight_protected: false,
                sync_swipe_enabled: true,
                preference_filters: {},
            },
            misc_merchandising: {
                subscription_card_ordering: ['plus', 'gold', 'platinum'],
                landing_card: 'plus',
                controlla_carousel_ordering: [
                    'platinum',
                    'gold',
                    'plus',
                    'merchandising',
                ],
            },
        },
    };
    const interested = passions.data.user.user_interests.available_interests;
    const tags = [];
    interested.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.PASSIONS;
        tag.name = item.name;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataPassion = mappingDataPassion;
function mappingDataZodiac() {
    const zodiacs = [
        'Ma kết',
        'Bảo bình',
        'Song ngư',
        'Bạch dương',
        'Kim ngưu',
        'Song tử',
        'Cự giải',
        'Sư từ',
        'Xử nữ',
        'Thiên Bình',
        'Bọ cạp',
        'Nhân mã',
    ];
    const tags = [];
    zodiacs.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.description = 'Cung hoàng đạo của bạn là gì';
        tag.type = enum_1.TagType.ZODIAC;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataZodiac = mappingDataZodiac;
function mappingDataPersonalityType() {
    const personality = [
        'INTJ',
        'INTP',
        'ENTJ',
        'ENTP',
        'INFJ',
        'INFP',
        'ENFJ',
        'ENFP',
        'ISTJ',
        'ISFJ',
        'ESTJ',
        'ESFJ',
        'ISTP',
        'ISFP',
        'ESTP',
        'ESFP',
    ];
    const tags = [];
    personality.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.PERSONALITY_TYPE;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tag.description = 'Kiểu Tính Cách của bạn là gì?';
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataPersonalityType = mappingDataPersonalityType;
function mappingDataDietaryPreference() {
    const diets = [
        'Ăn thuần chay',
        'Ăn chay',
        'Chỉ ăn hải sản và rau củ',
        'Kosher',
        'Halal',
        'Ăn chay bán phần',
        'Chỉ ăn thịt',
        'Không ăn kiêng',
    ];
    console.log('a');
    console.log('b');
    const tags = [];
    diets.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.DIETARY_PREFERENCE;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tag.description = 'Bạn có theo chế độ ăn uống nào không?';
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataDietaryPreference = mappingDataDietaryPreference;
function mappingDataPets() {
    const pets = [
        'Chó',
        'Mèo',
        'Bò sát',
        'Động vật lưỡng cư',
        'Cá',
        'Không nuôi thú cưng',
        'Tất cả các loại thú cưng',
    ];
    const tags = [];
    pets.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.PETS;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tag.description = 'Bạn có nuôi thú cưng không?';
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataPets = mappingDataPets;
function mappingDataEducation() {
    const education = ['Cử nhân', 'Trung học phổ thông', 'Tiến sĩ', 'Thạc sĩ'];
    const tags = [];
    education.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.EDUCATION;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tag.description = 'Trình độ học vấn của bạn?';
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataEducation = mappingDataEducation;
function mappingDataSmokeQuestion() {
    const smokeQuestion = [
        'Hút thuốc với bạn bè',
        'Không hút thuốc',
        'Hút thuốc thường xuyên',
    ];
    const tags = [];
    smokeQuestion.forEach(item => {
        const tag = new tag_entity_1.Tag();
        tag.type = enum_1.TagType.SMOKE_QUESTION;
        tag.parentType = enum_1.TagType.LIFE_STYLE;
        tag.name = item;
        tag.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(tag.name));
        tag.description = 'Bạn có hút thuốc không?';
        tags.push(tag);
    });
    return tags;
}
exports.mappingDataSmokeQuestion = mappingDataSmokeQuestion;
//# sourceMappingURL=mapping.tinder.js.map