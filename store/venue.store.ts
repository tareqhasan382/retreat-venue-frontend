"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { apiFetch } from "@/lib/apiClient";
import { Venue } from "@/types/venues";

interface VenueApiResponse {
    success: boolean;
    data?: any;
    total?: number;
    message?: string;
}

interface VenueFilters {
    city?: string;
    minCapacity?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
}

interface VenueState {
    venues: Venue[];
    loading: boolean;
    error: string | null;
    totalVenues: number;
    page: number;
    pageSize: number;

    getVenues: (filters?: VenueFilters) => Promise<void>;
    setPage: (page: number) => void;
}

const useVenueStore = create<VenueState>()(
    devtools(
        persist(
            (set, get) => ({
                venues: [],
                loading: false,
                error: null,
                totalVenues: 0,
                page: 1,
                pageSize: 6,

                setPage: (page) => set({ page }),

                getVenues: async (filters = {}) => {
                    set({ loading: true, error: null });

                    const page = filters.page || get().page;
                    const pageSize = filters.pageSize || get().pageSize;
                    const skip = (page - 1) * pageSize;

                    const query = new URLSearchParams();

                    if (filters.city) query.append("city", filters.city);
                    if (filters.minCapacity) query.append("minCapacity", String(filters.minCapacity));
                    if (filters.maxPrice) query.append("maxPrice", String(filters.maxPrice));
                    query.append("skip", String(skip));
                    query.append("take", String(pageSize));

                    try {
                        const res = await apiFetch<VenueApiResponse>(`/venues?${query.toString()}`);

                        if (res.success && res.data) {
                            set({
                                venues: res.data.items,
                                totalVenues: res.total || 0,
                            });
                        } else {
                            set({ error: res.message || "Failed to load venues" });
                        }
                    } catch (err: any) {
                        set({ error: err.message });
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            { name: "venue-store" }
        )
    )
);

export default useVenueStore;
