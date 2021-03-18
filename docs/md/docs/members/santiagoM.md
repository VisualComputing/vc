# Santiago Alejandro Morales Pulido

## Bio

## Interests

## Contributions

papers, blogs, research, free software...

## Hobbies

## ILusion optica
La ilusión de Ebbinghaus es una ilusión óptica que altera la percepción de las dimensiones relativas. En la versión más conocida de la ilusión, dos círculos de la misma medida son colocados cercanos uno a otro y son circundados, uno por círculos de un tamaño mayor y el otro por círculos de menor tamaño; el primer círculo central parecerá más pequeño que el otro.

Es denominada así en honor a su descubridor, el psícólogo alemán Hermann Ebbinghaus(1850-1909) fue popularizada en el mundo de habla inglesa por Titchener en un libro de texto sobre psicología experimental de año 1901, de ahí que su nombre alternativo sea "Círculos de Titchener".

> :P5 width=720, height=570
>
> function setup() {
>   createCanvas(720, 570);
> }
>
> function draw() {
> background(220);
>   //left circles
>   noStroke()
>   fill('orange')
>   ellipse(180,285,50,50)
>   
>   //Bigger circles
>   fill('gray')
>   ellipse(133,195,100,100)
>   ellipse(237,195,100,100)
>   ellipse(133,375,100,100)
>   ellipse(237,375,100,100)
>   ellipse(80,285,100,100)
>   ellipse(290,285,100,100)
> 
>   //left circles
>   fill('orange')
>   ellipse(540,285,50,50)
> 
>   //smaller circles
>   fill('gray')
>   ellipse(540,235,25,25)
>   ellipse(540,335,25,25)
>   ellipse(490,285,25,25)
>   ellipse(590,285,25,25)
>   ellipse(575,320,25,25)
>   ellipse(575,250,25,25)
>   ellipse(505,320,25,25)
>   ellipse(505,250,25,25)
> }


> :ToCPrevNext