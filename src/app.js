import AudioResource from './lib/AudioResource';
import Visualizer from './lib/Visualizer';
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    actx = new AudioContext();
let audioResource = new AudioResource(actx),
    visualizer = new Visualizer(ctx);

let width, height,
    getWindowWidth = () => window.innerWidth,
    getWindowHeight = () => window.innerHeight;
let stageUpdate = () => {
  width = getWindowWidth();
  height = getWindowHeight();
  canvas.width = width;
  canvas.height = height;
};
stageUpdate();
window.addEventListener('resize', stageUpdate, false);

audioResource.get('/VHCF8W31KW0C.128.mp3').then((buffer) => {
  let analyser = actx.createAnalyser(),
      source = actx.createBufferSource(),
      bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength);
  analyser.connect(actx.destination);
  source.buffer = buffer;
  source.connect(analyser);
  source.start(0);

  let tick = () => {
    visualizer.renderBackground(0, 0, width, height);
    analyser.getByteTimeDomainData(dataArray);
    for (let i = 0; i < bufferLength; i ++) {
      let v = dataArray[i],
          x = width / bufferLength * i,
          y = v + height / 2 - 256 / 2; // 0 ~ 255
      visualizer.renderArc(x, y, 30, 1);
    }
    requestAnimationFrame(tick);
  };
  tick();
});
