/*

Asynchronous programming is a technique that enables your program

to start a potentially long-running task and still be able to be

responsive to other events while that task runs, rather than

having to wait until that task has finished. Once that task has

finished, your program is presented with the result.

 

Many functions provided by browsers, especially the most

interesting ones, can potentially take a long time, and therefore,

are asynchronous. For example:

 

Making HTTP requests using fetch()

Accessing a user's camera or microphone using getUserMedia()

Asking a user to select files using showOpenFilePicker()

 

function makeGreeting(name) {

  return `Hello, my name is ${name}!`;

}

 

const name = "Miriam";

const greeting = makeGreeting(name);

console.log(greeting);

// "Hello, my name is Miriam!"

 

Here, makeGreeting() is a synchronous function because the caller

has to wait for the function to finish its work and return a value

before the caller can continue.

 

If any function is running and taking long time to complete the task,

our program is completely unresponsive. you can't type anything, click anything,

or do anything else.

 

This is the basic problem with long-running synchronous functions. What we need is

  a way for our program to:
Start a long-running operation by calling a function.

Have that function start the operation and return immediately, so that our program

can still be responsive to other events.

Notify us with the result of the operation when it completes.

That's precisely what asynchronous functions can do.

 

The description we just saw of asynchronous functions might remind you of event

handlers, and if it does, you'd be right. Event handlers are really a form of

asynchronous programming: you provide a function (the event handler) that will be

called, not right away, but whenever the event happens. If "the event" is "the

asynchronous operation has completed", then that event could be used to notify

the caller about the result of an asynchronous function call.

 

Callback:

An event handler is a particular type of callback. A callback is just a function

that's passed into another function, with the expectation that the callback will be

called at the appropriate time.

 

However, callback-based code can get hard to understand when the callback itself

has to call functions that accept a callback. This is a common situation if you need

to perform some operation that breaks down into a series of asynchronous functions.

 

When we nest callbacks like this, it can also get very hard to handle errors: often

you have to handle errors at each level of the "pyramid", instead of having error

handling only once at the top level.

 

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the

foundation of asynchronous programming in JavaScript is the Promise.

 

PROMISE:

Promises are the foundation of asynchronous programming in modern JavaScript.

A promise is an object returned by an asynchronous function, which represents the

current state of the operation. At the time the promise is returned to the caller,

the operation often isn't finished, but the promise object provides methods to handle

the eventual success or failure of the operation.

 

With a promise-based API, the asynchronous function starts the operation and returns

a Promise object. You can then attach handlers to this promise object, and these

handlers will be executed when the operation has succeeded or failed.

 

To do this, we'll make an HTTP request to the server. In an HTTP request, we send

a request message to a remote server, and it sends us back a response. In this case,

we'll send a request to get a JSON file from the server.

we'll use the fetch() API, which is the modern, promise-based replacement for

XMLHttpRequest.

 

open a browser tab and visit https://example.org

in that tab, open the JavaScript console in your browser's developer tools

when we show an example, copy it into the console. You will have to reload the page

each time you enter a new example, or the console will complain that you have

redeclared fetchPromise.

 

Copy this below code into your browser's JavaScript console:

const fetchPromise = fetch(
"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
console.log(fetchPromise);
fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});
console.log("Started request…");

 

Here we are:

 

calling the fetch() API, and assigning the return value to the fetchPromise variable

immediately after, logging the fetchPromise variable. This should output something like:

Promise { <state>: "pending" }, telling us that we have a Promise object, and it has a

state whose value is "pending". The "pending" state means that the fetch operation is

still going on.

passing a handler function into the Promise's then() method. When (and if) the fetch

operation succeeds, the promise will call our handler, passing in a Response object,

which contains the server's response.

logging a message that we have started the request.

The complete output should be something like:

 

Promise { <state>: "pending" }

Started request…

Received response: 200

Note that Started request… is logged before we receive the response. Unlike a

synchronous function, fetch() returns while the request is still going on, enabling

our program to stay responsive. The response shows the 200 (OK) status code, meaning

that our request succeeded.

 

 

*/

/* Chaining promises:

With the fetch() API, once you get a Response object, you need to call another

function to get the response data. In this case, we want to get the response data

as JSON, so we would call the json() method of the Response object. It turns out that

json() is also asynchronous. So this is a case where we have to call two successive

asynchronous functions.

 

const fetchPromise = fetch(
"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});

 

In this example, as before, we add a then() handler to the promise returned by fetch().

But this time, our handler calls response.json(), and then passes a new then() handler

into the promise returned by response.json().

 

This should log "baked beans" (the name of the first product listed in "products.json").

 

But the elegant feature of promises is that then() itself returns a promise, which will

be completed with the result of the function passed to it. This means that we can

(and certainly should) rewrite the above code like this:

 

const fetchPromise = fetch(
"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });

Instead of calling the second then() inside the handler for the first then(), we can

return the promise returned by json(), and call the second then() on that return value.

This is called promise chaining and means we can avoid ever-increasing levels of

indentation when we need to make consecutive asynchronous function calls.

 

Before we move on to the next step, there's one more piece to add. We need to check

that the server accepted and was able to handle the request, before we try to read it.

We'll do this by checking the status code in the response and throwing an error if it

wasn't "OK":

 

const fetchPromise = fetch(
"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });

 

  CATCHING ERRORS:

  Lastly how do we handle errors? The fetch() API can throw an error for many reasons

  (for example, because there was no network connectivity or the URL was malformed in

  some way) and we are throwing an error ourselves if the server returned an error.

 

  To support error handling, Promise objects provide a catch() method. This is a lot

  like then(): you call it and pass in a handler function. However, while the handler

  passed to then() is called when the asynchronous operation succeeds, the handler

  passed to catch() is called when the asynchronous operation fails.

 

If you add catch() to the end of a promise chain, then it will be called when any of

the asynchronous function calls fail. So you can implement an operation as several

consecutive asynchronous function calls, and have a single place to handle all errors.

 

Example:

 

const fetchPromise = fetch(
"bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });

 

 

Promise Terminology:

Promises come with some quite specific terminology that it's worth getting clear about.

 

First, a promise can be in one of three states:

 

pending: the promise has been created, and the asynchronous function it's associated

with has not succeeded or failed yet. This is the state your promise is in when it's

returned from a call to fetch(), and the request is still being made.

 

fulfilled: the asynchronous function has succeeded. When a promise is fulfilled, its

then() handler is called.

 

rejected: the asynchronous function has failed. When a promise is rejected, its catch()

handler is called.

 

Note that what "succeeded" or "failed" means here is up to the API in question:

for example, fetch() considers a request successful if the server returned an error

like 404 Not Found, but not if a network error prevented the request being sent.

 

Sometimes, we use the term settled to cover both fulfilled and rejected.

 

A promise is resolved if it is settled, or if it has been "locked in" to follow the

state of another promise.

 

Combining / Chaining multiple promises:

The promise chain is what you need when your operation consists of several asynchronous

functions, and you need each one to complete before starting the next one. But there are

other ways you might need to combine asynchronous function calls, and the Promise API

provides some helpers for them.

 

Sometimes, you need all the promises to be fulfilled, but they don't depend on each

other. In a case like that, it's much more efficient to start them all off together,

then be notified when they have all fulfilled. The Promise.all() method is what you need

here. It takes an array of promises and returns a single promise.

 

The promise returned by Promise.all() is:

 

fulfilled when and if all the promises in the array are fulfilled. In this case, the

then() handler is called with an array of all the responses, in the same order that the

promises were passed into all().

rejected when and if any of the promises in the array are rejected. In this case, the
 
catch() handleris called with the error thrown by the promise that rejected.

 

For example:

const fetchPromise1 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",

);

const fetchPromise2 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",

);

const fetchPromise3 = fetch(

"https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",

);

 

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])

  .then((responses) => {

    for (const response of responses) {

      console.log(`${response.url}: ${response.status}`);

    }

  })

  .catch((error) => {

    console.error(`Failed to fetch: ${error}`);

  });

 

  Here, we're making three fetch() requests to three different URLs. If they all succeed,

  we will log the response status of each one. If any of them fail, then we're logging

  the failure.

 

With the URLs we've provided, all the requests should be fulfilled, although for the

second, the server will return 404 (Not Found) instead of 200 (OK) because the requested

file does not exist. So the output should be:

 

https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json: 200

https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found: 404

https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json: 200

If we try the same code with a badly formed URL, like this:

 

 

const fetchPromise1 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",

);

const fetchPromise2 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",

);

const fetchPromise3 = fetch(

"bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",

);

 

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])

  .then((responses) => {

    for (const response of responses) {

      console.log(`${response.url}: ${response.status}`);

    }

  })

  .catch((error) => {

    console.error(`Failed to fetch: ${error}`);

  });

 

  Then we can expect the catch() handler to run, and we should see something like:

 

Failed to fetch: TypeError: Failed to fetch

 

Sometimes, you might need any one of a set of promises to be fulfilled, and don't care

which one. In that case, you want Promise.any(). This is like Promise.all(), except that

it is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all

of them are rejected:

 

const fetchPromise1 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",

);

const fetchPromise2 = fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",

);

const fetchPromise3 = fetch(

"https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",

);

 

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])

  .then((response) => {

    console.log(`${response.url}: ${response.status}`);

  })

  .catch((error) => {

    console.error(`Failed to fetch: ${error}`);

  });

Note that in this case we can't predict which fetch request will complete first.

 

These are just two of the extra Promise functions for combining multiple promises.

 

async and await keywords:

The async keyword gives you a simpler way to work with asynchronous promise-based code.

Adding async at the start of a function makes it an async function:

nside an async function, you can use the await keyword before a call to a function that

returns a promise. This makes the code wait at that point until the promise is settled,

  at which point the fulfilled value of the promise is treated as a return value,

   or the rejected value is thrown.

 

This enables you to write code that uses asynchronous functions but looks like

synchronous code.

async function fetchProducts() {

  try {

    // after this line, our function will wait for the `fetch()` call to be settled

    // the `fetch()` call will either return a Response or throw an error

    const response = await fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",

    );

    if (!response.ok) {

      throw new Error(`HTTP error: ${response.status}`);

    }

    // after this line, our function will wait for the `response.json()` call to be settled

    // the `response.json()` call will either return the parsed JSON object or throw an error

    const data = await response.json();

    console.log(data[0].name);

  } catch (error) {

    console.error(`Could not get products: ${error}`);

  }

}

 

fetchProducts();

 

Here, we are calling await fetch(), and instead of getting a Promise, our caller gets back a fully

complete Response object, just as if fetch() were a synchronous function!

 

We can even use a try...catch block for error handling, exactly as we would if the code

were synchronous.

 

async function fetchProducts() {

  try {

    const response = await fetch(

"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",

    );

    if (!response.ok) {

      throw new Error(`HTTP error: ${response.status}`);

    }

    const data = await response.json();

    return data;

  } catch (error) {

    console.error(`Could not get products: ${error}`);

  }

}

 

const promise = fetchProducts();

promise.then((data) => console.log(data[0].name));

 

*/