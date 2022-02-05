const dog = {
    bark: function () {
      console.log('Woof!');
    },
    barkTwice: function () {
      this.bark();
      this.bark();
    }
  };

  dog.barkTwice()