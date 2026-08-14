import { useState } from "react";

import styles from "./Navbar.module.css";

import { topBarItems } from "../../data/topbar";
import { navigation } from "../../data/navigation";

import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";


function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);


  /* ==================================================
     MOBILE MENU
  ================================================== */

  const toggleMobileMenu = (title) => {

    setOpenMobileMenu(
      openMobileMenu === title ? null : title
    );

    setOpenMobileSubmenu(null);
  };


  const toggleMobileSubmenu = (title) => {

    setOpenMobileSubmenu(
      openMobileSubmenu === title
        ? null
        : title
    );
  };


  const closeMobileMenu = () => {

    setMobileMenuOpen(false);

    setOpenMobileMenu(null);

    setOpenMobileSubmenu(null);
  };


  return (
    <>

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <div className={styles.topBar}>

        <div className={styles.topContainer}>

          {topBarItems.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className={styles.topItem}
              >

                <Icon size={16} />

                <span>
                  {item.text}
                </span>

              </div>

            );

          })}

        </div>

      </div>


      {/* ==================================================
          MAIN NAVBAR
      ================================================== */}

      <header className={styles.navbar}>

        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/"
          className={styles.logoSection}
        >

          <img
            src={logo}
            alt="High Gate International Academy"
            className={styles.logo}
          />

        </Link>


        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className={styles.desktopNav}>

          <ul className={styles.menu}>

            {navigation.map((item) => (

              <li
                key={item.title}
                className={styles.menuItem}
              >

                {/* =========================
                    TOP LEVEL LINK
                ========================= */}

                {item.path ? (

                  <Link
                    to={item.path}
                    className={styles.menuLink}
                  >

                    <span>
                      {item.title}
                    </span>

                  </Link>

                ) : (

                  <div className={styles.menuLink}>

                    <span>
                      {item.title}
                    </span>

                    {item.submenu && (

                      <ChevronDown
                        size={15}
                        className={styles.arrow}
                      />

                    )}

                  </div>

                )}


                {/* ==================================================
                    FIRST LEVEL DROPDOWN
                ================================================== */}

                {item.submenu && (

                  <ul className={styles.dropdown}>

                    {item.submenu.map((subItem) => (

                      <li
                        key={subItem.title}
                        className={
                          subItem.submenu
                            ? styles.hasSubmenu
                            : ""
                        }
                      >

                        {/* =========================
                            NESTED SUBMENU
                        ========================= */}

                        {subItem.submenu ? (

                          <>

                            <div
                              className={
                                styles.submenuTitle
                              }
                            >

                              <span>
                                {subItem.title}
                              </span>

                              <span>
                                ▶
                              </span>

                            </div>


                            <ul
                              className={
                                styles.subDropdown
                              }
                            >

                              {subItem.submenu.map(
                                (childItem) => (

                                  <li
                                    key={
                                      childItem.title
                                    }
                                  >

                                    <Link
                                      to={
                                        childItem.path
                                      }
                                      className={
                                        styles.dropdownLink
                                      }
                                    >

                                      {childItem.title}

                                    </Link>

                                  </li>

                                )
                              )}

                            </ul>

                          </>

                        ) : (

                          /* =========================
                             NORMAL DROPDOWN LINK
                          ========================= */

                          <Link
                            to={subItem.path}
                            className={
                              styles.dropdownLink
                            }
                          >

                            {subItem.title}

                          </Link>

                        )}

                      </li>

                    ))}

                  </ul>

                )}

              </li>

            ))}

          </ul>

        </nav>


        {/* ==================================================
            DESKTOP ACTIONS
        ================================================== */}

        <div className={styles.actions}>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link
            to="/admissions"
            className={styles.applyButton}
          >
            Apply Now
          </Link>

        </div>


        {/* ==================================================
            MOBILE MENU BUTTON
        ================================================== */}

        <button
          className={styles.mobileMenuButton}
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
        >

          {mobileMenuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}

        </button>


        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        <div
          className={`${styles.mobileMenu} ${
            mobileMenuOpen
              ? styles.mobileMenuOpen
              : ""
          }`}
        >

          <ul className={styles.mobileMenuList}>

            {navigation.map((item) => (

              <li
                key={item.title}
                className={styles.mobileMenuItem}
              >

                {/* =========================
                    TOP LEVEL WITHOUT SUBMENU
                ========================= */}

                {!item.submenu ? (

                  <Link
                    to={item.path}
                    className={styles.mobileMenuLink}
                    onClick={closeMobileMenu}
                  >

                    {item.title}

                  </Link>

                ) : (

                  /* =========================
                     TOP LEVEL WITH SUBMENU
                  ========================= */

                  <>

                    <button
                      className={
                        styles.mobileMenuLink
                      }
                      onClick={() =>
                        toggleMobileMenu(
                          item.title
                        )
                      }
                    >

                      <span>
                        {item.title}
                      </span>

                      <ChevronDown
                        size={18}
                        className={
                          openMobileMenu ===
                          item.title
                            ? styles.rotate
                            : ""
                        }
                      />

                    </button>


                    <ul
                      className={`${styles.mobileDropdown} ${
                        openMobileMenu ===
                        item.title
                          ? styles.mobileDropdownOpen
                          : ""
                      }`}
                    >

                      {item.submenu.map(
                        (subItem) => (

                          <li
                            key={subItem.title}
                            className={
                              styles.mobileNestedItem
                            }
                          >

                            {/* =========================
                                SECOND LEVEL WITH SUBMENU
                            ========================= */}

                            {subItem.submenu ? (

                              <>

                                <button
                                  className={
                                    styles.mobileNestedButton
                                  }
                                  onClick={() =>
                                    toggleMobileSubmenu(
                                      subItem.title
                                    )
                                  }
                                >

                                  <span>
                                    {subItem.title}
                                  </span>

                                  <ChevronDown
                                    size={16}
                                    className={
                                      openMobileSubmenu ===
                                      subItem.title
                                        ? styles.rotate
                                        : ""
                                    }
                                  />

                                </button>


                                <ul
                                  className={`${styles.mobileNestedDropdown} ${
                                    openMobileSubmenu ===
                                    subItem.title
                                      ? styles.mobileNestedDropdownOpen
                                      : ""
                                  }`}
                                >

                                  {subItem.submenu.map(
                                    (childItem) => (

                                      <li
                                        key={
                                          childItem.title
                                        }
                                      >

                                        <Link
                                          to={
                                            childItem.path
                                          }
                                          className={
                                            styles.mobileDropdownLink
                                          }
                                          onClick={
                                            closeMobileMenu
                                          }
                                        >

                                          {
                                            childItem.title
                                          }

                                        </Link>

                                      </li>

                                    )
                                  )}

                                </ul>

                              </>

                            ) : (

                              /* =========================
                                 NORMAL MOBILE LINK
                              ========================= */

                              <Link
                                to={
                                  subItem.path
                                }
                                className={
                                  styles.mobileDropdownLink
                                }
                                onClick={
                                  closeMobileMenu
                                }
                              >

                                {subItem.title}

                              </Link>

                            )}

                          </li>

                        )
                      )}

                    </ul>

                  </>

                )}

              </li>

            ))}

          </ul>


          {/* =========================
              MOBILE ACTIONS
          ========================= */}

          <div className={styles.mobileActions}>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>

            <Link
              to="/admissions"
              onClick={closeMobileMenu}
            >
              Apply Now
            </Link>

          </div>

        </div>

      </header>

    </>
  );
}


export default Navbar;