let app;
let keys = {};

window.onload = function() {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xAAAAAA
    });
    document.body.appendChild(app.view);

    // preload assets
    app.loader.baseUrl = "images";
    app.loader
        .add("res01", "1.png")
        .add("res02", "2.png")
        .add("res03", "3.png")
        .add("res04", "4.png")
        .add("res05", "5.png")
        .add("res06", "6.png")
        .add("res07", "7.png")
        .add("res08", "8.png");

    app.loader.onProgress.add(showProgress);
    app.loader.onComplete.add(doneLoading);
    app.loader.onError.add(reportError);
    app.loader.load();

    function showProgress(e) {
        console.log(e.progress);
    }

    function reportError(e) {
        console.log("ERROR:" + e.message);
    }

    function doneLoading(e) {
        console.log("DONE LOADİNG");

        player = PIXI.Sprite.from(app.loader.resources.res08.texture);
        player.x = app.view.width / 2;
        player.y = app.view.height / 2;
        player.anchor.set(0.5);
        app.stage.addChild(player);
    }
}