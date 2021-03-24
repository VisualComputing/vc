
let img;
let html_colors = [ '#00FFFF', '#F0F8FF', '#FAEBD7', '#000000', '#0000FF', '#00FFFF', '#00008B', '#008B8B', '#006400', '#00CED1', '#00BFFF', '#008000', '#00FF00', '#0000CD', '#00FA9A', '#000080', '#00FF7F', '#008080', '#191970', '#1E90FF', '#20B2AA', '#228B22', '#2E8B57', '#2F4F4F', '#2F4F4F', '#32CD32', '#3CB371', '#40E0D0', '#4169E1', '#4682B4', '#483D8B', '#48D1CC', '#4B0082', '#556B2F', '#5F9EA0', '#6495ED', '#66CDAA', '#696969', '#696969', '#6A5ACD', '#6B8E23', '#708090', '#708090', '#778899', '#778899', '#7B68EE', '#7CFC00', '#7FFFD4', '#7FFF00', '#808080', '#808080', '#800000', '#808000', '#800080', '#87CEFA', '#87CEEB', '#8A2BE2', '#8B008B', '#8B0000', '#8B4513', '#8FBC8F', '#90EE90', '#9370DB', '#9400D3', '#98FB98', '#9932CC', '#9ACD32', '#A0522D', '#A52A2A', '#A9A9A9', '#A9A9A9', '#ADFF2F', '#ADD8E6', '#AFEEEE', '#B0C4DE', '#B0E0E6', '#B22222', '#B8860B', '#BA55D3', '#BC8F8F', '#BDB76B', '#C0C0C0', '#C71585', '#CD5C5C', '#CD853F', '#D2691E', '#D2B48C', '#D3D3D3', '#D3D3D3', '#D8BFD8', '#DAA520', '#DA70D6', '#DB7093', '#DC143C', '#DCDCDC', '#DDA0DD', '#DEB887', '#E0FFFF', '#E6E6FA', '#E9967A', '#EEE8AA', '#EE82EE', '#F0FFFF', '#F0FFF0', '#F0E68C', '#F08080', '#F4A460', '#F5F5DC', '#F5FFFA', '#F5DEB3', '#F5F5F5', '#F8F8FF', '#FAFAD2', '#FAF0E6', '#FA8072', '#FDF5E6', '#FFE4C4', '#FFEBCD', '#FF7F50', '#FFF8DC', '#FF8C00', '#FF1493', '#FFFAF0', '#FF00FF', '#FFD700', '#FF69B4', '#FFFFF0', '#FFF0F5', '#FFFACD', '#FFB6C1', '#FFA07A', '#FFFFE0', '#FF00FF', '#FFE4E1', '#FFE4B5', '#FFDEAD', '#FFA500', '#FF4500', '#FFEFD5', '#FFDAB9', '#FFC0CB', '#FF0000', '#FFF5EE', '#FFFAFA', '#FF6347', '#FFFFFF', '#FFFF00',];
let images_html_colors = {};



function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/mosaic/duck.jpg");
    preLoadImages();
}


function setup() {
    createCanvas(800, 640);
    noLoop();
}

function draw() {
    img.resize(800, 640);
    image(img, 0, 0);

    let d = pixelDensity();
    
    let mosaic_part_x =10;
    let mosaic_part_y =10;

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

            searchImage(rgbToHex(r,g,b), i*mosaic_part_x, j*mosaic_part_y, mosaic_part_x, mosaic_part_y);
        }
    }

    noLoop();
}


function preLoadImages(){
    for(let i=0; i<html_colors.length; i++){
        loadImage(`/vc/docs/sketches/workshops/imaging/mosaic/html_colors/${html_colors[i].substring(1,7)}.jpg`, img_color =>{
            images_html_colors[html_colors[i]] = img_color;
        });
    }
}




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




function calculateDeltaE(color1, color2){
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);
    return Math.sqrt( ((c2.r-c1.r)*(c2.r-c1.r)) + ((c2.g-c1.g)*(c2.g-c1.g)) + ((c2.b-c1.b)*(c2.b-c1.b)));
}




function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

