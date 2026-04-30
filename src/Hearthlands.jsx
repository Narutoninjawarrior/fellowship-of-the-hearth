import { Suspense } from 'react'

export default function Hearthlands() {
  return (
    <div className="hearthlands">
      <header className="hearthlands-header">
        <h1>Fellowship of the Hearth</h1>
        <nav className="hearthlands-nav">
          <a href="#hearth">Hearth</a>
          <a href="#lodge">Lodge</a>
          <a href="#bellows">Bellows</a>
          <a href="#library">Library</a>
          <a href="#ember">$EMBER</a>
        </nav>
      </header>

      <main className="hearthlands-main">
        {/* Future: 3D Canvas goes here */}
        {/* <Canvas><Suspense fallback={null}><World /></Suspense></Canvas> */}

        <section id="hearth" className="section">
          <h2>The Hearth</h2>
          <p>The sky anchor. The shared center. The "why we exist."</p>
          <div className="placeholder">3D Hearth scene will render here</div>
        </section>

        <section id="lodge" className="section">
          <h2>The Lodge</h2>
          <p>The fractal social layer. Own your space. Branch outward.</p>
          <div className="placeholder">Fractal member plots will grow here</div>
        </section>

        <section id="bellows" className="section">
          <h2>The Bellows</h2>
          <p>The pulse engine. The system breathing. Every tick is honest work.</p>
          <div className="placeholder">Live heartbeat data will pulse here</div>
        </section>

        <section id="library" className="section">
          <h2>The Library</h2>
          <p>Floating knowledge hall. Archives, guidance, research.</p>
          <div className="placeholder">Knowledge archive will live here</div>
        </section>

        <section id="ember" className="section">
          <h2>$EMBER</h2>
          <p>Utility credit. Service weight. Contribution signal.</p>
          <div className="placeholder">EMBER balance and contribution display here</div>
        </section>
      </main>

      <footer className="hearthlands-footer">
        <p>Fellowship of the Hearth — Aligned through care. Built on honesty.</p>
      </footer>
    </div>
  )
}
