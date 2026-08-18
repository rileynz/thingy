(() => {
  const cfg = window.THINGY_CONFIG || { devices: {} };
  const deviceId = document.body.dataset.device;
  const q = (sel) => document.querySelector(sel);
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  function renderHome() {
    const host = q('#device-grid');
    if (!host) return;

    host.innerHTML = Object.entries(cfg.devices).map(([id, d]) => `
      <a class="registry-card" href="/thingy/${esc(id)}/" aria-label="Open ${esc(d.name)} identity page">
        <div class="registry-card-head">
          <div class="unit-mark">${esc(d.accent || id.padStart(2, '0'))}</div>
          <span class="verified-chip"><span></span> Registered</span>
        </div>
        <div class="registry-card-body">
          <p class="micro-label">${esc(d.registryName)}</p>
          <h2>${esc(d.name)}</h2>
          <p>${esc(d.subtitle)}</p>
        </div>
        <div class="registry-card-foot">
          <span>${esc(d.role)}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </div>
      </a>
    `).join('');
  }

  async function copyCurrent() {
    const button = q('#copy-btn');
    try {
      await navigator.clipboard.writeText(location.href);
      if (button) {
        const original = button.textContent;
        button.textContent = 'Link copied';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = original;
          button.classList.remove('copied');
        }, 1400);
      }
    } catch (_) {
      window.prompt('Copy this device URL:', location.href);
    }
  }

  function renderDevice() {
    if (!deviceId) return;
    const d = cfg.devices[deviceId];
    if (!d) {
      location.replace('/404.html');
      return;
    }

    const fields = {
      '#device-name': d.name,
      '#device-registry-name': d.registryName,
      '#device-subtitle': d.subtitle,
      '#device-number': d.accent || deviceId.padStart(2, '0'),
      '#device-role': d.role,
      '#device-purpose': d.purpose,
      '#device-name-footer': d.name,
      '#owner-name': cfg.ownerName || 'Riley',
      '#nfc-url': `${location.origin}/thingy/${deviceId}/`
    };

    Object.entries(fields).forEach(([selector, value]) => {
      const el = q(selector);
      if (el) el.textContent = value;
    });

    const cloud = q('#cloud-link');
    if (cloud) cloud.href = d.nrfCloudUrl || 'https://nrfcloud.com';
    q('#copy-btn')?.addEventListener('click', copyCurrent);
  }

  renderHome();
  renderDevice();
})();
