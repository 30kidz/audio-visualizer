(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _AudioResource = require('./lib/AudioResource');

var _AudioResource2 = _interopRequireDefault(_AudioResource);

var _Visualizer = require('./lib/Visualizer');

var _Visualizer2 = _interopRequireDefault(_Visualizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    actx = new AudioContext();
var audioResource = new _AudioResource2.default(actx),
    visualizer = new _Visualizer2.default(ctx);

var width = undefined,
    height = undefined,
    getWindowWidth = function getWindowWidth() {
    return window.innerWidth;
},
    getWindowHeight = function getWindowHeight() {
    return window.innerHeight;
};
var stageUpdate = function stageUpdate() {
    width = getWindowWidth();
    height = getWindowHeight();
    canvas.width = width;
    canvas.height = height;
};
stageUpdate();
window.addEventListener('resize', stageUpdate, false);

audioResource.get('/VHCF8W31KW0C.128.mp3').then(function (buffer) {
    var analyser = actx.createAnalyser(),
        source = actx.createBufferSource(),
        bufferLength = analyser.frequencyBinCount,
        dataArray = new Uint8Array(bufferLength);
    analyser.connect(actx.destination);
    source.buffer = buffer;
    source.connect(analyser);
    source.start(0);

    var tick = function tick() {
        visualizer.renderBackground(0, 0, width, height);
        analyser.getByteTimeDomainData(dataArray);
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i],
                x = width / bufferLength * i,
                y = v + height / 2 - 256 / 2; // 0 ~ 255
            visualizer.renderArc(x, y, 30, 1);
        }
        requestAnimationFrame(tick);
    };
    tick();
});

},{"./lib/AudioResource":2,"./lib/Visualizer":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(actx) {
    _classCallCheck(this, _class);

    this.actx = actx;
  }

  _createClass(_class, [{
    key: 'get',
    value: function get(url) {
      var _this = this;

      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.send();
      return new Promise(function (resolve, reject) {
        request.onload = function (buffer) {
          _this.actx.decodeAudioData(request.response, function (buffer) {
            resolve(buffer);
          });
        };
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(actx) {
    _classCallCheck(this, _class);

    this.ctx = actx;
  }

  _createClass(_class, [{
    key: 'getColor',
    value: function getColor() {
      var r = 255 * Math.random() | 0,
          g = 255 * Math.random() | 0,
          b = 255 * Math.random() | 0;
      return [r, g, b];
    }
  }, {
    key: 'getGradient',
    value: function getGradient(x, y, radius, alpha) {
      var g = this.ctx.createRadialGradient(x, y, 0, x, y, radius),
          color = '' + this.getColor().join(',');
      g.addColorStop(0, 'rgba(' + color + ', ' + alpha + ')');
      g.addColorStop(0.5, 'rgba(' + color + ', ' + alpha * 0.2 + ')');
      g.addColorStop(1, 'rgba(' + color + ', 0');
      return g;
    }
  }, {
    key: 'renderArc',
    value: function renderArc(x, y, radius, alpha) {
      radius = radius * Math.random() + 5 | 0;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.getGradient(x, y, radius, alpha);
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground(x, y, width, height) {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.fillStyle = 'rgb(0, 0, 0)';
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.globalCompositeOperation = 'lighter';
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2xpYi9BdWRpb1Jlc291cmNlLmpzIiwic3JjL2xpYi9WaXN1YWxpemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FDRUEsSUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFUO0lBQ0EsTUFBTSxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBTjtJQUNBLE9BQU8sSUFBSSxZQUFKLEVBQVA7QUFDSixJQUFJLGdCQUFnQiw0QkFBa0IsSUFBbEIsQ0FBaEI7SUFDQSxhQUFhLHlCQUFlLEdBQWYsQ0FBYjs7QUFFSixJQUFJLGlCQUFKO0lBQVcsa0JBQVg7SUFDSSxpQkFBaUIsU0FBakIsY0FBaUI7V0FBTSxPQUFPLFVBQVA7Q0FBTjtJQUNqQixrQkFBa0IsU0FBbEIsZUFBa0I7V0FBTSxPQUFPLFdBQVA7Q0FBTjtBQUN0QixJQUFJLGNBQWMsU0FBZCxXQUFjLEdBQU07QUFDdEIsWUFBUSxnQkFBUixDQURzQjtBQUV0QixhQUFTLGlCQUFULENBRnNCO0FBR3RCLFdBQU8sS0FBUCxHQUFlLEtBQWYsQ0FIc0I7QUFJdEIsV0FBTyxNQUFQLEdBQWdCLE1BQWhCLENBSnNCO0NBQU47QUFNbEI7QUFDQSxPQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFdBQWxDLEVBQStDLEtBQS9DOztBQUVBLGNBQWMsR0FBZCxDQUFrQix1QkFBbEIsRUFBMkMsSUFBM0MsQ0FBZ0QsVUFBQyxNQUFELEVBQVk7QUFDMUQsUUFBSSxXQUFXLEtBQUssY0FBTCxFQUFYO1FBQ0EsU0FBUyxLQUFLLGtCQUFMLEVBQVQ7UUFDQSxlQUFlLFNBQVMsaUJBQVQ7UUFDZixZQUFZLElBQUksVUFBSixDQUFlLFlBQWYsQ0FBWixDQUpzRDtBQUsxRCxhQUFTLE9BQVQsQ0FBaUIsS0FBSyxXQUFMLENBQWpC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QXFCLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixNQUF2QixFQUErQixLQUEvQixDQUFyQixDQUg2QjtBQUk3QixXQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixNQUFuQixFQUEyQixDQUEzQixFQUE4QixLQUFLLEVBQUwsR0FBVSxDQUFWLEVBQWEsS0FBM0MsRUFKNkI7QUFLN0IsV0FBSyxHQUFMLENBQVMsSUFBVCxHQUw2Qjs7OztxQ0FRZCxHQUFHLEdBQUcsT0FBTyxRQUFRO0FBQ3BDLFdBQUssR0FBTCxDQUFTLHdCQUFULEdBQW9DLGFBQXBDLENBRG9DO0FBRXBDLFdBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsY0FBckIsQ0FGb0M7QUFHcEMsV0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUF4QixFQUErQixNQUEvQixFQUhvQztBQUlwQyxXQUFLLEdBQUwsQ0FBUyx3QkFBVCxHQUFvQyxTQUFwQyxDQUpvQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXVkaW9SZXNvdXJjZSBmcm9tICcuL2xpYi9BdWRpb1Jlc291cmNlJztcbmltcG9ydCBWaXN1YWxpemVyIGZyb20gJy4vbGliL1Zpc3VhbGl6ZXInO1xubGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSxcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICBhY3R4ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xubGV0IGF1ZGlvUmVzb3VyY2UgPSBuZXcgQXVkaW9SZXNvdXJjZShhY3R4KSxcbiAgICB2aXN1YWxpemVyID0gbmV3IFZpc3VhbGl6ZXIoY3R4KTtcblxubGV0IHdpZHRoLCBoZWlnaHQsXG4gICAgZ2V0V2luZG93V2lkdGggPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICBnZXRXaW5kb3dIZWlnaHQgPSAoKSA9PiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5sZXQgc3RhZ2VVcGRhdGUgPSAoKSA9PiB7XG4gIHdpZHRoID0gZ2V0V2luZG93V2lkdGgoKTtcbiAgaGVpZ2h0ID0gZ2V0V2luZG93SGVpZ2h0KCk7XG4gIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcbnN0YWdlVXBkYXRlKCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhZ2VVcGRhdGUsIGZhbHNlKTtcblxuYXVkaW9SZXNvdXJjZS5nZXQoJy9WSENGOFczMUtXMEMuMTI4Lm1wMycpLnRoZW4oKGJ1ZmZlcikgPT4ge1xuICBsZXQgYW5hbHlzZXIgPSBhY3R4LmNyZWF0ZUFuYWx5c2VyKCksXG4gICAgICBzb3VyY2UgPSBhY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLFxuICAgICAgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQsXG4gICAgICBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuICBhbmFseXNlci5jb25uZWN0KGFjdHguZGVzdGluYXRpb24pO1xuICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICBzb3VyY2UuY29ubmVjdChhbmFseXNlcik7XG4gIHNvdXJjZS5zdGFydCgwKTtcblxuICBsZXQgdGljayA9ICgpID0+IHtcbiAgICB2aXN1YWxpemVyLnJlbmRlckJhY2tncm91bmQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkgKyspIHtcbiAgICAgIGxldCB2ID0gZGF0YUFycmF5W2ldLFxuICAgICAgICAgIHggPSB3aWR0aCAvIGJ1ZmZlckxlbmd0aCAqIGksXG4gICAgICAgICAgeSA9IHYgKyBoZWlnaHQgLyAyIC0gMjU2IC8gMjsgLy8gMCB+IDI1NVxuICAgICAgdmlzdWFsaXplci5yZW5kZXJBcmMoeCwgeSwgMzAsIDEpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gIH07XG4gIHRpY2soKTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhY3R4KSB7XG4gICAgdGhpcy5hY3R4ID0gYWN0eDtcbiAgfVxuXG4gIGdldCh1cmwpIHtcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKGJ1ZmZlcikgPT4ge1xuICAgICAgICB0aGlzLmFjdHguZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIChidWZmZXIpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhY3R4KSB7XG4gICAgdGhpcy5jdHggPSBhY3R4O1xuICB9XG5cbiAgZ2V0Q29sb3IoKSB7XG4gICAgbGV0IHIgPSAyNTUgKiBNYXRoLnJhbmRvbSgpIHwgMCxcbiAgICAgICAgZyA9IDI1NSAqIE1hdGgucmFuZG9tKCkgfCAwLFxuICAgICAgICBiID0gMjU1ICogTWF0aC5yYW5kb20oKSB8IDA7XG4gICAgcmV0dXJuIFtyLCBnLCBiXTtcbiAgfVxuXG4gIGdldEdyYWRpZW50KHgsIHksIHJhZGl1cywgYWxwaGEpIHtcbiAgICBsZXQgZyA9IHRoaXMuY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHgsIHksIDAsIHgsIHksIHJhZGl1cyksXG4gICAgICAgIGNvbG9yID0gYCR7dGhpcy5nZXRDb2xvcigpLmpvaW4oJywnKX1gO1xuICAgIGcuYWRkQ29sb3JTdG9wKDAsIGByZ2JhKCR7Y29sb3J9LCAke2FscGhhfSlgKTtcbiAgICBnLmFkZENvbG9yU3RvcCgwLjUsIGByZ2JhKCR7Y29sb3J9LCAke2FscGhhICogMC4yfSlgKTtcbiAgICBnLmFkZENvbG9yU3RvcCgxLCBgcmdiYSgke2NvbG9yfSwgMGApO1xuICAgIHJldHVybiBnO1xuICB9XG5cbiAgcmVuZGVyQXJjKHgsIHksIHJhZGl1cywgYWxwaGEpIHtcbiAgICByYWRpdXMgPSByYWRpdXMgKiBNYXRoLnJhbmRvbSgpICsgNSB8IDA7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5nZXRHcmFkaWVudCh4LCB5LCByYWRpdXMsIGFscGhhKTtcbiAgICB0aGlzLmN0eC5hcmMoeCwgeSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgfVxuXG4gIHJlbmRlckJhY2tncm91bmQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3JnYigwLCAwLCAwKSc7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInO1xuICB9XG59XG4iXX0=
