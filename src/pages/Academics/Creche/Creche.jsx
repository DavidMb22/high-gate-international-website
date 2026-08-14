import styles from "./Creche.module.css";

import crecheImage from "../../../assets/images/programs/creche.JPG";

import { Link } from "react-router-dom";

function Creche() {
  return (
    <main className={styles.page}>

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url("${crecheImage}")`,
          }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>

              <p className={styles.eyebrow}>
                EARLY YEARS
              </p>

              <h1>Creche</h1>

              <p className={styles.heroText}>
                A safe, nurturing and stimulating environment
                where young children take their first steps
                toward learning and discovery.
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

            <div className={styles.sectionHeading}>
              <span>01</span>
              <h2>A Caring Start to Learning</h2>
            </div>

            <p>
              Our Crèche provides a warm, safe and stimulating
              environment where young children can thrive from
              their earliest years.
            </p>

            <p>
              Learning takes place through playful, sensory and
              interactive experiences that support each child's
              emotional, physical, cognitive and social development.
            </p>

            <p>
              Our caring educators accompany children as they
              develop independence, communication skills and
              curiosity about the world around them.
            </p>

          </div>

          <div className={styles.introImage}>
            <img
              src={crecheImage}
              alt="Children at High Gate International Academy Crèche"
            />
          </div>

        </div>
      </section>


      {/* =========================
          AGE GROUP
      ========================= */}

      <section className={styles.ageSection}>
        <div className={styles.container}>

          <div className={styles.ageCard}>

            <div className={styles.ageNumber}>
              16
            </div>

            <div>
              <span className={styles.ageLabel}>
                MONTHS
              </span>

              <h2>First Steps</h2>

              <p>
                Our Crèche welcomes young children from
                approximately 16 months to 2 years old.
              </p>
            </div>

          </div>

          <div className={styles.ageText}>

            <p className={styles.eyebrow}>
              AGE GROUP
            </p>

            <h2>
              A gentle beginning to their educational journey.
            </h2>

            <p>
              At this stage, children are discovering themselves,
              their environment and the people around them.
              Our approach gives them the security and encouragement
              they need to explore with confidence.
            </p>

          </div>

        </div>
      </section>


      {/* =========================
          LEARNING APPROACH
      ========================= */}

      <section className={styles.approach}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>
              OUR APPROACH
            </span>

            <h2>
              Learning Through Play,
              Exploration and Discovery
            </h2>

            <p>
              Every experience is designed to make learning
              meaningful, enjoyable and appropriate for the
              child's stage of development.
            </p>
          </div>


          <div className={styles.approachGrid}>

            <div className={styles.approachCard}>
              <span>01</span>
              <h3>Play-Based Learning</h3>
              <p>
                Children discover new concepts naturally through
                play, exploration and guided experiences.
              </p>
            </div>

            <div className={styles.approachCard}>
              <span>02</span>
              <h3>Sensory Exploration</h3>
              <p>
                Sensory experiences encourage children to observe,
                experiment and understand the world around them.
              </p>
            </div>

            <div className={styles.approachCard}>
              <span>03</span>
              <h3>Emotional Support</h3>
              <p>
                A caring environment helps children feel secure,
                express themselves and develop confidence.
              </p>
            </div>

            <div className={styles.approachCard}>
              <span>04</span>
              <h3>Social Development</h3>
              <p>
                Children begin developing communication,
                cooperation and positive relationships with others.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          ACTIVITIES
      ========================= */}

      <section className={styles.activities}>
        <div className={styles.container}>

          <div className={styles.activitiesHeader}>

            <div>
              <span className={styles.eyebrow}>
                DAILY EXPERIENCES
              </span>

              <h2>
                Activities That Inspire Young Minds
              </h2>
            </div>

            <p>
              Our activities encourage children to explore,
              express themselves and develop new skills in
              a joyful learning environment.
            </p>

          </div>


          <div className={styles.activitiesGrid}>

            <div className={styles.activityCard}>
              <h3>Creative Play</h3>
              <p>
                Opportunities for imagination, expression
                and discovery.
              </p>
            </div>

            <div className={styles.activityCard}>
              <h3>Sensory Activities</h3>
              <p>
                Hands-on experiences that stimulate
                curiosity and development.
              </p>
            </div>

            <div className={styles.activityCard}>
              <h3>Music & Movement</h3>
              <p>
                Songs, movement and rhythm help children
                express themselves and build coordination.
              </p>
            </div>

            <div className={styles.activityCard}>
              <h3>Storytelling</h3>
              <p>
                Stories and conversations encourage early
                communication and listening skills.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          WHAT CHILDREN DEVELOP
      ========================= */}

      <section className={styles.development}>
        <div className={styles.container}>

          <div className={styles.developmentImage}>
            <img
              src={crecheImage}
              alt="High Gate Crèche learning environment"
            />
          </div>

          <div className={styles.developmentContent}>

            <span className={styles.eyebrow}>
              GROWING TOGETHER
            </span>

            <h2>
              Building the Foundations for Life
            </h2>

            <p>
              Our Crèche experiences are designed to support
              the whole child, helping them grow academically,
              emotionally, physically and socially.
            </p>


            <div className={styles.developmentList}>

              <div>
                <strong>01</strong>
                <span>Communication</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Confidence</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Independence</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Social Skills</span>
              </div>

              <div>
                <strong>05</strong>
                <span>Motor Skills</span>
              </div>

              <div>
                <strong>06</strong>
                <span>Curiosity</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FACILITIES
      ========================= */}

      <section className={styles.facilities}>
        <div className={styles.container}>

          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>
              OUR ENVIRONMENT
            </span>

            <h2>
              A Space Designed for Young Learners
            </h2>

            <p>
              Our facilities provide children with a secure,
              clean and welcoming environment where they can
              learn, play and grow.
            </p>
          </div>


          <div className={styles.facilitiesGrid}>

            <div className={styles.facilityCard}>
              <h3>Safe Learning Spaces</h3>
              <p>
                Welcoming spaces designed around the needs
                of young children.
              </p>
            </div>

            <div className={styles.facilityCard}>
              <h3>Play & Exploration</h3>
              <p>
                Spaces that encourage movement, discovery
                and active learning.
              </p>
            </div>

            <div className={styles.facilityCard}>
              <h3>Caring Environment</h3>
              <p>
                A supportive atmosphere where every child
                is encouraged to feel secure and valued.
              </p>
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
            a Caring Start
          </h2>

          <p>
            Discover an environment where your child can
            learn, explore, grow and thrive.
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

export default Creche;