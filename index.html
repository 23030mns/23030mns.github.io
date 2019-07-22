<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>TGrimr</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/index.css" rel="stylesheet">
    <META HTTP-EQUIV="Refresh" CONTENT="5;URL=main.php">
</head>
<body>
<canvas></canvas>


<script type="x-shader/vertex-shader" id="vertex-shader-emojis">#version 300 es
    uniform float u_time;
    uniform float u_spacing;

    in vec2 a_position;
    in vec2 a_targetPosition;
    in float a_uvOffsetX;
    in float a_time;

    out float v_uvOffsetX;

    void main () {
        float currentTime = mod(u_time + a_time, 2.0);
        float rate = clamp(currentTime / 2.0, 0.0, 1.0);

        vec2 position = mix(a_position, a_targetPosition, rate);

        float dist = distance(position, vec2(0.0));

        position.x /= sin(dist + rate) * u_spacing;
        position.y /= cos(dist + rate) * u_spacing;

        position += vec2(sin(u_time), cos(u_time)) * 0.2;

        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = rate * 100.0;

        v_uvOffsetX = a_uvOffsetX;
    }

</script>

<script type="x-shader/fragment-shader" id="fragment-shader-emojis">#version 300 es
    precision highp float;

    uniform sampler2D u_emojiTex;
    uniform float u_emojiCount;
    
    in float v_uvOffsetX;

    out vec4 finalColor;

    void main () {
        vec2 uv = gl_PointCoord;
        vec4 tex = texture(u_emojiTex, uv * vec2(1.0 / u_emojiCount, 1.0) + vec2(v_uvOffsetX, 0.0));
        if (tex.a < 0.5) discard;
        finalColor = tex;
    }

</script>
    <script src="js/index.js"></script>
</body>
</html>