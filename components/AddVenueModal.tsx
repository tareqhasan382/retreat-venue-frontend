"use client";

import React, { useState } from "react";
import useVenueStore from "@/store/venue.store";

export default function AddVenueModal({ open, onClose }: any) {
    const { createVenue } = useVenueStore();

    const [form, setForm] = useState({
        name: "",
        city: "",
        country: "",
        capacity: 0,
        pricePerNight: 0,
        description: "",
        imageUrl: "",
        type: "RESORT",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newVenue = await createVenue({
            ...form,
            capacity: Number(form.capacity),
            pricePerNight: Number(form.pricePerNight),
        });

        if (newVenue) {
            alert("Venue created successfully!");
            onClose();
        } else {
            alert("Failed to create venue");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                >
                    ×
                </button>

                <h2 className="text-xl font-semibold mb-4">Add New Venue</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Venue Name"
                        required
                    />
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="City"
                        required
                    />
                    <input
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Country"
                        required
                    />
                    <input
                        name="capacity"
                        type="number"
                        value={form.capacity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Capacity"
                        required
                    />
                    <input
                        name="pricePerNight"
                        type="number"
                        value={form.pricePerNight}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Price per Night"
                        required
                    />
                    <input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Description"
                    />
                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Image URL"
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
                        Save Venue
                    </button>
                </form>
            </div>
        </div>
    );
}
