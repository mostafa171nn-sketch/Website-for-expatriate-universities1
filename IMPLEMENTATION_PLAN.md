# Study in Egypt Platform - Implementation Plan

## Project Overview
Upgrade the existing Study in Egypt platform with advanced engagement and personalization features including:
- University Rating System
- Student Reviews
- User Authentication & Favorites
- AI University Advisor
- Interactive Map of Egyptian Universities
- Scholarships System

---

## Phase 1: Data Types & Database Service Updates

### 1.1 Update Types (types/index.ts)
Add new types:
- `UniversityRating` - rating, totalReviews, educationQuality, campusLife, facilities, support
- `Review` - id, userId, userName, country, universityId, universityName, rating, reviewText, date
- `Scholarship` - id, name, university, coverage, eligibleMajors, deadline, description, applicationLink
- `Favorite` - id, userId, universityId/scholarshipId, type, savedAt
- `UserProfile` - enhanced with favorites, savedScholarships

### 1.2 Update Database Service
Add new service functions:
- `ratingService` - get/set ratings
- `reviewService` - CRUD for reviews
- `scholarshipService` - CRUD for scholarships
- `favoriteService` - manage favorites

---

## Phase 2: UI Components

### 2.1 Rating Components
- `StarRating.tsx` - Reusable star rating component
- `RatingDisplay.tsx` - Shows average rating with stars
- `RatingBreakdown.tsx` - Shows rating breakdown by category

### 2.2 Review Components
- `ReviewCard.tsx` - Individual review card
- `ReviewForm.tsx` - Form to write reviews
- `ReviewList.tsx` - List of reviews with filtering

### 2.3 Map Components
- `EgyptMap.tsx` - Interactive map with Leaflet
- `UniversityMarker.tsx` - Map marker for universities
- `MapSearch.tsx` - Search and filter controls

### 2.4 Scholarship Components
- `ScholarshipCard.tsx` - Scholarship display card
- `ScholarshipFilters.tsx` - Filter controls
- `ScholarshipList.tsx` - Grid of scholarships

### 2.5 AI Advisor Components
- `AIAdvisor.tsx` - Chatbot component
- `AdvisorQuestion.tsx` - Question flow
- `AdvisorResults.tsx` - University recommendations

---

## Phase 3: Pages

### 3.1 Updated Pages
- `app/universities/page.tsx` - Add ratings to university cards
- `app/universities/[id]/page.tsx` - University detail with ratings & reviews

### 3.2 New Pages
- `app/reviews/page.tsx` - Student reviews listing
- `app/scholarships/page.tsx` - Scholarships listing
- `app/map/page.tsx` - Interactive Egypt map
- `app/ai-advisor/page.tsx` - AI advisor chatbot

### 3.3 Enhanced Dashboard
- `app/dashboard/page.tsx` - Add favorites & saved scholarships tabs

---

## Phase 4: Core Features

### 4.1 University Rating System
- 1-5 star rating across 4 categories
- Display average + total reviews on cards and detail pages

### 4.2 Student Reviews
- Write reviews with text and ratings
- Filter by university, sort by rating/date
- Display in card layout

### 4.3 User Accounts (Enhanced)
- Sign up / Login / Logout (existing)
- Save universities to Favorites
- Save scholarships
- My Dashboard with saved items and reviews

### 4.4 AI University Advisor
- Chatbot that asks: major, city, budget, university type
- Returns recommended universities with cards and links

### 4.5 Interactive Map
- Leaflet map centered on Egypt
- Markers for all universities
- Click marker → popup with info and "View University" button
- Search by city, filter by major
- "Find universities near me" using geolocation

### 4.6 Scholarships
- Dedicated page with scholarship cards
- Filters: university, major, type (full/partial), deadline
- Each card: name, university, coverage, majors, deadline, apply button

---

## Phase 5: UI/UX Enhancements

### 5.1 Dark Mode
- Add dark mode toggle
- Update color scheme for dark theme

### 5.2 Animations & Effects
- Smooth page transitions
- Card hover effects
- Loading states

### 5.3 Responsive Design
- Mobile-friendly layouts
- Touch-friendly interactions

---

## Implementation Order

1. Update types and database service
2. Create UI components
3. Create new pages
4. Update existing pages
5. Add dark mode
6. Test and polish

---

## Files to Create/Modify

### New Files:
- `types/index.ts` (update)
- `services/databaseService.ts` (update)
- `components/ui/StarRating.tsx`
- `components/ui/RatingDisplay.tsx`
- `components/reviews/ReviewCard.tsx`
- `components/reviews/ReviewForm.tsx`
- `components/map/EgyptMap.tsx`
- `components/scholarships/ScholarshipCard.tsx`
- `components/ai/AIAdvisor.tsx`
- `app/reviews/page.tsx`
- `app/scholarships/page.tsx`
- `app/map/page.tsx`
- `app/ai-advisor/page.tsx`

### Modified Files:
- `app/universities/page.tsx`
- `app/dashboard/page.tsx`
- `components/layout/Header.tsx`
- `app/globals.css`
- `tailwind.config.ts`

---

## Dependencies to Add
- `leaflet` - For interactive maps
- `react-leaflet` - React wrapper for Leaflet

---

## Egyptian Universities Data (Mock)
Include data for:
- Cairo University
- Alexandria University
- Ain Shams University
- Mansoura University
- Zagazig University
- Helwan University
- Minia University
- Assiut University
- South Valley University
- Suez Canal University
- American University in Cairo (AUC)
- German University in Cairo (GUC)
- British University in Egypt (BUE)
- Nile University
- Misr International University

