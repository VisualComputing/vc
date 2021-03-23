# Camilo Andres Gil Ballen

## Bio

## Interests

## Contributions

## Hobbies
* Historia
* Futbol
    *Messi, Maradona, 
* Survival Games
* Random Topics

## Optical Illusions - Scintillating Grid Illusion
Una ilusión de cuadrícula es cualquier tipo de cuadrícula que engaña la 
visión de una persona. Los dos tipos más comunes de ilusiones de cuadrícula son 
la ilusión de cuadrícula de Hermann y la ilusión de cuadrícula centelleante.

La ilusión de rejilla centelleante es una ilusión óptica, descubierta 
por E. y B. Lingelbach y M. Schrauf en 1994. A menudo se considera una variación de 
la ilusión de rejilla de Hermann, pero posee diferentes propiedades. Se construye superponiendo 
discos blancos en las intersecciones. de barras ortogonales grises sobre fondo negro. Los puntos 
oscuros parecen aparecer y desaparecer rápidamente en intersecciones aleatorias, de ahí la etiqueta 
"centelleante". Cuando una persona mantiene sus ojos directamente en una única intersección, 
el punto oscuro no aparece. Los puntos oscuros desaparecen si uno está demasiado 
cerca o demasiado lejos de la imagen.

> :P5 width=720, height=720
>
> function setup() {
>   createCanvas(720, 720);
>   noLoop();
> }
>
>function draw() {
>   let width = 720;
>   let height = 720;
>   let num_squares = 10;
>  
>   let lines_size   = width/(num_squares * 5);
>   let square_size  = width/(num_squares * 5) * 4;
>  
>  
>   background("#000000");
>  
>  
>  
>   for(let i =0; i < num_squares; i++){
>       noStroke();
>       fill('#999999');
>       let y = ((i+0.5) * square_size) + (i * lines_size);
>       let x = ((i+0.5) * square_size) + (i * lines_size);
>       rect(0, y, width, lines_size);
>       rect(x, 0, lines_size, height);
>   }
>  
>   for(let i =0; i< num_squares; i++){
>       for(let j =0; j < num_squares; j++){
>           noStroke();
>           fill("#ffffff");
>           let x = ((i+0.5) * square_size)+((i+0.5) * lines_size);
>           let y = ((j+0.5) * square_size)+((j+0.5) * lines_size);
>           circle(x, y, lines_size * 1.57);
>       }  
>   }
>}
>

El efecto de ambas ilusiones ópticas a menudo se explica por un proceso
neural llamado inhibición lateral. La intensidad en un punto del sistema 
visual no es simplemente el resultado de un solo receptor, sino el resultado 
de un grupo de receptores que responden a la presentación de estímulos en 
lo que se llama campo receptivo.
> :ToCPrevNext