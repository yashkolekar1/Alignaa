import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { siteContent } from "../data/content";

type FormKind = "patient" | "partner";
type FieldValues = Record<string, string | boolean>;
type FieldErrors = Record<string, string>;

const patientSuccess =
  "Thank you for your enquiry. The Alignaa support team will contact you to discuss your requirements and guide you through the next steps.";
const partnerSuccess =
  "Thank you for your interest in partnering with Alignaa. Our team will contact you to discuss the next steps.";
const failureMessage = "We could not send your enquiry. Please try again.";

const patientInitialValues: FieldValues = {
  fullName: "",
  mobile: "",
  ageGroup: "",
  city: "",
  pinCode: "",
  concern: "",
  email: "",
  message: "",
  consent: false,
  website: "",
};

const partnerInitialValues: FieldValues = {
  fullName: "",
  role: "",
  clinicName: "",
  mobile: "",
  email: "",
  city: "",
  pinCode: "",
  message: "",
  consent: false,
  website: "",
};

function validate(values: FieldValues, kind: FormKind): FieldErrors {
  const errors: FieldErrors = {};
  const value = (key: string) => String(values[key] ?? "").trim();
  const phone = value("mobile");
  const phoneDigits = phone.replace(/\D/g, "");

  if (!value("fullName")) errors.fullName = "Enter your full name.";
  if (kind === "partner" && !value("role")) errors.role = "Choose your role.";
  if (kind === "partner" && !value("clinicName")) errors.clinicName = "Enter your clinic or practice name.";
  if (!phone) {
    errors.mobile = "Enter your mobile number.";
  } else if (phone.startsWith("+")) {
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      errors.mobile = "Enter a valid number with country code.";
    }
  } else if (!/^\d{10}$/.test(phoneDigits)) {
    errors.mobile = "Enter a 10-digit Indian mobile number or include a country code.";
  }
  if (kind === "patient" && !value("ageGroup")) errors.ageGroup = "Choose your age group.";
  if (!value("city")) errors.city = "Enter your city.";
  if (!/^\d{6}$/.test(value("pinCode"))) errors.pinCode = "Enter a 6-digit PIN code.";
  if (kind === "patient" && !value("concern")) errors.concern = "Choose an option or select Not sure.";

  const email = value("email");
  if (kind === "partner" && !email) {
    errors.email = "Enter your email address.";
  } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (value("message").length > 1000) errors.message = "Keep your message within 1,000 characters.";
  if (!values.consent) errors.consent = "Consent is required before we can follow up.";

  return errors;
}

type EnquiryFormProps = {
  kind: FormKind;
};

export function EnquiryForm({ kind }: EnquiryFormProps) {
  const [values, setValues] = useState<FieldValues>(() =>
    kind === "patient" ? patientInitialValues : partnerInitialValues,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failure">("idle");
  const [failureDetail, setFailureDetail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const isPatient = kind === "patient";
  const emailHint = isPatient ? "Optional" : "Required for partner enquiries";

  const value = (key: string) => String(values[key] ?? "");
  const error = (key: string) => errors[key];
  const describedBy = (key: string, hintId?: string) =>
    [hintId, error(key) ? `${key}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = event.target;
    const nextValue = type === "checkbox"
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setValues((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      if (!current[name]) return current;
      const updated = { ...current };
      delete updated[name];
      return updated;
    });
    if (status === "failure") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(values, kind);
    setErrors(nextErrors);
    setFailureDetail("");
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      window.setTimeout(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    if (honeypotRef.current?.value) {
      setStatus("failure");
      setFailureDetail("Please review the form and try again.");
      return;
    }

    const endpoint = import.meta.env.VITE_ALIGNAA_FORM_ENDPOINT?.trim();
    if (!endpoint) {
      setStatus("failure");
      setFailureDetail("Enquiry delivery is not configured in this design draft.");
      return;
    }

    setStatus("sending");
    try {
      const submittedAt = new Date();
      const fields = Object.fromEntries(
        Object.entries(values)
          .filter(([key]) => key !== "website" && key !== "consent")
          .map(([key, fieldValue]) => [key, typeof fieldValue === "string" ? fieldValue.trim() : fieldValue]),
      );
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: isPatient ? "Alignaa Patient Enquiry" : "Alignaa Partner Enquiry",
          enquiryType: kind,
          submittedAt: submittedAt.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          sourcePage: `${window.location.pathname}${window.location.search}`,
          fields,
          consent: true,
          consentText: "I agree that the Alignaa team may contact me about this enquiry. I have read the Privacy Policy.",
        }),
      });
      if (!response.ok) throw new Error(`The delivery service returned ${response.status}.`);
      setStatus("success");
    } catch {
      setStatus("failure");
      setFailureDetail("The form service could not accept this enquiry. Your entries are still here; you can try again.");
    }
  };

  return (
    <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this field empty</label>
        <input
          ref={honeypotRef}
          id={`${kind}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value("website")}
          onChange={handleChange}
        />
      </div>

      {status === "success" ? (
        <div className="form-success" role="status" aria-live="polite">
          <span className="success-mark" aria-hidden="true">✓</span>
          <p>{isPatient ? patientSuccess : partnerSuccess}</p>
          {!isPatient && (
            <a className="button button-outline" href={siteContent.parentUrl} target="_blank" rel="noreferrer">
              Visit the Alignaa professional website
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor={`${kind}-fullName`}>Full name <span aria-hidden="true">*</span></label>
              <input
                id={`${kind}-fullName`}
                name="fullName"
                autoComplete="name"
                required
                value={value("fullName")}
                onChange={handleChange}
                aria-invalid={Boolean(error("fullName"))}
                aria-describedby={describedBy("fullName")}
              />
              {error("fullName") && <span id="fullName-error" className="field-error">{error("fullName")}</span>}
            </div>

            {!isPatient && (
              <div className="form-field">
                <label htmlFor="partner-role">Role <span aria-hidden="true">*</span></label>
                <select
                  id="partner-role"
                  name="role"
                  required
                  value={value("role")}
                  onChange={handleChange}
                  aria-invalid={Boolean(error("role"))}
                  aria-describedby={describedBy("role")}
                >
                  <option value="">Select your role</option>
                  <option>Dentist</option>
                  <option>Clinic owner</option>
                  <option>Other</option>
                </select>
                {error("role") && <span id="role-error" className="field-error">{error("role")}</span>}
              </div>
            )}

            {!isPatient && (
              <div className="form-field">
                <label htmlFor="partner-clinicName">Clinic or practice name <span aria-hidden="true">*</span></label>
                <input
                  id="partner-clinicName"
                  name="clinicName"
                  autoComplete="organization"
                  required
                  value={value("clinicName")}
                  onChange={handleChange}
                  aria-invalid={Boolean(error("clinicName"))}
                  aria-describedby={describedBy("clinicName")}
                />
                {error("clinicName") && <span id="clinicName-error" className="field-error">{error("clinicName")}</span>}
              </div>
            )}

            <div className="form-field">
              <label htmlFor={`${kind}-mobile`}>Mobile number <span aria-hidden="true">*</span></label>
              <input
                id={`${kind}-mobile`}
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10-digit number or +country code"
                required
                value={value("mobile")}
                onChange={handleChange}
                aria-invalid={Boolean(error("mobile"))}
                aria-describedby={describedBy("mobile", `${kind}-mobile-hint`)}
              />
              <span className="field-hint" id={`${kind}-mobile-hint`}>Indian 10-digit mobile number; add a country code for international enquiries.</span>
              {error("mobile") && <span id="mobile-error" className="field-error">{error("mobile")}</span>}
            </div>

            {isPatient && (
              <div className="form-field">
                <label htmlFor="patient-ageGroup">Age group <span aria-hidden="true">*</span></label>
                <select
                  id="patient-ageGroup"
                  name="ageGroup"
                  required
                  value={value("ageGroup")}
                  onChange={handleChange}
                  aria-invalid={Boolean(error("ageGroup"))}
                  aria-describedby={describedBy("ageGroup", "age-group-note")}
                >
                  <option value="">Select age group</option>
                  <option>Under 18</option>
                  <option>18–24</option>
                  <option>25–34</option>
                  <option>35–44</option>
                  <option>45 and above</option>
                </select>
                <span className="field-hint" id="age-group-note">Age options and guardian wording need client approval.</span>
                {error("ageGroup") && <span id="ageGroup-error" className="field-error">{error("ageGroup")}</span>}
              </div>
            )}

            <div className="form-field">
              <label htmlFor={`${kind}-city`}>City <span aria-hidden="true">*</span></label>
              <input
                id={`${kind}-city`}
                name="city"
                autoComplete="address-level2"
                required
                value={value("city")}
                onChange={handleChange}
                aria-invalid={Boolean(error("city"))}
                aria-describedby={describedBy("city")}
              />
              {error("city") && <span id="city-error" className="field-error">{error("city")}</span>}
            </div>

            <div className="form-field">
              <label htmlFor={`${kind}-pinCode`}>PIN code <span aria-hidden="true">*</span></label>
              <input
                id={`${kind}-pinCode`}
                name="pinCode"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                required
                value={value("pinCode")}
                onChange={handleChange}
                aria-invalid={Boolean(error("pinCode"))}
                aria-describedby={describedBy("pinCode", `${kind}-pin-hint`)}
              />
              <span className="field-hint" id={`${kind}-pin-hint`}>Enter a 6-digit Indian PIN code.</span>
              {error("pinCode") && <span id="pinCode-error" className="field-error">{error("pinCode")}</span>}
            </div>

            {isPatient && (
              <div className="form-field">
                <label htmlFor="patient-concern">Teeth concern <span aria-hidden="true">*</span></label>
                <select
                  id="patient-concern"
                  name="concern"
                  required
                  value={value("concern")}
                  onChange={handleChange}
                  aria-invalid={Boolean(error("concern"))}
                  aria-describedby={describedBy("concern")}
                >
                  <option value="">Select a concern</option>
                  <option>Spacing or gaps</option>
                  <option>Crowding</option>
                  <option>Forwardly placed teeth</option>
                  <option>Crossbite</option>
                  <option>Open bite</option>
                  <option>Deep bite</option>
                  <option>Not sure</option>
                  <option>General enquiry</option>
                </select>
                {error("concern") && <span id="concern-error" className="field-error">{error("concern")}</span>}
              </div>
            )}

            <div className="form-field">
              <label htmlFor={`${kind}-email`}>Email address {isPatient ? <span className="optional-label">(optional)</span> : <span aria-hidden="true">*</span>}</label>
              <input
                id={`${kind}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required={!isPatient}
                value={value("email")}
                onChange={handleChange}
                aria-invalid={Boolean(error("email"))}
                aria-describedby={describedBy("email", `${kind}-email-hint`)}
              />
              <span className="field-hint" id={`${kind}-email-hint`}>{emailHint}</span>
              {error("email") && <span id="email-error" className="field-error">{error("email")}</span>}
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor={`${kind}-message`}>Additional message <span className="optional-label">(optional)</span></label>
              <textarea
                id={`${kind}-message`}
                name="message"
                rows={4}
                maxLength={1000}
                value={value("message")}
                onChange={handleChange}
                aria-invalid={Boolean(error("message"))}
                aria-describedby={describedBy("message", `${kind}-message-hint`)}
              />
              <span className="field-hint" id={`${kind}-message-hint`}>Do not include clinical files, photographs or sensitive health details. Up to 1,000 characters.</span>
              {error("message") && <span id="message-error" className="field-error">{error("message")}</span>}
            </div>
          </div>

          <div className="consent-field">
            <input
              id={`${kind}-consent`}
              name="consent"
              type="checkbox"
              required
              checked={Boolean(values.consent)}
              onChange={handleChange}
              aria-invalid={Boolean(error("consent"))}
              aria-describedby={describedBy("consent")}
            />
            <label htmlFor={`${kind}-consent`}>
              I agree that the Alignaa team may contact me about this enquiry. I have read the <a href="/privacy-policy/">Privacy Policy</a>.
            </label>
          </div>
          {error("consent") && <span id="consent-error" className="field-error consent-error">{error("consent")}</span>}

          <div className="form-submit-row">
            <button className="button" type="submit" disabled={status === "sending"}>
              {status === "sending" ? <><span className="spinner" aria-hidden="true" /> Sending…</> : isPatient ? "Send enquiry" : "Send partner enquiry"}
            </button>
            <span className="required-note">* Required fields</span>
          </div>

          {status === "failure" && (
            <div className="form-error-summary" role="alert" aria-live="assertive">
              <strong>{failureMessage}</strong>
              {failureDetail && <span>{failureDetail}</span>}
            </div>
          )}
        </>
      )}
    </form>
  );
}
