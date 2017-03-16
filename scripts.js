document.addEventListener("DOMContentLoaded", function (event) {

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

    //
    var labelShapeName = document.getElementById('shape-name');
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
        //create Div for each shape that is created
        this.div = document.createElement('div');
        this.div.classList.add(this.cssClass);
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        var x = Math.floor(Math.random() * (600 - this.width));
        var y = Math.floor(Math.random() * (600 - this.height));
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
        label.ShapeName.innerHTML = this.constructor.name;
        labelWidth.innerHTML = this.width;
        labelHeight.innerHTML = this.height;
        labelRadius.innerHTML = this.radius;
        labelArea.innerHTML = this.area;
        labelPerimeter.innerHTML = this.perimeter;
    }

    //create specific Circle class
    var Circle = function (radius) {
        Shape.call(this, radius * 2, radius * 2);
        this.cssClass = 'circle';
        this.drawShape();
    }
    //no idea what this does, but we have to have it
    //pass methods from shape to circle
    Circle.prototype = Object.create(Shape.prototype);
    //set the constructor for the class Circle back from shape to circle
    Circle.prototype.constructor = Circle;

    //function to create the Circle
    function createCircle() {
        new Circle(circleRadius.value);
    }

    //create specific Rectangle class
    var Rectangle = function (width, height) {
        Shape.call(this, width, height);
        this.cssClass = 'rectangle';
        this.drawShape();
    }
    //have to have these
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    //function to create the Rectangle
    function createRectangle() {
        new Rectangle(rectangleHeight.value, rectangleWidth.value);
    }

    //create specific Square class
    var Square = function (sideLength) {
        Shape.call(this, sideLength, sideLength);
        this.cssClass = 'square';
        this.drawShape();
    }
    //no idea what this does, but we have to have it
    Square.prototype = Object.create(Shape.prototype);
    Square.prototype.constructor = Square;

    //function to create the Square
    function createSquare() {
        new Square(sideLength.value);
    }

    //create specific Triangle class
    var Triangle = function (triangleHeight) {
        Shape.call(this, 0, 0);
        this.cssClass = 'triangle';
        this.drawShape();
        // this.cssClass = "triangle"
        var isoPx = triangleHeight + "px";
        this.div.style.borderTopWidth = isoPx;
        this.div.style.borderRightWidth = 0;
        this.div.style.borderBottomWidth = 0;
        this.div.style.borderLeftWidth = isoPx;
    }
    //no idea what this does, but we have to have it
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



