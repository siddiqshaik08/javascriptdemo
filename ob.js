

/* In JavaScript, most things are objects, from core JavaScript 

features like arrays to the browser APIs built on top of JavaScript.

You can even create your own objects to encapsulate related 

functions and variables into efficient packages and act as 

handy data containers.

 

Objects: An object is a collection of related data and/or

functionality. These usually consist of several variables and

functions which are called properties and methods when they are 

inside objects.

 

We will work with developer tools to test all the coding in console,

examin and watch the css, HTML elements.

 

*/

const person = {

    // name: ["Raj", "Kumar"],

    name:{

        first:"Raj", last:"Kumar", },

    age: 32,

    bio: function () {

    //   console.log(`${this.name.first[0]} ${this.name[1]} is ${this.age} years old.`);

     console.log(`${this.name.first} ${this.name.last} is ${this.age} years old.`);

    },

    introduceSelf: function () {

    //   console.log(`Hi! I'm ${this.name[0]}.`);

      console.log(`Hi! I'm ${this.name.first}.`);

    },

  };

 

  function logProperty(propertyName) {

    console.log(person[propertyName]);

  }

  

  logProperty("name.first");

  // Raj

  logProperty("name.last");

  //Kumar

 

  logProperty("age");

  // 32

 

  //setting values to the person object.

  person.age = 45;

  person["name"]["last"] = "Munna";

 

  // Also we can create new members to the object

  person["eyes"] = "hazel";

  person.greeting = function () {

  console.log("Welcome everybody!");

 };

 

/*One useful aspect of bracket notation is that it can be used to set not only

 member values dynamically, but member names too. Let's say we wanted users to be

  able to store custom value types in their people data, by typing the member name 

  and value into two text inputs. We could get those values like this*/ 

  //const myDataName = nameInput.value;

  //const myDataValue = nameValue.value;

 

  //We could then add this new member name and value to the person object like this:

 // person[myDataName] = myDataValue;

 

 const myDataName = "height";

 const myDataValue = "1.75m";

 person[myDataName] = myDataValue;

 

 /* Constructors:

 Using object literals is fine when you only need to create one object,

 but if you have to create more than one,  We have to write out the same code

 for every object we create, and if we want to change some properties of the object - 

 like adding a height property - then we have to remember to update every object.

 

 There is a way to define the "shape" of an object — the set of methods and the

 properties it can have — and then create as many objects as we like, just updating 

 the values for the properties that are different.

 

 Constructors, by convention, start with a capital letter and are named

  for the type of object they create. */

 

  function Person(name,city) {

    this.name = name;

    this.city= city;

    this.introduceSelf = function () {

      console.log(`Hi! I'm ${this.name} and living in ${this.city}`);

    };

  }

 

  // To call Person() as a construct    or, we use new keyword.

  const salva = new Person("Salva","Vizag");

    salva.name;
    salva.city;

    salva.introduceSelf();

    // "Hi! I'm Salva."

 

    const frankie = new Person("Frankie");

    frankie.name;
    frankie.city;
    frankie.introduceSelf();

    // "Hi! I'm Frankie."

 

   const madhu= new Person("Madhu");

   madhu.introduceSelf();

 

   /* 

   Create a object for Employee with properties firstname,lastname, idno,designation,

    department. Create a function inside it with the empdetails property which will 

    display all the data of the employee. Use text formation to make meaningfull statement

    of the data.

    Use constructor to instantiate 4 employees details.

   */