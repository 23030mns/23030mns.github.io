// Develop By Worapat Ketteng [worapat.com]
$(function() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var canvas = new fabric.Canvas('myCanvas');

    document.getElementById('imageLoader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                // var winWidthPercent = (window.innerWidth / 100) * 90;
                // if (winWidthPercent > 1024) {
                //     var winWidth = 1024;
                // } else {
                //     var winWidth = winWidthPercent;
                // }

                // if (imgObj.width > winWidth) {
                //     var cWidth = winWidth;
                //     var cHeight = winWidth / (imgObj.width / imgObj.height);
                // } else {
                //     var cWidth = imgObj.width;
                //     var cHeight = imgObj.height;
                // }

                if (imgObj.width > 1024) {
                    var cWidth = 1024;
                    var cHeight = 1024 / (imgObj.width / imgObj.height);
                } else {
                    var cWidth = imgObj.width;
                    var cHeight = imgObj.height;
                }

                // if(cWidth > 600){
                //     $('#main').css("width",cWidth + "px");
                // }

                if (cWidth > window.innerWidth) {
                    calScale = (window.innerWidth - 30) / cWidth;
                    $('.canvas-container').css("-webkit-transform", "scale(" + calScale.toFixed(2) + ")");
                    $('.canvas-container').css("-webkit-transform-origin", "0 0");
                    $('#canvasShow').css("height", cHeight * calScale + "px");
                }

                image.set({
                    angle: 0,
                    padding: 0,
                    cornersize: 0,
                    height: cHeight,
                    width: cWidth,
                });

                $('img#demo').hide();
                $(".btn-file span").text('เลือกรูปภาพใหม่');
                var scrollBottom = $(window).scrollTop() + $(window).height();
                $("html, body").animate({ scrollTop: scrollBottom - 150 }, "slow");
                $('.messages').show();
                $('#canvasShow').show();

                canvas.clear();

                canvas.setHeight(cHeight + 22);
                canvas.setWidth(cWidth);

                canvas.centerObject(image);
                canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
                    originX: 'left',
                    originY: 'bottom',
                    left: 0,
                    top: cHeight
                });

                var dText1 = $("#input1").val();
                dText1Split = karaokeSplit(dText1);
                if (dText1Split[0]) {
                    dText1a = dText1Split[0];
                } else {
                    dText1a = "คารา";
                }
                if (dText1Split[1]) {
                    dText1b = dText1Split[1];
                } else {
                    dText1b = "โอเกะ";
                }

                var dTextSize1 = $('#inputSize1').value;
                var dText2 = $("#input2").val().toUpperCase();

                dText2Split = karaokeSplit(dText2);
                if (dText2Split[0]) {
                    dText2a = dText2Split[0];
                } else {
                    dText2a = "KA-RA";
                }
                if (dText2Split[1]) {
                    dText2b = dText2Split[1];
                } else {
                    dText2b = "-O-KE";
                }

                var dTextSize2 = $('#inputSize2').value;

                var text1a = new fabric.IText(dText1a, {
                    fontSize: 48,
                    fill: '#0205fd',
                    stroke: "#ffffff",
                    strokeWidth: 1,
                    shadow: 'rgba(255,255,255,1) 0 0 3px',
                    fontFamily: 'CSPraKasFD-Bold',
                    fontWeight: 'normal',
                    top: 0,
                    left: 0,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                });

                var text1b = new fabric.IText(dText1b, {
                    fontSize: 48,
                    fill: '#ffffff',
                    stroke: "#2d2d2d",
                    strokeWidth: 1,
                    shadow: 'rgba(0,0,0,1) 0 0 3px',
                    fontFamily: 'CSPraKasFD-Bold',
                    fontWeight: 'normal',
                    top: 0,
                    left: text1a.width,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                });

                var text2a = new fabric.IText(dText2a, {
                    fontSize: 30,
                    fill: '#0205fd',
                    stroke: "#ffffff",
                    strokeWidth: 1,
                    shadow: 'rgba(255,255,255,1) 0 0 3px',
                    fontFamily: 'CSPraKasFD-Bold',
                    fontWeight: 'normal',
                    top: 0,
                    left: 0,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                });

                var text2b = new fabric.IText(dText2b, {
                    fontSize: 30,
                    fill: '#ee6220',
                    stroke: "#2d2d2d",
                    strokeWidth: 1,
                    shadow: 'rgba(0,0,0,1) 0 0 3px',
                    fontFamily: 'CSPraKasFD-Bold',
                    fontWeight: 'normal',
                    top: 0,
                    left: text2a.width,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                });

                var bgText4 = new fabric.Rect({
                    top: canvas.height - 30,
                    left: 0,
                    width: canvas.width,
                    height: 30,
                    fill: '#00000',
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                });
                canvas.add(bgText4);

                if ($("#input3").val()) {
                    var dText3 = $("#input3").val("");
                } else {
                    var dText3 = "#ทรงโจร";
                }

                var text4 = new fabric.IText(dText3, {
                    fontSize: 18,
                    fill: 'rgba(255,255,255,1)',
                    fontFamily: 'CSPraKasFD-Bold',
                    fontWeight: 'normal',
                    originX: 'left',
                    width: canvas.width,
                    top: canvas.height - 5,
                    left: 5,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    editable: false,
                });
                canvas.add(text4);

                if ((canvas.width / 2) < 245) {
                    var checkBGWidth = 245;
                } else {
                    var checkBGWidth = canvas.width / 2;
                }
                var bgText3 = new fabric.Rect({
                    top: canvas.height - 22,
                    left: (canvas.width-checkBGWidth),
                    width: checkBGWidth,
                    height: 22,
                    fill: '#00000',
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                });
                canvas.add(bgText3);

                // var text3 = new fabric.IText('ทำภาพคาราโอเกะที่ WORAPAT.COM/KR', {
                //     fontSize: 12,
                //     fill: 'rgba(255,255,255,1)',
                //     fontFamily: 'CSPraKasFD-Bold',
                //     fontWeight: 'normal',
                //     originX: 'right',
                //     width: canvas.width,
                //     top: canvas.height - 17,
                //     left: canvas.width - 5,
                //     lockMovementX: true,
                //     lockMovementY: true,
                //     lockScalingX: true,
                //     lockScalingY: true,
                //     hasBorders: false,
                //     hasControls: false,
                //     hasRotatingPoint: false,
                //     editable: false,
                // });
                // canvas.add(text3);

                var text1 = new fabric.Group([text1a, text1b], {
                    originX: 'center',
                    top: (canvas.height - ((text1a.height + text2a.height) + 35)),
                    left: (canvas.width / 2),
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                });
                canvas.add(text1);

                var text2 = new fabric.Group([text2a, text2b], {
                    originX: 'center',
                    top: (canvas.height - (text2a.height + 40)),
                    left: (canvas.width / 2),
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                });
                canvas.add(text2);

                canvas.selection = false;
                canvas.allowTouchScrolling = true;
                canvas.renderAll();

                $("#input1,#input2").bind("change paste keyup", function(event, ui) {
                    var valText1 = $("#input1").val();
                    valText1Split = karaokeSplit(valText1);
                    if (valText1Split[0]) {
                        valText1Splita = valText1Split[0];
                    } else {
                        valText1Splita = "";
                    }
                    if (valText1Split[1]) {
                        valText1Splitb = valText1Split[1];
                    } else {
                        valText1Splitb = "";
                    }
                    var valText2 = $("#input2").val().toUpperCase();
                    valText2Split = karaokeSplit(valText2);
                    if (valText2Split[0]) {
                        valText2Splita = valText2Split[0];
                    } else {
                        valText2Splita = "";
                    }
                    if (valText2Split[1]) {
                        valText2Splitb = valText2Split[1];
                    } else {
                        valText2Splitb = "";
                    }

                    text1a.setText(valText1Splita);
                    text1b.setText(valText1Splitb);

                    text2a.setText(valText2Splita);
                    text2b.setText(valText2Splitb);

                    text1a.setLeft(0);
                    text1b.setLeft(text1a.width);
                    text1.setLeft((canvas.width / 2) - ((text1a.width + text1b.width) / 2));


                    text2a.setLeft(0);
                    text2b.setLeft(text2a.width);
                    text2.setLeft((canvas.width / 2) - ((text2a.width + text2b.width) / 2));

                    canvas.renderAll();
                });

                $("#input3").bind("change paste keyup", function(event, ui) {
                    var valText4 = $("#input3").val();
                    text4.setText(valText4);
                    canvas.renderAll();
                });

                $('#inputSize1').on('change', function() {
                    text1a.setFontSize(this.value);
                    text1b.setFontSize(this.value);
                    if (this.value <= 30) {
                        text1a.setStrokeWidth(0.5);
                        text1b.setStrokeWidth(0.5);
                    } else if (this.value >= 60) {
                        text1b.setStrokeWidth(2);
                        text1a.setStrokeWidth(2);
                    } else {
                        text1a.setStrokeWidth(1);
                        text1b.setStrokeWidth(1);
                    }
                    text1a.setLeft(0);
                    text1b.setLeft(text1a.width);
                    text1.setTop((canvas.height - ((text1a.height + text2a.height) + 35)));
                    text2.setTop((canvas.height - (text2a.height + 40)));
                    text1.setLeft((canvas.width / 2) - ((text1a.width + text1b.width) / 2));
                    canvas.renderAll();
                });

                $('#inputSize2').on('change', function() {
                    text2a.setFontSize(this.value);
                    text2b.setFontSize(this.value);
                    if (this.value <= 30) {
                        text2a.setStrokeWidth(0.5);
                        text2b.setStrokeWidth(0.5);
                    } else if (this.value >= 60) {
                        text2b.setStrokeWidth(2);
                        text2a.setStrokeWidth(2);
                    } else {
                        text2a.setStrokeWidth(1);
                        text2b.setStrokeWidth(1);
                    }
                    text2a.setLeft(0);
                    text2b.setLeft(text2a.width);
                    text1.setTop((canvas.height - ((text1a.height + text2a.height) + 35)));
                    text2.setTop((canvas.height - (text2a.height + 40)));
                    text2.setLeft((canvas.width / 2) - ((text2a.width + text2b.width) / 2));
                    canvas.renderAll();
                });

                $("#saveCanvas").click(function() {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    $('#imageShow').fadeIn("fast");
                    $('#agianCanvas').fadeIn("fast");
                    if (isMobile.any()) {
                        var showText = "ทำรูปภาพคาราโอเกะสำเร็จ! กดที่รูปภาพค้างไว้เพื่อบนทึก";
                    } else {
                        var showText = "ทำรูปภาพคาราโอเกะสำเร็จ! คลิกขวาเพื่อบันทึกรูปภาพ";
                    }
                    $('#imageShow').html('<div class="alert alert-success bg-success fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' + showText + '</div><img src="' + canvas.toDataURL('png') + '" style="max-width: 100%;"><br>');
                    $('#canvasShow').fadeOut("slow");
                    $('.messages').fadeOut("slow");
                    $('.btn-file').fadeOut("slow");
                });

                $("#agianCanvas").click(function() {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    $('#imageShow').fadeOut("fast");
                    $('#agianCanvas').fadeOut("fast");
                    $('#canvasShow').fadeIn("slow");
                    $('.messages').fadeIn("slow");
                    $('.btn-file').fadeIn("slow");
                });

            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function karaokeSplit(query) {
        var sp = query.split('\/\/');
        return sp;
    }
});
