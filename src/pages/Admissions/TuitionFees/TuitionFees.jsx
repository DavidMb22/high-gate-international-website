import styles from "./TuitionFees.module.css";
import { Link } from "react-router-dom";

import aboutMain from "../../../assets/images/about/about-main.JPG";

function TuitionFees() {
  const tuitionFees = [
    {
      level: "Crèche",
      tuition: "500,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "—",
      total: "760,000 RWF",
    },
    {
      level: "Nursery",
      tuition: "500,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "—",
      total: "760,000 RWF",
    },
    {
      level: "Grade 1 – Grade 5",
      tuition: "600,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "—",
      total: "860,000 RWF",
    },
    {
      level: "Grade 6",
      tuition: "600,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "100,000 RWF",
      total: "960,000 RWF",
    },
    {
      level: "Grade 7",
      tuition: "700,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "—",
      total: "960,000 RWF",
    },
    {
      level: "Grade 8",
      tuition: "700,000 RWF",
      meals: "260,000 RWF",
      checkpoint: "100,000 RWF",
      total: "1,060,000 RWF",
    },
  ];

  const startingCosts = [
    {
      item: "Uniform",
      creche: "N/A",
      nursery: "130,000 RWF",
      primary: "150,000 RWF",
      secondary: "180,000 RWF",
    },
    {
      item: "Stationery",
      creche: "100,000 RWF",
      nursery: "100,000 RWF",
      primary: "150,000 RWF",
      secondary: "200,000 RWF",
    },
    {
      item: "Textbooks",
      creche: "N/A",
      nursery: "N/A",
      primary: "Buy your own / Approved supplier only",
      secondary: "Buy your own / Approved supplier only",
    },
    {
      item: "Insurance",
      creche: "8,000 RWF",
      nursery: "8,000 RWF",
      primary: "8,000 RWF",
      secondary: "8,000 RWF",
    },
    {
      item: "First Aid",
      creche: "5,000 RWF",
      nursery: "5,000 RWF",
      primary: "5,000 RWF",
      secondary: "5,000 RWF",
    },
    {
      item: "Educational Events",
      creche: "50,000 RWF",
      nursery: "50,000 RWF",
      primary: "50,000 RWF",
      secondary: "50,000 RWF",
    },
    {
      item: "System (Academic Bridge)",
      creche: "15,000 RWF",
      nursery: "15,000 RWF",
      primary: "15,000 RWF",
      secondary: "15,000 RWF",
    },
  ];

  const optionalCosts = [
    {
      item: "Intervention / Clubs",
      amount: "90,000 RWF",
    },
    {
      item: "Bus",
      amount: "250,000 – 400,000 RWF",
    },
  ];

  return (
    <main className={styles.page}>

      <section className={styles.hero}>

        {/* HERO IMAGE */}
        <div className={styles.heroImage}>
          <img
            src={aboutMain}
            alt="High Gate International Academy students"
          />
        </div>


        {/* OVERLAY */}
        <div className={styles.heroOverlay} />


        {/* CONTENT */}
        <div className={styles.heroContent}>

          <span className={styles.eyebrow}>
            ADMISSIONS
          </span>

          <h1>
            Tuition Fees
          </h1>

          <p>
            School Fee Structure for the
            2026–2027 Academic Year
          </p>


          {/* BREADCRUMB */}
          <div className={styles.breadcrumb}>

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <Link to="/admissions/fees">
              Admissions
            </Link>

            <span>/</span>

            <span>
              Tuition Fees
            </span>

          </div>

        </div>

      </section>


      {/* INTRO */}

      <section className={styles.introduction}>
        <div className={styles.container}>

          <span className={styles.eyebrow}>
            2026–2027
          </span>

          <h2>
            School Fee Structure
          </h2>

          <p>
            The following fees apply to the 2026–2027
            academic year. Fees are presented per term
            unless otherwise indicated.
          </p>

        </div>
      </section>


      {/* NEW STUDENTS */}

      <section className={styles.newStudents}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              NEW STUDENTS
            </span>

            <h2>
              Registration & Entry Test
            </h2>

          </div>

          <div className={styles.newStudentGrid}>

            <div className={styles.newStudentCard}>
              <span>01</span>
              <h3>Registration</h3>
              <strong>150,000 RWF</strong>
            </div>

            <div className={styles.newStudentCard}>
              <span>02</span>
              <h3>Entry Test</h3>
              <strong>30,000 RWF</strong>
            </div>

          </div>

          <div className={styles.discountBox}>

            <div>
              <span className={styles.boxLabel}>
                SIBLING DISCOUNT
              </span>

              <h3>
                Discounts for qualifying siblings
              </h3>
            </div>

            <div className={styles.discountList}>
              <span>
                <strong>3rd child</strong>
                50,000 RWF
              </span>

              <span>
                <strong>4th child</strong>
                60,000 RWF
              </span>

              <span>
                <strong>5th child</strong>
                100,000 RWF
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* TUITION TABLE */}

      <section className={styles.fees}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              PER TERM
            </span>

            <h2>
              Tuition & School Fees
            </h2>

          </div>

          <div className={styles.tableWrapper}>

            <table className={styles.feesTable}>

              <thead>
                <tr>
                  <th>Description</th>
                  <th>Tuition Fees</th>
                  <th>Meals</th>
                  <th>Checkpoint Preparation</th>
                  <th>Total per Term</th>
                </tr>
              </thead>

              <tbody>

                {tuitionFees.map((fee) => (
                  <tr key={fee.level}>

                    <td>
                      <strong>{fee.level}</strong>
                    </td>

                    <td>{fee.tuition}</td>

                    <td>{fee.meals}</td>

                    <td>{fee.checkpoint}</td>

                    <td className={styles.totalCell}>
                      {fee.total}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <p className={styles.tableNote}>
            All amounts are in Rwandan Francs (RWF).
          </p>

        </div>
      </section>


      {/* STARTING COSTS */}

      <section className={styles.startingCosts}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              ONCE A YEAR
            </span>

            <h2>
              Starting Costs
            </h2>

            <p>
              These costs are listed as yearly starting
              costs in the 2026–2027 fee structure.
            </p>

          </div>

          <div className={styles.tableWrapper}>

            <table className={styles.costTable}>

              <thead>
                <tr>
                  <th>Item</th>
                  <th>Crèche</th>
                  <th>Nursery</th>
                  <th>Grade 1 – Grade 6</th>
                  <th>Grade 7 – Grade 8</th>
                </tr>
              </thead>

              <tbody>

                {startingCosts.map((cost) => (
                  <tr key={cost.item}>

                    <td>
                      <strong>{cost.item}</strong>
                    </td>

                    <td>{cost.creche}</td>
                    <td>{cost.nursery}</td>
                    <td>{cost.primary}</td>
                    <td>{cost.secondary}</td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </section>


      {/* OPTIONAL COSTS */}

      <section className={styles.optional}>
        <div className={styles.container}>

          <div className={styles.optionalContent}>

            <span className={styles.eyebrow}>
              PER TERM · OPTIONAL
            </span>

            <h2>
              Additional Services
            </h2>

            <p>
              The following services are optional and are
              charged per term.
            </p>

          </div>

          <div className={styles.optionalGrid}>

            {optionalCosts.map((cost, index) => (
              <div
                className={styles.optionalCard}
                key={cost.item}
              >
                <span>
                  0{index + 1}
                </span>

                <h3>
                  {cost.item}
                </h3>

                <strong>
                  {cost.amount}
                </strong>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* PAYMENT DEADLINES */}

      <section className={styles.deadlines}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              PAYMENT SCHEDULE
            </span>

            <h2>
              Installment Deadlines
            </h2>

          </div>

          <div className={styles.deadlineGrid}>

            <div>
              <span>TERM 1</span>
              <strong>
                August 30, 2026
              </strong>
            </div>

            <div>
              <span>TERM 2</span>
              <strong>
                December 15, 2026
              </strong>
            </div>

            <div>
              <span>TERM 3</span>
              <strong>
                March 31, 2027
              </strong>
            </div>

          </div>

        </div>
      </section>


      {/* PAYMENT INFORMATION */}

      <section className={styles.payment}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <span className={styles.eyebrow}>
              PAYMENT INFORMATION
            </span>

            <h2>
              Payment Details
            </h2>

          </div>

          <div className={styles.paymentGrid}>

            <div className={styles.paymentCard}>
              <span>BK ACCOUNT</span>

              <strong>
                100159454813
              </strong>

              <p>
                High Gate Ltd
              </p>

              <small>
                For tuition payments.
                Mention the student's name.
              </small>
            </div>

            <div className={styles.paymentCard}>
              <span>EQUITY ACCOUNT · USD</span>

              <strong>
                4026200029256
              </strong>

              <p>
                High Gate Ltd
              </p>

              <small>
                For tuition payments.
                Mention the student's name.
              </small>
            </div>

            <div className={styles.paymentCard}>
              <span>EQUITY ACCOUNT · RWF</span>

              <strong>
                4026200029190
              </strong>

              <p>
                High Gate Ltd
              </p>

              <small>
                For bus and club payments only.
                Mention the student's name.
              </small>
            </div>

          </div>

        </div>
      </section>


      {/* IMPORTANT INFORMATION */}

      <section className={styles.important}>
        <div className={styles.container}>

          <div className={styles.importantContent}>

            <span className={styles.eyebrow}>
              IMPORTANT INFORMATION
            </span>

            <h2>
              Fee Terms & Conditions
            </h2>

            <div className={styles.terms}>

              <div>
                <strong>
                  Payment deadlines
                </strong>

                <p>
                  All fees must be paid before or on the
                  due date of each installment.
                </p>
              </div>

              <div>
                <strong>
                  Payment method
                </strong>

                <p>
                  Fees are payable in Rwandan Francs (RWF)
                  and must be deposited directly into the
                  school's designated Bank of Kigali account.
                </p>
              </div>

              <div>
                <strong>
                  Non-refundable fees
                </strong>

                <p>
                  All school fees and related payments made
                  to the school are strictly non-refundable.
                </p>
              </div>

              <div>
                <strong>
                  Proof of payment
                </strong>

                <p>
                  A copy of the bank deposit slip must be
                  submitted to the Finance Office with the
                  student's full name, class/grade and term.
                </p>
              </div>

              <div>
                <strong>
                  Outstanding balances
                </strong>

                <p>
                  Outstanding balances must be cleared before
                  a student can be enrolled or re-enrolled
                  for a new term or academic year.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className={styles.cta}>

        <div className={styles.ctaContent}>

          <span className={styles.eyebrow}>
            JOIN HIGH GATE
          </span>

          <h2>
            Ready to Start
            Your Child's Journey?
          </h2>

          <p>
            Take the next step and apply to High Gate
            International Academy.
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

export default TuitionFees;