import styles from "./Footer.module.css";

import {
    MapPin,
    Phone,
    Mail,
    ArrowUp,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";


function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <footer className={styles.footer}>

            {/* ==================================================
                MAIN FOOTER
            ================================================== */}

            <div className={styles.container}>


                {/* ==================================================
                    SCHOOL INFORMATION
                ================================================== */}

                <div className={styles.schoolInfo}>

                    <Link
                        to="/"
                        className={styles.logoLink}
                    >

                        <img
                            src={logo}
                            alt="High Gate International Academy"
                            className={styles.logo}
                        />

                    </Link>


                    <p>
                        Inspiring students to learn, grow,
                        explore and prepare for a bright future.
                    </p>


                    {/* CONTACT INFORMATION */}

                    <div className={styles.contactInfo}>


                        {/* ADDRESS */}

                        <div className={styles.contactItem}>

                            <MapPin size={18} />

                            <span>
                                KG 669 St, Gasabo District,
                                Gisozi, Kigali, Rwanda
                            </span>

                        </div>


                        {/* PHONE */}

                        <a
                            href="tel:+250798980340"
                            className={styles.contactItem}
                        >

                            <Phone size={18} />

                            <span>
                                +250 79 89 80 340
                            </span>

                        </a>


                        {/* EMAIL */}

                        <a
                            href="mailto:info@highgateinternational.com"
                            className={styles.contactItem}
                        >

                            <Mail size={18} />

                            <span>
                                info@highgateinternational.com
                            </span>

                        </a>

                    </div>

                </div>


                {/* ==================================================
                    QUICK LINKS
                ================================================== */}

                <div className={styles.column}>

                    <h3>
                        Quick Links
                    </h3>


                    <ul>

                        {/* HOME */}

                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>


                        {/* ABOUT */}

                        <li>
                            <Link to="/who-we-are">
                                About Us
                            </Link>
                        </li>


                        {/* ACADEMICS */}

                        <li>
                            <Link to="/curriculum">
                                Academics
                            </Link>
                        </li>


                        {/* ADMISSIONS */}

                        <li>
                            <Link to="/admissions/apply">
                                Admissions
                            </Link>
                        </li>


                        {/* SCHOOL CALENDAR */}

                        <li>
                            <Link to="/admissions/calendar">
                                School Calendar
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* ==================================================
                    SCHOOL LIFE
                ================================================== */}

                <div className={styles.column}>

                    <h3>
                        School Life
                    </h3>


                    <ul>

                        {/* SCHOOL EVENTS */}

                        <li>
                            <Link to="/school-events">
                                School Events
                            </Link>
                        </li>


                        {/* SCHOOL ACTIVITIES */}

                        <li>
                            <Link to="/school-activities">
                                School Activities
                            </Link>
                        </li>


                        {/* SCHOOL CALENDAR */}

                        <li>
                            <Link to="/admissions/calendar">
                                School Calendar
                            </Link>
                        </li>


                        {/* TUITION FEES */}

                        <li>
                            <Link to="/admissions/fees">
                                Tuition Fees
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* ==================================================
                    SOCIAL / CONNECT
                ================================================== */}

                <div className={styles.column}>

                    <h3>
                        Connect With Us
                    </h3>


                    <p className={styles.socialText}>
                        Follow High Gate International Academy
                        for the latest news, activities and
                        school updates.
                    </p>


                    {/* SOCIAL MEDIA */}

                    <div className={styles.socials}>


                        {/* FACEBOOK */}

                        <a
                            href="https://www.facebook.com/highgateinternational"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF />
                        </a>


                        {/* INSTAGRAM */}

                        <a
                            href="https://www.instagram.com/high_gate_international/?hl=en"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>


                        {/* YOUTUBE */}

                        <a
                            href="https://www.youtube.com/@HIGHGATE-v2n"
                            aria-label="YouTube"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaYoutube />
                        </a>


                        {/* LINKEDIN */}

                        <a
                            href="https://www.linkedin.com/company/high-gate-international-academy/?viewAsMember=true"
                            aria-label="LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedinIn />
                        </a>

                    </div>


                    {/* ==================================================
                        APPLY CTA
                    ================================================== */}

                    <Link
                        to="/admissions/apply"
                        className={styles.applyButton}
                    >
                        Apply Now
                    </Link>

                </div>

            </div>


            {/* ==================================================
                BOTTOM FOOTER
            ================================================== */}

            <div className={styles.bottomFooter}>

                <div className={styles.bottomContainer}>


                    {/* COPYRIGHT */}

                    <p>
                        © {new Date().getFullYear()} High Gate
                        International Academy. All rights reserved.
                    </p>


                    {/* BOTTOM LINKS */}

                    <div className={styles.bottomLinks}>

                        {/* Privacy and Terms are intentionally
                            removed until their pages/routes exist. */}

                        <Link to="/who-we-are">
                            About High Gate
                        </Link>

                        <Link to="/contact">
                            Contact Us
                        </Link>

                    </div>


                    {/* BACK TO TOP */}

                    <button
                        type="button"
                        className={styles.backToTop}
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >

                        <ArrowUp size={18} />

                    </button>

                </div>

            </div>

        </footer>
    );
}


export default Footer;