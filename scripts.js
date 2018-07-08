document.addEventListener("DOMContentLoaded", function(event) {

    //event listeners to make button clicks do something
    document.getElementById('circle-btn').addEventListener('click', createCircle);
    document.getElementById('rectangle-btn').addEventListener('click', createRectangle);
    document.getElementById('square-btn').addEventListener('click', createSquare);
    document.getElementById('triangle-btn').addEventListener('click', createTriangle);

    //gets information from input field in HTML
    var circleRadius = document.getElementById('CircleRadius');
    var rectangleWidth = document.getElementById('recWidth');
    var rectangleHeight = document.getElementById('recHeight');
    var sideLength = document.getElementById('sideLength');
    var triangleHeight = document.getElementById('triangleHeight');

    // var labelShapeName = document.getElementById('shape-name');
    var labelWidth = document.getElementById('width');
    var labelHeight = document.getElementById('height');
    var labelRadius = document.getElementById('radius');
    var labelArea = document.getElementById('area');
    var labelPerimeter = document.getElementById('perimeter');


    var canvas = document.getElementById('drawingSpace');

    //create generic Shape class
    var Shape = function (width, height) {
        this.width = width;
        this.height = height;
    }
    //draws or creates the shape
    Shape.prototype.drawShape = function () {
        //create Div for each shape that is 
        //creates a div for shape
        this.div = document.createElement('div');
        //creates a class name for each div
        this.div.classList.add(this.cssClass);
        //sets width of shape in px
        this.div.style.width = this.width + 'px';
        //sets height of shape in px
        this.div.style.height = this.height + 'px';
        //some math to be random
        var x = Math.floor(Math.random() * (600 - this.width));
        var y = Math.floor(Math.random() * (600 - this.height));
        //sets top/left position of shape to be random in px
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        //appends the shape to the drawing space
        canvas.appendChild(this.div);
        //to remove div when double clicked
        this.div.addEventListener('dblclick', this.remove.bind(this));
        //event listener to get shape elements on click
        this.div.addEventListener('click', this.describe.bind(this));
    }

    //describe function to get the info 
    Shape.prototype.describe = function() {
        // label.ShapeName.innerHTML = this.constructor.name;
        labelWidth.innerHTML = "Width: " + this.width;
        labelHeight.innerHTML = "Height: " + this.height;
        labelRadius.innerHTML = "Radius: " + this.radius;
        labelArea.innerHTML = "Area: " + this.area;
        labelPerimeter.innerHTML = "Perimeter: " + this.perimeter;
    }

    //create specific Circle class
    //needs radius, pi r squared(area), perimeter (2pi r)
    var Circle = function (radius) {
        //circle calls shape, and the height and width properties are radius *2
        //radius is half the inside of a circle
        Shape.call(this, radius * 2, radius * 2);
        //give class name of circle so it takes the CSS properties
        this.cssClass = 'circle';
        this.radius = radius;
        this.area = Math.PI * this.radius * this.radius;
        this.perimeter = 2 * Math.PI * this.radius;
        //call drawshape on circle
        this.drawShape();
    }
    //pass methods from shape to circle
    Circle.prototype = Object.create(Shape.prototype);
    //set the constructor for the class Circle back from shape to circle
    Circle.prototype.constructor = Circle;

    //function to create the Circle
    function createCircle() {
        //gets the value from the input field for circle radius and applies it to the circle I draw
        var input = 
        new Circle(circleRadius.value);
    }

    //create specific Rectangle class
    //area is w * height 
    //perimeter 2 * w + 2 * height
    var Rectangle = function (width, height) {
        Shape.call(this, width, height);
        this.cssClass = 'rectangle';
        this.area = width * height;
        this.perimeter = 2 * width + 2 * height;
        this.drawShape();
    }
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    //function to create the Rectangle
    function createRectangle() {
        new Rectangle(rectangleHeight.value, rectangleWidth.value);
    }

    //create specific Square class
    var Square = function (sideLength) {
        Rectangle.call(this, sideLength, sideLength);
        this.cssClass = 'square';
        this.div.classList.remove('rectangle');
        this.div.classList.add('square');
    }
    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;

    //function to create the Square
    function createSquare() {
        new Square(sideLength.value);
    }

    //create specific Triangle class
    //area 1/2 base * height
    //perimeter 2 * height * square root of 2 * height * height
    var Triangle = function (triangleHeight) {
        Shape.call(this, triangleHeight, 0);
        this.cssClass = 'triangle';
        this.drawShape();
        var isoPx = triangleHeight + "px";
        this.div.style.borderTopWidth = isoPx;
        this.div.style.borderRightWidth = 0;
        this.div.style.borderBottomWidth = 0;
        this.div.style.borderLeftWidth = isoPx;
        this.perimeter = 2 * triangleHeight * Math.sqrt(2) * triangleHeight * triangleHeight;
        this.area = (triangleHeight * triangleHeight) / 2;
    }
    Triangle.prototype = Object.create(Shape.prototype);
    Triangle.prototype.constructor = Triangle;

    //function to create the Triangle
    function createTriangle() {
        new Triangle(triangleHeight.value);
    }
    //function to remove div
    Shape.prototype.remove = function () {
        this.div.remove();
    }
    //final closing tag
});