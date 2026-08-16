"use client";

import { useCallback, useEffect, useState } from "react";

type Place = "welcome" | "about" | "projects" | "achievements" | "contact";

const profile = {
  name: "YOUR NAME",
  title: "Engineering Student · Builder · Curious Human",
  institution: "Islamic University of Technology",
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
};

const projects = [
  { id: "01", status: "COMPLETED", title: "Your Flagship Project", description: "Describe the problem, what you built, and the result in two concise sentences.", tools: ["C++", "Problem Solving"] },
  { id: "02", status: "IN PROGRESS", title: "Your Current Quest", description: "Show what you are learning now and the next milestone you are working toward.", tools: ["Research", "Engineering"] },
  { id: "03", status: "SIDE QUEST", title: "A Personal Experiment", description: "A smaller build, creative experiment, or community project that reveals your interests.", tools: ["Creativity", "Teamwork"] },
];

const messages: Record<Place, { title: string; text: string }> = {
  welcome: { title: "WELCOME, TRAVELLER!", text: "Explore this little world to discover my work, story, and adventures." },
  about: { title: "HOME BASE", text: "A curious engineering student who enjoys turning ideas into useful things." },
  projects: { title: "PROJECT LAB", text: "Experiments, builds, and ongoing quests live inside the workshop." },
  achievements: { title: "ACADEMY", text: "Academic milestones, research, and the lessons collected along the way." },
  contact: { title: "POST OFFICE", text: "Email, GitHub, and LinkedIn are waiting here when you want to say hello." },
};

const interactionZones: Array<{ place: Exclude<Place, "welcome">; x: number; y: number; radius: number }> = [
  { place: "about", x: 16, y: 30, radius: 15 },
  { place: "projects", x: 84, y: 29, radius: 15 },
  { place: "achievements", x: 19, y: 84, radius: 16 },
  { place: "contact", x: 82, y: 84, radius: 16 },
];

function findNearbyPlace(position: { x: number; y: number }) {
  return interactionZones.find((zone) => Math.hypot(position.x - zone.x, position.y - zone.y) <= zone.radius)?.place ?? null;
}

export default function Home() {
  const [place, setPlace] = useState<Place>("welcome");
  const [position, setPosition] = useState({ x: 49, y: 76 });
  const nearbyPlace = findNearbyPlace(position);

  const enterPlace = useCallback((target: Exclude<Place, "welcome">) => {
    document.querySelector(`#${target}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const move = useCallback((dx: number, dy: number) => {
    setPosition((current) => ({
      x: Math.min(92, Math.max(6, current.x + dx)),
      y: Math.min(88, Math.max(18, current.y + dy)),
    }));
  }, []);

  useEffect(() => {
    if (nearbyPlace) setPlace(nearbyPlace);
  }, [nearbyPlace]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && nearbyPlace) {
        event.preventDefault();
        enterPlace(nearbyPlace);
        return;
      }

      const keys: Record<string, [number, number]> = {
        ArrowUp: [0, -3], w: [0, -3], W: [0, -3], ArrowDown: [0, 3], s: [0, 3], S: [0, 3],
        ArrowLeft: [-3, 0], a: [-3, 0], A: [-3, 0], ArrowRight: [3, 0], d: [3, 0], D: [3, 0],
      };
      const next = keys[event.key];
      if (!next) return;
      event.preventDefault();
      move(next[0], next[1]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enterPlace, move, nearbyPlace]);

  return (
    <main className="portfolio-shell">
      <header className="game-header">
        <div><p className="eyebrow">PLAYER ONE&apos;S PORTFOLIO</p><h1>{profile.name}</h1><p className="player-title">{profile.title}</p></div>
        <div className="status-chip"><span /> AVAILABLE FOR NEW QUESTS</div>
      </header>

      <nav className="quick-nav" aria-label="Portfolio sections">
        <button onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>01 ABOUT</button>
        <button onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>02 PROJECTS</button>
        <button onClick={() => document.querySelector("#achievements")?.scrollIntoView({ behavior: "smooth" })}>03 ACADEMY</button>
        <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>04 CONTACT</button>
      </nav>

      <section className="world-card" aria-label="Interactive portfolio map">
        <div className="map-sky"><span>PORTFOLIO TOWN</span><small>Walk close · press ENTER to visit · or click</small></div>
        <div className="game-map">
          <div className="path path-vertical" /><div className="path path-horizontal" />
          <div className="pond"><i /><i /><i /></div><div className="flower-patch" aria-hidden="true">✦ · ✦ · ✦</div>
          <button className={`building house ${nearbyPlace === "about" ? "is-near" : ""}`} onMouseEnter={() => setPlace("about")} onFocus={() => setPlace("about")} onClick={() => enterPlace("about")}><span className="roof" /><span className="building-face"><b>HOME</b><i /></span></button>
          <button className={`building lab ${nearbyPlace === "projects" ? "is-near" : ""}`} onMouseEnter={() => setPlace("projects")} onFocus={() => setPlace("projects")} onClick={() => enterPlace("projects")}><span className="roof" /><span className="building-face"><b>LAB</b><i /></span></button>
          <button className={`building academy ${nearbyPlace === "achievements" ? "is-near" : ""}`} onMouseEnter={() => setPlace("achievements")} onFocus={() => setPlace("achievements")} onClick={() => enterPlace("achievements")}><span className="roof" /><span className="building-face"><b>ACADEMY</b><i /></span></button>
          <button className={`building post ${nearbyPlace === "contact" ? "is-near" : ""}`} onMouseEnter={() => setPlace("contact")} onFocus={() => setPlace("contact")} onClick={() => enterPlace("contact")}><span className="roof" /><span className="building-face"><b>POST</b><i /></span></button>
          <div className="tree tree-one" /><div className="tree tree-two" /><div className="tree tree-three" /><div className="tree tree-four" />
          <button className="sign" onClick={() => setPlace("welcome")} aria-label="Read welcome sign">!</button>
          <div className={`player ${nearbyPlace ? "is-ready" : ""}`} style={{ left: `${position.x}%`, top: `${position.y}%` }} aria-label="Player character">
            {nearbyPlace && <span className="interaction-prompt">ENTER</span>}
            <span className="player-hair" /><span className="player-face" /><span className="player-body" />
          </div>
        </div>
        <div className="dialogue" role="status" aria-live="polite">
          <div className="portrait" aria-hidden="true"><span>★</span></div>
          <div><h2>{messages[place].title}</h2><p>{messages[place].text}</p>
            {place !== "welcome" && <button className={`enter-button ${nearbyPlace === place ? "is-ready" : ""}`} onClick={() => enterPlace(place)}>{nearbyPlace === place ? "PRESS ENTER →" : "CLICK TO ENTER →"}</button>}
          </div><span className="dialogue-arrow">▼</span>
        </div>
      </section>

      <div className="mobile-controls" aria-label="Movement controls">
        <button onClick={() => move(0, -3)} aria-label="Move up">▲</button><button onClick={() => move(-3, 0)} aria-label="Move left">◀</button>
        <button onClick={() => move(3, 0)} aria-label="Move right">▶</button><button onClick={() => move(0, 3)} aria-label="Move down">▼</button>
      </div>

      <div className="content-world">
        <section id="about" className="story-section about-section">
          <div className="section-marker"><span>01</span><p>HOME BASE</p></div>
          <div className="story-grid">
            <div className="profile-card">
              <div className="pixel-avatar" aria-label="Profile photo placeholder"><span>ADD PHOTO</span></div>
              <div><p className="tiny-label">PLAYER CARD</p><h2>{profile.name}</h2><p>{profile.title}</p><p className="location">⌖ {profile.institution}</p></div>
            </div>
            <div className="copy-card">
              <p className="tiny-label">ORIGIN STORY</p>
              <h3>Hello! I&apos;m building my path one quest at a time.</h3>
              <p>I am an engineering student interested in technology, problem-solving, and work that creates a positive impact. This portfolio is a growing record of what I build, learn, and contribute.</p>
              <div className="stats-row"><span><b>04</b> SEMESTER</span><span><b>∞</b> CURIOSITY</span><span><b>01</b> NEXT QUEST</span></div>
            </div>
          </div>
        </section>

        <section id="projects" className="story-section">
          <div className="section-marker"><span>02</span><p>PROJECT LAB</p></div>
          <div className="section-heading"><div><p className="tiny-label">QUEST LOG</p><h2>Things I&apos;ve built</h2></div><p>Selected projects, experiments, and works in progress. Replace these starter entries with your real work.</p></div>
          <div className="quest-grid">
            {projects.map((project) => <article className="quest-card" key={project.id}>
              <div className="quest-top"><span>QUEST {project.id}</span><b>{project.status}</b></div>
              <div className="project-scene" aria-hidden="true"><span className="scene-sun"/><span className="scene-hill hill-one"/><span className="scene-hill hill-two"/><span className="scene-castle"/></div>
              <h3>{project.title}</h3><p>{project.description}</p>
              <div className="tag-row">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <button className="text-link">VIEW QUEST →</button>
            </article>)}
          </div>
        </section>

        <section id="achievements" className="story-section academy-section">
          <div className="section-marker"><span>03</span><p>THE ACADEMY</p></div>
          <div className="section-heading"><div><p className="tiny-label">PROGRESS & MILESTONES</p><h2>Learning inventory</h2></div><p>Academic achievements, research, skills, and certifications can grow here throughout your degree.</p></div>
          <div className="academy-grid">
            <article className="timeline-card"><p className="tiny-label">ACADEMIC JOURNEY</p><div className="timeline-item"><b>2024 — PRESENT</b><h3>Undergraduate Engineering</h3><p>{profile.institution} · Fourth semester</p></div><div className="timeline-item muted"><b>NEXT MILESTONE</b><h3>Add your achievement</h3><p>Scholarship, competition, course result, or leadership role.</p></div></article>
            <article className="inventory-card"><p className="tiny-label">SKILL INVENTORY</p><div className="skill"><span>C++</span><i><b style={{width:"78%"}}/></i></div><div className="skill"><span>Problem Solving</span><i><b style={{width:"72%"}}/></i></div><div className="skill"><span>Teamwork</span><i><b style={{width:"68%"}}/></i></div><div className="skill"><span>Research</span><i><b style={{width:"55%"}}/></i></div><p className="inventory-note">Skill levels are descriptive, not test scores.</p></article>
            <article className="research-card"><div className="book-stack" aria-hidden="true"><i/><i/><i/></div><div><p className="tiny-label">RESEARCH CORNER</p><h3>Your research can live here</h3><p>Add a paper, ongoing investigation, poster, or area you want to explore.</p></div></article>
          </div>
        </section>

        <section id="contact" className="story-section contact-section">
          <div className="section-marker"><span>04</span><p>POST OFFICE</p></div>
          <div className="contact-box">
            <div><p className="tiny-label">SEND A MESSAGE</p><h2>Want to start a quest together?</h2><p>I&apos;m always happy to discuss projects, research, and new opportunities.</p></div>
            <div className="contact-links"><a href={`mailto:${profile.email}`}>EMAIL <span>{profile.email}</span></a><a href={profile.github}>GITHUB <span>@your-username</span></a><a href={profile.linkedin}>LINKEDIN <span>/in/your-profile</span></a></div>
          </div>
        </section>
      </div>

      <footer><p>DESIGNED & BUILT WITH CURIOSITY · <span>© 2026 {profile.name}</span></p><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO MAP ↑</button></footer>
    </main>
  );
}
