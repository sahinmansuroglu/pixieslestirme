    let app;
    let keys = {};
    let keyDiv;
    window.onload = function() {
        app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xAAAAAA
        });
        document.body.appendChild(app.view);

        //yeni bir resim ekleme
        player = new PIXI.Sprite.from("images/1.png");
        player.anchor.set(0.5);
        player.x = app.view.width / 2;
        player.y = app.view.height / 2;
        app.stage.addChild(player);
        // Mouse interaction
        app.stage.interactive = true
        app.stage.on("pointermove", movePlayer);

        //keyboard Event handler
        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);

        app.ticker.add(gameLoop);
        keysDiv = document.querySelector("#keys");
    }

    function movePlayer(e) {
        let pos = e.data.global;
        player.x = pos.x;
        player.y = pos.y;
    }

    function keysDown(e) {
        console.log(e.keyCode);
        keys[e.keyCode] = true;
    }

    function keysUp(e) {
        console.log(e.keyCode);
        keys[e.keyCode] = false;
    }

    function gameLoop() {
        keysDiv.innerHTML = JSON.stringify(keys);
        //hareket ettirme w tuşu ile 
        if (keys["87"]) {
            player.y -= 5;
        }
    }