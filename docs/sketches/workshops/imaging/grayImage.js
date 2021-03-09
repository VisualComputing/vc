let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(800, 550);
    image(img, 0, 0);
    filter(GRAY);
}