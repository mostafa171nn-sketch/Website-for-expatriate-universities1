"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { reviews, egyptianUniversities } from "@/data/mockData";
import { Review } from "@/types";
import { Search, Filter, Star, Calendar, User, MapPin } from "lucide-react";
import { cn } from "@/utils";

export default function ReviewsPage() {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let filtered = [...reviews];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.universityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // University filter
    if (selectedUniversity) {
      filtered = filtered.filter((r) => r.universityId === selectedUniversity);
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((r) => r.rating >= minRating);
    }

    // Sort
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredReviews(filtered);
  }, [searchTerm, selectedUniversity, sortBy, minRating]);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Student <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read authentic reviews from international students studying in Egypt
            </p>
          </div>

          {/* Rating Summary */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-6 h-6",
                        star <= Math.round(Number(averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <p className="text-gray-500">{reviews.length} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="input-field"
              >
                <option value="">All Universities</option>
                {egyptianUniversities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              <select
                value={minRating.toString()}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="input-field"
              >
                <option value="0">All Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "rating")}
                className="input-field"
              >
                <option value="date">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No reviews found
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

