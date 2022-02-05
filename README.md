- [OOP](#oop)
  - [Introduction](#introduction)
    - [Ways to write object](#ways-to-write-object)
    - [Accessing Properties](#accessing-properties)
  - [Create and Modify Properties](#create-and-modify-properties)
    - [Creating Objects](#creating-objects)
    - [Update Properties](#update-properties)
    - [Adding Properties](#adding-properties)
    - [Removing Properties](#removing-properties)
    - [Passing Arguments](#passing-arguments)
      - [Primitives](#primitives)
      - [Objects](#objects)
  - [Invoking Object Methods](#invoking-object-methods)
    - [A Method Can Access the Object it was Called On](#a-method-can-access-the-object-it-was-called-on)
  - [Beware of Globals](#beware-of-globals)
    - [Method vs Function](#method-vs-function)
    - [window object](#window-object)
    - [Why not globals](#why-not-globals)
    - [Object constructor function methods](#object-constructor-function-methods)
  - [Functions at Runtime](#functions-at-runtime)
    - [Functions are First-Class Functions](#functions-are-first-class-functions)
    - [Methods which take callbacks](#methods-which-take-callbacks)
      - [forEach](#foreach)
      - [map](#map)
      - [filter](#filter)
    - [Scope](#scope)
      - [JS is function scoped](#js-is-function-scoped)
      - [Variable Shadowing](#variable-shadowing)
    - [Closure](#closure)
      - [Garage Collection](#garage-collection)
    - [Function](#function)
      - [Declaration](#declaration)
      - [Expression](#expression)
      - [IIFE](#iife)
  - [Classes and Objects](#classes-and-objects)
    - [Constructor Functions](#constructor-functions)
      - [Constructor Functions: Structure and Syntax](#constructor-functions-structure-and-syntax)
      - [Constructor Functions Can Have Parameters](#constructor-functions-can-have-parameters)
      - [Omitting the `new` Operator](#omitting-the-new-operator)
      - [instanceof and prototype chain](#instanceof-and-prototype-chain)
    - [`this`](#this)
      - [When is this Assigned?**](#when-is-this-assigned)
      - [What Does this Get Set To?](#what-does-this-get-set-to)
  - [OOP Summary](#oop-summary)

## OOP

### Introduction

In JavaScript, an **object** is an **unordered collection of properties**. Each property consists of a **key/value pair**, and can reference either a primitive (e.g., strings, numbers, booleans, etc.) or another object.

#### Ways to write object
The following three objects are equivalent:

```js
const course = { courseId: 711 };  
const course = { 'courseId': 711 };
const course = { "courseId": 711 }; 
```

> In Python `dict` you use quotation marks notation

You'll commonly find quotation marks omitted from property names. Certain situations require them to be included, especially if the property name:
- is a **reserved word** (e.g., `for`, `if`, `let`, `true`, etc.).
- Contains **spaces or special characters** that cannot appear in a variable name

#### Accessing Properties
There are two ways: 
- dot notation 
- square bracket notation

```js
var user = {
    id: 1,
    name: {
        first: "Jess",
        last: "Adams"
    },
    18:true,
    walk: function(){
        console.log("Walking...")
    }
}
```

Possible ways to check if user is 18 or not (all of them return `true`):

```js
user[18]
user['18']
user[`18`]
user["18"]

const age = 18
user[age]
user[`${age}`]
```

### Create and Modify Properties

#### Creating Objects
The following two expressions are equivalent:
- `literal` notation (fast)
- `Object` constructor (slow and verbose)


```js
// Using literal notation:
const myObject = {};

// Using the Object() constructor function:
const myObject = new Object();
```

#### Update Properties
Simply dot notation or bracket notation.

#### Adding Properties

```js
const user = {}
user[18] = true
user.walk = function(steps)
{
    console.log(`Walking ${steps} steps.`)    
}
```

#### Removing Properties

```js
// delete '18' property
delete user[18]
user[18] // undefined
```

#### Passing Arguments


##### Primitives
>  Primitive (e.g., a string, number, boolean, etc.) is immutable and passed by value

**Global variable won't change**
```js
var id = 18;
const increment_id = (id) => {
  // age in this scope is different than that of global scope 
  id += 1;
};

increment_id(id);
console.log(id); // 18
```

```js
var id = 18;
const increment_id = () => {
    var id;
    id += 1;
};

increment_id(id);
console.log(id); // 18
```

**Global variable changes**
```js
var id = 18;
const increment_id = () => {
    id += 1;
};

increment_id(id);
console.log(id); // 19
```

##### Objects

> Objects are mutable and passed by reference

```js
var user = {
  id: 1,
  name: {
    first: "Jess",
    last: "Adams",
  },
  18: true,
  walk: function () {
    console.log("Walking...");
  },
};

const increment_id = (obj) => {
  obj.id += 1;
};
increment_id(user);
console.log(user.id); // 2

```

**Assigning Object**

```js
const new_user = user;
increment_id(new_user);
console.log(user.id); // 2
```

> Since objects are passed by reference, making changes to the copy has a direct effect on the original object.

**Comparing Objects**

```js
const ob_1 = {id:1}
const ob_2 = {id:1}
console.log(ob_1===ob_2) // false

const ob_3 = ob_2
console.log(ob_2===ob_3) // true

```

### Invoking Object Methods

#### A Method Can Access the Object it was Called On

```js
var user = {
  id: 1,
  name: {
    first: "Jess",
    last: "Adams",
  },
  18: true,
  walk: function () {
    console.log(`${this.name.first} Walking...`);
  },
};

user.walk();
// Jess Walking...

```

### Beware of Globals

#### Method vs Function

A function is a piece of code that is called by name. It can be passed data to operate on (i.e. the parameters) and can optionally return data (the return value). All data that is passed to a function is explicitly passed.

A method is a piece of code that is called by a name that is associated with an object. In most respects it is identical to a function except for two key differences:

- A method is implicitly passed the object on which it was called.
- A method is able to operate on data that is contained within the class (remembering that an object is an instance of a class - the class is the definition, the object is an instance of that data).

#### window object
`window` object has access to a ton of information about the page itself. Since the `window` object is at the highest (i.e., global) level, an interesting thing happens with **global variable declarations**. Every variable declaration that is made at the global level (outside of a function) automatically becomes a property on the `window` object!

> any global function declarations are accessible on the window object as methods

> Only declaring variables with the `var` keyword will add them to the `window` object. If you declare a variable outside of a function with either `let` or `const`, it will not be added as a property to the `window` object.

#### Why not globals

global variables and functions are not ideal. There are actually a number of reasons why, but the two we'll look at are:

- Tight coupling
  - In tight coupling, pieces of code are joined together in a way where changing one unintentionally alters the functioning of some other code
- Name collisions
  - A name collision occurs when two (or more) functions depend on a variable with the same name. A major problem with this is that both functions will try to update the variable and or set the variable, but these changes are overridden by each other!

```js

// Correct one
{
  const foo = () => {
    for (let i = 5; i > 0; i--) {
      bar(i);
    }
  };

  const bar = (digit) => {
    for (let i = 0; i < 5; i++) {
      console.log(digit);
    }
  };

  foo();
}

// Name collision happens
{
  const foo = () => {
    for (i = 5; i > 0; i--) {
      bar(i);
    }
  };

  const bar = (digit) => {
    for (i = 0; i < 5; i++) {
      console.log(digit);
    }
  };

  foo();
}

```

#### Object constructor function methods

The Object() constructor function has access to several methods to aid in development. To extract property names and values from an object, we can use:

- `Object.keys()` returns an array of a given object's own keys (property names).
- `Object.values()` returns an array of a given object's own values (property values).

### Functions at Runtime

#### Functions are First-Class Functions
In JavaScript, functions are first-class functions. This means that you can do with a function just about anything that you can do with other elements, such as numbers, strings, objects, arrays, etc. JavaScript functions can:

- Be stored in variables
- Be returned from a function.
- Be passed as arguments into another function.

> Note that while we can, say, treat a function as an object, a key difference between a function and an object is that functions can be called (i.e., invoked with ()), while regular objects cannot.



#### Methods which take callbacks

##### forEach
Array's `forEach()` method takes in a callback function and invokes that function for each element in the array. In other words, `forEach()` allows you to iterate (i.e., loop) through an array, similar to using a `for` loop.


```js
array.forEach(function callback(currentValue, index, array) {
    // function code here
});
```

##### map
Array's `map()` method is similar to `forEach()` in that it invokes a callback function for each element in an array. However, `map()` returns a new array based on what's returned from the callback function.

##### filter

Array's `filter()` method is similar to the `map()` method:

- It is called on an array
- It takes a function as an argument
- It returns a new array
The difference is that the function passed to `filter()` is used as a test, and only items in the array that pass the test are included in the new array.

#### Scope

```js
// global variable
const a = "a";

function parent() {
  // variable from parent scope
  const b = "b";

  function child() {
    // variable from child scope
    const c = "c";
  }
}

```

> The nested `child()` function has access to all `a`, `b`, and `c` variables. That is, these variables are in the `child()` function's scope.


##### JS is function scoped

> Any variables defined inside that function are not available outside of that function. On the other hand, if there are any variables defined inside a block (e.g., within an `if` statement), those variables are available outside of that block.

Because JavaScript is function-scoped, functions have access to all its own variables as well as all the global variables outside of it. For more details on block scoping

> ES6 syntax allows for additional scope while declaring variables with the let and const keywords. These keywords are used to declare block-scoped variables in JavaScript, and largely replace the need for var.


![variable_lookup](snippets/1.png)

##### Variable Shadowing

What happens when you create a variable with the same name as another variable somewhere in the scope chain?

```js
const symbol = '¥';

function displayPrice(price) {
  const symbol = '$';
  console.log(symbol + price);
}

displayPrice('80');
// '$80'
```

#### Closure

dentifier lookup and the scope chain are really powerful tools for a function to access identifiers in the code. In fact, this lets you do something really interesting: create a function now, package it up with some variables, and save it to run later. If you have five buttons on the screen, you could write five different click handler functions, or you could use the same code five times with different saved values.

> "closure is the combination of a function and the lexical environment within which that function was declared."
In this case, the "lexical environment" refers the code as it was written in the JavaScript file. As such, a closure is:

- The function itself, and
- The code (but more importantly, the scope chain of) where the function is declared

Every time a function is defined, closure is created for that function. Strictly speaking, then, every function has closure! This is because functions close over at least one other context along the scope chain: the global scope. However, the capabilities of closures really shine when working with a nested function (i.e., a function defined within another function).

Recall that a nested function has access to variables outside of it. From what we have learned about the scope chain, this includes the variables from the outer, enclosing function itself (i.e., the parent function)! These nested functions close over (i.e., capture) variables that aren't passed in as arguments nor defined locally, otherwise known as `free variables`.

**Applications of Closures**    
To recap, we've seen two common and powerful applications of closures:

- Passing arguments implicitly.
- At function declaration, storing a snapshot of scope.

##### Garage Collection

JavaScript manages memory with automatic garbage collection. This means that when data is no longer referable (i.e., there are no remaining references to that data available for executable code), it is "garbage collected" and will be destroyed at some later point in time. This frees up the resources (i.e., computer memory) that the data had once consumed, making those resources available for re-use.

Let's look at garbage collection in the context of closures. We know that the variables of a parent function are accessible to the nested, inner function. If the nested function captures and uses its parent's variables (or variables along the scope chain, such as its parent's parent's variables), those variables will stay in memory as long as the functions that utilize them can still be referenced.

#### Function

##### Declaration

A function declaration defines a function and does not require a variable to be assigned to it. It simply declares a function, and doesn't itself return a value.

```js
function returnHello() {
  return 'Hello!';
}
```

##### Expression
Function expression does return a value. Function expressions can be anonymous or named, and are part of another expression's syntax. They're commonly assigned to variables, as well. 

```js
// anonymous
const myFunction = function () {
  return 'Hello!';
};

// named
const myFunction = function returnHello() {
  return 'Hello!';
};
```

##### IIFE

**Function declaration**

```js
function sayHi()
{
 alert('Hi there!');
}
```

**Function expression (Anonymous)**

```js
(function sayHi()
{
 alert('Hi there!');
})
```

Function call
```js
(function sayHi()
{
 alert('Hi there!');
})()
```

**Passing Arguments to IIFE**

```js
(function (x, y){
    console.log(x * y);
  }
)(2, 3);

// 6
```

**IIFE and private scope**    
One of the primary uses for IIFE's is to create private scope (i.e., private state). Recall that variables in JavaScript are traditionally scoped to a function. Knowing this, we can leverage the behavior of closures to protect variables or methods from being accessed! Consider the following example of a simple closure within an IIFE, referenced by myFunction:

```js
const myFunction = (
  function () {
    const hi = 'Hi!';
    return function () {
      console.log(hi);
    }
  }
)();
```

**Alternative syntax for IIFE**    
```js
(function sayHi(){
   alert('Hi there!');
 }
)();

// alerts 'Hi there!'
```

```js
(function sayHi(){
   alert('Hi there!');
}());

// alerts 'Hi there!'
```

### Classes and Objects

#### Constructor Functions
We have created objects using the object literal notation. Likewise, we can even write functions that return objects. There is yet another way for us to create objects, and it is the foundation of object-oriented JavaScript: the **constructor function**. 

To instantiate (i.e., create) a new object, we use the `new` operator to invoke the function:

```js
new SoftwareDeveloper();
```

The first thing to note above is the use of the `new` keyword. Second, note that the name of the constructor function, `SoftwareDeveloper()`, is written with the first letter capitalized to visually distinguish it from a regular function.

Keep in mind that even though the function's name starts with a capital, that doesn't automatically make this a constructor function (i.e., though developers name constructor functions in CamelCase by convention, it is not enforced by the language). What does make `SoftwareDeveloper()` a constructor function are:

- The use of the `new` operator to invoke the function
- How the function is coded internally (which we'll look at right now!)

##### Constructor Functions: Structure and Syntax
```js
function SoftwareDeveloper() {
  this.favoriteLanguage = 'JavaScript';
}
```

> One last thing that might seem unusual is that this function doesn't seem to return anything! Constructor functions in JavaScript should not have an explicit return value (i.e., there should not be return statement).

##### Constructor Functions Can Have Parameters
```js
function SoftwareDeveloper(name) {
  this.favoriteLanguage = 'JavaScript';
  this.name = name;
}
```

##### Omitting the `new` Operator

```js
function SoftwareDeveloper(name) {
   this.favoriteLanguage = 'JavaScript';
   this.name = name;
}

let coder = SoftwareDeveloper('David');

console.log(coder);
// undefined
```

##### instanceof and prototype chain

`instanceof` confirms that a specific constructor function did in fact create a specific object.

Many times, however, it's a bit more complex: the `instanceof` operator actually tests whether or not that constructor appears in the `prototype chain` of an object. This means that we can't always check exactly which constructor created that object, but it does give us insight as to what other properties and methods an object may have access to.


#### `this`


##### When is this Assigned?**
A common misconception is that this refers to the object where it is defined. This is not the case!

The value of this is actually not assigned to anything until an object calls the method where this is used. In other words, the value assigned to this is based on the object that invokes the method where this is defined. Let's look at an example:

```js
const dog = {
  bark: function () {
    console.log('Woof!');
  },
  barkTwice: function () {
    this.bark();
    this.bark();
  }
};
```

```js
dog.bark();
// Woof!

dog.barkTwice();
// Woof!
// Woof!
```

```js
dog.barkTwice();
// Woof!
// Woof!

dog.bark();
// Woof!

```
##### What Does this Get Set To?


At this point, we've seen `this` in many different contexts, such as within a method, or referenced by a constructor function. Let's now organize our thoughts and bring it all together!

There are four ways to call functions, and each way sets `this` differently.

First, calling a constructor function with the new keyword sets `this` to a newly-created object. Recall that creating an instance of `Cat` earlier had set `this` to the new `bailey` object.

On the other hand, calling a function that belongs to an object (i.e., a method) sets `this` to the object itself. Recall that earlier, the `dog` object's `barkTwice()` method was able to access properties of `dog` itself.

Third, calling a function on its own (i.e., simply invoking a regular function) will set `this` to `window`, which is the global object if the host environment is the browser.

The fourth way to call functions allows us to set this ourselves! 

> If a constructor function is called with the `new` operator, the value of `this` is set to the newly-created object. If a method is invoked on an object, `this` is set to that object itself. And if a function is simply invoked, `this` is set to the global object: `window`.



### OOP Summary
- Data within objects are mutable.
- In JavaScript, a primitive (e.g., a string, number, boolean, etc.) is immutable and passes by value.
- Objects are passed by reference.