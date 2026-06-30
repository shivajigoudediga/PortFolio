
document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-bar li");
    const navBar = document.querySelector(".nav-bar");
    const navToggle = document.querySelector(".nav-toggle");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.target;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            navItems.forEach(li => li.classList.remove("active"));
            item.classList.add("active");

            if (navBar.classList.contains("open")) {
                navBar.classList.remove("open");
                navToggle.classList.remove("open");
            }
        });
    });

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navBar.classList.toggle("open");
            navToggle.classList.toggle("open");
        });
    }

    const sections = Array.from(navItems)
        .map(item => document.getElementById(item.dataset.target))
        .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(li => {
                    li.classList.toggle("active", li.dataset.target === id);
                });
            }
        });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    sections.forEach(sec => navObserver.observe(sec));

    const revealTargets = document.querySelectorAll(
        ".reveal, .skill-card, .project-card, .edu-card, .cert-card, .contact-cards"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * 70}ms`;
        revealObserver.observe(el);
    });

    const typeTarget = document.getElementById("typewriter");
    if (typeTarget) {
        const role = typeTarget.dataset.role || "";
        let i = 0;
        const speed = 55;

        function typeChar() {
            if (i <= role.length) {
                typeTarget.textContent = role.slice(0, i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        typeChar();
    }

    const navbar = document.querySelector(".main-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.style.boxShadow = "0 8px 24px rgba(0,0,0,.35)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
});