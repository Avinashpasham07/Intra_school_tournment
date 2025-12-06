import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Zap,
  Target,
  Star,
  User,
  Shield,
  ChevronRight,
  AlertTriangle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Phone, Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Performance optimized mouse movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
    containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] font-sans text-white selection:bg-red-600 selection:text-white overflow-x-hidden relative"
    >
      {/* Mouse Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(220, 38, 38, 0.08), transparent 40%)`,
        }}
      />

      {/* Grid BG */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <NavBar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* ===================== HERO SECTION ===================== */}
  <header
  id="home"
  className="
    relative
    pt-24           /* reduced for mobile */
    pb-20
    lg:pt-40 lg:pb-32
    overflow-hidden
    flex flex-col justify-center
  "
>
  {/* Background Blob */}
  <div className="
      absolute bottom-0 left-0
      w-[280px] h-[280px]      /* smaller for mobile */
      md:w-[450px] md:h-[450px]
      bg-blue-600/10 
      rounded-full blur-[100px]
      mix-blend-screen 
      animate-blob animation-delay-2000
    ">
  </div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="
        flex flex-col 
        lg:flex-row
        items-center lg:items-start
        justify-between
        gap-14 lg:gap-20
      "
    >
      {/* LEFT CONTENT */}
      <div className="lg:w-3/5 space-y-8 text-center lg:text-left">

        {/* Badge */}
        <div className="
            inline-flex items-center gap-2
            px-4 py-1.5                  /* tightened for mobile */
            bg-white/5 border border-white/10
            rounded-full backdrop-blur-md
            mx-auto lg:mx-0              /* center on mobile */
          "
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">
            Inter School Championship 2025
          </span>
        </div>

        {/* Heading */}
        <div className="relative w-full">
          <h1 className="
              text-8xl md:text-7xl lg:text-9xl   /* FIXED SIZE for mobile */
              font-black italic
              tracking-tighter leading-[0.9]
              text-zinc-500 mix-blend-luminosity
              relative z-20
            "
          >
            FIGHT <br /> FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
              GLORY
            </span>
          </h1>

          {/* Outline */}
          
        </div>

        {/* Subtext */}
        <p className="
            text-base md:text-xl
            text-slate-400 font-medium
            leading-relaxed
            max-w-xl mx-auto lg:mx-0
          "
        >
          The Most Prestigious Martial Arts Showdown in Telangana.
          <span className="block mt-2 text-white">
            TSKA Approved • KIO Affiliated • Govt Recognized.
          </span>
        </p>

        {/* CTA */}
        <div className="flex justify-center lg:justify-start pt-2">
          <button
            onClick={() => navigate('/register')}
            className="
              group relative px-8 py-4
              bg-red-600 text-white 
              font-black text-lg uppercase tracking-wider
              overflow-hidden 
              shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]
            "
          >
            <div className="
                absolute inset-0 bg-white/20 
                translate-x-[-100%] skew-x-[-15deg]
                group-hover:translate-x-[100%]
                transition-transform duration-700 ease-in-out
              ">
            </div>
            <span className="relative flex items-center gap-2">
              Start Registration <ChevronRight />
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT CARD (unchanged) */}
      {/** keep the same as before **/}






      {/* RIGHT — DATE CARD */}
      <div className="lg:w-2/5 w-full flex justify-center lg:justify-end">
        <div className="relative group w-full max-w-xs sm:max-w-sm">

          {/* Glow Border */}
          <div className="
              absolute -inset-1 
              bg-gradient-to-r from-red-600 via-orange-500 to-red-600 
              rounded-2xl blur 
              opacity-25 group-hover:opacity-75 
              transition duration-700 animate-tilt
            ">
          </div>

          <div className="
              relative bg-black/90 
              border border-white/10 
              p-6 md:p-8 rounded-2xl 
              overflow-hidden backdrop-blur-xl
            "
          >
            <div className="
                absolute inset-0 opacity-20 
                bg-[radial-gradient(#fff_1px,transparent_1px)] 
                [background-size:16px_16px]
              ">
            </div>

            <div className="relative z-10 text-center space-y-6">

              <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-2">
                <Calendar className="w-8 h-8 text-red-500" />
              </div>

              <div>
                <h3 className="text-6xl md:text-7xl font-black text-white">21</h3>
                <p className="text-2xl md:text-3xl font-black text-red-600 uppercase italic">
                  December
                </p>
                <p className="text-white/50 font-mono mt-2 tracking-widest text-sm md:text-base">
                  2025 • SUNDAY
                </p>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-400">ENTRY CLOSES BY</span>
                <span className="text-red-500 font-mono">10 December</span>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</header>


      {/* ===================== SCHEDULE SECTION ===================== */}
      <div
        id="venue"
        className="bg-red-600 py-3 mt-15 transform -skew-y-2  relative z-20 overflow-hidden"
      >
        <div className="whitespace-nowrap flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-black font-black text-2xl uppercase mx-4 italic flex items-center gap-4"
            >
              Kata <Zap className="w-5 h-5 fill-black" /> Kumite{" "}
              <Zap className="w-5 h-5 fill-black" />
            </span>
          ))}
        </div>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="container mx-auto px-4 md:px-6 py-24 space-y-32">
        
        {/* ===================== VENUE SECTION ===================== */}
        {/* ===================== VENUE SECTION WITH MAP ===================== */}
<section className="grid md:grid-cols-3 gap-6">

  {/* LEFT SIDE – VENUE DETAILS */}
  <div className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10 p-8">
    <div className="absolute top-0 right-0 p-8 opacity-20">
      <MapPin className="w-48 h-48 text-red-600" />
    </div>
    <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
      <div>
        <h3 className="text-slate-400 font-bold uppercase tracking-widest mb-2">
          The Arena
        </h3>
        <p className="text-3xl md:text-5xl font-black uppercase text-white leading-tight">
          Emerald Height <br /> Club House
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-12 w-1 bg-red-600"></div>
        <div>
          <p className="text-white font-bold text-lg">
            Annojiguda, Pocharam
          </p>
          <p className="text-slate-500">Hyderabad Highway</p>
        </div>
      </div>
    </div>
  </div>

  {/* MIDDLE CARD – GOOGLE MAP */}
  <div className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10">
    <a
      href="https://www.google.com/maps/search/?api=1&query=Emerald+Height+Club+House+Annojiguda+Pocharam+Hyderabad+Highway"
      target="_blank"
      rel="noopener noreferrer"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.751321006971!2d78.66562027494834!3d17.4237178834697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb75f1d5958b83%3A0x4f055e43071b04c1!2sEmerald%20Heights%20Club%20House%2C%20Annojiguda%2C%20ghatkesar%2C%20Hyderabad%2C%20Telangana%20500088!5e0!3m2!1sen!2sin!4v1764871007109!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="min-h-[300px]"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </a>

    <div className="absolute bottom-3 right-3 bg-red-600 text-black px-3 py-1 text-xs rounded font-bold">
      OPEN IN MAPS
    </div>
  </div>

  {/* RIGHT CARD – TIME */}
  <div className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10 p-8">
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <Clock className="w-10 h-10 text-white" />
        <div className="bg-red-600 text-black font-bold px-3 py-1 text-xs rounded uppercase">
          Sharp
        </div>
      </div>

      <div>
        <p className="text-6xl font-black text-white">09:00</p>
        <p className="text-xl font-bold text-red-500 uppercase">
          AM Onwards
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Report by 08:30 AM
        </p>
      </div>
    </div>
  </div>

</section>



        {/* ===================== CATEGORIES ===================== */}
       <section>
  <div className="flex flex-col md:flex-row items-end justify-between mb-12">
    <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white">
      Event <span className="text-red-600 stroke-text-red">Categories</span>
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[
      {
        title: "KATA",
        desc: "Form & Precision",
        icon: Star,
        link: "https://www.wkf.net/files/pdf/documents/WKF_Kata_Competition_Rules_2024.pdf",
      },
      {
        title: "KUMITE",
        desc: "Combat & Sparring",
        icon: Target,
        link: "https://www.wkf.net/files/pdf/documents/WKF_Kumite_Competition_Rules_2024.pdf",
      },
    ].map((cat, i) => (
      <div
        key={i}
        className="
          group relative h-96 
          bg-[#0A0A0A] 
          border border-white/10 
          rounded-2xl overflow-hidden 
          flex flex-col items-center justify-center p-6
          transition-all duration-500
          hover:border-red-500/70 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]
          hover:scale-[1.02]
        "
      >
        {/* Large Background Number */}
        <span className="absolute -bottom-8 -right-4 text-9xl font-black text-white/5 select-none">
          0{i + 1}
        </span>

        {/* Icon */}
        <div className="
          w-16 h-16 bg-white/5 rounded-full 
          flex items-center justify-center mb-6 
          transition-all duration-300 
          group-hover:bg-red-600/20
        ">
          <cat.icon className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="text-3xl font-black uppercase italic mb-2 tracking-wide">
          {cat.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm font-medium mb-6 text-center">
          {cat.desc}
        </p>

        {/* RULES BUTTON */}
        <button
          onClick={() => window.open(cat.link, "_blank")}
          className="
            mt-auto px-6 py-2 text-sm font-bold uppercase tracking-wide
            text-white border border-white/20
            rounded-lg transition-all duration-300 
            relative overflow-hidden group
            hover:border-red-500
            hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            View Rules <ChevronRight className="w-4 h-4" />
          </span>

          {/* Animated Shine */}
          <div
            className="
              absolute inset-0 bg-white/20 translate-x-[-120%]
              group-hover:translate-x-[120%] skew-x-12
              transition-transform duration-[900ms]
            "
          ></div>
        </button>
      </div>
    ))}
  </div>
</section>


{/* ===================== TOURNAMENT EVENTS TABLE ===================== */}
<section className="rounded-3xl bg-[#0A0A0A] border border-white/10 p-8 mt-20">
  <h2 className="text-4xl md:text-5xl font-black uppercase italic text-center mb-10">
    <span className="text-white">List of the</span>{" "}
    <span className="text-red-600">Tournament Events</span>
    <span className="text-sm block text-slate-400 mt-1">(As Per WKF Rules)</span>
  </h2>

  {/* Outer Grid */}
  <div className="grid md:grid-cols-3 gap-6">

    {/* KATA LIST */}
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-black uppercase text-red-500 mb-4">KATA (Forms)</h3>
      <ul className="space-y-2 text-slate-300 font-mono text-sm">
        <li>1. Under 8 Yrs (B & G)</li>
        <li>2. Under 10 Yrs (B & G)</li>
        <li>3. Under 12 Yrs (B & G)</li>
        <li>4. Under 14 Yrs (B & G)</li>
        <li>5. Under 16 Yrs (B & G)</li>
        <li>6. Under 18 Yrs (B & G)</li>
        <li>7. Above 18 Yrs (B & G)</li>
        <li>8. Brown Belts (B & G)</li>
        <li>9. Black Belts (B & G)</li>
      </ul>
    </div>

    {/* KUMITE LIST */}
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-black uppercase text-red-500 mb-4">KUMITE (Sparring)</h3>
      <ul className="space-y-2 text-slate-300 font-mono text-sm">
        <li>1. Under 8 Yrs (B & G)</li>
        <li>2. Under 10 Yrs (B & G)</li>
        <li>3. Under 12 Yrs (B & G)</li>
        <li>4. Under 14 Yrs (B & G)</li>
        <li>5. Under 16 Yrs (B & G)</li>
        <li>6. Under 18 Yrs (B & G)</li>
        <li>7. Above 18 Yrs (B & G)</li>
        <li>8. Brown Belts (B & G)</li>
        <li>9. Black Belts (B & G)</li>
      </ul>
    </div>

    {/* NOTES */}
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-black uppercase text-red-500 mb-4">Notes</h3>
      <ul className="space-y-4 text-slate-300 font-mono text-sm leading-relaxed">
        <li>1) Each Group has 4 Members</li>
        <li>2) <span className="text-red-400">1st Place</span>,<span className="text-red-400">2nd Place</span> & <span className="text-red-400">3rd Place</span></li>
       
      </ul>
    </div>
  </div>

  {/* FOOTER INFO BAR */}
  <div className="grid md:grid-cols-3 gap-4 mt-10 text-sm font-bold text-center">
    <div className="bg-black/40 border border-red-600 text-white p-3 rounded-lg">
      1) Lunch Self Only
    </div>
    <div className="bg-black/40 border border-red-600 text-white p-3 rounded-lg">
      2) Entry Fee for Event Rs. 1000
    </div>
    <div className="bg-black/40 border border-red-600 text-white p-3 rounded-lg">
      3) Gloves Compulsory
    </div>
  </div>
</section>

       <section className="relative rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-12 overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
  
  <div className="text-center mb-16 relative z-10">
    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
      The Officials
    </h2>
    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
  </div>

  {/* 3 IN ONE ROW */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

    {/* OFFICIAL 1 — GOVIND */}
    <div className="text-center group">
      <div className="relative w-32 h-44 mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-transform duration-500 group-hover:scale-105">
        <img 
          src="/Anand.png"
          alt="Govind Official"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold text-white mt-6 mb-1">Shihan Anand Rathana</h3>
      <p className="text-slate-500 text-sm font-mono">JKA India Cheif</p>
      <p className="text-slate-500 text-sm font-mono">Offical Commission</p>
    </div>

    {/* OFFICIAL 2 — MASTER */}
    <div className="text-center group">
      <div className="relative w-32 h-44 mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-transform duration-500 group-hover:scale-105">
        <img 
          src="/master.png"
          alt="Master Official"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold text-white mt-6 mb-1">Rapolu Sudershan</h3>
      <p className="text-slate-500 text-sm font-mono">Tournament Chief Judge</p>
      <p className="text-slate-500 text-sm font-mono">KIO Tournament Commission</p>
    </div>

    {/* OFFICIAL 3 — GOVIND SECOND CARD */}
    <div className="text-center group">
      <div className="relative w-32 h-44 mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-transform duration-500 group-hover:scale-105">
        <img 
          src="/govind.png"
          alt="Govind Official"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold text-white mt-6 mb-1">G. Govind</h3>
      <p className="text-slate-500 text-sm font-mono">Tournament Chief Organizer</p>
      <p className="text-slate-500 text-sm font-mono">JKAI T.G Board</p>
    </div>

  </div>
</section>

{/* ===================== BOARD OF DIRECTORS ===================== */}
<section id="directors" className="mt-24">
  <div className="flex flex-col md:flex-row items-end justify-between mb-12 overflow-hidden">
    <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white">
      Board of <span className="text-red-600 stroke-text-red">Directors (JKAI)</span>
    </h2>
  </div>

  {/* 8 in one row on large screens */}
  <div
    className="
      grid grid-cols-2 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-8 
      gap-4 md:gap-6
    "
  >
    {[
      {
        name: "Dayanand Kumar",
        role: "T.G Chief Instructor",
        img: "/1.jpg",
      },
      {
        name: "K.Srinivas Chary",
        role: "T.G Board",
        img: "/2.jpg",
      },
      {
        name: "Bhavi Dhanraj",
        role: "T.G Board",
        img: "/3.jpg",
      },
      {
        name: "K.Ramesh Goud",
        role: "T.G Board",
        img: "/4.jpg",
      },
      {
        name: "P.Samson",
        role: "T.G Board",
        img: "/5.jpg",
      },
    
      {
        name: "D.Narsimha Chary",
        role: "T.G Board",
        img: "/6.jpg",
      },
        {
        name: "G. Govind",
        role: "T.G Board",
        img: "/govind.png",
      },
      {
        name: "K.Shanker",
        role: "T.G Board",
        img: "/7.jpg", // ← Add your image here
      },
    ].map((member, i) => (
      <div
        key={i}
        className="
          group relative bg-[#0A0A0A] border border-white/10 
          rounded-xl p-4 
          flex flex-col items-center text-center 
          hover:border-red-600/50 
          transition-all duration-300 overflow-hidden
        "
      >
        {/* IMAGE */}
        <div
          className="
            relative w-20 h-28 rounded-lg overflow-hidden 
            border-2 border-white/10 
            transition-transform duration-300
          "
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAME */}
        <h3 className="text-sm font-black uppercase italic text-white mt-2">
          {member.name}
        </h3>

        {/* ROLE */}
        <p className="text-slate-300 text-[11px] mt-1 leading-tight">
          {member.role}
        </p>
      </div>
    ))}
  </div>
</section>




        {/* ===================== TEAM & MEDICAL (With Images) ===================== */}
        {/* ===================== TEAM MEMBERS SECTION (CIRCLE IMAGES) ===================== */}
{/* ===================== TEAM MEMBERS SECTION (CIRCLE IMAGES) ===================== */}
<section id="team" className="mt-24">
  <div className="flex flex-col md:flex-row items-end justify-between mb-12 overflow-hidden">
    <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white">
      Referees' <span className="text-red-600 stroke-text-red">Committee</span>
    </h2>
   
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">

    {[
      {
        name: "N.Nagaraju",
        role: "JKA Diploma",
        img: "/nagaraj.jpg",
        category: "JKA Instructor & Judge",
      },
     {
        name: "M.Kiran",
        role: "JKA Diploma",
        img: "/kiran-1.jpg",
        category: "Judge",
      },
      {
        name: "S.Kiran",
        role: "JKA Diploma",
        img: "/kiran-2.jpg",
        category: "Judge",
      },
       {
        name: "Santosh",
        role: "JKAI Medchal District Vice President",
        img: "./santu.png",
        category: "Judge",
      },
      {
        name: "Komal",
        role: "JKA DIPLOMA",
        img: "/komal.jpg",
        category: "Judge",
      },
      {
        name: "Akshay",
        role: "KIO Black Belt",
        img: "/akshay.jpg",
        category: "Judge",
      },
      {
        name: "Avinash Yadav",
        role: "KIO Black Belt",
        img: "/avi.jpg",
        category: "Judge",
      },
      
      
      
       {
        name: "Ajith",
        role: "KIO Black Belt",
        img: "/ajith.jpg",
        category: "Judge",
      },
    ].map((member, i) => (
      <div
        key={i}
        className="group relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:border-red-600/50 transition-all duration-300 overflow-hidden"
      >
        {/* CIRCLE IMAGE */}
        <div className="relative w-32 h-42 rounded-xl overflow-hidden border-2 border-white/10 transition-transform duration-300">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CATEGORY */}
        <p className="text-xs text-red-500 font-bold uppercase tracking-widest mt-4 border border-red-500/30 px-2 py-1 rounded bg-black/40">
          {member.category}
        </p>

        {/* NAME */}
        <h3 className="text-xl font-black uppercase italic text-white mt-3">
          {member.name}
        </h3>

        {/* ROLE */}
        <p className="text-slate-300 text-sm mt-1">{member.role}</p>
      </div>
    ))}
  </div>
</section>


      </main>

      {/* ===================== CONTACT SECTION ===================== */}
{/* ===================== CONTACT SECTION ===================== */}
<footer
  id="contact"
  className="bg-black border-t border-white/10 pt-20 pb-12 relative overflow-hidden"
>
  {/* Glow Line */}
  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

  <div className="container mx-auto px-4 relative z-10">

    {/* ---------- TOP ROW ---------- */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left">

      {/* Brand */}
      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6 md:mb-0">
        JKAI <span className="text-red-600">TG</span>
      </h2>

      {/* Social Icons */}
      <div className="flex gap-6">
        {[
          { Icon: Instagram, url: "https://www.instagram.com/jka_medchal.dist/" },
          { Icon: Facebook, url: "https://www.facebook.com/groups/1492975447736405/" },
          { Icon: Twitter, url: "https://x.com/KarateMedchal" },
          { Icon: Linkedin, url: "https://www.linkedin.com/in/karate-academy-jka-medchal-dist-930147227/" },
          { Icon: Youtube, url: "https://www.youtube.com/channel/UC-CkD3hOFzambpvQle_ljLg" },
        ].map(({ Icon, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative w-12 h-12 flex items-center justify-center rounded-full
              border border-white/20 overflow-hidden
              transition-all duration-300 group
            "
          >
            <div
              className="
                absolute inset-0 bg-gradient-to-br from-red-600/40 to-orange-500/40
                opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500
              "
            ></div>

            <div
              className="
                absolute inset-0 bg-white/10 opacity-0 
                group-hover:opacity-20 transition-all duration-300
              "
            ></div>

            <Icon
              className="
                w-5 h-5 text-white relative z-10
                transition-all duration-300
                group-hover:scale-110 group-hover:text-red-500
              "
            />

            <div
              className="
                absolute inset-0 rounded-full border border-red-600/0
                group-hover:border-red-600/70 transition-all duration-500
              "
            ></div>
          </a>
        ))}
      </div>
    </div>


    {/* ---------- CONTACT INFO ROW ---------- */}
    <div className="flex flex-col md:flex-row items-center gap-6 text-slate-300 text-sm font-mono mb-8">

      {/* Phone */}
      <p className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-red-500" />
        <span className="text-white font-bold">+91 97043 65372</span>
      </p>

      {/* Email */}
      <p className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-red-500" />
        <a
          href="mailto:jkaimedchaldist@gmail.com"
          className="text-white font-bold hover:text-red-500 transition-colors"
        >
          Jkakarateacademy.org.in
        </a>
      </p>

    </div>

    {/* Divider */}
    <div className="w-full h-px bg-white/10 mb-8"></div>

    {/* ---------- BOTTOM ROW ---------- */}
    <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-mono gap-6 md:gap-0">

      {/* Copyright */}
      <p className="text-center md:text-left">
        © 2025 JKAI Telangana State. All Rights Reserved.
      </p>

      {/* Developer Credit */}
      <p className="text-center md:text-right hover:text-red-500 transition-colors">
        Designed & Developed by{" "}
        <span className="text-white font-bold">Avinash Yadav</span>
      </p>

    </div>
  </div>
</footer>


      {/* GLOBAL STYLES */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.1);
        }
        .stroke-text-red {
          -webkit-text-stroke: 1px #DC2626;
          color: transparent;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;