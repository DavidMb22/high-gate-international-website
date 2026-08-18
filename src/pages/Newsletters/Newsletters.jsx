import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { supabase } from "../../lib/supabase";

import styles from "./Newsletters.module.css";

function Newsletters() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsletters = async () => {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .eq("status", "published")
        .order("publication_date", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error loading newsletters:",
          error
        );

        setNewsletters([]);
        setLoading(false);
        return;
      }

      setNewsletters(data || []);
      setLoading(false);
    };

    loadNewsletters();
  }, []);

  const groupedNewsletters = newsletters.reduce(
    (groups, newsletter) => {
      const year = newsletter.academic_year;

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(newsletter);

      return groups;
    },
    {}
  );

  const academicYears =
    Object.keys(groupedNewsletters);

  return (
    <main className={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <section className={styles.header}>

        <span className={styles.label}>
          School Life
        </span>

        <h1>
          School Newsletters
        </h1>

        <p>
          Stay connected with the latest news,
          achievements and experiences from
          our school community.
        </p>

      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <section className={styles.content}>

        {loading ? (

          <div className={styles.loading}>
            Loading newsletters...
          </div>

        ) : academicYears.length > 0 ? (

          academicYears.map((year) => (

            <section
              key={year}
              className={styles.yearSection}
            >

              <div className={styles.yearHeader}>

                <span>
                  ACADEMIC YEAR
                </span>

                <h2>
                  {year}
                </h2>

              </div>


              <div className={styles.grid}>

                {groupedNewsletters[year].map(
                  (newsletter) => (

                    <Link
                      key={newsletter.id}
                      to={`/newsletter/${newsletter.slug}`}
                      className={styles.card}
                    >

                      <div className={styles.imageWrapper}>

                        {newsletter.cover_image ? (

                          <img
                            src={
                              newsletter.cover_image
                            }
                            alt={
                              newsletter.title
                            }
                          />

                        ) : (

                          <div
                            className={
                              styles.imagePlaceholder
                            }
                          >
                            NEWSLETTER
                          </div>

                        )}

                        <span
                          className={
                            styles.arrow
                          }
                        >
                          <ArrowUpRight size={18} />
                        </span>

                      </div>


                      <div className={styles.cardContent}>

                        <span className={styles.term}>
                          {newsletter.term}
                        </span>

                        <h3>
                          {newsletter.title}
                        </h3>

                        {newsletter.excerpt && (
                          <p>
                            {newsletter.excerpt}
                          </p>
                        )}

                        <span
                          className={
                            styles.viewLink
                          }
                        >
                          Read Newsletter
                          <ArrowUpRight size={15} />
                        </span>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </section>

          ))

        ) : (

          <div className={styles.empty}>

            <span>
              SCHOOL NEWSLETTERS
            </span>

            <h2>
              Newsletters Coming Soon
            </h2>

            <p>
              Our school newsletters will be
              available here. Check back soon
              for the latest updates from
              High Gate.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Newsletters;