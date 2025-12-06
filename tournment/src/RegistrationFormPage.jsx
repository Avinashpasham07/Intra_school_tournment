import React, { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import NavBar from "./NavBar";

const RegistrationFormPage = () => {
  const formRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const saveValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const SimpleInput = ({ name, placeholder }) => (
    <input
      name={name}
      defaultValue={formValues[name] || ""}
      placeholder={placeholder}
      onBlur={(e) => saveValue(name, e.target.value)}
      className="w-full bg-transparent text-white font-mono text-sm border-b border-white/10 
                 focus:border-red-600 focus:outline-none py-1 placeholder-white/20"
    />
  );

  // ---------------------------------------------------
  // HANDLE FORM SUBMISSION
  // ---------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const formEl = formRef.current;
    const formDataObj = {};

    new FormData(formEl).forEach((value, key) => {
      formDataObj[key] = value;
    });

    const requiredFields = [
      "participantName",
      "fatherName",
      "motherName",
      "schoolName",
      "institutionAddress",
      "institutionPhone",
      "dobDD",
      "dobMM",
      "dobYYYY",
      "gender",
      "masterName",
      "district",
    ];

    const consentChecks = ["consent1", "consent2", "consent3", "consent4"];

    const missing = [];

    requiredFields.forEach((key) => {
      if (!formDataObj[key] || formDataObj[key].trim() === "") missing.push(key);
    });

    consentChecks.forEach((key) => {
      if (!formDataObj[key]) missing.push(key);
    });

    if (missing.length > 0) {
      alert("Please fill the required fields: " + missing.join(", "));
      return;
    }

    try {
      setSubmitting(true);

      const backendURL =
        window.location.hostname === "localhost"
          ? "http://localhost:4000/api/submit"
          : "https://intra-school-tournment.onrender.com/api/submit";

      const resp = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      });

      const result = await resp.json();

      if (!result.ok) {
        alert("Submission failed: " + result.error);
        setSubmitting(false);
        return;
      }

      alert(
        `Form submitted successfully!\nID: ${result.id}\nPlease pay the fee to your Master.`
      );

      formEl.reset();
      setFormValues({});
    } catch (err) {
      alert("Network error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------
  // RENDER UI
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),
        linear-gradient(to_bottom,#80808010_1px,transparent_1px)]
        bg-[size:24px_24px]"
      />

      <NavBar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="container mx-auto px-4 pt-32 relative z-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/20 shadow-2xl"
        >
          {/* Top Gradient Line */}
          <div className="h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>

          {/* HEADER */}
          <section className="p-6 border-b border-white/20">
            <h2 className="text-center text-red-500 font-bold uppercase">
              Inter School Karate Tournament Championship 2025 - 2026
            </h2>
            <p className="text-[10px] text-center text-slate-500 uppercase">
              JKAI Medchal District Karate-Do Association
            </p>
            <p className="text-[10px] text-center text-slate-500 uppercase">
              TSKA | KIO Affiliated | Govt. of India (MOS&Y)
            </p>

            <h1 className="text-center text-3xl font-black italic mt-2">
              Certificate of Eligibility
            </h1>

            <div className="mt-6">
              <label className="text-slate-400 uppercase text-sm">State:</label>
              <div className="font-bold text-white border-b border-white/20">
                Telangana
              </div>

              <label className="text-slate-400 uppercase text-sm mt-4 block">
                District:
              </label>
              <div className="font-bold text-white border-b border-white/20">
                Medchal
              </div>
              <input type="hidden" name="district" value="Medchal" />
            </div>
          </section>

          {/* PERSONAL DETAILS */}
          <section className="divide-y divide-white/10">
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Participant Name
              </label>
              <SimpleInput name="participantName" placeholder="FULL NAME" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Father's Name
              </label>
              <SimpleInput name="fatherName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Mother's Name
              </label>
              <SimpleInput name="motherName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Date of Birth
              </label>
              <div className="flex gap-2">
                <SimpleInput name="dobDD" placeholder="DD" />
                <SimpleInput name="dobMM" placeholder="MM" />
                <SimpleInput name="dobYYYY" placeholder="YYYY" />
              </div>
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Gender
              </label>
              <SimpleInput name="gender" placeholder="M / F" />
            </div>
          </section>

          {/* SCHOOL DETAILS */}
          <section className="divide-y divide-white/10">
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                School Name
              </label>
              <SimpleInput name="schoolName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                School Address
              </label>
              <SimpleInput name="institutionAddress" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                School Contact
              </label>
              <SimpleInput name="institutionPhone" />
            </div>
          </section>

          {/* MASTER */}
          <section className="p-4 border-t border-white/10">
            <label className="text-[10px] text-slate-400 uppercase">
              Master Name
            </label>
            <SimpleInput name="masterName" />
          </section>

          {/* CONSENT SECTION */}
          <section className="p-6 border-t border-white/10 space-y-4 bg-black/20">
            <p className="text-red-500 font-bold uppercase text-sm">
              Consent & Liability Declaration
            </p>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent1"
                className="mt-1 w-4 h-4 accent-red-600"
              />
              <span className="text-white text-sm leading-tight">
                I/We hereby give consent for the student to participate in the
                Karate Tournament. The student agrees to follow all rules and
                instructions.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent2"
                className="mt-1 w-4 h-4 accent-red-600"
              />
              <span className="text-white text-sm leading-tight">
                I, the parent/guardian, grant full consent for my child to
                participate, understanding the physical nature of the sport.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent3"
                className="mt-1 w-4 h-4 accent-red-600"
              />
              <span className="text-white text-sm leading-tight">
                The organizers, coaches, referees, and officials are not liable
                for any injury, accident, loss, or damage.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent4"
                className="mt-1 w-4 h-4 accent-red-600"
              />
              <span className="text-white text-sm leading-tight">
                I/We understand basic first aid is provided and medical expenses
                are not covered.
              </span>
            </label>
          </section>

          {/* SUBMIT BUTTON */}
          <section className="p-4 bg-red-600 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center gap-2 font-black uppercase text-black hover:text-white 
                ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Submitting..." : "Submit For Verification"}
              <ChevronRight />
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};

export default RegistrationFormPage;
