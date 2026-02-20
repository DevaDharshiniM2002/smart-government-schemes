export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">About Namma Schemes</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              AI-powered platform helping citizens discover and access government welfare schemes with personalized recommendations.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF9933] via-[#0066CC] to-[#138808] rounded-full"></div>
              <span className="text-xs text-gray-500">Powered by AI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Home</a></li>
              <li><a href="#schemes" className="text-gray-600 hover:text-[#0066CC] transition">Browse Schemes</a></li>
              <li><a href="#eligibility" className="text-gray-600 hover:text-[#0066CC] transition">Check Eligibility</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Voice Search</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">FAQs</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Women & Widows</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Farmers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Students</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Senior Citizens</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Healthcare</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📧 support@nammaschemes.gov.in</li>
              <li>📞 1800-XXX-XXXX (Toll Free)</li>
              <li>🕐 Mon-Fri: 9:00 AM - 6:00 PM</li>
              <li className="pt-2">
                <a href="#" className="text-[#0066CC] hover:underline">Report an Issue</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 text-center md:text-left">
              <p>© 2024 Namma Schemes. All rights reserved.</p>
              <p className="text-xs mt-1">A Digital India Initiative</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-[#0066CC] transition">Accessibility</a>
            </div>
          </div>
        </div>
      </div>

      {/* Government Stripe */}
      <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1"></div>
    </footer>
  );
}
