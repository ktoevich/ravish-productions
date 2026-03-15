"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('');

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('success');
                setStatusMessage(result.message || '✅ Сообщение успешно отправлено!');
                e.target.reset();
                setTimeout(() => setStatus(''), 5000); // Скрыть через 5 секунд
            } else {
                setStatus('error');
                setStatusMessage(result.message || '❌ Ошибка отправки.');
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage('❌ Сервер недоступен, попробуйте позже.');
        }
    };

    return (
        <section className="section" id="contact" style={{ background: 'var(--gradient-section-alt)' }}>
            <div className="section-header reveal">
                <span className="section-label">05 — КОНТАКТЫ</span>
                <h2>Связаться с нами</h2>
                <div className="section-divider"></div>
                <p className="section-desc">Оставьте заявку, и мы обсудим ваш проект в ближайшее время!</p>
            </div>

            <div className="contact-wrapper reveal">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Ваше имя</label>
                        <input type="text" id="name" name="name" required placeholder="Как к вам обращаться?" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Телефон или Telegram</label>
                        <input type="text" id="phone" name="phone" required placeholder="+7 (999) 000-00-00 или @username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Сообщение (необязательно)</label>
                        <textarea id="message" name="message" rows="4" placeholder="Напишите пару слов о вашем проекте..."></textarea>
                    </div>

                    <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        {status === 'loading' ? 'Отправка...' : 'Оставить заявку'}
                    </button>

                    {status === 'success' && <div className="form-success">{statusMessage}</div>}
                    {status === 'error' && <div className="form-error">{statusMessage}</div>}
                </form>
            </div>
        </section>
    );
}
