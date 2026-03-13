"use client";

import { Scholarship } from "@/types";
import { Calendar, MapPin, GraduationCap, ExternalLink, Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export function ScholarshipCard({ scholarship, onSave, isSaved = false }: ScholarshipCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const formatDeadline = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isDeadlinePassed = () => {
    return new Date(scholarship.deadline) < new Date();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onSave) {
      onSave(scholarship.id);
    }
  };

  const coverageColor = scholarship.coverage === "full" 
    ? "bg-green-100 text-green-700" 
    : "bg-yellow-100 text-yellow-700";

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100",
      isDeadlinePassed() && "opacity-75"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold uppercase",
              coverageColor
            )}>
              {scholarship.coverage} Coverage
            </span>
            {scholarship.coverageAmount && (
              <span className="text-sm font-medium text-primary-600">
                {scholarship.coverageAmount}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {scholarship.name}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <GraduationCap size={14} />
            {scholarship.university}
          </p>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "p-2 rounded-full transition-colors",
            saved 
              ? "bg-red-50 text-red-500" 
              : "bg-gray-100 text-gray-400 hover:text-red-500"
          )}
        >
          <Heart size={20} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {scholarship.description}
      </p>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-2">Eligible Majors:</p>
        <div className="flex flex-wrap gap-2">
          {scholarship.eligibleMajors.slice(0, 3).map((major) => (
            <span
              key={major}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
            >
              {major}
            </span>
          ))}
          {scholarship.eligibleMajors.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{scholarship.eligibleMajors.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isDeadlinePassed() ? "text-red-500" : "text-gray-500"
        )}>
          <Calendar size={16} />
          <span className="font-medium">
            {isDeadlinePassed() ? "Deadline passed" : `Deadline: ${formatDeadline(scholarship.deadline)}`}
          </span>
        </div>
        <a
          href={scholarship.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-colors",
            isDeadlinePassed()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary-600 text-white hover:bg-primary-700"
          )}
        >
          Apply Now
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

interface ScholarshipFiltersProps {
  onFilterChange: (filters: {
    university: string;
    major: string;
    coverage: string;
    sortBy: string;
  }) => void;
  universities: string[];
  majors: string[];
}

export function ScholarshipFilters({ onFilterChange, universities, majors }: ScholarshipFiltersProps) {
  const [filters, setFilters] = useState({
    university: "",
    major: "",
    coverage: "",
    sortBy: "deadline",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Scholarships</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <select
            value={filters.university}
            onChange={(e) => handleFilterChange("university", e.target.value)}
            className="input-field"
          >
            <option value="">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major
          </label>
          <select
            value={filters.major}
            onChange={(e) => handleFilterChange("major", e.target.value)}
            className="input-field"
          >
            <option value="">All Majors</option>
            {majors.map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coverage
          </label>
          <select
            value={filters.coverage}
            onChange={(e) => handleFilterChange("coverage", e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="full">Full Coverage</option>
            <option value="partial">Partial Coverage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="input-field"
          >
            <option value="deadline">Deadline</option>
            <option value="name">Name</option>
            <option value="coverage">Coverage</option>
          </select>
        </div>
      </div>
    </div>
  );
}

