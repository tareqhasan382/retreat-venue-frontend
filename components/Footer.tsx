import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        <Link href="/">RetreatHub</Link>
                    </h2>
                    <p className="text-gray-400">
                        Discover the perfect venues for team retreats, offsites, and corporate events. Seamless booking with curated locations.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/venues" className="hover:text-white">Venues</Link>
                        </li>
                        <li>
                            <Link href="#why" className="hover:text-white">Why Us</Link>
                        </li>
                        <li>
                            <Link href="#contact" className="hover:text-white">Contact</Link>
                        </li>
                        <li>
                            <Link href="/bookings" className="hover:text-white">Bookings</Link>
                        </li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Connect with Us</h3>
                    <div className="flex gap-4 mb-4">
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
                    </div>
                    <p>Email: <a href="mailto:info@retreathub.com" className="hover:text-white">info@retreathub.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a></p>
                </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} RetreatHub. All rights reserved.
            </div>
        </footer>
    );
}
