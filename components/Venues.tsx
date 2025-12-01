"use client";

import { useEffect } from "react";
import Image from "next/image";
import useVenueStore from "@/store/venue.store";
import { Loader2 } from "lucide-react";

export default function VenuesPage() {
    const { venues, getVenues, loading } = useVenueStore();
    console.log("venues-------------->", venues);
    useEffect(() => {
        getVenues();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Available Venues</h1>

            {loading ? (
                <VenueSkeleton />
            ) : venues.length === 0 ? (
                <p className="text-gray-500 text-lg">No venues found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
                            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="relative h-52">
                                <Image
                                    src={venue.imageUrl || "/placeholder.jpg"}
                                    alt={venue.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{venue.name}</h2>
                                <p className="text-gray-600">
                                    {venue.city}, {venue.country}
                                </p>

                                <div className="mt-3 flex justify-between text-sm">
                  <span className="font-medium">
                    Capacity: {venue.capacity}
                  </span>
                                    <span className="font-medium text-primary">
                    ${venue.pricePerNight}/night
                  </span>
                                </div>

                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                                    {venue.description}
                                </p>

                                <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function VenueSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="h-52 bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                        <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
                        <div className="h-3 bg-gray-300 w-1/3 rounded"></div>
                        <div className="h-10 bg-gray-300 rounded mt-4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
