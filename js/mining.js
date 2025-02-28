let gameData = {
    coin: 0,
    level: 1,
    earn: 10,
    max_energy: 10,
    energy: 10,
    level_price: 10,
    restore_energy_time_price: 50,
    earn_per_click_price: 50,
    max_energy_price: 100,
    restore_energy_time: 10000,
    lastSaveTime: Date.now()
};

const heart = document.querySelector('.mein__heart');

// Загружаем данные из localStorage при запуске
loadGameData();
updateUI();
restoreOfflineEnergy();
restoreEnergy();

function loadGameData() {
    const savedData = JSON.parse(localStorage.getItem('gameData'));
    if (savedData) {
        gameData = { ...gameData, ...savedData };  // Объединяем с дефолтными, чтобы не потерять новые поля
    }
}

function saveGameData() {
    gameData.lastSaveTime = Date.now();
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function updateUI() {
    document.querySelector('.main__coin').innerText = gameData.coin.toLocaleString();
    document.querySelector('.mein__earn_current').innerText = gameData.earn.toLocaleString();
    document.querySelector('.header__energy_currentenergy').innerText = gameData.energy.toLocaleString();
    document.querySelector('.header__energy_max_energy').innerText = gameData.max_energy.toLocaleString();
    document.querySelector('.header__level_currentlevel').innerText = gameData.level.toLocaleString();
    saveGameData();
}

document.querySelector('.mein__heart').addEventListener('click', () => {
    if (gameData.energy > 0) {
        gameData.coin += gameData.earn;
        gameData.energy -= 1;
        updateUI();
        heart.classList.add('hit');
        setTimeout(() => {
            heart.classList.remove('hit');
        }, 100);
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
    }
});

function restoreEnergy() {
    setInterval(() => {
        if (gameData.energy < gameData.max_energy) {
            gameData.energy += 1;
            updateUI();
        }
    }, gameData.restore_energy_time);
}

function restoreOfflineEnergy() {
    const timePassed = Date.now() - gameData.lastSaveTime;
    const energyToRestore = Math.floor(timePassed / gameData.restore_energy_time);
    gameData.energy = Math.min(gameData.max_energy, gameData.energy + energyToRestore);
    updateUI();
}
