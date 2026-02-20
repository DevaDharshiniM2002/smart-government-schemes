import { useState } from 'react';
import { Menu, X, Mic, Search } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1"></div>
      
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Info Bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-xs border-b border-gray-100">
            <div className="flex items-center gap-6 text-gray-600">
              <span>🇮🇳 Government of India</span>
              <span>|</span>
              <span>भारत सरकार</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <a href="#" className="hover:text-[#0066CC] transition">हिंदी</a>
              <span>|</span>
              <a href="#" className="hover:text-[#0066CC] transition">English</a>
              <span>|</span>
              <button className="flex items-center gap-1 hover:text-[#0066CC] transition">
                <span className="text-lg">A</span>
                <span className="text-base">A</span>
                <span className="text-sm">A</span>
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] via-[#0066CC] to-[#138808] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">NS</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#0066CC] leading-tight">Namma Schemes</h1>
                  <p className="text-xs text-gray-600">AI-Powered Scheme Assistant</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition font-medium">
                Home
              </a>
              <a href="#schemes" className="px-4 py-2 text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition font-medium">
                Browse Schemes
              </a>
              <a href="#eligibility" className="px-4 py-2 text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition font-medium">
                Check Eligibility
              </a>
              <a href="#voice" className="px-4 py-2 text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition font-medium flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Search
              </a>
              <a href="#about" className="px-4 py-2 text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition font-medium">
                About
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Schemes
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <a href="#" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition font-medium">
                Home
              </a>
              <a href="#schemes" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition font-medium">
                Browse Schemes
              </a>
              <a href="#eligibility" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition font-medium">
                Check Eligibility
              </a>
              <a href="#voice" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition font-medium flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Search
              </a>
              <a href="#about" className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition font-medium">
                About
              </a>
              <button className="mt-2 px-6 py-3 bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white rounded-lg font-semibold">
                Search Schemes
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
