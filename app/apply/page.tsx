"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { University, Program, PersonalInfo, EducationalBackground } from "@/types";
import { 
  User, 
  GraduationCap, 
  Building2, 
  FileText, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Upload,
  X
} from "lucide-react";
import toast from "react-hot-toast";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Education", icon: GraduationCap },
  { id: 3, title: "University", icon: Building2 },
  { id: 4, title: "Program", icon: GraduationCap },
  { id: 5, title: "Documents", icon: FileText },
  { id: 6, title: "Review", icon: CheckCircle },
];

const mockUniversities: University[] = [
  { id: "1", name: "Harvard University", country: "USA", city: "Cambridge", logo: "", description: "", programs: [], createdAt: new Date() },
  { id: "2", name: "MIT", country: "USA", city: "Cambridge", logo: "", description: "", programs: [], createdAt: new Date() },
  { id: "3", name: "Stanford University", country: "USA", city: "Stanford", logo: "", description: "", programs: [], createdAt: new Date() },
  { id: "4", name: "Oxford University", country: "UK", city: "Oxford", logo: "", description: "", programs: [], createdAt: new Date() },
  { id: "5", name: "Yale University", country: "USA", city: "New Haven", logo: "", description: "", programs: [], createdAt: new Date() },
];

const mockPrograms: Program[] = [
  { id: "1", universityId: "1", universityName: "Harvard University", name: "Computer Science", degreeType: "master", duration: "2 years", description: "", requirements: [] },
  { id: "2", universityId: "1", universityName: "Harvard University", name: "Business Administration", degreeType: "master", duration: "2 years", description: "", requirements: [] },
  { id: "3", universityId: "2", universityName: "MIT", name: "Software Engineering", degreeType: "master", duration: "1.5 years", description: "", requirements: [] },
  { id: "4", universityId: "2", universityName: "MIT", name: "Data Science", degreeType: "master", duration: "1 year", description: "", requirements: [] },
  { id: "5", universityId: "3", universityName: "Stanford University", name: "Computer Science", degreeType: "phd", duration: "4-5 years", description: "", requirements: [] },
];

export default function ApplyPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    dateOfBirth: new Date(),
    nationality: "",
    phoneNumber: "",
    passportNumber: "",
    email: user?.email || "",
  });
  const [education, setEducation] = useState<EducationalBackground>({
    previousEducation: "",
    graduationYear: 2024,
    gpa: 0,
    schoolName: "",
    country: "",
  });
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user?.email) {
      setPersonalInfo(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "gpa" || e.target.name === "graduationYear" 
      ? Number(e.target.value) 
      : e.target.value;
    setEducation({ ...education, [e.target.name]: value });
  };

  const handleFileUpload = (key: string, files: File[]) => {
    if (files.length > 0) {
      setDocuments({ ...documents, [key]: files[0] });
    }
  };

  const removeDocument = (key: string) => {
    setDocuments({ ...documents, [key]: null });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.fullName && personalInfo.nationality && personalInfo.phoneNumber && personalInfo.passportNumber;
      case 2:
        return education.previousEducation && education.schoolName && education.gpa > 0;
      case 3:
        return selectedUniversity !== null;
      case 4:
        return selectedProgram !== null;
      case 5:
        return documents["passport"] && documents["high_school_certificate"] && documents["transcript"] && documents["personal_photo"];
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Application submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setUploading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={personalInfo.dateOfBirth.toString().split('T')[0]}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: new Date(e.target.value) })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={personalInfo.nationality}
                  onChange={handlePersonalInfoChange}
                  className="input-field"
                  placeholder="Enter your nationality"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalInfoChange}
                  className="input-field"
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={personalInfo.passportNumber}
                  onChange={handlePersonalInfoChange}
                  className="input-field"
                  placeholder="Enter passport number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="input-field"
                  disabled
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Education *</label>
                <select
                  name="previousEducation"
                  value={education.previousEducation}
                  onChange={handleEducationChange}
                  className="input-field"
                  required
                >
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  value={education.schoolName}
                  onChange={handleEducationChange}
                  className="input-field"
                  placeholder="Enter school/university name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={education.country}
                  onChange={handleEducationChange}
                  className="input-field"
                  placeholder="Enter country"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={education.graduationYear}
                  onChange={handleEducationChange}
                  className="input-field"
                  min="1950"
                  max="2030"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Grade *</label>
                <input
                  type="number"
                  name="gpa"
                  value={education.gpa}
                  onChange={handleEducationChange}
                  className="input-field"
                  placeholder="Enter GPA (0-4.0)"
                  min="0"
                  max="4"
                  step="0.1"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select University</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockUniversities.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => setSelectedUniversity(uni)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedUniversity?.id === uni.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      🎓
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{uni.name}</h3>
                      <p className="text-sm text-gray-500">{uni.city}, {uni.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        const availablePrograms = mockPrograms.filter(
          p => selectedUniversity?.id === p.universityId
        );
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Program</h2>
            {availablePrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {availablePrograms.map((program) => (
                  <div
                    key={program.id}
                    onClick={() => setSelectedProgram(program)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProgram?.id === program.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                        {program.degreeType.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {program.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No programs available for this university</p>
            )}
          </div>
        );

      case 5:
        const requiredDocs = [
          { key: "passport", label: "Passport *", accept: ".pdf,.jpg,.jpeg,.png" },
          { key: "high_school_certificate", label: "High School Certificate *", accept: ".pdf,.jpg,.jpeg,.png" },
          { key: "transcript", label: "Transcript *", accept: ".pdf,.jpg,.jpeg,.png" },
          { key: "personal_photo", label: "Personal Photo *", accept: ".jpg,.jpeg,.png" },
          { key: "recommendation_letter", label: "Recommendation Letter (Optional)", accept: ".pdf,.doc,.docx" },
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {requiredDocs.map((doc) => (
                <div key={doc.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{doc.label}</label>
                  {documents[doc.key] ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700 truncate max-w-[200px]">
                          {documents[doc.key]?.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.key)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <DocumentUpload
                      accept={doc.accept}
                      onUpload={(files) => handleFileUpload(doc.key, files)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Application</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Name:</span> {personalInfo.fullName}</div>
                  <div><span className="text-gray-500">Nationality:</span> {personalInfo.nationality}</div>
                  <div><span className="text-gray-500">Phone:</span> {personalInfo.phoneNumber}</div>
                  <div><span className="text-gray-500">Passport:</span> {personalInfo.passportNumber}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Educational Background</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Education:</span> {education.previousEducation}</div>
                  <div><span className="text-gray-500">School:</span> {education.schoolName}</div>
                  <div><span className="text-gray-500">Country:</span> {education.country}</div>
                  <div><span className="text-gray-500">GPA:</span> {education.gpa}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">University & Program</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">University:</span> {selectedUniversity?.name}</div>
                  <div><span className="text-gray-500">Program:</span> {selectedProgram?.name}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(documents).map(([key, file]) => (
                    file && (
                      <span key={key} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {key.replace(/_/g, " ")}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (authLoading) {
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply to University</h1>
            <p className="text-gray-600">Complete all steps to submit your application</p>
          </div>

          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 ${currentStep >= step.id ? "text-primary-600" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? "bg-primary-600 text-white" 
                      : currentStep === step.id 
                        ? "bg-primary-100 text-primary-600 border-2 border-primary-600"
                        : "bg-gray-100"
                  }`}>
                    {currentStep > step.id ? <CheckCircle size={20} /> : <step.icon size={20} />}
                  </div>
                  <span className="hidden md:block text-sm font-medium whitespace-nowrap">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            {renderStep()}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} /> Previous
              </button>

              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="btn-primary flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Application <CheckCircle size={20} /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DocumentUpload({ accept, onUpload }: { accept: string; onUpload: (files: File[]) => void }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/*": [".jpg", ".jpeg", ".png"], "application/msword": [".doc"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] },
    maxFiles: 1,
    onDrop: onUpload,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
        isDragActive ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:border-primary-400"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-600">
        {isDragActive ? "Drop the file here" : "Drag & drop or click to upload"}
      </p>
      <p className="text-xs text-gray-400 mt-1">Max file size: 10MB</p>
    </div>
  );
}

