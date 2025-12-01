export type VenueType =
    | "HOTEL"
    | "RESORT"
    | "VILLA"
    | "CONFERENCE_CENTER"
    | "OTHER";
export interface Venue {
    id: string;
    name: string;
    city: string;
    country: string;
    capacity: number;
    pricePerNight: number;
    description?: string;
    imageUrl?: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

