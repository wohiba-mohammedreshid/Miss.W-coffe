import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe2,
  Leaf,
  Mail,
  MapPinned,
  Menu,
  PackageCheck,
  Phone,
  ShieldCheck,
  Ship,
  Sparkles,
  Sprout,
  X
} from "lucide-react";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const lots = [
  {
    name: "Yirgacheffe Washed",
    notes: "Jasmine, bergamot, lemon candy",
    altitude: "1,900-2,200 masl"
  },
  {
    name: "Guji Natural",
    notes: "Blueberry, cacao nib, red honey",
    altitude: "1,850-2,100 masl"
  },
  {
    name: "Sidama Honey",
    notes: "Apricot, black tea, wildflower",
    altitude: "1,700-2,050 masl"
  }
];

const processSteps = [
  {
    icon: Sprout,
    title: "Origin selection",
    copy: "We work with trusted Ethiopian producer networks, washing stations, and exporters with consistent traceability."
  },
  {
    icon: PackageCheck,
    title: "Quality control",
    copy: "Pre-shipment samples, moisture checks, cupping protocols, and lot documentation support every purchase."
  },
  {
    icon: Ship,
    title: "Import coordination",
    copy: "Our team manages export paperwork, freight timing, customs coordination, and buyer communication."
  },
  {
    icon: ShieldCheck,
    title: "Long-term supply",
    copy: "We build stable sourcing programs for roasters and distributors who need premium Ethiopian coffees year-round."
  }
];

const stats = [
  ["3", "signature regions"],
  ["86+", "target cup scores"],
  ["24 hr", "buyer response"],
  ["100%", "lot traceability"]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    volume: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const updateField = (event) => {
    setFormState((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", text: "Sending inquiry..." });

    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormState({ name: "", company: "", email: "", volume: "", message: "" });
      setStatus({
        type: "success",
        text: "Thank you. Our trade desk will reply with availability and next steps."
      });
    } catch {
      setStatus({
        type: "error",
        text: "We could not send that just now. Please email abihow63@gmail.com."
      });
    }
  };

  const navLinks = ["Origin", "Quality", "Programs", "Contact"];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Miss. W Coffee home">
          <span className="brand-mark">W</span>
          <span>
            <strong>Miss. W</strong>
            <small>Coffee Importers</small>
          </span>
        </a>
        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Request Offer
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1800&q=82"
          alt="Fresh roasted coffee beans in a premium sourcing facility"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <Globe2 size={16} /> Ethiopia to global specialty markets
          </p>
          <h1>Miss. W Coffee</h1>
          <p className="hero-copy">
            High quality Ethiopian green coffee sourcing for roasters, distributors, and
            specialty buyers who expect clarity, consistency, and craft.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Discuss Imports <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#quality">
              View Quality Process
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Current sourcing focus">
          <span>Current focus</span>
          <strong>2026 Ethiopian lots</strong>
          <p>Washed, natural, and honey process coffees from Yirgacheffe, Guji, and Sidama.</p>
        </div>
      </section>

      <section className="trust-band" aria-label="Company highlights">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section origin-grid" id="origin">
        <div className="section-copy">
          <p className="eyebrow">
            <MapPinned size={16} /> Origin expertise
          </p>
          <h2>Built around Ethiopia's most expressive coffee regions.</h2>
          <p>
            Miss. W Coffee specializes in Ethiopian beans with clean documentation,
            practical import planning, and careful lot curation. We help buyers access
            coffees with the aromatic complexity, altitude structure, and provenance that
            make Ethiopia a benchmark origin.
          </p>
        </div>
        <div className="origin-photo-wrap">
          <img
            src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1000&q=82"
            alt="Green coffee sorting and selection at origin"
          />
        </div>
      </section>

      <section className="section lots-section" id="programs">
        <div className="section-heading">
          <p className="eyebrow">
            <Sparkles size={16} /> Import programs
          </p>
          <h2>Premium lots for distinct roasting programs.</h2>
        </div>
        <div className="lot-grid">
          {lots.map((lot) => (
            <article className="lot-card" key={lot.name}>
              <span>{lot.altitude}</span>
              <h3>{lot.name}</h3>
              <p>{lot.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quality-section" id="quality">
        <div className="quality-media">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=82"
            alt="Coffee cupping table used for quality control"
          />
        </div>
        <div className="quality-copy">
          <p className="eyebrow">
            <Award size={16} /> Quality assurance
          </p>
          <h2>Every shipment is selected with discipline and served with transparency.</h2>
          <div className="process-list">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title}>
                  <Icon size={22} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section promise-section">
        <div>
          <p className="eyebrow">
            <Leaf size={16} /> Trade promise
          </p>
          <h2>Reliable import support from sample request to landed coffee.</h2>
        </div>
        <div className="promise-list">
          {[
            "Verified producer and exporter relationships",
            "Lot sheets, sample notes, and shipment documentation",
            "Flexible sourcing for bags, pallets, or container programs",
            "Clear communication across origin, freight, and buyer teams"
          ].map((item) => (
            <p key={item}>
              <CheckCircle2 size={19} /> {item}
            </p>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">
            <Mail size={16} /> Trade inquiries
          </p>
          <h2>Source Ethiopian coffee with a partner built for trust.</h2>
          <p>
            Tell us what you are buying, your preferred process, and your expected volume.
            We will respond with availability, sample options, and import timing.
          </p>
          <div className="contact-details">
            <a href="mailto:abihow63@gmail.com">
              <Mail size={18} /> abihow63@gmail.com
            </a>
            <a href="tel:+251963945482">
              <Phone size={18} /> +251-963945482
            </a>
          </div>
        </div>
        <form className="inquiry-form" onSubmit={submitInquiry}>
          <label>
            Name
            <input name="name" value={formState.name} onChange={updateField} required />
          </label>
          <label>
            Company
            <input name="company" value={formState.company} onChange={updateField} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={formState.email} onChange={updateField} required />
          </label>
          <label>
            Estimated volume
            <select name="volume" value={formState.volume} onChange={updateField}>
              <option value="">Select volume</option>
              <option>Sample request</option>
              <option>5-20 bags</option>
              <option>1 pallet</option>
              <option>Container program</option>
            </select>
          </label>
          <label className="full">
            Message
            <textarea
              name="message"
              value={formState.message}
              onChange={updateField}
              rows="5"
              required
            />
          </label>
          <button className="primary-button full" type="submit" disabled={status.type === "loading"}>
            Send Inquiry <ArrowRight size={18} />
          </button>
          {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
        </form>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="Miss. W Coffee home">
          <span className="brand-mark">W</span>
          <span>
            <strong>Miss. W</strong>
            <small>Coffee Importers</small>
          </span>
        </a>
        <p>Premium Ethiopian coffee sourcing, import coordination, and trade support.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
