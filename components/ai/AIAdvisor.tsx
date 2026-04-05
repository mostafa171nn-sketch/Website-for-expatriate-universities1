"use client";

import { useState, useRef, useEffect } from "react";
import { University, AIAdvisorProfile, ChatMessage } from "@/types";
import { egyptianUniversities } from "@/data/mockData";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  GraduationCap, 
  MapPin, 
  DollarSign, 
  Building,
  X,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils";

interface AIAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAdvisor({ isOpen, onClose }: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI University Advisor for Egypt. I'll help you find the perfect university based on your preferences. Let me ask you a few questions.",
      timestamp: new Date(),
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<AIAdvisorProfile>>({});
  const [recommendations, setRecommendations] = useState<University[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addMessage("assistant", text);
    setIsTyping(false);
  };

  const handleAnswer = async (answer: string) => {
    addMessage("user", answer);

    switch (currentStep) {
      case 0:
        setProfile({ ...profile, major: answer });
        await simulateTyping("Great! In which city in Egypt would you prefer to study?");
        setCurrentStep(1);
        break;
      case 1:
        setProfile({ ...profile, preferredCity: answer });
        await simulateTyping("What's your budget range for tuition per year? (e.g., $1,000-$3,000, $5,000-$10,000, $10,000+)");
        setCurrentStep(2);
        break;
      case 2:
        setProfile({ ...profile, budgetRange: answer });
        await simulateTyping("Do you prefer Public or Private universities, or both?");
        setCurrentStep(3);
        break;
      case 3:
        setProfile({ ...profile, universityType: answer.toLowerCase() as "public" | "private" | "both" });
        await generateRecommendations();
        setCurrentStep(4);
        break;
    }
  };

  const generateRecommendations = async () => {
    setIsTyping(true);
    
    // Simulate thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const filtered = egyptianUniversities.filter((uni) => {
      // Filter by city preference
      if (profile.preferredCity && profile.preferredCity.toLowerCase() !== "any") {
        if (!uni.city.toLowerCase().includes(profile.preferredCity.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by university type
      if (profile.universityType && profile.universityType !== "both") {
        if (uni.type !== profile.universityType) {
          return false;
        }
      }
      
      return true;
    });

    // Sort by rating
    const sorted = filtered.sort((a, b) => 
      (b.rating?.averageRating || 0) - (a.rating?.averageRating || 0)
    );

    setRecommendations(sorted.slice(0, 5));
    
    const response = `Based on your preferences (Major: ${profile.major}, City: ${profile.preferredCity}, Budget: ${profile.budgetRange}, Type: ${profile.universityType}), I've found ${sorted.length} suitable universities for you! Here are my top recommendations:`;
    
    addMessage("assistant", response);
    setIsTyping(false);
  };

  const resetAdvisor = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI University Advisor for Egypt. I'll help you find the perfect university based on your preferences. Let me ask you a few questions.",
        timestamp: new Date(),
      },
    ]);
    setCurrentStep(0);
    setProfile({});
    setRecommendations([]);
  };

  const questions = [
    {
      question: "What major do you want to study?",
      options: ["Medicine", "Engineering", "Computer Science", "Business", "Law", "Arts", "Science", "Other"],
    },
    {
      question: "In which city in Egypt would you prefer to study?",
      options: ["Cairo", "Alexandria", "Giza", "Mansoura", "Any City"],
    },
    {
      question: "What's your budget range for tuition per year?",
      options: ["Under $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $10,000", "$10,000+"],
    },
    {
      question: "Do you prefer Public or Private universities?",
      options: ["Public", "Private", "Both"],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI University Advisor</h3>
            <p className="text-white/80 text-xs">Find your perfect university</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={resetAdvisor}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Start Over"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.role === "assistant" 
                ? "bg-primary-100 text-primary-600" 
                : "bg-blue-500 text-white"
            )}>
              {message.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl p-3",
                message.role === "assistant" 
                  ? "bg-white shadow-sm" 
                  : "bg-blue-500 text-white"
              )}>
                <p className="text-sm whitespace-pre-wrap text-black">{message.content}</p>
              </div>
          </div>
        ))}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-4 space-y-3">
            {recommendations.map((uni) => (
              <Link
                key={uni.id}
                href={`/universities/${uni.id}`}
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {uni.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{uni.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <MapPin size={12} />
                      <span>{uni.city}</span>
                      <span>•</span>
                      <span>{uni.tuitionRange}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        ★ {uni.rating?.averageRating.toFixed(1)}
                      </span>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {uni.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
              <Bot size={16} />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Options */}
      {currentStep < 4 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-3">
            {currentStep < questions.length ? questions[currentStep].question : "Select an option:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {questions[currentStep]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={isTyping}
                className="px-3 py-2 bg-primary-50 text-primary-700 text-sm rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AIAdvisorButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
    >
      <MessageCircle size={24} />
    </button>
  );
}

