export interface BookingInquiry {
    id: string;
    venueId: string;
    companyName: string;
    email: string;
    startDate: string; // ISO string
    endDate: string;   // ISO string
    attendeeCount: number;
    createdAt: string;
    updatedAt: string;
    venue?: {
        id: string;
        name: string;
        city: string;
        country: string;
        pricePerNight: number;
    };
}

export interface BookingInquiryPayload {
    venueId: string;
    companyName: string;
    email: string;
    startDate: string;
    endDate: string;
    attendeeCount: number;
}
