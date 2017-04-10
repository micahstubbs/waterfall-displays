
    // get the context from the canvas to draw on
    canvasElement = document.getElementById("canvas");
    ctx = canvasElement.getContext("2d");

    // create a temporary canvas to use for copying
    var tempCanvas = document.createElement("canvas"),
        tempCtx = tempCanvas.getContext("2d");
    var timer;
    tempCanvas.width=512;
    tempCanvas.height=800;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var analyser = context.createAnalyser();

    // used for color distribution
    var hot = new chroma.ColorScale({
        colors: [ '#000000', '#0B16B5', '#FFF782', '#EB1250' ],
        positions: [ 0, 0.4, 0.68, 0.85 ],
        mode:'rgb',
        limits:[0, 300]   
    });

    navigator.webkitGetUserMedia({ audio: true }, function (stream) {
        var source = context.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(context.destination);

        setInterval(function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);

            // draw the spectrogram
            drawSpectrogram(array);

        }, 10);
                    
    }, function () { });    

    // array is an array of 512 numbers
    function drawSpectrogram(array) {

        // copy the current canvas onto the temp canvas
        var canvas = document.getElementById("canvas");

        // Position the image on the canvas, and specify width and 
        //height of the image context.drawImage(img,x,y,width,height);
        tempCtx.drawImage(canvas, 0, 0, 512, 800);

        // iterate over the elements from the array
        for (var i = 0; i < array.length; i++) {
            // draw each pixel with the specific color
            var value = array[i];
            ctx.fillStyle = hot.getColor(value).hex();

            // draw the line at the bottom of the canvas
            // context.fillRect(x,y,width,height);
            ctx.fillRect( i, 0, 1, 1);
        }

        // set translate on the canvas: context.translate(x,y);
        ctx.translate(0, 1);
        // draw the copied image
        // context.drawImage(img,x,y,width,height);
        ctx.drawImage(tempCanvas, 0, 0, 512, 800, 0, 0, 512, 800);

        // reset the transformation matrix
        // context.setTransform(a,b,c,d,e,f);
        // a  Horizontal scaling
        // b  Horizontal skewing
        // c  Vertical skewing
        // d  Vertical scaling
        // e  Horizontal moving
        // f  Vertical moving       
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }
