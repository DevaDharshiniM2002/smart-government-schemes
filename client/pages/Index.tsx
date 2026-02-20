import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Zap, Target, Check, Mic, Search, Shield, Brain, Users, TrendingUp } from 'lucide-react';
import { API_ENDPOINTS, safeFetch } from '../config';

// Government-themed categories with proper icons
const defaultCategories = [
  {
    key: 'women',
    label: 'Women & Widows',
    image: 'https://images.pexels.com/photos/7551581/pexels-photo-7551581.jpeg',
    color: '#EC4899',
    icon: '👩',
    description: 'Welfare schemes for women empowerment and widow support'
  },
  {
    key: 'agriculture',
    label: 'Farmers & Agriculture',
    image: 'https://images.pexels.com/photos/29294526/pexels-photo-29294526.jpeg',
    color: '#10B981',
    icon: '🌾',
    description: 'Agricultural subsidies, crop insurance, and farmer welfare'
  },
  {
    key: 'education',
    label: 'Students & Education',
    image: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg',
    color: '#3B82F6',
    icon: '🎓',
    description: 'Scholarships, educational loans, and skill development'
  },
  {
    key: 'business',
    label: 'Business & MSME',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    color: '#F59E0B',
    icon: '💼',
    description: 'Startup funding, MSME loans, and entrepreneurship support'
  },
  {
    key: 'pensions',
    label: 'Senior Citizens',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
    color: '#6366F1',
    icon: '👴',
    description: 'Pension schemes and elderly care programs'
  },
  {
    key: 'transgender',
    label: 'Transgender Welfare',
    image: 'https://images.pexels.com/photos/7551581/pexels-photo-7551581.jpeg',
    color: '#8B5CF6',
    icon: '🏳️‍⚧️',
    description: 'Support programs for transgender community'
  },
  {
    key: 'scst',
    label: 'SC/ST Schemes',
    image: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg',
    color: '#EF4444',
    icon: '🤝',
    description: 'Reservation benefits and welfare for SC/ST communities'
  },
  {
    key: 'disabled',
    label: 'Differently Abled',
    image: 'https://images.pexels.com/photos/7551581/pexels-photo-7551581.jpeg',
    color: '#14B8A6',
    icon: '♿',
    description: 'Disability benefits and accessibility support'
  },
  {
    key: 'health',
    label: 'Healthcare',
    image: 'https://images.pexels.com/photos/7163956/pexels-photo-7163956.jpeg',
    color: '#EF4444',
    icon: '🏥',
    description: 'Health insurance and medical assistance programs'
  },
  {
    key: 'housing',
    label: 'Housing',
    image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    color: '#FBBF24',
    icon: '🏠',
    description: 'Affordable housing and urban development schemes'
  }
];

const steps = [
  { num: 1, title: 'Search & Filter', desc: 'Browse schemes by category, eligibility, or keyword.', icon: <Zap className="w-5 h-5" /> },
  { num: 2, title: 'Check Eligibility', desc: 'Answer a few questions to see which schemes you qualify for.', icon: <Target className="w-5 h-5" /> },
  { num: 3, title: 'Gather Documents', desc: 'Get a checklist of documents needed for your application.', icon: <Check className="w-5 h-5" /> },
  { num: 4, title: 'Apply', desc: 'Apply online or get links to official portals.', icon: <ArrowRight className="w-5 h-5" /> },
];

export default function Index() {
  const [formData, setFormData] = useState({
    category: '',
    age: '',
    gender: '',
    occupation: '',
    city: '',
    income: '',
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [status, setStatus] = useState('');
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    // Set default categories immediately
    setCategories(defaultCategories);
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await safeFetch(API_ENDPOINTS.CATEGORIES, {}, 3000);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
        setBackendAvailable(true);
      } else {
        setBackendAvailable(false);
      }
    } catch (error) {
      // Silently fail - using default categories
      setBackendAvailable(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category) {
      setStatus('Please select a category first.');
      return;
    }

    setLoading(true);
    setStatus('Checking eligibility...');
    setEligibilityResults([]);

    try {
      const payload = { category: formData.category };
      if (formData.age) payload.age = Number(formData.age);
      if (formData.gender) payload.gender = formData.gender;
      if (formData.occupation) payload.occupation = formData.occupation;
      if (formData.city) payload.city = formData.city;
      if (formData.income) payload.income = Number(formData.income);

      const response = await safeFetch(API_ENDPOINTS.ELIGIBILITY_CHECK, {
        method: 'POST',
        body: JSON.stringify(payload),
      }, 5000);

      if (response.ok) {
        const data = await response.json();
        setStatus(`✓ Assessment created: ${data.assessment_id}`);
        setEligibilityResults(data.schemes);
      } else {
        setStatus('Error checking eligibility. Please try again.');
      }
    } catch (error) {
      setStatus('Backend not available. Please ensure it is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const searchInput = formElement.querySelector('input[type="search"]') as HTMLInputElement;
    const categorySelect = formElement.querySelector('select') as HTMLSelectElement;

    const query = searchInput?.value || '';
    const category = categorySelect?.value || '';

    setSearchLoading(true);
    setSearchStatus('Searching schemes...');
    setSearchResults([]);

    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (category) params.set('category', category);

      const response = await safeFetch(`${API_ENDPOINTS.SCHEMES}?${params.toString()}`, {}, 5000);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.schemes);
        setSearchStatus(`Found ${data.schemes.length} scheme(s)`);
      } else {
        setSearchStatus('Error searching schemes. Please try again.');
      }
    } catch (error) {
      setSearchStatus('Backend not available. Using default categories.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Government Style */}
      <section className="relative bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003D7A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Official Government Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Government Schemes
              <br />
              <span className="text-[#FF9933]">Made for You</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered platform that intelligently matches you with relevant welfare schemes. 
              Get personalized recommendations, check eligibility instantly, and access benefits designed for your needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="#schemes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0066CC] rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Explore Schemes <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#eligibility"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF9933] text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Check Eligibility <Target className="w-5 h-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#FF9933] mb-1">500+</div>
                <p className="text-sm text-blue-100">Active Schemes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#FF9933] mb-1">10L+</div>
                <p className="text-sm text-blue-100">Citizens Helped</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#FF9933] mb-1">95%</div>
                <p className="text-sm text-blue-100">Success Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#FF9933] mb-1">24/7</div>
                <p className="text-sm text-blue-100">AI Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Brain className="w-4 h-4 text-[#0066CC]" />
              <span className="text-sm font-semibold text-[#0066CC]">AI-Powered Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Namma Schemes is Different</h2>
            <p className="text-lg text-gray-600">Unlike traditional portals, we use AI to personalize your experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-[#0066CC] transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Predictions</h3>
              <p className="text-gray-600 leading-relaxed">AI analyzes your profile and predicts eligibility with 95% accuracy, ranking schemes by probability of approval.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-[#FF9933] transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933] to-[#E67E22] rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Voice Assistance</h3>
              <p className="text-gray-600 leading-relaxed">Search schemes using voice in multiple Indian languages. Perfect for rural areas and elderly citizens.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-[#138808] transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#138808] to-[#0F6806] rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simplified Language</h3>
              <p className="text-gray-600 leading-relaxed">Complex legal jargon converted to simple, easy-to-understand language that everyone can comprehend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section id="schemes" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Select your category to discover relevant government schemes and benefits</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.length > 0 ? categories.map((cat, i) => (
              <a
                key={cat.key || i}
                href={`#category-${cat.key}`}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0066CC] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{cat.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-[#0066CC] group-hover:underline">View Schemes →</span>
                </div>
              </a>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading categories...</p>
              </div>
            )}
          </div>
        </div>
      </section>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Search Schemes</h3>
              <p className="text-gray-600">{backendAvailable ? '✅ Connected to database' : '⚠️ Using cached data'}</p>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="flex flex-col lg:flex-row gap-4">
                <input
                  type="search"
                  placeholder="Search schemes by name, keyword, or benefit..."
                  className="flex-1 px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-[#0066CC] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-900 placeholder:text-gray-400 font-medium"
                />
                <select className="lg:w-56 px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-[#0066CC] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-900 cursor-pointer font-medium">
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={searchLoading}
                  className="px-8 py-4 bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {searchLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

            {searchStatus && (
              <div className={`p-4 mb-8 rounded-2xl text-sm font-medium border-2 ${
                searchResults.length > 0
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-primary/10 border-primary/30 text-primary'
              }`}>
                ✨ {searchStatus}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-foreground mb-6">📊 Search Results</h3>
                {searchResults.map((scheme) => (
                  <div key={scheme.id} className="group relative overflow-hidden p-7 bg-gradient-to-br from-card via-card to-card/50 border-2 border-primary/20 rounded-3xl hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-300 -z-10" />

                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
                          <h4 className="text-xl font-bold text-foreground">{scheme.name}</h4>
                        </div>
                        <p className="text-muted text-base ml-4">{scheme.summary}</p>
                      </div>
                      {scheme.apply_url && (
                        <a
                          href={scheme.apply_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-full text-sm font-bold hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 whitespace-nowrap"
                        >
                          Apply Now →
                        </a>
                      )}
                    </div>
                    {scheme.tags && scheme.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5 ml-4">
                        {scheme.tags.map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-bold border border-primary/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6 pt-5 border-t border-primary/15 ml-4">
                      {scheme.eligibility && scheme.eligibility.length > 0 && (
                        <div>
                          <strong className="text-sm text-primary block mb-3 flex items-center gap-2">✓ Eligibility</strong>
                          <ul className="text-sm text-muted space-y-2">
                            {scheme.eligibility.slice(0, 3).map((item: string, idx: number) => (
                              <li key={idx} className="flex gap-2"><span className="text-primary">→</span>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {scheme.documents && scheme.documents.length > 0 && (
                        <div>
                          <strong className="text-sm text-secondary block mb-3 flex items-center gap-2">📄 Documents</strong>
                          <ul className="text-sm text-muted space-y-2">
                            {scheme.documents.slice(0, 3).map((doc: string, idx: number) => (
                              <li key={idx} className="flex gap-2"><span className="text-secondary">→</span>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-secondary">Simple Process</span>
            </div>
            <h2 className="font-display text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted">Get access to government schemes in just 4 simple steps. From discovery to application.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent -z-10 rounded-full" />

            {steps.map((step, idx) => (
              <div key={step.num} className="relative">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto shadow-xl shadow-primary/50 mb-4 relative z-10 hover:scale-110 transition-transform duration-300">
                      <div className="text-white text-4xl">{step.icon}</div>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden md:flex md:absolute right-0 top-12 translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background z-20 items-center justify-center font-bold text-white shadow-lg">
                        →
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border-2 border-primary/30 hover:border-primary/80 rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 rounded-3xl transition-all duration-300 -z-10" />

                    <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted text-base leading-relaxed flex-grow">{step.desc}</p>
                    <div className="mt-6 pt-4 border-t-2 border-primary/20">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-xs font-bold text-primary">
                        Step {step.num} of 4 ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibility" className="relative py-20 bg-gradient-to-b from-background to-card/30 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg)',
              opacity: 0.08
            }}
          />
        </div>

        <div className="container max-w-3xl">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/20 to-transparent rounded-full blur-3xl -z-0" />

            <div className="relative z-10 bg-card/40 backdrop-blur-md border border-primary/30 rounded-3xl p-10 md:p-16">
              <div className="max-w-2xl mb-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-accent">Instant Assessment</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Quick Eligibility Check</h2>
                <p className="text-lg text-muted mb-12">Share a few details and discover which schemes you qualify for. Takes less than 2 minutes!</p>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col">
                    <label htmlFor="category" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">
                      📂 Scheme Category <span className="text-accent">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      required
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground cursor-pointer font-medium hover:border-primary/60"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="age" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">🎂 Age</label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={handleFormChange}
                      placeholder="e.g., 25"
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted font-medium hover:border-primary/60"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="gender" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">👤 Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground cursor-pointer font-medium hover:border-primary/60"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="occupation" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">💼 Occupation</label>
                    <input
                      id="occupation"
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleFormChange}
                      placeholder="e.g., student / farmer"
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted font-medium hover:border-primary/60"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="city" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">📍 City</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      placeholder="e.g., Bengaluru"
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted font-medium hover:border-primary/60"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="income" className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">💰 Annual Income (₹)</label>
                    <input
                      id="income"
                      type="number"
                      name="income"
                      min="0"
                      value={formData.income}
                      onChange={handleFormChange}
                      placeholder="e.g., 500000"
                      className="px-4 py-3 bg-input border-2 border-primary/40 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted font-medium hover:border-primary/60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-5 bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/70 transition-all duration-300 hover:-translate-y-2 mb-8 disabled:opacity-50 shadow-xl active:translate-y-1"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin">⚡</span>
                      Checking Your Eligibility...
                    </span>
                  ) : (
                    '🎯 Check Eligibility Now'
                  )}
                </button>
              </form>

              {status && (
                <div className={`p-6 border-2 rounded-2xl font-medium mb-6 flex items-center gap-3 ${
                  status.includes('✓')
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : 'bg-accent/20 border-accent/50 text-accent'
                }`}>
                  {status.includes('✓') ? '✅' : '⏳'}
                  <span>{status}</span>
                </div>
              )}

              {eligibilityResults.length > 0 && (
                <div className="space-y-5 mt-8">
                  <div className="bg-gradient-to-r from-green-500/20 via-secondary/20 to-accent/20 border-2 border-green-500/40 rounded-3xl p-8">
                    <h3 className="text-3xl font-bold mb-2 text-green-400">🎉 You Qualify For These Schemes!</h3>
                    <p className="text-muted text-lg">We found <span className="text-accent font-bold">{eligibilityResults.length}</span> matching scheme(s) for you</p>
                  </div>

                  {eligibilityResults.map((scheme, idx) => (
                    <div key={scheme.id} className="group relative overflow-hidden p-8 bg-gradient-to-br from-card via-card/80 to-card/60 border-2 border-secondary/30 rounded-3xl hover:border-secondary/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-accent/0 to-primary/0 group-hover:from-secondary/10 group-hover:via-accent/10 group-hover:to-primary/10 transition-all duration-300 -z-10" />

                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold mb-2 text-foreground">{scheme.name}</h4>
                          <p className="text-muted text-base">{scheme.summary}</p>
                        </div>
                        {scheme.apply_url && (
                          <a
                            href={scheme.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-gradient-to-r from-green-500 via-secondary to-green-600 text-white rounded-full text-sm font-bold hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 whitespace-nowrap shadow-lg"
                          >
                            ✓ Apply Now
                          </a>
                        )}
                      </div>

                      {scheme.tags && scheme.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {scheme.tags.map((tag: string) => (
                            <span key={tag} className="px-4 py-2 bg-gradient-to-r from-secondary/30 to-accent/30 text-secondary rounded-full text-xs font-bold border border-secondary/40 hover:border-secondary/80 transition-all">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-secondary/20">
                        {scheme.eligibility && scheme.eligibility.length > 0 && (
                          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20">
                            <strong className="text-base text-primary block mb-4 flex items-center gap-2">✓ Eligibility Requirements</strong>
                            <ul className="text-sm text-muted space-y-2">
                              {scheme.eligibility.slice(0, 4).map((item: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                  <span className="text-primary font-bold">→</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {scheme.documents && scheme.documents.length > 0 && (
                          <div className="bg-secondary/5 p-5 rounded-2xl border border-secondary/20">
                            <strong className="text-base text-secondary block mb-4 flex items-center gap-2">📄 Required Documents</strong>
                            <ul className="text-sm text-muted space-y-2">
                              {scheme.documents.slice(0, 4).map((doc: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                  <span className="text-secondary font-bold">→</span>
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
