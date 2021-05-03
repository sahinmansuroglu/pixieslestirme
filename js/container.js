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
        console.log("Boyutlar:", this.width, " ", this.height);
        this.dragging = draggable;
        this.oldX = 0;
        this.oldY = 0;
    }

    get sol() {
        return this.x;
    }
    get sag() {
        return this.x + this.width;
    }
    get ust() {
        return this.y;
    }
    get alt() {
        return this.y + this.height;
    }


}