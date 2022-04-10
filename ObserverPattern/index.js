function Click() {
  this.handlers = [];
}

Click.prototype = {
  subsctibe: function (fn) {
    this.handlers.push(fn)
  },

  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter((item) => item !== fn && item);
  },

  fire: function (o, thisObj) {
    var scope = thisObj || global;
    this.handlers.forEach(function (item) { item.call(scope, o) });
  }
}

let clickHandler = (item) => console.log("fired " + item);
let clickHandler2 = (item) => console.log("fired2 " + item);
let click = new Click()
click.subsctibe(clickHandler);
click.subsctibe(clickHandler2);
click.fire('event #1');