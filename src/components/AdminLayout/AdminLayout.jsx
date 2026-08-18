import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Activity, LogOut } from "lucide-react";
import { Newspaper } from "lucide-react";

import { supabase } from "../../lib/supabase";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className={styles.layout}>

      {/* SIDEBAR */}

      <aside className={styles.sidebar}>

        <div className={styles.brand}>
          <span>HIGH GATE</span>
          <small>ADMINISTRATION</small>
        </div>


        <nav className={styles.navigation}>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>


          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              isActive
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
          >
            <CalendarDays size={18} />
            <span>School Events</span>
          </NavLink>


          <NavLink
            to="/admin/activities"
            className={({ isActive }) =>
              isActive
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
          >
            <Activity size={18} />
            <span>School Activities</span>
          </NavLink>

          <NavLink
            to="/admin/newsletter"
            className={({ isActive }) =>
              isActive
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
          >
            <Newspaper size={18} />
            <span>Newsletter</span>
          </NavLink>

        </nav>


        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>


      {/* MAIN */}

      <div className={styles.main}>

        <header className={styles.topbar}>
          <span>
            High Gate International Academy
          </span>

          <span className={styles.adminLabel}>
            Admin Portal
          </span>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;