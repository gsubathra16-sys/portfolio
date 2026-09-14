document.addEventListener("DOMContentLoaded", () => {
    
    // ================= MOBILE NAVIGATION TOGGLE =================
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        const icon = menuBtn.querySelector("i");

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close mobile menu when a navigation link is clicked
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    // ================= DYNAMIC FOOTER YEAR =================
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ================= SCROLL REVEAL ANIMATIONS (FADE-IN) =================
    const observerOptions = { 
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((element) => {
        observer.observe(element);
    });


    // ================= PROJECT FILTER SYSTEM =================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                projectCards.forEach((card) => {
                    if (filter === "all" || card.dataset.category === filter) {
                        card.classList.remove("hide");
                    } else {
                        card.classList.add("hide");
                    }
                });
            });
        });
    }


    // ================= STATS COUNTER ANIMATION =================
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
        counters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            if (isNaN(target)) return;

            const speed = 100; // Animation Speed
            const updateCount = () => {
                const currentText = counter.innerText.replace('+', '');
                const count = +currentText;
                const inc = target / speed;

                if (count < target) {
                    // Check if the number has decimal (like 8.24)
                    if (target % 1 !== 0) {
                        counter.innerText = target; // Directly set decimal CGPA
                    } else {
                        counter.innerText = Math.ceil(count + inc) + '+';
                        setTimeout(updateCount, 25);
                    }
                } else {
                    counter.innerText = target + (target % 1 !== 0 ? '' : '+');
                }
            };

            updateCount();
        });
    };

    // Trigger Counter when Stats Section comes into view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, { threshold: 0.4 });

        statsObserver.observe(statsSection);
    }

});