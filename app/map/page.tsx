"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EgyptMap } from "@/components/map/EgyptMap";
import { egyptianUniversities } from "@/data/mockData";
import { University } from "@/types";
import { MapPin, List, Grid } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils";

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 pb-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Interactive <span className="gradient-text">Map</span>
              </h1>
              <p className="text-gray-600">
                Explore universities across Egypt
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-card">
              <button
                onClick={() => setViewMode("map")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  viewMode === "map"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <MapPin size={18} />
                Map
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  viewMode === "list"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <List size={18} />
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-custom">
          {viewMode === "map" ? (
            <EgyptMap onUniversitySelect={setSelectedUniversity} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {egyptianUniversities.map((uni) => (
                <Link
                  key={uni.id}
                  href={`/universities/${uni.id}`}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {uni.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{uni.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin size={14} />
                        <span>{uni.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {uni.rating && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            ★ {uni.rating.averageRating.toFixed(1)}
                          </span>
                        )}
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          uni.type === "public"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        )}>
                          {uni.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                    {uni.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {uni.programs.slice(0, 3).map((program) => (
                      <span
                        key={program}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

