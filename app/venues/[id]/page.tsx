"use client";
import VenueCard from "@/components/VenueCard";
import useVenueStore from "@/store/venue.store";
import {useEffect} from "react";

export default function VenuesPage() {
    const { venues, getVenues, loading } = useVenueStore();

    useEffect(() => {
        getVenues();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Venues</h1>

            {loading && <p>Loading venues...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/*{venues.map((venue) => (*/}
                {/*    <VenueCard key={venue.id} venue={venue} />*/}
                {/*))}*/}
            </div>
        </div>
    );
}
