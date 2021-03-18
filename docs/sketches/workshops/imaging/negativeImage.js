let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
    noLoop();
}

function draw() {
    img.resize(800, 550);
    image(img, 0, 0);

    //negative (rgb) -> (255-r,255-g,255-b)

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    loadPixels();
    for (let i = 0; i < npixels; i += 4) {

        pixels[i] = 255 - pixels[i];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    updatePixels();
    //filter(INVERT);
}