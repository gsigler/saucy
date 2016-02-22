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
      this.to;
      return this;
  }
}

Saucy.fn = Saucy.prototype;
var select = Saucy;

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
    this.to = to.event;
    return this;
  }

Saucy.fn.detach = function(eventType) {
    this.eventType = eventType;
    this.to = to.event;
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

// Differnet to methods
var to = {};

to.html = function(value) {
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
      return this;
}

to.style = function(value) {
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
    return this;
}

to.event = function(value) {
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
      return this;
}
