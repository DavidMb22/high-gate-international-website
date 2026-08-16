import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      nationality,
      address,
      section,
      image,
    } = req.body;

    // Validate required information
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !nationality ||
      !address ||
      !section
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    const applicationReference = `HG-${Date.now()}`;

    const emailHtml = `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 700px;
        margin: 0 auto;
        color: #183f52;
      ">

        <div style="
          background: #0b4c69;
          padding: 30px;
          color: white;
        ">
          <h1 style="margin: 0 0 8px;">
            New Student Enrollment Application
          </h1>

          <p style="margin: 0;">
            High Gate International Academy
          </p>
        </div>

        <div style="padding: 30px;">

          <p>
            A new student enrollment application has been
            submitted through the High Gate International
            Academy website.
          </p>

          <div style="
            background: #f5f8f9;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #c88a00;
          ">
            <p style="
              margin: 0 0 6px;
              color: #65757d;
              font-size: 12px;
            ">
              APPLICATION REFERENCE
            </p>

            <strong style="
              font-size: 20px;
              color: #0b4c69;
            ">
              ${applicationReference}
            </strong>
          </div>

          <h2 style="color: #0b4c69;">
            Student Information
          </h2>

          <table style="
            width: 100%;
            border-collapse: collapse;
          ">

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                First Name
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(firstName)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Middle Name
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(middleName)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Last Name
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(lastName)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Gender
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(gender)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Date of Birth
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(dateOfBirth)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Nationality
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(nationality)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Address
              </td>

              <td style="
                padding: 10px 0;
                white-space: pre-line;
              ">
                ${escapeHtml(address)}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Section
              </td>

              <td style="padding: 10px 0;">
                ${escapeHtml(section)}
              </td>
            </tr>

          </table>

          <hr style="
            margin: 30px 0;
            border: none;
            border-top: 1px solid #ddd;
          " />

          <p style="
            color: #65757d;
            font-size: 13px;
          ">
            The child's picture is attached to this email.
          </p>

          <p style="
            color: #65757d;
            font-size: 13px;
          ">
            This application was submitted through the
            High Gate International Academy website.
          </p>

        </div>
      </div>
    `;

    const emailData = {
      from: "High Gate Admissions <admissions@highgateinternational.com>",
      to: ["highgateacadem@gmail.com"],
      subject: `New Enrollment Application — ${firstName} ${lastName}`,
      html: emailHtml,
    };

    // Attach child's picture
    if (image?.content) {
      emailData.attachments = [
        {
          filename: image.filename || "child-picture.jpg",
          content: image.content,
        },
      ];
    }

    const { data, error } =
      await resend.emails.send(emailData);

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to send the application.",
      });
    }

    return res.status(200).json({
      success: true,
      reference: applicationReference,
      emailId: data?.id,
    });

  } catch (error) {
    console.error("Application error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the application.",
    });
  }
}


// Prevent HTML from being injected into the email
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}