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
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Application, DashboardStats } from "@/types";
import { getStatusColor, getStatusLabel, formatDate } from "@/utils";

const mockApplications: Application[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Doe",
    universityId: "1",
    universityName: "Harvard University",
    programId: "1",
    programName: "Computer Science",
    status: "pending",
    personalInfo: {
      fullName: "John Doe",
      dateOfBirth: new Date(),
      nationality: "USA",
      phoneNumber: "+1234567890",
      passportNumber: "AB123456",
      email: "john@example.com"
    },
    educationalBackground: {
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.8,
      schoolName: "Lincoln High School",
      country: "USA"
    },
    documents: [],
    submittedAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    studentId: "1",
    studentName: "John Doe",
    universityId: "2",
    universityName: "MIT",
    programId: "2",
    programName: "Software Engineering",
    status: "accepted",
    personalInfo: {
      fullName: "John Doe",
      dateOfBirth: new Date(),
      nationality: "USA",
      phoneNumber: "+1234567890",
      passportNumber: "AB123456",
      email: "john@example.com"
    },
    educationalBackground: {
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.8,
      schoolName: "Lincoln High School",
      country: "USA"
    },
    documents: [],
    submittedAt: new Date(),
    updatedAt: new Date()
  }
];

export default function StudentDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 2,
    pendingApplications: 1,
    acceptedApplications: 1,
    rejectedApplications: 0
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dash-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".dash-app",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "under_review":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
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
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{user?.profile?.fullName || "Student"}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
                    <FileText size={20} /> My Applications
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
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
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Track your applications here.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="dash-stat bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                  <p className="text-sm text-gray-500">Total Applications</p>
                </div>
                <div className="dash-stat bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="dash-stat bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.acceptedApplications}</p>
                  <p className="text-sm text-gray-500">Accepted</p>
                </div>
                <div className="dash-stat bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.rejectedApplications}</p>
                  <p className="text-sm text-gray-500">Rejected</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                  <Link href="/apply" className="btn-primary text-sm">
                    New Application
                  </Link>
                </div>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="dash-app flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                          🎓
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.programName}</h3>
                          <p className="text-sm text-gray-500">{app.universityName}</p>
                          <p className="text-xs text-gray-400">Submitted: {formatDate(app.submittedAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="font-medium">{getStatusLabel(app.status)}</span>
                        </div>
                        <Link href={`/dashboard/applications/${app.id}`}>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {applications.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500 mb-4">Start your journey by applying to a university</p>
                    <Link href="/universities" className="btn-primary">
                      Browse Universities
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

