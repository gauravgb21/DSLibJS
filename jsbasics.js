function Stopwatch(){
    let duration = 0;
    let isStarted = false;
    let timeInterval;
    this.start = function(){
        if( !isStarted ){
            isStarted = true;
            timeInterval = setInterval(() => duration++,1);
        }
        else throw new Error('Stopwatch already started !');
    }

    this.stop = function(){
        if(isStarted){
            isStarted = false;
            clearInterval(timeInterval);
        }
        else throw new Error('Stopwatch is not started !');
    }

    this.reset = function(){
        duration = 0;
        isStarted = false;
    }

    Object.defineProperty(this,'duration',{
        get : function(){
            return (duration / 1000);
        }
    });
}


//this doesn't get a Base Object for creating new instance so we can't do prototypical inheritance with Factory Functions like below

function createCircle(radius){
    return {
        radius,
        draw : function(){
            console.log("Yeah draw yaself");
        }
    };
}

createCircle.prototype.move = function(){
    console.log("Move")
}

//protoypical inheritance

// To make inheritance cleaner

function extend(Child,Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(color){
    this.color = color;
    this.shapeOfYou = function(){
        console.log("shape of you !");
    }
}

Shape.prototype.duplicate = function(){
    console.log('duplicate');
}

//Object creation using cinstructor function

function Circle(radius,color){
    Shape.call(this,color);
    this.radius = radius;    
    // this.draw = function(){
    //     console.log("Draw in Instance");
    // }
    
    this.move = function(){
        console.log("Move!");
    }   
}


// if i define this draw method before assigning parent ShapeBase , i will lose the draw method
//Also , i am not able to create Circle object using new Circle.prototype.constructor(2) , as constructor property 
// of the CircleBase is lost , so we need to reset the constructor property 

extend(Circle,Shape);

Circle.prototype.draw = function(){
    console.log("Draw in Prototype => ",this.radius);
};


//Method Overriding

Circle.prototype.duplicate = function(){

    //If we want to call duplicate of Shape then
    Shape.prototype.duplicate();

    //If there is this in prototype function then use call to bind the context

    // Shape.prototype.duplicate.call(this);

    //This will execute because it lies first in the prototype chain 
    console.log("Duplicate in Circle");
}


function Square(size){
    this.size = size;
}

extend(Square,Shape);

//Now , duplicate method is accessable to both CircleBase and SquareBase and hence , to their instances as well




// Exercise

function HtmlElement(){
    this.click = function(){
        console.log("Clicked");
    }
}

HtmlElement.prototype.focus = function(){
    console.log("Focused");
}

function HtmlSelectElement(items = []){
    this.items =  items;
    this.addItem = function(element){
        this.items.push(element);
    }
    this.removeItem = function(element){
        this.items.splice(this.items.indexOf(element),1);
    }
}

//only way to get click 

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;




//ES6 Clases under the hood works same as Prototypical Inheritance 



// Debouncing in Javascript

let counter = 0;

const fetchData = () => {
    console.log("fetching.....",counter++);
    const inputElement = document.querySelector('#inputId');
    const outputElement = document.querySelector('#outputId');
    outputElement.innerHTML = inputElement.value;
}

const debounce = (fn,wait) => {
    let timer;
    return function(){
        clearInterval(timer);
        timer = setTimeout(() => fn(),wait);
    }
}

const betterFunction = debounce(fetchData,300);

//throttling

let apiCallsOnResize = 0;

const makeApiCall = () => {
    console.log(`API called ${apiCallsOnResize++} times`);
}

const throttle = (fn,wait) => {
    let canMakeCall = true;
    return function(){
        if(canMakeCall){
            fn();
            canMakeCall = false;
            setTimeout(() => canMakeCall = true,wait);
        }
    }
}

const betterApiCallFunction = throttle(makeApiCall,300);


//Function Currying

const sum = (a) => {
    return function(b){
        if(!b) return a;
        return sum(a + b);
    }
}

const sumF = (a) => (b) => !b ? a : sumF( a + b )

function useMemo(){
    const cache = {};

    return function(x){
        if( x in cache)console.log("Already computed");
        else{ 
            cache[x] = 1;
            console.log("New data ");
        }
    }
}

// const newCache = useMemo();

// newCache(2);
// newCache(12);
// newCache(2);


