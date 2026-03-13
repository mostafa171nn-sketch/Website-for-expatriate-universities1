"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAdvisor, AIAdvisorButton } from "@/components/ai/AIAdvisor";
import { MessageCircle, GraduationCap, MapPin, DollarSign, Building, CheckCircle } from "lucide-react";

export default function AIAdvisorPage() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(true);

  const features = [
    {
      icon: GraduationCap,
      title: "Personalized Recommendations",
      description: "Get university suggestions based on your preferred major, location, and budget",
    },
    {
      icon: MapPin,
      title: "City Preferences",
      description: "Filter by your preferred Egyptian city - Cairo, Alexandria, Giza, and more",
    },
    {
      icon: DollarSign,
      title: "Budget Matching",
      description: "Find universities that match your tuition budget range",
    },
    {
      icon: Building,
      title: "Type Selection",
      description: "Choose between public and private universities based on your preference",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Answer Questions",
      description: "Tell us about your major, preferred city, budget, and university type",
    },
    {
      number: 2,
      title: "Get Recommendations",
      description: "Our AI analyzes your preferences and finds the best matches",
    },
    {
      number: 3,
      title: "Explore Universities",
      description: "Browse detailed university profiles and find your perfect fit",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI University <span className="gradient-text">Advisor</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let our intelligent advisor help you find the perfect Egyptian university based on your profile and preferences
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Try the AI Advisor Now
            </h2>
            <p className="text-gray-600">
              Click the chat button to start your personalized university search
            </p>
          </div>

          {/* Preview Chat */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="bg-gradient-primary p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI University Advisor</h3>
                  <p className="text-white/80 text-xs">Online</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <MessageCircle size={16} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                  <p className="text-sm text-gray-800">
                    Hello! I&apos;m your AI University Advisor for Egypt. I&apos;ll help you find the perfect university based on your preferences. What major do you want to study?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 flex-shrink-0">
                  <span className="text-xs">You</span>
                </div>
                <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                  <p className="text-sm">
                    I&apos;m interested in Engineering
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <MessageCircle size={16} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                  <p className="text-sm text-gray-800">
                    Great choice! Engineering is a popular field in Egypt. In which city would you prefer to study?
                  </p>
                </div>
              </div>
              <div className="text-center py-4">
                <button
                  onClick={() => setIsAdvisorOpen(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Start Your Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Use Our AI Advisor?
            </h2>
            <p className="text-gray-600">
              Get personalized recommendations from our intelligent system
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Save time on research",
              "Get unbiased recommendations",
              "Access comprehensive university data",
              "Compare multiple universities easily",
              "Make informed decisions",
              "Find hidden gems",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Advisor Chat Widget */}
      <AIAdvisor isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </div>
  );
}

