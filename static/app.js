const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const BOT_USERNAME = "SkinUpCaseBot";

const gifts = [
    {
        name: "Golden Rose",
        rarity: "Легендарный",
        type: "legendary",
        model: "Gold",
        background: "Purple",
        symbol: "Rose",
        number: "#0001",
        art: "🌹",
        artClass: "art-rose"
    },
    {
        name: "Royal Bear",
        rarity: "Редкий",
        type: "rare",
        model: "Royal",
        background: "Brown",
        symbol: "Bear",
        number: "#0024",
        art: "🧸",
        artClass: "art-bear"
    },
    {
        name: "Blue Diamond",
        rarity: "Обычный",
        type: "common",
        model: "Blue",
        background: "Ocean",
        symbol: "Diamond",
        number: "#0108",
        art: "💎",
        artClass: "art-gem"
    }
];

function showGift(index) {
    const gift = gifts[index];

    if (!gift) return;

    document.getElementById("detailArt").textContent = gift.art;
    document.getElementById("detailArt").className =
        "gift-art detail-art " + gift.artClass;

    document.getElementById("detailName").textContent = gift.name;
    document.getElementById("detailRarity").textContent = gift.rarity;
    document.getElementById("detailModel").textContent = gift.model;
    document.getElementById("detailBackground").textContent = gift.background;
    document.getElementById("detailSymbol").textContent = gift.symbol;
    document.getElementById("detailNumber").textContent = gift.number;

    document.getElementById("giftModal").classList.add("show");
}

function closeGift() {
    document.getElementById("giftModal").classList.remove("show");
}

function filterItems(type, button) {
    document.querySelectorAll(".filter").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    document.querySelectorAll(".gift-card").forEach(card => {
        card.style.display =
            type === "all" || card.classList.contains(type)
                ? "block"
                : "none";
    });
}

function openReferral() {
    document.getElementById("referralModal").classList.add("show");
}

function closeReferral() {
    document.getElementById("referralModal").classList.remove("show");
}

function shareLink() {
    const user = tg.initDataUnsafe?.user;

    if (!user) {
        tg.showAlert("Открой SKIN UP через Telegram.");
        return;
    }

    const referralLink =
        `https://t.me/${BOT_USERNAME}?start=ref_${user.id}`;

    const shareUrl =
        "https://t.me/share/url?url=" +
        encodeURIComponent(referralLink) +
        "&text=" +
        encodeURIComponent("🎁 Заходи в SKIN UP!");

    tg.openTelegramLink(shareUrl);
}

function topUp() {
    tg.showAlert("Пополнение через Telegram Stars скоро появится!");
}

function showTab(tab) {
    const messages = {
        home: "Главная SKIN UP",
        cases: "🎁 Раздел кейсов скоро появится.",
        inventory: "💎 Твоя коллекция подарков.",
        profile: "👤 Профиль скоро появится."
    };

    tg.showAlert(messages[tab] || "Раздел готовится.");

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    const indexes = {
        home: 0,
        cases: 1,
        inventory: 2,
        profile: 3
    };

    const buttons = document.querySelectorAll(".nav-btn");

    if (indexes[tab] !== undefined) {
        buttons[indexes[tab]].classList.add("active");
    }
}

document.getElementById("itemCount").textContent =
    gifts.length + " предмета";
