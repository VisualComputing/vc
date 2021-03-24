let s = (t = 60);

function setup() {
  createCanvas((W = 600), W);
}

function draw() {
  t += 0.03;
  stroke(150);
  strokeWeight(2);
  for (y = W + s; (y -= s); ) {
    for (
      x = W + s * 4;
      (x -= s);
      rect(((y / s) % 2 ? sin(t) * s * 2 + x : x) - s * 2, y - s, s)
    ) {
      fill(((x + y) / s) % 2 == 0 ? 0 : "#つぶやきProcessing");
    }
  }
}
