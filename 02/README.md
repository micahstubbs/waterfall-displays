an [es2015](https://babeljs.io/learn-es2015/) iteration on the block [Waterfall display from microphone](https://bl.ocks.org/d3noob/6760590814296b89574a8999309204b4) from [@d3noob](https://twitter.com/d3noob)

this iteration also scales the width of the canvas to 960px with some css:

```
#canvas {
  width: 960px; 
  height: auto;
}
```

many thanks to [d3 meetup](https://www.meetup.com/Bay-Area-d3-User-Group/events/238965488/) friend [\_tungs\_](https://twitter.com/_tungs_) for pointing me to the solution!

---

Small side project to play about with the idea of waterfall graphs.
This drew on code from Jos Dirksen's excellent page [here](http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound).

Because it tries to access the microphone you will need to access it using https and to allow the use of the microphone.