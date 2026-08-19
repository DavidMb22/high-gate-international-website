import styles from "./Contact.module.css";

function Contact() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <span>GET IN TOUCH</span>

        <h1>
          Contact Us
        </h1>

        <p>
          We would be happy to hear from you.
        </p>
      </section>


      <section className={styles.contactSection}>

        <div className={styles.contactCard}>

          <span className={styles.label}>
            PHONE
          </span>

          <a href="tel:+250798980340">
            +250 79 89 80 340
          </a>

        </div>


        <div className={styles.contactCard}>

          <span className={styles.label}>
            EMAIL
          </span>

          <a href="mailto:info@highgateinternational.com">
            info@highgateinternational.com
          </a>

        </div>

      </section>

    </main>
  );
}

export default Contact;