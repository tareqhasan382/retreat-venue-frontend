"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useVenueStore from "@/store/venue.store";
import useDebounce from "@/hooks/useDebounce";
import { VenueSkeleton } from "@/components/VenueSkeleton";

export default function VenuesPage() {
    const { venues, getVenues, loading, totalVenues, page, pageSize, setPage } = useVenueStore();

    const [filters, setFilters] = useState({
        city: "",
        minCapacity: "",
        maxPrice: "",
    });

    const debouncedFilters = useDebounce(filters, 500);

    useEffect(() => {
        getVenues({
            city: debouncedFilters.city || undefined,
            minCapacity: debouncedFilters.minCapacity ? Number(debouncedFilters.minCapacity) : undefined,
            maxPrice: debouncedFilters.maxPrice ? Number(debouncedFilters.maxPrice) : undefined,
            page,
            pageSize,
        });
    }, [debouncedFilters, page]);

    const handleFilterChange = (e: any) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const totalPages = Math.ceil(totalVenues / pageSize);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Available Venues</h1>

            {/* FILTERS */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="City"
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="minCapacity"
                    value={filters.minCapacity}
                    onChange={handleFilterChange}
                    placeholder="Min Capacity"
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="border p-2 rounded"
                />
            </div>

            {/* LIST */}
            {loading ? (
                <VenueSkeleton />
            ) : venues.length === 0 ? (
                <p>No venues found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div key={venue.id} className="bg-white rounded-xl shadow p-4">
                            <div className="relative h-52">
                                <Image src={venue.imageUrl|| "/placeholder.jpg"} alt={venue.name} fill className="object-cover" />
                            </div>
                            <h2 className="text-xl mt-2">{venue.name}</h2>
                            <p className="text-gray-600">{venue.city}</p>
                            <p className="text-sm mt-1">{venue.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded ${
                                page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
