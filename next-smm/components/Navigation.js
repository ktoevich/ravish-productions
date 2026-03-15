"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            if (pathname === '/') {
                const sections = ['about', 'team', 'stats', 'contact'];
                let current = '';
                sections.forEach(id => {
                    const el = document.getElementById(id);
                    if (el && window.scrollY >= el.offsetTop - 120) current = id;
                });
                setActiveNav(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const toggleMenu = (open) => {
        setIsMenuOpen(open);
        if (typeof document !== 'undefined') {
            document.documentElement.style.overflow = open ? 'hidden' : '';
        }
    };

    const isHome = pathname === '/';

    return (
        <>
            <header id="header" className={scrolled ? 'scrolled' : ''}>
                <Link href="/" className="logo">
                    <span className="logo-left">RAVISH</span>
                    <span className="logo-right">&nbsp;PRODUCTIONS</span>
                </Link>
                <nav>
                    {isHome ? (
                        <>
                            <a href="#about" className={activeNav === 'about' ? 'active' : ''}>О нас</a>
                            <a href="#team" className={activeNav === 'team' ? 'active' : ''}>Команда</a>
                            <Link href="/projects" className={pathname === '/projects' ? 'active' : ''}>Наши работы</Link>
                            <a href="#stats" className={activeNav === 'stats' ? 'active' : ''}>Статистика</a>
                            <a href="#contact" className={activeNav === 'contact' ? 'active' : ''}>Связаться</a>
                        </>
                    ) : (
                        <>
                            <Link href="/">О нас</Link>
                            <Link href="/">Команда</Link>
                            <Link href="/projects" className="active">Наши работы</Link>
                            <Link href="/">Статистика</Link>
                            <Link href="/#contact">Связаться</Link>
                        </>
                    )}
                </nav>
                <button
                    className={`burger ${isMenuOpen ? 'open' : ''}`}
                    id="burger"
                    aria-label="Открыть меню"
                    onClick={() => toggleMenu(!isMenuOpen)}
                >
                    <span></span><span></span><span></span>
                </button>
            </header>

            <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`} id="mobile-nav">
                {isHome ? (
                    <>
                        <a href="#about" className={`m-nav-link ${activeNav === 'about' ? 'active' : ''}`} onClick={() => toggleMenu(false)}>О нас</a>
                        <a href="#team" className={`m-nav-link ${activeNav === 'team' ? 'active' : ''}`} onClick={() => toggleMenu(false)}>Команда</a>
                        <Link href="/projects" className={`m-nav-link ${pathname === '/projects' ? 'active' : ''}`} onClick={() => toggleMenu(false)}>Наши работы</Link>
                        <a href="#stats" className={`m-nav-link ${activeNav === 'stats' ? 'active' : ''}`} onClick={() => toggleMenu(false)}>Статистика</a>
                        <a href="#contact" className={`m-nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={() => toggleMenu(false)}>Связаться</a>
                    </>
                ) : (
                    <>
                        <Link href="/" className="m-nav-link" onClick={() => toggleMenu(false)}>На главную</Link>
                        <Link href="/projects" className="m-nav-link active" onClick={() => toggleMenu(false)}>Наши работы</Link>
                    </>
                )}
            </div>
            <div
                className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
                id="nav-overlay"
                onClick={() => toggleMenu(false)}
            ></div>
        </>
    );
}
