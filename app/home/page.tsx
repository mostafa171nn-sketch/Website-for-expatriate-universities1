"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Globe, Users, Award, CheckCircle, LogOut } from "lucide-react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";
import toast from "react-hot-toast";

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const universities = [
    { name: "Harvard University", country: "USA", logo: "🎓" },
    { name: "Oxford University", country: "UK", logo: "📚" },
    { name: "MIT", country: "USA", logo: "🔬" },
    { name: "Stanford University", country: "USA", logo: "🏛️" },
    { name: "Cambridge University", country: "UK", logo: "🎓" },
    { name: "Yale University", country: "USA", logo: "📖" },
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Apply to universities from 50+ countries worldwide",
    },
    {
      icon: BookOpen,
      title: "Easy Process",
      description: "Streamlined multi-step application process",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get guidance from education experts",
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Real-time application status tracking",
    },
  ];

  const steps = [
    { number: 1, title: "Create Account", description: "Sign up and complete your profile" },
    { number: 2, title: "Browse Universities", description: "Explore universities and programs" },
    { number: 3, title: "Submit Application", description: "Fill in your details and upload documents" },
    { number: 4, title: "Track Status", description: "Monitor your application in real-time" },
  ];

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div ref={heroRef} className="min-h-screen">
      {/* Custom Header with user info and logout */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link href="/home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Global Student Apply</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/universities" className="text-sm font-medium text-gray-600 hover:text-primary-600 ">
                Universities
              </Link>
              <Link href="/programs" className="text-sm font-medium text-gray-600 hover:text-primary-600">
                Programs
              </Link>
              <Link href="/apply" className="text-sm font-medium text-gray-600 hover:text-primary-600">
                Apply
              </Link>
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="absolute inset-0 pattern-grid" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-ob" />
        <div className="absolute top-40 right-10 w-96 h3xl animate-bl-300/30-96 bg-secondary rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-300/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Welcome to Your{" "}
                <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="hero-desc text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Global Student Apply helps international students discover and apply to 
                universities worldwide. Start your journey today!
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/apply" className="btn-primary inline-flex items-center justify-center gap-2">
                  Start Application <ArrowRight size={20} />
                </Link>
                <Link href="/universities" className="btn-outline inline-flex items-center justify-center gap-2">
                  Browse Universities
                </Link>
              </div>
            </div>

            <div className="hero-image relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl" />
                <div className="relative p-8">
                  <div className="floating-card absolute top-4 left-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">🎓</div>
                      <div>
                        <p className="font-semibold text-gray-900">Harvard University</p>
                        <p className="text-sm text-gray-500">USA</p>
                      </div>
                    </div>
                  </div>
                  <div className="floating-card absolute top-32 right-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-2xl">📚</div>
                      <div>
                        <p className="font-semibold text-gray-900">Oxford University</p>
                        <p className="text-sm text-gray-500">UK</p>
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
              { number: "50+", label: "Countries" },
              { number: "500+", label: "Universities" },
              { number: "10,000+", label: "Students" },
              { number: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
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
              Why Choose <span className="gradient-text">Global Student Apply</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make it easy for international students to apply to universities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
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
              Partner <span className="gradient-text">Universities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who got accepted to top universities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                    {uni.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{uni.name}</h3>
                    <p className="text-gray-500">{uni.country}</p>
                  </div>
                </div>
                <Link
                  href={`/universities`}
                  className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Programs <ArrowRight size={16} className="ml-1" />
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
              Apply to your dream university in four simple steps
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
                their dream universities through our platform.
              </p>
              <ul className="space-y-4">
                {[
                  "Easy online application process",
                  "Secure document upload",
                  "Real-time application tracking",
                  "Expert guidance and support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
                  Start Your Application <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center">
                <div className="text-8xl">🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

