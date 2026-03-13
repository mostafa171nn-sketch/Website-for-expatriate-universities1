"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, Globe, Users, Award, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access universities from over 50 countries worldwide"
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Built with students' needs at the forefront"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Verified universities and programs"
    },
    {
      icon: GraduationCap,
      title: "Expert Support",
      description: "24/7 assistance throughout your application"
    }
  ];

  const stats = [
    { number: "50+", label: "Countries" },
    { number: "500+", label: "Universities" },
    { number: "10,000+", label: "Students Placed" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="gradient-text">Global Student Apply</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are dedicated to helping international students achieve their dream of studying abroad
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                Global Student Apply was founded with a simple mission: to make international education accessible to every student, regardless of their background or location.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that education has the power to transform lives and create opportunities. Our platform connects students with world-class universities and provides the support they need throughout the application process.
              </p>
              <ul className="space-y-3">
                {[
                  "Simplified application process",
                  "Transparent university information",
                  "Real-time application tracking",
                  "Dedicated student support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center">
                <div className="text-8xl">🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for a successful international education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

