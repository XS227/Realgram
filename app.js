(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tap-to-earn preview — mirrors the app's real coin-burst spec
  // (BRAND.md §4: scale 0.93 on press, gold radial burst, ~2600ms life).
  var tapTarget = document.getElementById("tapTarget");
  var toast = document.getElementById("earnToast");
  var phoneBody = document.querySelector(".phone-body");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var busy = false;

  function burst() {
    if (!phoneBody) return;
    var count = reduceMotion ? 0 : 10;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "burst-particle";
      var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      var dist = 46 + Math.random() * 34;
      p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--dy", Math.sin(angle) * dist - 30 + "px");
      p.style.transition = "transform 900ms cubic-bezier(.15,.7,.3,1), opacity 900ms ease";
      phoneBody.appendChild(p);
      requestAnimationFrame(function (el, dx, dy) {
        return function () {
          el.style.transform = "translate(" + dx + ", " + dy + ")";
          el.style.opacity = "0";
        };
      }(p, p.style.getPropertyValue("--dx"), p.style.getPropertyValue("--dy")));
      (function (el) {
        setTimeout(function () { el.remove(); }, 950);
      })(p);
    }
  }

  if (tapTarget && toast) {
    tapTarget.addEventListener("click", function () {
      if (busy) return;
      busy = true;
      burst();
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); }, 1300);
      setTimeout(function () { busy = false; }, 1500);
    });
  }

  // Journey waypoints + general section reveals fade in as they scroll into
  // view. Same observer covers both .waypoint (thread stops) and .reveal
  // (section headers, card grids) — one mechanism, not two.
  var revealTargets = document.querySelectorAll(".waypoint, .reveal");
  if (revealTargets.length && "IntersectionObserver" in window) {
    if (reduceMotion) {
      revealTargets.forEach(function (w) { w.classList.add("in-view"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });
      revealTargets.forEach(function (w) { io.observe(w); });
    }
  } else {
    revealTargets.forEach(function (w) { w.classList.add("in-view"); });
  }

  // Parallax on the background field — cheap, transform-only, tied to
  // scroll via rAF so it never runs more than once per frame.
  var bgField = document.querySelector(".bg-field");
  if (bgField && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        bgField.style.transform = "translateY(" + (window.scrollY * 0.12) + "px)";
        ticking = false;
      });
    }, { passive: true });
  }

  // Ambient gold dust — the same atmosphere language as Shahnameh's own
  // cinematic.js ("atmosphere supports emotion, it does not compete with
  // it"), ported here so the site and the game read as one world. 14
  // particles max, pauses when the tab is hidden, skipped entirely under
  // reduced motion.
  if (!reduceMotion) {
    var dustCanvas = document.getElementById("cinematicDust");
    if (dustCanvas) {
      var ctx = dustCanvas.getContext("2d");
      var W = 0, H = 0;
      function resizeDust() {
        W = dustCanvas.width = window.innerWidth;
        H = dustCanvas.height = window.innerHeight;
      }
      resizeDust();
      window.addEventListener("resize", resizeDust, { passive: true });

      var COUNT = Math.min(14, Math.floor(window.innerWidth / 28));
      var pts = [];
      for (var i = 0; i < COUNT; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.1 + 0.2,
          vx: (Math.random() - 0.5) * 0.10,
          vy: -(Math.random() * 0.13 + 0.03),
          base: Math.random() * 0.32 + 0.06,
          phase: Math.random() * Math.PI * 2,
          col: Math.random() < 0.65 ? "212,175,55" : "199,125,255"
        });
      }

      var tick = 0, raf;
      function drawDust() {
        tick++;
        if (tick % 2 === 0) {
          ctx.clearRect(0, 0, W, H);
          pts.forEach(function (p) {
            p.x += p.vx; p.y += p.vy; p.phase += 0.008;
            if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
            if (p.x < -8) p.x = W + 8;
            if (p.x > W + 8) p.x = -8;
            var a = p.base * (0.6 + 0.4 * Math.sin(p.phase));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(" + p.col + "," + a.toFixed(2) + ")";
            ctx.fill();
          });
        }
        raf = requestAnimationFrame(drawDust);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(drawDust);
      });
      raf = requestAnimationFrame(drawDust);

      requestAnimationFrame(function () {
        dustCanvas.style.transition = "opacity 3s ease";
        dustCanvas.style.opacity = "0.28";
      });
    }
  }
})();
