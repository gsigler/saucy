function Saucy(item) {
  if (item)
  {
      if (window === this) {
       return new Saucy(item);
      }

      if (item[0] === "#") {
        this._e = document.getElementById(item.replace("#", ""));
        // this._c = null;

        if (this._e == null)
          throw new Error("Cannot find id");
      }
      else if (item[0] === ".") {
        this._c = document.getElementsByClassName(item.replace(".", ""));
        // this._e = null;

        if (this._c.length == 0)
          throw new Error("Cannot find class");
      }
      else  {
        this._c = document.querySelectorAll(item);
        // this._e = null;

        if (this._c.length == 0)
          throw new Error("Cannot find tag");
      }
      this.to;
      return this;
  }
}

Saucy.fn = Saucy.prototype;
var select = Saucy;

Saucy.fn.element = function() {
  return this._e;
}

Saucy.fn.list = function() {
  return this._c;
}

// Prototype functions
Saucy.fn.set = function(selector) {
  if (selector.toLowerCase() === 'html') {
    this.to = to.html;
    return this;
  } else if (selector) {
    this.sel = selector;
    this.to = to.style;
    return this;
  }
  throw new Error("Must have selector value");
}

Saucy.fn.hide = function() {
  if (this._e) {
    this._e.style.display = "none";
  }
  else if (this._c){
     for (var i = 0; i < this._c.length; i++) {
       this._c[i].style.display = "none";
     }
  }
}

Saucy.fn.show = function(displayType) {
  if (this._e) {
    if (displayType)
      this._e.style.display = displayType;
    else
      this._e.style.display = "inline"
  }
  else if (this._c){
     for (var i = 0; i < this._c.length; i++) {
       if (displayType)
          this._c[i].style.display = displayType;
      else
        this._c[i].style.display = "inline";
     }
  }
}

Saucy.fn.from = function(value) {
  if (this._e && this.eventType) {
         this._e.removeEventListener(this.eventType, value)
  } else if (this._c && this.eventType) {
       for (var i = 0; i < this._c.length; i++) {
           this._c[i].removeEventListener(this.eventType, value);
       }
  }
  return this;
}

Saucy.fn.attach = function(eventType) {
    this.eventType = eventType;
    this.to = to.event;
    return this;
  }

Saucy.fn.detach = function(eventType) {
    this.eventType = eventType;
    this.to = to.event;
    return this;
}

Saucy.fn.at = function(index) {
  if (this._e)
    return this;
  if (this._c && this._c.length > index && this._c.length > 0) {
      this._e = this._c[index];
      this._c = null;
  }
  return this;
}

Saucy.fn.setHtml = function(value) {
    this.set('html').to(value);
    return this;
}

// Differnet to methods
var to = {};

to.html = function(value) {
    if (this._e)
    {
      this._e.innerHTML = value;
    }
    else
    {
      for (var i = 0; i < this._c.length; i++) {
              this._c[i].innerHTML = value;
      }
    }
      return this;
}

to.style = function(value) {
    if (this._e)
    {
      this._e.style[this.sel] = value;
    }
    else
    {
      for (var i = 0; i < this._c.length; i++)
      {
          this._c[i].style[this.sel] = value;
      }
    }
    return this;
}

to.event = function(value) {
    if (this._e)
    {
      this._e.addEventListener(this.eventType, value)
    }
    else
    {
      for (var i = 0; i < this._c.length; i++) {
          this._c[i].addEventListener(this.eventType, value);
      }
    }
      return this;
}
