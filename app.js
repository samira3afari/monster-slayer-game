// ۱. انتخاب عناصر DOM
const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logList = document.getElementById('log-list');
const controls = document.getElementById('controls'); // برای اضافه کردن دکمه ریست

// ۲. متغیرهای وضعیت بازی (State)
let monsterHealth = 100;
let playerHealth = 100;

// ۳. توابع کمکی برای به‌روزرسانی UI
function updateHealthBars() {
    monsterHealthBar.style.width = monsterHealth + '%';
    playerHealthBar.style.width = playerHealth + '%';
    
    // تغییر رنگ نوار سلامتی بر اساس مقدار
    if (monsterHealth < 30) monsterHealthBar.style.backgroundColor = '#dc3545'; // قرمز
    else if (monsterHealth < 60) monsterHealthBar.style.backgroundColor = '#ff9800'; // نارنجی
    else monsterHealthBar.style.backgroundColor = '#4caf50'; // سبز

    if (playerHealth < 30) playerHealthBar.style.backgroundColor = '#dc3545';
    else if (playerHealth < 60) playerHealthBar.style.backgroundColor = '#ff9800';
    else playerHealthBar.style.backgroundColor = '#4caf50';
}

// ۴. تابع ثبت رویداد در لاگ
function writeToLog(message) {
    const li = document.createElement('li');
    li.textContent = message;
    logList.appendChild(li);
}

// ۵. منطق حمله معمولی
function attackMonster() {
    const damage = Math.floor(Math.random() * 6) + 5;
    monsterHealth -= damage;
    if (monsterHealth < 0) monsterHealth = 0;
    
    writeToLog(`شما به هیولا حمله کردید و ${damage} آسیب وارد شد.`);
    updateHealthBars();

    monsterAttack(); // نوبت هیولا
}

// ۶. منطق حمله قدرتمند
function strongAttackMonster() {
    const damage = Math.floor(Math.random() * 10) + 10;
    monsterHealth -= damage;
    if (monsterHealth < 0) monsterHealth = 0;
    
    writeToLog(`شما یک حمله قدرتمند انجام دادید و ${damage} آسیب وارد شد!`);
    updateHealthBars();

    monsterAttack();
}

// ۷. تابع حمله هیولا به بازیکن
function monsterAttack() {
    // چک کردن برد
    if (monsterHealth <= 0) {
        writeToLog("🎉 شما هیولا را شکست دادید!");
        endGame();
        return; 
    }

    const damage = Math.floor(Math.random() * 6) + 5;
    playerHealth -= damage;
    if (playerHealth < 0) playerHealth = 0;
    writeToLog(`هیولا به شما حمله کرد و ${damage} آسیب وارد شد.`);
    updateHealthBars();

    // چک کردن باخت
    if (playerHealth <= 0) {
        writeToLog("💀 شما شکست خوردید!");
        endGame();
    }
}

// ۸. منطق درمان (Heal)
function healPlayer() {
    // اگر بازی تموم شده، اجازه درمان نده
    if (monsterHealth <= 0 || playerHealth <= 0) return;

    const healAmount = Math.floor(Math.random() * 10) + 5;
    playerHealth += healAmount;
    if (playerHealth > 100) playerHealth = 100;
    
    writeToLog(`شما خودتان را درمان کردید و ${healAmount} جان گرفتید.`);
    updateHealthBars();

    monsterAttack(); 
}

// ۹. تابع پایان بازی (غیرفعال کردن دکمه‌ها و نمایش دکمه شروع مجدد)
function endGame() {
    attackBtn.disabled = true;
    strongAttackBtn.disabled = true;
    healBtn.disabled = true;
    
    // جلوگیری از ساخت دکمه‌های تکراری
    if (document.getElementById('reset-btn')) return; 

    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-btn';
    resetBtn.textContent = "شروع مجدد بازی";
    resetBtn.style.backgroundColor = "#333";
    resetBtn.style.color = "white";
    resetBtn.style.marginTop = "0"; // چون توی flex هستیم نیازی به فاصله نیست
    resetBtn.style.padding = "12px 24px";
    resetBtn.style.borderRadius = "8px";
    resetBtn.style.cursor = "pointer";
    resetBtn.style.fontFamily = "Tahoma, sans-serif";
    
    resetBtn.addEventListener('click', () => {
        resetGame();
        // دکمه‌ها رو دوباره فعال کن
        attackBtn.disabled = false;
        strongAttackBtn.disabled = false;
        healBtn.disabled = false;
        resetBtn.remove();
    });
    
    // دکمه رو کنار بقیه دکمه‌ها اضافه کن (نه به ته body)
    controls.appendChild(resetBtn);
}

// ۱۰. تابع ریست کردن بازی
function resetGame() {
    monsterHealth = 100;
    playerHealth = 100;
    logList.innerHTML = ''; // پاک کردن لیست لاگ
    updateHealthBars();
    writeToLog("بازی از نو شروع شد!");
}

// ۱۱. وصل کردن دکمه‌ها به توابع
attackBtn.addEventListener('click', attackMonster);
strongAttackBtn.addEventListener('click', strongAttackMonster);
healBtn.addEventListener('click', healPlayer);

// اجرای اولیه برای مقداردهی اولیه نوارهای سلامتی
updateHealthBars();