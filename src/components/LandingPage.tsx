"use client"
import { DashboardButtons } from '@/components/DashboardButtons';
import { ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
export default function LandingPage() {
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
  
    const handleSignup = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setIsSubmitted(true);
      // In real app: API call to save email
      setTimeout(() => setIsSubmitted(false), 3000);
    };
  
    // Hero Section Component
    const HeroSection = () => (
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Technology help,
                <span className="text-blue-600 block">simplified</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Personal tech support for seniors, peace of mind for families. 
                <span className="block mt-2 font-medium text-gray-800">
                  No more frustrating troubleshooting.
                </span>
              </p>
  
               {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={() => {
                  const signupElement = document.getElementById('signup');
                  if (signupElement) {
                    signupElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚀 Get Help Today
              </button>
              <button 
                onClick={() => {
                  const featuresElement = document.getElementById('features');
                  if (featuresElement) {
                    featuresElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xl font-semibold px-8 py-4 rounded-xl transition-all duration-200"
              >
                  See How It Works
                </button>
              </div>
  
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Real humans, not bots</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Family-friendly</span>
                </div>
              </div>
            </div>
  
            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">👵🏻👴🏻</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Margaret & Harold</h3>
                  <p className="text-gray-600 mb-6">
                    &quot;Finally, tech support that speaks our language! No more waiting on hold or confusing instructions.&quot;
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    Problem Solved in 5 Minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  
    // Problem/Solution Section
    const ProblemSolutionSection = () => (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We understand the frustration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technology should bring joy, not stress. But too often, it feels like everything is designed for 20-year-olds.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Problems */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 mb-6">The Problems You Face:</h3>
              {[
                { icon: "😤", text: "Confusing tech support that talks over your head" },
                { icon: "📞", text: "Endless hold times and robotic phone trees" },
                { icon: "🎯", text: "Scam calls pretending to 'fix' your computer" },
                { icon: "👨‍👩‍👧‍👦", text: "Feeling guilty asking family for help... again" },
                { icon: "🔐", text: "Forgotten passwords and locked accounts" }
              ].map((problem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <span className="text-2xl">{problem.icon}</span>
                  <p className="text-gray-700 font-medium">{problem.text}</p>
                </div>
              ))}
            </div>
  
            {/* Solutions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Our Solution:</h3>
              {[
                { icon: "🤝", text: "Personal tech concierge who knows your name" },
                { icon: "⚡", text: "Instant help - no waiting, no phone trees" },
                { icon: "🛡️", text: "Scam protection and security you can trust" },
                { icon: "👨‍👩‍👧‍👦", text: "Family stays connected without the burden" },
                { icon: "🔑", text: "Simple, secure password management" }
              ].map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <span className="text-2xl">{solution.icon}</span>
                  <p className="text-gray-700 font-medium">{solution.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  
    // Features Section
    const FeaturesSection = () => (
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve designed every feature with seniors in mind. Simple, clear, and always helpful.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🆘",
                title: "One-Tap Help",
                description: "Big red button connects you instantly to real human support. No menus, no waiting.",
                color: "red"
              },
              {
                icon: "📚",
                title: "Learn at Your Pace",
                description: "Step-by-step guides with pictures. Build confidence with every small victory.",
                color: "blue"
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Portal",
                description: "Loved ones can help remotely or get updates, without becoming your IT department.",
                color: "green"
              },
              {
                icon: "🛡️",
                title: "Safety First",
                description: "Scam detection, device health monitoring, and simple security that actually works.",
                color: "purple"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  
    // Testimonials Section
    const TestimonialsSection = () => (
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real stories from real people
            </h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dorothy, 72",
                quote: "I was so scared of breaking something. Now I feel confident using my iPad to video call my grandchildren!",
                issue: "iPad setup & FaceTime"
              },
              {
                name: "Robert, 68",
                quote: "They saved me from a scammer who called pretending to be Microsoft. I'm so grateful for their protection.",
                issue: "Scam protection"
              },
              {
                name: "Sarah (daughter)",
                quote: "Mom gets the help she needs without calling me at work. The family portal lets me stay connected without stress.",
                issue: "Family peace of mind"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.issue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  
    // Pricing Section
    const PricingSection = () => (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simple, honest pricing
            </h2>
            <p className="text-xl text-gray-600">
              Less than a cup of coffee per week. Cancel anytime.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$9.99",
                period: "/month",
                features: ["Chat support", "Self-help guides", "Device monitoring", "Scam alerts"],
                popular: false
              },
              {
                name: "Premium",
                price: "$19.99",
                period: "/month",
                features: ["Everything in Basic", "Phone & video support", "Priority response", "Family portal access"],
                popular: true
              },
              {
                name: "Family Plan",
                price: "$29.99",
                period: "/month",
                features: ["Everything in Premium", "Up to 4 family members", "Remote assistance", "Dedicated concierge"],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-6 rounded-xl border-2 ${
                plan.popular 
                  ? 'border-blue-500 bg-blue-50 transform scale-105' 
                  : 'border-gray-200 bg-white'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  
    // Final CTA Section
    const FinalCTASection = () => (
      <section id="signup" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to make technology your friend?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of seniors who&apos;ve discovered that tech support can be friendly, helpful, and actually solve problems.
          </p>
  
          {!isSubmitted ? (
            <form onSubmit={handleSignup} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-colors"
                >
                  Get Started Today
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                No spam, ever. Start your free trial today.
              </p>
            </form>
          ) : (
            <div className="bg-green-500 text-white p-6 rounded-lg max-w-md mx-auto">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-xl font-bold mb-2">Welcome aboard!</h3>
              <p>We&apos;ll be in touch within 24 hours to get you started.</p>
            </div>
          )}
  
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span>Human Support</span>
            </div>
          </div>
        </div>
      </section>
    );
    function OpenDashboardLinkButton() {
        return (
          <Link href="/dashboard" className="animate-[fade-in_0.2s]">
            <Button>Dashboard</Button>
          </Link>
        );
      }
    // Navigation
    const Navigation = () => (
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🤝</div>
              <span className="text-xl font-bold text-gray-800">Tech4Seniors</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
         
          <ClerkLoading>
          <div className="w-40 h-9" />
        </ClerkLoading>
        <SignedIn>
          <OpenDashboardLinkButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4 animate-[fade-in_0.2s]">
            <SignInButton mode="modal">
              <Button variant="ghost">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
            </div>
          </div>
        </div>
      </nav>
    );
  
    return (
      <div className="min-h-screen">
        <Navigation />
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-2xl">🤝</div>
              <span className="text-xl font-bold">Tech4Seniors</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making technology accessible, one person at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }