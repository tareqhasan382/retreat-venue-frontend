"use client";

import { useState } from "react";
import useBookingStore from "@/store/booking.store";
import { BookingInquiryPayload } from "@/types/bookings";

interface BookingFormProps {
    venueId: string;
    onSuccess?: () => void; // Optional callback after successful booking
}

export default function BookingForm({ venueId, onSuccess }: BookingFormProps) {
    const { createBooking, loading, error } = useBookingStore();
    const [form, setForm] = useState<BookingInquiryPayload>({
        venueId,
        companyName: "",
        email: "",
        startDate: "",
        endDate: "",
        attendeeCount: 1,
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        const result = await createBooking(form);
        if (result) {
            setSuccessMessage("Booking submitted successfully!");
            // Reset form
            setForm({
                venueId,
                companyName: "",
                email: "",
                startDate: "",
                endDate: "",
                attendeeCount: 1,
            });
            if (onSuccess) onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-primary/30"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-primary/30"
            />

            <div className="flex gap-2">
                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="w-1/2 border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-primary/30"
                />
                <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="w-1/2 border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-primary/30"
                />
            </div>

            <input
                type="number"
                name="attendeeCount"
                min={1}
                value={form.attendeeCount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-primary/30"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-black py-2 rounded hover:bg-primary/90 transition"
            >
                {loading ? "Submitting..." : "Book Now"}
            </button>
        </form>
    );
}
