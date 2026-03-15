import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-badge">
          <span className="dot"></span>
          SMM-агентство полного цикла
        </div>
        <h1>Ravish<br />Productions</h1>
        <h2>Создаём. Продвигаем. Растём.</h2>
        <p>Мы — творческая команда, которая строит мощное цифровое присутствие брендов в социальных сетях. От идеи до результата.</p>
        <div className="hero-cta">
          <a href="#about" className="btn-primary">Узнать о нас ↓</a>
          <a href="#team" className="btn-outline">Наша команда</a>
        </div>
      </section>

      {/* ===== PAGE 1: О НАС ===== */}
      <section className="section" id="about">
        <div className="section-header reveal">
          <span className="section-label">01 — О нас</span>
          <h2>Кто мы такие</h2>
          <div className="section-divider"></div>
          <p className="section-desc">Мы команда специалистов, которая создаёт контент, управляет социальными сетями и доводит ваш бренд до нужной аудитории.</p>
        </div>

        <div className="about-grid">
          <div className="about-content reveal">
            <h3>Агентство, которое работает на результат</h3>
            <p>
              Ravish Productions — это не просто SMM-агентство. Мы создаём полноценную экосистему контента: от профессиональной съёмки и монтажа до продуманной стратегии продвижения в соцсетях.
            </p>
            <p>
              Наша команда объединяет сторис-мейкеров, фотографов, видеографов и SMM-специалистов — всё под одной крышей, чтобы ваш бренд звучал в унисон на всех платформах.
            </p>
            <div className="about-services">
              <div className="service-chip"><span className="chip-icon">✦</span> Сторис-мейкинг</div>
              <div className="service-chip"><span className="chip-icon">📸</span> Фотосъёмка</div>
              <div className="service-chip"><span className="chip-icon">🎬</span> Видеопроизводство</div>
              <div className="service-chip"><span className="chip-icon">📊</span> SMM-продвижение</div>
              <div className="service-chip"><span className="chip-icon">💡</span> Стратегия контента</div>
              <div className="service-chip"><span className="chip-icon">🚀</span> Таргетированная реклама</div>
            </div>
          </div>

          <div className="about-visual reveal reveal-delay-2">
            <div className="about-visual-inner">
              <div className="about-stat-row">
                <div className="about-stat-item">
                  <div className="about-stat-icon v">🎯</div>
                  <div>
                    <div className="about-stat-num">8</div>
                    <div className="about-stat-label">специалистов в команде</div>
                  </div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-icon p">📱</div>
                  <div>
                    <div className="about-stat-num" id="projects-num" data-target="0">0</div>
                    <div className="about-stat-label">проектов выполнено</div>
                  </div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-icon c">⭐</div>
                  <div>
                    <div className="about-stat-num" id="clients-num" data-target="0">0</div>
                    <div className="about-stat-label">довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAGE 2: КОМАНДА ===== */}
      <section className="section" id="team">
        <div className="section-header reveal">
          <span className="section-label">02 — Команда</span>
          <h2>Люди, которые делают магию</h2>
          <div className="section-divider"></div>
          <p className="section-desc">Каждый член нашей команды — профессионал своего дела. Вместе мы создаём контент, который работает.</p>
        </div>

        <div className="team-category">
          <div className="team-category-title reveal">
            <h3>Основатели</h3>
            <div className="cat-line"></div>
            <span className="cat-badge smm">2 человека</span>
          </div>
          <div className="team-grid">
            <div className="team-card smm-card reveal reveal-delay-1">
              <div className="team-avatar-placeholder avatar-smm">А</div>
              <div className="team-name">Джумаев Азиз</div>
              <div className="team-role">Основатель / Руководитель</div>
              <div className="team-skills">
                <span className="skill-tag s">Стратегия</span>
                <span className="skill-tag s">Развитие</span>
              </div>
            </div>

            <div className="team-card stories-card reveal reveal-delay-2">
              <img src="/photo1.jpg" alt="Усмонова Сафия" className="team-photo" />
              <div className="team-name">Усмонова Сафия</div>
              <div className="team-role">Основатель / Креативный директор</div>
              <div className="team-skills">
                <span className="skill-tag v">Креатив</span>
                <span className="skill-tag v">Продвижение</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAGE 5: СТАТИСТИКА ===== */}
      <section className="section" id="stats">
        <div className="section-header reveal">
          <span className="section-label">04 — Статистика</span>
          <h2>Наши цифры</h2>
          <div className="section-divider"></div>
        </div>

        <div className="stats-grid">
          <div className="stat-card reveal">
            <span className="stat-emoji">🤝</span>
            <span className="stat-number" id="stat-2">0</span>
            <span className="stat-label">С нами сотрудничают</span>
          </div>
          <div className="stat-card reveal reveal-delay-1">
            <span className="stat-emoji">📸</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span className="stat-number" style={{ marginRight: '5px' }}>&gt;</span>
              <span className="stat-number" id="stat-3">0</span>
            </div>
            <span className="stat-label">Фотосессий проведено</span>
          </div>
          <div className="stat-card reveal reveal-delay-2">
            <span className="stat-emoji">🎬</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span className="stat-number" style={{ marginRight: '5px' }}>&gt;</span>
              <span className="stat-number" id="stat-4">0</span>
            </div>
            <span className="stat-label">Видеороликов снято</span>
          </div>
          <div className="stat-card reveal reveal-delay-3">
            <span className="stat-emoji">✨</span>
            <span className="stat-number" id="stat-5">0</span>
            <span className="stat-label">Довольных клиентов</span>
          </div>
          <div className="stat-card reveal reveal-delay-1">
            <span className="stat-emoji">📈</span>
            <span className="stat-number" id="stat-6">0</span>
            <span className="stat-label">Сторис создано</span>
          </div>
        </div>
      </section>

      {/* ===== PAGE 6: КОНТАКТЫ ===== */}
      <ContactForm />

      {/* ===== FOOTER ===== */}
      <footer>
        <a href="#hero" className="footer-logo logo">
          <span className="logo-left">RAVISH</span>
          <span className="logo-right">&nbsp;PRODUCTIONS</span>
        </a>
        <div className="footer-center">
          © 2023 Ravish Productions. Все права защищены.
        </div>
      </footer>
    </main >
  );
}
