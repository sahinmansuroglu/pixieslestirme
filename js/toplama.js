let app;
let keys = {};
let keyDiv;
let mainScreen;
let islemScreen;
let ornekScreen;
let bgSprite;
let screenWidth = 1440;
let screenHeight = 800;
let zorluk;
let cevapKutucuk;
let cevap = 0;
window.onload = function() {
    app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 0xFFFFFF,
        view: canvas,
        antialias: true
    });
    //document.querySelector("#gameDiv").appendChild(app.view);
    //document.body.appendChild(app.view);
    window.addEventListener('resize', resize);
    mainScreen = new PIXI.Container();
    app.renderer.autoResize = true;
    islemScreen = new PIXI.Container();
    //yeni bir resim ekleme

    bgSprite = new PIXI.Sprite.from("images/bg.png");

    bgSprite.width = screenWidth;
    bgSprite.height = screenHeight;

    mainScreen.addChild(bgSprite);
    geriSprite = new PIXI.Sprite.from("images/geriSembol.png");
    ileriSprite = new PIXI.Sprite.from("images/ileriSembol.png");

    geriSprite.anchor.set(0.5);
    geriSprite.x = 50;
    geriSprite.y = 50;

    ileriSprite.anchor.set(0.5);
    ileriSprite.x = screenWidth - ileriSprite.width / 2 - 50;
    ileriSprite.y = 40;
    mainScreen.addChild(geriSprite);
    mainScreen.addChild(ileriSprite);
    islemScreen.addChild(newText("Toplama İşlemi Etkinlikleri", 80, 228, 70))
    console.log(bgSprite.pivot.y, bgSprite.pivot.x);

    let konumx = 250;
    for (i = 1; i < 6; i++) {

        islemScreen.addChild((new kutuluYazi(konumx, 220, 140, 200, 0X98B6E4, i, 130, false)).on("pointerdown", onTouchStartForClicking.bind(this)));
        islemScreen.addChild((new kutuluYazi(konumx, 450, 140, 200, 0X98B6E4, i + 5, 130, false)).on("pointerdown", onTouchStartForClicking.bind(this)));
        konumx += 190;
    }
    mainScreen.addChild(islemScreen);
    app.stage.addChild(mainScreen);
    resize();

}

function onTouchStartForClicking(e) {

    console.log("Tamamdır:", e.target.icindekiYazi);
    zorluk = e.target.icindekiYazi;
    islemScreen.visible = false;
    islemSahnesiAc();
}

function resize() {


    var canvasRatio = screenHeight / screenWidth; ////canvas genişlik ve canvas yükseklik
    var windowRatio = window.innerHeight / window.innerWidth;
    if (windowRatio < canvasRatio) {
        h = window.innerHeight;
        w = h / canvasRatio;

    } else {
        w = window.innerWidth;
        h = w * canvasRatio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';

}


function islemSahnesiAc() {
    secenekListe = [];
    ornekScreen = new PIXI.Container();
    rastgleDeger1 = Math.floor(Math.random() * zorluk) + 1;
    rastgleDeger2 = Math.floor(Math.random() * zorluk) + 1;

    ornekScreen.addChild((new kutuluYazi(250, 200, 140, 200, 0X98B6E4, rastgleDeger1, 130, false)));
    ornekScreen.addChild((new kutuluYazi(500, 200, 140, 200, 0X98B6E4, rastgleDeger2, 130, false)));
    ornekScreen.addChild((new kutuluYazi(250, 200, 140, 200, 0X98B6E4, rastgleDeger1, 130, false)));

    cevapKutucuk = (new kutuluYazi(750, 200, 140, 200, 0XF1A7DC, "", 130, false))
    ornekScreen.addChild(cevapKutucuk);

    ornekScreen.addChild(newText("+", 140, 400, 220));
    ornekScreen.addChild(newText("=", 140, 650, 220))
    cevap = rastgleDeger1 + rastgleDeger2;
    secenekListe.push(rastgleDeger1 + rastgleDeger2);
    for (i = 1; i <= 5; i++) {
        secenekListe.push(Math.floor(Math.random() * 20) + 1);
    }
    konumx = 150;
    while (secenekListe.length != 0) {

        const random = Math.floor(Math.random() * secenekListe.length); // [0,9)
        const id = secenekListe[random];
        secenekListe = secenekListe.filter(item => item != id);
        secenekKutu = new kutuluYazi(konumx, 500, 140, 200, 0XF1A7DC, id, 130, false);
        secenekKutu.on("pointerdown", this.onTouchStartForDragginng.bind(this));
        secenekKutu.on("pointermove", this.onTouchMoveForDragginng.bind(this));
        secenekKutu.on("pointerup", this.onTouchEndForDragginng.bind(this));
        ornekScreen.addChild(secenekKutu);
        konumx += 180;
    }
    // kutuluYaziObj = new kutuluYazi(konumx, 400, 120, 180, 0X98B6E4, i, 110, false);
    // kutuluYaziObj.text.x = 20;
    // if (i >= 10)
    //     kutuluYaziObj.text.x = -10;
    // ornekScreen.addChild(kutuluYaziObj);

    // kutuluYaziObj = new kutuluYazi(konumx, 550, 120, 180, 0X98B6E4, i + 10, 110, false);
    // kutuluYaziObj.text.x = -10;
    // konumx += 130;
    // ornekScreen.addChild(kutuluYaziObj);

    mainScreen.addChild(ornekScreen);
}

// Burada current target olarak  almamız gerekiyor

function onTouchStartForDragginng(e) {
    const target = e.currentTarget;
    target.oldX = target.x;
    target.oldY = target.y;
    // console.log("Tiklandi..:", e.target);

    target.dragging = true;
    //target.dragValue1(true);
    e.target.alpha = 0.3;
}

function onTouchMoveForDragginng(e) {
    const target = e.currentTarget;
    // console.log("Tiklandi..:", target.dragging)
    if (!target.dragging) return;

    //console.log(e.data.global.x, e.data.global.y);

    //1. get the coordinates of the cursor

    //2. calculate the offset 
    //const offsetX = currentPosition.x - player.touchPosition.x;
    //const offsetY = currentPosition.y - player.touchPosition.y;
    //3. apply the resulting offset

    target.x = e.data.global.x - 60;
    target.y = e.data.global.y - 90;

    collisionTest(target, cevapKutucuk)
        //player.dragging = true;

}

function onTouchEndForDragginng(e) {
    const target = e.currentTarget;
    target.alpha = 0.8;
    target.dragging = false;
    //target.dragValue1(false)
    //alert(target.sag);
    //console.log("ddddd:", );
    //player.dragging = true;
    target.x = target.oldX;
    target.y = target.oldY;
}

function collisionTest(from, to) {
    x = (to.sol + to.sag) / 2;
    y = (to.alt + to.ust) / 2;

    x1 = (from.sol + from.sag) / 2;
    y1 = (from.alt + from.ust) / 2;
    test = x >= from.sol && x <= from.sag &&
        y <= from.alt && y >= from.ust;

    if (test) {
        to.alpha = 0.3;
        if (cevap == from.icindekiYazi) {
            ornekScreen.removeChild(from);
            to.text.text = cevap;
            to.alpha = 1;
        }

    } else
        to.alpha = 1;
    console.log("Carpisti");
}