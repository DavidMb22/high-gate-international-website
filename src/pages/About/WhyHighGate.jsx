import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  Languages,
  Cpu,
  Trophy,
  Heart,
} from "lucide-react";

import styles from "./WhyHighGate.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import aboutMain from "../../assets/images/about/about-main.JPG";
import aboutSmall1 from "../../assets/images/about/about-small-1.JPG";
import aboutSmall2 from "../../assets/images/about/about-small-2.JPG";
import aboutSmall3 from "../../assets/images/about/about-small-3.JPG";


function WhyImage({ src, alt, className = "" }) {

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


function WhyHighGate() {

  const reasons = [
    {
      icon: Globe2,
      title: "International Education",
      text:
        "Our learning environment prepares students to understand, participate in and contribute to an increasingly connected world.",
    },

    {
      icon: BookOpen,
      title: "Cambridge & Canadian Education",
      text:
        "We bring together internationally recognised educational approaches to provide students with a broad and engaging learning experience.",
    },

    {
      icon: Languages,
      title: "French & English",
      text:
        "Our bilingual environment gives learners opportunities to develop confidence communicating across languages and cultures.",
    },

    {
      icon: Cpu,
      title: "Technology & Innovation",
      text:
        "Coding, robotics and technology help students develop creativity, problem-solving skills and confidence with the tools of tomorrow.",
    },

    {
      icon: Trophy,
      title: "Beyond the Classroom",
      text:
        "Sports, arts, music and other activities help students discover their talents and develop teamwork, discipline and confidence.",
    },

    {
      icon: Heart,
      title: "A Caring Community",
      text:
        "We strive to create a welcoming environment where students are known, supported and encouraged to become their best selves.",
    },
  ];


  return (
    <>
      <Navbar />

      <main>

        {/* ==================================================
            HERO
        ================================================== */}

        <section className={styles.pageHero}>

          <div className={styles.heroContent}>

            <span>
              THE HIGH GATE EXPERIENCE
            </span>

            <h1>
              Why High Gate?
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
                Why High Gate
              </span>

            </div>

          </div>

        </section>


        {/* ==================================================
            INTRO
        ================================================== */}

        <section className={styles.introduction}>

          <div className={styles.container}>

            <div className={styles.introImage}>

              <WhyImage
                src={aboutMain}
                alt="High Gate International Academy"
              />

            </div>


            <div className={styles.introContent}>

              <span className={styles.sectionLabel}>
                MORE THAN A SCHOOL
              </span>

              <h2>
                A place where
                <span> curiosity becomes confidence.</span>
              </h2>

              <p>
                Choosing a school is about more than academics.
                It is about finding a community where children
                feel safe, inspired and encouraged to discover
                who they can become.
              </p>

              <p>
                At High Gate International Academy, we combine
                strong academic foundations with opportunities
                for creativity, technology, languages, sports
                and personal development.
              </p>

              <Link
                to="/admissions"
                className={styles.primaryButton}
              >
                Explore Admissions

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            REASONS
        ================================================== */}

        <section className={styles.reasons}>

          <div className={styles.container}>

            <div className={styles.heading}>

              <span className={styles.sectionLabel}>
                WHAT SETS US APART
              </span>

              <h2>
                Why families choose
                <span> High Gate.</span>
              </h2>

              <p>
                We bring together academic excellence,
                international perspectives and a strong
                sense of community.
              </p>

            </div>


            <div className={styles.reasonGrid}>

              {reasons.map((reason) => {

                const Icon = reason.icon;

                return (

                  <article
                    key={reason.title}
                    className={styles.reasonCard}
                  >

                    <div className={styles.icon}>
                      <Icon size={25} />
                    </div>

                    <h3>
                      {reason.title}
                    </h3>

                    <p>
                      {reason.text}
                    </p>

                  </article>

                );

              })}

            </div>

          </div>

        </section>


        {/* ==================================================
            LEARNING EXPERIENCE
        ================================================== */}

        <section className={styles.experience}>

          <div className={styles.container}>

            <div className={styles.experienceContent}>

              <span className={styles.sectionLabel}>
                THE LEARNING EXPERIENCE
              </span>

              <h2>
                Learning doesn't stop
                <span> at the classroom door.</span>
              </h2>

              <p>
                We believe students learn best when they can
                explore their interests, collaborate with others
                and apply what they learn in meaningful ways.
              </p>


              <div className={styles.experienceList}>

                <div>
                  <strong>01</strong>

                  <span>
                    Academic development
                  </span>
                </div>

                <div>
                  <strong>02</strong>

                  <span>
                    Creativity & the arts
                  </span>
                </div>

                <div>
                  <strong>03</strong>

                  <span>
                    Coding & robotics
                  </span>
                </div>

                <div>
                  <strong>04</strong>

                  <span>
                    Sports & teamwork
                  </span>
                </div>

              </div>

            </div>


            <div className={styles.experienceImages}>

              <WhyImage
                src={aboutSmall1}
                alt="High Gate students"
                className={styles.imageOne}
              />

              <WhyImage
                src={aboutSmall2}
                alt="High Gate learning environment"
                className={styles.imageTwo}
              />

              <WhyImage
                src={aboutSmall3}
                alt="High Gate school activities"
                className={styles.imageThree}
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            COMMUNITY
        ================================================== */}

        <section className={styles.community}>

          <div className={styles.communityContent}>

            <span>
              OUR COMMUNITY
            </span>

            <h2>
              Growing together.
            </h2>

            <p>
              Students, teachers and families are all part
              of the High Gate community. Together, we create
              an environment where learners are encouraged to
              participate, contribute and thrive.
            </p>

            <Link
              to="/school-events"
              className={styles.communityButton}
            >
              Discover School Life

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>


        {/* ==================================================
            CTA
        ================================================== */}

        <section className={styles.cta}>

          <div className={styles.ctaContent}>

            <span>
              READY TO DISCOVER HIGH GATE?
            </span>

            <h2>
              Your child's journey
              <br />
              can start here.
            </h2>

            <Link
              to="/admissions"
              className={styles.ctaButton}
            >
              Start Your Application

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


export default WhyHighGate;