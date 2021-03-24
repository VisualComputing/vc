function setup() {
    createCanvas(720, 720);
    noLoop();
}

function draw() {
    let width = 720;
    let height = 720;
    let num_squares = 10;

    let lines_size = width / (num_squares * 5);
    let square_size = width / (num_squares * 5) * 4;


    background("#000000");



    for (let i = 0; i < num_squares; i++) {
        noStroke();
        fill('#999999');
        let y = ((i + 0.5) * square_size) + (i * lines_size);
        let x = ((i + 0.5) * square_size) + (i * lines_size);
        rect(0, y, width, lines_size);
        rect(x, 0, lines_size, height);
    }

    for (let i = 0; i < num_squares; i++) {
        for (let j = 0; j < num_squares; j++) {
            noStroke();
            fill("#ffffff");
            let x = ((i + 0.5) * square_size) + ((i + 0.5) * lines_size);
            let y = ((j + 0.5) * square_size) + ((j + 0.5) * lines_size);
            circle(x, y, lines_size * 1.57);
        }
    }
}