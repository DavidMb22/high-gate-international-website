import styles from "./Programs.module.css";

import crecheImage from "../../assets/images/programs/creche.jpg";
import preschoolImage from "../../assets/images/programs/preschool.jpg";
import primaryImage from "../../assets/images/programs/primary.jpg";
import secondaryImage from "../../assets/images/programs/secondary.jpg";

import { ArrowUpRight } from "lucide-react";

const programs = [
  {
    title: "Crèche",
    description:
      "A safe and nurturing environment where our youngest learners begin discovering the world through play and exploration.",
    image: crecheImage,
    number: "01",
  },

  {
    title: "Pre-school",
    description:
      "Our nursery program encourages curiosity, creativity and early learning through engaging experiences.",
    image: preschoolImage,
    number: "02",
  },

  {
    title: "Primary School",
    description:
      "Students develop strong academic foundations while building confidence, creativity and essential life skills.",
    image: primaryImage,
    number: "03",
  },

  {
    title: "Lower Secondary",
    description:
      "Learners are prepared for the next stage of their academic journey through challenging and meaningful learning.",
    image: secondaryImage,
    number: "04",
  },
];

function Programs() {
  return (
    <section className={styles.programs}>
      <div className={styles.container}>

        {/* Section heading */}

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


        {/* Programs */}

        <div className={styles.grid}>

          {programs.map((program) => (
            <article
              className={styles.card}
              key={program.title}
            >

              {/* Image */}

              <div className={styles.imageWrapper}>

                <img
                  src={program.image}
                  alt={program.title}
                />

                <span className={styles.number}>
                  {program.number}
                </span>

              </div>


              {/* Content */}

              <div className={styles.cardContent}>

                <h3>
                  {program.title}
                </h3>

                <p>
                  {program.description}
                </p>

                <button className={styles.learnMore}>
                  Explore
                  <ArrowUpRight size={17} />
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Programs;