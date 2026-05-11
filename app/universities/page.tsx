"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Globe, ArrowRight, Filter, Heart } from "lucide-react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { University } from "@/types";
import { egyptianUniversities } from "@/data/mockData";
import { RatingDisplay } from "@/components/ui/StarRating";
import { cn } from "@/utils";

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState(egyptianUniversities);
  const [showFilters, setShowFilters] = useState(false);

  const cities = Array.from(new Set(egyptianUniversities.map((u) => u.city)));
  const majors = Array.from(new Set(egyptianUniversities.flatMap((u) => u.programs)));

  useEffect(() => {
    let filtered = egyptianUniversities;

    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCity) {
      filtered = filtered.filter((uni) => uni.city === selectedCity);
    }

    if (selectedType) {
      filtered = filtered.filter((uni) => uni.type === selectedType);
    }

    if (selectedMajor) {
      filtered = filtered.filter((uni) => uni.programs.includes(selectedMajor));
    }

    setFilteredUniversities(filtered);
  }, [searchTerm, selectedCity, selectedType, selectedMajor]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".university-card",
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
  }, [filteredUniversities]);

  return (
    <div className="min-h-screen ">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br  0 to-secondary-50 dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
              Universities in <span className="gradient-text">Egypt</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              Discover top universities in Egypt for international students
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto ">
            <div className="bg-white rounded-2xl shadow-card p-4 md:p-6 dark:bg-slate-900">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
                    <input
                      type="text"
                      placeholder="Search universities by name or major..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-12"
                    />
                  </div>
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input-field "
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              {/* Advanced Filters Toggle */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600"
                >
                  <Filter size={16} />
                  {showFilters ? "Hide" : "Show"} Filters
                </button>
                
                {showFilters && (
                  <div className="mt-4">
                    <select
                      value={selectedMajor}
                      onChange={(e) => setSelectedMajor(e.target.value)}
                      className="input-field"
                    >
                      <option value="">All Majors</option>
                      {majors.map((major) => (
                        <option key={major} value={major}>
                          {major}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-white">
              Showing <span className="font-semibold text-gray-900 dark:text-gray-400">{filteredUniversities.length}</span> universities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="university-card bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-800 dark:bg-slate-800"
              >
                <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-6 relative ">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-soft flex items-center justify-center text-4xl dark:bg-slate-700">
                    🎓
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors dark:bg-slate-800 ">
                    <Heart size={18} className="text-gray-400 hover:text-red-500 dark:bg-slate-800 " />
                  </button>
                  <span className={cn(
                    "absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium dark:bg-slate-800  dark:text-gray-300  ",
                    university.type === "public"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700 "
                  )}>
                    {university.type === "public" ? "Public" : "Private"}
                  </span>
                </div>
                <div className="p-6 " >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white ">
                    {university.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-3 dark:text-gray-300 ">
                    <MapPin size={16} />
                    <span>{university.city}</span>
                  </div>
                  
                  {/* Rating Display */}
                  {university.rating && (
                    <div className="mb-3  text-white">
                      
                      <RatingDisplay 
                        rating={university.rating.averageRating} 
                        totalReviews={university.rating.totalReviews}
                        size="sm"
                      
                      />
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2  dark:text-gray-300 ">
                    {university.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4  dark:text-gray-300 ">
                    {university.programs.slice(0, 3).map((program) => (
                      <span
                        key={program}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full  dark:text-gray-300  dark:bg-slate-900"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {university.tuitionRange}
                    </span>
                    <Link
                      href={`/universities/${university.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No universities found
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

