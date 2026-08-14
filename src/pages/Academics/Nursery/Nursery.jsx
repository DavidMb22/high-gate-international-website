import styles from "./Nursery.module.css";

import nurseryHero from "../../../assets/images/programs/nursery/nursery-hero.JPG";
import nursery1 from "../../../assets/images/programs/nursery/nursery-1.JPG";
import nursery2 from "../../../assets/images/programs/nursery/nursery-2.JPG";
import nursery3 from "../../../assets/images/programs/nursery/nursery-3.JPG";
import nurseryActivities from "../../../assets/images/programs/nursery/nursery-activities.JPG";
import nurseryLearning from "../../../assets/images/programs/nursery/nursery-learning.JPG";

import { Link } from "react-router-dom";

function Nursery() {
  return (
    <main className={styles.page}>

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url("${nurseryHero}")`,
          }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>

              <span className={styles.eyebrow}>
                EARLY YEARS
              </span>

              <h1>Nursery</h1>

              <p>
                Building confidence, curiosity and a love
                for learning in every child.
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
              OUR NURSERY
            </span>

            <h2>
              A Strong Foundation
              for Lifelong Learning
            </h2>

            <p>
              Our Nursery provides a welcoming learning
              environment where children are encouraged to
              explore, communicate, create and develop their
              growing independence.
            </p>

            <p>
              Through age-appropriate learning experiences,
              children build confidence while developing the
              skills they need for the next stage of their
              educational journey.
            </p>

          </div>

          <div className={styles.introImage}>
            <img
              src={nurseryLearning}
              alt="Nursery learners at High Gate International Academy"
            />
          </div>

        </div>
      </section>


      {/* =========================
          NURSERY LEVELS
      ========================= */}

      <section className={styles.levels}>
  <div className={styles.container}>

    <div className={styles.sectionIntro}>
      <span className={styles.eyebrow}>
        NURSERY LEVELS
      </span>

      <h2>
        Learning at Every Stage
      </h2>

      <p>
        Our Nursery programme is structured to support
        children's development progressively as they
        grow in confidence, independence and ability.
      </p>
    </div>

    <div className={styles.levelGrid}>

      <div className={styles.levelCard}>
        <span>01</span>
        <h3>Nursery 1</h3>
        <p>
          A welcoming environment where children begin
          developing confidence, communication and
          independence.
        </p>
      </div>

      <div className={styles.levelCard}>
        <span>02</span>
        <h3>Nursery 2</h3>
        <p>
          Children continue developing their communication,
          creativity and social skills through engaging
          learning experiences.
        </p>
      </div>

      <div className={styles.levelCard}>
        <span>03</span>
        <h3>Nursery 3</h3>
        <p>
          Learners strengthen their skills and confidence
          as they prepare for the next stage of learning.
        </p>
      </div>

    </div>

  </div>
</section>


      {/* =========================
          LEARNING APPROACH
      ========================= */}

      <section className={styles.approach}>
        <div className={styles.container}>

          <div className={styles.approachGrid}>

            <div className={styles.approachImage}>
              <img
                src={nursery1}
                alt="Nursery learning activity"
              />
            </div>

            <div className={styles.approachContent}>

              <span className={styles.eyebrow}>
                LEARNING APPROACH
              </span>

              <h2>
                Learning Through
                Exploration and Creativity
              </h2>

              <p>
                Children learn best when they are actively
                involved in meaningful experiences. Our approach
                encourages curiosity, participation and discovery.
              </p>

              <div className={styles.featureList}>

                <div>
                  <strong>01</strong>
                  <span>Curiosity & Discovery</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Communication</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Creative Expression</span>
                </div>

                <div>
                  <strong>04</strong>
                  <span>Growing Independence</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FRENCH + CANADIAN
      ========================= */}

      <section className={styles.international}>
        <div className={styles.container}>

          <div className={styles.internationalContent}>

            <span className={styles.eyebrow}>
              OUR EDUCATIONAL APPROACH
            </span>

            <h2>
              Learning in French,
              Growing Through the
              Canadian Education System
            </h2>

            <p>
              At Nursery, children learn in French while
              following the Canadian Education System,
              creating an engaging environment that supports
              their academic and personal development.
            </p>

            <p>
              This approach gives learners opportunities to
              develop their language, communication and
              learning skills from an early age.
            </p>

          </div>

          <div className={styles.internationalImage}>
            <img
              src={nursery2}
              alt="Nursery learners"
            />
          </div>

        </div>
      </section>


      {/* =========================
          CREATIVE ACTIVITIES
      ========================= */}

      <section className={styles.activities}>
        <div className={styles.container}>

          <div className={styles.activitiesHeader}>

            <div>
              <span className={styles.eyebrow}>
                CREATIVE LEARNING
              </span>

              <h2>
                Learning Beyond the Classroom
              </h2>
            </div>

            <p>
              Creative experiences give children opportunities
              to express themselves, experiment and discover
              new interests.
            </p>

          </div>


          <div className={styles.activitiesLayout}>

            <div className={styles.activitiesImage}>
              <img
                src={nurseryActivities}
                alt="Creative activities at High Gate"
              />
            </div>

            <div className={styles.activityCards}>

              <div className={styles.activityCard}>
                <span>01</span>
                <h3>Arts & Crafts</h3>
                <p>
                  Encouraging creativity, imagination and
                  self-expression.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>02</span>
                <h3>Music & Movement</h3>
                <p>
                  Opportunities to explore rhythm, movement
                  and creative expression.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>03</span>
                <h3>Storytelling</h3>
                <p>
                  Supporting communication, listening and
                  imagination through stories.
                </p>
              </div>

              <div className={styles.activityCard}>
                <span>04</span>
                <h3>Creative Play</h3>
                <p>
                  Play experiences that encourage discovery
                  and problem-solving.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          SOCIAL & EMOTIONAL
      ========================= */}

      <section className={styles.development}>
        <div className={styles.container}>

          <div className={styles.developmentContent}>

            <span className={styles.eyebrow}>
              WHOLE-CHILD DEVELOPMENT
            </span>

            <h2>
              Growing in Confidence
              and Connection
            </h2>

            <p>
              Nursery is also an important stage for children's
              social and emotional development. We encourage
              learners to communicate, cooperate and build
              positive relationships.
            </p>

            <div className={styles.developmentGrid}>

              <div>
                <strong>01</strong>
                <h3>Confidence</h3>
              </div>

              <div>
                <strong>02</strong>
                <h3>Communication</h3>
              </div>

              <div>
                <strong>03</strong>
                <h3>Collaboration</h3>
              </div>

              <div>
                <strong>04</strong>
                <h3>Independence</h3>
              </div>

              <div>
                <strong>05</strong>
                <h3>Respect</h3>
              </div>

              <div>
                <strong>06</strong>
                <h3>Emotional Awareness</h3>
              </div>

            </div>

          </div>

          <div className={styles.developmentImage}>
            <img
              src={nursery3}
              alt="Nursery children learning together"
            />
          </div>

        </div>
      </section>


      {/* =========================
          PHOTO GALLERY
      ========================= */}

      <section className={styles.gallery}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>
              LIFE AT HIGH GATE
            </span>

            <h2>
              Discover Our Nursery
            </h2>
          </div>


          <div className={styles.galleryGrid}>

            <div className={styles.galleryLarge}>
              <img
                src={nurseryHero}
                alt="High Gate Nursery"
              />
            </div>

            <div>
              <img
                src={nursery1}
                alt="Nursery classroom"
              />
            </div>

            <div>
              <img
                src={nursery2}
                alt="Nursery learning"
              />
            </div>

            <div>
              <img
                src={nurseryActivities}
                alt="Nursery activities"
              />
            </div>

            <div>
              <img
                src={nursery3}
                alt="Nursery learners"
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
            START THEIR JOURNEY
          </span>

          <h2>
            Give Your Child
            a Strong Foundation
          </h2>

          <p>
            Discover a learning environment where children
            are encouraged to grow, explore and thrive.
          </p>

          <Link
            to="/admissions"
            className={styles.ctaButton}
          >
            Apply Now
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Nursery;