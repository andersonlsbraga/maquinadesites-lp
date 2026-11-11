/* Comum aos sites de portfólio (projeto conceito da Máquina de Sites).
   - selo fixo "Projeto conceito" com link pra Máquina de Sites (UTM por site)
   - botões [data-wpp="mensagem"] mostram a mensagem que iria pro WhatsApp da empresa
   - .rv entra com animação quando aparece na tela
   - [data-conta="123"] conta de 0 até o número */
(function () {
  const site = document.documentElement.dataset.site || 'portfolio';
  const MDS = 'https://maquinadesites.online/?utm_source=portfolio&utm_medium=site&utm_campaign=' + site;

  const css = `
  .mds-selo{position:fixed;left:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:10px;background:rgba(12,12,12,.86);backdrop-filter:blur(10px);color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 14px 8px 8px;font:600 12.5px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;text-decoration:none;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:transform .25s}
  .mds-selo:hover{transform:translateY(-2px)}
  .mds-selo i{width:30px;height:30px;border-radius:50%;background:#FFC83D;color:#111;display:grid;place-items:center;font:900 13px system-ui;font-style:normal}
  .mds-selo b{display:block;font-weight:800}.mds-selo span{opacity:.7;font-weight:500}
  .mds-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px}
  .mds-modal.on{display:flex}
  .mds-card{width:min(420px,100%);background:#0b141a;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);font-family:system-ui,-apple-system,Segoe UI,sans-serif;animation:mdsIn .35s cubic-bezier(.2,.9,.3,1.2)}
  @keyframes mdsIn{from{transform:translateY(20px) scale(.96);opacity:0}}
  .mds-top{background:#202c33;color:#e9edef;padding:14px 18px;display:flex;align-items:center;gap:12px;font-weight:600}
  .mds-top i{width:38px;height:38px;border-radius:50%;background:#25d366;display:grid;place-items:center;font-style:normal}
  .mds-top small{display:block;color:#8696a0;font-weight:500;font-size:12px}
  .mds-chat{padding:18px;min-height:120px;background:#0b141a}
  .mds-msg{margin-left:auto;max-width:88%;background:#005c4b;color:#e9edef;border-radius:14px 4px 14px 14px;padding:10px 12px 18px;font-size:14.5px;line-height:1.4;position:relative;white-space:pre-line}
  .mds-msg small{position:absolute;right:10px;bottom:3px;font-size:10.5px;color:rgba(233,237,239,.6)}
  .mds-info{background:#111b21;color:#aebac1;padding:14px 18px;font-size:13px;line-height:1.45}
  .mds-info a{color:#FFC83D;font-weight:700}
  .mds-fechar{display:block;width:100%;padding:14px;border:0;background:#25d366;color:#08130d;font:800 14px system-ui;cursor:pointer}
  .rv{opacity:0;transform:translateY(40px);transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1s cubic-bezier(.2,.7,.2,1)}
  .rv.in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const selo = document.createElement('a');
  selo.className = 'mds-selo'; selo.href = MDS; selo.target = '_blank'; selo.rel = 'noopener';
  selo.innerHTML = '<i>IA</i><div><b>Projeto conceito</b><span>Quero um site assim →</span></div>';
  document.body.appendChild(selo);

  const modal = document.createElement('div');
  modal.className = 'mds-modal';
  modal.innerHTML = `<div class="mds-card"><div class="mds-top"><i>✆</i><div>${document.documentElement.dataset.marca || 'Empresa'}<small>WhatsApp da empresa</small></div></div>
    <div class="mds-chat"><div class="mds-msg"><span></span><small>agora ✓✓</small></div></div>
    <div class="mds-info">Este é um <b>projeto conceito</b>. No site de um cliente real, este botão abre o WhatsApp da empresa já com essa mensagem escrita. Feito com IA na <a href="${MDS}" target="_blank" rel="noopener">Máquina de Sites</a>.</div>
    <button class="mds-fechar">Entendi</button></div>`;
  document.body.appendChild(modal);
  const fechar = () => modal.classList.remove('on');
  modal.addEventListener('click', e => { if (e.target === modal || e.target.classList.contains('mds-fechar')) fechar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  window.mdsWpp = function (texto) {
    modal.querySelector('.mds-msg span').textContent = texto;
    modal.classList.add('on');
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-wpp]');
    if (!b) return;
    e.preventDefault();
    let t = b.dataset.wpp;
    const f = b.closest('form');
    if (f && f.reportValidity && !f.reportValidity()) return;
    if (f) t = t.replace(/\{(\w+)\}/g, (_, k) => (f.elements[k] && f.elements[k].value) || '');
    window.mdsWpp(t);
  });

  const io = new IntersectionObserver(es => es.forEach(x => {
    if (!x.isIntersecting) return;
    x.target.classList.add('in');
    const n = x.target.dataset.conta;
    if (n) {
      const alvo = parseFloat(n), dec = (n.split('.')[1] || '').length, t0 = performance.now(), dur = 1600;
      const pre = x.target.dataset.pre || '', suf = x.target.dataset.suf || '';
      const passo = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        x.target.textContent = pre + (alvo * e).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
        if (p < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    }
    io.unobserve(x.target);
  }), { threshold: .15 });
  const observa = () => document.querySelectorAll('.rv:not(.in),[data-conta]').forEach(el => io.observe(el));
  if (document.readyState !== 'loading') observa(); else document.addEventListener('DOMContentLoaded', observa);
  window.mdsObserva = observa;
})();
