let fingers;

function preload() {
    fingers = createVideo("/vc/docs/sketches/fingers.webm");
}

function setup() {
    createCanvas(320, 240);
    //fingers.loop();
    fingers.hide();

}

function draw() {
    image(fingers,0,0);
    fingers.loadPixels();
    loadPixels();

    for (let x = 1; x < fingers.width; x++) {
        for (let y = 1; y < fingers.height; y++) {
            let index = 4 * (x + fingers.width * y);
            let average = (fingers.pixels[index] + fingers.pixels[index + 1] + fingers.pixels[index + 2]) / 3;
            pixels[index] = average;
            pixels[index + 1] = average;
            pixels[index + 2] = average;
            pixels[index + 3] = fingers.pixels[index + 3];
        }
    }
    updatePixels();
}

function mousePressed() {
    fingers.loop(); // set the video to loop and start playing
}