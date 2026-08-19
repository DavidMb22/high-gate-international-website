import styles from "./AdmissionsCTA.module.css";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import admissionsImage from "../../assets/images/admissions/admissions.JPG";


function AdmissionsCTA() {
  return (
    <section
      className={styles.admissions}
      style={{
        backgroundImage: `url(${admissionsImage})`,
      }}
    >

      {/* Dark overlay */}

      <div className={styles.overlay} />


      {/* CTA content */}

      <div className={styles.content}>

        <span className={styles.label}>
          JOIN HIGH GATE
        </span>


        <h2>
          Ready to Start Your Child's
          <br />
          Journey?
        </h2>


        <p>
          Take the next step and apply to
          High Gate International Academy.
        </p>


        <Link
          to="/admissions/apply"
          className={styles.button}
        >
          Apply Now

          <ArrowRight size={18} />
        </Link>

      </div>

    </section>
  );
}


export default AdmissionsCTA;