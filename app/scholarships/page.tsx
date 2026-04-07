"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScholarshipCard, ScholarshipFilters } from "@/components/scholarships/ScholarshipCard";
import { scholarships, egyptianUniversities, availableMajors } from "@/data/mockData";
import { Scholarship } from "@/types";
import { Search, GraduationCap, Filter } from "lucide-react";
import { DarkModeProvider } from "@/hooks/useDarkMode";

export default function ScholarshipsPage() {
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(scholarships);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    university: "",
    major: "",
    coverage: "",
    sortBy: "deadline",
  });

  const universities = Array.from(new Set(scholarships.map(s => s.university))).filter(Boolean);

  useEffect(() => {
    let filtered = [...scholarships];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.eligibleMajors.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // University filter
    if (filters.university) {
      filtered = filtered.filter((s) => s.university === filters.university);
    }

    // Major filter
    if (filters.major) {
      filtered = filtered.filter((s) => 
        s.eligibleMajors.includes(filters.major) || s.eligibleMajors.includes("All Majors")
      );
    }

    // Coverage filter
    if (filters.coverage) {
      filtered = filtered.filter((s) => s.coverage === filters.coverage);
    }

    // Sort
    switch (filters.sortBy) {
      case "deadline":
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "coverage":
        filtered.sort((a, b) => (a.coverage === "full" ? -1 : 1));
        break;
    }

    setFilteredScholarships(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Calculate stats
  const totalScholarships = scholarships.length;
  const fullScholarships = scholarships.filter(s => s.coverage === "full").length;
  const partialScholarships = scholarships.filter(s => s.coverage === "partial").length;
  const activeScholarships = scholarships.filter(s => new Date(s.deadline) > new Date()).length;

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
              Scholarships in <span className="gradient-text">Egypt</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Discover scholarships for international students to study at top Egyptian universities
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ">
            <div className="card text-center dark:bg-black">
              <div className="text-3xl font-bold gradient-text mb-1">{totalScholarships}</div>
              <p className="text-sm text-gray-500">Total Scholarships</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card text-center dark:bg-black">
              <div className="text-3xl font-bold text-green-600 mb-1">{fullScholarships}</div>
              <p className="text-sm text-gray-500">Full Funding</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card text-center dark:bg-black">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{partialScholarships}</div>
              <p className="text-sm text-gray-500">Partial Funding</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card text-center dark:bg-black">
              <div className="text-3xl font-bold text-blue-600 mb-1">{activeScholarships}</div>
              <p className="text-sm text-gray-500">Active Applications</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search scholarships by name, university, or major..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 py-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 ">
        <div className="container-custom ">
          {/* Filters */}
          <ScholarshipFilters 
            onFilterChange={handleFilterChange}
            universities={universities}
            majors={availableMajors}
          />

          {/* Results count */}
          <div className="mt-6 mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredScholarships.length}</span> scholarships
            </p>
          </div>

          {/* Scholarships Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No scholarships found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

