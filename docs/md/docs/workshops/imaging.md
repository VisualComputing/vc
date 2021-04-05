 # Image and video processing





## Load and Deploy image

> :P5 sketch=/docs/sketches/workshops/imaging/loadImage.js, width=800, height=550




## Negative of an image

> :P5 sketch=/docs/sketches/workshops/imaging/negativeImage.js, width=800, height=550








### Escala de grises

#### Problem Statement


Aplicar la conversión a escala de grises en imágenes y videos utilizando la herramienta p5.js.

#### Background


En fotografía digital e imágenes generadas por computadora, una escala de grises o imagen es aquella en la que el valor de cada píxel es una sola muestra que representa solo una cantidad de luz; es decir, lleva solo información de intensidad. Las imágenes en escala de grises, una especie de monocromo en blanco y negro o gris, se componen exclusivamente de tonos de gris. El contraste varía desde el negro en la intensidad más débil hasta el blanco en la más fuerte.


Las imágenes en escala de grises son distintas de las imágenes en blanco y negro de dos tonos de un bit, que, en el contexto de las imágenes por computadora, son imágenes con solo dos colores: blanco y negro (también llamadas imágenes de dos niveles o binarias). Las imágenes en escala de grises tienen muchos tonos de gris en el medio.

#### Code & Results


**_Filtros_**

**Promedio RGB**

Este es el algoritmo de escala de grises para los programadores novatos. Esta fórmula genera un razonablemente agradable equivalente en escala de grises, su simplicidad hace que sea fácil de implementar y optimizar. Sin embargo, esta fórmula no está exenta de defectos mientras rápido y sencillo, que hace un trabajo pobre de representar tonos de gris en relación con la forma en que los seres humanos perciben la luminosidad (brillo).
[http://ilapep.mx/g1/color_to_gray_scale.pdf]

Para aplicarlo tomamos el RGB de cada pixel y lo dividimos entre 3, como muestra el siguiente código

``` js
sImg.loadPixels();
for (let i = 0; i < npixels; i += 4) {
    let gray = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    sImg.pixels[i] = gray;
    sImg.pixels[i + 1] = gray;
    sImg.pixels[i + 2] = gray;
    sImg.pixels[i + 3] = img.pixels[i + 3];
}
sImg.updatePixels();
```

**Luma**

luma representa el brillo de una imagen (la parte "blanco y negro" o acromática de la imagen). Por lo general, la luminancia se empareja con la crominancia. Luma representa la imagen acromática, mientras que los componentes cromáticos representan la información de color. Los sistemas de video pueden almacenar y transmitir información cromática a una resolución más baja, optimizando los detalles percibidos en un ancho de banda particular.

Para encontrar el Luma seguimos una serie de pasos:

*Paso 1*

Convertir el pixel RGB a decimal (0.0 a 1.0)

Para ello usamos el siguiente código:

``` js
let vR = r / 255;
let vG = g / 255;
let vB = b / 255;
```

*Paso 2*

Convertir un RGB codificado (paso 1) con gamma a un valor lineal. RGB (estándar de computadora), por ejemplo, requiere una curva de potencia de aproximadamente V ^ 2.2, aunque la transformación "precisa" es:

![Image formula 1](https://i.stack.imgur.com/syfhh.png)

Donde V´ es el canal R, G o B codificado en gamma de RGB.

Esto se realizó con las siguientes lineas del código:

``` js
function sRGBtoLin(colorChannel) {
    if ( colorChannel <= 0.04045 ) {
        return colorChannel / 12.92;
    } else {
        return Math.pow((( colorChannel + 0.055)/1.055),2.4);
    }
}
```

*Paso 3*

Para encontrar la luminancia aplicamos los coeficientes estándar para sRGB:

![Image formula 2](https://i.stack.imgur.com/TZoZA.png)

``` js
let Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
```

Adicionalmente recorremos todos los pixeles y aplicando la formula anteriormente mostrada.

``` js
oImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let y = luma(img.pixels[i], img.pixels[i+1],img.pixels[i+2])
        oImg.pixels[i] = y;
        oImg.pixels[i + 1] = y;
        oImg.pixels[i + 2] = y;
        oImg.pixels[i + 3] = img.pixels[i+3];
    }
oImg.updatePixels();
```

A continuación se muestran los resultados obtenidos aplicando las funciones anteriormente mencionadas.

### Promedio RGB y Luma en imagen

Arriba izquierda se muestra la imagen original, arriba derecha se muestra con la aplicación de la función predeterminada de funcion p5js, abajo izquierda se muestra aplicando luma, abajo derecha se muestra aplicando el promedio RGB
https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

> :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-luma.js, width=800, height=550

### Promedio RGB en video

Se muestra aplicando el promedio RGB en video para un video

https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

> :P5 sketch=/docs/sketches/workshops/imaging/gray/LumaVid.js, width=320, height=240

### Promedio luma en video

Se muestra aplicando luma en video

> :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-Vid.js, width=320, height=240








<br/>
<br/><br/>
<br/>


















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






















<br/>
<br/><br/>
<br/>




## Mosaic - Images


### Problem statement
Se debe implementar un mecanismo que genere un mosaico el cual consiste en recrear una imagen a partir de pequeñas imágenes, para crear una mayor concordancia las pequeñas imágenes deben pertenece a la misma temática de la imagen original, por ejemplo, aves. 
<br/>
<br/>

### Background


**Ideas Primarias:** Las primeras ideas que se plantearon para la creación del mosaico fueron 2 principalmente:

* Primero se determino que la mejor manera para crear el mosaico consistía en dividir la imagen en pequeñas cuadriculas cuyo tamaño fuera una potencia de 2 (por ejemplo, 8x8 o 16x16), una vez se tienen estas cuadriculas se haya el color dominante de cada cuadricula, para esto basto con hallar el promedio de cada uno los canales (trabajando en modo rgb) de los colores de cada uno de los pixeles de la cuadricula, esto permitió obtener un color domínate de cada uno de las cuadriculas. 

* Como segunda idea ya teniendo el color predominante de cada una de las cuadriculas, se planteo el uso de una API que se encargara de proveer imágenes para cada una de las cuadriculas con su respectivo color predominante, este proceso funciono en pequeña escala, pero cuando se intentó realizar el proceso con una imagen de tamaño real, se superaron fácilmente el limite de las API, esto conllevo a descartar esta segunda idea y buscar otras alternativas. 


**HTML Colores y Distancia Delta:** Dado que era imposible conseguir una imagen para cada uno de los colores, se busco alguna manera de estandarizar la paleta, en esta búsqueda se encontró la lista de colores estándares proveídos por **HTML**, dicha lista esta conformada por 140 colores y representan una abstracción bastante completa de la paleta, con esta lista de colores mucho más reducida se busco una imagen para cada uno de los colores. 

En este punto se tenía 140 imágenes para cada uno los colores estandarizados por HTML, pero los colores predominantes de cada uno de las cuadriculas aún no habían sido estandarizado, para esto se hizo uso del concepto de **distancia delta**, dicha distancia expresa de manera numérica la diferencia entre 2 colores,  es decir si x y z son el mismo color su distancia será cero, con este concepto en mente se tomo un cuadricula cuyo color predomínate es el color **c** y se halló la distancia delta del color c con cada uno de los 140 colores y se selecciono el color con la mejor distancia, se tomó la imagen correspondiente a ese color y se construyó el mosaico.
<br/>
<br/>

### Code (solution) & results


**Obteniendo el Color Predominante:** El siguiente fragmento de código permite obtener el color predominante de cada una de las cuadriculas de la imagen original.
```js | getColor.js
let d = pixelDensity();
    
    let mosaic_part_x =8;
    let mosaic_part_y =8;

    loadPixels();

    for(let i=0; i< Math.floor(width/mosaic_part_x); i++ ){
        for(let j=0; j< Math.floor(height/mosaic_part_y); j++ ){
            let r = 0; 
            let g = 0; 
            let b = 0;

            for(let k=0; k<mosaic_part_x; k++){
                for(let l=0; l<mosaic_part_y; l++){
                    
                    let x = i*mosaic_part_x + k;
                    let y = j*mosaic_part_y + l;

                    let off = (y * width + x) * d * 4;
                    r+= pixels[off];
                    g+= pixels[off + 1];
                    b+= pixels[off + 2];
                }
            }

            r = Math.floor(r / (mosaic_part_x*mosaic_part_y));
            g = Math.floor(g / (mosaic_part_x*mosaic_part_y));
            b = Math.floor(b / (mosaic_part_x*mosaic_part_y));

        }
    }
```
<br/>


**Calcular la Distancia Delta:** El siguiente fragmento de código permite obtener la distancia delta entre 2 colores.
``` js | distanceDelta.js
function calculateDeltaE(color1, color2){
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);
    return Math.sqrt( ((c2.r-c1.r)*(c2.r-c1.r)) + 
                      ((c2.g-c1.g)*(c2.g-c1.g)) + 
                      ((c2.b-c1.b)*(c2.b-c1.b)));
}
```
<br/>


**Asociar Imagen a Cada Cuadricula:** El siguiente fragmento de código permite obtener una imagen dado un color, para esto primero estandariza el color con ayuda de la distancia delta y luego selecciona la imagen de las imágenes disponibles. 
```  js | searchImage.js
function searchImage(color, x, y, w, h){
    let min =  100000000;
    let color_min = "#FFFFFF";
    
    for(let i=0; i<html_colors.length; i++){
        let deltaE = calculateDeltaE(color, html_colors[i]);
        if(deltaE<=min){
            min = deltaE;
            color_min = html_colors[i];
        }
    }

    let img_color = images_html_colors[color_min];
    img_color.resize(w, h);
    image(img_color, x, y);
}

```
<br/>

**Banco de Imagenes:** Se ha hablando bastante de las imágenes disponibles, este pequeño banco de imágenes esta conformado por las siguientes imágenes:


<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0F8FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAEBD7.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00008B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008B8B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/006400.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00CED1.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00BFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF00.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000CD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FA9A.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF7F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/191970.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/1E90FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/20B2AA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/228B22.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2E8B57.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/32CD32.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/3CB371.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/40E0D0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4169E1.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4682B4.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/483D8B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/48D1CC.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4B0082.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/556B2F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/5F9EA0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6495ED.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/66CDAA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6A5ACD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6B8E23.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7B68EE.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7CFC00.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFFD4.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFF00.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEFA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEEB.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8A2BE2.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B008B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B0000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B4513.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8FBC8F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/90EE90.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9370DB.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9400D3.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/98FB98.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9932CC.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9ACD32.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A0522D.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A52A2A.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADFF2F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADD8E6.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/AFEEEE.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0C4DE.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0E0E6.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B22222.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B8860B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BA55D3.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BC8F8F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BDB76B.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C0C0C0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C71585.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD5C5C.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD853F.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2691E.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2B48C.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D8BFD8.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DAA520.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DA70D6.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DB7093.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DC143C.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DCDCDC.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DDA0DD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DEB887.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E0FFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E6E6FA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E9967A.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EEE8AA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EE82EE.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFF0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0E68C.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F08080.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F4A460.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5DC.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5FFFA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5DEB3.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5F5.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F8F8FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAFAD2.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAF0E6.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FA8072.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FDF5E6.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4C4.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEBCD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF7F50.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF8DC.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF8C00.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF1493.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAF0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFD700.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF69B4.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFF0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF0F5.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFACD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFB6C1.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA07A.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFE0.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4E1.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4B5.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDEAD.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA500.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF4500.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEFD5.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDAB9.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFC0CB.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF0000.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF5EE.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAFA.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF6347.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFFF.jpg" width="9%"></img> 
<img src="../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFF00.jpg" width="9%"></img> 

<br/>

### Result 
A continuación se muestra una imagen y el resultado al aplicar el algoritmo para generar su mosaico.
#### Original

> :P5 sketch=/docs/sketches/workshops/imaging/mosaic/duck.js, width=800, height=640

#### Mosaic

> :P5 sketch=/docs/sketches/workshops/imaging/mosaic/main.js, width=800, height=640

### Conclusions & Future Work

Para finalizar se concluye que el mecanismo de obtención del color denomínate resulta simple, sencillo, efectivo y elegante, por otro lado, se destaca que fue inviable hacer uso de una API, pero la alternativa de estandarizar los colores en el formato HTML y el uso de la distancia delta para discretizar resulta altamente efectivo. Como futuro trabajo se proponen las siguientes ideas.

* Si bien la distancia delta es una medida efectiva no deja de ser una simple distancia euclidiana, una mejora en el trabajo podría ser trabajar una medida más precisa de acuerdo con el contexto. 

* Si bien la mayoría de APIs en su capa gratuita tienen unos limites bastantes bajos en relación con lo solicitado por el ejercicio, se podría buscar una solución de pago o usar herramientas de scraping para la creación de una podría API. 

























































<br/>
<br/>




 

## ASCII Art

### Problem statement 
Conversión de la imagen a ascii art. Nota: Se puede emplear p5.quadrille.js.

### Background

El arte ASCII se ha utilizado cuando no es posible la transmisión o la impresión de imágenes en las configuraciones de equipos computarizados, tales como maquinillas, teletipos y equipos de visualización (consolas y terminales) que no cuentan con tarjetas de proceso gráfico. El arte ASCII ha servido como lenguaje fuente para representar logos de compañías y productos, para crear diagramas procedimentales de flujo de operaciones y también en el diseño de los primeros videojuegos.


Para analizar de manera satisfactoria una imagen y convertirla a ASCII art, se debe analizar la imagen por regiones.
El bloque a analizar puede ser de longitud variable, pero deben tenerse en cuenta distintos factores, como el tamaño de los simbolos ASCII o la densidad de la imagen.
 
### Code & Results

Se tienen variables globales importantes como blockSize, que define el tamaño del bloque a analizar.

``` js
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
    noLoop();
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
```
La función scanBlock toma un bloque individual de datos y lo envía a la función patternDef, para definir su nivel de brillo y así, asignar un ASCII correspondiente.

``` js
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
```

La función patternDef toma un bloque de información y lo analiza. Encuentra el brillo promedio del bloque y envía el resultado estandarizado (un valor entre 0 y 1) a la funcion selectCharacter, que se encargará de asignar un caracter a cada bloque analizado.  
``` js
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
```

La función selectCharacter recibe la intensidad de un bloque previamente analizado, y selecciona un ASCII adecuado para el ASCII art. Esta función es de mucha utilidad, ya que sin ella los caracteres no podrían representar la opacidad o profundidad de la imagen procesada.

``` js 
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
```

El resultado se muestra a continuación:
> :P5 width = 800, height = 550, sketch = /docs/sketches/workshops/imaging/asciiArt.js




### Conclusions & future work

Se concluye que el análisis por medio de bloques de información y brillo puede ser de utilidad para la representación fiel de una imagen, pero en algunos casos pueden requerirse distintos algoritmos para medir le intensidad, ya que esta puede verse distorsionada y no ser una medida a representar fiable.
Como trabajo futuro se propone la automatización de la función selectCharacter, de modo que analice todos los caracteres ASCII posibles, y seleccione cual simbolo representa mejor un bloque de información.

> :ToCPrevNext