import { useState } from "react";
import styles from "./ApplyNow.module.css";

const initialFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    section: "",
    childrenPicture: null,
};

const steps = [
    {
        number: 1,
        title: "Student",
    },
    {
        number: 2,
        title: "Details",
    },
    {
        number: 3,
        title: "Programme",
    },
    {
        number: 4,
        title: "Photo",
    },
    {
        number: 5,
        title: "Review",
    },
];

async function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const image = new Image();

            image.onload = () => {
                const maxWidth = 1200;
                const maxHeight = 1200;

                let width = image.width;
                let height = image.height;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(
                        maxWidth / width,
                        maxHeight / height
                    );

                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");

                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(
                                new Error("Unable to process the image.")
                            );
                            return;
                        }

                        resolve(blob);
                    },
                    "image/jpeg",
                    0.8
                );
            };

            image.onerror = () => {
                reject(
                    new Error("Unable to read the image.")
                );
            };

            image.src = event.target.result;
        };

        reader.onerror = () => {
            reject(
                new Error("Unable to read the selected file.")
            );
        };

        reader.readAsDataURL(file);
    });
}

function ApplyNow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (name, value) => {
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors({
                childrenPicture: "Please upload an image file.",
            });
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setErrors({
                childrenPicture:
                    "The image must be smaller than 10 MB.",
            });
            return;
        }

        updateField("childrenPicture", file);

        setPreview(URL.createObjectURL(file));
    };

    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required.";
            }

            if (!formData.middleName.trim()) {
                newErrors.middleName = "Middle name is required.";
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Surname / last name is required.";
            }

            if (!formData.gender) {
                newErrors.gender = "Please select a gender.";
            }

            if (!formData.dateOfBirth) {
                newErrors.dateOfBirth =
                    "Date of birth is required.";
            }
        }

        if (currentStep === 2) {
            if (!formData.nationality.trim()) {
                newErrors.nationality =
                    "Nationality is required.";
            }

            if (!formData.address.trim()) {
                newErrors.address = "Address is required.";
            }
        }

        if (currentStep === 3) {
            if (!formData.section) {
                newErrors.section =
                    "Please select the section you are applying for.";
            }
        }

        if (currentStep === 4) {
            if (!formData.childrenPicture) {
                newErrors.childrenPicture =
                    "Please upload the child's picture.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        if (currentStep < 5) {
            setCurrentStep((previous) => previous + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((previous) => previous - 1);

            setErrors({});

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateStep()) return;

        setErrors({});

        try {
            const compressedImage = await compressImage(
                formData.childrenPicture
            );

            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    const dataUrl = reader.result;

                    const base64Content =
                        dataUrl.split(",")[1];

                    const response = await fetch(
                        "/api/applications",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                            },

                            body: JSON.stringify({
                                firstName: formData.firstName,
                                middleName: formData.middleName,
                                lastName: formData.lastName,
                                gender: formData.gender,
                                dateOfBirth: formData.dateOfBirth,
                                nationality: formData.nationality,
                                address: formData.address,
                                section: formData.section,

                                image: {
                                    filename: `${formData.firstName
                                        }-${formData.lastName}-photo.jpg`,
                                    content: base64Content,
                                },
                            }),
                        }
                    );

                    const result = await response.json();

                    if (!response.ok || !result.success) {
                        throw new Error(
                            result.message ||
                            "Unable to submit application."
                        );
                    }

                    setSubmitted(true);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });

                } catch (error) {
                    console.error(error);

                    setSubmitted(true);
                    setIsSubmitting(false);

                    setErrors({
                        submit:
                            "We could not submit your application. Please try again.",
                    });
                }
            };

            reader.readAsDataURL(compressedImage);

        } catch (error) {
            console.error(error);

            setErrors({
                submit:
                    "We could not process the child's picture. Please try another image.",
            });
        }
    };

    const resetApplication = () => {
        setCurrentStep(1);
        setFormData(initialFormData);
        setPreview(null);
        setErrors({});
        setSubmitted(false);
    };

    if (submitted) {
        return (
            <main className={styles.page}>
                <section className={styles.successSection}>
                    <div className={styles.successCard}>

                        <div className={styles.successIcon}>
                            ✓
                        </div>

                        <span className={styles.eyebrow}>
                            APPLICATION RECEIVED
                        </span>

                        <h1>
                            Thank You for Applying
                        </h1>

                        <p>
                            Your child's enrollment application has
                            been successfully received by High Gate
                            International Academy.
                        </p>

                        <p>
                            Our admissions team will review the
                            information provided and contact you
                            regarding the next steps.
                        </p>

                        <div className={styles.referenceBox}>
                            <span>APPLICATION STATUS</span>
                            <strong>Received</strong>
                        </div>

                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={resetApplication}
                        >
                            Submit Another Application
                        </button>

                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.page}>

            {/* HERO */}

            <section className={styles.hero}>
                <div className={styles.heroContent}>

                    <span className={styles.eyebrow}>
                        ADMISSIONS
                    </span>

                    <h1>
                        Student Enrollment
                        Form
                    </h1>

                    <p>
                        Begin your child's journey at High Gate
                        International Academy.
                    </p>

                </div>
            </section>


            {/* FORM */}

            <section className={styles.formSection}>

                <div className={styles.formContainer}>

                    {/* FORM HEADER */}

                    <div className={styles.formHeader}>

                        <div className={styles.formBrand}>

                            <div className={styles.brandMark}>
                                HG
                            </div>

                            <div>
                                <strong>
                                    HIGH GATE
                                </strong>

                                <span>
                                    INTERNATIONAL ACADEMY
                                </span>
                            </div>

                        </div>

                        <span className={styles.formYear}>
                            2026–2027
                        </span>

                    </div>


                    {/* INTRODUCTION */}

                    <div className={styles.introduction}>

                        <h2>
                            Student Enrollment Form
                        </h2>

                        <p>
                            Dear Parents,
                        </p>

                        <p>
                            We are delighted to invite you to register
                            your children at High Gate International
                            Academy School. To ensure a seamless
                            enrollment process, kindly complete the form
                            below.
                        </p>

                        <p>
                            This form collects essential information
                            about your child to support the registration
                            process. Please provide accurate and
                            complete information.
                        </p>

                        <p className={styles.requiredNote}>
                            * Indicates required question
                        </p>

                    </div>


                    {/* PROGRESS */}

                    <div className={styles.progressWrapper}>

                        <div className={styles.progressSteps}>

                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className={`${styles.progressStep} ${currentStep >= step.number
                                        ? styles.activeStep
                                        : ""
                                        } ${currentStep === step.number
                                            ? styles.currentStep
                                            : ""
                                        }`}
                                >

                                    <div className={styles.stepCircle}>
                                        {step.number}
                                    </div>

                                    <span>
                                        {step.title}
                                    </span>

                                </div>
                            ))}

                        </div>

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${((currentStep - 1) / 4) * 100
                                        }%`,
                                }}
                            />
                        </div>

                    </div>


                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >

                        {/* STEP 1 */}

                        {currentStep === 1 && (
                            <div className={styles.stepContent}>

                                <div className={styles.stepHeader}>
                                    <span>STEP 01</span>

                                    <h2>
                                        Student Information
                                    </h2>

                                    <p>
                                        Tell us about the student applying
                                        to High Gate.
                                    </p>
                                </div>


                                <div className={styles.fieldGrid}>

                                    <div className={styles.formCard}>

                                        <label htmlFor="firstName">
                                            Given / First Name
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(event) =>
                                                updateField(
                                                    "firstName",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter first name"
                                        />

                                        {errors.firstName && (
                                            <small className={styles.error}>
                                                {errors.firstName}
                                            </small>
                                        )}

                                    </div>


                                    <div className={styles.formCard}>

                                        <label htmlFor="middleName">
                                            Middle Name
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="middleName"
                                            type="text"
                                            value={formData.middleName}
                                            onChange={(event) =>
                                                updateField(
                                                    "middleName",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter middle name"
                                        />

                                        {errors.middleName && (
                                            <small className={styles.error}>
                                                {errors.middleName}
                                            </small>
                                        )}

                                    </div>

                                </div>


                                <div className={styles.formCard}>

                                    <label htmlFor="lastName">
                                        Surname / Last Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(event) =>
                                            updateField(
                                                "lastName",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter surname / last name"
                                    />

                                    {errors.lastName && (
                                        <small className={styles.error}>
                                            {errors.lastName}
                                        </small>
                                    )}

                                </div>


                                <div className={styles.formCard}>

                                    <fieldset>

                                        <legend>
                                            Gender <span>*</span>
                                        </legend>

                                        <div className={styles.optionGrid}>

                                            <label
                                                className={`${styles.optionCard} ${formData.gender === "Male"
                                                    ? styles.selectedOption
                                                    : ""
                                                    }`}
                                            >

                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="Male"
                                                    checked={
                                                        formData.gender === "Male"
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "gender",
                                                            event.target.value
                                                        )
                                                    }
                                                />

                                                <span>Male</span>

                                            </label>


                                            <label
                                                className={`${styles.optionCard} ${formData.gender === "Female"
                                                    ? styles.selectedOption
                                                    : ""
                                                    }`}
                                            >

                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="Female"
                                                    checked={
                                                        formData.gender === "Female"
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "gender",
                                                            event.target.value
                                                        )
                                                    }
                                                />

                                                <span>Female</span>

                                            </label>

                                        </div>

                                    </fieldset>

                                    {errors.gender && (
                                        <small className={styles.error}>
                                            {errors.gender}
                                        </small>
                                    )}

                                </div>


                                <div className={styles.formCard}>

                                    <label htmlFor="dateOfBirth">
                                        Date of Birth
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(event) =>
                                            updateField(
                                                "dateOfBirth",
                                                event.target.value
                                            )
                                        }
                                    />

                                    {errors.dateOfBirth && (
                                        <small className={styles.error}>
                                            {errors.dateOfBirth}
                                        </small>
                                    )}

                                </div>

                            </div>
                        )}


                        {/* STEP 2 */}

                        {currentStep === 2 && (
                            <div className={styles.stepContent}>

                                <div className={styles.stepHeader}>
                                    <span>STEP 02</span>

                                    <h2>
                                        Student Details
                                    </h2>

                                    <p>
                                        Provide the student's nationality
                                        and current address.
                                    </p>
                                </div>


                                <div className={styles.formCard}>

                                    <label htmlFor="nationality">
                                        Nationality
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="nationality"
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(event) =>
                                            updateField(
                                                "nationality",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter nationality"
                                    />

                                    {errors.nationality && (
                                        <small className={styles.error}>
                                            {errors.nationality}
                                        </small>
                                    )}

                                </div>


                                <div className={styles.formCard}>

                                    <label htmlFor="address">
                                        Address
                                        <span>*</span>
                                    </label>

                                    <textarea
                                        id="address"
                                        rows="6"
                                        value={formData.address}
                                        onChange={(event) =>
                                            updateField(
                                                "address",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter residential address"
                                    />

                                    {errors.address && (
                                        <small className={styles.error}>
                                            {errors.address}
                                        </small>
                                    )}

                                </div>

                            </div>
                        )}


                        {/* STEP 3 */}

                        {currentStep === 3 && (
                            <div className={styles.stepContent}>

                                <div className={styles.stepHeader}>
                                    <span>STEP 03</span>

                                    <h2>
                                        Select a Section
                                    </h2>

                                    <p>
                                        Choose the section for which you are
                                        applying.
                                    </p>
                                </div>


                                <div className={styles.sectionOptions}>

                                    {[
                                        "Daycare",
                                        "Nursery",
                                        "Primary",
                                        "Lower Secondary",
                                    ].map((section) => (
                                        <label
                                            key={section}
                                            className={`${styles.sectionOption} ${formData.section === section
                                                ? styles.selectedSection
                                                : ""
                                                }`}
                                        >

                                            <input
                                                type="radio"
                                                name="section"
                                                value={section}
                                                checked={
                                                    formData.section === section
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "section",
                                                        event.target.value
                                                    )
                                                }
                                            />

                                            <div>
                                                <strong>
                                                    {section}
                                                </strong>

                                                <span>
                                                    Apply for {section}
                                                </span>
                                            </div>

                                            <span className={styles.optionArrow}>
                                                →
                                            </span>

                                        </label>
                                    ))}

                                </div>

                                {errors.section && (
                                    <small className={styles.error}>
                                        {errors.section}
                                    </small>
                                )}

                            </div>
                        )}


                        {/* STEP 4 */}

                        {currentStep === 4 && (
                            <div className={styles.stepContent}>

                                <div className={styles.stepHeader}>
                                    <span>STEP 04</span>

                                    <h2>
                                        Child's Picture
                                    </h2>

                                    <p>
                                        Upload a recent picture of the child.
                                    </p>
                                </div>


                                <div className={styles.uploadCard}>

                                    <div className={styles.uploadIcon}>
                                        ↑
                                    </div>

                                    <h3>
                                        Upload Child's Picture
                                    </h3>

                                    <p>
                                        Image files only · Maximum 10 MB
                                    </p>

                                    <input
                                        id="childrenPicture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    <label
                                        htmlFor="childrenPicture"
                                        className={styles.uploadButton}
                                    >
                                        Choose Image
                                    </label>

                                    {formData.childrenPicture && (
                                        <p className={styles.fileName}>
                                            {formData.childrenPicture.name}
                                        </p>
                                    )}

                                </div>


                                {preview && (
                                    <div className={styles.previewWrapper}>

                                        <p>
                                            Image Preview
                                        </p>

                                        <div className={styles.preview}>
                                            <img
                                                src={preview}
                                                alt="Child preview"
                                            />
                                        </div>

                                    </div>
                                )}

                                {errors.childrenPicture && (
                                    <small className={styles.error}>
                                        {errors.childrenPicture}
                                    </small>
                                )}

                            </div>
                        )}


                        {/* STEP 5 */}

                        {currentStep === 5 && (
                            <div className={styles.stepContent}>

                                <div className={styles.stepHeader}>
                                    <span>STEP 05</span>

                                    <h2>
                                        Review Your Application
                                    </h2>

                                    <p>
                                        Please check the information below
                                        before submitting.
                                    </p>
                                </div>


                                <div className={styles.reviewCard}>

                                    <div className={styles.reviewHeader}>
                                        <span>
                                            STUDENT INFORMATION
                                        </span>
                                    </div>

                                    <div className={styles.reviewGrid}>

                                        <div>
                                            <small>
                                                Given / First Name
                                            </small>

                                            <strong>
                                                {formData.firstName}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Middle Name
                                            </small>

                                            <strong>
                                                {formData.middleName}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Surname / Last Name
                                            </small>

                                            <strong>
                                                {formData.lastName}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Gender
                                            </small>

                                            <strong>
                                                {formData.gender}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Date of Birth
                                            </small>

                                            <strong>
                                                {formData.dateOfBirth}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Nationality
                                            </small>

                                            <strong>
                                                {formData.nationality}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                <div className={styles.reviewCard}>

                                    <div className={styles.reviewHeader}>
                                        <span>
                                            CONTACT DETAILS
                                        </span>
                                    </div>

                                    <div className={styles.reviewSingle}>
                                        <small>
                                            Address
                                        </small>

                                        <strong>
                                            {formData.address}
                                        </strong>
                                    </div>

                                </div>


                                <div className={styles.reviewCard}>

                                    <div className={styles.reviewHeader}>
                                        <span>
                                            APPLICATION
                                        </span>
                                    </div>

                                    <div className={styles.reviewGrid}>

                                        <div>
                                            <small>
                                                Selected Section
                                            </small>

                                            <strong>
                                                {formData.section}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Child's Picture
                                            </small>

                                            <strong>
                                                {formData.childrenPicture?.name}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                <div className={styles.confirmationBox}>

                                    <span>
                                        ✓
                                    </span>

                                    <p>
                                        Please make sure all information is
                                        correct before submitting your
                                        application.
                                    </p>

                                </div>

                            </div>
                        )}


                        {/* NAVIGATION */}

                        <div className={styles.navigation}>

                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    className={styles.previousButton}
                                    onClick={handlePrevious}
                                >
                                    ← Previous
                                </button>
                            ) : (
                                <span />
                            )}


                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    className={styles.nextButton}
                                    onClick={handleNext}
                                >
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </button>

                            )}

                            {errors.submit && (
                                <small className={styles.error}>
                                    {errors.submit}
                                </small>
                            )}

                        </div>

                    </form>

                </div>

            </section>

        </main>
    );
}

export default ApplyNow;