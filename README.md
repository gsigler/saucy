# saucy
Saucy is a JavaScript library to manipulate the DOM.

It uses expressive language to make your code more readable.

#### Before Saucy
``` JavaScript
document.getElementById('id').style.color = "green";
document.getElementById('id').addEventListener("click",foo);
```

#### After Saucy
``` JavaScript
select('#id').set('color').to("green");
select('#id').attach('click').to(foo);

select('#id')
  .set('color').to("green")
  .set('width').to("100px")
  .set('height').to("100px")
  .attach('click').to(foo);

```


 
