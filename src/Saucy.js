function Saucy(item) {
  if (item)
  {
      if (window === this) {
       return new Saucy(item);
      }

      if (item[0] === "#") {
        this.e = document.getElementById(item.replace("#", ""));
        this.c = null;

        if (this.e == null)
          throw new Error("Cannot find id");
      }
      else if (item[0] === ".") {
        this.c = document.getElementsByClassName(item.replace(".", ""));
        this.e = null;

        if (this.c.length == 0)
          throw new Error("Cannot find class");
      }
      else  {
        this.c = document.getElementsByTagName(item);
        this.e = null;

        if (this.c.length == 0)
          throw new Error("Cannot find tag");
      }
      this.toFunction;
      return this;
  }
}

Saucy.fn = Saucy.prototype;
var select = Saucy;

// Prototype functions
Saucy.fn.set = function(selector) {
  if (selector.toLowerCase() === 'html') {
    this.toFunction = setters.htmlSet;
    return this;
  } else if (selector) {
    this.sel = selector;
    this.toFunction = setters.styleSet;
    return this;
  }
  throw new Error("Must have selector value");
}


Saucy.fn.to = function(value) {
  this.toFunction(value);
  return this;
}

Saucy.fn.from = function(value) {
  if (this.e && this.eventType) {
         this.e.removeEventListener(this.eventType, value)
  } else if (this.c && this.eventType) {
       for (var i = 0; i < this.c.length; i++) {
           this.c[i].removeEventListener(this.eventType, value);
       }
  }
  return this;
}

Saucy.fn.attach = function(eventType) {
    this.eventType = eventType;
    this.toFunction = setters.eventSet;
    return this;
  }

Saucy.fn.detach = function(eventType) {
    this.eventType = eventType;
    this.toFunction = setters.eventSet;
    return this;
}

Saucy.fn.at = function(index) {
  if (this.e)
    return this;
  if (this.c && this.c.length > index && this.c.length > 0) {
      this.e = this.c[index];
      this.c = null;
  }
  return this;
}

Saucy.fn.setHtml = function(value) {
    this.set('html').to(value);
    return this;
}

// Helpers
var setters = {};

setters.htmlSet = function(value) {
    if (this.e)
    {
      this.e.innerHTML = value;
    }
    else
    {
      for (var i = 0; i < this.c.length; i++) {
              this.c[i].innerHTML = value;
      }
    }
}

setters.styleSet = function(value) {
    if (this.e)
    {
      this.e.style[this.sel] = value;
    }
    else
    {
      for (var i = 0; i < this.c.length; i++)
      {
          this.c[i].style[this.sel] = value;
      }
    }
}

setters.eventSet = function(value) {
    if (this.e)
    {
      this.e.addEventListener(this.eventType, value)
    }
    else
    {
      for (var i = 0; i < this.c.length; i++) {
          this.c[i].addEventListener(this.eventType, value);
      }
    }
}
