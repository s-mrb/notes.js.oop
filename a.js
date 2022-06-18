function invokeTwice(cb) {
  cb();
  cb();
}

const dog = {
 age: 5,
 growOneYear: function () {
   this.age += 1;
 }
};
invokeTwice(function () { 
  dog.growOneYear(); 
});


console.log(dog.age)