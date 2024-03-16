import { IUser } from "./User"

export type IService = {
            "id": string;
            "createdDate": number;
            "lastModifiedBy": IUser;
            "createdBy": IUser;
            "lastModifiedDate": number;
            "isDeleted": boolean;
            "status": string;
            "statusCode": number;
            "returnMessage": string;
            "eventTypes": Array<string>;
            "serviceName": string;
            "serviceDescription": string;
            "availabilityTimes": Array<{
                "startTime": number,
                "endTime": number,
                "availabilityDayOfWeek": number
        }>;
}