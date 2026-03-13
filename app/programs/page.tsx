"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Program } from "@/types";
import { getDegreeLabel } from "@/utils";

const mockPrograms: Program[] = [
  {
    id: "1",
    universityId: "1",
    universityName: "Harvard University",
    name: "Computer Science",
    degreeType: "master",
    duration: "2 years",
    description: "Master's program in Computer Science focusing on AI, machine learning, and software engineering.",
    requirements: ["Bachelor's degree in CS", "GRE score", "TOEFL/IELTS", "3 letters of recommendation"]
  },
  {
    id: "2",
    universityId: "2",
    universityName: "MIT",
    name: "Software Engineering",
    degreeType: "master",
    duration: "1.5 years",
    description: "Advanced software engineering program with hands-on projects and industry partnerships.",
    requirements: ["Bachelor's degree", "GRE score", "Statement of purpose", "Resume"]
  },
  {
    id: "3",
    universityId: "1",
    universityName: "Harvard University",
    name: "Business Administration",
    degreeType: "master",
    duration: "2 years",
    description: "MBA program with specializations in Finance, Marketing, and Entrepreneurship.",
    requirements: ["Bachelor's degree", "GMAT score", "Work experience", "2 letters of recommendation"]
  },
  {
    id: "4",
    universityId: "3",
    universityName: "Stanford University",
    name: "Computer Science",
    degreeType: "phd",
    duration: "4-5 years",
    description: "PhD program in Computer Science with research focus on cutting-edge technologies.",
    requirements: ["Master's degree", "Research experience", "GRE score", "Publications"]
  },
  {
    id: "5",
    universityId: "4",
    universityName: "University of Oxford",
    name: "Data Science",
    degreeType: "master",
    duration: "1 year",
    description: "Intensive data science program covering machine learning, statistics, and big data.",
    requirements: ["Bachelor's in relevant field", "GRE preferred", "Math background", "Coding experience"]
  },
  {
    id: "6",
    universityId: "5",
    universityName: "Yale University",
    name: "Law",
    degreeType: "master",
    duration: "3 years",
    description: "Comprehensive law program preparing students for global legal careers.",
    requirements: ["Bachelor's degree", "LSAT score", "English proficiency", "Personal statement"]
  }
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState(mockPrograms);

  useEffect(() => {
    const filtered = mockPrograms.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.universityName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDegree = !selectedDegree || program.degreeType === selectedDegree;
      return matchesSearch && matchesDegree;
    });
    setFilteredPrograms(filtered);
  }, [searchTerm, selectedDegree]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".program-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    });
    return () => ctx.revert();
  }, [filteredPrograms]);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect program for your academic and career goals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card p-4 md:p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search programs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-12"
                    />
                  </div>
                </div>
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Degrees</option>
                  <option value="bachelor">Bachelor's</option>
                  <option value="master">Master's</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="program-card bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {getDegreeLabel(program.degreeType)}
                    </span>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock size={12} /> {program.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {program.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{program.universityName}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Requirements:</p>
                    <ul className="space-y-1">
                      {program.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                          <span className="w-1 h-1 bg-primary-400 rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/apply?program=${program.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Apply Now <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No programs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

