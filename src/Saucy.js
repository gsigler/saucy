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
      return this;
  }
}

Saucy.fn = Saucy.prototype;
var select = Saucy;



Saucy.fn.set = function(selector) {
  if (selector.toLowerCase() === 'html') {
    this.html = true;
    this.sel = null;
    return this;
  } else if (selector) {
    this.sel = selector;
    this.html = null;
    return this;
  }
  throw new Error("Must have selector value");
}

Saucy.fn.to = function(value) {
  if (this.e) {
      if (this.sel){
        this.e.style[this.sel] = value;
      }
      else if (this.eventType) {
        this.e.addEventListener(this.eventType, value)
      } else if (this.html) {
          this.e.innerHTML = value;
      }
    } else if (this.c) {
      if (this.sel){
        for (var i = 0; i < this.c.length; i++) {
            this.c[i].style[this.sel] = value;
        }
      } else if (this.eventType) {
        for (var i = 0; i < this.c.length; i++) {
            this.c[i].addEventListener(this.eventType, value);
        }
      } else if (this.html) {
        for (var i = 0; i < this.c.length; i++) {
            this.c[i].innerHTML = value;
        }
      }
    }
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
    return this;
  }

Saucy.fn.detach = function(eventType) {
    this.eventType = eventType;
    return this;
}

Saucy.fn.at = function(index) {
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
