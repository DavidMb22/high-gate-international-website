import styles from "./SchoolCalendar.module.css";
import { Link } from "react-router-dom";

import aboutMain from "../../../assets/images/about/about-main.JPG";

const terms = [
  {
    term: "Term 1",
    period: "August – December 2026",
    start: "August 31, 2026",
    end: "December 18, 2026",
  },
  {
    term: "Term 2",
    period: "January – April 2027",
    start: "January 5, 2027",
    end: "April 9, 2027",
  },
  {
    term: "Term 3",
    period: "April – July 2027",
    start: "April 14, 2027",
    end: "July 2, 2027",
  },
];

const calendarEvents = [
  {
    date: "August 31",
    month: "2026",
    title: "First Day of Term 1",
    category: "Term",
  },
  {
    date: "September 11",
    month: "2026",
    title: "Curriculum Evening",
    category: "School Event",
  },
  {
    date: "October 12–16",
    month: "2026",
    title: "Mid-Term Exams",
    category: "Assessment",
  },
  {
    date: "October 19–22",
    month: "2026",
    title: "Mid-Term Break",
    category: "Break",
  },
  {
    date: "December 10–16",
    month: "2026",
    title: "End of Term 1 Exams",
    category: "Assessment",
  },
  {
    date: "December 21–31",
    month: "2026",
    title: "School Holiday",
    category: "Holiday",
  },
  {
    date: "January 5",
    month: "2027",
    title: "First Day of Term 2",
    category: "Term",
  },
  {
    date: "January 29",
    month: "2027",
    title: "Global Village",
    category: "School Event",
  },
  {
    date: "February 8–10",
    month: "2027",
    title: "Mid-Term Exams",
    category: "Assessment",
  },
  {
    date: "February 11–12",
    month: "2027",
    title: "Mid-Term Break",
    category: "Break",
  },
  {
    date: "March 22–25",
    month: "2027",
    title: "End of Term Exams",
    category: "Assessment",
  },
  {
    date: "April 14",
    month: "2027",
    title: "First Day of Term 3",
    category: "Term",
  },
  {
    date: "April 30",
    month: "2027",
    title: "Career Day",
    category: "School Event",
  },
  {
    date: "May 15",
    month: "2027",
    title: "Annual Sports Day",
    category: "School Event",
  },
  {
    date: "May 21",
    month: "2027",
    title: "Parent-Teacher-Child Day – Nursery",
    category: "Community",
  },
  {
    date: "May 26–28",
    month: "2027",
    title: "Progression Test",
    category: "Assessment",
  },
  {
    date: "June 21–25",
    month: "2027",
    title: "End of Term Exams",
    category: "Assessment",
  },
  {
    date: "June 30",
    month: "2027",
    title: "PTC / Accountability Meeting",
    category: "Community",
  },
  {
    date: "July 2",
    month: "2027",
    title: "Graduation",
    category: "School Event",
  },
];

const categories = [
  "Term",
  "Assessment",
  "Break",
  "Holiday",
  "School Event",
  "Community",
];

function SchoolCalendar() {
  return (
    <main className={styles.page}>

      {/* HERO */}

      <section className={styles.hero}>

        {/* HERO IMAGE */}

        <div className={styles.heroImage}>

          <img
            src={aboutMain}
            alt="High Gate International Academy students"
          />

        </div>


        {/* DARK BLUE OVERLAY */}

        <div className={styles.heroOverlay} />


        {/* HERO CONTENT */}

        <div className={styles.heroContent}>

          <span className={styles.eyebrow}>
            ADMISSIONS
          </span>

          <h1>
            School Calendar
          </h1>

          <p>
            2026–2027 Academic Year
          </p>


          {/* BREADCRUMB */}

          <div className={styles.breadcrumb}>

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <Link to="/admissions/calendar">
              Admissions
            </Link>

            <span>/</span>

            <span>
              School Calendar
            </span>

          </div>

        </div>

      </section>


      {/* INTRO */}

      <section className={styles.introduction}>
        <div className={styles.container}>

          <span className={styles.eyebrow}>
            ACADEMIC YEAR 2026–2027
          </span>

          <h2>
            Plan the Year Ahead
          </h2>

          <p>
            Explore the key dates, academic terms, assessments,
            school events, breaks and holidays for the
            2026–2027 academic year.
          </p>

        </div>
      </section>

      {/* DOWNLOAD CALENDAR */}

      <section className={styles.downloadSection}>
        <div className={styles.container}>

          <div className={styles.downloadContent}>

            <div>
              <span className={styles.eyebrow}>
                OFFICIAL DOCUMENT
              </span>

              <h2>
                Download the Academic Calendar
              </h2>

              <p>
                Download the official High Gate International
                Academy Academic Calendar for the 2026–2027
                school year and keep all important dates with you.
              </p>
            </div>

            <a
              href="/documents/HGIA-Academic-Calendar-2026-2027.pdf"
              download="HGIA-Academic-Calendar-2026-2027.pdf"
              className={styles.downloadButton}
            >
              <span>↓</span>
              Download Calendar
            </a>

          </div>

        </div>
      </section>


      {/* TERMS */}

      <section className={styles.terms}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              ACADEMIC TERMS
            </span>

            <h2>
              The School Year at a Glance
            </h2>

          </div>

          <div className={styles.termGrid}>

            {terms.map((term, index) => (
              <div
                className={styles.termCard}
                key={term.term}
              >

                <span className={styles.termNumber}>
                  0{index + 1}
                </span>

                <span className={styles.termLabel}>
                  {term.period}
                </span>

                <h3>
                  {term.term}
                </h3>

                <div className={styles.termDates}>

                  <div>
                    <span>START</span>
                    <strong>{term.start}</strong>
                  </div>

                  <div>
                    <span>END</span>
                    <strong>{term.end}</strong>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* KEY DATES */}

      <section className={styles.events}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              IMPORTANT DATES
            </span>

            <h2>
              Key Dates for 2026–2027
            </h2>

            <p>
              Keep track of important academic, assessment
              and community dates throughout the school year.
            </p>

          </div>


          <div className={styles.filterList}>

            {categories.map((category) => (
              <span key={category}>
                {category}
              </span>
            ))}

          </div>


          <div className={styles.eventList}>

            {calendarEvents.map((event, index) => (
              <article
                className={styles.eventRow}
                key={`${event.date}-${event.title}`}
              >

                <div className={styles.eventDate}>
                  <strong>
                    {event.date}
                  </strong>

                  <span>
                    {event.month}
                  </span>
                </div>

                <div className={styles.eventInfo}>

                  <span className={styles.eventCategory}>
                    {event.category}
                  </span>

                  <h3>
                    {event.title}
                  </h3>

                </div>

                <span className={styles.eventNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* SCHOOL YEAR RHYTHM */}

      <section className={styles.rhythm}>
        <div className={styles.container}>

          <div className={styles.rhythmContent}>

            <span className={styles.eyebrow}>
              SCHOOL YEAR
            </span>

            <h2>
              Learning, Growth
              & Community
            </h2>

            <p>
              From academic assessments and progression tests
              to sports, career experiences and community
              events, the school calendar brings together the
              different parts of life at High Gate.
            </p>

          </div>

          <div className={styles.rhythmGrid}>

            <div>
              <strong>01</strong>
              <h3>Learning</h3>
              <p>
                Academic learning and continuous progress.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <h3>Assessment</h3>
              <p>
                Exams and progression activities throughout
                the academic year.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <h3>Community</h3>
              <p>
                Events that bring learners, parents and
                teachers together.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h3>Celebration</h3>
              <p>
                Sports, graduation and special school events.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className={styles.cta}>

        <div className={styles.ctaContent}>

          <span className={styles.eyebrow}>
            JOIN HIGH GATE
          </span>

          <h2>
            Ready to Begin
            the Journey?
          </h2>

          <p>
            Explore admissions and take the next step toward
            joining the High Gate International Academy
            community.
          </p>

          <Link
            to="/admissions/apply"
            className={styles.ctaButton}
          >
            Apply Now
          </Link>

        </div>

      </section>

    </main>
  );
}

export default SchoolCalendar;