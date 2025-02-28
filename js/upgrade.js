let gameData = {
    coin: 0,
    level: 1,
    earn: 10,
    max_energy: 10,
    energy: 10,
    level_price: 10,
    restore_energy_time_price: 50,
    earn_per_click_price: 100,
    max_energy_price: 100,
    restore_energy_time: 10000,
    lastSaveTime: Date.now()
};

// Загружаем данные при запуске
loadGameData();
updateShop();

function loadGameData() {
    const savedData = JSON.parse(localStorage.getItem('gameData'));
    if (savedData) {
        gameData = { ...gameData, ...savedData };  // Объединяем с дефолтными
    }
}

function saveGameData() {
    gameData.lastSaveTime = Date.now();
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function updateShop() {
    document.querySelector('.number_of_coins').innerText = gameData.coin.toLocaleString();
    document.querySelector('.main__upgrade_level_price').innerText = gameData.level_price.toLocaleString();
    document.querySelector('.main__upgrade_restore_energy_time_price').innerText = gameData.restore_energy_time_price.toLocaleString();
    document.querySelector('.main__upgrade_earn_price').innerText = gameData.earn_per_click_price.toLocaleString();
    document.querySelector('.main__upgrade_max_energy_price').innerText = gameData.max_energy_price.toLocaleString();
}

document.querySelector('.main__upgrade_level').addEventListener('click', () => {
    if (gameData.coin >= gameData.level_price) {
        gameData.coin -= gameData.level_price;

        gameData.level++;
        gameData.earn++;
        gameData.max_energy++;

        gameData.level_price = gameData.level_price * gameData.level;

        updateShop();
        saveGameData();
    }
});

document.querySelector('.main__upgrade_restore_energy_time').addEventListener('click', () => {
    if (gameData.coin >= gameData.restore_energy_time_price) {
        gameData.coin -= gameData.restore_energy_time_price;

        gameData.restore_energy_time = gameData.restore_energy_time - 100;

        gameData.restore_energy_time_price = gameData.restore_energy_time_price * 3;

        updateShop();
        saveGameData();
    }
});

document.querySelector('.main__upgrade_earn').addEventListener('click', () => {
    if (gameData.coin >= gameData.earn_per_click_price) {
        gameData.coin -= gameData.earn_per_click_price;

        gameData.earn = gameData.earn + 10;

        gameData.earn_per_click_price = gameData.earn_per_click_price * 4;

        updateShop();
        saveGameData();
    }
});

document.querySelector('.main__upgrade_max_energy').addEventListener('click', () => {
    if (gameData.coin >= gameData.max_energy_price) {
        gameData.coin -= gameData.max_energy_price;

        gameData.max_energy = gameData.max_energy + 10;

        gameData.max_energy_price = gameData.max_energy_price * 4;

        updateShop();
        saveGameData();
    }
});
