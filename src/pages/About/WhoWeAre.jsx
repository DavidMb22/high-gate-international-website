import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

import styles from "./WhoWeAre.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import aboutMain from "../../assets/images/about/about-main.JPG";
import aboutSmall1 from "../../assets/images/about/about-small-1.JPG";
import aboutSmall2 from "../../assets/images/about/about-small-2.JPG";


function AboutImage({ src, alt, className = "" }) {

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


function WhoWeAre() {

  return (
    <>
      <Navbar />

      <main>

        {/* ==================================================
            PAGE HERO
        ================================================== */}

        <section className={styles.pageHero}>

          <div className={styles.pageHeroOverlay}>

            <p>ABOUT HIGH GATE</p>

            <h1>
              Who We Are
            </h1>

            <div className={styles.breadcrumb}>

              <Link to="/">
                Home
              </Link>

              <span>/</span>

              <span>
                Who We Are
              </span>

            </div>

          </div>

        </section>


        {/* ==================================================
            INTRODUCTION
        ================================================== */}

        <section className={styles.introduction}>

          <div className={styles.container}>

            <div className={styles.introImage}>

              <AboutImage
                src={aboutMain}
                alt="High Gate International Academy campus"
              />

            </div>


            <div className={styles.introContent}>

              <span className={styles.sectionLabel}>
                WELCOME TO HIGH GATE
              </span>

              <h2>
                Inspiring Excellence,
                <span> Embracing Diversity</span>
              </h2>

              <p>
                High Gate International Academy is a modern school
                located in Kigali, Rwanda, dedicated to providing
                high-quality education in a nurturing, inclusive and
                joyful environment.
              </p>

              <p>
                Our approach brings together the Cambridge
                International curriculum and the Canadian Education
                System, creating an international learning experience
                that develops confident, curious and responsible
                learners.
              </p>

              <p>
                We believe every child has the potential to grow,
                discover their strengths and make a meaningful
                contribution to the world around them.
              </p>


              <Link
                to="/our-curriculum"
                className={styles.primaryButton}
              >
                Discover Our Curriculum

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            OUR APPROACH
        ================================================== */}

        <section className={styles.approach}>

          <div className={styles.container}>

            <div className={styles.approachContent}>

              <span className={styles.sectionLabel}>
                OUR APPROACH
              </span>

              <h2>
                Learning that prepares
                <span> children for tomorrow.</span>
              </h2>

              <p>
                At High Gate, education goes beyond the classroom.
                We create learning experiences that encourage
                curiosity, critical thinking, creativity and
                collaboration.
              </p>

              <div className={styles.features}>

                <div className={styles.feature}>

                  <CheckCircle size={21} />

                  <div>
                    <h3>
                      Quality Education
                    </h3>

                    <p>
                      High academic standards combined with
                      engaging and learner-centered teaching.
                    </p>
                  </div>

                </div>


                <div className={styles.feature}>

                  <CheckCircle size={21} />

                  <div>
                    <h3>
                      Inclusive Community
                    </h3>

                    <p>
                      A safe and welcoming environment where
                      every learner is valued and supported.
                    </p>
                  </div>

                </div>


                <div className={styles.feature}>

                  <CheckCircle size={21} />

                  <div>
                    <h3>
                      Global Mindset
                    </h3>

                    <p>
                      Multilingual and international learning
                      experiences that prepare students for a
                      connected world.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            <div className={styles.approachImages}>

              <AboutImage
                src={aboutSmall1}
                alt="High Gate students learning"
                className={styles.smallImage}
              />

              <AboutImage
                src={aboutSmall2}
                alt="High Gate school life"
                className={styles.largeImage}
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            MISSION & VISION
        ================================================== */}

        <section className={styles.missionVision}>

          <div className={styles.container}>

            <div className={styles.sectionHeading}>

              <span className={styles.sectionLabel}>
                WHAT GUIDES US
              </span>

              <h2>
                Our Mission & Vision
              </h2>

              <p>
                Everything we do is centered around helping
                learners become confident, principled and
                knowledgeable individuals.
              </p>

            </div>


            <div className={styles.cards}>

              <article className={styles.infoCard}>

                <div className={styles.cardNumber}>
                  01
                </div>

                <h3>
                  Our Mission
                </h3>

                <p>
                  High Gate International Academy creates
                  principled lifelong learners equipped with
                  the knowledge and skills to excel.
                </p>

              </article>


              <article className={styles.infoCard}>

                <div className={styles.cardNumber}>
                  02
                </div>

                <h3>
                  Our Vision
                </h3>

                <p>
                  A High Gate student shall be an inquisitive
                  and knowledgeable thinker, concerned about
                  others, Rwanda and the environment.
                </p>

              </article>

            </div>

          </div>

        </section>


        {/* ==================================================
            CTA
        ================================================== */}

        <section className={styles.cta}>

          <div className={styles.ctaContent}>

            <span>
              DISCOVER THE HIGH GATE EXPERIENCE
            </span>

            <h2>
              Give your child a place
              <br />
              to learn, grow and thrive.
            </h2>

            <Link
              to="/admissions"
              className={styles.ctaButton}
            >
              Explore Admissions

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default WhoWeAre;