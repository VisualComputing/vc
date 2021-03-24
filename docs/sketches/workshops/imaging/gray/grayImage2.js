let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
}

function setup() {
    createCanvas(800, 550);
    img.resize(400, 275);
    noLoop();
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let c = max - min;
    s = max == 0 ? 0 : c / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / c + (g < b ? 6 : 0); break;
            case g: h = (b - r) / c + 2; break;
            case b: h = (r - g) / c + 4; break;
        }
        h /= 6;
    }
    return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [ r * 255, g * 255, b * 255 ];
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let c = max - min;
        s = l > 0.5 ? c / (2 - max - min) : c / (max + min);
        switch (max) {
            case r: h = (g - b) / c + (g < b ? 6 : 0); break;
            case g: h = (b - r) / c + 2; break;
            case b: h = (r - g) / c + 4; break;
        }
        h /= 6;
    }

    return [ h, s, l ];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [ r * 255, g * 255, b * 255 ];
}

function lab2rgb(lab){
    let y = (lab[0] + 16) / 116, x = lab[1] / 500 + y, z = y - lab[2] / 200, r, g, b;

    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;

    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

    return [Math.max(0, Math.min(1, r)) * 255,
        Math.max(0, Math.min(1, g)) * 255,
        Math.max(0, Math.min(1, b)) * 255]
}

function rgb2lab(rgb){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

function draw() {

    eImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    oImg = createImage(img.width, img.height);
    sImg = createImage(img.width, img.height);

    let buffer = [0,0,0];
    let cond = Math.pow((6/29), 3), t;

    //HSV
    let d = pixelDensity();
    let npixels = 4 * (img.width * d) * (img.height * d);
    img.loadPixels();
    eImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        buffer = rgbToHsv(img.pixels[i],img.pixels[i+1],img.pixels[i+2]);
        buffer[1] *= 0;
        buffer = hsvToRgb(buffer[0],buffer[1],buffer[2]);
        eImg.pixels[i] = buffer[0];
        eImg.pixels[i + 1] = buffer[1];
        eImg.pixels[i + 2] = buffer[2];
        eImg.pixels[i + 3] = img.pixels[i + 3];
    }
    eImg.updatePixels();
    image(eImg, 0, 0);

    //HSL
    bImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        buffer = rgbToHsl(img.pixels[i],img.pixels[i+1],img.pixels[i+2]);
        buffer[1] *= 0;
        buffer = hslToRgb(buffer[0],buffer[1],buffer[2]);
        bImg.pixels[i] = buffer[0];
        bImg.pixels[i + 1] = buffer[1];
        bImg.pixels[i + 2] = buffer[2];
        bImg.pixels[i + 3] = img.pixels[i + 3];
    }
    bImg.updatePixels();
    image(bImg, 400, 0);

    //CieLAB
    oImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        buffer[0] = img.pixels[i];
        buffer[1] = img.pixels[i+1];
        buffer[2] = img.pixels[i+2];
        let gray = img.pixels[i] * 0.2126 + img.pixels[i + 1] * 0.7152 + img.pixels[i + 2] * 0.0722;
        if (gray > cond) {
            t = Math.pow(gray, 1/3)
        } else {
            t = ((1/3) * Math.pow(29/6,2) * gray) + (4/29)
        }
        t = (1/100) * ((116 * t) - 116)
        buffer = rgb2lab(buffer);
        //buffer[0] = t
        buffer[1] = t
        buffer[2] = t
        buffer = lab2rgb(buffer);

        oImg.pixels[i] = buffer[0];
        oImg.pixels[i + 1] = buffer[1];
        oImg.pixels[i + 2] = buffer[2];
        oImg.pixels[i + 3] = img.pixels[i + 3];
    }
    oImg.updatePixels();
    image(oImg, 0, 275);

    //Luma
    /*
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
    */
}