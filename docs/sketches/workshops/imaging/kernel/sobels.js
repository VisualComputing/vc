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

    img.loadPixels();

    tImg = createImage(img.width, img.height);
    rImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    lImg = createImage(img.width, img.height);

    tImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, topS);
            let index = 4 * (x + img.width * y);

            tImg.pixels[index] = red(c);
            tImg.pixels[index + 1] = green(c);
            tImg.pixels[index + 2] = blue(c);
            tImg.pixels[index + 3] = alpha(c);
        }
    }
    tImg.updatePixels();
    image(tImg, 0, 0);

    rImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, rigthS);
            let index = 4 * (x + img.width * y);

            rImg.pixels[index] = red(c);
            rImg.pixels[index + 1] = green(c);
            rImg.pixels[index + 2] = blue(c);
            rImg.pixels[index + 3] = alpha(c);
        }
    }
    rImg.updatePixels();
    image(rImg, 400, 0);


    bImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, bottomS);
            let index = 4 * (x + img.width * y);

            bImg.pixels[index] = red(c);
            bImg.pixels[index + 1] = green(c);
            bImg.pixels[index + 2] = blue(c);
            bImg.pixels[index + 3] = alpha(c);
        }
    }
    bImg.updatePixels();
    image(bImg, 0, 275);

    lImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, leftS);
            let index = 4 * (x + img.width * y);

            lImg.pixels[index] = red(c);
            lImg.pixels[index + 1] = green(c);
            lImg.pixels[index + 2] = blue(c);
            lImg.pixels[index + 3] = alpha(c);
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
            let r = 0;
            let g = 0;
            let b = 0;

            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
                let index = 4 * (xpos + img.width * ypos);
                r = img.pixels[index];
                g = img.pixels[index + 1];
                b = img.pixels[index + 2];
            }

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