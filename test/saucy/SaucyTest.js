
describe("Saucy", function() {
    beforeEach(function(){
      this.paragraph = document.createElement('p');
      this.paragraph.innerHTML = "Test Paragraph";
      this.paragraph.classList.add('ParagraphClass');
      this.paragraph.classList.add('AllItemsClass');
      this.paragraph.id = 'ParagraphId';
      document.body.appendChild(this.paragraph);

      this.div = document.createElement('div');
      this.div.innerHTML = "Test Div";
      this.div.classList.add('DivClass');
      this.div.classList.add('AllItemsClass');
      this.div.id = 'DivId';
      document.body.appendChild(this.div);
    });

    afterEach(function()  {
        document.body = document.createElement("body");
    });

    it("is defined in the scope of the tests", function() {
       expect(select).toBeDefined();
    });

    xit("tests have all needed html", function() {
       expect(document.getElementById('ParagraphId')).not.toBeNull();
       expect(document.getElementsByClassName('ParagraphClass').length).not.toBe(0);
       expect(document.getElementsByTagName('p').length).not.toBe(0);
       expect(document.getElementsByTagName('div').length).toBe(0);
    });

    it("can select an element by an id", function() {
      expect(select('#ParagraphId')).toBeDefined();
      expect(select('#ParagraphId').e).toEqual(document.getElementById('ParagraphId'));
      expect(function() {select("#notid")}).toThrowError("Cannot find id");
    });

    it("can select an element by a class", function() {
      expect(select('.ParagraphClass')).toBeDefined();
      expect(select('.ParagraphClass').c).toEqual(document.getElementsByClassName('ParagraphClass'));
      expect(function() {select(".notclass")}).toThrowError("Cannot find class");
    });

    it("can select an element by tag", function() {
      expect(select('p')).toBeDefined();
      expect(select('p').c).toEqual(document.getElementsByTagName('p'));
      expect(function() {select("nottag")}).toThrowError("Cannot find tag");
    });

    it("can set css properties for id's, classes or tags", function() {
      select('#ParagraphId').set('color').to('green');
      expect(this.paragraph.style.color).toEqual("green");

      select('#DivId').set('width').to('1000px');
      expect(this.div.style.width).toEqual("1000px");
    });


});
