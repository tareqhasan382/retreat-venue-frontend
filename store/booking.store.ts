"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { apiFetch } from "@/lib/apiClient";
import { BookingInquiry, BookingInquiryPayload } from "@/types/bookings";
interface BookingFilters {
    companyName?: string;
    city?: string;
}

interface BookingState {
    bookings: BookingInquiry[];
    selectedBooking: BookingInquiry | null;
    loading: boolean;
    error: string | null;

    // FIX: accept filters instead of venueId string
    getBookings: (filters?: BookingFilters) => Promise<BookingInquiry[] | null>;
    getBookingById: (id: string) => Promise<BookingInquiry | null>;
    createBooking: (payload: BookingInquiryPayload) => Promise<BookingInquiry | null>;
    updateBooking: (id: string, payload: Partial<BookingInquiryPayload>) => Promise<BookingInquiry | null>;
    deleteBooking: (id: string) => Promise<boolean>;
}

const useBookingStore = create<BookingState>()(
    devtools(
        persist(
            (set) => ({
                bookings: [],
                selectedBooking: null,
                loading: false,
                error: null,

                /** GET ALL BOOKINGS */
                getBookings: async (filters?: { companyName?: string; city?: string }) => {
                    set({ loading: true, error: null });
                    try {
                        const query = new URLSearchParams();

                        if (filters?.companyName) query.append("companyName", filters.companyName);
                        if (filters?.city) query.append("city", filters.city);

                        const url = `/bookings?${query.toString()}`;

                        const response = await apiFetch<{
                            statusCode: number;
                            success: boolean;
                            message: string;
                            data: BookingInquiry[];
                        }>(url, { method: "GET" });

                        set({ bookings: response.data });
                        return response.data;
                    } catch (err: any) {
                        set({ error: err.message });
                        return null;
                    } finally {
                        set({ loading: false });
                    }
                },


                /** GET SINGLE BOOKING */
                getBookingById: async (id: string) => {
                    set({ loading: true, error: null });
                    try {
                        const response = await apiFetch<{
                            statusCode: number;
                            success: boolean;
                            message: string;
                            data: BookingInquiry;
                        }>(`/bookings/${id}`, { method: "GET" });

                        set({ selectedBooking: response.data });
                        return response.data;
                    } catch (err: any) {
                        set({ error: err.message });
                        return null;
                    } finally {
                        set({ loading: false });
                    }
                },

                /** CREATE BOOKING */
                createBooking: async (payload: BookingInquiryPayload) => {
                    set({ loading: true, error: null });
                    try {
                        const response = await apiFetch<{
                            statusCode: number;
                            success: boolean;
                            message: string;
                            data: BookingInquiry;
                        }>("/bookings", {
                            method: "POST",
                            body: JSON.stringify(payload),
                        });

                        set((state) => ({ bookings: [...state.bookings, response.data] }));
                        return response.data;
                    } catch (err: any) {
                        set({ error: err.message });
                        return null;
                    } finally {
                        set({ loading: false });
                    }
                },

                /** UPDATE BOOKING */
                updateBooking: async (id: string, payload: Partial<BookingInquiryPayload>) => {
                    set({ loading: true, error: null });
                    try {
                        const response = await apiFetch<{
                            statusCode: number;
                            success: boolean;
                            message: string;
                            data: BookingInquiry;
                        }>(`/bookings/${id}`, {
                            method: "PUT",
                            body: JSON.stringify(payload),
                        });

                        set((state) => ({
                            bookings: state.bookings.map((b) => (b.id === id ? response.data : b)),
                        }));

                        return response.data;
                    } catch (err: any) {
                        set({ error: err.message });
                        return null;
                    } finally {
                        set({ loading: false });
                    }
                },

                /** DELETE BOOKING */
                deleteBooking: async (id: string) => {
                    set({ loading: true, error: null });
                    try {
                        await apiFetch(`/bookings/${id}`, { method: "DELETE" });
                        set((state) => ({
                            bookings: state.bookings.filter((b) => b.id !== id),
                        }));
                        return true;
                    } catch (err: any) {
                        set({ error: err.message });
                        return false;
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            {
                name: "booking-store",
                partialize: (state) => ({ bookings: state.bookings }),
            }
        )
    )
);

export default useBookingStore;
