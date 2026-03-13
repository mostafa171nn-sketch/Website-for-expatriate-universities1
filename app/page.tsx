"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe, Users, Award, CheckCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { egyptianUniversities } from "@/data/mockData";
import { RatingDisplay } from "@/components/ui/StarRating";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.to(".floating-card", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const topUniversities = egyptianUniversities.slice(0, 6);

  const features = [
    {
      icon: Globe,
      title: "Egyptian Universities",
      description: "Access to 15+ top universities across Egypt including Cairo, Alexandria, and more",
    },
    {
      icon: BookOpen,
      title: "Easy Applications",
      description: "Streamlined application process for international students",
    },
    {
      icon: Users,
      title: "Student Reviews",
      description: "Read authentic reviews from international students",
    },
    {
      icon: Award,
      title: "Scholarships",
      description: "Find full and partial funding opportunities",
    },
  ];

  const steps = [
    { number: 1, title: "Browse Universities", description: "Explore universities in Egypt" },
    { number: 2, title: "Check Reviews", description: "Read student experiences" },
    { number: 3, title: "Find Scholarships", description: "Apply for funding" },
    { number: 4, title: "Submit Application", description: "Complete your application" },
  ];

  return (
    <div ref={heroRef} className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="absolute inset-0 pattern-grid" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-300/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-300/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Study in <span className="gradient-text">Egypt</span>
              </h1>
              <p className="hero-desc text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Your gateway to world-class education in Egypt. Discover top universities, 
                read authentic reviews, and find scholarships - all in one place.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/universities" className="btn-primary inline-flex items-center justify-center gap-2">
                  Explore Universities <ArrowRight size={20} />
                </Link>
                <Link href="/ai-advisor" className="btn-outline inline-flex items-center justify-center gap-2">
                  AI Advisor
                </Link>
              </div>
            </div>

            <div className="hero-image relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl" />
                <div className="relative p-8">
                  <div className="floating-card absolute top-4 left-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">🏛️</div>
                      <div>
                        <p className="font-semibold text-gray-900">Cairo University</p>
                        <p className="text-sm text-gray-500">Giza</p>
                      </div>
                    </div>
                  </div>
                  <div className="floating-card absolute top-32 right-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-2xl">🎓</div>
                      <div>
                        <p className="font-semibold text-gray-900">AUC</p>
                        <p className="text-sm text-gray-500">Cairo</p>
                      </div>
                    </div>
                  </div>
                  <div className="floating-card absolute bottom-20 left-8 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-2xl">📚</div>
                      <div>
                        <p className="font-semibold text-gray-900">Alexandria University</p>
                        <p className="text-sm text-gray-500">Alexandria</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Universities" },
              { number: "50+", label: "Programs" },
              { number: "1000+", label: "Students" },
              { number: "20+", label: "Scholarships" },
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text">{stat.number}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">Study in Egypt</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We help international students discover and apply to Egyptian universities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="scroll-animate bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top <span className="gradient-text">Universities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the best universities in Egypt
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, index) => (
              <div
                key={index}
                className="scroll-animate bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {uni.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{uni.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {uni.city}
                    </p>
                  </div>
                </div>
                {uni.rating && (
                  <div className="mb-3">
                    <RatingDisplay 
                      rating={uni.rating.averageRating} 
                      totalReviews={uni.rating.totalReviews}
                      size="sm"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {uni.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {uni.programs.slice(0, 2).map((program: string) => (
                    <span
                      key={program}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/universities`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/universities" className="btn-outline">
              View All Universities
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary-600 to-purple-700 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Find your dream university in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-white/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Start Your <span className="gradient-text">Journey</span>?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join thousands of international students who have successfully applied to 
                Egyptian universities through our platform.
              </p>
              <ul className="space-y-4">
                {[
                  "Browse top Egyptian universities",
                  "Read authentic student reviews",
                  "Find scholarships and funding",
                  "Get AI-powered recommendations",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/universities" className="btn-primary inline-flex items-center gap-2">
                  Get Started <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center">
                <div className="text-8xl">🇪🇬</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

