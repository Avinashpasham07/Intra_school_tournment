import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ scrolled, isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

  // Smooth scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-red-600 rounded-full blur-md opacity-20 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
            <div className="relative w-18 h-10 bg-black rounded-full flex items-center justify-center border border-white/20 group-hover:border-red-500 transition-colors">
              <span className="font-black text-xl italic">JKAI</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tighter leading-none">
              <span className="text-red-600">TG</span>
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", , "Venue", "Contact"].map((item) => (
            <span
              key={item}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else {
                  scrollToSection(item.toLowerCase());
                }
              }}
              className="cursor-pointer text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative group overflow-hidden"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </span>
          ))}

          <button
            onClick={() => navigate("/register")}
            className="group relative px-6 py-2 bg-white text-black font-black uppercase tracking-wider overflow-hidden hover:text-white transition-colors duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 flex items-center gap-2">
              Register <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 py-6 px-6 flex flex-col gap-6">
          {["Home", "Venue", "Contact"].map((item) => (
            <span
              key={item}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else {
                  scrollToSection(item.toLowerCase());
                }
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-lg font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
            >
              {item}
            </span>
          ))}

          <button
            onClick={() => {
              navigate("/register");
              setIsMenuOpen(false);
            }}
            className="w-full group relative px-6 py-3 bg-white text-black font-black uppercase tracking-wider overflow-hidden hover:text-white transition-colors duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Register <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
