import { IUser } from "./User"

export interface IProduct {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": IUser,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "creator": IUser,
    "name": string,
    "description": string,
    "category": string,
    "images": Array<string>,
    "price": number,
    "quantity": number,
    "outOfStock": boolean,
    "hasDiscount": boolean,
    "discountPrice": number,
    "published": boolean,
    rating: number
    "location": {
        "link": string,
        "address": string,
        "country": string,
        "street": string,
        "city": string,
        "zipcode": string,
        "state": string,
        "locationDetails": string,
        "latlng": string,
        "placeIds": string,
        "toBeAnnounced": boolean
    },
}

export interface IRental {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "creator": IUser,
    "name": string,
    "description": string,
    "category": string,
    "location": {
        "link": string,
        "address": string,
        "country": string,
        "street": string,
        "city": string,
        "zipcode": string,
        "state": string,
        "locationDetails": string,
        "latlng": string,
        "placeIds": string,
        "toBeAnnounced": boolean
    },
    "maximiumNumberOfDays": number,
    "price": number,
    "images": Array<string>,
    "address": any
}

export interface IOrder {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "product": IProduct,
    "user": IUser,
    "vendor": IUser,
    "paymentStatus": string,
    "quantity": number,
    "total": number,
    "orderStatus": string,
    "address": {
        "id": string,
        "createdDate": number,
        "lastModifiedBy": any,
        "createdBy": any,
        "lastModifiedDate": number,
        "isDeleted": boolean,
        "status": any,
        "statusCode": number,
        "returnMessage": string,
        "state": string,
        "lga": string,
        "phone": string,
        "landmark": string,
        "isDefault": boolean
    }
}