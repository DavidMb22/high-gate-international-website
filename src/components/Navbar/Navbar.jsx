import styles from "./Navbar.module.css";

import { topBarItems } from "../../data/topbar";
import { navigation } from "../../data/navigation";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { useTranslation } from "react-i18next";

import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";


function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [openMobileMenu, setOpenMobileMenu] =
    useState(null);

  const [openMobileSubmenu, setOpenMobileSubmenu] =
    useState(null);


  /* ==================================================
     NEWSLETTERS
  ================================================== */

  const [newsletters, setNewsletters] =
    useState([]);


  useEffect(() => {

    const loadNewsletters = async () => {

      const { data, error } =
        await supabase
          .from("newsletters")
          .select(
            "id, academic_year, term, slug"
          )
          .eq("status", "published")
          .order("academic_year", {
            ascending: false,
          })
          .order("term", {
            ascending: true,
          });


      if (error) {

        console.error(
          "Error loading newsletters:",
          error
        );

        return;
      }


      setNewsletters(data || []);
    };


    loadNewsletters();

  }, []);


  /* ==================================================
     GROUP NEWSLETTERS BY ACADEMIC YEAR
  ================================================== */

  const newsletterYears =
    newsletters.reduce(
      (groups, newsletter) => {

        const year =
          newsletter.academic_year;


        if (!groups[year]) {
          groups[year] = [];
        }


        groups[year].push(
          newsletter
        );


        return groups;

      },
      {}
    );


  /* ==================================================
     CREATE DYNAMIC NAVIGATION
  ================================================== */

  const dynamicNavigation =
    navigation.map((item) => {

      if (item.key !== "newsletter") {
        return item;
      }


      return {
        ...item,

        submenu:
          Object.entries(
            newsletterYears
          ).map(
            ([year, yearNewsletters]) => ({

              key: `newsletter-${year}`,

              title: year,

              submenu:
                yearNewsletters.map(
                  (newsletter) => ({

                    title:
                      newsletter.term,

                    path:
                      `/newsletter/${newsletter.slug}`,

                  })
                ),

            })
          ),
      };

    });


  /* ==================================================
     MOBILE MENU
  ================================================== */

  const toggleMobileMenu = (title) => {

    setOpenMobileMenu(
      openMobileMenu === title
        ? null
        : title
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


  /* ==================================================
     TRANSLATION
  ================================================== */

  const { t, i18n } =
    useTranslation();

  const currentLanguage =
    i18n.language;


  const getNavLabel = (key) => {

    const translated =
      t(`nav.${key}`);


    if (
      translated ===
      `nav.${key}`
    ) {

      const labels = {

        home: "Home",

        about: "About",

        whoWeAre:
          "Who We Are",

        visionMission:
          "Vision & Mission",

        leadership:
          "Leadership",

        whyHighGate:
          "Why High Gate",


        academics:
          "Academics",

        curriculum:
          "Our Curriculum",

        creche:
          "Creche",

        nursery:
          "Nursery",

        primary:
          "Primary",

        lowerSecondary:
          "Lower Secondary",


        admission:
          "Admission",

        applyNow:
          "Apply Now",

        tuitionFees:
          "Tuition Fees",

        schoolCalendar:
          "School Calendar",


        newsletter:
          "Newsletter",

        year2025:
          "2025–2026",

        year2024:
          "2024–2025",


        schoolLife:
          "School Life",

        schoolEvents:
          "School Events",

        schoolActivities:
          "School Activities",


        contact:
          "Contact",
      };


      return (
        labels[key] ||
        key
      );
    }


    return translated;
  };


  /* ==================================================
     LANGUAGE
  ================================================== */

  const changeLanguage =
    (language) => {

      i18n.changeLanguage(
        language
      );

      localStorage.setItem(
        "highgate-language",
        language
      );
    };


  return (

    <>

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <div className={styles.topBar}>

        <div
          className={
            styles.topContainer
          }
        >

          {topBarItems.map(
            (item, index) => {

              const Icon =
                item.icon;


              return (

                <div
                  key={index}
                  className={
                    styles.topItem
                  }
                >

                  <Icon size={16} />

                  <span>
                    {item.text}
                  </span>

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* ==================================================
          MAIN NAVBAR
      ================================================== */}

      <header
        className={styles.navbar}
      >


        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/"
          className={
            styles.logoSection
          }
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

        <nav
          className={
            styles.desktopNav
          }
        >

          <ul
            className={
              styles.menu
            }
          >

            {dynamicNavigation.map(
              (item) => (

                <li
                  key={item.key}
                  className={
                    styles.menuItem
                  }
                >


                  {/* =========================
                      TOP LEVEL LINK
                  ========================= */}

                  {item.path ? (

                    <Link
                      to={item.path}
                      className={
                        styles.menuLink
                      }
                    >

                      <span>
                        {getNavLabel(
                          item.key
                        )}
                      </span>

                    </Link>

                  ) : (

                    <div
                      className={
                        styles.menuLink
                      }
                    >

                      <span>
                        {getNavLabel(
                          item.key
                        )}
                      </span>


                      {item.submenu && (

                        <ChevronDown
                          size={15}
                          className={
                            styles.arrow
                          }
                        />

                      )}

                    </div>

                  )}


                  {/* ==================================================
                      FIRST LEVEL DROPDOWN
                  ================================================== */}

                  {item.submenu && (

                    <ul
                      className={
                        styles.dropdown
                      }
                    >

                      {item.submenu.map(
                        (subItem) => (

                          <li
                            key={
                              subItem.key
                            }
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
                                    {subItem.title ||
                                      getNavLabel(
                                        subItem.key
                                      )}
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
                                 NORMAL DROPDOWN LINK
                              ========================= */

                              <Link
                                to={
                                  subItem.path
                                }
                                className={
                                  styles.dropdownLink
                                }
                              >

                                {subItem.title ||
                                  getNavLabel(
                                    subItem.key
                                  )}

                              </Link>

                            )}

                          </li>

                        )
                      )}

                    </ul>

                  )}

                </li>

              )
            )}

          </ul>

        </nav>


        {/* ==================================================
            DESKTOP ACTIONS
        ================================================== */}

        <div
          className={
            styles.languageSwitcher
          }
        >

          <button
            className={
              currentLanguage ===
                "en"
                ? styles.activeLanguage
                : ""
            }
            onClick={() =>
              changeLanguage("en")
            }
          >
            EN
          </button>


          <span>
            |
          </span>


          <button
            className={
              currentLanguage ===
                "fr"
                ? styles.activeLanguage
                : ""
            }
            onClick={() =>
              changeLanguage("fr")
            }
          >
            FR
          </button>

        </div>


        <div
          className={
            styles.actions
          }
        >

          <Link
            to="/contact"
            onClick={
              closeMobileMenu
            }
          >
            {t("nav.contact")}
          </Link>

          <Link
            to="/admissions/apply"
            className={styles.applyButton}
            onClick={closeMobileMenu}
          >
            {t("nav.applyNow")}
          </Link>

        </div>


        {/* ==================================================
            MOBILE MENU BUTTON
        ================================================== */}

        <button
          className={
            styles.mobileMenuButton
          }
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
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
          className={`
            ${styles.mobileMenu}
            ${mobileMenuOpen
              ? styles.mobileMenuOpen
              : ""
            }
          `}
        >

          <ul
            className={
              styles.mobileMenuList
            }
          >

            {dynamicNavigation.map(
              (item) => (

                <li
                  key={item.key}
                  className={
                    styles.menuItem
                  }
                >


                  {/* =========================
                      TOP LEVEL WITHOUT SUBMENU
                  ========================= */}

                  {!item.submenu ? (

                    <Link
                      to={item.path}
                      className={
                        styles.mobileMenuLink
                      }
                      onClick={
                        closeMobileMenu
                      }
                    >

                      {getNavLabel(
                        item.key
                      )}

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
                            item.key
                          )
                        }
                      >

                        <span>
                          {getNavLabel(
                            item.key
                          )}
                        </span>


                        <ChevronDown
                          size={18}
                          className={
                            openMobileMenu ===
                              item.key
                              ? styles.rotate
                              : ""
                          }
                        />

                      </button>


                      <ul
                        className={`
                          ${styles.mobileDropdown}
                          ${openMobileMenu ===
                            item.key
                            ? styles.mobileDropdownOpen
                            : ""
                          }
                        `}
                      >

                        {item.submenu.map(
                          (subItem) => (

                            <li
                              key={
                                subItem.key
                              }
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
                                        subItem.key
                                      )
                                    }
                                  >

                                    <span>
                                      {
                                        subItem.title ||
                                        getNavLabel(
                                          subItem.key
                                        )
                                      }
                                    </span>


                                    <ChevronDown
                                      size={16}
                                      className={
                                        openMobileSubmenu ===
                                          subItem.key
                                          ? styles.rotate
                                          : ""
                                      }
                                    />

                                  </button>


                                  <ul
                                    className={`
                                      ${styles.mobileNestedDropdown}
                                      ${openMobileSubmenu ===
                                        subItem.key
                                        ? styles.mobileNestedDropdownOpen
                                        : ""
                                      }
                                    `}
                                  >

                                    {subItem.submenu.map(
                                      (
                                        childItem
                                      ) => (

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

                                  {
                                    subItem.title ||
                                    getNavLabel(
                                      subItem.key
                                    )
                                  }

                                </Link>

                              )}

                            </li>

                          )
                        )}

                      </ul>

                    </>

                  )}

                </li>

              )
            )}

          </ul>


          {/* =========================
              MOBILE ACTIONS
          ========================= */}

          <div
            className={
              styles.mobileActions
            }
          >

            <Link
              to="/contact"
              onClick={
                closeMobileMenu
              }
            >
              {t("nav.contact")}
            </Link>


            <Link
              to="/admissions/apply"
              className={styles.applyButton}
              onClick={closeMobileMenu}
            >
              {t("nav.applyNow")}
            </Link>

          </div>

        </div>

      </header>

    </>
  );
}


export default Navbar;