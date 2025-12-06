import React, { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import NavBar from "./NavBar";

const RegistrationFormPage = () => {
  const formRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Store input values
  const [formValues, setFormValues] = useState({});

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save input value
  const saveValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FIXED CONTROLLED INPUT (always updates correctly)
  const SimpleInput = ({ name, placeholder }) => (
    <input
      name={name}
      placeholder={placeholder}
      value={formValues[name] || ""}           // controlled value
      onChange={(e) => saveValue(name, e.target.value)} // updates while typing
      className="w-full bg-transparent text-white font-mono text-sm border-b border-white/10 
                focus:border-red-600 focus:outline-none py-1 placeholder-white/20"
    />
  );

  // ---------------------------------------
  // FORM SUBMIT HANDLER
  // ---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const data = { ...formValues };

    // REQUIRED FIELDS
    const required = [
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

    const missing = required.filter(
      (k) => !data[k] || data[k].trim() === ""
    );

    // Checkbox validations
    ["consent1", "consent2", "consent3", "consent4"].forEach((c) => {
      if (!data[c]) missing.push(c);
    });

    if (missing.length > 0) {
      alert("Please complete: " + missing.join(", "));
      return;
    }

    // Select correct backend
    const backendURL =
      window.location.hostname === "localhost"
        ? "http://localhost:4000/api/submit"
        : "https://intra-school-tournment.onrender.com/api/submit";

    try {
      setSubmitting(true);

      const resp = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await resp.json();

      if (!result.ok) {
        alert("Submission failed: " + result.error);
        return;
      }

      alert(`Form submitted successfully!\nID: ${result.id}`);

      formRef.current.reset();
      setFormValues({});
    } catch (err) {
      alert("Network error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------
  // RENDER UI
  // ---------------------------------------
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 overflow-x-hidden">

      <NavBar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="container mx-auto px-4 pt-32 relative">

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/20 shadow-2xl"
        >
          {/* Top red border */}
          <div className="h-1 bg-gradient-to-r from-red-600 to-orange-500" />

          {/* HEADER */}
          <section className="p-6 border-b border-white/20">
            <h2 className="text-center text-red-500 font-bold uppercase">
              Inter School Karate Championship 2025 - 2026
            </h2>

            <p className="text-center text-[10px] text-slate-400 uppercase">
              JKAI Medchal District Karate-Do Association
            </p>

            <p className="text-center text-[10px] text-slate-400 uppercase">
              TSKA | KIO Affiliated | Govt. of India
            </p>

            <h1 className="text-center text-3xl font-black italic mt-2">
              Certificate of Eligibility
            </h1>

            <div className="mt-6">
              <label className="text-slate-400 text-sm">State:</label>
              <div className="font-bold border-b border-white/20">Telangana</div>

              <label className="text-slate-400 text-sm mt-4 block">District:</label>
              <div className="font-bold border-b border-white/20">Medchal-Malkajgiri</div>

              <input type="hidden" name="district" value="Medchal-Malkajgiri" />
            </div>
          </section>

          {/* PERSONAL DETAILS */}
          <section className="divide-y divide-white/10">
            <div className="p-4"><label className="label">Participant Name</label><SimpleInput name="participantName" /></div>
            <div className="p-4"><label className="label">Father's Name</label><SimpleInput name="fatherName" /></div>
            <div className="p-4"><label className="label">Mother's Name</label><SimpleInput name="motherName" /></div>

            <div className="p-4">
              <label className="label">Date of Birth</label>
              <div className="flex gap-2">
                <SimpleInput name="dobDD" placeholder="DD" />
                <SimpleInput name="dobMM" placeholder="MM" />
                <SimpleInput name="dobYYYY" placeholder="YYYY" />
              </div>
            </div>

            <div className="p-4">
              <label className="label">Gender</label>
              <SimpleInput name="gender" placeholder="M / F" />
            </div>
          </section>

          {/* SCHOOL DETAILS */}
          <section className="divide-y divide-white/10">
            <div className="p-4"><label className="label">School Name</label><SimpleInput name="schoolName" /></div>
            <div className="p-4"><label className="label">School Address</label><SimpleInput name="institutionAddress" /></div>
            <div className="p-4"><label className="label">School Contact</label><SimpleInput name="institutionPhone" /></div>
          </section>

          {/* MASTER */}
          <section className="p-4 border-t border-white/10">
            <label className="label">Master Name</label>
            <SimpleInput name="masterName" />
          </section>

          {/* CONSENT */}
          <section className="p-6 border-t border-white/10 space-y-4 bg-black/20">

            <p className="text-red-500 font-bold text-sm">Consent & Liability Declaration</p>

            {[
              {
                name: "consent1",
                text:
                  "I/We hereby give consent for the student to participate in the Karate Tournament. The student agrees to follow all instructions."
              },
              {
                name: "consent2",
                text:
                  "I, the parent/guardian, grant full consent for my child to participate, understanding the physical nature of the sport."
              },
              {
                name: "consent3",
                text:
                  "I/We acknowledge that the organizing committee, officials, and referees are not responsible for injuries or losses. Participation is at own risk."
              },
              {
                name: "consent4",
                text:
                  "I/We understand that only basic first aid is provided and medical expenses are not covered."
              },
            ].map((c, i) => (
              <label key={i} className="flex gap-3">
                <input
                  type="checkbox"
                  name={c.name}
                  checked={!!formValues[c.name]}
                  onChange={(e) =>
                    saveValue(c.name, e.target.checked ? "yes" : "")
                  }
                  className="w-4 h-4 accent-red-600"
                />
                <span className="text-white text-sm">{c.text}</span>
              </label>
            ))}
          </section>

          {/* SUBMIT BUTTON */}
          <section className="p-4 bg-red-600 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`font-black uppercase flex items-center gap-2 text-black hover:text-white ${
                submitting ? "opacity-60" : ""
              }`}
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
