import { IUser } from "./User"

export type IDonation = {
    creatorID: string,
    name: string,
    bannerImage: string,
    description: string,
    goal: any,
    total?: number,
    visibility: "PUBLIC" | "PRIVATE" | null,
    collaborators?: Array<string>,
    purpose: string,
    funnelID?: string,
    funnelType?: "EVENT" | "COMMUNITY" | null,
    endDate: any,
    fundRaiserGroupId?: string
}

export type IDonationList = {
    creatorID: string,
    name: string,
    bannerImage: string,
    description: string,
    goal: number,
    total: number,
    visibility: "PUBLIC" | "PRIVATE" | null,
    collaborators: Array<string>,
    purpose: string,
    funnelID?: string,
    funnelType: "EVENT",
    endDate: any, 
    createdBy: IUser,
    createdDate: number,
    fundRaisers: any,
    fundRasingGroupId: IDonationGroupData,
    id: string,
    isDeleted: boolean,
    lastModifiedBy: any,
    lastModifiedDate: any,
    returnMessage: string,
    status: any,
    statusCode: number,
    totalInGroup: number,
    user: IUser,
    isCollaborator: boolean
}

export type IDonationGroupData = {
    id: string,
    createdDate: any,
    createdAt: any,
    lastModifiedBy: null,
    createdBy: string,
    lastModifiedDate: any,
    isDeleted: boolean,
    status: "ACTIVE",
    creatorID: string,
    name: string,
    bannerImage: string,
    description: string,
} 