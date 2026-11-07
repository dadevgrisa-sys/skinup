const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const BOT_USERNAME = "SkinUpCaseBot";

let gifts = [];

fetch("./gifts.json")
    .then(response => response.json())
    .then(data => {
        gifts = data.map((gift, index) => ({
            id: gift.id,
            name: "Telegram Gift #" + (index + 1),
            rarity: "Подарок Telegram",
            type: "common",
            model: "Не указан",
            background: "Не указан",
            symbol: "Gift",
            number: "#" + (index + 1),
            art: "🎁",
            artClass: "art-gem",
            star_count: gift.star_count,
            sticker: gift.sticker
        }));

        console.log("Загружено подарков:", gifts.length);
    })
    .catch(error => console.error("Ошибка загрузки подарков:", error));

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
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById("page-" + tab);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    const indexes = {
        games: 0,
        cases: 1,
        inventory: 2,
        profile: 3
    };

    const buttons = document.querySelectorAll(".nav-btn");

    if (indexes[tab] !== undefined) {
        buttons[indexes[tab]].classList.add("active");
    }
}
