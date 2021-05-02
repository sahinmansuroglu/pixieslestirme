class kutuluYazi extends PIXI.Container {
    constructor(x, y, genislik, yukseklik, dolguRengi, icindekiYazi, yaziBoyutu, draggable) {
        super();

        this.icindekiYazi = icindekiYazi;
        //this.anchor.set(0.5);
        this.kutucuk = new PIXI.Graphics();
        this.kutucuk.beginFill(dolguRengi);
        this.kutucuk.drawRect(0, 0, genislik, yukseklik);


        this.text = newText(icindekiYazi, yaziBoyutu, 30, 25);
        if (icindekiYazi >= 10)
            this.text.x = -10;
        this.addChild(this.kutucuk);
        this.addChild(this.text);
        this.x = x;
        this.y = y;
        this.interactive = true;
        if (draggable) {
            this.on("pointerdown", this.onTouchStartForDragginng, this)
            this.on("pointermove", this.onTouchMoveForDragginng, this);
            this.on("pointerup", this.onTouchEndForDragginng, this);
            this.alpha = 0.8;
        }

        console.log("Boyutlar:", this.width, " ", this.height);
    };
    onTouchStartForClicking(e) {
        console.log("Tiklandi..:", this.icindekiYazi);
        parentScreen1.visible = false;
    }
    onTouchStartForDragginng(e) {
        console.log("Tiklandi..");
        this.dragging = true;
        this.alpha = 0.1;
    }
    onTouchMoveForDragginng(e) {
        if (!this.dragging)
            return;

        console.log(e.data.global.x, e.data.global.y);

        //1. get the coordinates of the cursor

        //2. calculate the offset 
        //const offsetX = currentPosition.x - player.touchPosition.x;
        //const offsetY = currentPosition.y - player.touchPosition.y;
        //3. apply the resulting offset

        this.x = e.data.global.x - 60;
        this.y = e.data.global.y - 90;
        //player.dragging = true;

    }

    onTouchEndForDragginng(e) {
        this.alpha = 0.8;
        this.dragging = false;

        console.log("Bırakıldı");
        //player.dragging = true;

    }


};