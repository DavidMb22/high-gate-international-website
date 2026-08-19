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

import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminEvents from "./pages/Admin/Events/AdminEvents";
import AdminEventForm from "./pages/Admin/Events/AdminEventForm";
import AdminEventEdit from "./pages/Admin/Events/AdminEventEdit";
import AdminActivities from "./pages/Admin/Activities/AdminActivities";
import AdminActivityForm from "./pages/Admin/Activities/AdminActivityForm";
import AdminActivityEdit from "./pages/Admin/Activities/AdminActivityEdit";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminNewsletter from "./pages/Admin/Newsletter/AdminNewsletter";
import AdminNewsletterForm from "./pages/Admin/Newsletter/AdminNewsletterForm";
import AdminNewsletterEdit from "./pages/Admin/Newsletter/AdminNewsletterEdit";
import AdminUpcomingEvents from "./pages/Admin/UpcomingEvents/AdminUpcomingEvents";
import AdminUpcomingEventForm from "./pages/Admin/UpcomingEvents/AdminUpcomingEventForm";
import AdminUpcomingEventEdit from "./pages/Admin/UpcomingEvents/AdminUpcomingEventEdit";

import Newsletter from "./pages/Newsletter/Newsletter";

import Contact from "./pages/Contact/Contact";

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

function PublicLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

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

        <Route
          path="/newsletter/:slug"
          element={<Newsletter />}
        />

        <Route
          path="/school-events"
          element={<SchoolEvents />}
        />


        <Route
          path="/school-activities"
          element={<SchoolActivities />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      <Footer />
    </>
  );
}


function AppLayout() {
  return (
    <Routes>

      {/* =========================
          ADMIN LOGIN
      ========================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          ADMIN
      ========================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="events"
          element={<AdminEvents />}
        />

        <Route
          path="events/new"
          element={<AdminEventForm />}
        />

        <Route
          path="events/:id/edit"
          element={<AdminEventEdit />}
        />

        <Route
          path="activities"
          element={<AdminActivities />}
        />

        <Route
          path="activities/new"
          element={<AdminActivityForm />}
        />

        <Route
          path="activities/:id/edit"
          element={<AdminActivityEdit />}
        />

        <Route
          path="newsletter"
          element={<AdminNewsletter />}
        />

        <Route
          path="newsletter/new"
          element={<AdminNewsletterForm />}
        />

        <Route
          path="newsletter/:id/edit"
          element={<AdminNewsletterEdit />}
        />

        <Route
          path="upcoming-events"
          element={<AdminUpcomingEvents />}
        />

        <Route
          path="upcoming-events/new"
          element={<AdminUpcomingEventForm />}
        />

        <Route
          path="upcoming-events/:id/edit"
          element={<AdminUpcomingEventEdit />}
        />

      </Route>


      {/* =========================
          PUBLIC WEBSITE
      ========================= */}

      <Route
        path="*"
        element={<PublicLayout />}
      />

    </Routes>
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