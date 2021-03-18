let img;
const matrix = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];
const matrixsize = 3;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(800, 550);
    img.loadPixels();
}

function draw() {
    image(img, 0, 0);
    loadPixels();

    for (let x = 0; x < windowWidth; x++) {
        for (let y = 0; y < windowHeight; y++) {

            let c = convolution(x, y);
            let loc = (x + y * img.width) * 4;

            pixels[loc] = red(c);
            pixels[loc + 1] = green(c);
            pixels[loc + 2] = blue(c);
            pixels[loc + 3] = alpha(c);
        }
    }
    updatePixels();
}

function convolution(x, y) {

    let rtotal = 0.0;
    let gtotal = 0.0;
    let btotal = 0.0;

    const offset = Math.floor(matrixsize / 2);

    for (let i = 0; i < matrixsize; i++) {
        for (let j = 0; j < matrixsize; j++) {

            const xloc = (x + i - offset);
            const yloc = (y + j - offset);

            let loc = (xloc + img.width * yloc) * 4;
            loc = constrain(loc, 0, img.pixels.length - 1);

            rtotal += (img.pixels[loc]) * matrix[i][j];
            gtotal += (img.pixels[loc + 1]) * matrix[i][j];
            btotal += (img.pixels[loc + 2]) * matrix[i][j];
        }
    }

    rtotal = constrain(rtotal, 0, 255);
    gtotal = constrain(gtotal, 0, 255);
    btotal = constrain(btotal, 0, 255);

    return color(rtotal, gtotal, btotal);
}