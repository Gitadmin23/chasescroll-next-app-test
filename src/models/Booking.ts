import { IUser } from './User';

export type IBooking = {
    id: string;
    createdDate: 0;
    lastModifiedBy: IUser;
    createdBy: IUser;
    lastModifiedDate: number;
    isDeleted: boolean;
    status: 'ACTIVE';
    statusCode: number;
    returnMessage: string;
    userID: IUser;
    vendorID: string;
    serviceID: string;
    bookingType: string;
    bookingTime: {
        startTime: number,
        endTime: number,
        availabilityDayOfWeek: 0
    };
    description: string;
}