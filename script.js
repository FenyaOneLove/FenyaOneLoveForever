// Create floating items
function createFloatingItems() {
    const container = document.getElementById('heartsContainer');
    const items = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '🌺', '✨', '💫', '🦋'];
    
    for (let i = 0; i < 50; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
    
        item.style.left = Math.random() * 100 + 'vw';
    
        const startTop = Math.random() * 100;
        item.style.top = startTop + 'vh';
    
        item.style.animationDuration = (Math.random() * 12 + 12) + 's';

        item.style.animationDelay = -(Math.random() * 20) + 's';
    
        item.style.fontSize = (Math.random() * 15 + 12) + 'px';
        container.appendChild(item);
    }
}

// Create twinkling particles
function createParticles() {
    const container = document.getElementById('heartsContainer');
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.background = Math.random() > 0.5 ? '#ff69b4' : '#a855f7';
        container.appendChild(particle);
    }
}

// No button logic
let runAwayCount = 0;
let messageTimeout = null;
let shakeTimeout = null;

const funnyMessages = [
    "Ха-ха! Хорошая попытка, Лиза! 😜💕",
    "Не-а! Эта кнопка тебя боится! 😏",
    "Кнопка «Нет» говорит: «Даже не думай!» 💖",
    "Оууу, просто нажми «Да» уже! 😘",
    "Эта кнопка просто набивает себе цену! 🙈",
    "Тебе её не поймать, Лиза! 😄",
    "Она убегает от тебя! 💕",
    "Кнопка «Нет» покинула чат! 😝",
    "Не та кнопка! ➡️ «Да» заждалась!",
    "Лиза, сопротивление бесполезно! 💘",
    "Эта кнопка слишком стеснительная! 🙊",
    "Продолжай пытаться... или просто нажми «Да»! 😉",
    "🧸 Мишка хочет, чтобы ты сказала «Да»!",
    "Мишка осуждает тебя! 🧸😂",
    "Сделай мишку счастливым, Лиза! 🧸💖"
];

let currentScale = 1;
let isHoveringYes = false;

function updateYesButtonScale() {
    const yesBtn = document.getElementById('yesBtn');
    const finalScale = isHoveringYes ? currentScale * 1.1 : currentScale;
    yesBtn.style.transform = `scale(${finalScale})`;
}

function updateTeddyGif() {
    const teddy = document.getElementById('main-teddy');
    if (!teddy) return;

    if (runAwayCount === 1) {
        teddy.src = "GomaGifs/Goma-Look.gif";
    }

    if (runAwayCount === 10) {
        teddy.src = "GomaGifs/Goma-Cry-1.gif";
    } 
    else if (runAwayCount === 20) {
        teddy.src = "GomaGifs/Goma-Cry-2.gif";
    } 
    else if (runAwayCount === 30) {
        teddy.src = "GomaGifs/Goma-Cry-3.gif";
    }
}

function runAway() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const hoverMessage = document.getElementById('hoverMessage');
    
    // Get Yes button position as anchor point
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const yesCenterX = yesBtnRect.left + yesBtnRect.width / 2;
    const yesCenterY = yesBtnRect.top + yesBtnRect.height / 2;
    
    // Strict radius around Yes button (100-180px)
    const minRadius = 100;
    const maxRadius = 180;
    
    // Random angle
    const angle = Math.random() * Math.PI * 2;
    
    // Random distance within radius
    const distance = minRadius + Math.random() * (maxRadius - minRadius);
    
    // Calculate new position
    let newX = yesCenterX + Math.cos(angle) * distance;
    let newY = yesCenterY + Math.sin(angle) * distance;
    
    // Get button dimensions
    const noBtnRect = noBtn.getBoundingClientRect();
    const btnWidth = noBtnRect.width;
    const btnHeight = noBtnRect.height;
    
    // Keep within viewport with padding
    const padding = 15;
    newX = Math.max(padding, Math.min(newX - btnWidth/2, window.innerWidth - btnWidth - padding));
    newY = Math.max(padding, Math.min(newY - btnHeight/2, window.innerHeight - btnHeight - padding));
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = `rotate(${Math.random() * 16 - 8}deg)`;
    noBtn.style.zIndex = '999';
    
    runAwayCount++;
    
    updateTeddyGif();

    if (shakeTimeout) {
        clearTimeout(shakeTimeout);
    }

    // Add shake
    noBtn.classList.add('shake');

    shakeTimeout = setTimeout(() => {
        noBtn.classList.remove('shake');
    }, 500);

    // Clear existing timeout
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }
    
    // Show message
    hoverMessage.textContent = funnyMessages[runAwayCount % funnyMessages.length];
    hoverMessage.classList.add('show');
    
    // Keep message visible for 4 seconds
    messageTimeout = setTimeout(() => {
        hoverMessage.classList.remove('show');
    }, 4000);
    
    // Make Yes button more attractive
    currentScale = Math.min(2.5, 1 + runAwayCount * 0.05);
    updateYesButtonScale();
    
    if (runAwayCount > 3) {
        yesBtn.style.boxShadow = `
            0 10px 30px rgba(255,105,180,0.6),
            0 0 ${15 + runAwayCount * 4}px rgba(255,105,180,0.5)
        `;
    }

    // Shrink No button after many attempts
    if (runAwayCount > 5) {
        const fontSize = Math.max(0.2, 1 - runAwayCount * 0.02);
        noBtn.style.fontSize = fontSize + 'rem';
    }
    
    // Fade No button
    if (runAwayCount > 10) {
        noBtn.style.opacity = 1 - (runAwayCount - 10) * 0.033;
    }

    // Change text
    if (runAwayCount === 10) {
        noBtn.textContent = "Промах! 🎯";
    }

    if (runAwayCount === 15) {
        noBtn.textContent = "Почти... но нет! 😋";
    }
    
    if (runAwayCount === 20) {
        noBtn.textContent = "Я буду убегать вечно! 🏃‍♂️💨";
    }
    
    if (runAwayCount === 25) {
        noBtn.textContent = "Даже компьютер против! 💻";
    }
    
    if (runAwayCount === 30) {
        noBtn.textContent = "Всё, я исчезаю... 💨";
    }

    if (runAwayCount >= 40) {
        noBtn.style.display = 'none'; 
    }
}

function sayYes() {
    createHeartBurst();
    const teddy = document.getElementById('main-teddy');
    teddy.src = "GomaGifs/Goma-Hears.gif";
    
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.background = 'radial-gradient(circle, #a855f7 0%, #0f0c29 100%)';
    
    setTimeout(() => {
        window.location.href = 'Celebration/celebration.html';
    }, 2000);
}

function createHeartBurst() {
    const items = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🧸', '✨'];
    const yesBtn = document.getElementById('yesBtn');
    const rect = yesBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const count = 100;
    
    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        const randomEmoji = items[Math.floor(Math.random() * items.length)];
        
        item.innerHTML = randomEmoji;
        item.style.position = 'fixed';
        item.style.left = centerX + 'px';
        item.style.top = centerY + 'px';
        
        const size = Math.random() * 35 + 15; 
        item.style.fontSize = size + 'px';
        
        item.style.pointerEvents = 'none';
        item.style.zIndex = '1000';
        item.style.transition = `all ${0.8 + Math.random() * 0.5}s cubic-bezier(0.1, 0.5, 0.3, 1)`; 
        
        document.body.appendChild(item);
        
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 400;
            const rotate = (Math.random() - 0.5) * 500;
            
            item.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(${rotate}deg)`;
            item.style.opacity = '0';
        }, 10);
        
        setTimeout(() => item.remove(), 1500);
    }
}

let lastSparkTime = 0;

document.addEventListener('mousemove', function(e) {
    const now = Date.now();

    if (now - lastSparkTime < 30) 
        return; 

    lastSparkTime = now;

    const items = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🧸', '✨'];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const spark = document.createElement('div');
    spark.innerHTML = randomItem;
    spark.style.position = 'fixed';
    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';
    const size = Math.floor(Math.random() * 10 + 15);
    spark.style.fontSize = size + 'px';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9999';
    spark.style.transition = 'all 0.8s ease-out';
    
    document.body.appendChild(spark);

    setTimeout(() => {
        const sideMovement = (Math.random() - 0.5) * 60;
        const rotate = (Math.random() - 0.5) * 100;
        spark.style.transform = `translate(${sideMovement}px, -80px) scale(0) rotate(${rotate}deg)`;
        spark.style.opacity = '0';
    }, 50);

    setTimeout(() => spark.remove(), 800);
});

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.onmouseenter = () => {
        isHoveringYes = true;
        updateYesButtonScale();
    };

    yesBtn.onmouseleave = () => {
        isHoveringYes = false;
        updateYesButtonScale();
    };

    // Initialize
    createFloatingItems();
    createParticles();

    console.log("%cЭй, Лизочка! Хватит смотреть код.", "color: #ff1493; font-size: 20px; font-weight: bold;");
    console.log("%cНажимай «ДА»!", "color: #ff1493; font-size: 50px; font-weight: bold;");
    console.log("%c❤️ ❤️ ❤️", "color: #ff1493; font-size: 70px; font-weight: bold;");
});