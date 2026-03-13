"use client";

import { useState, useEffect, useRef } from "react";
import { University } from "@/types";
import { egyptianUniversities } from "@/data/mockData";
import { MapPin, Search, Navigation, X, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils";

interface EgyptMapProps {
  onUniversitySelect?: (university: University) => void;
}

export function EgyptMap({ onUniversitySelect }: EgyptMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState(egyptianUniversities);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const cities = Array.from(new Set(egyptianUniversities.map(u => u.city)));
  const allMajors = Array.from(new Set(egyptianUniversities.flatMap(u => u.programs)));

  useEffect(() => {
    let filtered = egyptianUniversities;

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter((u) => u.city === selectedCity);
    }

    if (selectedMajor) {
      filtered = filtered.filter((u) => u.programs.includes(selectedMajor));
    }

    setFilteredUniversities(filtered);
  }, [searchTerm, selectedCity, selectedMajor]);

  const handleFindNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort by distance if user location is available
  const displayUniversities = userLocation
    ? [...filteredUniversities].sort((a, b) => {
        if (!a.coordinates || !b.coordinates) return 0;
        const distA = getDistance(
          userLocation.lat,
          userLocation.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distB = getDistance(
          userLocation.lat,
          userLocation.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distA - distB;
      })
    : filteredUniversities;

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
      {/* Map Background */}
      <div ref={mapRef} className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* SVG Map of Egypt */}
        <svg viewBox="0 0 400 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="450" fill="url(#grid)" />
          
          {/* Simplified Egypt outline */}
          <path
            d="M 120 50 
               Q 150 40, 180 45 
               L 220 40 
               Q 260 35, 290 50
               L 310 80
               Q 320 120, 315 160
               L 310 200
               Q 300 240, 280 270
               L 260 300
               Q 240 330, 200 350
               L 160 360
               Q 120 365, 100 340
               L 85 300
               Q 70 260, 75 220
               L 80 180
               Q 85 140, 95 100
               Z"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Nile River representation */}
          <path
            d="M 195 45 Q 190 100, 200 150 Q 210 200, 205 250 Q 195 300, 185 340"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* City markers */}
          {filteredUniversities.map((uni, index) => {
            // Calculate position based on coordinates
            const x = 100 + ((uni.coordinates?.lng || 31) - 25) * 15;
            const y = 400 - ((uni.coordinates?.lat || 30) - 20) * 30;
            
            return (
              <g
                key={uni.id}
                onClick={() => setSelectedUniversity(uni)}
                className="cursor-pointer"
                transform={`translate(${Math.max(30, Math.min(370, x))}, ${Math.max(30, Math.min(400, y))})`}
              >
                <circle
                  r="8"
                  fill={selectedUniversity?.id === uni.id ? "#4f46e5" : "#3b82f6"}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all"
                />
                <text
                  y="-15"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#374151"
                  fontWeight="500"
                >
                  {uni.name.split(" ")[0]}
                </text>
              </g>
            );
          })}

          {/* User location marker */}
          {userLocation && (
            <g>
              <circle
                cx={100 + ((userLocation.lng - 25) * 15)}
                cy={400 - ((userLocation.lat - 20) * 30)}
                r="12"
                fill="#10b981"
                fillOpacity="0.3"
              />
              <circle
                cx={100 + ((userLocation.lng - 25) * 15)}
                cy={400 - ((userLocation.lat - 20) * 30)}
                r="6"
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Search & Filter Bar */}
      <div className="absolute top-4 left-4 right-4 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center gap-2",
            showFilters && "bg-primary-50 border-primary-200"
          )}
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleFindNearMe}
          className="px-4 py-3 bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Navigation className="w-5 h-5" />
          <span className="hidden md:inline">Near Me</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Majors</option>
                {allMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* University List */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 max-h-[200px] overflow-y-auto">
          <div className="p-3 grid gap-2">
            {displayUniversities.slice(0, 5).map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUniversity(uni)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                  selectedUniversity?.id === uni.id
                    ? "bg-primary-50 border border-primary-200"
                    : "hover:bg-gray-50 border border-transparent"
                )}
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                  {uni.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{uni.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} />
                    <span>{uni.city}</span>
                    {uni.rating && (
                      <>
                        <span>•</span>
                        <span className="text-yellow-500">★ {uni.rating.averageRating.toFixed(1)}</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected University Popup */}
      {selectedUniversity && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-100">
          <button
            onClick={() => setSelectedUniversity(null)}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {selectedUniversity.name.charAt(0)}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{selectedUniversity.name}</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-3">
              <MapPin size={14} />
              <span>{selectedUniversity.city}, Egypt</span>
            </div>
            {selectedUniversity.rating && (
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{selectedUniversity.rating.averageRating.toFixed(1)}</span>
                <span className="text-gray-400">({selectedUniversity.rating.totalReviews} reviews)</span>
              </div>
            )}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {selectedUniversity.description}
            </p>
            <Link
              href={`/universities/${selectedUniversity.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors w-full justify-center"
            >
              View University
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

