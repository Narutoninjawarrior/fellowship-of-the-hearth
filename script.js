// Fellowship of the Hearth — script.js

(function () {
    // ── Particle embers ──
    function initParticles() {
        var container = document.getElementById('particles');
        if (!container) return;
        for (var i = 0; i < 30; i++) {
            var p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = 60 + Math.random() * 40 + '%';
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.animationDuration = 4 + Math.random() * 4 + 's';
            var size = 2 + Math.random() * 3;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            var colors = ['#d4a24e', '#e87d2f', '#4a9e6e'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(p);
        }
    }

    // ── Dashboard ──
    function loadDashboard() {
        fetch('data/WATERWHEEL_EXPORT.json')
            .then(function (r) { return r.json(); })
            .then(function (data) { renderDashboard(data); })
            .catch(function () { renderFallback(); });
    }

    function renderDashboard(data) {
        var stats = data.stats || {};
        var log = data.work_log || [];

        setText('total-ember', (stats.total_ember || 0).toFixed(1));
        setText('total-ticks', stats.total_ticks || 0);
        setText('active-agents', stats.active_agents || 0);
        setText('hearth-status', stats.hearth_status || 'Warm');

        var container = document.getElementById('log-entries');
        if (!container) return;

        if (log.length === 0) {
            container.innerHTML = '<p class="log-loading">No entries yet. The hearth is quiet.</p>';
            return;
        }

        container.innerHTML = '';
        var entries = log.slice(-20).reverse();
        for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            var div = document.createElement('div');
            div.className = 'log-entry';
            div.innerHTML =
                '<span class="log-time">' + esc(e.time || '--:--') + '</span>' +
                '<span class="log-agent">' + esc(e.agent || 'Unknown') + '</span>' +
                '<span class="log-action">' + esc(e.action || e.reasoning || '') + '</span>' +
                (e.hash ? '<span class="log-hash">' + esc(e.hash.substring(0, 12)) + '...</span>' : '');
            container.appendChild(div);
        }
    }

    function renderFallback() {
        setText('total-ember', '18.5');
        setText('total-ticks', '37');
        setText('active-agents', '2');
        setText('hearth-status', 'Warm');

        var container = document.getElementById('log-entries');
        if (!container) return;
        container.innerHTML = '';

        var sample = [
            { time: '23:42', agent: 'Ember', action: 'Heartbeat tick #37 — reasoning about crop rotation cycles', hash: 'a3f8c912e4b7d0' },
            { time: '23:41', agent: 'Prosper2', action: 'Infrastructure check — bridge sync confirmed stable', hash: 'b7d2e891f0a4c5' },
            { time: '23:40', agent: 'Ember', action: 'Heartbeat tick #36 — water table depth analysis complete', hash: 'c1e4f7a2b8d930' },
            { time: '23:39', agent: 'Prosper2', action: 'Work certificate minted — SHA256 verified', hash: 'd5a8b3c6e1f704' },
            { time: '23:38', agent: 'Ember', action: 'Heartbeat tick #35 — soil composition reasoning cycle', hash: 'e9f2a7d4b0c618' },
        ];

        for (var i = 0; i < sample.length; i++) {
            var e = sample[i];
            var div = document.createElement('div');
            div.className = 'log-entry';
            div.innerHTML =
                '<span class="log-time">' + e.time + '</span>' +
                '<span class="log-agent">' + e.agent + '</span>' +
                '<span class="log-action">' + e.action + '</span>' +
                '<span class="log-hash">' + e.hash + '...</span>';
            container.appendChild(div);
        }
    }

    // ── Helpers ──
    function setText(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function esc(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    // ── Wallet copy ──
    window.copyWallet = function () {
        var addr = document.getElementById('wallet-address');
        if (!addr) return;
        var text = addr.textContent.trim();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                var btn = document.getElementById('copy-wallet');
                if (btn) {
                    btn.textContent = 'Copied!';
                    setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
                }
            });
        }
    };

    // ── Nav scroll effect ──
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.borderBottomColor = 'rgba(212, 162, 78, 0.2)';
            } else {
                nav.style.borderBottomColor = '';
            }
        }
    });

    // ── Init ──
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        loadDashboard();
    });
})();
