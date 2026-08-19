import styles from "./Programs.module.css";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import crecheImage from "../../assets/images/programs/creche.JPG";
import preschoolImage from "../../assets/images/programs/preschool.JPG";
import primaryImage from "../../assets/images/programs/primary.JPG";
import secondaryImage from "../../assets/images/programs/secondary.JPG";


const programs = [
  {
    title: "Crèche",
    description:
      "A safe and nurturing environment where our youngest learners begin discovering the world through play and exploration.",
    image: crecheImage,
    number: "01",
    path: "/academics/creche",
  },

  {
    title: "Pre-school",
    description:
      "Our nursery program encourages curiosity, creativity and early learning through engaging experiences.",
    image: preschoolImage,
    number: "02",
    path: "/academics/nursery",
  },

  {
    title: "Primary School",
    description:
      "Students develop strong academic foundations while building confidence, creativity and essential life skills.",
    image: primaryImage,
    number: "03",
    path: "/academics/primary",
  },

  {
    title: "Lower Secondary",
    description:
      "Learners are prepared for the next stage of their academic journey through challenging and meaningful learning.",
    image: secondaryImage,
    number: "04",
    path: "/academics/lower-secondary",
  },
];


function Programs() {
  return (
    <section className={styles.programs}>
      <div className={styles.container}>

        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className={styles.heading}>

          <div>
            <span className={styles.label}>
              Our Programs & Levels
            </span>

            <h2>
              Learning that grows
              <br />
              with every child.
            </h2>
          </div>

          <p>
            From the earliest years to lower secondary,
            our programs provide age-appropriate learning
            experiences that help every student discover
            their potential.
          </p>

        </div>


        {/* =========================
            PROGRAMS
        ========================= */}

        <div className={styles.grid}>

          {programs.map((program) => (

            <article
              className={styles.card}
              key={program.title}
            >

              {/* IMAGE */}

              <div className={styles.imageWrapper}>

                <img
                  src={program.image}
                  alt={program.title}
                />

                <span className={styles.number}>
                  {program.number}
                </span>

              </div>


              {/* CONTENT */}

              <div className={styles.cardContent}>

                <h3>
                  {program.title}
                </h3>

                <p>
                  {program.description}
                </p>


                <Link
                  to={program.path}
                  className={styles.learnMore}
                >
                  Explore
                  <ArrowUpRight size={17} />
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}


export default Programs;