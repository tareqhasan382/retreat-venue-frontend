"use client";

import { useState } from "react";
import Image from "next/image";
import VenuesPage from "@/components/VenuesPage"
import AddVenueModal from "@/components/AddVenueModal";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openVenueModal, setOpenVenueModal] = useState(false);

    return (
        <main className="min-h-screen w-full bg-gray-50 text-gray-900">


            {/* HERO SECTION */}
            <section className="relative w-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
                    Find the Perfect Venue for Your Next Team Retreat
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-3xl text-gray-100">
                    Explore top venues for offsites, team building, and company retreats with ease.
                </p>
                <div className="mt-8 w-full max-w-2xl flex items-center bg-white rounded-xl overflow-hidden shadow-lg">
                    <input
                        type="text"
                        placeholder="Search destinations, venues..."
                        className="flex-1 px-4 py-3 outline-none text-gray-700"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700">
                        Search
                    </button>
                </div>
            </section>

            {/* FEATURED VENUES */}
            <section id="venues" className="px-6 py-16 max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">Featured Retreat Venues</h2>

                <VenuesPage />
            </section>

            {/* TOP DESTINATIONS */}
            <section className="px-6 pb-20 bg-white text-gray-900">
                <h2 className="text-3xl font-semibold mb-10 text-center">Popular Retreat Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        { name: "Malibu, CA", img: "https://images.pexels.com/photos/919745/pexels-photo-919745.jpeg" },
                        { name: "Colorado, USA", img: "https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg" },
                        { name: "Oregon, USA", img: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg" },
                        { name: "Lake Tahoe, CA", img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg" },
                    ].map((location, idx) => (
                        <div key={idx} className="relative h-56 w-full rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                            <Image src={location.img} alt={location.name} fill className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-center py-2">
                                {location.name}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS / PROCESS */}
            <section className="px-6 py-20 bg-gray-100 text-gray-900 text-center">
                <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">1. Search Venues</h3>
                        <p className="text-gray-600 text-sm">
                            Explore curated venues for offsites and retreats with ease.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">2. Submit Inquiry</h3>
                        <p className="text-gray-600 text-sm">
                            Fill out a simple form and our team will help you secure the venue.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">3. Enjoy Retreat</h3>
                        <p className="text-gray-600 text-sm">
                            Arrive at the venue and enjoy a productive and fun team offsite.
                        </p>
                    </div>
                </div>
            </section>


            {/* WHY CHOOSE US */}
            <section id="why" className="px-6 py-20 bg-gray-100 text-center">
                <h2 className="text-3xl font-semibold mb-10">Why Companies Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">Curated Venues</h3>
                        <p className="text-gray-600 text-sm">
                            We handpick venues perfect for productivity, bonding, and relaxation.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">Seamless Booking</h3>
                        <p className="text-gray-600 text-sm">
                            Submit inquiries easily and get quick responses from our team.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2">Trusted by Teams</h3>
                        <p className="text-gray-600 text-sm">
                            Companies from all over the world rely on us for memorable retreats.
                        </p>
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="px-6 py-20 bg-gray-50 text-gray-900">
                <h2 className="text-3xl font-semibold mb-10 text-center">What Teams Say About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Alice Johnson",
                            role: "HR Manager, TechCorp",
                            photo: "https://randomuser.me/api/portraits/women/68.jpg",
                            text: "RetreatHub made planning our offsite effortless. The venue was perfect and the team loved it!",
                            rating: 5,
                        },
                        {
                            name: "Michael Lee",
                            role: "Team Lead, InnovateX",
                            photo: "https://randomuser.me/api/portraits/men/45.jpg",
                            text: "Excellent service and handpicked venues. Our retreat was both productive and fun!",
                            rating: 4.8,
                        },
                        {
                            name: "Sophie Kim",
                            role: "CEO, BrightSolutions",
                            photo: "https://randomuser.me/api/portraits/women/32.jpg",
                            text: "Highly recommend RetreatHub for any company looking for a hassle-free offsite experience.",
                            rating: 5,
                        },
                    ].map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
                        >
                            <Image
                                src={testimonial.photo}
                                alt={testimonial.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover mb-4"
                            />
                            <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.text}"</p>
                            <div className="flex items-center mb-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        className={`text-yellow-500 ${i < Math.round(testimonial.rating) ? "" : "text-gray-300"}`}
                                    >
              ★
            </span>
                                ))}
                            </div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA / BOOKING */}
            <section id="contact" className="px-6 py-24 bg-blue-600 text-white text-center">
                <h2 className="text-4xl md:text-5xl font-bold">Plan Your Next Team Retreat Today</h2>
                <p className="mt-4 max-w-xl mx-auto text-lg">
                    Submit a booking inquiry and we’ll help you secure the perfect venue for your team.
                </p>
                <button className="mt-8 bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100">
                    Submit Inquiry
                </button>
            </section>
        </main>
    );
}
