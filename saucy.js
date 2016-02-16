function select(item) {
  if (item)
  {
      if (window === this) {
       return new select(item);
      }

      if (item[0] === "#") {
        this.e = document.getElementById(item.replace("#", ""));
        this.c = null;

        if (this.e == null)
          throw "Cannot Find ID";
      }
      else if (item[0] === ".") {
        this.c = document.getElementsByClassName(item.replace(".", ""));
        this.e = null;

        if (this.c.length == 0)
          throw "Cannot Find Class";
      }
      else  {
        this.c = document.getElementsByTagName(item);
        this.e = null;

        if (this.c.length == 0)
          throw "Cannot Find Tag";
      }
      return this;
  }
}

select.prototype = {
  set: function(selector) {
    if (selector)
    {
      this.sel = selector;
      return this;
    }
      throw "Must have selector value";
  },
  to: function(value) {
    if (this.e) {
      if (this.sel){
        this.e.style[this.sel] = value;
      }
      else if (this.eventType) {
        this.e.addEventListener(this.eventType, value)
      }
    } else if (this.c) {
      if (this.sel){
        for (var i = 0; i < this.c.length; i++)
        {
            this.c[i].style[this.sel] = value;
        }
      }
      else if (this.eventType) {
        for (var i = 0; i < this.c.length; i++)
        {
            this.c[i].addEventListener(this.eventType, value);
        }
      }
    }
    return this;
  },
  from: function(value) {
    if (this.e && this.eventType) {
        this.e.removeEventListener(this.eventType, value)
    } else if (this.c && this.eventType) {
      for (var i = 0; i < this.c.length; i++)
      {
          this.c[i].removeEventListener(this.eventType, value);
      }
    }

    return this;
  },
  attach: function(eventType) {
    this.eventType = eventType;
    return this;
  },
  detach: function(eventType) {
    this.eventType = eventType;
    return this;
  },
  at : function(index) {
    if (this.c && this.c.length > index && this.c.length > 0) {
        this.e = this.c[index];
        this.c = null;
    }
    return this;
  }

}
