"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProjectGrid({ initialImages = [], initialVideos = [] }) {
    const [visibleImageCount, setVisibleImageCount] = useState(6);
    const [visibleVideoCount, setVisibleVideoCount] = useState(4);
    const [loadingPriority, setLoadingPriority] = useState('sequential');

    useEffect(() => {
        const idleTimer = setTimeout(() => {
            if (loadingPriority === 'sequential') {
                setLoadingPriority('photos');
            }
        }, 1500);
        return () => clearTimeout(idleTimer);
    }, [loadingPriority]);

    const handlePhotoClick = () => setLoadingPriority('photos');
    const handleVideoClick = () => setLoadingPriority('videos');

    const loadMoreImages = () => {
        setLoadingPriority('photos');
        setVisibleImageCount(prev => prev + 12);
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
    };

    const loadMoreVideos = () => {
        setLoadingPriority('videos');
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
                <div
                    className="reels-container"
                    id="photoGrid"
                    onClick={handlePhotoClick}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '30px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px',
                        marginBottom: '40px'
                    }}
                >
                    {imagesToShow.map((file, i) => (
                        <div
                            className={`reveal reveal-delay-${(i % 3)}`}
                            key={file}
                            style={{
                                position: 'relative',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '35px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                backdropFilter: 'blur(10px)',
                                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '9/16',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)'
                            }}>
                                <Image
                                    src={`/mat/${file}`}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    style={{
                                        objectFit: 'cover',
                                        transition: 'opacity 0.5s ease'
                                    }}
                                    priority={loadingPriority === 'photos' || (loadingPriority === 'sequential' && i < 3)}
                                    loading={(loadingPriority === 'photos' || (loadingPriority === 'sequential' && i < 3)) ? "eager" : "lazy"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasMoreImages && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
                    <button onClick={loadMoreImages} className="btn-primary" style={{ padding: '12px 30px', borderRadius: '30px', fontSize: '14px' }}>
                        Показать еще работы
                    </button>
                </div>
            )}

            {/* ВИДЕО СЕКЦИЯ */}
            {initialVideos.length > 0 && (
                <div onClick={handleVideoClick}>
                    <div className="section-header reveal" style={{ marginTop: '120px', marginBottom: '60px' }}>
                        <span className="section-label" style={{ color: '#ffffff' }}>03.5 — Видеопортфолио</span>
                        <h2 style={{ color: '#ffffff', fontSize: '32px' }}>Наши Reels & Shorts</h2>
                        <div className="section-divider" style={{ background: 'rgba(255, 255, 255, 0.6)', width: '40px' }}></div>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '10px' }}>Кликните для просмотра в полном качестве</p>
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
                            <VideoItem
                                key={file}
                                file={file}
                                i={i}
                                priority={loadingPriority === 'videos'}
                            />
                        ))}
                    </div>
                </div>
            )}

            {hasMoreVideos && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <button onClick={loadMoreVideos} className="btn-primary" style={{ padding: '15px 40px', borderRadius: '30px' }}>
                        Больше видео
                    </button>
                </div>
            )}
        </div>
    );
}

// Отдельный компонент для видео с отложенной загрузкой и "умным" превью
function VideoItem({ file, i, priority }) {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        const el = document.getElementById(`video-container-${file}`);
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, [file]);

    return (
        <div
            id={`video-container-${file}`}
            className={`reveal reveal-delay-${(i % 3)}`}
            style={{
                position: 'relative',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '35px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9/16',
                borderRadius: '25px',
                overflow: 'hidden',
                background: 'linear-gradient(45deg, #121212, #252525)'
            }}>
                {/* Скелетон/Заглушка до появления в зоне видимости */}
                {!isLoaded && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(225,29,72,0.1), rgba(0,0,0,0.5))',
                        zIndex: 1
                    }}>
                        <div className="loading-spinner"></div>
                    </div>
                )}

                {isInView && (
                    <video
                        src={`/mat/${file}#t=0.001`} // Позволяет браузеру быстрее зацепить первый кадр как обложку
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                        }}
                        loop
                        muted
                        playsInline
                        preload={priority ? "auto" : "metadata"}
                        onLoadedData={() => setIsLoaded(true)}
                        onClick={(e) => {
                            if (e.target.paused) {
                                e.target.play();
                            } else {
                                e.target.pause();
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
}
