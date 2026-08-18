import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { supabase } from "../../lib/supabase";

import styles from "./Newsletter.module.css";


function Newsletter() {

  const { slug } = useParams();

  const [newsletter, setNewsletter] =
    useState(null);

  const [relatedNewsletters, setRelatedNewsletters] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);


  /* ==================================================
     LOAD NEWSLETTER
  ================================================== */

  useEffect(() => {

    const loadNewsletter = async () => {

      setLoading(true);
      setNotFound(false);


      const { data, error } =
        await supabase
          .from("newsletters")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();


      if (error) {

        console.error(
          "Error loading newsletter:",
          error
        );

        setNewsletter(null);
        setNotFound(true);
        setLoading(false);

        return;
      }


      setNewsletter(data);

      setLoading(false);
    };


    loadNewsletter();

  }, [slug]);


  /* ==================================================
     LOAD RELATED NEWSLETTERS
  ================================================== */

  useEffect(() => {

    if (!newsletter) {
      return;
    }


    const loadRelatedNewsletters =
      async () => {

        const { data, error } =
          await supabase
            .from("newsletters")
            .select(
              "id, academic_year, term, title, slug, excerpt, cover_image, publication_date"
            )
            .eq(
              "academic_year",
              newsletter.academic_year
            )
            .eq("status", "published")
            .neq("id", newsletter.id)
            .order(
              "publication_date",
              {
                ascending: true,
              }
            );


        if (error) {

          console.error(
            "Error loading related newsletters:",
            error
          );

          setRelatedNewsletters([]);

          return;
        }


        setRelatedNewsletters(
          data || []
        );
      };


    loadRelatedNewsletters();

  }, [newsletter]);


  /* ==================================================
     LOADING
  ================================================== */

  if (loading) {

    return (
      <main className={styles.page}>

        <div
          className={styles.loading}
        >
          Loading newsletter...
        </div>

      </main>
    );
  }


  /* ==================================================
     NOT FOUND
  ================================================== */

  if (
    notFound ||
    !newsletter
  ) {

    return (
      <main className={styles.page}>

        <section
          className={styles.notFound}
        >

          <span>
            NEWSLETTER
          </span>

          <h1>
            Newsletter Not Found
          </h1>

          <p>
            This newsletter may not
            have been published yet
            or may no longer be
            available.
          </p>

        </section>

      </main>
    );
  }


  /* ==================================================
     DATE
  ================================================== */

  const formattedDate =
    newsletter.publication_date
      ? new Date(
          newsletter.publication_date
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )
      : null;


  return (

    <main className={styles.page}>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className={styles.hero}
      >

        <div
          className={styles.heroContent}
        >

          <span
            className={styles.eyebrow}
          >
            {newsletter.academic_year}
          </span>


          <span
            className={styles.term}
          >
            {newsletter.term}
          </span>


          <h1>
            {newsletter.title}
          </h1>


          {formattedDate && (

            <p>
              Published{" "}
              {formattedDate}
            </p>

          )}

        </div>

      </section>


      {/* ==================================================
          COVER IMAGE
      ================================================== */}

      {newsletter.cover_image && (

        <section
          className={styles.coverSection}
        >

          <div
            className={styles.coverWrapper}
          >

            <img
              src={newsletter.cover_image}
              alt={newsletter.title}
            />

          </div>

        </section>

      )}


      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      {newsletter.excerpt && (

        <section
          className={
            styles.introduction
          }
        >

          <div
            className={styles.container}
          >

            <p>
              {newsletter.excerpt}
            </p>

          </div>

        </section>

      )}


      {/* ==================================================
          CONTENT
      ================================================== */}

      <article
        className={styles.article}
      >

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html:
              newsletter.content ||
              "",
          }}
        />

      </article>


      {/* ==================================================
          RELATED NEWSLETTERS
      ================================================== */}

      {relatedNewsletters.length >
        0 && (

        <section
          className={
            styles.relatedSection
          }
        >

          <div
            className={
              styles.relatedContainer
            }
          >

            <div
              className={
                styles.relatedHeader
              }
            >

              <span>
                {newsletter.academic_year}
              </span>

              <h2>
                More from{" "}
                {newsletter.academic_year}
              </h2>

            </div>


            <div
              className={
                styles.relatedGrid
              }
            >

              {relatedNewsletters.map(
                (related) => (

                  <Link
                    key={related.id}
                    to={`/newsletter/${related.slug}`}
                    className={
                      styles.relatedCard
                    }
                  >

                    <div
                      className={
                        styles.relatedImage
                      }
                    >

                      {related.cover_image ? (

                        <img
                          src={
                            related.cover_image
                          }
                          alt={
                            related.title
                          }
                        />

                      ) : (

                        <div
                          className={
                            styles.relatedPlaceholder
                          }
                        >
                          NEWSLETTER
                        </div>

                      )}


                      <span
                        className={
                          styles.relatedArrow
                        }
                      >
                        <ArrowUpRight
                          size={18}
                        />
                      </span>

                    </div>


                    <div
                      className={
                        styles.relatedContent
                      }
                    >

                      <span
                        className={
                          styles.relatedTerm
                        }
                      >
                        {related.term}
                      </span>


                      <h3>
                        {related.title}
                      </h3>


                      {related.excerpt && (

                        <p>
                          {related.excerpt}
                        </p>

                      )}


                      <span
                        className={
                          styles.relatedLink
                        }
                      >
                        Read Newsletter

                        <ArrowUpRight
                          size={15}
                        />

                      </span>

                    </div>

                  </Link>

                )
              )}

            </div>

          </div>

        </section>

      )}

    </main>
  );
}


export default Newsletter;