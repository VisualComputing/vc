let img;

let topS = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
];

let rigthS = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

let bottomS = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];

let leftS = [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
];

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(400, 275);
    noLoop();
}

function draw() {

    tImg = createImage(img.width, img.height);
    rImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    lImg = createImage(img.width, img.height);

    tImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, topS);
            tImg.set(x, y, c);
        }
    }
    tImg.updatePixels();
    image(tImg, 0, 0);

    rImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, rigthS);
            rImg.set(x, y, c);
        }
    }
    rImg.updatePixels();
    image(rImg, 400, 0);


    bImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, bottomS);
            bImg.set(x, y, c);
        }
    }
    bImg.updatePixels();
    image(bImg, 0, 275);

    lImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, leftS);
            lImg.set(x, y, c);
        }
    }
    lImg.updatePixels();
    image(lImg, 400, 275);
}

function convolution(x, y, matrix) {
    let rtotal = 0;
    let gtotal = 0;
    let btotal = 0;

    for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
            let xpos = x + kx;
            let ypos = y + ky;

            let r = red(img.get(xpos, ypos));
            let g = green(img.get(xpos, ypos));
            let b = blue(img.get(xpos, ypos));

            rtotal += matrix[kx + 1][ky + 1] * r;
            gtotal += matrix[kx + 1][ky + 1] * g;
            btotal += matrix[kx + 1][ky + 1] * b;
        }
    }

    rtotal = constrain(rtotal, 0, 255);
    gtotal = constrain(gtotal, 0, 255);
    btotal = constrain(btotal, 0, 255);

    return color(rtotal, gtotal, btotal);
}