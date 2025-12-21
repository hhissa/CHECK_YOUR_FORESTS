var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RenderContext {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.context = this.canvas.getContext("webgl");
        if (!this.context) {
            return;
        }
    }
    createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}
export class ComputeNDVI {
    constructor(renderContext) {
        this.rc = renderContext;
        if (!renderContext.context) {
            throw new Error("WebGL not available");
        }
        this.gl = renderContext.context;
    }
    computeNDVI(redBand, nirBand, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const gl = this.gl;
            // ---- Shaders ----
            const vertexSrc = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
            const fragmentSrc = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D redTex;
      uniform sampler2D nirTex;

      void main() {
        float red = texture2D(redTex, vUv).r;
        float nir = texture2D(nirTex, vUv).r;

        float ndvi = (nir - red) / (nir + red + 1e-5);
        ndvi = ndvi * 0.5 + 0.5; // [-1,1] → [0,1]

        gl_FragColor = vec4(ndvi, ndvi, ndvi, 1.0);
      }
    `;
            const vs = this.rc.createShader(gl, gl.VERTEX_SHADER, vertexSrc);
            const fs = this.rc.createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
            const program = this.rc.createProgram(gl, vs, fs);
            gl.useProgram(program);
            // ---- Fullscreen quad ----
            const quad = new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                -1, 1,
                1, -1,
                1, 1,
            ]);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
            const posLoc = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
            // ---- Upload textures ----
            const redTex = this.createFloatTexture(gl, redBand, width, height);
            const nirTex = this.createFloatTexture(gl, nirBand, width, height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, redTex);
            gl.uniform1i(gl.getUniformLocation(program, "redTex"), 0);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, nirTex);
            gl.uniform1i(gl.getUniformLocation(program, "nirTex"), 1);
            // ---- Framebuffer ----
            const fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            const outTex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, outTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outTex, 0);
            gl.viewport(0, 0, width, height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            // ---- Read back pixels ----
            const pixels = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            // ---- Convert to Image ----
            const canvas = this.rc.canvas;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            const imgData = ctx.createImageData(width, height);
            imgData.data.set(pixels);
            ctx.putImageData(imgData, 0, 0);
            const img = new Image();
            img.src = canvas.toDataURL();
            return img;
        });
    }
    // ---- Helpers ----
    createFloatTexture(gl, data, width, height) {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.FLOAT, data);
        return tex;
    }
}
