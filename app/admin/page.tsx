"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { 
  Users, 
  FileText, 
  Building2, 
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Settings,
  Bell,
  Home,
  LogOut,
  Menu,
  ChevronRight,
  BarChart3,
  UserCheck,
  UserX,
  Mail
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Application, User as UserType, University } from "@/types";
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
    studentId: "2",
    studentName: "Jane Smith",
    universityId: "2",
    universityName: "MIT",
    programId: "2",
    programName: "Software Engineering",
    status: "under_review",
    personalInfo: {
      fullName: "Jane Smith",
      dateOfBirth: new Date(),
      nationality: "Canada",
      phoneNumber: "+1987654321",
      passportNumber: "CD789012",
      email: "jane@example.com"
    },
    educationalBackground: {
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.9,
      schoolName: "Toronto High School",
      country: "Canada"
    },
    documents: [],
    submittedAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Alice Johnson",
    universityId: "1",
    universityName: "Harvard University",
    programId: "3",
    programName: "Business Administration",
    status: "accepted",
    personalInfo: {
      fullName: "Alice Johnson",
      dateOfBirth: new Date(),
      nationality: "UK",
      phoneNumber: "+447911123456",
      passportNumber: "EF345678",
      email: "alice@example.com"
    },
    educationalBackground: {
      previousEducation: "High School",
      graduationYear: 2022,
      gpa: 3.7,
      schoolName: "London High School",
      country: "UK"
    },
    documents: [],
    submittedAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Bob Wilson",
    universityId: "3",
    universityName: "Stanford University",
    programId: "4",
    programName: "Data Science",
    status: "rejected",
    personalInfo: {
      fullName: "Bob Wilson",
      dateOfBirth: new Date(),
      nationality: "Australia",
      phoneNumber: "+61234567890",
      passportNumber: "GH901234",
      email: "bob@example.com"
    },
    educationalBackground: {
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.2,
      schoolName: "Sydney High School",
      country: "Australia"
    },
    documents: [],
    submittedAt: new Date(),
    updatedAt: new Date()
  }
];

const mockStudents: UserType[] = [
  {
    uid: "1",
    email: "john@example.com",
    role: "student",
    createdAt: new Date(),
    profile: {
      fullName: "John Doe",
      dateOfBirth: new Date("2005-05-15"),
      nationality: "USA",
      phoneNumber: "+1234567890",
      passportNumber: "AB123456",
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.8
    }
  },
  {
    uid: "2",
    email: "jane@example.com",
    role: "student",
    createdAt: new Date(),
    profile: {
      fullName: "Jane Smith",
      dateOfBirth: new Date("2005-08-20"),
      nationality: "Canada",
      phoneNumber: "+1987654321",
      passportNumber: "CD789012",
      previousEducation: "High School",
      graduationYear: 2023,
      gpa: 3.9
    }
  }
];

const mockUniversities: University[] = [
  {
    id: "1",
    name: "Harvard University",
    country: "USA",
    city: "Cambridge",
    logo: "",
    description: "World-class university",
    programs: ["Computer Science", "Business Administration"],
    createdAt: new Date()
  },
  {
    id: "2",
    name: "MIT",
    country: "USA",
    city: "Cambridge",
    logo: "",
    description: "Leading technical university",
    programs: ["Software Engineering"],
    createdAt: new Date()
  },
  {
    id: "3",
    name: "Stanford University",
    country: "USA",
    city: "Stanford",
    logo: "",
    description: "Innovation hub",
    programs: ["Data Science"],
    createdAt: new Date()
  }
];

const stats = {
  totalStudents: 156,
  totalApplications: 342,
  pendingApplications: 45,
  acceptedApplications: 198,
  rejectedApplications: 99,
  totalUniversities: 24
};

type AdminTab = "dashboard" | "applications" | "students" | "universities" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [students] = useState<UserType[]>(mockStudents);
  const [universities] = useState<University[]>(mockUniversities);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  useEffect(() => {
    // For demo purposes, allow access to admin page
    // In production, uncomment the line below to require admin role
    // if (!loading && (!isAuthenticated || !isAdmin)) {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".admin-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesStatus = !filterStatus || app.status === filterStatus;
    const matchesSearch = !searchTerm || 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.programName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, status: Application["status"]) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
  };

  const getTabIcon = (tab: AdminTab) => {
    switch (tab) {
      case "dashboard": return <BarChart3 size={20} />;
      case "applications": return <FileText size={20} />;
      case "students": return <Users size={20} />;
      case "universities": return <Building2 size={20} />;
      case "settings": return <Settings size={20} />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                <p className="text-sm text-gray-500">Total Students</p>
              </div>
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-sm text-gray-500">Applications</p>
              </div>
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.acceptedApplications}</p>
                <p className="text-sm text-gray-500">Accepted</p>
              </div>
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.rejectedApplications}</p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
              <div className="admin-stat bg-white rounded-2xl shadow-card p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUniversities}</p>
                <p className="text-sm text-gray-500">Universities</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
              <div className="space-y-3">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {app.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.studentName}</p>
                        <p className="text-sm text-gray-500">{app.programName} - {app.universityName}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "applications":
        return (
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Applications</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Program</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">University</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Submitted</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{app.studentName}</p>
                          <p className="text-sm text-gray-500">{app.personalInfo.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{app.programName}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-600">{app.universityName}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-600 text-sm">{formatDate(app.submittedAt)}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {(app.status === "pending" || app.status === "under_review") && (
                            <>
                              <button
                                onClick={() => handleStatusChange(app.id, "accepted")}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                title="Accept"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id, "rejected")}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                            title="View Details"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        );

      case "students":
        return (
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Students</h2>
              <button className="btn-primary">
                <Users size={18} className="mr-2" />
                Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Nationality</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Applications</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.uid} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {student.profile?.fullName?.charAt(0) || "S"}
                          </div>
                          <p className="font-medium text-gray-900">{student.profile?.fullName || "Unknown"}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-600">{student.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-600">{student.profile?.nationality || "N/A"}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          {Math.floor(Math.random() * 5) + 1} Applications
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg" title="View">
                            <UserCheck size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Remove">
                            <UserX size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "universities":
        return (
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Universities</h2>
              <button className="btn-primary">
                <Building2 size={18} className="mr-2" />
                Add University
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university) => (
                <div key={university.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{university.name}</h3>
                      <p className="text-sm text-gray-500">{university.city}, {university.country}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{university.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.map((program, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email alerts for new applications</p>
                </div>
                <button className="w-12 h-6 bg-primary-600 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-approve</h3>
                  <p className="text-sm text-gray-500">Automatically approve certain applications</p>
                </div>
                <button className="w-12 h-6 bg-gray-200 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                </button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900">Data Export</h3>
                  <p className="text-sm text-gray-500">Export all application data</p>
                </div>
                <button className="btn-secondary">
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Admin</h3>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "dashboard"
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <BarChart3 size={20} /> Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "applications"
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FileText size={20} /> Applications
                  </button>
                  <button
                    onClick={() => setActiveTab("students")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "students"
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Users size={20} /> Students
                  </button>
                  <button
                    onClick={() => setActiveTab("universities")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "universities"
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Building2 size={20} /> Universities
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "settings"
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Settings size={20} /> Settings
                  </button>
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <Home size={20} /> Back to Student View
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium">
                    <LogOut size={20} /> Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeTab === "dashboard" && "Admin Dashboard"}
                  {activeTab === "applications" && "Applications Management"}
                  {activeTab === "students" && "Students Management"}
                  {activeTab === "universities" && "Universities Management"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-gray-600">
                  {activeTab === "dashboard" && "Overview of all platform statistics"}
                  {activeTab === "applications" && "Review and manage student applications"}
                  {activeTab === "students" && "View and manage registered students"}
                  {activeTab === "universities" && "Manage partner universities"}
                  {activeTab === "settings" && "Configure admin preferences"}
                </p>
              </div>

              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

