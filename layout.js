/* =====================================================================
   CIRCADRA — shared page layout (js/layout.js) (top bar, menu, footer)
   Edit the menu, top bar and footer HERE ONCE; both pages update.
   - Links that start with #... point to sections on the home page.
   - To add a menu item: copy a <li> inside <ul class="menu"> and change it.
   ===================================================================== */
(() => {
  'use strict';

  const header = `
  <div class="utility"><div class="container utility-inner">
    <span class="utility-left">Independent analog / RF EDA project · Prototype stage</span>
  </div></div>

  <header class="site-header">
    <nav class="nav container" aria-label="Main navigation">
      <a class="brand" href="#top" aria-label="CIRCADRA home">
        <img class="brand-symbol" src="assets/logo.svg" alt="" width="38" height="38">
        <span><span class="brand-name">CIRCADRA</span><span class="brand-caption">ANALOG / RF DESIGN AUTOMATION</span></span>
      </a>
      <ul class="menu" id="menu">
        <li>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="panel-capabilities">Capabilities
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m2 4 4 4 4-4"/></svg></button>
          <div class="panel" id="panel-capabilities"><div class="container panel-inner">
            <div class="panel-col"><p class="panel-title">Simulation</p><ul>
              <li><a href="#platform" data-seg="simulation">Circuit simulation<small>Prepare and run</small></a></li>
              <li><a href="#platform" data-seg="simulation">Netlist review<small>Spot issues early</small></a></li>
            </ul></div>
            <div class="panel-col"><p class="panel-title">Optimization</p><ul>
              <li><a href="#platform" data-seg="optimization">Design exploration<small>Compare trade-offs</small></a></li>
              <li><a href="#platform" data-seg="optimization">Result analysis<small>Inspect the best candidates</small></a></li>
            </ul></div>
            <div class="panel-col"><p class="panel-title">Verification</p><ul>
              <li><a href="#platform" data-seg="verification">Layout checks<small>In development</small></a></li>
              <li><a href="#platform" data-seg="verification">Reports<small>In development</small></a></li>
            </ul></div>
            <div class="panel-col panel-feature"><p class="panel-title">Design loop</p><strong>Simulate, optimize and verify in one place.</strong><p>See how the three areas connect.</p><a href="#platform">Open the overview →</a></div>
          </div></div>
        </li>
        <li>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="panel-project">Project
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m2 4 4 4 4-4"/></svg></button>
          <div class="panel" id="panel-project"><div class="container panel-inner">
            <div class="panel-col"><p class="panel-title">Explore</p><ul>
              <li><a href="#overview">About CIRCADRA</a></li>
              <li><a href="#workflow">Design workflow</a></li>
              <li><a href="#people">People</a></li>
            </ul></div>
            <div class="panel-col panel-feature"><p class="panel-title">Independent project</p><strong>Developed with academic guidance.</strong><p>Learn who is behind CIRCADRA.</p><a href="#people">See the team →</a></div>
          </div></div>
        </li>
        <li><a class="menu-link" href="#workflow">Workflow</a></li>
        <li><a class="menu-link" href="#people">People</a></li>
      </ul>
      <a class="header-action" href="#overview">Project overview</a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-controls="menu" aria-expanded="false" aria-label="Open menu">
        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
      </button>
    </nav>
  </header>

`;

  const footer = `
  <footer>
    <div class="container footer-main">
      <div><div class="footer-brand"><img src="assets/logo.svg" alt="" width="34" height="34">CIRCADRA</div><p class="footer-about">An independent analog and RF design automation project: simulation, optimization and verification in one workflow.</p></div>
      <div class="footer-col"><h4>Capabilities</h4><ul><li><a href="#platform">Simulation</a></li><li><a href="#platform">Optimization</a></li><li><a href="#platform">Verification</a></li></ul></div>
      <div class="footer-col"><h4>Project</h4><ul><li><a href="#overview">About</a></li><li><a href="#workflow">Workflow</a></li><li><a href="#people">People</a></li></ul></div>
    </div>
    <div class="container footer-base"><span>© 2026 CIRCADRA · Developed by Hakan Taşkıran</span><span>Independent project · not a commercial release</span></div>
  </footer>

`;

  document.getElementById('site-header').outerHTML = header;
  document.getElementById('site-footer').outerHTML = footer;
})();
