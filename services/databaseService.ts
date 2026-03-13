import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { University, Program, Application, Notification, Review, Scholarship, Favorite, UniversityRating } from "@/types";

const COLLECTIONS = {
  USERS: "users",
  UNIVERSITIES: "universities",
  PROGRAMS: "programs",
  APPLICATIONS: "applications",
  NOTIFICATIONS: "notifications",
  REVIEWS: "reviews",
  SCHOLARSHIPS: "scholarships",
  FAVORITES: "favorites",
  RATINGS: "ratings",
};

// ============= University Service =============
export const universityService = {
  async getAll(): Promise<University[]> {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.UNIVERSITIES), orderBy("name"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as University[];
  },

  async getById(id: string): Promise<University | null> {
    const docSnapshot = await getDoc(doc(db, COLLECTIONS.UNIVERSITIES, id));
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as University;
    }
    return null;
  },

  async getByCountry(country: string): Promise<University[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.UNIVERSITIES),
        where("country", "==", country)
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as University[];
  },

  async getByCity(city: string): Promise<University[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.UNIVERSITIES),
        where("city", "==", city)
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as University[];
  },

  async search(searchTerm: string): Promise<University[]> {
    const all = await this.getAll();
    return all.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  async create(university: Omit<University, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.UNIVERSITIES), {
      ...university,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<University>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.UNIVERSITIES, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.UNIVERSITIES, id));
  },
};

// ============= Rating Service =============
export const ratingService = {
  async getByUniversity(universityId: string): Promise<UniversityRating | null> {
    const docSnapshot = await getDoc(doc(db, COLLECTIONS.RATINGS, universityId));
    if (docSnapshot.exists()) {
      return docSnapshot.data() as UniversityRating;
    }
    return null;
  },

  async setRating(universityId: string, rating: UniversityRating): Promise<void> {
    await setDoc(doc(db, COLLECTIONS.RATINGS, universityId), rating);
  },

  async updateRating(universityId: string, newRating: Partial<UniversityRating>): Promise<void> {
    const current = await this.getByUniversity(universityId);
    if (current) {
      await updateDoc(doc(db, COLLECTIONS.RATINGS, universityId), newRating);
    } else {
      await this.setRating(universityId, {
        averageRating: newRating.averageRating || 0,
        totalReviews: newRating.totalReviews || 1,
        educationQuality: newRating.educationQuality || 0,
        campusLife: newRating.campusLife || 0,
        facilities: newRating.facilities || 0,
        internationalSupport: newRating.internationalSupport || 0,
      });
    }
  },
};

// ============= Review Service =============
export const reviewService = {
  async getAll(): Promise<Review[]> {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.REVIEWS), orderBy("date", "desc"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },

  async getByUniversity(universityId: string): Promise<Review[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.REVIEWS),
        where("universityId", "==", universityId),
        orderBy("date", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },

  async getByUser(userId: string): Promise<Review[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.REVIEWS),
        where("userId", "==", userId),
        orderBy("date", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },

  async create(review: Omit<Review, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
      ...review,
      date: serverTimestamp(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<Review>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.REVIEWS, id), data);
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.REVIEWS, id));
  },
};

// ============= Scholarship Service =============
export const scholarshipService = {
  async getAll(): Promise<Scholarship[]> {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.SCHOLARSHIPS), orderBy("deadline"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Scholarship[];
  },

  async getById(id: string): Promise<Scholarship | null> {
    const docSnapshot = await getDoc(doc(db, COLLECTIONS.SCHOLARSHIPS, id));
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Scholarship;
    }
    return null;
  },

  async getByUniversity(universityId: string): Promise<Scholarship[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.SCHOLARSHIPS),
        where("universityId", "==", universityId)
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Scholarship[];
  },

  async getByCoverage(coverage: string): Promise<Scholarship[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.SCHOLARSHIPS),
        where("coverage", "==", coverage)
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Scholarship[];
  },

  async search(searchTerm: string): Promise<Scholarship[]> {
    const all = await this.getAll();
    return all.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.eligibleMajors.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  },

  async create(scholarship: Omit<Scholarship, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.SCHOLARSHIPS), scholarship);
    return docRef.id;
  },

  async update(id: string, data: Partial<Scholarship>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.SCHOLARSHIPS, id), data);
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.SCHOLARSHIPS, id));
  },
};

// ============= Favorite Service =============
export const favoriteService = {
  async getByUser(userId: string): Promise<Favorite[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.FAVORITES),
        where("userId", "==", userId),
        orderBy("savedAt", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favorite[];
  },

  async getByUserAndType(userId: string, itemType: string): Promise<Favorite[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.FAVORITES),
        where("userId", "==", userId),
        where("itemType", "==", itemType),
        orderBy("savedAt", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favorite[];
  },

  async checkIsFavorite(userId: string, itemId: string, itemType: string): Promise<boolean> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.FAVORITES),
        where("userId", "==", userId),
        where("itemId", "==", itemId),
        where("itemType", "==", itemType)
      )
    );
    return !querySnapshot.empty;
  },

  async addFavorite(favorite: Omit<Favorite, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.FAVORITES), {
      ...favorite,
      savedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async removeFavorite(userId: string, itemId: string, itemType: string): Promise<void> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.FAVORITES),
        where("userId", "==", userId),
        where("itemId", "==", itemId),
        where("itemType", "==", itemType)
      )
    );
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  },
};

// ============= Program Service =============
export const programService = {
  async getAll(): Promise<Program[]> {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.PROGRAMS), orderBy("name"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  },

  async getByUniversity(universityId: string): Promise<Program[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.PROGRAMS),
        where("universityId", "==", universityId)
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  },

  async getById(id: string): Promise<Program | null> {
    const docSnapshot = await getDoc(doc(db, COLLECTIONS.PROGRAMS, id));
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Program;
    }
    return null;
  },

  async create(program: Omit<Program, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.PROGRAMS), program);
    return docRef.id;
  },

  async update(id: string, data: Partial<Program>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.PROGRAMS, id), data);
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.PROGRAMS, id));
  },
};

// ============= Application Service =============
export const applicationService = {
  async getByStudent(studentId: string): Promise<Application[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.APPLICATIONS),
        where("studentId", "==", studentId),
        orderBy("submittedAt", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  },

  async getAll(): Promise<Application[]> {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.APPLICATIONS), orderBy("submittedAt", "desc"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  },

  async getById(id: string): Promise<Application | null> {
    const docSnapshot = await getDoc(doc(db, COLLECTIONS.APPLICATIONS, id));
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Application;
    }
    return null;
  },

  async create(application: Omit<Application, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
      ...application,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async updateStatus(
    id: string,
    status: Application["status"]
  ): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.APPLICATIONS, id), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.APPLICATIONS, id));
  },
};

// ============= Notification Service =============
export const notificationService = {
  async getByUser(userId: string): Promise<Notification[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[];
  },

  async create(notification: Omit<Notification, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
      ...notification,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async markAsRead(id: string): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.NOTIFICATIONS, id), {
      read: true,
    });
  },
};

// Helper function for setDoc - already imported at the top

