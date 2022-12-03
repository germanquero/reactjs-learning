# React Guide
##### This are the notes I took while learning React via the official documentation.
### Note: You should know at least basic JavaScript for undersanding this course
<br>

## How to create a new single-page React app

```bash
npx create-react-app my-appIn React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.
cd my-app
npm start
```
When the app is ready for production you can create an optimized build of it in the build folder via:
```bash
npm run build
```
## JSX
This language is used for **describing** what you want to render later on.
```js
const name = 'John Simpson';
const element = <h1>Hello, {name}</h1>;
```
You can put any valid JavaScript expression inside the **curly braces** in JSX.
```jsx
const element = <h1>Hello, {getName(user)}</h1>;
const element = <h1>Hello, {user.firstName}</h1>;
const element = <h1>2 + 2 is, {2 + 2}</h1>;
```
You can split JSX in multiple lines for readability. When doing this it's recomended to wrap it arround **parentheses**.
```js
const element = (
    <h1>
        Hello, World! 
    </h1>
);
```
JSX code is a JavaScript **expression** too, so you can use the same way as any expression(inside if statements or loops, assign it to variables, accept it as arguments or return from functions, etc).
It uses **camelCase** property naming convention instead of HTML atribute names. For example class becomes className.
## Rendering
In the html file there's something like this:
```html
<div class="root"></div>
```
This is a root DOM node, inside here, everything will be managed by ReactDOM.
To render an element, first of all you have to pass the DOM root to **ReactDOM.createRoot()**
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
```
Then you can use **root.render()** and pass it the element you want to render
```js
root.render(element);
```
React elements are **inmutable**. Once its create, its atribute or children can't be changed. Only using elements, the only way to update the UI is by creating a new element and passing it to render.
For a ticking clock you could do something like this:
```js
const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);}

setInterval(tick, 1000);
```
In practice, root.render() usually its only called **once**.
React only update whats necessary, this means it only updates the text node thats changing, even though you are creating an element with the whole UI tree.

Because of this, its usually better to think about how the UI should look at any given moment rather than how to change it over time (this way of thinking eliminates a lot of bugs).
## Components
Components let you separate each part of the UI into reusable pieces.
They are similar to JavaScript functions. They accept arbitrary inputs (called **props**) and return **React elements**.
There are two types of components:
- **Functional** components
- **Class** components
### Functional Components
The simplest way to implement a React component its to write a javascript funciton
```js
function Welcome(props){
    return <h1>Hello, {props.name}!</h1>;
}
```
It accepst a single **props**, which is a object argument that represents all its propieties, **name** for example. and it returns a React element represented by the JSX code.
### Class Components
You can also use **ES6 classes** extending the **React.Component class** to define a component:
```js
class Welcome extends React.Component{
    render(){
        return <h1>Hello, {this.props.name}!</h1>;
    }   
}
```
From the React point of view this two components are internally the same, but they have some different additional features.
### Rendering a component
React elements can not only represent DOM tags. They can also represent your own components:
```js
const element = <Welcome name="Will"/>;
```
The JSX atributes, are passed all together as the props object showed before.

### Composing Components
React components can use other components in their output. For example, you can create an **App** component that renders **Welcome** many times:
```js
function App(){
    return (
        <div>
            <Welcome name="Will"/>
            <Welcome name="Phill"/>
            <Welcome name="Carlton "/>
        </div>
    );
}
```
Typically React apps have a **single App component** at the very top that encapsulates everything inside.<br>
It is **usefull** to split components in smaller components and make them as **reusable** and **generic** as possible. It is where the React true potential resides.<br>
It is recomended to **name the props from the components point of view** rather than its context.<br>
Its seems like an unnecesary work at first but it pays off in larger application. A good rule of thumb is that if a part of the UI its **used several times** or it is **complex enough** on its own, it should be its own component.
### Props are Read Only
React is very flexible but it has **one stric rule**:
> All React components must act like pure functions with respect to their props.

Pure functions are the ones that **doesn't attempt to change their input** and always return the same result for the same inputs. For example:
```js
function sum(a, b) {
  return a + b;
}
```
An example of a impure function could be:
```js
function sum(a, b) {
  return a += b;
}
``` 
Thats why the concept **state** exists. It allows Reat components to **change their output** over time without violating this rule.
## State and Lifecycle
Until now you needed to call root.render() to change the rendered output, as in the clock example at the beguinning. **Ideally we want a component to update by it self**.<br>
Let's encapsulate the previous clock into a component:
```js
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props){
  return(
    <h1>{props.date.toLocaleTimeString()}</h1>
  );
}

function tick() {
  root.render(<Clock date={new Date()}/>);
}

setInterval(tick, 1000);
```
Now you have a Clock component. But you're still calling root.render() every second. Ideally we want to render the clock once and have it updating by itself.
```js
root.render(<Clock/>);
```
For this you need to add **"state"** to the Clock component.<br>
State is similar to props, but priavte and fully controlled by the component.
>When you need to use state, you typically prefere a class over a funcion component.

This doesn't mean you cant use state with funcitonal components. You can by using **React hooks**, but classes offers some aditional freatures as **local state** and **lifecycle methods**.
### How to turn a Funcional component into a Class Component
- Create a ES6 class that extends React.Component with the same name as your functional class.
- Change props to **this.props**, because this is an element of the class now, not the parameters that the funciton recives.
- Create a render method inside your class and move the return of your function inside it.
```js
class Clock extends React.Component{
    render(){
        return(
            <h1>{this.props.date.toLocaleTimeString()}</h1>
        );
    }
}

// The functional component for reference
function Clock(props){
  return(
    <h1>{props.date.toLocaleTimeString()}</h1>
  );
}
```
The **render method its called every time an update happens**, but as long as its rendered into the same DOM node, it will always be the **same instance** of the component.
### Adding Local State to a Class
For this you will use **this.state** and initialize it in the **constructor** of the class, which is now required.
```js
class Clock extends React.Component{
    constructor(props){
        super(props); // note how props are passed to the base constructor
        this.state = {
            date: new Date()
        };
    }
    render(){
        return(
            <h1>{this.state.date.toLocaleTimeString()}</h1>
        );
    }
}
```
>Class component constructos should always call the base constructor with props.

If you render this component, it will show the current time but still wont update. For this you will use **Lifecycle methods**.
### Adding Lifecycle methods to a Class component
It is important to **free up resources** taken by the components when they are destroyed, specially in apps with many components.<br>
In the Clock example, you want to **set up a timer** when the Clock is rendered to the DOM for the first time. But you also want to **clear that timer** when the DOM that the component produced is removed.<br>
This is called **mounting** and **unmounting**.<br>
**componentDidMount** and **componentWillUnmount** methods exists for running some code whenever a Class component is mounted or unmounted.
- componentDidMount executes when the component output is rendered. In the Clock example is where we should start our timer
- componentWillUnmount executes whenever the component output is about to be destroyed
```js
componentDidMount(){
    this.timerID = setInterval(()=>this.tick(), 1000);
}

componentWillUnmount(){
    clearInterval(this.timerID);
}
```
Note how you saved it into **this.timerID**. You are free to add aditional fields to the class manually. <br>
Note how you also used **this.tick()** method which is not implemented. This metod, should update **this.state.date** to a new Date object.<br>
The entire component should look something like this:
```js
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    componentDidMount(){
        this.timerID = setInterval(()=>this.tick(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        return(
            <h1>{this.state.date.toLocaleTimeString()}</h1>
        );
    }
}
```
## Using State Correctlyt 
The only place where you can assing a value to **this.state** is the **constructor**, if you want ot assing another value you should use **this.setState()** like this:
```js
this.setState({value: 'new value'});
``` 
## State updates may be Asynchronous
For performance, React may batch multiple setSate() calls into a single update.<br>
Because of it, this.props and this.state may update asynchronous, you should not rely on their values for calculating the next state.<br>
For example this code may fail:
```js
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
To go arround this issue, you can use a second form of **setState()** thaht acepts a **function** rather than an object. This function recives the **previous state** as the first argument and the **props at the time the update is beeing applied** as second argument.
```js
this.setState({(state, props)=>({
    counter: state.counter + props.increment
})});

//Without using an arrow function it would look somehting like this
this.setState(function(state, props){
    return {
        counter: state.counter * props.increment
    };
});
```
## State Updates are merged
If your state has more than one variable, then you can update them **independently** with separate setState() calls. By doing this, you can leave one state variable **intact**, but complately replace the other one. For example:
```js
class Example extends React.Component{
    counstructor(props){
        super(props);
        this.state = {
            variable1: 'value1',
            variable2: 'value2'
        };
    }

    componentDidMount(){
        this.setState({
            variable1: 'newValue1'
        })
    }

    componentWillUnmount(){
        this.setState({
            variable2: 'newValue2'
        })
    }

    render(){
        return(
            //stuff here
        );
    }
}
```
When this component mounts, this.state.variable1 will change but this.state.variable2 will remaing intact, but when it unmounts it will happend viceversa. 
## The data flows down
State is often call **local** or **encapsulate** and **it's not accessible to any component** other than the one that owns and sets it. You can pass the state of a component to its **child components**.<br>
The child component would recive the state in its **props** without knowing whether it came from the parents state, props or typed by hand.
Following the Clock example used before:
```js
const root = ReactDOM.createRoot(document.getElementById('root'));

class Clock extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          date: new Date()
      };
  }

  tick(){
      this.setState({
          date: new Date()
      });
  }

  componentDidMount(){
      this.timerID = setInterval(()=>this.tick(), 1000);
  }

  componentWillUnmount(){
      clearInterval(this.timerID);
  }

  render(){
      return(
          <FormattedDate date={this.state.date}/>
      );
  }
}

function FormattedDate(props){
    return <h1> It is {props.date.toLocaleTimeString()}. </h1>
}

root.render(<Clock/>);
```
FormatedDate recives the date in its props and don't know if it cames from the Clock's date or not.<br>
>This is called **top-down** or **unidirectional** data flow. Any state is always owned by the component where it is defined. Any data or UI derived from that state **can only affect components below them** in the Components tree.

## Handling events
It's very similar to handling DOM events but with some **syntax diferences**:
- React events are named in **camelCase**
- In JSX you pass a **function as evendy handler**
For example:
```js
<button onClick={handleClick}>
Click Me!
</button>
```
To prevent the default behavior in React you can not return false as you do in standard html. To go arround this issue you should call **prevendDefault**.<br>
For example in html it would be:
```html
<form onsubmit="console.log('You submited.'); return fasle">
    <button type='submit'>Submit</button>
</form>
```
In react it would be something like this:
```js
function From(){
    function handleClick(e){
        e.preventDefault();
        console.log('You submited.');
    }
    return(
        <form onSubmit={handleClick}>
            <button type='submit'>Submit</button>
        </form>
    );
}
```
Notice how the handleSubmit function uses 'e'. This is a **syntetic event** defined by react that handles the event.<br>
In React you dont need to call addEventListener to add a listener to the DOM element you want. You just need to **provide the listener** to the class when it is **initially rendered**.<br>
When defining a class component, **its common for the event handler to be a method of the class**. Class method need to be **binded** to the class for this to work in the callback.<br>
This example is a On/Of toggle for you to understand this concepts:
```js
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isToggleOn: true
        }
        // This is the binding we talked before
        // Rememeber this sintax because is always necessary for 'this' to work
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        // This is the form of State that accepst the previous state as argument
        // you learned previously
        this.setSate(prevState => ({
            // set the state to the opposite of the prevState
            isToggleOn: !prevState.isToggleOn
        }))
    }

    render(){
        // renders a button with the text ON if isToggleOn is true and OFF if its false
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}
```
There are to ways to get arround having to bind functions, if for some reason you dont want to. You can define the class with **public field syntax**, with is enabled by default in React:
```js
handleClick => () => {
    this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
    }))
}
```
Or you can use **arrow functions** for the callback.
```js
render(){
    return(
        <button onClick={() => this.handleClick()}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
    );
}
```
The **problems** with this way to fix it is that a **different callback** is created each time the button is pressed, so it's recommended to use the binding method or the public field syntax one.<br>
It's common to want to pass an **extra parameter to an event handler**. If you want to do that, the following syntaxes will both work:
```
<button onClick={(e) => this.handleClick(argument, e)}>Passing arguments</button>
<button onClick={this.handleClick.bind(this, argument)}>Passing arguments too</button>
```
In both cases, the e argument represents the React event, and it will be passeed as a second argument after the argument you want to pass.
## Conditional rendering
You can create as many components as you want and then as many as you want depending on the state of the application.<br>
It's done by a **simple JavaScript condition**.
```js
function RenderThing(props){
    return <h1>Hey I'm a thing</h1>;
}

function RenderAndotherThing(props){
    return <h1>Hey I'm another thing</h1>;
}

function Component(props){
    const condition = props.condition;
    if (condition) {
        return <RenderThing/>;
    }
    else {
        return <RenderAnotherThing/>;
    }
}
```
### Element variables
You can store **elements in variables**. This helps to contidionaly render some part of your code while the rest doesnt change.<br>
The next example is a **Demo of a Login Screen** recaping some of the things you have learned.
```js
import React from 'react';
import ReactDOM from 'react-dom/client';

function UserMessage(){
    return <h1>Welcome user!</h1>;
}

function GuestMessage(){
    return <h1>Hello, please login.</h1>;
}

function GreetingMessage(props){
    const isNotLogged = props.isNotLogged;
    if(isNotLogged) return <UserMessage/>;
    else return <GuestMessage/>;
}

function LoginButton(props){
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props){
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginScreen extends React.Component{
    constructor(props){
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.state = {isNotLogged: false};
    }
  
    handleLogin(){
      this.setState({isNotLogged: true});
      console.log(this.state.isNotLogged);
    }
  
    handleLogout(){
      this.setState({isNotLogged: false});
      console.log(this.state.isNotLogged);
    }
  
    render(){
        const isNotLogged = this.state.isNotLogged;
        let displayedButton;
        if (!isNotLogged){
          displayedButton = <LoginButton onClick={this.handleLogin} />;

        }
        else{
          displayedButton = <LogoutButton onClick={this.handleLogout} />;

        }
        return(
            <div>
                <GreetingMessage isNotLogged={isNotLogged} />
                {displayedButton}
            </div>
        );
    }
}

function App(){
    return(
        <>
            <LoginScreen/>
        </>
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<App/>);

```
### Inline If with Logical && Operator
JavaScript, if given a **"expresion && expression"** operation, will consider the first expression and if it is true it will consider the second one, but if the first expression results false, it will **skip** the second expression.<br>
By using this we can create elements that only renders if a certain expression is true without using variables or if statements.
```js
import React from "react";
import ReactDOM from "react-dom/client";

function LogicalAndExample(props) {
    const givenElements = props.exampleElements;
    return (
        <div>
            <h1>Inline if with Logical AND Operator Example</h1><br /><br />
            {givenElements.length > 0 &&
                <h2>{givenElements.length} elements have been given.</h2>
            }
        </div>
    );
}

const elements = ['try', 'removing', 'all', 'elements'];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LogicalAndExample exampleElements={elements} />);
```
### Inline If-Else with COnditional Operator
An other method to inline conditionally render elements is by using the JavaScript conditional operator **condition ? true : false**. <br>
The following example is the same as before, but with an else expression.
```js
function LogicalAndExample(props) {
    const givenElements = props.exampleElements;
    return (
        <div>
            <h1>Inline if with Logical AND Operator Example</h1><br /><br />
            <h2>{givenElements.length < 0 ?
                'No elements given' :
                givenElements.length + ' elements has been given'} </h2>
        </div>
    );
}
```
Its up to you to choose the method you or your team consider more readable.<br>
> If conditions are becoming too complex, it might be a better move to extract a component if possible.

### Preventing COmponent from Rendering
In some cases you might want to hide a component even thought it was rendered by another component. To to this you just need to return null instead of its render output.<br>
Lest play Hide And Seek with an h1 to exemplify.
```js
import React from "react";
import ReactDOM from "react-dom/client";

function Message(props){
    if(props.show) return <h1> Thanks for letting me appear.</h1>
    else return null;

}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({show: !state.show}));
    }
    render() {
        return (
            <>
                <button onClick={this.handleClick}>{this.state.show == true ? 'HIDE' : 'SHOW'}</button>
                <Message show={this.state.show}/>
            </>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
Returning null doesnt count as mount or dissmount so it does not affect the firing of component's lifecycle methods. What is more, componentDidUpdate will still be called.
## List and Keys
Now you are going to learn how to transform arrays into lists of elements. But before anything, here it is a little reminder of the map() Javascript function.
```js
const numbers = [1, 2, 3, 4, 5];
const threeXNumbers = numbers.map((x) => x * 3);
console.log(threeXNumbers);
// this logs into the console: > Array(5) [3, 6, 9, 12, 15]
```
As you may deduce, this code takes every item of the element, assigns it to a variable (x in the example), and apply to that variable whatever you tell it to (in this case x*3). Maps returns a new arraym wich you can assign to a new variable (trheeXNumbers)<br>
For creating list of Items you can do exactly the same:
```js
import React from "react";
import ReactDOM from "react-dom/client";

function ElementsList(props){
    const listItems = props.elements.map((element) => <li>{element}</li>);
    return <ul>{listItems}</ul>;
}
const elements = ['any', 'element', 'you', 'want'];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ElementsList elements={elements} />);
```
This works fine but if you open the console, you should get a warning telling you thaht each child in a list should have a unique "key" prop. This is a special atribute that you need to include when creating lists of elements.<br>
This is so easy to implement inside the map function.
```js
function ElementsList(props) {
    const listItems = props.elements.map((element) =>
    <li key={element}>{element}</li>);
    return <ul>{listItems}</ul>;
}
```
### Keys
The example may work fine in this case, but note this will only work if all elements in the list are unique. If elements would have been something like ['a', 'a', 'a'], keys would have been all the same, giving you errors.
To get arround this issue you can use the index of the elements like this:
```js
import React from "react";
import ReactDOM from "react-dom/client";

// map can get two values (element, index), as you may spect, index represents the index of the element
function ElementsList(props) {
    const listItems = props.elements.map((element, index) => <li key={index}>{element}</li>);
    return <ul>{listItems}</ul>;
}
// notice there are identical elements but this don't give errors
const elements = ['any', 'element', 'you', 'want','any'];
```
This should be your last resource for giving keys to your elements, tipically your data will come with an id  and you should use it for this:
```js
function ElementsList(props) {
    const listItems = props.elements.map((element) => <li key={element.id}>{element.value}</li>);
    return <ul>{listItems}</ul>;
}
const elements = [{value: 'value1', id: 'id1'}, {value: 'value2', id: 'id2'}, {value: 'value3', id: 'id3'}];
```
If the order of the elements can vary it's not recomended to use the index because it can affect performance and cause issues with the state of the component.<br>
React as default, if you don't dive specific keys uses the index.
### Extracting component with keys
Keys only make sense in the context of the array. For understainding this here is an example of the previous list, but the ListItems are extracted as a separated component.
```js
function ListItem(props){
    //here the key remains in the ListItem and it's not usefull
    return <li key={props.id}>{props.value}</li>
}

function ElementsList(props) {
    const listItems = props.elements.map((element) => <ListItem id={element.id} value={element.value} />);
    return <ul>{listItems}</ul>;
}
```
The propper way of doing this is like this:
```js
function ListItem(props){
    return <li>{props.value}</li>
}

function ElementsList(props) {
    // here the key its in the context of the array, where it makes sense
    const listItems = props.elements.map((element) => <ListItem key={element.id} value={element.value} />);
    return <ul>{listItems}</ul>;
}
```
A good rule of thumb is that elements inside a map or any kind of loop, need a key.
### Keys only need to be unique among their siblings
This means keys doesn't have to be globally unique as you can see in this example:
```js
//ElementList and List Item are the same as before

function TitlesList(props){
    const listTitles = props.elements.map((element) => <ListItem key={element.id} value={element.title} />);
    return <ul>{listTitles}</ul>
}

function App(props){
    return(
        <>
            <TitlesList elements={elements}/>
            <ElementsList elements={elements}/>
        </>
    );
}

const elements = [{value: 'value1', id: 'id1', title: 'title1'},
                  {value: 'value2', id: 'id2', title: 'title2'},
                  {value: 'value3', id: 'id3', title: 'title3'}];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```
Notice how TitlesList elements and ElementsList elements have the same keys and this doen't dive any kind of error or warning.<br>
Keys works as a hint for React to know which component of the list, they are not passed to the child component. If for some reason you need the child component to have the key you have to pass it as prop with an other name. Like this:
```js
function ListItem(props){
    return <li id={props.id}>{props.value}</li>
}

function ElementsList(props) {
    // here the key its in the context of the array, where it makes sense
    const listItems = props.elements.map((element) => <ListItem key={element.id} id={element.id} value={element.value} />);
    return <ul>{listItems}</ul>;
}
```
JSX alow embending any expression between curly braces, this means you can inline the map()
```js
function TitlesList(props){
    return <ul>{props.elements.map((element) => <ListItem key={element.id} id={element.id} value={element.title} />)}</ul>;
}
```
This can be over done, but sometimes it is more readable. Its up to you or you team to decide whatever its better in your case.<br>
As with everything in react, if the map() body its to complex, it may be a good time to extract a component.
## Forms
HTML forms have the default behavior of going to another page when the user submits it. If you want this, it works in React, but in most common cases you want a JavaScript function to manage the submission and has access to the data the user entered. The tecnique to ahive this is called controlled components.
### Controlled Components
Form elements has their own state and update it based on user input. You can combinne it with React State make it the single source of truth. By doing that, the component that renders the from is the one that controls what happens in it. A controlled component is any input form element controlled by React in this way.
For example, imagine this html form:
```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
With controlled input you need a function that handles change and another one to handle submit. It would look something like this:
```js
class ExampleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        alert('A name has been submited: ' + this.state.name);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```
There are a few things you can appreciate in this exmaple. To begin with, you can see the web doesn't udpate when subbmiting. This is caused by e.prevendDefault() in the handleSubmit function.
Now this.sate.name updtes with the user input. Because onChange is called every single keystroke this.state.name has a real time representation of the inner text, and you can pass it to other elements of the UI and handle it or reset it with other event hanlders. YOu can apreciate the input text doesn't clear after subbmision. This is because the page its not updating. If you would want it to be cleared you would need to simply clear the this.state.name value:
```js
handleSubmit(e) {
        alert('A name has been submited: ' + this.state.name);
        this.setState({name: ''});
        e.preventDefault();
    }
```

