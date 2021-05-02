function newText(icindekiYazi, boyut, x, y) {
    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: boyut,
        fill: "white",
        stroke: '#F1A7DC',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });
    let text = new PIXI.Text(icindekiYazi, style);
    text.x = x;
    text.y = y;
    return text
}