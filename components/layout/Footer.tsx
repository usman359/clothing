import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-pink-200/50 bg-linear-to-b from-white via-pink-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div>
              <h3 className="text-3xl md:text-4xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3">
                ⭐ TinnyTrends
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-xs font-medium">
                ✨ Where kids find their favorite outfits! Colorful, comfy & fun
                clothing for ages 0-6. Made with love! ❤️
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <Phone className="h-5 w-5 text-pink-500" />
                <span className="font-medium">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <Mail className="h-5 w-5 text-pink-500" />
                <span className="font-medium">hello@littlestars.com</span>
              </div>
              <div className="flex items-start space-x-2 text-base text-gray-600">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5" />
                <span className="font-medium">Karachi, Pakistan</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-pink-200">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=baby"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  👶 Baby (0-2 Years)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=toddler"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  🧸 Toddler (2-4 Years)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=kids"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  ⭐ Big Kids (4-6 Years)
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-pink-200">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-pink-200">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 inline-block hover:translate-x-2 hover:font-semibold"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pink-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} TinnyTrends. Made with ❤️ for
              kids!
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link
                href="#"
                className="hover:text-pink-600 transition-colors font-medium"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-pink-600 transition-colors font-medium"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-pink-600 transition-colors font-medium"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
