/* =====================================================================
   CIRCADRA — home page script
   1) EDIT HERE: the text of the three diagram panels is in "const segs" below
      (label, sub, tag, title, text, items). Change the words, keep the keys.
   2) The Pareto chart and console are illustrative; the sample lines are in "const sample".
   ===================================================================== */
    (() => {
      'use strict';
      const svgNS = 'http://www.w3.org/2000/svg';
      const grid = document.getElementById('chart-grid-layer');
      const front = document.getElementById('chart-front-layer');
      const points = document.getElementById('chart-points-layer');
      const svgEl = (name, attrs) => {
        const el = document.createElementNS(svgNS, name);
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
        return el;
      };
      if (grid) {
      for (let i = 0; i <= 4; i++) {
        const x = 45 + i * 90, y = 17 + i * 33;
        grid.append(svgEl('line', {x1:x, y1:17, x2:x, y2:149, class:'chart-grid'}));
        grid.append(svgEl('line', {x1:45, y1:y, x2:405, y2:y, class:'chart-grid'}));
        if (i < 4) {
          const label = svgEl('text', {x:x+1,y:164,class:'chart-label'});
          label.textContent = (i * .25).toFixed(2);
          grid.append(label);
        }
      }
      grid.append(svgEl('line', {x1:45,y1:17,x2:45,y2:149,class:'chart-axes'}));
      grid.append(svgEl('line', {x1:45,y1:149,x2:405,y2:149,class:'chart-axes'}));
      const profiles = {
        nsga:  {label:'Run A', color:'#77cabb', offset: 0},
        moead: {label:'Run B', color:'#9cb8d4', offset: 7},
        rnsga: {label:'Run C', color:'#d2b795', offset: -5}
      };
      const render = key => {
        const p = profiles[key];
        front.replaceChildren(); points.replaceChildren();
        const linePoints = [];
        for (let i = 0; i < 33; i++) {
          const t = i / 32;
          linePoints.push(`${(49+t*342).toFixed(1)},${(140-94*Math.pow(t,.64)+p.offset*Math.sin(t*Math.PI)).toFixed(1)}`);
        }
        front.append(svgEl('polyline', {points:linePoints.join(' '), fill:'none', stroke:p.color, 'stroke-width':2.2, opacity:.95}));
        for (let i = 0; i < 68; i++) {
          const t = ((i*37)%71)/70;
          const noise = Math.sin(i*3.7)*9 + Math.cos(i*1.9)*4;
          const x = 49+t*342+Math.sin(i*2.1)*3;
          const y = Math.max(19, Math.min(147, 140-94*Math.pow(t,.64)+p.offset*Math.sin(t*Math.PI)+noise*.64+(i%6)*1.4));
          points.append(svgEl('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:i%7===0?3:2.1,fill:p.color,opacity:i%7===0?.94:.58}));
        }
        document.getElementById('plot-legend').textContent = `${p.label} / sample`;
        document.getElementById('metric-algorithm').textContent = p.label;
        document.querySelectorAll('.algo-tab').forEach(button => {
          const selected = button.dataset.algo === key;
          button.classList.toggle('active', selected);
          button.setAttribute('aria-pressed', String(selected));
        });
      };
      document.querySelectorAll('.algo-tab').forEach(b => b.addEventListener('click', () => render(b.dataset.algo)));
      render('nsga');


      }

      /* ---- Interactive design-loop diagram ---- */
      const segs = {
        simulation: {
          label: 'Simulation', sub: 'PREPARE + RUN', tag: 'Active development',
          title: 'Circuit simulation',
          text: 'Prepare a circuit, check it for issues and run simulations from one workspace.',
          items: ['Netlist preparation', 'Compatibility checks', 'Simulation runs']
        },
        optimization: {
          label: 'Optimization', sub: 'EXPLORE', tag: 'Active development',
          title: 'Design exploration',
          text: 'Search for trade-offs between competing design goals and keep every setting attached to the experiment.',
          items: ['Multi-objective search', 'Configurable experiments', 'Trade-off plots']
        },
        verification: {
          label: 'Verification', sub: 'CHECK', tag: 'In development',
          title: 'Layout checks',
          text: 'Check a chosen design against its layout constraints instead of stopping at simulation.',
          items: ['Layout viewing', 'Rule checks', 'Validation reports']
        }
      };
      const order = ['simulation', 'optimization', 'verification'];
      const loopSvg = document.getElementById('loop-svg');
      const panel = document.getElementById('loop-panel');
      if (loopSvg && panel) {
        const cx = 180, cy = 180, ro = 168, ri = 96, gap = 3.2;
        const pt = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
        const nodes = {};
        order.forEach((key, i) => {
          const a0 = i * 120 + gap / 2, a1 = (i + 1) * 120 - gap / 2;
          const [x0, y0] = pt(ro, a0), [x1, y1] = pt(ro, a1), [x2, y2] = pt(ri, a1), [x3, y3] = pt(ri, a0);
          const g = svgEl('g', { class: 'seg', tabindex: 0, role: 'button', 'aria-label': segs[key].label, 'data-key': key });
          g.append(svgEl('path', { d: `M${x0} ${y0} A${ro} ${ro} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 0 0 ${x3} ${y3} Z` }));
          const [tx, ty] = pt((ro + ri) / 2, i * 120 + 60);
          const t1 = svgEl('text', { x: tx.toFixed(1), y: (ty - 2).toFixed(1), 'text-anchor': 'middle' }); t1.textContent = segs[key].label;
          const t2 = svgEl('text', { x: tx.toFixed(1), y: (ty + 13).toFixed(1), 'text-anchor': 'middle', class: 'seg-sub' }); t2.textContent = segs[key].sub;
          g.append(t1, t2);
          loopSvg.append(g);
          nodes[key] = g;
        });
        const c1 = svgEl('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', class: 'loop-center-t' }); c1.textContent = 'CIRCADRA';
        const c2 = svgEl('text', { x: cx, y: cy + 14, 'text-anchor': 'middle', class: 'loop-center-s' }); c2.textContent = 'ANALOG / RF DESIGN LOOP';
        loopSvg.append(c1, c2);

        const show = key => {
          const s = segs[key];
          order.forEach(k => nodes[k].classList.toggle('active', k === key));
          panel.replaceChildren();
          const tag = document.createElement('span'); tag.className = 'loop-tag'; tag.textContent = s.tag;
          const h = document.createElement('h3'); h.textContent = s.title;
          const p = document.createElement('p'); p.textContent = s.text;
          const ul = document.createElement('ul');
          s.items.forEach(text => { const li = document.createElement('li'); li.textContent = text; ul.append(li); });
          panel.append(tag, h, p, ul);
        };
        order.forEach(key => {
          nodes[key].addEventListener('click', () => show(key));
          nodes[key].addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(key); } });
        });
        document.querySelectorAll('[data-seg]').forEach(a => a.addEventListener('click', () => show(a.dataset.seg)));
        show('optimization');
      }

      const terminal = document.getElementById('terminal-screen');
      const replay = document.getElementById('run-demo');
      const sample = [
        ['dim','# Illustrative command sequence'],
        ['cmd','$ circadra run --project differential_amp'],
        ['ok','✓ Workspace initialized'],
        ['dim','→ Reading circuit'],
        ['ok','✓ Netlist review complete'],
        ['dim','→ Objectives: gain, bandwidth'],
        ['ok','✓ Example result view generated'],
        ['dim','# Synthetic demonstration; no SPICE simulation was run.']
      ];
      let isRunning = false;
      replay.addEventListener('click', async () => {
        if (isRunning) return;
        isRunning = true;
        replay.disabled = true;
        terminal.replaceChildren();
        for (const [className, line] of sample) {
          const span = document.createElement('span');
          span.className = className;
          span.textContent = line;
          terminal.append(span, document.createTextNode('\n'));
          await new Promise(resolve => setTimeout(resolve, 190));
        }
        replay.disabled = false;
        isRunning = false;
      });
    })();
