export const URLS = {
    LOGIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    SEND_VERIFICATION_EMAIL: '/chasescroll/verification/send-email',
    VERIFY_TOKEN: '/chasescroll/verification/verify-token',
    RESET_PASSWORD: '/chasescroll/verification/change-password',
    GET_POSTS: '/feed/get-user-and-friends-posts',
    GET_USER_DETAILS: '/user/publicprofile',
    GET_USER_PRIVATE_PROFILE: '/user/privateprofile',
    GET_POST_BY_ID: '/feed/get-post',
    LIKE_POST: '/feed/like-post',
    CREATE_POST: '/feed/create-post',
    UPLOAD_VIDEO: '/resource-api/upload-video',
    UPLOAD_IMAGE: '/resource-api/upload-image',
    GET_ALL_COMMENTS: '/feed/get-all-comments/',
    ADD_COMMENT: '/feed/add-comment',
    LIKE_COMMENT: '/feed/like-comment',
    DELETE_COMMENT: '/feed/remove-comment/',
    GET_ALL_SUBCOMMENTS: '/feed/get-all-sub-comments',
    CREATE_SUB_COMMENT: '/feed/add-sub-comment',
    LIKE_SUB_COMMENT: '/feed/like-sub-comment',
    DELETE_SUB_COMMENT: '/feed/remove-sub-comment',
    CREATE_REPORT: '/report/report'
}

export const RESOURCE_BASE_URL = process.env.NEXT_PUBLIC_AWS_BASE_URL;