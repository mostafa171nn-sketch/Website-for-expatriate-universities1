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
  Lock,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Save,
  Check
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";

interface EmailPreferences {
  applicationUpdates: boolean;
  newPrograms: boolean;
  deadlineReminders: boolean;
  marketingEmails: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  
  // Password state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Email preferences state
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    applicationUpdates: true,
    newPrograms: true,
    deadlineReminders: true,
    marketingEmails: false
  });
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".settings-section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 3000);
  };

  const handlePreferenceChange = (key: keyof EmailPreferences) => {
    setEmailPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    setPreferencesSaved(true);
    setTimeout(() => {
      setPreferencesSaved(false);
    }, 3000);
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
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <FileText size={20} /> My Applications
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <User size={20} /> Profile
                  </Link>
                  <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                    <Bell size={20} /> Notifications
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account preferences</p>
              </div>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="settings-section bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary-600" />
                    Change Password
                  </h2>
                  
                  {passwordSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Password updated successfully!
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    <button
                      type="submit"
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save size={18} />
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Email Preferences */}
                <div className="settings-section bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary-600" />
                    Email Preferences
                  </h2>

                  {preferencesSaved && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Preferences saved successfully!
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Application Updates</h3>
                        <p className="text-sm text-gray-500">Get notified about your application status changes</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('applicationUpdates')}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailPreferences.applicationUpdates ? "bg-primary-600" : "bg-gray-200"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          emailPreferences.applicationUpdates ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">New Programs</h3>
                        <p className="text-sm text-gray-500">Be the first to know about new programs</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('newPrograms')}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailPreferences.newPrograms ? "bg-primary-600" : "bg-gray-200"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          emailPreferences.newPrograms ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Deadline Reminders</h3>
                        <p className="text-sm text-gray-500">Receive reminders before application deadlines</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('deadlineReminders')}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailPreferences.deadlineReminders ? "bg-primary-600" : "bg-gray-200"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          emailPreferences.deadlineReminders ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                        <p className="text-sm text-gray-500">Receive news and promotional content</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('marketingEmails')}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailPreferences.marketingEmails ? "bg-primary-600" : "bg-gray-200"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          emailPreferences.marketingEmails ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <button
                      onClick={savePreferences}
                      className="btn-primary flex items-center gap-2 mt-4"
                    >
                      <Save size={18} />
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Security */}
                <div className="settings-section bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-600" />
                    Security
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-secondary text-sm">
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Active Sessions</h3>
                        <p className="text-sm text-gray-500">Manage your active login sessions</p>
                      </div>
                      <button className="btn-secondary text-sm">
                        View
                      </button>
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

