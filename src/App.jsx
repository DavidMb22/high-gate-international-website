import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Programs from "./components/Programs/Programs";
import Partners from "./components/Partners/Partners";
import SchoolLife from "./components/SchoolLife/SchoolLife";
import UpcomingEvents from "./components/UpcomingEvents/UpcomingEvents";
import AdmissionsCTA from "./components/AdmissionsCTA/AdmissionsCTA";

import Creche from "./pages/Academics/Creche/Creche";

import WhoWeAre from "./pages/About/WhoWeAre";
import VisionMission from "./pages/About/VisionMission";
import Leadership from "./pages/About/Leadership";
import WhyHighGate from "./pages/About/WhyHighGate";

import Curriculum from "./pages/Academics/Curriculum";

import Nursery from "./pages/Academics/Nursery/Nursery";

import Primary from "./pages/Academics/Primary/Primary";

import TuitionFees from "./pages/Admissions/TuitionFees/TuitionFees";

import ApplyNow from "./pages/Admissions/ApplyNow/ApplyNow";

import SchoolCalendar from "./pages/Admissions/SchoolCalendar/SchoolCalendar";

import LowerSecondary from "./pages/Academics/LowerSecondary/LowerSecondary";

import SchoolEvents from "./pages/SchoolEvents";
import SchoolActivities from "./pages/SchoolActivities";


function HomePage() {
  return (
    <main>
      <Hero />

      <About />

      <Programs />

      <Partners />

      <SchoolLife />

      <UpcomingEvents />

      <AdmissionsCTA />
    </main>
  );
}


function AppLayout() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<HomePage />}
        />


        {/* =========================
            ABOUT
        ========================= */}

        <Route
          path="/who-we-are"
          element={<WhoWeAre />}
        />

        <Route
          path="/vision-mission"
          element={<VisionMission />}
        />

        <Route
          path="/leadership"
          element={<Leadership />}
        />

        <Route
          path="/why-high-gate"
          element={<WhyHighGate />}
        />

        <Route
          path="/admissions/apply"
          element={<ApplyNow />}
        />

        <Route
          path="/admissions/fees"
          element={<TuitionFees />}
        />

        <Route
          path="/admissions/calendar"
          element={<SchoolCalendar />}
        />

        {/* =========================
            ACADEMICS
        ========================= */}

        <Route
          path="/curriculum"
          element={<Curriculum />}
        />

        <Route
          path="/academics/creche"
          element={<Creche />}
        />

        <Route
          path="/academics/nursery"
          element={<Nursery />}
        />

        <Route
          path="/academics/primary"
          element={<Primary />}
        />

        <Route
          path="/academics/lower-secondary"
          element={<LowerSecondary />}
        />

        {/* =========================
            SCHOOL LIFE
        ========================= */}

        <Route
          path="/school-events"
          element={<SchoolEvents />}
        />

        <Route
          path="/school-activities"
          element={<SchoolActivities />}
        />

      </Routes>

      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}


export default App;