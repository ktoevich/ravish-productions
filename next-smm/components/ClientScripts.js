"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientScripts() {
    const pathname = usePathname();

    useEffect(() => {
        // ===== SCROLL REVEAL =====
        // Always check visibility when pathname changes
        const checkReveal = () => {
            document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 80) {
                    el.classList.add('visible');
                }
            });
        };

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (!isIOS) {
            document.documentElement.classList.add('js-animate');

            // Re-observe all elements
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.reveal').forEach(el => {
                // If it's already visible (e.g. from previous navigation), don't observe
                if (!el.classList.contains('visible')) {
                    revealObserver.observe(el);
                }
            });

            // Initial check + delayed check for slow-loading content
            checkReveal();
            const timer1 = setTimeout(checkReveal, 100);
            const timer2 = setTimeout(checkReveal, 500);

            window.addEventListener('scroll', checkReveal, { passive: true });

            return () => {
                window.removeEventListener('scroll', checkReveal);
                clearTimeout(timer1);
                clearTimeout(timer2);
                revealObserver.disconnect();
            }
        }
    }, [pathname]);

    useEffect(() => {
        // ===== COUNTER ANIMATION =====
        function animateCounter(el, target) {
            if (!el || target === 0) return;
            const duration = 1800;
            const start = performance.now();
            const update = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target).toLocaleString('ru');
                if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        }

        function animateCounterPercent(el, target) {
            if (!el || target === 0) return;
            const duration = 1800;
            const start = performance.now();
            const update = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target) + '%';
                if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        }

        const STAT_VALUES = {
            'stat-2': 16,
            'stat-3': 800,
            'stat-4': 1000,
            'stat-5': 38,
            'stat-6': 15000
        };

        const CHART_VALUES = {
            'er-stat': 18,
            'ig-pct': 65,
            'tt-pct': 25,
            'tg-pct': 10
        };

        let countersStarted = false;
        const statsSection = document.getElementById('stats');
        let observer;
        if (statsSection) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !countersStarted) {
                    countersStarted = true;
                    Object.entries(STAT_VALUES).forEach(([id, val]) => {
                        const el = document.getElementById(id);
                        if (!el) return;
                        animateCounter(el, val);
                    });
                    Object.entries(CHART_VALUES).forEach(([id, val]) => {
                        animateCounterPercent(document.getElementById(id), val);
                    });

                    const igBar = document.getElementById('ig-bar');
                    const ttBar = document.getElementById('tt-bar');
                    const tgBar = document.getElementById('tg-bar');
                    if (igBar) igBar.style.width = '65%';
                    if (ttBar) ttBar.style.width = '25%';
                    if (tgBar) tgBar.style.width = '10%';
                }
            }, { threshold: 0.2 });
            observer.observe(statsSection);
        }

        let aboutCountersStarted = false;
        const aboutSection = document.getElementById('about');
        let aboutObserver;
        if (aboutSection) {
            aboutObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !aboutCountersStarted) {
                    aboutCountersStarted = true;
                    const pEl = document.getElementById('projects-num');
                    const cEl = document.getElementById('clients-num');
                    if (pEl) animateCounter(pEl, 40);
                    if (cEl) animateCounter(cEl, 38);
                }
            }, { threshold: 0.3 });
            aboutObserver.observe(aboutSection);
        }

        return () => {
            if (statsSection && observer) observer.unobserve(statsSection);
            if (aboutSection && aboutObserver) aboutObserver.unobserve(aboutSection);
        }
    }, []);

    useEffect(() => {
        // ===== SMOOTH SCROLL =====
        const handleSmoothScroll = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(a => a.addEventListener('click', handleSmoothScroll));
        return () => links.forEach(a => a.removeEventListener('click', handleSmoothScroll));
    }, []);

    return null;
}
