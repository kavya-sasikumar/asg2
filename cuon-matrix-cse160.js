/**
* This is a class treating 4x4 matrix.
* This class contains the function that is equivalent to OpenGL matrix stack.
* The matrix after conversion is calculated by multiplying a conversion matrix from the right.
* The matrix is replaced by the calculated result.
*/


// cuon-matrix.js (c) 2012 kanda and matsuda


class Vector3 {
    constructor(opt_src) {
      var v = new Float32Array(3);
      if (opt_src && typeof opt_src === 'object') {
        v[0] = opt_src[0];
        v[1] = opt_src[1];
        v[2] = opt_src[2];
      }
      this.elements = v;
    }
   
   
    set(src) {
      var i, s = src.elements, d = this.elements;
      if (s === d) return;
      for (i = 0; i < 3; ++i) d[i] = s[i];
      return this;
    }
   
   
    add(other) {
      let e = this.elements;
      let o = other.elements;
      e[0] += o[0];
      e[1] += o[1];
      e[2] += o[2];
      return this;
    }
   
   
    sub(other) {
      let e = this.elements;
      let o = other.elements;
      e[0] -= o[0];
      e[1] -= o[1];
      e[2] -= o[2];
      return this;
    }
   
   
    div(scalar) {
      let e = this.elements;
      e[0] /= scalar;
      e[1] /= scalar;
      e[2] /= scalar;
      return this;
    }
   
   
    mul(scalar) {
      let e = this.elements;
      e[0] *= scalar;
      e[1] *= scalar;
      e[2] *= scalar;
      return this;
    }
   
   
    static dot(a, b) {
      let ae = a.elements;
      let be = b.elements;
      return ae[0]*be[0] + ae[1]*be[1] + ae[2]*be[2];
    }
   
   
    static cross(a, b) {
      let ae = a.elements;
      let be = b.elements;
      return new Vector3([
        ae[1]*be[2] - ae[2]*be[1],
        ae[2]*be[0] - ae[0]*be[2],
        ae[0]*be[1] - ae[1]*be[0]
      ]);
    }
   
   
    static cross(a, b) {
      return new Vector3([
        a.elements[1] * b.elements[2] - a.elements[2] * b.elements[1],
        a.elements[2] * b.elements[0] - a.elements[0] * b.elements[2],
        a.elements[0] * b.elements[1] - a.elements[1] * b.elements[0]
      ]);
    }
   
   
   
   
    magnitude() {
      let e = this.elements;
      return Math.sqrt(e[0]**2 + e[1]**2 + e[2]**2);
    }
   
   
    normalize() {
      let m = this.magnitude();
      if (m === 0) return this;
      return this.div(m);
    }
   }
   
   
   class Vector4 {
    constructor(opt_src) {
      var v = new Float32Array(4);
      if (opt_src && typeof opt_src === 'object') {
        v[0] = opt_src[0];
        v[1] = opt_src[1];
        v[2] = opt_src[2];
        v[3] = opt_src[3];
      }
      this.elements = v;
    }
   }
   
   
   class Matrix4 {
    constructor(opt_src) {
      var i, s, d;
      if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
        s = opt_src.elements;
        d = new Float32Array(16);
        for (i = 0; i < 16; ++i) {
          d[i] = s[i];
        }
        this.elements = d;
      } else {
        this.elements = new Float32Array([
          1,0,0,0,
          0,1,0,0,
          0,0,1,0,
          0,0,0,1
        ]);
      }
    }
   
   
    setIdentity() {
      var e = this.elements;
      e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
      e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
      e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
      e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
      return this;
    }
   
   
    set(src) {
      var i, s = src.elements, d = this.elements;
      if (s === d) return;
      for (i = 0; i < 16; ++i) d[i] = s[i];
      return this;
    }
   
   
    multiply(other) {
      var i, e = this.elements, a = this.elements, b = other.elements;
      if (e === b) {
        b = new Float32Array(16);
        for (i = 0; i < 16; ++i) b[i] = e[i];
      }
      for (i = 0; i < 4; i++) {
        var ai0 = a[i], ai1 = a[i+4], ai2 = a[i+8], ai3 = a[i+12];
        e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
        e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
        e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
        e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
      }
      return this;
    }
   
   
    concat(other) {
      return this.multiply(other);
    }
   
   
    multiplyVector3(pos) {
      var e = this.elements;
      var p = pos.elements;
      var v = new Vector3();
      var result = v.elements;
   
   
      result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[12];
      result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[13];
      result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[14];
   
   
      return v;
    }
   
   
    multiplyVector4(pos) {
      var e = this.elements;
      var p = pos.elements;
      var v = new Vector4();
      var result = v.elements;
   
   
      result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8]  + p[3] * e[12];
      result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9]  + p[3] * e[13];
      result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
      result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];
   
   
      return v;
    }
   
   
    transpose() {
      var e = this.elements, t;
      t = e[1]; e[1] = e[4]; e[4] = t;
      t = e[2]; e[2] = e[8]; e[8] = t;
      t = e[3]; e[3] = e[12]; e[12] = t;
      t = e[6]; e[6] = e[9]; e[9] = t;
      t = e[7]; e[7] = e[13]; e[13] = t;
      t = e[11]; e[11] = e[14]; e[14] = t;
      return this;
    }
   
   
    invert() {
      return this.setInverseOf(this);
    }
   
   
    setOrtho(left, right, bottom, top, near, far) {
      var e = this.elements;
      var rw = 1 / (right - left);
      var rh = 1 / (top - bottom);
      var rd = 1 / (far - near);
   
   
      e[0]  = 2 * rw;
      e[1]  = 0;
      e[2]  = 0;
      e[3]  = 0;
   
   
      e[4]  = 0;
      e[5]  = 2 * rh;
      e[6]  = 0;
      e[7]  = 0;
   
   
      e[8]  = 0;
      e[9]  = 0;
      e[10] = -2 * rd;
      e[11] = 0;
   
   
      e[12] = -(right + left) * rw;
      e[13] = -(top + bottom) * rh;
      e[14] = -(far + near) * rd;
      e[15] = 1;
   
   
      return this;
    }
   
   
    scale(x, y, z) {
      var e = this.elements;
      e[0] *= x; e[4] *= y; e[8]  *= z;
      e[1] *= x; e[5] *= y; e[9]  *= z;
      e[2] *= x; e[6] *= y; e[10] *= z;
      e[3] *= x; e[7] *= y; e[11] *= z;
      return this;
    }
   
   
    setScale(x, y, z) {
      var e = this.elements;
      e[0] = x; e[4] = 0; e[8] = 0; e[12] = 0;
      e[1] = 0; e[5] = y; e[9] = 0; e[13] = 0;
      e[2] = 0; e[6] = 0; e[10] = z; e[14] = 0;
      e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
      return this;
    }
   
   
    setTranslate(x, y, z) {
      var e = this.elements;
      e[0] = 1; e[4] = 0; e[8] = 0; e[12] = x;
      e[1] = 0; e[5] = 1; e[9] = 0; e[13] = y;
      e[2] = 0; e[6] = 0; e[10] = 1; e[14] = z;
      e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
      return this;
    }
   
   
    translate(x, y, z) {
      var e = this.elements;
      e[12] += e[0]*x + e[4]*y + e[8]*z;
      e[13] += e[1]*x + e[5]*y + e[9]*z;
      e[14] += e[2]*x + e[6]*y + e[10]*z;
      e[15] += e[3]*x + e[7]*y + e[11]*z;
      return this;
    }
   
   
    setRotate(angle, x, y, z) {
      var e = this.elements;
      var len = Math.sqrt(x*x + y*y + z*z);
      if (len !== 1) {
        var rlen = 1 / len;
        x *= rlen;
        y *= rlen;
        z *= rlen;
      }
   
   
      var rad = Math.PI * angle / 180;
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var nc = 1 - c;
   
   
      var xy = x*y, yz = y*z, zx = z*x;
      var xs = x*s, ys = y*s, zs = z*s;
   
   
      e[0] = x*x*nc + c;
      e[1] = xy*nc + zs;
      e[2] = zx*nc - ys;
      e[3] = 0;
   
   
      e[4] = xy*nc - zs;
      e[5] = y*y*nc + c;
      e[6] = yz*nc + xs;
      e[7] = 0;
   
   
      e[8] = zx*nc + ys;
      e[9] = yz*nc - xs;
      e[10] = z*z*nc + c;
      e[11] = 0;
   
   
      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;
   
   
      return this;
    }
   
   
    rotate(angle, x, y, z) {
      return this.concat(new Matrix4().setRotate(angle, x, y, z));
    }
   
   
    setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
      var fx = centerX - eyeX;
      var fy = centerY - eyeY;
      var fz = centerZ - eyeZ;
   
   
      var rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
      fx *= rlf;
      fy *= rlf;
      fz *= rlf;
   
   
      var sx = fy * upZ - fz * upY;
      var sy = fz * upX - fx * upZ;
      var sz = fx * upY - fy * upX;
   
   
      var rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
      sx *= rls;
      sy *= rls;
      sz *= rls;
   
   
      var ux = sy * fz - sz * fy;
      var uy = sz * fx - sx * fz;
      var uz = sx * fy - sy * fx;
   
   
      var e = this.elements;
      e[0] = sx; e[1] = ux; e[2] = -fx; e[3] = 0;
      e[4] = sy; e[5] = uy; e[6] = -fy; e[7] = 0;
      e[8] = sz; e[9] = uz; e[10] = -fz; e[11] = 0;
      e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
   
   
      return this.translate(-eyeX, -eyeY, -eyeZ);
    }
   
   
    lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
      return this.concat(new Matrix4().setLookAt(
        eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ
      ));
    }
   
   
    dropShadow(plane, light) {
      var mat = new Matrix4();
      var e = mat.elements;
      var dot = plane[0]*light[0] + plane[1]*light[1] + plane[2]*light[2] + plane[3]*light[3];
   
   
      e[0] = dot - light[0]*plane[0];
      e[1] = -light[1]*plane[0];
      e[2] = -light[2]*plane[0];
      e[3] = -light[3]*plane[0];
   
   
      e[4] = -light[0]*plane[1];
      e[5] = dot - light[1]*plane[1];
      e[6] = -light[2]*plane[1];
      e[7] = -light[3]*plane[1];
   
   
      e[8] = -light[0]*plane[2];
      e[9] = -light[1]*plane[2];
      e[10] = dot - light[2]*plane[2];
      e[11] = -light[3]*plane[2];
   
   
      e[12] = -light[0]*plane[3];
      e[13] = -light[1]*plane[3];
      e[14] = -light[2]*plane[3];
      e[15] = dot - light[3]*plane[3];
   
   
      return this.concat(mat);
    }
   
   
    dropShadowDirectionally(nx, ny, nz, px, py, pz, lx, ly, lz) {
      var a = px*nx + py*ny + pz*nz;
      return this.dropShadow([nx, ny, nz, -a], [lx, ly, lz, 0]);
    }
   }
   
   
   