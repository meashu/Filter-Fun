//FILTER FUN +  GREEN SCREEN ALGORITHM

//FILTER FUN


var image=null;
var imageRainbow=null;
var bluroutput=null;
function upload()
{ 
  var imgcanvasoriginal=document.getElementById("can")
  var fileinput=document.getElementById("finput")
  image=new SimpleImage(fileinput);
  imageRainbow = new SimpleImage(fileinput);
    bluroutput = new SimpleImage(fileinput);
  image.drawTo(imgcanvasoriginal)
  
}

function MakeRed(){
  for(var pixel of image.values())
    {
      var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if(avg<128)
        {
          pixel.setRed(2*avg);
            pixel.setGreen(0);
           pixel.setBlue(0);
        }
       pixel.setRed(2*255);
            pixel.setGreen(2*avg-255);
           pixel.setBlue(2*avg-255);    
    }
  var imgcanvasgreyScale=document.getElementById("can2")
    image.drawTo(imgcanvasgreyScale)
}
function MakeGrey(){
  for(var pixel of image.values())
    {
      var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
  var imgcanvasgreyScale=document.getElementById("can2")
    image.drawTo(imgcanvasgreyScale)
}

function MakeTeal(){
  for(var pixel of image.values())
    {
      var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      
      var Rc=pixel.getRed();
      var Gc=pixel.getGreen();
      var Bc=pixel.getBlue();
      var R,G,B;
      if(avg<128){
        R=Rc/127.5*avg
        G=Gc/127.5*avg
        B=Bc/127.5*avg
        }else
        {
       R= (2-Rc/127.5)*avg  +2*Rc-255;
          G= (2-Gc/127.5)*avg  +2*Gc-255;
          B= (2-Bc/127.5)*avg  +2*Bc-255;
        }
     
        pixel.setRed(R);
      pixel.setGreen(G);
      pixel.setBlue(B);
    }
  var imgcanvasgreyScale=document.getElementById("can2")
    image.drawTo(imgcanvasgreyScale)
}






function makeRainbow() {
	// Reset Image
	for(var pixel of imageRainbow.values()) {
		var originalPixel = image.getPixel(pixel.getX(), pixel.getY());
		imageRainbow.setPixel(pixel.getX(), pixel.getY(), originalPixel)
	}
	
	// Rainbow Filter
	for(var pixel of imageRainbow.values()) {
		var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
		
		/* ---- Red Strip ----- */
		if(pixel.getY() <= imageRainbow.getHeight() * (1/7)) {
			if(avg < 128) {
				pixel.setRed(2 * avg);
				pixel.setGreen(0);
				pixel.setBlue(0);
			} else {
				pixel.setRed(255);
				pixel.setGreen(avg * 2 - 255);
				pixel.setBlue(avg * 2 - 255);
			}
		}
		
		/* ----- Orange Stripe ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (1/7) && pixel.getY() <= imageRainbow.getHeight() * (2/7)) {
			if(avg < 128) {
				pixel.setRed(2 * avg);
				pixel.setGreen(0.8 * avg);
				pixel.setBlue(0);
			} else {
				pixel.setRed(255);
				pixel.setGreen(1.2 * avg - 51);
				pixel.setBlue(avg * 2 - 255);
			}
		}
		
		/* ----- Yellow Strip ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (2/7) && pixel.getY() <= imageRainbow.getHeight() * (3/7)) {
			if(avg < 128) {
				pixel.setRed(2 * avg);
				pixel.setGreen(2 * avg);
				pixel.setBlue(0);
			} else {
				pixel.setRed(255);
				pixel.setGreen(255);
				pixel.setBlue(avg * 2 - 255);
			}
		}
		
		/* ----- Green Strip ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (3/7) && pixel.getY() <= imageRainbow.getHeight() * (4/7)) {
			if(avg < 128) {
				pixel.setRed(0);
				pixel.setGreen(2 * avg);
				pixel.setBlue(0);
			} else {
				pixel.setRed(avg * 2 - 255);
				pixel.setGreen(255);
				pixel.setBlue(avg * 2 - 255);
			}
		}
		
		/* ----- Blue Strip ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (4/7) && pixel.getY() <= imageRainbow.getHeight() * (5/7)) {
			if(avg < 128) {
				pixel.setRed(0);
				pixel.setGreen(0);
				pixel.setBlue(2 * avg);
			} else {
				pixel.setRed(avg * 2 - 255);
				pixel.setGreen(avg * 2 - 255);
				pixel.setBlue(255);
			}
		}
		
		/* ----- Indigo Strip ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (5/7) && pixel.getY() <= imageRainbow.getHeight() * (6/7)) {
			if(avg < 128) {
				pixel.setRed(0.8 * avg);
				pixel.setGreen(0);
				pixel.setBlue(2 * avg);
			} else {
				pixel.setRed(1.2 * avg - 51);
				pixel.setGreen(avg * 2 - 255);
				pixel.setBlue(255);
			}
		}
		
		/* ----- Violet Strip ----- */
		if(pixel.getY() > imageRainbow.getHeight() * (6/7) && pixel.getY() <= imageRainbow.getHeight() * (7/7)) {
			if(avg < 128) {
				pixel.setRed(1.6 * avg);
				pixel.setGreen(0);
				pixel.setBlue(1.6 * avg);
			} else {
				pixel.setRed(0.4 * avg + 153);
				pixel.setGreen(avg * 2 - 255);
				pixel.setBlue(0.4 * avg + 153);
			}
		}
		
	}
   var canvas=document.getElementById("can2")
   
	imageRainbow.drawTo(canvas);
}


function clearCanvas() {
  doClear(can);
  doClear(can2);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}



function MakeBlur(){
for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(image, x, y, 10);
        bluroutput.setPixel(x, y, other);
    }
    else {
        bluroutput.setPixel(x, y, pixel);
    }
}
   var canvas=document.getElementById("can2")
   
	bluroutput.drawTo(canvas);
}


//GREEN SCREEN ALGORITHM

var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("can");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("can2");
  bgImage.drawTo(bgCanvas);
}

function createComposite() {
  // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      //pixel is green, use background
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      //pixel is not green, use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clearCanvas();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finalImage = createComposite();
  finalImage.drawTo(fgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}










