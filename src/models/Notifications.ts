import { IUser } from "./User";

export type INotification = {
    id: string;
    createdDate: number;
    lastModifiedBy: IUser;
    createdBy: IUser;
    lastModifiedDate: number;
    title: string;
    message: string;
    recieverID: IUser;
    typeID: string;
    type: 'EVENT' | 'GROUP' | 'CHAT' | 'FEED' | 'GROUP_REQUEST' | 'GROUP_REQUEST_ACCEPTED' | 'FRIEND_REQUEST' | 'FRIEND_REQUEST_ACCEPTED' | 'FEED_COMMENT_LIKE' | 'FEED_COMMENT' | 'FEED_LIKE';
    status: 'READ' | 'UNREAD';
}