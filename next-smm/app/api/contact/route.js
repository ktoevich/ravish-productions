import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, phone, message } = await req.json();

        // Токены берём из переменных окружения, если их нет - используем заглушки
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';

        const text = `🔥 Новая заявка с сайта!\n\n👨 Имя: ${name}\n📞 Телефон/TG: ${phone}\n💬 Сообщение: ${message || '-'}`;

        if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            console.warn("ВНИМАНИЕ: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены. Сообщение не отправлено в Telegram. Данные:", { name, phone, message });
            // Вместо ошибки отправляем успех для демо, чтобы UI не ломался при тесте без токенов, 
            // но в реальном проде лучше будет выбрасывать ошибку
            return NextResponse.json({ success: true, message: 'Демо: Сообщение получено (токены не настроены)' }, { status: 200 });
        }

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Telegram API Error:", data);
            return NextResponse.json({ success: false, message: 'Ошибка отправки в Telegram' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Сообщение отправлено!' }, { status: 200 });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ success: false, message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
