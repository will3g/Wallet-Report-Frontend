function calculator(e) {
    var c = (e.clientX - bar.offsetLeft) / bar.clientWidth;
    c > 1 && (c = 1), c < 0 && (c = 0), fill.style.width = 100 * c + "%", calcVal.value = (1e5 * c).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }), calcAmount.value = (1e5 * c / window.price.BTC).toFixed(8)
}

function fillCalc(e) {
    if (calcContainer.querySelector(".maxVal").classList.remove("show"), "brl" == e) {
        if (calcVal.value.replace(".", "").replace(",", ".") / 1e5 > 1 || calcVal.value.replace(".", "").replace(",", ".") / 1e5 < 0) return void calcContainer.querySelector(".maxVal").classList.add("show");
        c = +(c = calcVal.value.replace(".", "").replace(",", ".") / window.price.BTC) || 0, calcAmount.value = c.toFixed(8)
    } else {
        if (calcAmount.value.replace(",", ".") * window.price.BTC / 1e5 > 1 || calcAmount.value.replace(",", ".") * window.price.BTC / 1e5 < 0) return void calcContainer.querySelector(".maxVal").classList.add("show");
        var c;
        c = +(c = calcAmount.value.replace(",", ".") * window.price.BTC) || 0, calcVal.value = c.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
    fill.style.width = calcVal.value / 1e5 * 100 + "%"
}
setTimeout(function() {
    var e = window.socket = io.connect("https://brasilbitcoin.com.br:8443/");
    e.on("connect", function() {
        document.body.classList.add("on")
    }), e.on("disconnect", function() {
        document.body.classList.remove("on")
    }), e.on("main_prices", function(e) {
        e = JSON.parse(e);
        var c = document.querySelector('[data-coin="' + e.coin + '"]').getElementsByClassName("price")[0];
        c.classList.remove("glow-down", "glow-up"), setTimeout(function() {
            e.price >= c.textContent ? c.classList.add("glow-up") : c.classList.add("glow-down"), c.textContent = e.price
        }, 1)
    })
}, 1500);
var bar = document.querySelector(".container-calculator .valBarContainer"),
    calcContainer = document.querySelector(".container-calculator"),
    fill = bar.querySelector(".fill"),
    handle = bar.querySelector(".handle"),
    calcVal = calcContainer.querySelector(".calcBRL .val input"),
    calcAmount = calcContainer.querySelector(".calcAmount .val input"),
    mousedown = !1;
bar.addEventListener("mousedown", function(e) {
    calcContainer.querySelector(".maxVal").classList.remove("show"), mousedown = !0, calculator(e)
}), calcContainer.addEventListener("mouseup", function(e) {
    mousedown && (mousedown = !1, calculator(e))
}), calcContainer.addEventListener("mouseleave", function(e) {
    mousedown && (mousedown = !1, calculator(e))
}), calcContainer.addEventListener("mousemove", function(e) {
    mousedown && calculator(e)
}), bar.addEventListener("touchstart", function(e) {
    calcContainer.querySelector(".maxVal").classList.remove("show"), mousedown = !0, calculator(e.touches[0])
}), calcContainer.addEventListener("touchend", function(e) {
    mousedown && (mousedown = !1, calculator(e.touches[0]))
}), calcContainer.addEventListener("touchmove", function(e) {
    mousedown && calculator(e.touches[0])
});