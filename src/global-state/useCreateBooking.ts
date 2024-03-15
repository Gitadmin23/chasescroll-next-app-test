import { create } from 'zustand';

type CreateBookingState = {
    email: string;
    businessName: string;
    phone: string;
    description: string;
    locationType: string;
    locationData: {
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
        vendorID?: string;
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
    setAll: (data: any) => void;
    removeService: (index: number) => void;
    removeSocial: (index: number) => void;
    setLocationValue: (field: string, data: string) => void;
    addService: (data: {
        vendorID: string;
        eventTypes: string[];
        serviceName: string;
        serviceDescription: string;
        photos: File[];
        availabilityTimes: Array<{
            startTime: string;
            endTime: string;
            availabilityDayOfWeek: number;
        }>;
    }) => void;
    addSocialMedia: (data: any) => void;
}

export const useCreateBookingState = create<CreateBookingState>((set) => ({
    email: '',
    businessName: '',
    phone: '',
    description: '',
    locationType: '',
    locationData: {
        address: '',
        country: '',
        street: '',
        city: '',
        zipcode: '',
        locationDetails: '',
        latlng: '',
        state: '',
        placeIds: '',
        toBeAnnouced: '',

    },
    serviceList: [],
    socialMediaHandles: [],
    setAll: (data: CreateBookingState) => set((state) => ({ ...state, ...data })),
    addService: (data: any) => set((state) => ({ ...state, serviceList: [...state.serviceList, data]})),
    removeService: (indx: number) => set((state) => ({ ...state, serviceList: state.serviceList.filter((item, index) => index !!== indx)})),
    addSocialMedia: (data: any) => set((state) => ({ ...state, socialMediaHandles: [...state.socialMediaHandles, data]})),
    removeSocial: (indx: number) => set((state) => ({ ...state, socialMediaHandles: state.socialMediaHandles.filter((item, index) => index !!== indx)})),
    setLocationValue: (field: string, data: string) => set((state) => ({ ...state, locationData: {...state.locationData, [field]: data }}))
}));