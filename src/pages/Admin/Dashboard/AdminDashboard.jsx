import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <main className={styles.page}>

      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            HIGH GATE INTERNATIONAL ACADEMY
          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage the content displayed on the school website.
          </p>
        </div>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>


      <section className={styles.content}>

        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            CONTENT MANAGEMENT
          </span>

          <h2>
            Manage Website Content
          </h2>
        </div>


        <div className={styles.grid}>

          <button
            className={styles.card}
            onClick={() => navigate("/admin/events")}
          >
            <span className={styles.number}>
              01
            </span>

            <h3>
              School Events
            </h3>

            <p>
              Add, edit and manage school events,
              cover images, descriptions and links.
            </p>

            <span className={styles.cardLink}>
              Manage Events →
            </span>
          </button>


          <button
            className={styles.card}
            onClick={() => navigate("/admin/activities")}
          >
            <span className={styles.number}>
              02
            </span>

            <h3>
              School Activities
            </h3>

            <p>
              Add and manage activities, videos,
              descriptions and thumbnails.
            </p>

            <span className={styles.cardLink}>
              Manage Activities →
            </span>
          </button>

        </div>

      </section>

    </main>
  );
}

export default AdminDashboard;