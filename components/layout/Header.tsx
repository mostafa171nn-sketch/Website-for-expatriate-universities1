"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, GraduationCap, Sun, Moon, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useTranslation, languages } from "@/hooks/useTranslation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Universities", href: "/universities" },
  { name: "Map", href: "/map" },
  { name: "Scholarships", href: "/scholarships" },
  { name: "Reviews", href: "/reviews" },
  { name: "AI Advisor", href: "/ai-advisor" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 dark:border-slate-800 border-b border-gray-100 dark:border-slate-800">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Study in Egypt</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${pathname === item.href ? "text-primary-600" : "text-gray-600"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-slate-300"
              >
                <Globe size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-slate-300">{language.flag}</span>

              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                  <span className="text-xs font-bold text-gray-600 dark:text-slate-300">{lang.flag}</span>
                      <span className="text-sm text-gray-700 dark:text-slate-200">{lang.name}</span>

                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            
            {isAuthenticated ? (
              <Link href={user?.role === "admin" ? "/admin" : "/dashboard"} className="btn-primary inline-flex items-center gap-2">
                <User size={18} />
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600">Sign In</Link>
                <Link href="/register" className="btn-primary">Get Started</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium px-4 py-2 rounded-lg ${pathname === item.href ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 pb-1">
                <p className="text-xs text-gray-400 px-4 mb-2">Language</p>
                <div className="flex flex-wrap gap-2 px-4">
                  {languages.slice(0, 4).map((lang) => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setMobileMenuOpen(false); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <span className="text-xs font-bold">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <button onClick={toggleDarkMode} className="flex items-center gap-2 px-4 py-2 text-gray-600">
                {isDarkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
                <span className="text-sm">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Link href={user?.role === "admin" ? "/admin" : "/dashboard"} className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                ) : (
                  <>
                    <Link href="/login" className="text-center py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                    <Link href="/register" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
