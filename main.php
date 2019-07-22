<!DOCTYPE html>
<html lang="th">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>TGrimr</title>
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-colorpicker.min.css" rel="stylesheet">
    <link href="fonts/face.css" rel="stylesheet">
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/sticky-footer-navbar.css" rel="stylesheet">
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="js/ie-emulation-modes-warning.js"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="main.php">TGrimr</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="main.php">หน้าหลัก</a></li>

          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <!-- Begin page content -->
    <div class="container">

      <div class="row">
        <div class="col-lg-6 col-md-7 text-center">
          <canvas id="c" width="500" height="500"></canvas>
          <br />
        </div>
        <div class="col-lg-6 col-md-5">

          <div class="row">
            <div class="col-sm-12">
              <a href="main.php#" class="btn btn-default" id="cp7">เลือกสีพื้นหลัง</a>
              <div class="clear">&nbsp;</div>
            </div>
            <div class="col-sm-12">
              <div class="choose-image">
                 <img src="img/bg/1.png" alt="กำลังทำ">
                 <img src="img/bg/2.png" alt="กำลังทำ">
                 <img src="img/bg/3.png" alt="กำลังทำ">
                 <img src="img/bg/4.png" alt="กำลังทำ">
                 <img src="img/bg/5.png" alt="กำลังทำ">
                 <img src="img/bg/6.png" alt="กำลังทำ">
                 <img src="img/bg/7.png" alt="กำลังทำ">
                 <img src="img/bg/8.png" alt="กำลังทำ">
                 <img src="img/bg/9.png" alt="กำลังทำ">
                 <img src="img/bg/10.png" alt="กำลังทำ">
                 <img src="img/bg/11.png" alt="กำลังทำ">
                 <img src="img/bg/12.png" alt="กำลังทำ">
                 <img src="img/bg/13.png" alt="กำลังทำ">
                 <img src="img/bg/14.png" alt="กำลังทำ">
                 <img src="img/bg/15.png" alt="กำลังทำ">
                 <img src="img/bg/16.png" alt="กำลังทำ">
     					</div>
              <div style="clear:both;">&nbsp;</div>
              <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <label for="bg_upload">อัพโหลดพื้นหลัง
                    <input type="file" id="bg_upload" class="custom-file-upload">
                  </label>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <label for="bg_opacity">ความคมชัดภาพพื้นหลัง
                    <input type="range" id="bg_opacity" value="30" min="0" max="30">
                  </label>
                </div>
              </div>
              <div style="clear:both;">&nbsp;</div>

              <div class="row">
                <div class="col-sm-12 text-center">
                  <a href="javascript:;" id="addtext" class="btn btn-sm btn-danger">ใส่ข้อความ</a>
                  <a href="javascript:;" id="addsticker" class="btn btn-sm btn-danger">ใส่สติ๊กเกอร์</a>
                </div>
              </div>

            </div>
          </div>

          <hr />

          <div class="row" id="text_detail" style="display:none;">
            <div class="col-sm-6">
                <label for="quote_text">แก้ไขข้อความ</label>
                <textarea class="form-control input-sm" id="quote_text" rows="5" placeholder="ใส่ข้อความที่นี่">ข้อความของคุณ</textarea>

            </div>
            <div class="col-sm-6">
                <div class="form-group">
                  <label for="cp8">เลือกสีข้อความ</label>
                  <div id="cp8" class="input-group colorpicker-component">
                     <input type="text" value="#656565" class="form-control input-sm" />
                     <span class="input-group-addon"><i></i></span>
                  </div>
                </div>

                <div class="form-group">
                  <div class="dropdown">
                    <button class="btn btn-default btn-block dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      เลือกแบบตัวอักษร
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li><a href="javascript:;" class="custom-font" id="layiji_mahaniyom_bao_12Rg" style="font-family: layiji_mahaniyom_bao_12Rg;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="asg_matrathan_lightregular" style="font-family: asg_matrathan_lightregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="bangna_newregular" style="font-family: bangna_newregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="boontook_ultraultra" style="font-family: boontook_ultraultra;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="cs_prajadregular" style="font-family: cs_prajadregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="cs_prakasregular" style="font-family: cs_prakasregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="cs_cheangkhanregular" style="font-family: cs_cheangkhanregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="cs_chatthaiuiregular" style="font-family: cs_chatthaiuiregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="kruengprungregular" style="font-family: kruengprungregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="layiji_ruduuronregular" style="font-family: layiji_ruduuronregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="quarklight" style="font-family: quarklight;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="rte_mehuaregular" style="font-family: rte_mehuaregular;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="thaisans_neuesemi_bold" style="font-family: thaisans_neuesemi_bold;">ป่วยจิต | TGrimr</a></li>
                      <li><a href="javascript:;" class="custom-font" id="waffle_regularregular" style="font-family: waffle_regularregular;">ป่วยจิต | TGrimr</a></li>
                    </ul>

					<label for="fontsize">ขนาดอักษร</label>
				 	<input type="range" id="fontsize" value="40" min="10" max="80">

                  </div>
                </div>

            </div>
          </div>

          <div class="row" id="image_detail" style="display:none;">
            <div class="col-sm-8">
              <label for="emoji">สติ๊กเกอร์/รูปประกอบ</label>
              <div id="emoji" class="choose-image-pic">
			  <img src="img/sticker/1.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/2.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/3.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/4.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/5.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/6.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/7.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/8.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/9.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/10.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/11.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/12.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/13.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/14.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/15.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/16.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/17.png" alt="กำลังทำ" class="img-rounded">
        <img src="img/sticker/18.png" alt="กำลังทำ" class="img-rounded">
			 </div>
              <label for="upload_image">เพิ่มรูปภาพเอง
  	 						<input type="file" name="upload_image" id="upload_image" class="custom-file-upload">
  	 					</label>
            </div>
            <div class="col-sm-4">
              <div id="img_tools" style="display:none;">

                <label for="img_opacity">ความชัดเจน</label>
				 			  <input type="range" id="img_opacity" value="30" min="0" max="30">

              </div>
            </div>
          </div>
		<div style="clear:both;">&nbsp;</div>
          <div class="text-center"><a href="main.php#" class="save btn btn-lg btn-success">ดาวน์โหลด</a></div>

        </div> <!-- row -->
      </div>

	<hr />




	<div style="clear:both;">&nbsp;</div>
    </div>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">&copy; 2019 TGrimr</p>
      </div>
    </footer>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bootstrap-colorpicker.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/ie10-viewport-bug-workaround.js"></script>
    <script src="js/fabric.min.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>
