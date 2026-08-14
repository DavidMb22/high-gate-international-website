import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Star,
} from "lucide-react";

import styles from "./VisionMission.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import aboutSmall1 from "../../assets/images/about/about-small-1.JPG";
import aboutSmall2 from "../../assets/images/about/about-small-2.JPG";


function VisionImage({ src, alt, className = "" }) {

  const loaded = useImageLoader(src);

  return (
    <div className={`${styles.imageWrapper} ${className}`}>

      {!loaded && (
        <Skeleton className={styles.imageSkeleton} />
      )}

      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${
          loaded ? styles.imageLoaded : ""
        }`}
      />

    </div>
  );
}


function VisionMission() {

  const values = [
    {
      icon: Star,
      title: "Excellence",
      text:
        "We encourage every learner to pursue high standards and take pride in their growth and achievements.",
    },

    {
      icon: HeartHandshake,
      title: "Integrity",
      text:
        "We nurture honesty, respect, responsibility and compassion in everything we do.",
    },

    {
      icon: Lightbulb,
      title: "Curiosity",
      text:
        "We inspire students to ask questions, explore ideas and become lifelong learners.",
    },

    {
      icon: BookOpen,
      title: "Community",
      text:
        "We believe education is strengthened by a caring community of students, families and educators.",
    },
  ];


  return (
    <>
      <Navbar />

      <main>

        {/* ==================================================
            PAGE HERO
        ================================================== */}

        <section className={styles.pageHero}>

          <div className={styles.heroContent}>

            <span>
              ABOUT HIGH GATE
            </span>

            <h1>
              Our Vision & Mission
            </h1>

            <div className={styles.breadcrumb}>

              <Link to="/">
                Home
              </Link>

              <span>/</span>

              <Link to="/who-we-are">
                About Us
              </Link>

              <span>/</span>

              <span>
                Vision & Mission
              </span>

            </div>

          </div>

        </section>


        {/* ==================================================
            MISSION
        ================================================== */}

        <section className={styles.mission}>

          <div className={styles.container}>

            <div className={styles.missionImage}>

              <VisionImage
                src={aboutSmall1}
                alt="High Gate students learning together"
              />

              <div className={styles.imageBadge}>

                <span>
                  OUR MISSION
                </span>

                <strong>
                  Inspiring lifelong learners
                </strong>

              </div>

            </div>


            <div className={styles.content}>

              <span className={styles.sectionLabel}>
                OUR MISSION
              </span>

              <h2>
                Creating principled
                <span> lifelong learners.</span>
              </h2>

              <p>
                High Gate International Academy creates
                principled lifelong learners equipped with
                the knowledge and skills to excel.
              </p>

              <p>
                Our mission guides the way we teach, support
                and challenge our students. We want every
                learner to develop academically while also
                becoming confident, responsible and caring
                members of their community.
              </p>

              <div className={styles.quote}>
                <span>“</span>

                <p>
                  Education should develop not only what
                  students know, but also who they become.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            VISION
        ================================================== */}

        <section className={styles.vision}>

          <div className={styles.container}>

            <div className={styles.content}>

              <span className={styles.sectionLabel}>
                OUR VISION
              </span>

              <h2>
                Preparing learners for
                <span> a changing world.</span>
              </h2>

              <p>
                A High Gate student shall be an inquisitive
                and knowledgeable thinker, concerned about
                others, Rwanda and the environment.
              </p>

              <p>
                We envision students who are confident enough
                to express their ideas, curious enough to keep
                learning and compassionate enough to use their
                knowledge to make a positive difference.
              </p>

              <div className={styles.visionPoints}>

                <div>
                  <strong>
                    Curious
                  </strong>

                  <span>
                    Always asking, exploring and discovering.
                  </span>
                </div>

                <div>
                  <strong>
                    Knowledgeable
                  </strong>

                  <span>
                    Equipped with strong academic foundations.
                  </span>
                </div>

                <div>
                  <strong>
                    Responsible
                  </strong>

                  <span>
                    Concerned about people, Rwanda and the world.
                  </span>
                </div>

              </div>

            </div>


            <div className={styles.visionImage}>

              <VisionImage
                src={aboutSmall2}
                alt="High Gate students"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            CORE VALUES
        ================================================== */}

        <section className={styles.values}>

          <div className={styles.container}>

            <div className={styles.heading}>

              <span className={styles.sectionLabel}>
                WHAT GUIDES US
              </span>

              <h2>
                Our Core Values
              </h2>

              <p>
                Our values shape the culture of High Gate
                and influence how we learn, teach and interact
                with one another.
              </p>

            </div>


            <div className={styles.valueGrid}>

              {values.map((value) => {

                const Icon = value.icon;

                return (

                  <article
                    key={value.title}
                    className={styles.valueCard}
                  >

                    <div className={styles.icon}>
                      <Icon size={25} />
                    </div>

                    <h3>
                      {value.title}
                    </h3>

                    <p>
                      {value.text}
                    </p>

                  </article>

                );

              })}

            </div>

          </div>

        </section>


        {/* ==================================================
            BELIEF
        ================================================== */}

        <section className={styles.belief}>

          <div className={styles.beliefContent}>

            <span>
              OUR BELIEF
            </span>

            <h2>
              Every child deserves
              <br />
              the opportunity to thrive.
            </h2>

            <p>
              At High Gate, we create an environment where
              learners can discover their strengths, develop
              confidence and build the skills they need for
              their future.
            </p>

            <Link
              to="/who-we-are"
              className={styles.button}
            >
              Discover Who We Are

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default VisionMission;