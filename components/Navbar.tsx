'use client'
import Link from "next/link";
import {useState} from "react";
import AddVenueModal from "@/components/AddVenueModal";
const Navbar =()=>{

    const [menuOpen, setMenuOpen] = useState(false);
    const [openVenueModal, setOpenVenueModal] = useState(false);
    return (
        <div>
            <AddVenueModal
                open={openVenueModal}
                onClose={() => setOpenVenueModal(false)}
            />
            {/* NAVBAR */}
            {/* MODAL */}
            <AddVenueModal
                open={openVenueModal}
                onClose={() => setOpenVenueModal(false)}
            />

            {/* NAVBAR */}
            <nav className="w-full px-6 py-5 flex justify-between items-center bg-white shadow sticky top-0 z-50">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                        RetreatHub
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={() => setOpenVenueModal(true)}
                        className="hover:text-blue-600"
                    >
                        Add Venues
                    </button>
                    <a href="/bookings" className="hover:text-blue-600">List Bookings</a>
                    <a href="#why" className="hover:text-blue-600">Why Us</a>
                    <a href="#contact" className="hover:text-blue-600">Contact</a>
                </div>

                {/* Book Now */}
                <button className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Book Now
                </button>

                {/* Mobile Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl"
                >
                    ☰
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow px-6 py-4 space-y-4">
                    <button
                        onClick={() => {
                            setOpenVenueModal(true);
                            setMenuOpen(false);
                        }}
                        className="block w-full text-left hover:text-blue-600"
                    >
                        Add Venues
                    </button>
                    <a href="/bookings" className="hover:text-blue-600">List Bookings</a>
                    <a href="#why" className="block hover:text-blue-600">Why Us</a>
                    <a href="#contact" className="block hover:text-blue-600">Contact</a>

                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Book Now
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar;