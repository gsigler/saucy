// Select elements by id and change css
select('#para').set("font-size").to("100px");


select('#para2').set("transition").to("color 1s");
select('#para2').set("color").to("Green");

// Select element by id and attach event
select('#para2').attach('click').to(Output);


function Output() {
  // Select element by id and change color
  select('#para2').set("color").to("Yellow");

  console.log("Clicked");
  // Select element by id and remove event listener
  select('#para2').detach('click').from(Output);
}

// Select elements by class
select('.myPara').set("color").to("Green");

// Select elements by tagname
select("p").set("font-family").to("sans-serif");


// Select class and add event listener
select('.myPara').attach('click').to(ParaClass);

function ParaClass() {
  console.log("Click on paragraph class");
}

// Select elements by tagname and add event listner
select('p').attach('click').to(Tag);

function Tag() {
  console.log("Click on p Tag");
}

select('p').at(0).set("font-family").to("Courier");

select('#para2')
  .set('color').to('green')
  .set('width').to('100px')
  .set('height').to('105px');

//select('#para2').setHtml().to('I just changed this!');
select('#para').set('html').to('I just changed this!');
select('#para2').setHtml('I just changed this');
//select('#para2').getHtml();
// select('p').get("font-family");
