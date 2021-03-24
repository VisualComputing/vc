let img;
let v = 1.0 / 9.0;
let blockSize = 3;
let count = 500;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(800, 550);
    //noLoop();
}

function draw() {
    background(255);
    //image(img, 0, 0);

    img.loadPixels();

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    //text(pixels.length, 200, 200);
    for (let x = 0; x < width; x += blockSize) {
        for (let y = 0; y < height; y += blockSize) {
            scanBlock(x, y);
        }
    }
}

function scanBlock(x, y) {
    let sizeDef = 4 * blockSize;
    let blockInformation = new Array(4 * blockSize);
    let index = 0;
    while (index < blockSize) {
        let startPosition = (x + y * width) * 4;
        blockInformation[index * 4] = img.pixels[startPosition];
        blockInformation[index * 4 + 1] = img.pixels[startPosition + 1];
        blockInformation[index * 4 + 2] = img.pixels[startPosition + 2];
        blockInformation[index * 4 + 3] = img.pixels[startPosition + 3];
        index++;
    }
    let res = patternDef(blockInformation);
    textSize(10);
    text(res, x, y);

}

function patternDef(blockInformation) {
    let brillos = [];
    let suma = 0;
    for (let i = 0; i < blockInformation.length; i += 4) {
        let br =
            blockInformation[i] * 0.2126 +
            blockInformation[i + 1] * 0.7152 +
            blockInformation[i + 2] * 0.0722;
        brillos.push(br);
    }

    brillos.forEach((element) => {
        suma += element;
    });
    let promedio = suma / brillos.length;
    let result = promedio / 255;
    return selectCharacter(result);

}

function selectCharacter(result) {
    if (result > 0 && result <= 0.1) {
        return "▓";
    } else if (result > 0.1 && result <= 0.2) {
        return "▒";
    } else if (result > 0.2 && result <= 0.3) {
        return "#";
    } else if (result > 0.3 && result <= 0.4) {
        return "@";
    } else if (result > 0.4 && result <= 0.5) {
        return "%";
    } else if (result > 0.5 && result <= 0.6) {
        return "E";
    } else if (result > 0.6 && result <= 0.7) {
        return "=";
    } else if (result > 0.7 && result <= 0.8) {
        return "0";
    } else if (result > 0.8 && result <= 0.9) {
        return "/";
    } else if (result > 0.9 && result <= 1) {
        return ".";
    }
}