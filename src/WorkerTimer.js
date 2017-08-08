


var blob = new Blob([
    `onmessage = function(e) { switch (e.data.command) {
    case 'interval:start':
      var intvalId = setInterval(function() {
        postMessage({
          message: 'interval:tick',
          id: e.data.id
        });
      }, e.data.interval);

      postMessage({
        message: 'interval:started',
        id: e.data.id
      });

      break;

    case 'interval:clear':

      postMessage({
        message: 'interval:cleared',
        id: e.data.id
      });

      break;
  }
};`]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);


// var worker = new Worker('.\TimerWorker.js');
export var workerTimer = {
  id: 0,
  callbacks: {},

  setInterval: function(cb, interval, context) {
    this.id++;
    var id = this.id;
    this.callbacks[id] = { fn: cb, context: context };
    worker.postMessage({ command: 'interval:start', interval: interval, id: id });
    return id;
  },

  onMessage: function(e) {
    switch (e.data.message) {
      case 'interval:tick':
        var callback = this.callbacks[e.data.id];
        if (callback && callback.fn) callback.fn.apply(callback.context);
        break;
      case 'interval:cleared':
        delete this.callbacks[e.data.id];
        break;
    }
  },

  clearInterval: function(id) {
    worker.postMessage({ command: 'interval:clear', id: id });
  }
};

worker.onmessage = workerTimer.onMessage.bind(workerTimer);