import React, { useState } from "react";

// =====================
// Dummy Data
// =====================
const popularCourses = [
  { title: "Python Bootcamp", rating: 4.7, students: 120000 },
  { title: "React for Beginners", rating: 4.8, students: 80000 },
  { title: "SQL Mastery", rating: 4.6, students: 90000 },
  { title: "Excel from Zero to Hero", rating: 4.9, students: 100000 },
];

const companies = [
  "Nasdaq",
  "Volkswagen",
  "Netflix",
  "Box",
  "Eventbrite",
];

// =====================
// Styles
// =====================
const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  navLeft: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#A435F0",
  },
  searchBox: {
    width: "300px",
    padding: "10px",
    borderRadius: "25px",
    border: "1px solid #ccc",
  },
  loginBox: {
    display: "flex",
    gap: "10px",
  },
  hero: {
    background: "#F7F9FA",
    padding: "50px",
    borderRadius: "10px",
    textAlign: "left",
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  heroText: {
    fontSize: "18px",
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "40px",
    marginBottom: "10px",
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  courseCard: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
  },
  companyContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  companyLogo: {
    padding: "15px 25px",
    fontWeight: "bold",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "white",
  },
};

// =====================
// Components
// =====================
function Navbar({ search, setSearch }) {
  return (
    <div style={styles.navbar}>
      <div style={styles.navLeft}>Udemy</div>

      {/* Search Box */}
      <input
        style={styles.searchBox}
        type="text"
        placeholder="Search for anything"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Login/Signup */}
      <div style={styles.loginBox}>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div style={styles.hero}>
      <div style={styles.heroTitle}>Learning that gets you jobs</div>
      <div style={styles.heroText}>
        Skills for your future, taught by real-world experts.
      </div>
    </div>
  );
}

function PopularCourses({ filteredCourses }) {
  return (
    <>
      <h2 style={styles.sectionTitle}>Most Popular Courses</h2>

      <div style={styles.courseGrid}>
        {filteredCourses.map((course, i) => (
          <div key={i} style={styles.courseCard}>
            <h3>{course.title}</h3>
            <p>Rating: {course.rating}</p>
            <p>{course.students.toLocaleString()} students</p>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <p>No courses match your search.</p>
        )}
      </div>
    </>
  );
}

function TrustedCompanies() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Trusted by companies worldwide</h2>

      <div style={styles.companyContainer}>
        {companies.map((c, i) => (
          <div key={i} style={styles.companyLogo}>
            {c}
          </div>
        ))}
      </div>
    </>
  );
}

// =====================
// Main App Component
// =====================
export default function App() {
  const [search, setSearch] = useState("");

  const filteredCourses = popularCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.main}>
      <Navbar search={search} setSearch={setSearch} />
      <Hero />
      <PopularCourses filteredCourses={filteredCourses} />
      <TrustedCompanies />
    </div>
  );
}
