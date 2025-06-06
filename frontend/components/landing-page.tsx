"use client"

import { ArrowRight, Star, MapPin, Plane, Hotel, Train, Phone, Mail, Globe, Menu, Calculator, Leaf } from "lucide-react"

interface LandingPageProps {
  onStartBooking: () => void
}

export function LandingPage({ onStartBooking }: LandingPageProps) {
  const services = [
    {
      icon: Hotel,
      title: "Premium Hotels",
      description: "Luxury accommodations in the world's most beautiful destinations",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Seamless flight arrangements to anywhere your business takes you",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Train,
      title: "Train Journeys",
      description: "Comfortable rail travel through scenic landscapes",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const features = [
    {
      icon: Leaf,
      title: "Sustainable Travel",
      description: "Reduced booking fees and service charges with eco-friendly options",
    },
    {
      icon: Calculator,
      title: "Carbon Offset",
      description: "Carbon offset integration with preferred vendors",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Time savings for travelers and administrators with our worldwide network",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Manager, TechCorp",
      content: "Tessol Zoe transformed our corporate travel experience. Seamless, professional, and reliable.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      content: "Outstanding service and attention to detail. Our team loves the easy booking process.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      content: "The best corporate travel solution we've used. Highly recommended for any business.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-bg-light sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">Tessol Zoe</div>
                <div className="text-xs text-primary-bright">Travel Concierge</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-text-muted hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#testimonials" className="text-text-muted hover:text-primary transition-colors font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-text-muted hover:text-primary transition-colors font-medium">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-primary hover:text-primary-dark font-medium">Log In</button>
              <button
                onClick={onStartBooking}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Get Started
              </button>
              <button className="md:hidden">
                <Menu className="text-text-muted" size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-bg-light py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-primary-bright font-medium tracking-wide uppercase text-sm">
                  Corporate Travel Management
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Everyone's personal
                  <br />
                  <span className="text-primary-bright">travel concierge</span>
                </h1>
              </div>

              <p className="text-xl text-text-muted leading-relaxed max-w-lg">
                Tailored support for every role in your organization. Book and manage travel in one place with our
                sustainable travel solutions.
              </p>

              <button
                onClick={onStartBooking}
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-all font-medium text-lg inline-flex items-center group"
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Business Traveler"
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-bg-light rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-bright rounded-full"></div>
                    <span className="text-sm font-medium text-primary">Available 24/7</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-bg-light rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Leaf className="text-primary-bright" size={20} />
                    <span className="text-sm font-medium text-primary">Eco-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-bg rounded-lg py-2 px-4 mb-4">
              <span className="text-sm font-medium text-primary-bright">Personalized Service</span>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-6">Everyone's personal travel concierge</h2>
            <p className="text-text-muted max-w-3xl mx-auto">Tailored support for every role in your organization</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-bg-light border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="bg-bg w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-text-muted">{service.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-primary-bright font-medium">
                      <span>Book & manage travel in one place</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-bg-light rounded-2xl p-6 shadow-sm">
                  <div className="bg-bg w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-muted">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied business travelers who trust us with their corporate travel needs
          </p>
          <button
            onClick={onStartBooking}
            className="bg-bg-light text-primary px-8 py-4 rounded-lg hover:bg-white transition-colors font-medium text-lg inline-flex items-center group"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-bg rounded-lg py-2 px-4 mb-4">
              <span className="text-sm font-medium text-primary-bright">Testimonials</span>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-6">What Our Clients Say</h2>
            <p className="text-text-muted">Trusted by leading companies worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-bg rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-primary mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-text-muted text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-bg-light rounded-lg py-2 px-4 mb-4">
                <span className="text-sm font-medium text-primary-bright">Get in Touch</span>
              </div>
              <h2 className="text-4xl font-bold text-primary mb-6">Let's Plan Your Next Trip</h2>
              <p className="text-text-muted">Ready to experience premium corporate travel?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-bg-light rounded-2xl p-8 shadow-sm">
                <div className="bg-bg w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Phone className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Call Us</h3>
                <p className="text-text-muted">+1 (555) 123-4567</p>
              </div>

              <div className="bg-bg-light rounded-2xl p-8 shadow-sm">
                <div className="bg-bg w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Email Us</h3>
                <p className="text-text-muted">hello@tessolzoe.com</p>
              </div>

              <div className="bg-bg-light rounded-2xl p-8 shadow-sm">
                <div className="bg-bg w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Visit Us</h3>
                <p className="text-text-muted">123 Business District, City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">₹</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Tessol Zoe</h3>
                  <p className="text-xs text-white/70">Travel Concierge</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Your premium corporate travel partner, delivering exceptional service worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hotel Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Flight Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Train Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Group Travel
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2024 Tessol Zoe Travel Concierge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
