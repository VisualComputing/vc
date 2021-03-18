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

    //grey scale (rgb) -> ((r+g+b)/3, (r+g+b)/3, (r+g+b)/3)

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    loadPixels();
    for (let i = 0; i < npixels; i += 4) {

        // let gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        let gray = pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;

        pixels[i] = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
        pixels[i + 3] = pixels[i + 3];
    }
    updatePixels();
    //filter(GRAY);
}