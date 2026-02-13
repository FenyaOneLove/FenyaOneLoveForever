// ========== CONFETTI SYSTEM ==========
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const confettiColors = ['#ff69b4', '#ff1493', '#a855f7', '#ffb6c1', '#ff85a2', '#ffd700', '#ffffff', '#ee82ee', '#da70d6'];
const confettiShapes = ['circle', 'square', 'heart', 'star'];

let confettiParticles = [];

class Confetti {
    constructor(fromCenter = false) {
        this.reset(fromCenter);
    }

    reset(fromCenter = false) {
        if (fromCenter) {
            this.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
            this.y = canvas.height / 2;
            this.speedY = Math.random() * 15 - 12;
            this.speedX = Math.random() * 20 - 10;
        } else {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = Math.random() * 0.8 - 0.3;
        }
        this.size = Math.random() * 10 + 5;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;
        this.speedY += 0.005;

        if (this.y > canvas.height + 50) {
            this.reset(false);
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        switch (this.shape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'square':
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                break;
            case 'heart':
                this.drawHeart();
                break;
            case 'star':
                this.drawStar();
                break;
        }

        ctx.restore();
    }

    drawHeart() {
        const size = this.size;
        ctx.beginPath();
        ctx.moveTo(0, size / 4);
        ctx.bezierCurveTo(size / 2, -size / 4, size / 2, -size / 2, 0, -size / 4);
        ctx.bezierCurveTo(-size / 2, -size / 2, -size / 2, -size / 4, 0, size / 4);
        ctx.fill();
    }

    drawStar() {
        const spikes = 5;
        const outerRadius = this.size / 2;
        const innerRadius = this.size / 4;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

function createConfetti(count = 120) {
    for (let i = 0; i < count; i++) {
        const particle = new Confetti(false);
        particle.y = Math.random() * canvas.height;
        confettiParticles.push(particle);
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateConfetti);
}

function burstConfetti() {
    for (let i = 0; i < 80; i++) {
        confettiParticles.push(new Confetti(true));
    }
    
    if (confettiParticles.length > 350) {
        confettiParticles = confettiParticles.slice(-350);
    }
}

// ========== FLOATING BACKGROUND ==========
function createFloatingItems() {
    const container = document.getElementById('floatingBg');
    const items = ['💕', '💖', '💗', '✨', '💫', '🦋', '🌸', '💜'];

    for (let i = 0; i < 20; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.top = Math.random() * 100 + 'vh';
        item.style.fontSize = (Math.random() * 30 + 20) + 'px';
        item.style.animationDelay = Math.random() * 5 + 's';
        item.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(item);
    }
}

// ========== EMOJI RAIN ==========
function startEmojiRain() {
    const emojis = ['💕', '💖', '🌸', '✨', '💫', '🦋', '💗', '🌺'];
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-rain';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 4 + 4) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 8000);
    }, 700);
}

// ========== LOVE JAR ==========
const loveReasons = [
    { emoji: "😊", text: "Я люблю тебя за твою прекрасную улыбку — она освещает весь мой мир." },
    { emoji: "💭", text: "Я люблю тебя за то, что ты всегда в моих мыслях, с самого утра и до поздней ночи." },
    { emoji: "🎵", text: "Я люблю тебя за твой смех — это мой самый любимый звук во вселенной." },
    { emoji: "🏹", text: "Я люблю тебя за то, что ты попала в самое сердце, когда я этого совсем не ожидал." },
    { emoji: "🤗", text: "Я люблю тебя за то чувство тепла и безопасности, которое ты мне даришь." },
    { emoji: "✨", text: "Я люблю тебя за то, что ты превращаешь самые обычные моменты в сказку." },
    { emoji: "💪", text: "Я люблю тебя за то, что ты всегда поддерживаешь меня и веришь в мои силы." },
    { emoji: "🦋", text: "Я люблю тебя за то, что при виде тебя у меня до сих пор порхают бабочки в животе." },
    { emoji: "🌟", text: "Я люблю тебя за то, что ты вдохновляешь меня становиться лучше каждый день." },
    { emoji: "💕", text: "Я люблю тебя за то, что ты выбрала меня. Я бы выбирал тебя в каждой из жизней." },
    { emoji: "🌈", text: "Я люблю тебя за то, что ты приносишь в мою жизнь столько красок и радости." },
    { emoji: "💖", text: "Я люблю тебя просто за то, что ты есть, Лиза!" },
    { emoji: "🤝", text: "Я люблю тебя за то, что ты — мой лучший друг и моя родная душа." },
    { emoji: "🕯️", text: "Я люблю тебя за твою нежность, которая способна растопить любой холод в моей душе." },
    { emoji: "🚀", text: "Я люблю тебя за то, что с тобой я чувствую, что для нас нет ничего невозможного." },
    { emoji: "🌊", text: "Я люблю тебя за глубину твоего сердца, в которой я готов растворяться снова и снова." },
    { emoji: "⚡", text: "Я люблю тебя за ту невероятную химию между нами, которую невозможно описать словами." },
    { emoji: "🔭", text: "Я люблю тебя за то, что ты открываешь во мне грани, о которых я даже не подозревал." },
    { emoji: "🎨", text: "Я люблю тебя за то, что ты раскрашиваешь мои серые будни в самые яркие оттенки." },
    { emoji: "🌤️", text: "Я люблю тебя за то, что ты — моё личное солнце, которое светит даже в самый пасмурный день." },
    { emoji: "⏳", text: "Я люблю тебя за то, что каждая минута, проведенная с тобой, кажется мне бесценным даром." },
    { emoji: "🥨", text: "Я люблю тебя за то, как причудливо и неразрывно переплелись наши судьбы." },
    { emoji: "🔋", text: "Я люблю тебя за то, что ты — мой бесконечный источник энергии и вдохновения." },
    { emoji: "🧸", text: "Я люблю тебя за твою хрупкость и за то, что мне хочется защищать тебя от всего мира." },
    { emoji: "🎻", text: "Я люблю тебя за то, что ты умеешь задевать самые тонкие струны моей души." },
    { emoji: "🍒", text: "Я люблю тебя за ту сладость, которую ты привносишь в каждый мой день." },
    { emoji: "🌠", text: "Я люблю тебя за то, что с тобой даже самые смелые мечты кажутся достижимыми." },
    { emoji: "🕯️", text: "Я люблю тебя за теплоту твоей души, которая согревает меня в самые холодные времена." },
    { emoji: "🍯", text: "Я люблю тебя за твою мягкость и доброту, перед которыми я не могу устоять." },
    { emoji: "🎢", text: "Я люблю тебя за те эмоции, которые заставляют моё сердце биться чаще каждый раз." },
    { emoji: "🐾", text: "Я люблю тебя за то, что ты оставляешь след нежности в каждом моем воспоминании." },
    { emoji: "🎐", text: "Я люблю тебя за твою интуицию и за то, как тонко ты чувствуешь моё настроение." },
    { emoji: "💌", text: "Я люблю тебя за то, что ты — самое прекрасное послание, которое мне когда-либо отправляла судьба." },
    { emoji: "🏔️", text: "Я люблю тебя за то, что с тобой я готов покорить любую вершину." },
    { emoji: "👣", text: "Я люблю тебя за то, что хочу пройти этот путь длиной в жизнь именно с тобой." },
	{ emoji: "🍷", text: "Я люблю тебя за то, что с годами мои чувства к тебе становятся только глубже и крепче." },
	{ emoji: "⛲", text: "Я люблю тебя за то, что ты — мой вечный источник жизненных сил и вдохновения." },
	{ emoji: "🌙", text: "Я люблю тебя за то, что даже в самые темные времена ты остаешься моим ярким светом." },
	{ emoji: "🧲", text: "Я люблю тебя за твое невероятное притяжение, которому я сдаюсь без боя." },
	{ emoji: "🎡", text: "Я люблю тебя за то, что рядом с тобой жизнь превращается в чудесный праздник." },
	{ emoji: "📜", text: "Я люблю тебя за то, что ты — главная и самая прекрасная глава в моей судьбе." },
	{ emoji: "💎", text: "Я люблю тебя за твою редкостную чистоту души и искренность в каждом слове." },
	{ emoji: "♾️", text: "Я люблю тебя за то, что моей любви к тебе хватит на целую вечность." },
	{ emoji: "🌧️", text: "Я люблю тебя за то, что с тобой даже самый дождливый день кажется солнечным." },
	{ emoji: "🗝️", text: "Я люблю тебя за то, что ты доверяешь мне свои самые сокровенные тайны." },
	{ emoji: "🍵", text: "Я люблю тебя за твою заботу, которую я чувствую в каждой мелочи." },
	{ emoji: "🏔️", text: "Я люблю тебя за то, что ты веришь в меня, даже когда я сам в себе сомневаюсь." },
	{ emoji: "📸", text: "Я люблю тебя за то, что ты делаешь каждый кадр моей жизни идеальным." },
	{ emoji: "🚲", text: "Я люблю тебя за нашу общую историю, в которой важен каждый поворот." },
	{ emoji: "🍯", text: "Я люблю тебя за твой сладкий голос, который я готов слушать бесконечно." },
	{ emoji: "🔥", text: "Я люблю тебя за то, что ты разжигаешь во мне желание двигаться вперед." },
	{ emoji: "🌌", text: "Я люблю тебя за то, что мы можем молчать вдвоем, и это не будет неловко." },
	{ emoji: "🎸", text: "Я люблю тебя за то, что ты — музыка моего сердца." },
	{ emoji: "🎡", text: "Я люблю тебя за то, что с тобой я чувствую себя на вершине мира." },
	{ emoji: "💎", text: "Я люблю тебя за твой сильный характер и умение стоять на своем." },
	{ emoji: "🐚", text: "Я люблю тебя за твою хрупкость, которую мне хочется оберегать." },
	{ emoji: "🎀", text: "Я люблю тебя за то, что ты — самое дорогое украшение моей жизни." },
	{ emoji: "🦁", text: "Я люблю тебя за твою смелость быть собой в любой ситуации." },
	{ emoji: "🍀", text: "Я люблю тебя за то, что ты — моя самая большая удача в жизни." },
	{ emoji: "🧩", text: "Я люблю тебя за то, что ты дополняешь меня так, как никто другой." },
	{ emoji: "🛸", text: "Я люблю тебя за то, что наши странности идеально совпадают." },
	{ emoji: "🌅", text: "Я люблю тебя за то, что ты — первое, о чем я думаю, просыпаясь." },
	{ emoji: "🍂", text: "Я люблю тебя за то, что ты согреваешь меня лучше любого пледа." },
	{ emoji: "⚓", text: "Я люблю тебя за твою верность и преданность." },
	{ emoji: "🪐", text: "Я люблю тебя за то, что ты — центр моей маленькой вселенной." },
	{ emoji: "🧪", text: "Я люблю тебя за нашу магию, которую не объяснить наукой." },
	{ emoji: "🪄", text: "Я люблю тебя за то, что ты превращаешь мою жизнь в искусство." },
	{ emoji: "🤍", text: "Я люблю тебя просто за то, что ты — это ты." },
	{ emoji: "🍿", text: "Я люблю тебя за то, что даже самый скучный фильм с тобой становится шедевром." },
	{ emoji: "🌬️", text: "Я люблю тебя за то, что ты — мой глоток свежего воздуха, когда вокруг становится слишком душно." },
	{ emoji: "🌙", text: "Я люблю тебя за то, что ты — единственная, с кем я готов встречать каждый рассвет." },
	{ emoji: "🍰", text: "Я люблю тебя за то, что ты — самый сладкий десерт в моей жизни." },
	{ emoji: "🔍", text: "Я люблю тебя за то, что ты замечаешь во мне то прекрасное, чего не вижу я сам." },
	{ emoji: "🎡", text: "Я люблю тебя за то, что с тобой я снова и снова чувствую восторг, как в первый раз." },
	{ emoji: "🛸", text: "Я люблю тебя за то, что ты понимаешь мои самые странные шутки." },
	{ emoji: "🏔️", text: "Я люблю тебя за то, что ты делаешь меня сильнее одним своим присутствием." },
	{ emoji: "🌋", text: "Я люблю тебя за твой внутренний огонь, который невозможно не заметить." },
	{ emoji: "🥛", text: "Я люблю тебя за твою чистоту и искренность, которые так редко встречаются." },
	{ emoji: "🏡", text: "Я люблю тебя за то, что ты — мой самый надежный тыл." },
	{ emoji: "🎭", text: "Я люблю тебя за то, что с тобой мне не нужно играть никаких ролей." },
	{ emoji: "🪁", text: "Я люблю тебя за то, как высоко взлетает моя душа, когда ты шепчешь мне нежности." },
	{ emoji: "🛤️", text: "Я люблю тебя за то, что хочу идти с тобой в одном направлении вечно." },
	{ emoji: "🧩", text: "Я люблю тебя за то, что ты идеально подходишь мне по всем параметрам." },
	{ emoji: "🚲", text: "Я люблю тебя за то, что ты — мой лучший напарник в любом деле." },
	{ emoji: "🍀", text: "Я люблю тебя за то, что ты приносишь мне удачу во всем, за что я берусь." },
	{ emoji: "🦁", text: "Я люблю тебя за твою преданность своим идеалам и нашей любви." },
	{ emoji: "🧿", text: "Я люблю тебя за то, что ты — мой оберег от всех невзгод." },
	{ emoji: "🌌", text: "Я люблю тебя за то, что ты — моя путеводная звезда в этой темноте." },
	{ emoji: "🗝️", text: "Я люблю тебя за то, что ты открыла во мне способность любить так сильно." },
	{ emoji: "🔭", text: "Я люблю тебя за то, что с тобой будущее кажется ясным и прекрасным." },
	{ emoji: "👒", text: "Я люблю тебя за то, как ты умеешь радоваться простым мелочам." },
	{ emoji: "💎", text: "Я люблю тебя за твою уникальность — таких, как ты, больше не существует." },
	{ emoji: "🎧", text: "Я люблю тебя за то, что ты — мелодия, которая звучит у меня в голове 24/7." },
	{ emoji: "🧸", text: "Я люблю тебя за твою мягкость, в которой хочется раствориться." },
	{ emoji: "🏹", text: "Я люблю тебя за то, что ты сразила меня наповал своим очарованием." },
	{ emoji: "🚀", text: "Я люблю тебя за то, что ты вдохновляешь меня на великие поступки." },
	{ emoji: "🌊", text: "Я люблю тебя за то, что твоя любовь — это целый океан, в котором я счастлив." },
	{ emoji: "🪐", text: "Я люблю тебя за то, что ты — целая планета, которую я хочу изучать всю жизнь." },
	{ emoji: "🤍", text: "Я люблю тебя просто за то, что ты выбрала идти по этой жизни рядом со мной." },
    { emoji: "💫", text: "Я люблю в тебе каждую мелочь — этот список можно продолжать бесконечно!" }
];

let currentReasonIndex = 0;

function openLoveNote() {
    const popup = document.getElementById('loveNotePopup');
    const overlay = document.getElementById('overlay');
    const reason = loveReasons[currentReasonIndex];
    
    document.getElementById('noteEmoji').textContent = reason.emoji;
    document.getElementById('noteText').textContent = reason.text;
    document.getElementById('noteNumber').textContent = `Причина #${currentReasonIndex + 1} из ∞`;
    
    overlay.classList.add('show');
    popup.classList.add('show');
    
    currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
    
    for (let i = 0; i < 20; i++) {
        confettiParticles.push(new Confetti(true));
    }
}

function closeLoveNote() {
    const popup = document.getElementById('loveNotePopup');
    const overlay = document.getElementById('overlay');
    
    popup.classList.remove('show');
    overlay.classList.remove('show');
}

// ========== VIRTUAL HUG - GIF VERSION ==========
let virtualHugTimeout = null;

function sendVirtualHug() {
    const hugAnimation = document.getElementById('hugAnimation');
    const hugMessage = document.getElementById('hugMessage');
    
    // Show hug GIF and message
    hugAnimation.classList.add('show');
    hugMessage.classList.add('show');
    
    // Burst confetti
    burstConfetti();
    
    // Create extra floating hearts around the screen
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 80);
    }

    if (virtualHugTimeout) {
        clearTimeout(virtualHugTimeout);
    }
    // Hide after 3.5 seconds (matching animation duration)
    virtualHugTimeout = setTimeout(() => {
        hugAnimation.classList.remove('show');
        hugMessage.classList.remove('show');
    }, 3500);
}

function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🤗'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = (Math.random() * 80 + 10) + 'vw';
    heart.style.top = (Math.random() * 80 + 10) + 'vh';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '2999';
    heart.style.animation = 'pop-heart 1.5s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1500);
}

// ========== LOVE METER - MORPHING INFINITY ==========
let loveLevel = 0;
let isInfinityMode = false;
let infinityTimeout = null;

const loveMeterMessages = [
    "Продолжай! 💕",
    "Любовь растёт! 💖",
    "Сколько нежности! 💗",
    "Ещё чуть-чуть! 💓",
    "Переполняет! 💝"
];

function fillLoveMeter(amount = 1, sourceX = null, sourceY = null) {
    if (sourceX !== null && sourceY !== null) {
        showMeterFillIndicator(sourceX, sourceY);
    }

    if (isInfinityMode) return;

    loveLevel = Math.min(100, loveLevel + amount);
    
    const fill = document.getElementById('loveMeterFill');
    const text = document.getElementById('loveMeterText');
    
    fill.style.width = loveLevel + '%';
    
    if (loveLevel < 20) {
        text.textContent = loveMeterMessages[0];
    } else if (loveLevel < 40) {
        text.textContent = loveMeterMessages[1];
    } else if (loveLevel < 60) {
        text.textContent = loveMeterMessages[2];
    } else if (loveLevel < 80) {
        text.textContent = loveMeterMessages[3];
    } else if (loveLevel < 100) {
        text.textContent = loveMeterMessages[4];
    }
    
    if (loveLevel >= 100) {
        morphToInfinity();
    }
}

function morphToInfinity() {
    isInfinityMode = true;
    
    const meterContainer = document.getElementById('loveMeterContainer');
    const infinityContainer = document.getElementById('infinityContainer');
    const text = document.getElementById('loveMeterText');
    
    meterContainer.classList.add('morphing');
    
    setTimeout(() => {
        infinityContainer.classList.add('show');
        text.textContent = '∞ Бесконечная любовь к Лизе ∞';
        text.classList.add('infinity-text');
    }, 300);
    
    burstConfetti();
    
    infinityTimeout = setTimeout(() => {
        morphBackToBar();
    }, 10000);
}

function morphBackToBar() {
    const meterContainer = document.getElementById('loveMeterContainer');
    const infinityContainer = document.getElementById('infinityContainer');
    const fill = document.getElementById('loveMeterFill');
    const text = document.getElementById('loveMeterText');
    
    infinityContainer.classList.remove('show');
    
    setTimeout(() => {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        fill.offsetHeight;
        fill.style.transition = 'width 0.3s ease';
        meterContainer.classList.remove('morphing');
        text.textContent = "Давай заполним его снова! 💕";
        text.classList.remove('infinity-text');
        loveLevel = 0;
        isInfinityMode = false;
    }, 300);
}

function showMeterFillIndicator(x, y) {
    const indicators = ['💕', '💖', '+10', '💗', '+5'];
    const indicator = document.createElement('div');
    indicator.className = 'meter-fill-indicator';
    indicator.innerHTML = indicators[Math.floor(Math.random() * indicators.length)];
    indicator.style.left = x + 'px';
    indicator.style.top = y + 'px';
    
    if (indicator.innerHTML.includes('+')) {
        indicator.style.color = '#ffd700';
        indicator.style.fontWeight = 'bold';
        indicator.style.fontSize = '20px';
        indicator.style.textShadow = '0 0 10px rgba(255,215,0,0.8)';
    }
    
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 800);
}

// ========== UNIFIED INTERACTION HANDLER ==========
function handleInteraction(event, type) {
    const x = event.clientX || event.touches?.[0]?.clientX || window.innerWidth / 2;
    const y = event.clientY || event.touches?.[0]?.clientY || window.innerHeight / 2;
    
    // Always fill the love meter
    fillLoveMeter(1, x, y);
    
    // Create click hearts
    createClickHeart(event);
    
    // Handle specific interactions
    switch(type) {
        case 'confetti':
            burstConfetti();
            break;
        case 'hug':
            sendVirtualHug();
            break;
        case 'jar':
            openLoveNote();
            break;
        case 'heart':
            burstConfetti();
            break;
        case 'meter':
            // Already handled by fillLoveMeter
            break;
    }
}

// ========== CLICK HEARTS ==========
function createClickHeart(e) {
    const hearts = ['💕', '💖', '💗', '💓', '💝'];
    const x = e.clientX || e.touches?.[0]?.clientX || window.innerWidth / 2;
    const y = e.clientY || e.touches?.[0]?.clientY || window.innerHeight / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (x - 15 + (Math.random() - 0.5) * 40) + 'px';
            heart.style.top = (y - 15 + (Math.random() - 0.5) * 40) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 80);
    }
}

// General click handler for the page
document.addEventListener('click', (e) => {
    if (e.target.closest('.love-jar') || 
        e.target.closest('.action-btn') ||
        e.target.closest('.close-note-btn') ||
        e.target.closest('.mega-heart') ||
        e.target.closest('.love-meter-container') ||
        e.target.closest('.love-meter-wrapper') ||
        e.target.closest('.music-btn')) {
        return;
    }
    
    createClickHeart(e);
    fillLoveMeter(0.5, e.clientX, e.clientY);
});

// ========== SPARKLE CURSOR ==========
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 50) {
        lastSparkleTime = now;
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX - 4 + 'px';
        sparkle.style.top = e.clientY - 4 + 'px';
        sparkle.style.background = Math.random() > 0.5 ? 
            'radial-gradient(circle, #ff69b4, transparent)' : 
            'radial-gradient(circle, #a855f7, transparent)';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 600);
    }
});

// ========== COUNTDOWN ==========
function updateCountdown() {
    const valentinesDay = new Date('February 14, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;

    if (distance < 0) {
        document.getElementById('countdownSection').innerHTML = `
            <p class="countdown-title" style="color: #ff69b4; font-size: 1.5rem;">🎉 С Днём святого Валентина, Лиза! 🎉</p>
            <p style="color: #e0e0e0; font-size: 1.2rem; margin-top: 10px;">Сегодня НАШ особенный день! 💕</p>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Press 'L' for love burst
    if (e.key.toLowerCase() === 'l') {
        burstConfetti();
        fillLoveMeter(2);
    }
    
    // Press 'H' for hug
    if (e.key.toLowerCase() === 'h') {
        sendVirtualHug();
        fillLoveMeter(1.5);
    }
    
    // Press 'K' for Fenya special
    if (e.key.toLowerCase() === 'k') {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                heart.style.fontSize = (Math.random() * 40 + 20) + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '999';
                heart.style.animation = 'pop-heart 1.5s ease-out forwards';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }, i * 50);
        }
        fillLoveMeter(5);
    }
    
    // Press 'I' for instant infinity mode
    if (e.key.toLowerCase() === 'i') {
        if (!isInfinityMode) {
            loveLevel = 100;
            document.getElementById('loveMeterFill').style.width = '100%';
            morphToInfinity();
        }
    }
    
    // Press 'J' to open love jar
    if (e.key.toLowerCase() === 'j') {
        openLoveNote();
        fillLoveMeter(1);
    }
    
    // Press 'C' for confetti
    if (e.key.toLowerCase() === 'c') {
        burstConfetti();
        fillLoveMeter(1);
    }
});

// ========== TOUCH SUPPORT FOR MOBILE ==========
document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.love-jar') || 
        e.target.closest('.action-btn') ||
        e.target.closest('.close-note-btn') ||
        e.target.closest('.mega-heart') ||
        e.target.closest('.love-meter-container') ||
        e.target.closest('.love-meter-wrapper') ||
        e.target.closest('.music-btn')) {
        return;
    }
    
    const touch = e.touches[0];
    createClickHeart({ clientX: touch.clientX, clientY: touch.clientY });
    fillLoveMeter(0.5, touch.clientX, touch.clientY);
});

// ========== INITIALIZE EVERYTHING ==========
function init() {
    // Create initial confetti
    createConfetti(120);
    animateConfetti();
    
    // Create floating background items
    createFloatingItems();
    
    // Start emoji rain
    startEmojiRain();
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initial confetti burst on page load
    setTimeout(() => {
        burstConfetti();
    }, 500);

    // Auto-fill love meter slowly at start (to show it's interactive)
    setTimeout(() => {
        const autoFillInterval = setInterval(() => {
            if (loveLevel < 15 && !isInfinityMode) {
                loveLevel += 1;
                document.getElementById('loveMeterFill').style.width = loveLevel + '%';
            } else {
                clearInterval(autoFillInterval);
            }
        }, 300);
    }, 2000);
}

// Run initialization when page loads
init();

// ========== CONSOLE EASTER EGGS ==========
console.log('%c💕 Сделано с бесконечной любовью для Лизы! 💕', 'font-size: 24px; color: #ff69b4; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #a855f7;');
console.log('%c🎹 Секретные горячие клавиши:', 'font-size: 14px; color: #ffd700; font-weight: bold;');
console.log('%c   L = Взрыв сердечек', 'font-size: 12px; color: #ff69b4;');
console.log('%c   H = Отправить обнимашки', 'font-size: 12px; color: #ff69b4;');
console.log('%c   K = Сюрприз для Лизы! 💖', 'font-size: 12px; color: #ff69b4;');
console.log('%c   I = Режим бесконечности', 'font-size: 12px; color: #ff69b4;');
console.log('%c   J = Открыть баночку', 'font-size: 12px; color: #ff69b4;');
console.log('%c   C = Больше конфетти!', 'font-size: 12px; color: #ff69b4;');

console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #a855f7;');

