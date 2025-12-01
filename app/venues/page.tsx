"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useVenueStore from "@/store/venue.store";
import BookingForm from "@/components/BookingForm";
import { X } from "lucide-react";
import {VenueSkeleton} from "@/components/VenueSkeleton";

export default function VenuesPage() {
    const { venues, getVenues, loading, totalVenues, page, pageSize, setPage } = useVenueStore();
    const [filters, setFilters] = useState({ city: "", minCapacity: "", maxPrice: "" });
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchVenues();
    }, [page]);

    const fetchVenues = async () => {
        await getVenues({
            city: filters.city || undefined,
            minCapacity: filters.minCapacity ? Number(filters.minCapacity) : undefined,
            maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
            page,
            pageSize,
        });
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        setPage(1); // Reset to first page
        fetchVenues();
    };

    const openModal = (venueId: string) => {
        setSelectedVenueId(venueId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVenueId(null);
        setIsModalOpen(false);
    };

    const totalPages = Math.ceil(totalVenues / pageSize);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Available Venues</h1>

            {/* Filters */}
            <div className="flex gap-4 mb-6 bg-amber-200">
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
                <button onClick={applyFilters} className="bg-primary text-black px-4 rounded">
                    Apply
                </button>
            </div>

            {/* Venue List */}
            {loading ? (
                <VenueSkeleton />
            ) : venues.length === 0 ? (
                <p className="text-gray-500 text-lg">No venues found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div key={venue.id} className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition">
                            <div className="relative h-52">
                                <Image src={venue.imageUrl || "/placeholder.jpg"} alt={venue.name} fill className="object-cover" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{venue.name}</h2>
                                <p className="text-gray-600">{venue.city}, {venue.country}</p>
                                <div className="mt-3 flex justify-between text-sm">
                                    <span className="font-medium">Capacity: {venue.capacity}</span>
                                    <span className="font-medium text-primary">${venue.pricePerNight}/night</span>
                                </div>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{venue.description}</p>
                                <button onClick={() => openModal(venue.id)} className="mt-4 w-full bg-primary text-black py-2 rounded-lg hover:bg-primary/90 transition">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-primary text-black' : 'bg-gray-200'}`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedVenueId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Book Your Venue</h2>
                        <BookingForm venueId={selectedVenueId} />
                    </div>
                </div>
            )}
        </div>
    );
}


