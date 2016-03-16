export default class {
  constructor(actx) {
    this.actx = actx;
  }

  get(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    return new Promise((resolve, reject) => {
      request.onload = (buffer) => {
        this.actx.decodeAudioData(request.response, (buffer) => {
          resolve(buffer);
        });
      };
    });
  }
}
