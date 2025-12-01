"use client";

import { useEffect, useState } from "react";
import useBookingStore from "@/store/booking.store";
import { VenueSkeleton } from "@/components/VenueSkeleton";

export default function BookingListPage() {
    const { bookings, loading, getBookings } = useBookingStore();

    // FILTER STATES
    const [companyName, setCompanyName] = useState("");
    const [city, setCity] = useState("");

    // Debounce
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    // Fetch bookings with optional filters
    const fetchBookings = async () => {
        await getBookings({
            companyName: companyName || undefined,
            city: city || undefined,
        });
    };

    // Debounce effect when filters change
    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);

        const timer = setTimeout(() => {
            fetchBookings();
        }, 300); // 300ms debounce

        setDebounceTimer(timer);

        return () => clearTimeout(timer);
    }, [companyName, city]);

    // Initial load
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Booking Inquiries</h1>

            {/* FILTERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="p-3 border rounded-lg w-full"
                />

                <input
                    type="text"
                    placeholder="Search by city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-3 border rounded-lg w-full"
                />
            </div>

            {/* Loading State */}
            {loading && <VenueSkeleton />}

            {/* Empty State */}
            {!loading && bookings.length === 0 && (
                <p className="text-gray-600">No booking inquiries found.</p>
            )}

            {/* Booking Table */}
            {!loading && bookings.length > 0 && (
                <div className="overflow-x-auto bg-white shadow rounded-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-4">Company</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Venue</th>
                            <th className="p-4">City</th>
                            <th className="p-4">Dates</th>
                            <th className="p-4">Attendees</th>
                        </tr>
                        </thead>

                        <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{b.companyName}</td>
                                <td className="p-4">{b.email}</td>
                                <td className="p-4">{b.venue?.name || "Unknown Venue"}</td>
                                <td className="p-4">{b.venue?.city || "—"}</td>
                                <td className="p-4">
                                    {new Date(b.startDate).toLocaleDateString()} −{" "}
                                    {new Date(b.endDate).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-center">{b.attendeeCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
