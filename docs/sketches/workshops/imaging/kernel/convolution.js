let img;
let v = 1.0 / 9.0;

let emboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

let blurM = [
    [v, v, v],
    [v, v, v],
    [v, v, v]
];

let outline = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

let sharpen = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
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

    eImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    oImg = createImage(img.width, img.height);
    sImg = createImage(img.width, img.height);

    eImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, emboss);
            let index = 4 * (x + img.width * y);

            eImg.pixels[index] = red(c);
            eImg.pixels[index + 1] = green(c);
            eImg.pixels[index + 2] = blue(c);
            eImg.pixels[index + 3] = alpha(c);
        }
    }
    eImg.updatePixels();
    image(eImg, 0, 0);

    bImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, blurM);
            let index = 4 * (x + img.width * y);

            bImg.pixels[index] = red(c);
            bImg.pixels[index + 1] = green(c);
            bImg.pixels[index + 2] = blue(c);
            bImg.pixels[index + 3] = alpha(c);
        }
    }
    bImg.updatePixels();
    image(bImg, 400, 0);


    oImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, outline);
            let index = 4 * (x + img.width * y);

            oImg.pixels[index] = red(c);
            oImg.pixels[index + 1] = green(c);
            oImg.pixels[index + 2] = blue(c);
            oImg.pixels[index + 3] = alpha(c);
        }
    }
    oImg.updatePixels();
    image(oImg, 0, 275);

    sImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, sharpen);
            let index = 4 * (x + img.width * y);

            sImg.pixels[index] = red(c);
            sImg.pixels[index + 1] = green(c);
            sImg.pixels[index + 2] = blue(c);
            sImg.pixels[index + 3] = alpha(c);
        }
    }
    sImg.updatePixels();
    image(sImg, 400, 275);
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