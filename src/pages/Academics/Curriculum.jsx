import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  Languages,
  Lightbulb,
  Monitor,
  Users,
} from "lucide-react";

import styles from "./Curriculum.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import aboutMain from "../../assets/images/about/about-main.JPG";
import aboutSmall1 from "../../assets/images/about/about-small-1.JPG";
import aboutSmall2 from "../../assets/images/about/about-small-2.JPG";


function CurriculumImage({ src, alt, className = "" }) {
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


function Curriculum() {

  const learningPrinciples = [
    {
      icon: BookOpen,
      title: "Strong Foundations",
      text:
        "We build strong academic foundations while encouraging students to develop confidence in their learning.",
    },

    {
      icon: Globe2,
      title: "International Perspective",
      text:
        "Our international approach encourages learners to understand different cultures, ideas and perspectives.",
    },

    {
      icon: Languages,
      title: "Language Development",
      text:
        "Students develop communication skills in English and French as part of their learning journey.",
    },

    {
      icon: Lightbulb,
      title: "Critical Thinking",
      text:
        "We encourage students to question, investigate, solve problems and develop independent thinking.",
    },

    {
      icon: Monitor,
      title: "Technology",
      text:
        "Technology, coding and robotics give students opportunities to explore innovation and digital skills.",
    },

    {
      icon: Users,
      title: "Collaboration",
      text:
        "Students learn to communicate, cooperate and contribute through collaborative learning experiences.",
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
              ACADEMICS
            </span>

            <h1>
              Our Curriculum
            </h1>

            <div className={styles.breadcrumb}>

              <Link to="/">
                Home
              </Link>

              <span>/</span>

              <span>
                Academics
              </span>

              <span>/</span>

              <span>
                Our Curriculum
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

              <CurriculumImage
                src={aboutMain}
                alt="Students learning at High Gate International Academy"
              />

            </div>


            <div className={styles.introContent}>

              <span className={styles.sectionLabel}>
                LEARNING AT HIGH GATE
              </span>

              <h2>
                Preparing students for
                <span> the world ahead.</span>
              </h2>

              <p>
                At High Gate International Academy, we believe
                education should give students more than
                knowledge. It should help them become curious,
                confident and capable learners.
              </p>

              <p>
                Our academic approach combines strong
                foundations with opportunities to explore,
                question, create and collaborate.
              </p>

              <Link
                to="/admissions"
                className={styles.button}
              >
                Explore Admissions
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            EDUCATIONAL SYSTEMS
        ================================================== */}

        <section className={styles.educationalSystems}>

        <div className={styles.container}>

            <div className={styles.heading}>

            <span className={styles.sectionLabel}>
                OUR EDUCATIONAL SYSTEMS
            </span>

            <h2>
                Two perspectives.
                <span> One complete education.</span>
            </h2>

            <p>
                High Gate International Academy combines the
                Canadian Education System with Cambridge Assessment
                International Education to provide students with a
                broad, engaging and internationally minded education.
            </p>

            </div>


            <div className={styles.systemGrid}>

            {/* CANADIAN EDUCATION */}

            <article className={styles.systemCard}>

                <div className={styles.systemIcon}>
                <Globe2 size={30} />
                </div>

                <span className={styles.systemLabel}>
                CANADIAN EDUCATION
                </span>

                <h3>
                Canadian Education System
                </h3>

                <p>
                Our Canadian educational approach supports a
                student-centred learning environment that encourages
                inquiry, collaboration, creativity and the development
                of practical skills.
                </p>

                <div className={styles.systemFeatures}>

                <span>
                    ✓ Student-centred learning
                </span>

                <span>
                    ✓ Inquiry and exploration
                </span>

                <span>
                    ✓ Collaboration and creativity
                </span>

                </div>

            </article>


            {/* CAMBRIDGE */}

            <article className={styles.systemCard}>

                <div className={styles.systemIcon}>
                <BookOpen size={30} />
                </div>

                <span className={styles.systemLabel}>
                CAMBRIDGE EDUCATION
                </span>

                <h3>
                Cambridge Assessment International Education
                </h3>

                <p>
                Our Cambridge pathway provides an internationally
                recognised framework that challenges students to
                think critically, apply their knowledge and prepare
                confidently for further education and future
                opportunities.
                </p>

                <div className={styles.systemFeatures}>

                <span>
                    ✓ Internationally recognised education
                </span>

                <span>
                    ✓ Critical thinking
                </span>

                <span>
                    ✓ Strong academic preparation
                </span>

                </div>

            </article>

            </div>

        </div>

        </section>

        {/* ==================================================
            PROGRAMMES
        ================================================== */}

        <section className={styles.programmes}>

          <div className={styles.container}>

            <div className={styles.heading}>

              <span className={styles.sectionLabel}>
                OUR ACADEMIC JOURNEY
              </span>

              <h2>
                Learning at every stage.
              </h2>

              <p>
                From the early years through secondary school,
                students are supported through age-appropriate
                learning experiences designed to help them grow.
              </p>

            </div>


            <div className={styles.programmeGrid}>

              <Link
                to="/academics/early-years"
                className={styles.programmeCard}
              >

                <div className={styles.cardImage}>

                  <CurriculumImage
                    src={aboutSmall1}
                    alt="Early Years students"
                  />

                </div>

                <div className={styles.cardContent}>

                  <span>
                    EARLY YEARS
                  </span>

                  <h3>
                    Early Years
                  </h3>

                  <p>
                    Building curiosity, confidence and
                    foundational skills through engaging
                    early learning experiences.
                  </p>

                  <strong>
                    Explore Early Years
                    <ArrowRight size={16} />
                  </strong>

                </div>

              </Link>


              <Link
                to="/academics/primary"
                className={styles.programmeCard}
              >

                <div className={styles.cardImage}>

                  <CurriculumImage
                    src={aboutSmall2}
                    alt="Primary students"
                  />

                </div>

                <div className={styles.cardContent}>

                  <span>
                    PRIMARY SCHOOL
                  </span>

                  <h3>
                    Primary School
                  </h3>

                  <p>
                    Developing strong academic foundations,
                    independence and a love for learning.
                  </p>

                  <strong>
                    Explore Primary
                    <ArrowRight size={16} />
                  </strong>

                </div>

              </Link>


              <Link
                to="/academics/secondary"
                className={styles.programmeCard}
              >

                <div className={styles.cardImage}>

                  <CurriculumImage
                    src={aboutMain}
                    alt="Secondary students"
                  />

                </div>

                <div className={styles.cardContent}>

                  <span>
                    SECONDARY SCHOOL
                  </span>

                  <h3>
                    Secondary School
                  </h3>

                  <p>
                    Preparing learners with the knowledge,
                    skills and confidence for their next stage.
                  </p>

                  <strong>
                    Explore Secondary
                    <ArrowRight size={16} />
                  </strong>

                </div>

              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            LEARNING PRINCIPLES
        ================================================== */}

        <section className={styles.principles}>

          <div className={styles.container}>

            <div className={styles.heading}>

              <span className={styles.sectionLabel}>
                HOW WE LEARN
              </span>

              <h2>
                More than academic results.
              </h2>

              <p>
                We want students to leave High Gate with the
                knowledge, habits and attitudes that help them
                continue learning throughout life.
              </p>

            </div>


            <div className={styles.principleGrid}>

              {learningPrinciples.map((principle) => {

                const Icon = principle.icon;

                return (
                  <article
                    key={principle.title}
                    className={styles.principleCard}
                  >

                    <div className={styles.icon}>
                      <Icon size={24} />
                    </div>

                    <h3>
                      {principle.title}
                    </h3>

                    <p>
                      {principle.text}
                    </p>

                  </article>
                );

              })}

            </div>

          </div>

        </section>


        {/* ==================================================
            INTERNATIONAL EDUCATION
        ================================================== */}

        <section className={styles.international}>

          <div className={styles.container}>

            <div className={styles.internationalContent}>

              <span className={styles.sectionLabel}>
                INTERNATIONAL EDUCATION
              </span>

              <h2>
                Preparing learners for
                <span> a global future.</span>
              </h2>

              <p>
                Our educational environment exposes students
                to international perspectives while remaining
                connected to their community and context.
              </p>

              <div className={styles.internationalPoints}>

                <div>
                  <strong>01</strong>
                  <span>
                    Internationally minded learners
                  </span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>
                    Strong academic foundations
                  </span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>
                    Language and communication
                  </span>
                </div>

              </div>

            </div>


            <div className={styles.internationalImage}>

              <CurriculumImage
                src={aboutSmall1}
                alt="High Gate students"
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            CTA
        ================================================== */}

        <section className={styles.cta}>

          <div className={styles.ctaContent}>

            <span>
              DISCOVER HIGH GATE
            </span>

            <h2>
              Give your child a strong
              <br />
              foundation for the future.
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


export default Curriculum;