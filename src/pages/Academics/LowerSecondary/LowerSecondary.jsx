import styles from "./LowerSecondary.module.css";

import lowerSecondaryHero from "../../../assets/images/programs/lower-secondary/lower-secondary-hero.JPG";
import lowerSecondary1 from "../../../assets/images/programs/lower-secondary/lower-secondary-1.JPG";
import lowerSecondary2 from "../../../assets/images/programs/lower-secondary/lower-secondary-2.JPG";
import lowerSecondary3 from "../../../assets/images/programs/lower-secondary/lower-secondary-3.JPG";
import lowerSecondaryActivities from "../../../assets/images/programs/lower-secondary/lower-secondary-activities.JPG";

import { Link } from "react-router-dom";

function LowerSecondary() {
  return (
    <main className={styles.page}>

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url("${lowerSecondaryHero}")`,
          }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>

              <span className={styles.eyebrow}>
                SECONDARY SCHOOL
              </span>

              <h1>Lower Secondary</h1>

              <p>
                Preparing confident learners with the knowledge,
                skills and global perspective to take their next
                step.
              </p>

            </div>
          </div>
        </div>
      </section>


      {/* =========================
          INTRODUCTION
      ========================= */}

      <section className={styles.introduction}>
        <div className={styles.container}>

          <div className={styles.introContent}>

            <span className={styles.eyebrow}>
              LOWER SECONDARY
            </span>

            <h2>
              Preparing Learners
              for the Next Stage
            </h2>

            <p>
              Our Lower Secondary programme gives learners
              opportunities to deepen their academic knowledge,
              develop critical thinking and become increasingly
              independent in their learning.
            </p>

            <p>
              The programme supports learners as they prepare
              for important academic milestones while developing
              the confidence and skills needed for the future.
            </p>

          </div>

          <div className={styles.introImage}>
            <img
              src={lowerSecondary1}
              alt="Lower Secondary learners at High Gate International Academy"
            />
          </div>

        </div>
      </section>


      {/* =========================
          GRADES
      ========================= */}

      <section className={styles.grades}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>

            <span className={styles.eyebrow}>
              LOWER SECONDARY LEVELS
            </span>

            <h2>
              Grade 7 & Grade 8
            </h2>

            <p>
              Our Lower Secondary programme currently includes
              Grade 7 and Grade 8, with learning progressing
              toward the Cambridge Checkpoint examinations
              taken in Grade 8.
            </p>

          </div>


          <div className={styles.gradeGrid}>

            <div className={styles.gradeCard}>

              <div className={styles.gradeNumber}>
                07
              </div>

              <div>
                <span className={styles.cardLabel}>
                  LOWER SECONDARY
                </span>

                <h3>Grade 7</h3>

                <p>
                  Learners strengthen their subject knowledge,
                  critical-thinking abilities and independent
                  learning skills as they progress through
                  Lower Secondary.
                </p>
              </div>

            </div>


            <div className={`${styles.gradeCard} ${styles.gradeEight}`}>

              <div className={styles.gradeNumber}>
                08
              </div>

              <div>
                <span className={styles.cardLabel}>
                  CHECKPOINT YEAR
                </span>

                <h3>Grade 8</h3>

                <p>
                  Grade 8 is the Cambridge Checkpoint examination
                  year, giving learners an important opportunity
                  to demonstrate their knowledge and skills.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CAMBRIDGE PATHWAY
      ========================= */}

      <section className={styles.cambridge}>
        <div className={styles.container}>

          <div className={styles.cambridgeContent}>

            <span className={styles.eyebrow}>
              CAMBRIDGE PATHWAY
            </span>

            <h2>
              Cambridge Assessment
              International Education
            </h2>

            <p>
              Our Lower Secondary programme follows the
              Cambridge pathway, giving learners an internationally
              recognised educational experience and preparing
              them for the next stage of their academic journey.
            </p>

            <p>
              Learning encourages students to think critically,
              apply knowledge and develop the skills needed to
              become confident, independent learners.
            </p>

            <div className={styles.cambridgeBadge}>
              <span>CAMBRIDGE</span>
              <strong>International Education</strong>
            </div>

          </div>

          <div className={styles.cambridgeImage}>
            <img
              src={lowerSecondary2}
              alt="Cambridge pathway at High Gate International Academy"
            />
          </div>

        </div>
      </section>


      {/* =========================
          SUBJECTS
      ========================= */}

      <section className={styles.subjects}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>

            <span className={styles.eyebrow}>
              SUBJECTS
            </span>

            <h2>
              Broadening Knowledge
              and Understanding
            </h2>

            <p>
              Learners study a range of subjects that develop
              academic knowledge, communication, analytical
              thinking and creativity.
            </p>

          </div>


          <div className={styles.subjectGrid}>

            <div className={styles.subjectCard}>
              <span>01</span>
              <h3>English</h3>
              <p>
                Developing communication, comprehension,
                writing and analytical skills.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>02</span>
              <h3>Mathematics</h3>
              <p>
                Building mathematical reasoning,
                problem-solving and application skills.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>03</span>
              <h3>Science</h3>
              <p>
                Exploring scientific concepts through
                investigation and critical thinking.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>04</span>
              <h3>Languages</h3>
              <p>
                Developing multilingual communication
                and language skills.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>05</span>
              <h3>Technology</h3>
              <p>
                Using technology to support learning,
                creativity and problem-solving.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>06</span>
              <h3>Creative Learning</h3>
              <p>
                Encouraging creativity, expression and
                broader personal development.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          ASSESSMENT
      ========================= */}

      <section className={styles.assessment}>
        <div className={styles.container}>

          <div className={styles.assessmentImage}>
            <img
              src={lowerSecondary3}
              alt="Lower Secondary assessment at High Gate"
            />
          </div>

          <div className={styles.assessmentContent}>

            <span className={styles.eyebrow}>
              ASSESSMENT
            </span>

            <h2>
              Grade 8 Cambridge
              Checkpoint
            </h2>

            <p>
              Assessment is an important part of the Lower
              Secondary learning journey. It helps teachers
              understand learner progress and identify areas
              where students can continue to grow.
            </p>

            <div className={styles.checkpointBox}>

              <span className={styles.checkpointNumber}>
                08
              </span>

              <div>
                <strong>
                  Cambridge Checkpoint
                </strong>

                <p>
                  Grade 8 is the examination year for the
                  Cambridge Checkpoint assessments.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          TECHNOLOGY
      ========================= */}

      <section className={styles.technology}>
        <div className={styles.container}>

          <div className={styles.technologyContent}>

            <span className={styles.eyebrow}>
              TECHNOLOGY & INNOVATION
            </span>

            <h2>
              Preparing Learners
              for a Digital World
            </h2>

            <p>
              Technology supports learning across the school
              experience, helping students develop digital
              confidence, problem-solving abilities and
              creative thinking.
            </p>

            <div className={styles.technologyFeatures}>

              <div>
                <strong>01</strong>
                <span>Digital Skills</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Problem Solving</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Critical Thinking</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Innovation</span>
              </div>

            </div>

          </div>

          <div className={styles.technologyVisual}>
            <div className={styles.visualNumber}>
              01
            </div>

            <span>
              TECHNOLOGY
            </span>

            <h3>
              Learn.
              Create.
              Innovate.
            </h3>

            <p>
              Developing the skills learners need to navigate
              an increasingly digital world.
            </p>
          </div>

        </div>
      </section>


      {/* =========================
          LANGUAGES
      ========================= */}

      <section className={styles.languages}>
        <div className={styles.container}>

          <div className={styles.languagesImage}>
            <img
              src={lowerSecondary1}
              alt="Lower Secondary learners"
            />
          </div>

          <div className={styles.languagesContent}>

            <span className={styles.eyebrow}>
              LANGUAGES
            </span>

            <h2>
              Communicating Across
              Cultures
            </h2>

            <p>
              Language learning plays an important role in
              developing communication, cultural awareness
              and confidence.
            </p>

            <div className={styles.languageList}>

              <div>
                <span>01</span>
                <strong>English</strong>
              </div>

              <div>
                <span>02</span>
                <strong>French</strong>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          EXTRACURRICULAR
      ========================= */}

      <section className={styles.activities}>
        <div className={styles.container}>

          <div className={styles.activitiesHeader}>

            <div>

              <span className={styles.eyebrow}>
                BEYOND THE CLASSROOM
              </span>

              <h2>
                Extracurricular Activities
              </h2>

            </div>

            <p>
              Learners have opportunities to participate in
              activities that support teamwork, confidence,
              creativity, leadership and personal development.
            </p>

          </div>


          <div className={styles.activitiesGrid}>

            <div className={styles.activitiesImage}>
              <img
                src={lowerSecondaryActivities}
                alt="Lower Secondary extracurricular activities"
              />
            </div>

            <div className={styles.activityCards}>

              <div className={styles.activityCard}>
                <span>01</span>
                <h3>Sports</h3>
                <p>
                  Developing teamwork, discipline and
                  physical wellbeing.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>02</span>
                <h3>Creative Activities</h3>
                <p>
                  Encouraging expression, creativity and
                  discovery beyond academic lessons.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>03</span>
                <h3>Clubs & Projects</h3>
                <p>
                  Creating opportunities for collaboration,
                  leadership and independent interests.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>04</span>
                <h3>School Events</h3>
                <p>
                  Bringing students together as part of
                  the wider High Gate community.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          GALLERY
      ========================= */}

      <section className={styles.gallery}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>

            <span className={styles.eyebrow}>
              LIFE AT HIGH GATE
            </span>

            <h2>
              Discover Lower Secondary
            </h2>

          </div>


          <div className={styles.galleryGrid}>

            <div className={styles.galleryLarge}>
              <img
                src={lowerSecondaryHero}
                alt="High Gate Lower Secondary"
              />
            </div>

            <div>
              <img
                src={lowerSecondary1}
                alt="Lower Secondary classroom"
              />
            </div>

            <div>
              <img
                src={lowerSecondary2}
                alt="Lower Secondary learning"
              />
            </div>

            <div>
              <img
                src={lowerSecondary3}
                alt="Lower Secondary students"
              />
            </div>

            <div>
              <img
                src={lowerSecondaryActivities}
                alt="Lower Secondary activities"
              />
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className={styles.cta}>

        <div className={styles.ctaOverlay}>

          <span className={styles.eyebrow}>
            THE NEXT STEP
          </span>

          <h2>
            Prepare for
            What's Ahead
          </h2>

          <p>
            Discover a Cambridge learning environment that
            prepares students to grow academically, think
            independently and pursue their ambitions.
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

export default LowerSecondary;