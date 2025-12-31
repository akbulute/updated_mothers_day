const heart = document.getElementById("heart");
const flap = document.getElementById("flap");
const paper = document.getElementById("paper");
const envelope = document.getElementById("envelope");

const createBtn = document.getElementById("createBtn");
const copyBtn = document.getElementById("copyBtn");

const userTitle = document.getElementById("userTitle");
const userNote = document.getElementById("userNote");
const userName = document.getElementById("userName");

const previewText = document.getElementById("previewText");
const fullNote = document.getElementById("fullNote");

const generatedUrl = document.getElementById("generatedUrl");
const linkDisplay = document.getElementById("link-display");

/*
0 = kapalı
1 = preview (kalp ile)
2 = open (kağıda tıklayınca)
*/
let openState = 0;

/* ❤️ KALP — SADECE PREVIEW */
heart.addEventListener("click", () => {
    if (openState === 0) {
        flap.style.transform = "rotateX(-180deg)";
        paper.className = "paper preview";
        envelope.classList.add("opened");
        openState = 1;
    } else {
        flap.style.transform = "rotateX(0deg)";
        paper.className = "paper";
        envelope.classList.remove("opened");
        openState = 0;
    }
});

/* 📄 KAĞIT — SADECE TAM AÇAR */
paper.addEventListener("click", () => {
    if (openState === 1) {
        paper.className = "paper open";
        openState = 2;
    }
});

/* 🔗 LINK OLUŞTUR */
createBtn.addEventListener("click", () => {
    if (!userTitle.value || !userNote.value || !userName.value) {
        alert("Tüm alanları doldur!");
        return;
    }

    const data = {
        title: userTitle.value,
        note: userNote.value,
        name: userName.value
    };

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const url = location.origin + location.pathname + "?m=" + encoded;

    generatedUrl.value = url;
    linkDisplay.style.display = "block";

    previewText.innerHTML = data.title;
    fullNote.innerHTML = `
        <p>${data.note.replace(/\n/g, "<br>")}</p>
        <p><strong>${data.name}</strong></p>
    `;
});

/* 📋 KOPYALA */
copyBtn.addEventListener("click", () => {
    generatedUrl.select();
    navigator.clipboard.writeText(generatedUrl.value);
    alert("Link kopyalandı");
});

/* 🔓 LINKTEN GELİNCE */
window.onload = () => {
    const params = new URLSearchParams(location.search);
    const m = params.get("m");

    if (!m) return;

    const data = JSON.parse(decodeURIComponent(escape(atob(m))));

    document.getElementById("setup-area").style.display = "none";
    document.querySelector(".title").innerText = "Sana Bir Mektup Var 💌";

    previewText.innerHTML = data.title;
    fullNote.innerHTML = `
        <p>${data.note.replace(/\n/g, "<br>")}</p>
        <p><strong>${data.name}</strong></p>
    `;

    /* ❗ BAŞLANGIÇ HER ZAMAN KAPALI */
    openState = 0;
};
