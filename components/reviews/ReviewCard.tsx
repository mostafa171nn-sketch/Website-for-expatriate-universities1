"use client";

import { useState } from "react";
import { Review } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { ThumbsUp, MapPin, Calendar } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300 dark:bg-black">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-black font-semibold text-lg">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] dark:text-white">{review.userName}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{review.userCountry}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={14} />
          <span>{formatDate(review.date)}</span>
        </div>
      </div>

      <div className="mb-4">
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
          {review.universityName}
        </p>
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
        {review.reviewText}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-[var(--text-secondary)] dark:hover:text-primary-400 transition-colors">
          <ThumbsUp size={16} />
          <span>Helpful ({review.helpful || 0})</span>
        </button>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Report
        </button>
      </div>
    </div>
  );
}

interface ReviewFormProps {
  universityId: string;
  universityName: string;
  onSubmit: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  onCancel?: () => void;
}

export function ReviewForm({ universityId, universityName, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") return;

    setIsSubmitting(true);
    try {
      onSubmit({
        userId: "current-user-id", // Will be replaced with actual user ID
        userName: "Current User", // Will be replaced with actual user name
        userCountry: "Egypt", // Will be replaced with actual user country
        universityId,
        universityName,
        rating,
        reviewText,
      });
      setRating(0);
      setReviewText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-black mb-4">
        Write a Review for {universityName}
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating
        </label>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating} 
          size="lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience at this university..."
          className="input-field min-h-[150px] resize-none"
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={rating === 0 || reviewText.trim() === "" || isSubmitting}
          className="btn-primary disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

