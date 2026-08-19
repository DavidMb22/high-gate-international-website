import styles from "./Primary.module.css";

import primaryHero from "../../../assets/images/programs/primary/primary-hero.JPG";
import primary1 from "../../../assets/images/programs/primary/primary-1.JPG";
import primary2 from "../../../assets/images/programs/primary/primary-2.JPG";
import primary3 from "../../../assets/images/programs/primary/primary-3.JPG";
import primaryCoding from "../../../assets/images/programs/primary/primary-coding.png";
import primarySports from "../../../assets/images/programs/primary/primary-sports.JPG";
import primaryLearning from "../../../assets/images/programs/primary/primary-learning.JPG";

import { Link } from "react-router-dom";

function Primary() {
  return (
    <main className={styles.page}>

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url("${primaryHero}")`,
          }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>

              <span className={styles.eyebrow}>
                PRIMARY SCHOOL
              </span>

              <h1>Primary</h1>

              <p>
                Building knowledge, confidence and the skills
                learners need to thrive in a changing world.
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
              PRIMARY EDUCATION
            </span>

            <h2>
              Building Strong Foundations
              for the Future
            </h2>

            <p>
              Our Primary programme provides learners with a
              balanced educational experience that develops
              academic knowledge alongside creativity,
              confidence and essential life skills.
            </p>

            <p>
              Through engaging lessons and practical experiences,
              learners are encouraged to ask questions, solve
              problems and become increasingly independent.
            </p>

          </div>

          <div className={styles.introImage}>
            <img
              src={primaryLearning}
              alt="Primary learners at High Gate International Academy"
            />
          </div>

        </div>
      </section>


      {/* =========================
          PRIMARY GRADES
      ========================= */}

      <section className={styles.grades}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>

            <span className={styles.eyebrow}>
              PRIMARY GRADES
            </span>

            <h2>
              Growing Through Every Grade
            </h2>

            <p>
              Our Primary programme supports learners from
              Grade 1 through Grade 6, with learning experiences
              that develop progressively at every stage.
            </p>

          </div>


          <div className={styles.gradeGrid}>

            <div className={styles.gradeCard}>
              <span>01</span>
              <h3>Grade 1</h3>
              <p>
                Developing curiosity, confidence and strong
                foundations for learning.
              </p>
            </div>

            <div className={styles.gradeCard}>
              <span>02</span>
              <h3>Grade 2</h3>
              <p>
                Strengthening essential academic and
                communication skills.
              </p>
            </div>

            <div className={styles.gradeCard}>
              <span>03</span>
              <h3>Grade 3</h3>
              <p>
                Encouraging deeper understanding and
                independent thinking.
              </p>
            </div>

            <div className={styles.gradeCard}>
              <span>04</span>
              <h3>Grade 4</h3>
              <p>
                Developing knowledge, problem-solving and
                collaboration.
              </p>
            </div>

            <div className={styles.gradeCard}>
              <span>05</span>
              <h3>Grade 5</h3>
              <p>
                Building academic confidence and
                critical-thinking skills.
              </p>
            </div>

            <div className={styles.gradeCard}>
              <span>06</span>
              <h3>Grade 6</h3>
              <p>
                Preparing learners for the next stage of
                their educational journey.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CURRICULUM
      ========================= */}

      <section className={styles.curriculum}>
        <div className={styles.container}>

          <div className={styles.curriculumGrid}>

            <div className={styles.curriculumImage}>
              <img
                src={primary1}
                alt="Primary classroom learning"
              />
            </div>

            <div className={styles.curriculumContent}>

              <span className={styles.eyebrow}>
                OUR CURRICULUM
              </span>

              <h2>
                Learning That Develops
                the Whole Child
              </h2>

              <p>
                Our Primary learners follow a structured
                curriculum designed to build strong academic
                foundations while encouraging creativity,
                curiosity and independent thinking.
              </p>

              <p>
                Learning is supported through classroom
                instruction, practical activities, technology
                and opportunities for collaboration.
              </p>

              <Link
                to="/curriculum"
                className={styles.textLink}
              >
                Explore Our Curriculum →
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CORE SUBJECTS
      ========================= */}

      <section className={styles.subjects}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>

            <span className={styles.eyebrow}>
              CORE SUBJECTS
            </span>

            <h2>
              Knowledge That Builds Confidence
            </h2>

            <p>
              Learners develop knowledge and skills across
              key academic areas while building the confidence
              to apply what they learn.
            </p>

          </div>


          <div className={styles.subjectGrid}>

            <div className={styles.subjectCard}>
              <span>01</span>
              <h3>English</h3>
              <p>
                Developing reading, writing, communication
                and comprehension skills.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>02</span>
              <h3>Mathematics</h3>
              <p>
                Building numerical understanding,
                reasoning and problem-solving skills.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>03</span>
              <h3>Science</h3>
              <p>
                Encouraging observation, investigation
                and understanding of the world.
              </p>
            </div>

            <div className={styles.subjectCard}>
              <span>04</span>
              <h3>Languages</h3>
              <p>
                Supporting language development and
                effective communication.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CODING & ROBOTICS
      ========================= */}

      <section className={styles.coding}>
        <div className={styles.container}>

          <div className={styles.codingImage}>
            <img
              src={primaryCoding}
              alt="Primary learners participating in coding and robotics"
            />
          </div>

          <div className={styles.codingContent}>

            <span className={styles.eyebrow}>
              TECHNOLOGY & INNOVATION
            </span>

            <h2>
              Coding & Robotics
            </h2>

            <p>
              Technology is an important part of modern
              learning. Our learners are introduced to coding
              and robotics through practical and engaging
              experiences.
            </p>

            <p>
              These experiences encourage logical thinking,
              creativity, problem-solving and collaboration.
            </p>

            <div className={styles.codingFeatures}>

              <div>
                <strong>01</strong>
                <span>Problem Solving</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Logical Thinking</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Creativity</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Collaboration</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          SPORTS & EXTRACURRICULAR
      ========================= */}

      <section className={styles.sports}>
        <div className={styles.container}>

          <div className={styles.sportsHeader}>

            <div>
              <span className={styles.eyebrow}>
                BEYOND THE CLASSROOM
              </span>

              <h2>
                Sports & Extracurricular Activities
              </h2>
            </div>

            <p>
              Education extends beyond the classroom. Sports
              and extracurricular activities give learners
              opportunities to develop teamwork, discipline,
              creativity and confidence.
            </p>

          </div>


          <div className={styles.sportsGrid}>

            <div className={styles.sportsImage}>
              <img
                src={primarySports}
                alt="Primary learners participating in sports"
              />
            </div>

            <div className={styles.sportsCards}>

              <div className={styles.sportsCard}>
                <span>01</span>
                <h3>Sports</h3>
                <p>
                  Physical activities that encourage fitness,
                  teamwork and discipline.
                </p>
              </div>

              <div className={styles.sportsCard}>
                <span>02</span>
                <h3>Creative Activities</h3>
                <p>
                  Opportunities for learners to express their
                  creativity and discover new interests.
                </p>
              </div>

              <div className={styles.sportsCard}>
                <span>03</span>
                <h3>Clubs & Activities</h3>
                <p>
                  Experiences that encourage collaboration,
                  leadership and personal growth.
                </p>
              </div>

              <div className={styles.sportsCard}>
                <span>04</span>
                <h3>School Events</h3>
                <p>
                  Activities that bring learners together
                  and strengthen our school community.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          ASSESSMENT
      ========================= */}

      <section className={styles.assessment}>
        <div className={styles.container}>

          <div className={styles.assessmentContent}>

            <span className={styles.eyebrow}>
              ASSESSMENT
            </span>

            <h2>
              Supporting Progress
              Every Step of the Way
            </h2>

            <p>
              Assessment helps teachers understand each
              learner's progress, identify areas for support
              and provide appropriate challenges.
            </p>

            <p>
              We use assessment as part of the learning
              process, helping learners understand their
              progress and continue developing their skills.
            </p>

          </div>

          <div className={styles.assessmentImage}>
            <img
              src={primary2}
              alt="Primary learners in class"
            />
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
              Discover Primary School
            </h2>

          </div>


          <div className={styles.galleryGrid}>

            <div className={styles.galleryLarge}>
              <img
                src={primaryHero}
                alt="High Gate Primary School"
              />
            </div>

            <div>
              <img
                src={primary1}
                alt="Primary classroom"
              />
            </div>

            <div>
              <img
                src={primary2}
                alt="Primary learning"
              />
            </div>

            <div>
              <img
                src={primaryCoding}
                alt="Coding and robotics"
              />
            </div>

            <div>
              <img
                src={primarySports}
                alt="Primary sports"
              />
            </div>

            <div>
              <img
                src={primary3}
                alt="Primary learners"
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
            START THE JOURNEY
          </span>

          <h2>
            Give Your Child
            the Foundation to Thrive
          </h2>

          <p>
            Discover a learning environment where academic
            growth, creativity and confidence come together.
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

export default Primary;