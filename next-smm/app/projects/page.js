import fs from 'fs';
import path from 'path';
import ProjectGrid from '../../components/ProjectGrid';

export default function Projects() {
    const directoryPath = path.join(process.cwd(), 'public', 'mat');
    let images = [];
    let videos = [];

    try {
        const files = fs.readdirSync(directoryPath);
        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                images.push(file);
            } else if (['.mp4'].includes(ext)) {
                videos.push(file);
            }
        });
        images.sort();
        videos.sort();
    } catch (err) {
        console.error("Unable to scan directory: " + err);
    }

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #d40f38 0%, #e11d48 40%, #f43f5e 80%, #fb7185 100%)' }}>
            <section className="section" id="works">
                <div className="section-header reveal">
                    <span className="section-label" style={{ color: '#ffffff' }}>03 — Наши работы</span>
                    <h2 style={{ color: '#ffffff' }}>Наши работы</h2>
                    <div className="section-divider" style={{ background: 'rgba(255, 255, 255, 0.6)' }}></div>
                    <p className="section-desc" style={{ color: '#ffffff' }}>Каждый кадр — история</p>
                </div>

                <ProjectGrid initialImages={images} initialVideos={videos} />
            </section>
            {/* ===== FOOTER ===== */}
            <footer>
                <a href="/" className="footer-logo logo">
                    <span className="logo-left">RAVISH</span>
                    <span className="logo-right">&nbsp;PRODUCTIONS</span>
                </a>
                <div className="footer-center">
                    © 2023 Ravish Productions. Все права защищены.
                </div>
            </footer>
        </main>
    );
}
