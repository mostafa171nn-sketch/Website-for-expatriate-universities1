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
  Check,
  CheckCheck,
  Trash2,
  BellRing,
  Calendar,
  Award,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Notification } from "@/types";
import { formatDateTime } from "@/utils";

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Application Status Updated",
    message: "Your application to Harvard University has been updated to 'Under Review' status.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: "2",
    userId: "1",
    title: "New Message from University",
    message: "You have a new message from MIT admissions office.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "3",
    userId: "1",
    title: "Application Accepted",
    message: "Congratulations! Your application to Stanford University has been accepted.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "4",
    userId: "1",
    title: "Document Required",
    message: "Please upload your updated passport copy for the application process.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: "5",
    userId: "1",
    title: "Deadline Reminder",
    message: "The application deadline for Oxford University is in 3 days.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
  }
];

export default function NotificationsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".notif-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (title: string) => {
    if (title.includes("Accepted") || title.includes("Congratulations")) {
      return <Award className="w-5 h-5 text-green-500" />;
    }
    if (title.includes("Deadline") || title.includes("Required")) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
    if (title.includes("Message")) {
      return <BellRing className="w-5 h-5 text-blue-500" />;
    }
    return <Calendar className="w-5 h-5 text-primary-500" />;
  };

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

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
                  <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
                    <Bell size={20} /> Notifications
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
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
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
                  <p className="text-gray-600">Stay updated with your application status</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <CheckCheck size={18} />
                    Mark All as Read
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="border-b border-gray-100 p-4 flex items-center gap-4">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      filter === "all" 
                        ? "bg-primary-100 text-primary-700" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setFilter("unread")}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                      filter === "unread" 
                        ? "bg-primary-100 text-primary-700" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">No notifications</h3>
                      <p className="text-gray-500">
                        {filter === "unread" 
                          ? "You've read all your notifications" 
                          : "You don't have any notifications yet"}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notif-item p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            !notification.read ? "bg-primary-100" : "bg-gray-100"
                          }`}>
                            {getNotificationIcon(notification.title)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className={`font-semibold ${
                                  !notification.read ? "text-gray-900" : "text-gray-700"
                                }`}>
                                  {notification.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {formatDateTime(notification.createdAt)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                    title="Mark as read"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

