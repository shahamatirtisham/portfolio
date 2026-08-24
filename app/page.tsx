"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Place = "welcome" | "about" | "projects" | "achievements" | "contact";

const profile = {
  name: "Md Shahamat Irtisham",
  title: "CSE Undergraduate · Builder · Exploring Cybersecurity",
  institution: "Islamic University of Technology",
  email: "shahamatirtisham22@gmail.com",
  github: "https://github.com/shahamatirtisham",
  linkedin: "https://www.linkedin.com/in/shahamatirtisham/",
};

const projects = [
  {
    id: "01",
    status: "COMPLETED",
    title: "DOTA 2: String Manipulation Challenge",
    description: "A C program inspired by DOTA 2 heroes that explores string reversal, character counting, searching, replacement, and lexicographic sorting. I designed and implemented the complete project.",
    tools: ["C", "Strings", "Algorithms"],
    link: "https://github.com/shahamatirtisham/Dota-2-Character-Manipulation",
  },
  {
    id: "02",
    status: "COMPLETED",
    title: "Socket Banking",
    description: "A client-server banking application built with C++ sockets and database integration to simulate authentication and everyday banking operations. I implemented the logging and login workflows.",
    tools: ["C++", "Sockets", "DBMS"],
    link: "https://github.com/shahamatirtisham/Banking-Application",
  },
  {
    id: "03",
    status: "IN PROGRESS",
    title: "Promise Beneath the Storm",
    description: "A top-down roguelike dungeon crawler built for the CSE 4402 Visual Programming Lab, following Mashkam through six corrupted dungeon levels and a multi-phase final battle. I am building the core physics and gameplay systems.",
    tools: ["Java", "LibGDX", "Ashley ECS", "Box2D"],
    link: "https://github.com/shahamatirtisham/Promise-Beneath-the-Storm",
  },
];

const messages: Record<Place, { title: string; text: string }> = {
  welcome: { title: "WELCOME, TRAVELLER!", text: "Explore this little world to discover my work, story, and adventures." },
  about: { title: "HOME BASE", text: "A CSE undergraduate at IUT exploring cybersecurity, machine learning, and the joy of building things." },
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
  const [mapControlsActive, setMapControlsActive] = useState(true);
  const worldCardRef = useRef<HTMLElement>(null);
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
    const onPointerDown = (event: PointerEvent) => {
      setMapControlsActive(Boolean(worldCardRef.current?.contains(event.target as Node)));
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!mapControlsActive) return;

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
  }, [enterPlace, mapControlsActive, move, nearbyPlace]);

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

      <section ref={worldCardRef} className="world-card" aria-label="Interactive portfolio map">
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
              <div className="pixel-avatar" aria-label="Md Shahamat Irtisham initials"><span>MSI</span></div>
              <div><p className="tiny-label">PLAYER CARD</p><h2>{profile.name}</h2><p>{profile.title}</p><p className="location">⌖ {profile.institution}</p></div>
            </div>
            <div className="copy-card">
              <p className="tiny-label">ORIGIN STORY</p>
              <h3>Hello! I&apos;m Irtisham, building my path one quest at a time.</h3>
              <p>I am a fourth-semester CSE undergraduate at IUT. I first thought machine learning would be my main path, but cybersecurity has unexpectedly become the field I keep returning to. I enjoy building practical projects, learning how systems work, reading, training at the gym, and getting serious about sleep.</p>
              <div className="stats-row"><span><b>04</b> SEMESTER</span><span><b>03</b> PROJECTS</span><span><b>02</b> FOCUS AREAS</span></div>
            </div>
          </div>
        </section>

        <section id="projects" className="story-section">
          <div className="section-marker"><span>02</span><p>PROJECT LAB</p></div>
          <div className="section-heading"><div><p className="tiny-label">QUEST LOG</p><h2>Things I&apos;ve built</h2></div><p>Selected coursework, experiments, and works in progress across systems programming and game development.</p></div>
          <div className="quest-grid">
            {projects.map((project) => <article className="quest-card" key={project.id}>
              <div className="quest-top"><span>QUEST {project.id}</span><b>{project.status}</b></div>
              <div className="project-scene" aria-hidden="true"><span className="scene-sun"/><span className="scene-hill hill-one"/><span className="scene-hill hill-two"/><span className="scene-castle"/></div>
              <h3>{project.title}</h3><p>{project.description}</p>
              <div className="tag-row">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <a className="text-link" href={project.link} target="_blank" rel="noreferrer">VIEW REPOSITORY →</a>
            </article>)}
          </div>
        </section>

        <section id="achievements" className="story-section academy-section">
          <div className="section-marker"><span>03</span><p>THE ACADEMY</p></div>
          <div className="section-heading"><div><p className="tiny-label">PROGRESS & MILESTONES</p><h2>Learning inventory</h2></div><p>My academic journey, technical toolkit, achievements, and the areas I am currently exploring.</p></div>
          <div className="academy-grid">
            <article className="timeline-card"><p className="tiny-label">ACADEMIC JOURNEY & ACHIEVEMENTS</p><div className="timeline-item"><b>2024 — 2028</b><h3>BSc in Computer Science and Engineering</h3><p>{profile.institution} · Fourth semester</p></div><div className="timeline-item"><b>2021</b><h3>General Scholarship — HSC</h3><p>Recognized for academic performance.</p></div><div className="timeline-item"><b>2018</b><h3>Talent Pool Scholarship — JSC</h3><p>Recognized for academic performance.</p></div><div className="timeline-item"><b>DHAKA COLLEGE</b><h3>1st Runner-up — Biology Olympiad</h3><p>Intra-college competition.</p></div><div className="timeline-item"><b>2017</b><h3>1st Dan Black Belt — Taekwondo</h3><p>A milestone in discipline, focus, and persistence.</p></div></article>
            <article className="inventory-card"><p className="tiny-label">SKILL INVENTORY</p><div className="skill"><span>C++</span><i><b style={{width:"78%"}}/></i></div><div className="skill"><span>C</span><i><b style={{width:"75%"}}/></i></div><div className="skill"><span>Mathematics</span><i><b style={{width:"70%"}}/></i></div><div className="skill"><span>AI / ML</span><i><b style={{width:"52%"}}/></i></div><p className="inventory-note">Skill levels are descriptive, not test scores.</p></article>
            <article className="research-card"><div className="book-stack" aria-hidden="true"><i/><i/><i/></div><div><p className="tiny-label">CURRENT INTERESTS</p><h3>Cybersecurity & machine learning</h3><p>I am exploring how systems break, how they can be defended, and how intelligent tools can help solve real problems.</p></div></article>
            <article className="research-card"><div className="book-stack" aria-hidden="true"><i/><i/><i/></div><div><p className="tiny-label">COMMUNITY & INVOLVEMENT</p><h3>Learning beyond the classroom</h3><p>Sub-executive for Creative at IUT Computer Society, Sub-executive for Research at IUT Robotics Society, and former General Member of Dhaka College Science Club.</p></div></article>
          </div>
        </section>

        <section id="contact" className="story-section contact-section">
          <div className="section-marker"><span>04</span><p>POST OFFICE</p></div>
          <div className="contact-box">
            <div><p className="tiny-label">SEND A MESSAGE</p><h2>Want to start a quest together?</h2><p>I&apos;m always happy to discuss projects, research, and new opportunities.</p></div>
            <div className="contact-links"><a href={`mailto:${profile.email}`}>EMAIL <span>{profile.email}</span></a><a href={profile.github} target="_blank" rel="noreferrer">GITHUB <span>@shahamatirtisham</span></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN <span>/in/shahamatirtisham</span></a></div>
          </div>
        </section>
      </div>

      <footer><p>DESIGNED & BUILT WITH CURIOSITY · <span>© 2026 {profile.name}</span></p><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO MAP ↑</button></footer>
    </main>
  );
}
