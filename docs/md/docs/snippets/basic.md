# P5 inline code

Adapted from [here](https://p5js.org/examples/structure-recursion.html).

> :P5 width=720, height=560, padding=0
>
> function setup() {
>   createCanvas(windowWidth, windowHeight);
>   noStroke();
>   noLoop();
> }
> 
> function draw() {
>   drawCircle(width / 2, 280, 6);
> }
> 
> function drawCircle(x, radius, level) {
>   const tt = (126 * level) / 4.0;
>   fill(tt);
>   ellipse(x, height / 2, radius * 2, radius * 2);
>   if (level > 1) {
>     level = level - 1;
>     drawCircle(x - radius / 2, radius / 2, level);
>     drawCircle(x + radius / 2, radius / 2, level);
>   }
> }
> function windowResized() {
>   resizeCanvas(windowWidth, windowHeight);
> }

note that the above sketch code is included within the markdown itself like this:

```md
> :P5 width=720, height=560
>
> function setup() {
>   createCanvas(720, 560);
>   noStroke();
>   noLoop();
> }
> 
> function draw() {
>   drawCircle(width / 2, 280, 6);
> }
> 
> function drawCircle(x, radius, level) {
>   const tt = (126 * level) / 4.0;
>   fill(tt);
>   ellipse(x, height / 2, radius * 2, radius * 2);
>   if (level > 1) {
>     level = level - 1;
>     drawCircle(x - radius / 2, radius / 2, level);
>     drawCircle(x + radius / 2, radius / 2, level);
>   }
> }
```

# P5 instance mode

Adapted from [here](https://p5js.org/examples/color-relativity.html).

> :P5 sketch=/docs/sketches/colors.js, width=710, height=400

The markdown of the above sketch looks like this (check the [component specs](/docs/snippets/component) for details):

```markdown
> :P5 sketch=/docs/sketches/colors.js, width=710, height=400
```

> :Collapse label=click to display the `colors.js` [p5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) code
> 
> ```js | colors.js
> var myp5 = new p5((p) => {
>   let a, b, c, d, e;
> 
>   p.setup = function () {
>     p.createCanvas(710, 400);
>     p.noStroke();
>     a = p.color(165, 167, 20);
>     b = p.color(77, 86, 59);
>     c = p.color(42, 106, 105);
>     d = p.color(165, 89, 20);
>     e = p.color(146, 150, 127);
>     p.noLoop();
>   }
> 
>   p.draw = function () {
>     drawBand(a, b, c, d, e, 0, p.width / 128);
>     drawBand(c, a, d, b, e, p.height / 2, p.width / 128);
>   }
> 
>   function drawBand(v, w, x, y, z, ypos, barWidth) {
>     let num = 5;
>     let colorOrder = [v, w, x, y, z];
>     for (let i = 0; i < p.width; i += barWidth * num) {
>       for (let j = 0; j < num; j++) {
>         p.fill(colorOrder[j]);
>         p.rect(i + j * barWidth, ypos, barWidth, p.height / 2);
>       }
>     }
>   }
> }, "colors"); // --> the id should be the same file name
> ```

Check the [component specs](/docs/snippets/component) for details.

> :ToCPrevNext