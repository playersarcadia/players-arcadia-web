"use client";

import { useEffect, useState } from "react";

export default function GamersArcLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!cursor || !trail || !prefersFinePointer) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);

    const onEnter = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      cursor.style.background = "rgba(255,210,0,.2)";
    };
    const onLeave = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursor.style.background = "transparent";
    };

    const hoverTargets = document.querySelectorAll<HTMLElement>(
      "a,button,.t-card,.step,.team-card,.perk"
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealEls = document.querySelectorAll<HTMLElement>(
      ".c-stat,.t-card,.step,.sf,.perk,.team-card"
    );
    revealEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
      observer.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="main-content" tabIndex={-1} className="gamers-arc-landing min-h-screen">
<div id="cursor"></div>
  <div id="cursor-trail"></div>

  {/* NAV */}
  {menuOpen ? (
    <button
      type="button"
      className="nav-overlay"
      aria-label="Close menu"
      onClick={closeMenu}
    />
  ) : null}
  <nav>
    <div className="nav-brand">
      {/* LOGO SLOT */}
      <div className="logo-box">GA</div>
      <div className="brand-name">GAMERS<span>ARC</span></div>
    </div>
    <ul className={`nav-links${menuOpen ? " is-open" : ""}`} id="landing-nav-menu">
      <li>
        <a href="#challenge" onClick={closeMenu}>
          Challenge
        </a>
      </li>
      <li>
        <a href="#tournaments" onClick={closeMenu}>
          Tournaments
        </a>
      </li>
      <li>
        <a href="#teams" onClick={closeMenu}>
          Teams
        </a>
      </li>
      <li>
        <a href="#how" onClick={closeMenu}>
          How It Works
        </a>
      </li>
    </ul>
    <div className="nav-actions">
      <button
        type="button"
        className={`nav-toggle${menuOpen ? " is-open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="landing-nav-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" aria-hidden />
        <span className="nav-toggle-bar" aria-hidden />
        <span className="nav-toggle-bar" aria-hidden />
      </button>
      <a href="#" className="nav-cta" onClick={closeMenu}>
        Play Now
      </a>
    </div>
  </nav>

  {/* ─── HERO ─── */}
  <section className="hero">
    <div className="hero-bg">
      <div className="arena-grid"></div>
    </div>
    <div className="hero-inner">
      <div className="hero-eyebrow"><span className="eye-dot"></span> The Arena Is Live — Are You Ready?</div>
      <h1 className="hero-h1">
        <span className="row1">COMPETE.</span>
        <span className="row2">CONQUER.</span>
        <span className="row3">CASH OUT.</span>
      </h1>
      <p className="hero-sub">
        GamersArc is where <strong>real skill meets real money</strong>. Challenge rivals, enter tournaments,
        build your squad, and turn every match into an opportunity to win big.
      </p>
      <div className="hero-btns">
        <a href="#challenge" className="btn btn-gold"><span className="icon">⚔️</span> Challenge a Gamer</a>
        <a href="#tournaments" className="btn btn-red"><span className="icon">🏆</span> Enter Tournament</a>
        <a href="#teams" className="btn btn-ghost"><span className="icon">🛡️</span> Find Your Team</a>
      </div>
      <div className="prize-ticker">
        <span className="ticker-label">Total Prizes Paid Out</span>
        <span className="ticker-amount">$2.4M+</span>
        <span className="ticker-sub">and growing every day</span>
      </div>
    </div>
    <div className="scroll-hint">SCROLL<span></span></div>
  </section>

  <hr className="divider" />

  {/* ─── CHALLENGE SECTION ─── */}
  <section className="challenge-section" id="challenge">
    <div className="section-wrap">
      <div className="challenge-layout">
        <div>
          <span className="section-eyebrow">{`// 1v1 & SQUAD DUELS`}</span>
          <h2 className="section-title">Step Up.<br /><em>Get Paid.</em></h2>
          <p className="section-body">
            Think you&apos;re the best? Prove it. Send a cash challenge to any gamer on the platform —
            you set the stakes, you set the game. Every match is a chance to add to your wallet.
            No luck. Pure skill. Pure earnings.
          </p>
          <div className="challenge-stats">
            <div className="c-stat">
              <div className="c-stat-val">50K+</div>
              <div className="c-stat-lbl">Active Challengers</div>
            </div>
            <div className="c-stat">
              <div className="c-stat-val">$5</div>
              <div className="c-stat-lbl">Minimum Wager</div>
            </div>
            <div className="c-stat">
              <div className="c-stat-val">2 Min</div>
              <div className="c-stat-lbl">Match Setup</div>
            </div>
            <div className="c-stat">
              <div className="c-stat-val">Instant</div>
              <div className="c-stat-lbl">Payout on Win</div>
            </div>
          </div>
          <div style={{"marginTop":"2.5rem"}}>
            <a href="#" className="btn btn-gold"><span className="icon">⚔️</span> Issue a Challenge</a>
          </div>
        </div>
        <div className="challenge-visual">
          <div className="vs-arena">
            <div className="vs-ring"></div>
            <div className="vs-ring"></div>
            <div className="vs-center">
              <div className="vs-text">VS</div>
              <div className="vs-label">CASH MATCH</div>
            </div>
            <div className="player-card left">
              <div className="avatar">🎮</div>
              <div className="player-info">
                <span className="player-name">XterminatorX</span>
                <span className="player-prize">$250 wagered</span>
              </div>
            </div>
            <div className="player-card right">
              <div className="avatar">🔥</div>
              <div className="player-info">
                <span className="player-name">ShadowKing</span>
                <span className="player-prize">$250 wagered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr className="divider" />

  {/* ─── TOURNAMENTS SECTION ─── */}
  <section className="tournament-section" id="tournaments">
    <div className="section-wrap">
      <div className="tournament-layout">
        <div>
          <span className="section-eyebrow">{`// ARENAS & CHAMPIONSHIPS`}</span>
          <h2 className="section-title">Enter the Arena.<br /><em>Win Big.</em></h2>
          <p className="section-body">
            From weekly cups to grand championship events — GamersArc hosts tournaments with prize
            pools that scale with every registration. The bigger the crowd, the bigger the crown.
            You&apos;ve trained for this moment.
          </p>
          <div className="morale-box" style={{"marginTop":"2rem"}}>
            <div className="morale-quote">
              &ldquo;Every legend started as a <span>challenger</span>. Your title is waiting.&rdquo;
            </div>
            <div className="morale-author">— GamersArc Community</div>
          </div>
          <div style={{"marginTop":"2rem"}}>
            <a href="#" className="btn btn-red"><span className="icon">🏆</span> Browse All Tournaments</a>
          </div>
        </div>
        <div className="tourney-cards">
          <div className="t-card featured">
            <div className="t-card-accent"></div>
            <div className="t-card-top">
              <span className="t-card-name">🔴 GRAND ARC CHAMPIONSHIP</span>
              <span className="t-badge live">LIVE</span>
            </div>
            <div className="t-meta"><span>🎮 Warzone</span><span>👥 256 Players</span></div>
            <div className="t-prize">$25,000 Prize Pool</div>
            <div className="t-slots">187 / 256 slots filled</div>
            <div className="slot-bar">
              <div className="slot-fill" style={{"width":"73%"}}></div>
            </div>
          </div>
          <div className="t-card">
            <div className="t-card-accent"></div>
            <div className="t-card-top">
              <span className="t-card-name">Weekly Showdown Cup</span>
              <span className="t-badge open">OPEN</span>
            </div>
            <div className="t-meta"><span>🎮 FIFA 25</span><span>👥 64 Players</span></div>
            <div className="t-prize">$2,500 Prize Pool</div>
            <div className="t-slots">41 / 64 slots filled</div>
            <div className="slot-bar">
              <div className="slot-fill" style={{"width":"64%"}}></div>
            </div>
          </div>
          <div className="t-card">
            <div className="t-card-accent"></div>
            <div className="t-card-top">
              <span className="t-card-name">Rookie Rumble Series</span>
              <span className="t-badge open">OPEN</span>
            </div>
            <div className="t-meta"><span>🎮 Rocket League</span><span>👥 32 Players</span></div>
            <div className="t-prize">$500 Prize Pool</div>
            <div className="t-slots">12 / 32 slots filled</div>
            <div className="slot-bar">
              <div className="slot-fill" style={{"width":"37%"}}></div>
            </div>
          </div>
          <div className="t-card">
            <div className="t-card-accent"></div>
            <div className="t-card-top">
              <span className="t-card-name">Squad Invitational 2025</span>
              <span className="t-badge soon">SOON</span>
            </div>
            <div className="t-meta"><span>🎮 Apex Legends</span><span>👥 128 Players</span></div>
            <div className="t-prize">$10,000 Prize Pool</div>
            <div className="t-slots">Registration opens Nov 1</div>
            <div className="slot-bar">
              <div className="slot-fill" style={{"width":"0%"}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr className="divider" />

  {/* ─── TEAMS SECTION ─── */}
  <section className="teams-section" id="teams">
    <div className="section-wrap">
      <div className="teams-layout">
        <div>
          <span className="section-eyebrow">{`// SQUADS & CLANS`}</span>
          <h2 className="section-title">Stronger<br /><em>Together.</em></h2>
          <p className="section-body">
            Solo warriors become legends. But legends become dynasties with the right squad.
            Create or join a team, build your reputation, and compete in team-based tournaments
            for even bigger prizes. Your crew is your greatest weapon.
          </p>
          <div className="teams-perks">
            <div className="perk">
              <span className="perk-icon">🛡️</span>
              <p className="perk-text"><strong>Create Your Own Team</strong> — Build a brand, design your tag, recruit the
                best players on the platform.</p>
            </div>
            <div className="perk">
              <span className="perk-icon">🔍</span>
              <p className="perk-text"><strong>Smart Team Matching</strong> — Our system finds squads that fit your
                playstyle, game, and skill level.</p>
            </div>
            <div className="perk">
              <span className="perk-icon">📊</span>
              <p className="perk-text"><strong>Team Leaderboards</strong> — Climb the ranks together. Top teams earn sponsor
                visibility and exclusive challenges.</p>
            </div>
            <div className="perk">
              <span className="perk-icon">💰</span>
              <p className="perk-text"><strong>Shared Prize Pools</strong> — Win as a team, cash out as a team. Every member
                gets their cut, instantly.</p>
            </div>
          </div>
          <div style={{"marginTop":"2rem"}}>
            <a href="#" className="btn btn-ghost"><span className="icon">🛡️</span> Browse Teams</a>
            &nbsp;&nbsp;
            <a href="#" className="btn btn-gold"><span className="icon">➕</span> Create a Team</a>
          </div>
        </div>
        <div>
          <div className="team-grid">
            <div className="team-card has-logo">
              <div className="team-logo-slot">⚡</div>
              <div className="team-name">VOLT SQUAD</div>
              <div className="team-members">8 Members</div>
              <div className="team-record">W42 / L11</div>
            </div>
            <div className="team-card has-logo">
              <div className="team-logo-slot">🐺</div>
              <div className="team-name">NIGHTWOLVES</div>
              <div className="team-members">5 Members</div>
              <div className="team-record">W31 / L9</div>
            </div>
            <div className="team-card has-logo">
              <div className="team-logo-slot">🔥</div>
              <div className="team-name">BLAZECORE</div>
              <div className="team-members">6 Members</div>
              <div className="team-record">W28 / L14</div>
            </div>
            <div className="team-card">
              <div className="team-logo-slot">YOUR<br />LOGO</div>
              <div className="team-name">YOUR TEAM</div>
              <div className="team-members">Start Recruiting</div>
              <div className="team-record" style={{"color":"var(--muted)"}}>— / —</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ─── MORALE BANNER ─── */}
  <div className="morale-banner">
    <div className="morale-center">
      <h2 className="morale-headline">
        You Didn&apos;t Come This Far<br />
        <span className="gold">To Only Come</span> <span className="outline">This Far.</span>
      </h2>
      <p className="morale-p">
        Every top player on GamersArc was once where you are now — one match away from something great.
        The difference between average and legendary is one decision: <strong style={{"color":"var(--white)"}}>showing up and
          playing to win.</strong>
      </p>
      <a href="#" className="btn btn-gold" style={{"fontSize":"1rem","padding":"1.1rem 3rem"}}><span className="icon">🚀</span> Start
        Your Arc Today</a>
    </div>
  </div>

  {/* ─── HOW IT WORKS ─── */}
  <section className="how-section" id="how">
    <div className="section-wrap">
      <span className="section-eyebrow">{`// GETTING STARTED`}</span>
      <h2 className="section-title">Your Path to <em>Winning</em></h2>
      <div className="steps">
        <div className="step">
          <div className="step-icon">👤</div>
          <div className="step-title">Create Your Profile</div>
          <div className="step-desc">Sign up in 60 seconds. Link your gaming accounts and set your primary game to match you
            with the right competition.</div>
        </div>
        <div className="step">
          <div className="step-icon">💳</div>
          <div className="step-title">Fund Your Wallet</div>
          <div className="step-desc">Add funds securely. Your earnings stay in your wallet until you&apos;re ready to cash out —
            no lock-ins, ever.</div>
        </div>
        <div className="step">
          <div className="step-icon">⚔️</div>
          <div className="step-title">Challenge or Enter</div>
          <div className="step-desc">Issue a 1v1 challenge, register for a tournament, or join an existing team looking for
            your skills.</div>
        </div>
        <div className="step">
          <div className="step-icon">🏆</div>
          <div className="step-title">Win {'&'} Cash Out</div>
          <div className="step-desc">Victory means instant payout. Withdraw to your bank, mobile money, or crypto wallet —
            it&apos;s your money.</div>
        </div>
      </div>
    </div>
  </section>

  {/* ─── STATS ─── */}
  <div className="stats-full">
    <div className="stats-inner">
      <div className="sf">
        <div className="sf-val">120K+</div>
        <div className="sf-label">Registered Players</div>
      </div>
      <div className="sf">
        <div className="sf-val">$2.4M</div>
        <div className="sf-label">Total Paid Out</div>
      </div>
      <div className="sf">
        <div className="sf-val">8,400+</div>
        <div className="sf-label">Tournaments Hosted</div>
      </div>
      <div className="sf">
        <div className="sf-val">98%</div>
        <div className="sf-label">Payout Success Rate</div>
      </div>
    </div>
  </div>

  {/* ─── SPONSOR LOGOS ─── */}
  <section className="sponsors-section">
    <div className="sponsors-inner">
      <div className="sponsors-label">Trusted Partners & Sponsors — <em>Your logo could be here</em></div>
      <div className="logo-row">
        <div className="logo-slot">SPONSOR LOGO</div>
        <div className="logo-slot">PARTNER LOGO</div>
        <div className="logo-slot">BRAND LOGO</div>
        <div className="logo-slot">SPONSOR LOGO</div>
        <div className="logo-slot">PARTNER LOGO</div>
        <div className="logo-slot">BRAND LOGO</div>
      </div>
    </div>
  </section>

  {/* ─── FOOTER ─── */}
  <footer>
    <div className="footer-inner">
      <div className="footer-top">
        <div>
          {/* FOOTER LOGO SLOT */}
          <div
            style={{"width":"52px","height":"52px","border":"2px solid var(--gold)","borderRadius":"8px","display":"grid","placeItems":"center","fontFamily":"'Black Han Sans',sans-serif","fontSize":"1.2rem","color":"var(--gold)"}}>
            GA</div>
          <div className="footer-brand-name">GAMERS<span>ARC</span></div>
          <p className="footer-tagline">The competitive gaming platform where skill earns real rewards. Play, win, repeat.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Compete</div>
          <ul className="footer-links">
            <li><a href="#">1v1 Challenges</a></li>
            <li><a href="#">Tournaments</a></li>
            <li><a href="#">Leaderboards</a></li>
            <li><a href="#">Results</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Community</div>
          <ul className="footer-links">
            <li><a href="#">Find a Team</a></li>
            <li><a href="#">Player Profiles</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Support</div>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Fair Play Policy</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="/docs">API Docs</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GamersArc. All rights reserved.</span>
        <div className="footer-logo-slots">
          <div className="f-logo">PARTNER</div>
          <div className="f-logo">PARTNER</div>
          <div className="f-logo">PARTNER</div>
        </div>
      </div>
    </div>
  </footer>
    </main>
  );
}
