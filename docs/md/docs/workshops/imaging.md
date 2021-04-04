# Image and video processing


## Load and Deploy image

> :P5 sketch=/docs/sketches/workshops/imaging/loadImage.js, width=800, height=550

## Negative of an image

> :P5 sketch=/docs/sketches/workshops/imaging/negativeImage.js, width=800, height=550

## Gray Scale

### Gray Scale with luminosity, intensity, gleam and luma
Grayscale using luminosity method at top left, intensity method at top right, gleam method at bottom left and luma method at bottom right

> :P5 sketch=/docs/sketches/workshops/imaging/gray/grayImage.js, width=800, height=550


### Gray Scale with HSL, HSV, LUMA
Grayscale using HSL method at top left, HSV method at top right, CieLAB method at bottom left and ?? method at bottom right

> :P5 sketch=/docs/sketches/workshops/imaging/gray/grayImage2.js, width=800, height=550


## Image Kernels

### Problem Statement

Aplicar máscaras de convolución (O Kenels) en imágenes y videos utilizando la herramienta p5.js. 

### Background

El kernel de una imagen es una pequeña matriz cuadrada de tamaño impar que, por medio de la convolución entre el kernel y la imagen, se utiliza para aplicar distintos efectos en la imagen. La convolución es el proceso en el cual se suma cada píxel de la imagen con sus vecinos locales, teniendo en cuenta los pesos indicados por el kernel. De esta forma, si tenemos la matriz de píxeles:

|  |  |  |
| :----: | :----: | :----: |
| 149 | 191 | 190 |
| 164 | 195 | 200 |
| 150 | 185 | 194 |

y el kernel:

|  |  |  |
| :----: | :----: | :----: |
| 0 | -1 | 0 |
| -1 | 5 | -1 |
| 0 | -1 | 0 |

Y deseamos obtener la convolución del píxel 195, obtenemos el resultado: (191 x -1) + (164 x -1) + (195 x 5) + (200 x -1) + (185 x -1) = 235. Así, para aplicar el filtro deseado, se toma cada uno de los píxeles de la imagen original y se reemplazan por el píxel obtenido al realizar su respectiva convolución con el kernel.

### Code & Results

#### Filters

Algunos de los filtros que se pueden lograr, con sus respectivos kernels son:

* Emboss: Filtro que da la ilusión de profundidad y enfatiza la diferencia entre pixeles.
|  |  |  |
| :----: | :----: | :----: |
| -2 | -1 | 0 |
| -1 | 1 | 1 |
| 0 | 1 | 2 |
* Blur: Filtro que desenfatiza las diferencias entre los pixeles, logrando un efecto borroso en la imagen.
|  |  |  |
| :----: | :----: | :----: |
| 0.11 | 0.11 | 0.11 |
| 0.11 | 0.11 | 0.11 |
| 0.11 | 0.11 | 0.11 |
* Outline: Filtro que resalta diferencias de intensidad importantes entre los pixeles. De esta forma, un píxel cuyos píxeles vecinos tengan una intensidad similar, se verá negro al aplicar el filtro; mientras que un un píxel cuyos vecinos tengan una intensidad bastante diferente, se verá blanco.
|  |  |  |
| :----: | :----: | :----: |
| -1 | -1 | -1 |
| -1 | 8 | -1 |
| -1 | -1 | -1 |
* Sharpen: Filtro que enfatiza las diferencias entre los píxeles adyacentes. Con esto, se obtiene una imagen más vívida.
|  |  |  |
| :----: | :----: | :----: |
| 0 | -1 | 0 |
| -1 | 5 | -1 |
| 0 | -1 | 0 |

Para aplicar estos kernels, utilizamos el siguiente código:

```js | convolution.js
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
```

Y obtenemos el siguiente resultado:

> :P5 sketch=/docs/sketches/workshops/imaging/kernel/convolution.js, width=800, height=550

#### Sobels

Sin embargo, la aplicación de filtros no es el único uso que se le da a los kernels, estos también se utilizan para la "Extracción de características" de una imagen. Sobel, por ejemplo, es un tipo de kernel que se utiliza en el procesamiento de imágenes, especialmente en algoritmos de detección de bordes. Existen 4 tipo de sobel diferentes:

* Top Sobel: Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles superiores adyacentes.
|  |  |  |
| :----: | :----: | :----: |
| 1 | 2 | 1 |
| 0 | 0 | 0 |
| -1 | -2 | -1 |
* Rigth Sobel: Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles posteriores adyacentes.
|  |  |  |
| :----: | :----: | :----: |
| -1 | 0 | 1 |
| -2 | 0 | 2 |
| -1 | 0 | 1 |
* Bottom Sobel: Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles inferiores adyacentes.
|  |  |  |
| :----: | :----: | :----: |
| -1 | -2 | -1 |
| 0 | 0 | 0 |
| 1 | 2 | 1 |
* Left Sobel: Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles anteriores adyacentes.
|  |  |  |
| :----: | :----: | :----: |
| 1 | 0 | -1 |
| 2 | 0 | -2 |
| 1 | 0 | -1 |

Utilizando el mismo código mostrado anteriormente, pero cambiado los valores de cada una de las matrices, obtenemos lo siguiente:

> :P5 sketch=/docs/sketches/workshops/imaging/kernel/sobels.js, width=800, height=550

#### Kernels on Videos

Finalmente, el kernel también puede ser utilizado en videos. De esta forma, aplicando el siguiente código:

```js | convolutionVideo.js
let fingers;

let kernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

function preload() {
    fingers = createVideo("/vc/docs/sketches/fingers.webm");
}

function setup() {
    createCanvas(320, 240);
    fingers.loop();
    fingers.hide();
    fingers.volume(0);
}

function draw() {

    fingers.loadPixels();
    loadPixels();

    for (let x = 1; x < fingers.width; x++) {
        for (let y = 1; y < fingers.height; y++) {

            let c = convolution(x, y, kernel);
            let index = 4 * (x + fingers.width * y);

            pixels[index] = red(c);
            pixels[index + 1] = green(c);
            pixels[index + 2] = blue(c);
            pixels[index + 3] = alpha(c);
        }
    }

    updatePixels();
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

            if ((xpos >= 0 && xpos < fingers.width) && (ypos >= 0 || ypos < fingers.height)) {
                let index = 4 * (xpos + fingers.width * ypos);
                r = fingers.pixels[index];
                g = fingers.pixels[index + 1];
                b = fingers.pixels[index + 2];
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
```
Obtenemos el video con el filtro Outline:

> :P5 sketch=/docs/sketches/workshops/imaging/kernel/convolutionVideo.js, width=320, height=240

Utilizando este mismo código, cambiando únicamente el kernel por el Top Sobel, obtenemos el video:

> :P5 sketch=/docs/sketches/workshops/imaging/kernel/sobelsVideo.js, width=320, height=240

### Conclusions & Future Work

El kernel es un método de procesamiento de imágenes muy versátil, pues no solo sirve para aplicar filtros a las imágenes, sino que también permiten la obtención de carácteristicas de una imagen, facilitando así el estudio de las imagenes, y su aplicación en otras áreas que hacen uso de imágenes. Finalmente, para un trabajo futuro este tema se puede profundizar y desarrollar con la investigación y experimentación sobre cada uno de los filtros y la razón por la cual cada uno de ellos genera el debido efecto.

## Mosaic - Images
### Original

> :P5 sketch=/docs/sketches/workshops/imaging/mosaic/duck.js, width=800, height=640

### Mosaic

> :P5 sketch=/docs/sketches/workshops/imaging/mosaic/main.js, width=800, height=640



### ASCII Art

> :P5 width = 800, height = 550, sketch = /docs/sketches/workshops/imaging/asciiArt.js

> :ToCPrevNext