class Cube {
  constructor() {
    this.type = 'cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
  }

  render() {
    let rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    let vertices = [
      0, 0, 0, 1, 1, 0, 1, 0, 0,
      0, 0, 0, 0, 1, 0, 1, 1, 0,
      0, 0, 1, 1, 0, 1, 1, 1, 1,
      0, 0, 1, 1, 1, 1, 0, 1, 1,
      0, 1, 0, 1, 1, 0, 1, 1, 1,
      0, 1, 0, 1, 1, 1, 0, 1, 1,
      0, 0, 0, 1, 0, 0, 1, 0, 1,
      0, 0, 0, 1, 0, 1, 0, 0, 1,
      0, 0, 0, 0, 1, 0, 0, 1, 1,
      0, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 1, 1, 1,
      1, 0, 0, 1, 1, 1, 1, 0, 1,
    ];
    for (let i = 0; i < vertices.length; i += 9) {
      drawTriangle3D(vertices.slice(i, i + 9));
    }
  }
}
