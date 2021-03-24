function setup() {
    createCanvas(720, 570);
    background(220);
    noStroke();
    noLoop();
}

function draw() {

    //left circles
    fill('orange');
    ellipse(180, 285, 50, 50);

    //Bigger circles
    fill('gray');
    ellipse(133, 195, 100, 100);
    ellipse(237, 195, 100, 100);
    ellipse(133, 375, 100, 100);
    ellipse(237, 375, 100, 100);
    ellipse(80, 285, 100, 100);
    ellipse(290, 285, 100, 100);

    //left circles
    fill('orange');
    ellipse(540, 285, 50, 50);

    //smaller circles
    fill('gray');
    ellipse(540, 235, 25, 25);
    ellipse(540, 335, 25, 25);
    ellipse(490, 285, 25, 25);
    ellipse(590, 285, 25, 25);
    ellipse(575, 320, 25, 25);
    ellipse(575, 250, 25, 25);
    ellipse(505, 320, 25, 25);
    ellipse(505, 250, 25, 25);
}