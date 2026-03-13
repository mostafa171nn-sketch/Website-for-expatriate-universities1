"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { 
  User, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  Camera,
  Mail,
  Phone,
  Calendar,
  Globe,
  BookOpen,
  Award,
  Save
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { StudentProfile } from "@/types";
import { formatDate } from "@/utils";

const mockProfile: StudentProfile = {
  fullName: "John Doe",
  dateOfBirth: new Date("2005-05-15"),
  nationality: "USA",
  phoneNumber: "+1 234 567 890",
  passportNumber: "AB123456",
  previousEducation: "High School",
  graduationYear: 2023,
  gpa: 3.8,
  photoUrl: ""
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [profile, setProfile] = useState<StudentProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<StudentProfile>(mockProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInputChange = (field: keyof StudentProfile, value: string | number | Date) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative group">
                    {profile.photoUrl ? (
                      <img src={profile.photoUrl} alt={profile.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{user?.profile?.fullName || "Student"}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <FileText size={20} /> My Applications
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
                    <User size={20} /> Profile
                  </Link>
                  <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <Bell size={20} /> Notifications
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <Settings size={20} /> Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium">
                    <LogOut size={20} /> Sign Out
                  </button>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
                  <p className="text-gray-600">Manage your personal information</p>
                </div>
                <button
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setEditedProfile(profile);
                      setIsEditing(true);
                    }
                  }}
                  className={`btn-primary flex items-center gap-2 ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                >
                  <Save size={18} />
                  {isEditing ? (saved ? 'Saved!' : 'Save Changes') : 'Edit Profile'}
                </button>
              </div>

              {saved && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Profile updated successfully!
                </div>
              )}

              <div className="grid gap-6">
                {/* Personal Information */}
                <div className="profile-section bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    Personal Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3">{profile.fullName}</p>
                      )}
                    </div>
<div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900 py-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {user?.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editedProfile.dateOfBirth.toISOString().split('T')[0]}
                          onChange={(e) => handleInputChange('dateOfBirth', new Date(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(profile.dateOfBirth)}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nationality</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          {profile.nationality}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {profile.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Passport Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.passportNumber}
                          onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3">{profile.passportNumber}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Educational Background */}
                <div className="profile-section bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                    Educational Background
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Previous Education</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.previousEducation}
                          onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3">{profile.previousEducation}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">School Name</label>
                      <p className="text-gray-900 py-3">Lincoln High School</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedProfile.graduationYear}
                          onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3">{profile.graduationYear}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">GPA</label>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="4"
                          value={editedProfile.gpa}
                          onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 py-3">{profile.gpa} / 4.0</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

