import React, { useRef, useState, useEffect } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Upload,
  ChevronRight,
} from "lucide-react";
import NavBar from "./NavBar";

const RegistrationFormPage = () => {
  const formRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Save all field values (prevents form reset)
  const [formValues, setFormValues] = useState({});

  // Image previews
  const [photo, setPhoto] = useState(null);
  const [sigParticipant, setSigParticipant] = useState(null);
  const [sigParent, setSigParent] = useState(null);
  const [sigTeacher, setSigTeacher] = useState(null);

  // submitting state
  const [submitting, setSubmitting] = useState(false);

  // navbar scroll
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

  // file handler - creates preview but does NOT remove file from form input
  const handleImage = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) {
      setter(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setter(url);
  };

  // POST form to backend, validate required fields + files
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const formEl = formRef.current;
    if (!formEl) return;

    const fd = new FormData(formEl);

    // Required text fields
    const requiredText = [
      "participantName",
      "fatherName",
      "schoolName",
      "district",
      "institutionPhone",
      "dobDD",
      "dobMM",
      "dobYYYY",
      "masterName",
      "gender",
    ];

    // Required file fields
    const requiredFiles = [
      "photo",
      "signatureParticipant",
      "signatureParent",
      "signatureTeacher",
    ];

    const missing = [];

    // Check text fields
    requiredText.forEach((k) => {
      const v = fd.get(k);
      if (!v || v.toString().trim() === "") missing.push(k);
    });

    // Check file inputs via DOM elements (safer)
    requiredFiles.forEach((fname) => {
      const el = formEl.elements[fname];
      const hasFile = el && el.files && el.files.length > 0;
      if (!hasFile) missing.push(fname);
    });

    if (missing.length > 0) {
      alert("Please fill/attach required fields: " + missing.join(", "));
      return;
    }

    try {
      setSubmitting(true);

      const resp = await fetch("https://intra-school-tournment.onrender.com/api/submit", {
  method: "POST",
  body: fd,
});


      const result = await resp.json();

      if (!resp.ok || !result.ok) {
        console.error("Server error:", result);
        alert("Submission failed: " + (result?.error || resp.statusText));
        setSubmitting(false);
        return;
      }

      alert(`Form submitted successfully! 
ID: ${result.id}

Please pay the fee to your Master.`);


      // Reset form DOM + previews + stored values
      formEl.reset();
      setFormValues({});
      setPhoto(null);
      setSigParticipant(null);
      setSigParent(null);
      setSigTeacher(null);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pb-20">
      {/* Grid background */}
      <div
        className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),
        linear-gradient(to_bottom,#80808010_1px,transparent_1px)]
        bg-[size:24px_24px]"
      ></div>

      <NavBar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* ================= FORM BODY ================= */}
      <main className="container mx-auto px-4 pt-32 relative z-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/20 shadow-2xl"
        >
          <div className="h-1 w-full bg-gradient-to-r from-red-600 to-orange-500"></div>

          {/* HEADER */}
          <div className="p-6 border-b border-white/20 flex flex-col md:flex-row justify-between gap-6">
            {/* LEFT SECTION */}
            <div className="space-y-4 w-full">
              <div>
                <span className="text-slate-400 uppercase">State:</span>
                <div className="text-red-500 text-xl font-bold border-b border-white/20">
                  Telangana
                </div>
              </div>

              <div>
                <span className="text-slate-400 uppercase">District:</span>
                <input
                  name="district"
                  defaultValue={formValues["district"] || ""}
                  onBlur={(e) => saveValue("district", e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-red-600 outline-none"
                />
              </div>

              <div className="text-center mt-4">
                <h2 className="text-red-500 font-bold uppercase">
                  National School Games 2025–26
                </h2>
                <p className="text-[10px] text-slate-500 uppercase">Under SGFI</p>
                <h1 className="text-3xl font-black italic mt-2">
                  Certificate of Eligibility
                </h1>
              </div>

              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <span className="text-slate-400 uppercase text-sm">Discipline:</span>
                <span className="font-black border-b border-white/30 px-4">KARATE</span>

                <span className="text-slate-400 uppercase text-sm">Under:</span>
                <input
                  name="under"
                  placeholder="14/17/19"
                  defaultValue={formValues["under"] || ""}
                  onBlur={(e) => saveValue("under", e.target.value)}
                  className="w-16 bg-transparent border-b border-white/20 text-center outline-none"
                />

                <span className="text-slate-400 uppercase text-sm">Gender:</span>
                <input
                  name="gender"
                  placeholder="M/F"
                  defaultValue={formValues["gender"] || ""}
                  onBlur={(e) => saveValue("gender", e.target.value)}
                  className="w-16 bg-transparent border-b border-white/20 text-center outline-none"
                />
              </div>
            </div>

            {/* PHOTO UPLOAD */}
            <div className="w-32 h-40 border-2 border-dashed border-white/30 relative flex items-center justify-center bg-white/5">
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImage(e, setPhoto)}
              />
              {photo ? (
                <img src={photo} className="w-full h-full object-cover" alt="photo preview" />
              ) : (
                <div className="text-center text-[10px] text-slate-500">
                  <Upload className="mx-auto mb-1" />
                  Upload Latest Photo
                </div>
              )}
            </div>
          </div>

          {/* INPUT FIELDS */}
          <div className="divide-y divide-white/10">
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Participant Name</label>
              <SimpleInput name="participantName" placeholder="SURNAME NAME" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Father's Name</label>
              <SimpleInput name="fatherName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Mother's Name</label>
              <SimpleInput name="motherName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">School Name</label>
              <SimpleInput name="schoolName" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">School Address</label>
              <SimpleInput name="institutionAddress" />
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">School Contact</label>
              <SimpleInput name="institutionPhone" placeholder="With STD Code" />
            </div>

            {/* MASTER SELECT DROPDOWN */}
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Choose the Master</label>

              <select
                name="masterName"
                defaultValue={formValues["masterName"] || ""}
                onBlur={(e) => saveValue("masterName", e.target.value)}
                className="w-full bg-transparent text-white font-mono text-sm border-b border-white/10 
               focus:border-red-600 focus:outline-none py-2"
              >
                <option value="" className="text-[10px] text-slate-400 uppercase">-- Select Master --</option>
                <option value="Master Ramesh" className="bg-black text-white">Master Ramesh</option>
                <option value="Master Suresh" className="bg-black text-white">Master Suresh</option>
                <option value="Master Praveen" className="bg-black text-white">Master Praveen</option>
                <option value="Master Aditya" className="bg-black text-white">Master Aditya</option>
              </select>
            </div>

            {/* DOB */}
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Date of Birth</label>
              <div className="flex gap-2">
                <SimpleInput name="dobDD" placeholder="DD" />
                <SimpleInput name="dobMM" placeholder="MM" />
                <SimpleInput name="dobYYYY" placeholder="YYYY" />
              </div>
            </div>

            {/* SIGNATURES */}
            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Signature of Participant</label>
              <div className="relative h-20 bg-white/5 border border-dashed border-white/30 mt-2 flex items-center justify-center">
                <input
                  type="file"
                  name="signatureParticipant"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImage(e, setSigParticipant)}
                />
                {sigParticipant ? (
                  <img src={sigParticipant} className="max-h-full object-contain" alt="sig participant" />
                ) : (
                  <span className="text-[10px] text-slate-500">Click to Upload</span>
                )}
              </div>
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">Signature of Parent</label>
              <div className="relative h-20 bg-white/5 border border-dashed border-white/30 mt-2 flex items-center justify-center">
                <input
                  type="file"
                  name="signatureParent"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImage(e, setSigParent)}
                />
                {sigParent ? (
                  <img src={sigParent} className="max-h-full object-contain" alt="sig parent" />
                ) : (
                  <span className="text-[10px] text-slate-500">Upload Parent Sign</span>
                )}
              </div>
            </div>

            <div className="p-4">
              <label className="text-[10px] text-slate-400 uppercase">
                Signature of Class Teacher / PET / PD
              </label>
              <div className="relative h-20 bg-white/5 border border-dashed border-white/30 mt-2 flex items-center justify-center">
                <input
                  type="file"
                  name="signatureTeacher"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImage(e, setSigTeacher)}
                />
                {sigTeacher ? (
                  <img src={sigTeacher} className="max-h-full object-contain" alt="sig teacher" />
                ) : (
                  <span className="text-[10px] text-slate-500">Upload Teacher Sign</span>
                )}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="p-4 bg-red-600 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center gap-2 font-black uppercase text-black hover:text-white ${submitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {submitting ? "Submitting..." : "Submit For Verification"} <ChevronRight />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegistrationFormPage;
