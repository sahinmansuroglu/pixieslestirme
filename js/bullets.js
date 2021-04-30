let app;
let player;
let bullets = [];
let bulletSpeed = 10;
let maxBullet = 0;
window.onload = function() {
    app = new PIXI.Application({ resizeTo: window });
    //document.body.appendChild(app.view)
    document.querySelector("#gameDiv").appendChild(app.view);

    app.stage.interactive = true;

    //Aşağıdaki 
    //Aşağıdaki haliyle sadece sprite üstünde tetiklenir.
    //app.stage.on("pointerdown", fireBullet);
    //Aşağıdaki Haliyle heryerde tetiklenir.
    document.querySelector("#gameDiv").addEventListener("pointerdown", fireBullet);

    //yeni bir resim ekleme
    player = new PIXI.Sprite.from("images/1.png");
    console.log(player);
    //sprite nesnesinin 0,0 noktasını merkeze alır
    player.anchor.set(0.5);
    player.width = 55;
    player.height = 55;
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    //player sprite'ini stage ekler
    //Bu stage yerine bir kontainer da olabilirdi.
    app.stage.addChild(player);
    //Aşağıdaki kodla bir timer oluşturuyoruz ve bu timer
    //her frame de gameLoop function'ını çağırıyor
    app.ticker.add(gameLoop);
}


function resize() {
    //player.x = app.screen.width / 2;
    // player.y = app.screen.height / 2;

}
window.onresize = function(event) {
    resize();
};

function fireBullet(e) {
    console.log("Fireeee");
    let bullet = createBullet();
    bullets.push(bullet);
    maxBullet++;
    if (maxBullet == 10)
        app.ticker.stop();
}

function createBullet() {
    let bullet = new PIXI.Sprite.from("images/9.png");
    bullet.anchor.set(0.5);
    bullet.width = 20;
    bullet.height = 20;
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet)
    console.log(bullet);
    return bullet;
}

function updateBullets(delta) {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.y -= bullets[i].speed;
        if (bullets[i].position.y < 0) {
            bullets[i].dead = true;
        }
    }
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].dead) {
            bullets[i].dead = true;
            app.stage.removeChild(bullets[i])
            bullets.splice(i, 1);
        }
    }

}

function gameLoop(delta) {
    updateBullets(delta);
}