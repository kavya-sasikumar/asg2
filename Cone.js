class Cone {
  constructor() {
    this.type = 'cone';
    this.color = [1.0, 0.5, 0.5, 1.0];
    this.matrix = new Matrix4();
    this.segments = 20;
  }

  render() {
    let rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    let angleStep = 360 / this.segments;
    let vertices = [];
    for (let i = 0; i < this.segments; i++) {
      let angle1 = (i * angleStep) * Math.PI / 180;
      let angle2 = ((i + 1) * angleStep) * Math.PI / 180;
      vertices.push(0, 0, 1); // Tip
      vertices.push(Math.cos(angle1) * 0.2, Math.sin(angle1) * 0.2, 0);
      vertices.push(Math.cos(angle2) * 0.2, Math.sin(angle2) * 0.2, 0);
    }

    for (let i = 0; i < vertices.length; i += 9) {
      drawTriangle3D(vertices.slice(i, i + 9));
    }
  }
}
