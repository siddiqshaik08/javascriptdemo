class car{
    constructor(carname,lyear){
        this.carname=carname;
        this.lyear=lyear;
    }
}
class model extends car{

}
/* Object-oriented programming is about modeling a system as a collection of objects,

where each object represents some particular aspect of the system. Objects contain

both functions (or methods) and data. An object provides a public interface to other

code that wants to use it but maintains its own private, internal state; other parts

  of the system don't have to care about what is going on inside the object.

 

  CLASSES & INSTANCES:

  When we model a problem in terms of objects in OOP, we create abstract definitions

   representing the types of objects we want to have in our system. For example,

  if we were modeling a school, we might want to have objects representing professors.

  Every professor has some properties in common: they all have a name and a subject

  that they teach. Additionally, every professor can do certain things: they can all

  grade a paper and they can introduce themselves to their students, for example.

 

So Professor could be a class in our system. The definition of the class lists the

data and methods that every professor has.

 

In pseudocode, a Professor class could be written like this, including a constructor.

 

class Professor

    properties

        name

        teaches

    constructor

        Professor(name, teaches)

    methods

        grade(paper)

        introduceSelf()

 

Suppose in our school we also want to represent students. Unlike professors, students

can't grade papers, don't teach a particular subject, and belong to a particular year.

 

However, students do have a name and may also want to introduce themselves, so we might

write out the definition of a student class like this:

 

class Student

    properties

        name

        year

    constructor

        Student(name, year)

    methods

        introduceSelf()

 

The fact is that students and professors share some properties, or the fact that on

some level, they are the same kind of thing. Inheritance lets us do this.

 

We start by observing that students and professors are both people, and people have

names and want to introduce themselves. We can model this by defining a new class

Person, where we define all the common properties of people. Then, Professor and

Student can both derive from Person, adding their extra properties:

 

class Person

    properties

        name

    constructor

        Person(name)

    methods

        introduceSelf()

 

class Professor : extends Person

    properties

        teaches

    constructor

        Professor(name, teaches)

    methods

        grade(paper)

        introduceSelf()

 

class Student : extends Person

    properties

        year

    constructor

        Student(name, year)

    methods

        introduceSelf()

 

In this case, we would say that Person is the superclass or parent class of both

Professor and Student. Conversely, Professor and Student are subclasses or child

classes of Person.

 

You might notice that introduceSelf() is defined in all three classes. The reason

for this is that while all people want to introduce themselves, the way they do so

is different.

 

This feature - when a method has the same name but a different implementation in

different classes - is called polymorphism. When a method in a subclass replaces the

superclass's implementation, we say that the subclass overrides the version in the

superclass.

 

Encapsulation:

Objects provide an interface to other code that wants to use them but maintain their

own internal state. The object's internal state is kept private, meaning that it can

only be accessed by the object's own methods, not from other objects. Keeping an

object's internal state private, and generally making a clear division between its

public interface and its private internal state, is called encapsulation.

 

This is a useful feature because it enables the programmer to change the internal

implementation of an object without having to find and update all the code that uses

it: it creates a kind of firewall between this object and the rest of the system.

 

 

*/

 

class Person {

    name;

  

    constructor(name) {

this.name = name;

    }

  

    introduceSelf() {

console.log(`Hi! I'm ${this.name}`);

    }

  }

  

  // instantiating a object

  const girija = new Person("Girija");

 

  girija.introduceSelf(); // Hi! I'm Girija

 

/* f you don't need to do any special initialization, you can omit the constructor,

and a default constructor will be generated for you.  Example:

*/  

 

class Animal {

    sleep() {

      console.log("zzzzzzz");

    }

  }

  

  const spot = new Animal();

  

  spot.sleep(); // 'zzzzzzz'

  

  //Given our Person class above, let's define the Professor subclass

 

  class Professor extends Person {

    teaches;

  

    constructor(name, teaches) {

      super(name);// referencing super class constructor

      this.teaches = teaches;

    }

  

    introduceSelf() {

      console.log(

`My name is ${this.name}, and I will be your ${this.teaches} professor.`,

      );

    }

  

    grade(paper) {

      const grade = Math.floor(Math.random() * (5 - 1) + 1);

      console.log(grade);

    }

  }

 

  const walsh = new Professor("Walsh", "Psychology");

walsh.introduceSelf(); // 'My name is Walsh, and I will be your Psychology professor'

 

walsh.grade("my paper"); // some random grade

const aman = new Professor("Aman","Computer Science");

aman.introduceSelf();

aman.grade("papaer");

 

//implementing encapsulation with private member declaration prefixing #.

class Student extends Person {

    #year; //private member declaration.

  

    constructor(name, year) {

      super(name);

      this.#year = year;

    }

  

    introduceSelf() {

console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);

    }

  

    canStudyArchery() {

      return this.#year > 3;

    }

  }

 

  const summers = new Student("Summers", 2);

  const suman = new Student("Suman",3);

 

 

summers.introduceSelf(); // Hi! I'm Summers, and I'm in year 2.

summers.canStudyArchery(); // true

 

//summers.#year; // SyntaxError

 

/* You can have private methods as well as private data properties. Just like private

data properties, their names start with #, and they can only be called by the object's

  own methods.

*/

class Example {

    somePublicMethod() {

      this.#somePrivateMethod();

    }

  

    #somePrivateMethod() {

      console.log("You called me?");

    }

  }

  

  const myExample = new Example();

  

  myExample.somePublicMethod(); // 'You called me?'

  

  //myExample.#somePrivateMethod(); // SyntaxError