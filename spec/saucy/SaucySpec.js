
describe("Saucy", function() {

    beforeEach(function(){
      this.paragraph = addElementToBody('p', 'ParagraphId','ParagraphClass', 'Test Paragraph');
      this.div = addElementToBody('div', 'DivId', 'DivClass', 'Test Div');
    });

    afterEach(function()  {
        document.body = document.createElement("body");
    });

    describe("Saucy HTML properties", function() {
        it("select, choose or Saucy can be used to call the function", function() {
           expect(select).toBeDefined();
           expect(Saucy).toBeDefined();
        });

        it("can select an element by an id", function() {
          expect(select('#ParagraphId')).toBeDefined();
          expect(select('#ParagraphId').element()).toEqual(document.getElementById('ParagraphId'));
          expect(function() {select("#notid")}).toThrowError("Cannot find id");
        });

        it("can select an element by a class", function() {
          expect(select('.ParagraphClass')).toBeDefined();
          expect(select('.ParagraphClass').list()).toEqual(document.getElementsByClassName('ParagraphClass'));
          expect(function() {select(".notclass")}).toThrowError("Cannot find class");
        });

        it("can select an element by tag", function() {
          expect(select('p')).toBeDefined();
          expect(select('p').list()).toEqual(document.getElementsByTagName('p'));
          expect(function() {select("nottag")}).toThrowError("Cannot find tag");
        });

        it("can select an element by selector", function() {
          expect(select('p.ParagraphClass')).toBeDefined();
          expect(select('p.ParagraphClass').list()).toEqual(document.querySelectorAll('p.ParagraphClass'));

        });


        it("can set css properties for id's, classes or tags", function() {
          select('#ParagraphId').set('color').to('green');
          expect(this.paragraph.style.color).toEqual("green");

          select('#DivId').set('width').to('1000px');
          expect(this.div.style.width).toEqual("1000px");

          select('.AllItemsClass').set('display').to('none');
          expect(this.div.style.display).toEqual("none");
          expect(this.paragraph.style.display).toEqual("none");

          select('p').set('font-size').to('100px');
          expect(this.paragraph.style.fontSize).toEqual("100px");
        });

        it("can change one child element in a class or tag collection", function() {
          select('.AllItemsClass').at(0).set('display').to('none');
          expect(this.paragraph.style.display).toEqual("none");
          expect(this.div.style.display).not.toEqual("none");

          this.paragraph2 = addElementToBody('p', 'ParagraphId','ParagraphClass', 'Test Paragraph');

          select('p').at(1).set('font-size').to('100px');
          expect(this.paragraph2.style.fontSize).toEqual("100px");
        });


        it("can change more than one property with one select ", function() {
          select('#ParagraphId')
            .set('color').to('green')
            .set('width').to('100px')
            .set('height').to('105px');

          expect(this.paragraph.style.color).toEqual("green");
          expect(this.paragraph.style.width).toEqual('100px');
          expect(this.paragraph.style.height).toEqual('105px');

        });


        it("can set innerHTML", function() {
          select('#ParagraphId').set('html').to('Content');
          expect(this.paragraph.innerHTML).toEqual("Content");

          var paragraph2 = addElementToBody('p', 'ParagraphId','ParagraphClass', 'Test Paragraph');
          select('.ParagraphClass').setHtml('Change Two');
          expect(this.paragraph.innerHTML).toEqual("Change Two");
          expect(paragraph2.innerHTML).toEqual("Change Two");
        });
    });

    describe("Saucy Events", function() {
        var timesCalled;
        var testEvent;
        beforeEach(function() {
          timesCalled = 0;
          testEvent = function() {
              timesCalled++;
          }
          expect(timesCalled).toEqual(0);
          this.paragraph.click();
          expect(timesCalled).toEqual(0);

        });
        afterEach(function() {
          timesCalled = 0;
        });

        it("can attach elements to dom events", function() {
            select('p').attach('click').to(testEvent);
            this.paragraph.click();
            expect(timesCalled).toEqual(1);

            select('p').attach('mousedown').to(testEvent);
            var event = new Event('mousedown');
            this.paragraph.dispatchEvent(event);
            expect(timesCalled).toEqual(2);
        });

        it("can detatch elements from dom events", function() {
            select('p').attach('click').to(testEvent);
            this.paragraph.click();
            expect(timesCalled).toEqual(1);

            select('p').detach('click').from(testEvent);
            this.paragraph.click();
            expect(timesCalled).toEqual(1);
        });

    });


      describe("Saucy Helper Methods", function() {
        it("can hide elements", function() {

          select('p').hide();
          expect(this.paragraph.style.display).toEqual('none');

          select("#DivId").hide();
          expect(this.div.style.display).toEqual('none');

        });

        it("can show elements", function() {
            this.paragraph.style.display = "none";
            expect(this.paragraph.style.display).toEqual('none');
            select('#ParagraphId').show();
            expect(this.paragraph.style.display).toEqual('inline');
            select('#ParagraphId').show('table');
              expect(this.paragraph.style.display).toEqual('table');
        });

        xit("can append elements", function() {

        });

        xit("can prepend elements", function() {

        });
      });

    function addElementToBody(elm, id, c, html) {
      var item = document.createElement(elm);
      item.innerHTML = html;
      item.classList.add('AllItemsClass');
      item.classList.add(c);
      item.id = id;
      document.body.appendChild(item);
      return item;
    }

});
