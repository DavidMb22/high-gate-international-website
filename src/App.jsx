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


import SchoolEvents from "./pages/SchoolEvents";
import SchoolActivities from "./pages/SchoolActivities";


function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <About />

        <Programs />

        <Partners />

        <SchoolLife />

        <UpcomingEvents />

        <AdmissionsCTA />
      </main>

      <Footer />

    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/school-events"
          element={
            <>
              <Navbar />
              <SchoolEvents />
            </>
          }
        />

        <Route
          path="/school-activities"
          element={
            <>
              <Navbar />
              <SchoolActivities />
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;