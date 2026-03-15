"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProjectGrid({ initialImages = [], initialVideos = [] }) {
    const [visibleImageCount, setVisibleImageCount] = useState(12);
    const [visibleVideoCount, setVisibleVideoCount] = useState(6);

    const loadMoreImages = () => {
        setVisibleImageCount(prev => prev + 12);
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
    };

    const loadMoreVideos = () => {
        setVisibleVideoCount(prev => prev + 6);
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
    };

    const imagesToShow = initialImages.slice(0, visibleImageCount);
    const hasMoreImages = visibleImageCount < initialImages.length;

    const videosToShow = initialVideos.slice(0, visibleVideoCount);
    const hasMoreVideos = visibleVideoCount < initialVideos.length;

    return (
        <div style={{ paddingBottom: '100px' }}>
            {/* ФОТО СЕКЦИЯ */}
            {imagesToShow.length > 0 && (
                <div className="photo-grid" id="photoGrid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', marginBottom: '40px' }}>
                    {imagesToShow.map((file, i) => (
                        <div
                            className={`photo-item reveal reveal-delay-${(i % 4)}`}
                            key={file}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                position: 'relative',
                                overflow: 'hidden',
                                aspectRatio: '1/1'
                            }}
                        >
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <Image
                                    src={`/mat/${file}`}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    style={{ objectFit: 'cover' }}
                                    priority={i < 4}
                                    loading={i < 4 ? "eager" : "lazy"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasMoreImages && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
                    <button onClick={loadMoreImages} className="btn-primary" style={{ padding: '12px 30px', borderRadius: '30px', fontSize: '14px' }}>
                        Загрузить еще фото
                    </button>
                </div>
            )}

            {/* ВИДЕО СЕКЦИЯ (REELS / SHORTS) */}
            {initialVideos.length > 0 && (
                <>
                    <div className="section-header reveal" style={{ marginTop: '120px', marginBottom: '60px' }}>
                        <span className="section-label" style={{ color: '#ffffff' }}>03.5 — Видеопортфолио</span>
                        <h2 style={{ color: '#ffffff', fontSize: '32px' }}>Наши Reels & Shorts</h2>
                        <div className="section-divider" style={{ background: 'rgba(255, 255, 255, 0.6)', width: '40px' }}></div>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '10px' }}>Посмотрите наши лучшие вертикальные работы</p>
                    </div>

                    <div className="reels-container" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '30px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px'
                    }}>
                        {videosToShow.map((file, i) => (
                            <div
                                className={`reveal reveal-delay-${(i % 3)}`}
                                key={file}
                                style={{
                                    position: 'relative',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '35px', // More rounded like a phone
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {/* The "Phone Screen" Container */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '9/16',
                                    borderRadius: '25px',
                                    overflow: 'hidden',
                                    background: '#000'
                                }}>
                                    <video
                                        src={`/mat/${file}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                    />


                                </div>
                            </div>
                        ))}
                    </div>

                    {hasMoreVideos && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                            <button onClick={loadMoreVideos} className="btn-primary" style={{ padding: '15px 40px', borderRadius: '30px' }}>
                                Больше видео
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
