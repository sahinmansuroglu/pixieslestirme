class kutu extends PIXI.Container {
    constructor(x, y, genislik, yukseklik, dolguRengi, draggable, opacity, resim = null, value = null) {
        super();

        this.value = value;
        //this.anchor.set(0.5);
        this.kutucuk = new PIXI.Graphics();
        this.kutucuk.beginFill(dolguRengi);
        this.kutucuk.drawRect(0, 0, genislik, yukseklik);
        this.kutucuk.alpha = opacity;
        this.image = null;



        this.addChild(this.kutucuk);
        if (resim != null) {
            this.image = new PIXI.Sprite.from(resim);
            this.image.x = 0;
            this.image.y = 0;
            this.image.width = genislik;
            this.image.height = yukseklik;
            this.image.alpha = opacity;
            this.addChild(this.image);
        }
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