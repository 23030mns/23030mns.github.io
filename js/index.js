// webgl utils

const utils = {

  makeWebGLInstance ($canvas) {
      const gl = $canvas.getContext('webgl2', { preserveDrawingBuffer: true })
      if (!gl) {
          const $warningDiv = document.createElement('div')
          $warningDiv.innerText = `WebGL2.0 not supported. Please try modern Chrome or Firefox.`
          $warningDiv.style.padding = `2rem`
          $warningDiv.style.background = `#111`
          $warningDiv.style.color = `#fff`
          $warningDiv.style.fontFamily = 'sans-serif'
          $warningDiv.style.position = `fixed`
          $warningDiv.style.top = $warningDiv.style.left = '0px' 
          $warningDiv.style.width = $warningDiv.style.height = `100%`
          document.body.appendChild($warningDiv)

          return
      }
      return gl
  },

  makeShader (gl, shaderType, shaderSource) {
      const shader = gl.createShader(shaderType)
      gl.shaderSource(shader, shaderSource)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`)
          return
      }
      return shader
  },

  makeProgram (gl, vertexShader, fragmentShader) {
      const program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(`Error linking program: ${gl.getProgramInfoLog(program)}`)
          return
      }

      return program
  },

  makeBuffer (gl, props) {
      const {
          bufferType,
          typedArray,
          drawType
      } = props
      
      const buffer = gl.createBuffer()
      gl.bindBuffer(bufferType, buffer)
      gl.bufferData(bufferType, typedArray, drawType)
      // gl.bindBuffer(bufferType, null)
      
      return buffer
  },

  bindBuffer (gl, buffer, props) {
      const {
          bufferType,
          attribLocation,
          attribType,
          itemsPerVert
      } = props

      gl.bindBuffer(bufferType, buffer)
      if (!buffer) return
      gl.enableVertexAttribArray(attribLocation)
      gl.vertexAttribPointer(attribLocation, itemsPerVert, attribType, false, 0, 0)
      gl.bindBuffer(bufferType, null)
  },

  makeVAO (gl, attribs) {
      const rtn = {
          vao: gl.createVertexArray(),
          buffers: []
      }

      gl.bindVertexArray(rtn.vao)

      rtn.buffers = attribs.map(attrib => {
          const buffer = this.makeBuffer(gl, attrib)
          if (attrib.bufferType !== gl.ELEMENT_ARRAY_BUFFER) {
              this.bindBuffer(gl, buffer, attrib)
          }
          return buffer
      })

      gl.bindVertexArray(null)
      
      return rtn
  },

  makeTexture (gl, props) {
      const {
          width,
          height,
          image
      } = props

      const texture = gl.createTexture()

      const level          = 0
      const internalFormat = gl.RGBA
      const border         = 0
      const format         = gl.RGBA
      const type           = gl.UNSIGNED_BYTE
      
      gl.bindTexture(gl.TEXTURE_2D, texture)        
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image)
      gl.bindTexture(gl.TEXTURE_2D, null)

      return texture                    
  }

}

// Emoji atlas

class EmojiTexture {
  
  constructor (props) {
      const {
          emojis
      } = props

      this.emojis = emojis

      this.$canvas = document.createElement('canvas')
      this.ctx = this.$canvas.getContext('2d')
      this.cellWidth  = 48
      this.cellHeight = 48

      this.$canvas.width  = this.cellWidth * this.emojis.length
      this.$canvas.height = this.cellHeight

      this.$canvas.style.position = 'fixed'
      this.$canvas.style.top = this.$canvas.style.left = '1rem'
      this.$canvas.style.border = `1px solid rgba(255, 255, 255, 0.12)`
      // document.body.appendChild(this.$canvas)

  }

  getImage () {
      this.emojis.forEach((emoji, i) => {
          const x = i * this.cellWidth + this.cellWidth / 4
          const y = this.cellHeight / 2 + 10
          this.ctx.save()
          this.ctx.translate(x, y)
          this.ctx.scale(3, 3)
          this.ctx.fillText(emoji, 0, 0)
          this.ctx.restore()
      })
      return this.ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height)
  }

}

// Particles

class Particles {
  constructor (gl, props) {
      this.gl = gl
      
      const {
          count,
          emojisCount,
          vertexShaderSource,
          fragmentShaderSource,
          emojisTexture
      } = props

      this.count = count
      this.emojisTexture = emojisTexture
      this.spacing = 2
      this.targetSpacing = this.spacing

      setInterval(() => {
          this.targetSpacing = Math.random() * 4
      }, 5000)

      const vertexShader   = utils.makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = utils.makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) 
      this.program = utils.makeProgram(gl, vertexShader, fragmentShader)

      this.uniformLocations = {
          u_time:       gl.getUniformLocation(this.program, 'u_time'),
          u_emojiTex:   gl.getUniformLocation(this.program, 'u_emojiTex'),
          u_emojiCount: gl.getUniformLocation(this.program, 'u_emojiCount'),
          u_spacing:    gl.getUniformLocation(this.program, 'u_spacing')
      }
      this.attribLocations = {
          a_position:       gl.getAttribLocation(this.program, 'a_position'),
          a_targetPosition: gl.getAttribLocation(this.program, 'a_targetPosition'),
          a_time:           gl.getAttribLocation(this.program, 'a_time'),
          a_uvOffsetX:      gl.getAttribLocation(this.program, 'a_uvOffsetX')
      }

      gl.useProgram(this.program)
      gl.uniform1i(this.uniformLocations.u_emojiTex, 0)
      gl.uniform1f(this.uniformLocations.u_emojiCount, emojisCount)
      gl.useProgram(null)

      const vertices = new Float32Array(count * 2)
      const targetPositions = new Float32Array(count * 2)
      const times = new Float32Array(count)
      const uvOffsetsX = new Float32Array(count)

      for (let i = 0; i < count; i += 1) {


          const x = 0
          const y = 0

          vertices[i * 2 + 0] = x
          vertices[i * 2 + 1] = y

          targetPositions[i * 2 + 0] = (Math.random() * 2 - 1) * 2
          targetPositions[i * 2 + 1] = (Math.random() * 2 - 1) * 2

          times[i] = Math.random() * 3

          uvOffsetsX[i] = (1 / emojisCount) * (Math.floor(Math.random() * emojisCount))

      }
      
      const attribs = this.makeAttribs({
          vertices,
          targetPositions,
          times,
          uvOffsetsX
      })

      this.rtn = utils.makeVAO(gl, attribs)

  }

  makeAttribs (props) {
      const {
          vertices,
          targetPositions,
          times,
          uvOffsetsX
      } = props

      return [
          {
              bufferType: gl.ARRAY_BUFFER,
              attribLocation: this.attribLocations.a_position,
              attribType: gl.FLOAT,
              itemsPerVert: 2,
              typedArray: vertices,
              drawType: gl.STATIC_DRAW
          },
          {
              bufferType: gl.ARRAY_BUFFER,
              attribLocation: this.attribLocations.a_targetPosition,
              attribType: gl.FLOAT,
              itemsPerVert: 2,
              typedArray: targetPositions,
              drawType: gl.STATIC_DRAW
          },
          {
              bufferType: gl.ARRAY_BUFFER,
              attribLocation: this.attribLocations.a_time,
              attribType: gl.FLOAT,
              itemsPerVert: 1,
              typedArray: times,
              drawType: gl.STATIC_DRAW
          },

          {
              bufferType: gl.ARRAY_BUFFER,
              attribLocation: this.attribLocations.a_uvOffsetX,
              attribType: gl.FLOAT,
              itemsPerVert: 1,
              typedArray: uvOffsetsX,
              drawType: gl.STATIC_DRAW
          }
      ]
  }

  renderFrame (ts, dt) {

      this.spacing += (this.targetSpacing - this.spacing) * dt

      this.gl.useProgram(this.program)

      this.gl.uniform1f(this.uniformLocations.u_time, ts * 0.25)
      this.gl.uniform1f(this.uniformLocations.u_spacing, this.spacing)
      
      this.gl.activeTexture(this.gl.TEXTURE0)
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.emojisTexture)
      this.gl.bindVertexArray(this.rtn.vao)
      this.gl.drawArrays(0, 0, this.count)
      
      this.gl.bindTexture(this.gl.TEXTURE_2D, null)
      this.gl.bindVertexArray(null)
      this.gl.useProgram(null)

      // debugger
  }

}

let w = window.innerWidth
let h = window.innerHeight

let wdpr = w * (window.devicePixelRatio || 1)
let hdpr = h * (window.devicePixelRatio || 1)

let elapsedTime = 0

const $canvas = document.getElementsByTagName('canvas')[0]
const gl = utils.makeWebGLInstance($canvas)

const emojis = [
  '😋', '📙', '🙌', '🖕', '🇨🇳',
  '🍂', '🇧🇷', '🎂', '💪', '🔥',
  '🏈', '🦃', '⛄', '⚽', '😂',
  '😍', '🤔', '👱‍', '🌈', '❤'
]
const emojisImage = new EmojiTexture({
  emojis
})
const emojisTexture = utils.makeTexture(gl, {
  width:  emojisImage.$canvas.width,
  height: emojisImage.$canvas.height,
  image:  emojisImage.getImage()
})

const particles = new Particles(gl, {
  count: 10000,
  emojisCount: emojis.length,
  vertexShaderSource: document.getElementById('vertex-shader-emojis').textContent,
  fragmentShaderSource: document.getElementById('fragment-shader-emojis').textContent,
  emojisTexture
})

window.onload = init

function init () {
  onResize()
  window.requestAnimationFrame(onRenderFrame)

  window.onresize = onResize
}

function onRenderFrame () {
  window.requestAnimationFrame(onRenderFrame)

  const now = window.performance.now() / 1000
  const dt = now - elapsedTime
  elapsedTime = now

  gl.viewport(0, 0, wdpr, hdpr)
  // gl.clearColor(0.1, 0.1, 0.1, 1.0)
  // gl.clear(gl.COLOR_BUFFER_BIT)

  particles.renderFrame(elapsedTime, dt)

}

function onResize () {
  w = window.innerWidth
  h = window.innerHeight

  wdpr = w * (window.devicePixelRatio || 1)
  hdpr = h * (window.devicePixelRatio || 1)

  $canvas.width = wdpr
  $canvas.height = hdpr
  $canvas.style.width  = `${w}px`
  $canvas.style.height = `${h}px`
}