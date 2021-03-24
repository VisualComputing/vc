let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(400, 275);
    noLoop();
}

function draw() {

    eImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    oImg = createImage(img.width, img.height);
    sImg = createImage(img.width, img.height);

    //Luminosity
    let d = pixelDensity();
    let npixels = 4 * (img.width * d) * (img.height * d);
    img.loadPixels();
    eImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let gray = img.pixels[i] * 0.2126 + img.pixels[i + 1] * 0.7152 + img.pixels[i + 2] * 0.0722;
        eImg.pixels[i] = gray;
        eImg.pixels[i + 1] = gray;
        eImg.pixels[i + 2] = gray;
        eImg.pixels[i + 3] = img.pixels[i + 3];
    }
    eImg.updatePixels();
    image(eImg, 0, 0);

    //Intensity
    bImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let gray = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
        bImg.pixels[i] = gray;
        bImg.pixels[i + 1] = gray;
        bImg.pixels[i + 2] = gray;
        bImg.pixels[i + 3] = img.pixels[i + 3];
    }
    bImg.updatePixels();
    image(bImg, 400, 0);

    //Gleam
    oImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        oImg.pixels[i] = Math.pow((img.pixels[i] / 255), (1 / 2.2)) * 255
        oImg.pixels[i+1] = Math.pow((img.pixels[i+1] / 255), (1 / 2.2)) * 255
        oImg.pixels[i+2] = Math.pow((img.pixels[i+2] / 255), (1 / 2.2)) * 255

        let gray = (oImg.pixels[i] + oImg.pixels[i + 1] + oImg.pixels[i + 2])/3;
        oImg.pixels[i] = gray;
        oImg.pixels[i + 1] = gray;
        oImg.pixels[i + 2] = gray;
        oImg.pixels[i + 3] = img.pixels[i + 3];
    }
    oImg.updatePixels();
    image(oImg, 0, 275);

    //Luma
    sImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        sImg.pixels[i] = Math.pow((img.pixels[i] / 255), (1 / 2.2)) * 255
        sImg.pixels[i+1] = Math.pow((img.pixels[i+1] / 255), (1 / 2.2)) * 255
        sImg.pixels[i+2] = Math.pow((img.pixels[i+2] / 255), (1 / 2.2)) * 255

        let gray = (sImg.pixels[i] * 0.299 + oImg.pixels[i + 1] * 0.587 + oImg.pixels[i + 2] * 0.114);
        sImg.pixels[i] = gray;
        sImg.pixels[i + 1] = gray;
        sImg.pixels[i + 2] = gray;
        sImg.pixels[i + 3] = img.pixels[i + 3];
    }
    sImg.updatePixels();
    image(sImg, 400, 275);
}