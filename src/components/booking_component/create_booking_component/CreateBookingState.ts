import { create } from 'zustand';

type State = {
    email: string;
    businessName: string;
    phone: string;
    description: string;
    locationType: string;
    location: {
        address: string;
        country: string;
        street: string;
        city: string;
        zipcode: string;
        state: string;
    },
    socialMediaHandles: Array<{
        socialMediaHandle: string;
        platform: string;
        details: string;
    }>;
    serviceList: Array<{
        vendorID: string;
        eventTypes: string[];
        serviceName: string;
        serviceDescription: string;
        photos: string[];
        availabilityTimes: [
            {
                startTime: number;
                endTime: number;
                availabilityDayOfWeek: number;
            }
        ]
    }>;
}