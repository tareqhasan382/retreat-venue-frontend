import Image from "next/image";
import Link from "next/link";
import { Venue } from "@/types/venues";

interface Props {
    venue: Venue;
}

export default function VenueCard({ venue }: Props) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="relative h-52">
                <Image
                    src={venue.imageUrl || "/placeholder.jpg"}
                    alt={venue.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="font-semibold text-xl">{venue.name}</h2>
                <p className="text-gray-500">{venue.city}, {venue.country}</p>
                <p className="text-primary font-bold mt-2">${venue.pricePerNight} / night</p>
                <Link
                    href={`/venues/${venue.id}/booking`}
                    className="block mt-4 bg-primary text-white text-center py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
}
