
let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/mosaic/duck.jpg");
}

function setup() {
    createCanvas(800, 640);
    noLoop();
}

function draw() {
    img.resize(800, 640);
    image(img, 0, 0);

    noLoop();
}




