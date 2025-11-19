import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronLeft,
  ChevronRight,
  User,
  Zap,
  BookOpen,
  Briefcase,
  PlaySquare,
  BarChart2,
  Lock,
  Star,
  Globe,
  Monitor,
  CheckCircle, // Added back
  Code, // Added back
} from "lucide-react";

// --- DUMMY DATA STRUCTURES ---

const SKILLS_CARDS = [
  {
    title: "Generative AI",
    subtitle: "1.2M learners",
    icon: (
      <Monitor
        className="w-8 h-8 text-indigo-600"
        fill="rgba(99, 102, 241, 0.2)"
        stroke="none"
      />
    ),
    imagePlaceholder: "https://placehold.co/120x150/dbeafe/1f2937?text=AI",
  },
  {
    title: "IT Certifications",
    subtitle: "500k learners",
    icon: (
      <Lock
        className="w-8 h-8 text-amber-600"
        fill="rgba(251, 191, 36, 0.2)"
        stroke="none"
      />
    ),
    imagePlaceholder: "https://placehold.co/120x150/fde68a/1f2937?text=Cert",
  },
  {
    title: "Data Science",
    subtitle: "700k learners",
    icon: (
      <BarChart2
        className="w-8 h-8 text-green-600"
        fill="rgba(16, 185, 129, 0.2)"
        stroke="none"
      />
    ),
    imagePlaceholder: "https://placehold.co/120x150/d1fae5/1f2937?text=Data",
  },
];

const AI_FEATURES = [
  { text: "Learn AI and more", icon: BookOpen },
  { text: "Prep for a certification", icon: Zap },
  { text: "Practice with AI coaching", icon: PlaySquare },
  { text: "Advance your career", icon: Briefcase },
];

const COURSES_DATA = {
  "Artificial Intelligence (AI)": [
    {
      title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
      instructor: "365 Careers",
      rating: 4.5,
      reviews: "12,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
    {
      title: "Intro to AI Agents and Agentic AI",
      instructor: "365 Careers",
      rating: 4.6,
      reviews: "8,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
    {
      title: "Artificial Intelligence (AI) Foundations for Developers",
      instructor: "Simon Elisha Simon",
      rating: 4.8,
      reviews: "500",
      price: "E£349.99",
      tags: ["Highest Rated"],
    },
    {
      title: "The Complete Guide To AI Powered Salesforce Development",
      instructor: "Mark T. Smith",
      rating: 4.2,
      reviews: "200",
      price: "E£349.99",
      tags: ["Hot & New"],
    },
    {
      title: "Practical Deep Learning and Computer Vision for 2025",
      instructor: "Chris M. Chen",
      rating: 4.5,
      reviews: "15,000",
      price: "E£349.99",
      tags: [],
    },
    {
      title: "Machine Learning from A to Z™: The Definitive Guide",
      instructor: "Kirill Eremenko",
      rating: 4.6,
      reviews: "20,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
  ],
  Python: [
    {
      title: "100 Days of Code: The Complete Python Pro Bootcamp for 2025",
      instructor: "Angela Yu",
      rating: 4.7,
      reviews: "650,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
    {
      title:
        "The Python Mega Course: Learn Python in 60 Days with 100 Projects",
      instructor: "Ardit Sulce",
      rating: 4.6,
      reviews: "250,000",
      price: "E£349.99",
      tags: [],
    },
    {
      title: "Machine Learning A-Z™: Python & R In Data Science",
      instructor: "Kirill Eremenko",
      rating: 4.5,
      reviews: "100,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
  ],
  WebDevelopment: [
    {
      title: "The Web Developer Bootcamp 2025",
      instructor: "Colt Steele",
      rating: 4.6,
      reviews: "400,000",
      price: "E£349.99",
      tags: ["Bestseller"],
    },
    {
      title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.7,
      reviews: "350,000",
      price: "E£349.99",
      tags: ["Highest Rated"],
    },
  ],
};

const TRUSTED_LOGOS = [
  { name: "Volkswagen", font: "font-serif" },
  { name: "Samsung", font: "font-sans" },
  { name: "Cisco", font: "font-mono" },
  { name: "Vimeo", font: "font-sans" },
  { name: "L.G", font: "font-serif" },
  { name: "Hewlett Packard Enterprise", font: "font-sans" },
  { name: "Citi", font: "font-serif" },
  { name: "Ericsson", font: "font-mono" },
];

// --- PRESENTATIONAL COMPONENTS ---

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center text-sm">
    <span className="text-amber-500 font-bold mr-1">{rating.toFixed(1)}</span>
    <div className="flex text-amber-500">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors duration-150 ${
            i < Math.floor(rating)
              ? "fill-amber-500 text-amber-500"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
    <span className="text-gray-500 text-xs ml-1">({reviews})</span>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="w-64 flex-shrink-0 cursor-pointer p-2 hover:shadow-xl transition-shadow duration-300 rounded-lg group">
    <div className="relative h-36 w-full mb-2 bg-gray-100 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
      <img
        src={`https://placehold.co/256x144/f3f4f6/374151?text=Course+Thumb`}
        alt={course.title}
        className="w-full h-full object-cover"
        onError={(e) =>
          (e.target.src = `https://placehold.co/256x144/f3f4f6/374151?text=Course+Thumb`)
        }
      />
      {course.tags.includes("Bestseller") && (
        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm shadow-md">
          BESTSELLER
        </span>
      )}
    </div>
    <p className="font-bold text-gray-900 text-base line-clamp-2 transition-colors duration-200 group-hover:text-indigo-700">
      {course.title}
    </p>
    <p className="text-xs text-gray-600 mt-1">{course.instructor}</p>
    <div className="mt-1">
      <StarRating rating={course.rating} reviews={course.reviews} />
    </div>

    <div className="flex items-center mt-2 h-5">
      {course.tags.map((tag, index) => (
        <span
          key={index}
          className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 transition-colors duration-200 ${
            tag === "Bestseller"
              ? "bg-amber-100 text-amber-800"
              : tag === "Highest Rated"
              ? "bg-green-100 text-green-800"
              : tag === "Hot & New"
              ? "bg-red-100 text-red-800"
              : "hidden"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
    <p className="font-bold text-lg text-gray-900 mt-1">{course.price}</p>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTab, setActiveTab] = useState(
    Object.keys(COURSES_DATA)[0] || "Artificial Intelligence (AI)"
  );

  const TopBanner = () => (
    <div className="bg-indigo-700 text-white text-center py-2 text-sm font-medium relative overflow-hidden">
      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 px-4">
        <span>New-learner offer! Courses from E£259.99.</span>
        <button className="mt-1 sm:mt-0 bg-white text-indigo-700 font-bold px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition duration-150 shadow-md">
          Click to redeem
        </button>
      </div>
      <div className="text-xs mt-1 relative z-10">Ends in 5h 56m 33s.</div>
    </div>
  );

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <Menu className="w-6 h-6 text-gray-800 cursor-pointer lg:hidden hover:text-indigo-700 transition" />
          <h1 className="text-2xl font-black text-indigo-700 cursor-pointer">
            udemy
          </h1>
          <a
            href="#"
            className="hidden lg:block text-sm text-gray-800 hover:text-indigo-700 transition duration-150 p-2 rounded-lg"
          >
            Categories
          </a>
        </div>

        {/* Search Bar (Desktop/Tablet) */}
        <div className="hidden lg:flex flex-grow max-w-xl mx-4">
          <div className="flex w-full items-center border border-gray-300 rounded-full bg-gray-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300">
            <Search className="w-5 h-5 ml-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for anything"
              className="flex-grow bg-transparent p-2 outline-none text-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href="#"
            className="hidden xl:block text-sm text-gray-800 hover:text-indigo-700 transition"
          >
            Udemy Business
          </a>
          <a
            href="#"
            className="hidden xl:block text-sm text-gray-800 hover:text-indigo-700 transition"
          >
            Teach on Udemy
          </a>

          <div className="hidden lg:block p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
          </div>

          <div className="hidden lg:flex space-x-2">
            <button className="px-4 py-2 border border-gray-900 text-gray-900 font-bold rounded-sm hover:bg-gray-100 transition">
              Log in
            </button>
            <button className="px-4 py-2 bg-indigo-700 text-white font-bold rounded-sm hover:bg-indigo-800 transition shadow-md">
              Sign up
            </button>
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer border border-gray-300 hidden lg:block transition">
            <Globe className="w-5 h-5 text-gray-800" />
          </div>
          <Search className="w-6 h-6 text-gray-800 cursor-pointer lg:hidden hover:text-indigo-700 transition" />
          <ShoppingCart className="w-6 h-6 text-gray-800 cursor-pointer lg:hidden hover:text-indigo-700 transition" />
        </div>
      </div>
    </header>
  );

  const HeroSection = () => (
    <section className="relative bg-white py-8 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 max-w-lg lg:order-1 order-2 mt-8 lg:mt-0">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Jump into learning — for less
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you're new to Udemy, we've got good news. For a limited time,
            courses start at just E£259.99 for new learners!
          </p>
          <button className="px-8 py-3 bg-indigo-700 text-white font-bold rounded-lg text-lg hover:bg-indigo-800 transition shadow-xl transform hover:scale-[1.02]">
            Sign up now
          </button>
        </div>

        {/* Graphic (Placeholder for the complex illustration) */}
        <div className="lg:w-1/2 lg:order-2 order-1 relative">
          <div className="w-full h-80 lg:h-96 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl border border-gray-200">
            {/* Simple geometric placeholder for the illustration */}
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-100 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute top-10 right-10 w-20 h-20 bg-indigo-400 transform rotate-12 rounded-lg shadow-md"></div>
              <Code className="absolute bottom-12 right-20 w-12 h-12 text-indigo-700 animate-bounce" />
              <User className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-indigo-700 z-10" />
            </div>
          </div>
          {/* Carousel Arrows (Mobile/Tablet view) */}
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg lg:hidden hover:bg-gray-100 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg lg:hidden hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );

  const SkillsSection = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 max-w-lg">
          Learn essential career and life skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS_CARDS.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-start border border-gray-100"
            >
              <div className="h-40 w-full mb-4 flex items-center justify-center bg-white rounded-lg shadow-inner overflow-hidden">
                <img
                  src={card.imagePlaceholder}
                  alt="Skill illustration"
                  className="w-full h-full object-contain"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/120x150/f3f4f6/374151?text=Image")
                  }
                />
              </div>
              <div className="p-4 bg-white rounded-xl shadow-xl -mt-12 w-11/12 mx-auto border border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-indigo-50 rounded-full">
                      {card.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {card.subtitle}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-700 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AISection = () => (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between shadow-2xl transform transition-transform duration-500 hover:scale-[1.005]">
          {/* Text and Features */}
          <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
            <h2 className="text-4xl font-extrabold mb-4">
              Reimagine your career in the AI era
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Future-proof your skills with Personal Plan. Get access to a
              variety of fresh content from real-world experts.
            </p>

            <div className="grid grid-cols-2 gap-y-4 mb-10">
              {AI_FEATURES.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg text-md hover:bg-gray-100 transition shadow-lg">
              Learn more
            </button>
          </div>

          {/* Image Placeholder */}
          <div className="lg:w-1/3 relative flex justify-center">
            <div className="w-full max-w-xs h-72 bg-indigo-700 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl relative">
              <img
                src="https://placehold.co/300x288/4f46e5/ffffff?text=AI+Era+Visual"
                alt="AI Era Visual"
                className="w-full h-full object-cover opacity-70"
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/300x288/4f46e5/ffffff?text=AI+Era+Visual")
                }
              />
              <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white animate-ping opacity-75" />
              <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-xs mt-3 text-center absolute -bottom-8">
              Starting at E£1,000 / month
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const CourseCarousel = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Skills to transform your career and life
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          From critical skills to technical topics, Udemy supports you in your
          professional development.
        </p>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-6 border-b border-gray-300 mb-8 pb-1 whitespace-nowrap">
          {Object.keys(COURSES_DATA).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`text-lg font-bold pb-2 transition-colors duration-200 ${
                activeTab === category
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
              }`}
            >
              {
                category
                  .split(/(?=[A-Z])/)
                  .join(" ") /* Adds space between words like WebDevelopment */
              }
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="relative">
          <div
            className="flex overflow-x-scroll space-x-4 scroll-smooth pb-4"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {COURSES_DATA[activeTab]?.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
            {/* Show all link */}
            <div className="flex flex-col justify-center items-center w-64 flex-shrink-0 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition">
              <p className="text-indigo-700 font-bold hover:underline">
                Show all {activeTab.split(/(?=[A-Z])/).join(" ")} courses
              </p>
              <ChevronRight className="w-5 h-5 text-indigo-700 mt-2" />
            </div>
          </div>
          {/* Carousel Arrows (Desktop view) - simple placehodlers */}
          <button className="hidden xl:block absolute -right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-xl border border-gray-200 hover:bg-gray-50 transition">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );

  const TrustedCompanies = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl text-gray-600 font-semibold mb-10">
          Trusted by over 17,000 companies and millions of learners around the
          world
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {TRUSTED_LOGOS.map((company, index) => (
            <div
              key={index}
              className={`opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${company.font}`}
            >
              <span className="text-3xl font-extrabold text-gray-900">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    // Set the base font for the entire application
    <div className="min-h-screen font-[Inter]">
      {/* TopBanner is optional but included for a realistic clone */}
      <TopBanner />
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <AISection />
        <CourseCarousel />
        <TrustedCompanies />
      </main>
    </div>
  );
};

export default App;
