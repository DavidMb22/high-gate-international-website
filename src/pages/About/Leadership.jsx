import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import styles from "./Leadership.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import ceoImage from "../../assets/images/leadership/ceoImage.png";
import principalImage from "../../assets/images/leadership/principalImage.JPG";
import academicImage from "../../assets/images/leadership/academicImage.JPG";


function LeaderImage({ src, alt }) {
    const loaded = useImageLoader(src);

    return (
        <div className={styles.imageWrapper}>

            {!loaded && (
                <Skeleton className={styles.imageSkeleton} />
            )}

            <img
                src={src}
                alt={alt}
                className={`${styles.leaderImage} ${loaded ? styles.imageLoaded : ""
                    }`}
            />

        </div>
    );
}


function Leadership() {

    const leaders = [
        {
            name: "Jeannette Murebwayire",
            role: "Chief Executive Officer",
            image: ceoImage,
            bio: "Providing strategic leadership and guiding the school's vision, growth and long-term development.",
        },
        {
            name: "Bwiza Samantha",
            role: "Principal",
            image: principalImage,
            bio: "Leading the day-to-day academic and pastoral life of the school while supporting students, teachers and families.",
        },

        {
            name: "Christian DieuMerci Ciringwi",
            role: "Academic Director",
            image: academicImage,
            bio: "Supporting teaching and learning and ensuring that students receive a high-quality international education.",
        },
    ];


    return (
        <>
            

            <main>

                {/* ==================================================
            HERO
        ================================================== */}

                <section className={styles.pageHero}>

                    <div className={styles.heroContent}>

                        <span>ABOUT HIGH GATE</span>

                        <h1>
                            Our Leadership
                        </h1>

                        <div className={styles.breadcrumb}>

                            <Link to="/">
                                Home
                            </Link>

                            <span>/</span>

                            <Link to="/who-we-are">
                                About Us
                            </Link>

                            <span>/</span>

                            <span>
                                Our Leadership
                            </span>

                        </div>

                    </div>

                </section>


                {/* ==================================================
            INTRODUCTION
        ================================================== */}

                <section className={styles.introduction}>

                    <div className={styles.container}>

                        <div className={styles.introContent}>

                            <span className={styles.sectionLabel}>
                                LEADING WITH PURPOSE
                            </span>

                            <h2>
                                People who help
                                <span> shape the High Gate experience.</span>
                            </h2>

                            <p>
                                At High Gate International Academy, strong
                                leadership is an important part of creating
                                a successful learning environment.
                            </p>

                            <p>
                                Our leadership team works alongside teachers,
                                students and families to build a school culture
                                centred on excellence, inclusion, responsibility
                                and continuous growth.
                            </p>

                        </div>

                        <div className={styles.introStatement}>

                            <span>
                                OUR APPROACH
                            </span>

                            <h3>
                                Leading a community,
                                not simply a school.
                            </h3>

                            <p>
                                We believe effective school leadership starts
                                with listening, collaboration and a genuine
                                commitment to the wellbeing and success of
                                every learner.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ==================================================
            LEADERS
        ================================================== */}

                <section className={styles.leadership}>

                    <div className={styles.container}>

                        <div className={styles.heading}>

                            <span className={styles.sectionLabel}>
                                OUR TEAM
                            </span>

                            <h2>
                                Meet Our Leadership
                            </h2>

                            <p>
                                Our leadership team brings together educational
                                experience, strategic thinking and a passion
                                for developing young people.
                            </p>

                        </div>


                        <div className={styles.leaderGrid}>

                            {leaders.map((leader) => (

                                <article
                                    key={leader.role}
                                    className={styles.leaderCard}
                                >

                                    <LeaderImage
                                        src={leader.image}
                                        alt={leader.name}
                                    />

                                    <div className={styles.leaderInfo}>

                                        <span>
                                            {leader.role}
                                        </span>

                                        <h3>
                                            {leader.name}
                                        </h3>

                                        <p>
                                            {leader.bio}
                                        </p>

                                    </div>

                                </article>

                            ))}

                        </div>

                    </div>

                </section>


                {/* ==================================================
            SCHOOL CULTURE
        ================================================== */}

                <section className={styles.culture}>

                    <div className={styles.container}>

                        <div className={styles.cultureContent}>

                            <span className={styles.sectionLabel}>
                                OUR CULTURE
                            </span>

                            <h2>
                                Leadership that puts
                                <span> learners first.</span>
                            </h2>

                            <p>
                                From academic achievement to personal
                                development, our leadership approach focuses
                                on creating the conditions in which students
                                can become confident, curious and responsible
                                individuals.
                            </p>

                            <div className={styles.points}>

                                <div>
                                    <strong>01</strong>
                                    <span>Student wellbeing</span>
                                </div>

                                <div>
                                    <strong>02</strong>
                                    <span>Academic excellence</span>
                                </div>

                                <div>
                                    <strong>03</strong>
                                    <span>Strong family partnerships</span>
                                </div>

                                <div>
                                    <strong>04</strong>
                                    <span>Continuous improvement</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==================================================
            CTA
        ================================================== */}

                <section className={styles.cta}>

                    <div className={styles.ctaContent}>

                        <span>
                            DISCOVER HIGH GATE
                        </span>

                        <h2>
                            See what makes our
                            <br />
                            school community special.
                        </h2>

                        <Link
                            to="/school-events"
                            className={styles.ctaButton}
                        >
                            Explore School Life

                            <ArrowRight size={18} />

                        </Link>

                    </div>

                </section>

            </main>

        
        </>
    );
}


export default Leadership;