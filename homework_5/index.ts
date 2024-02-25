// Створіть класи Circle, Rectangle, Square і Triangle.
// У кожного з них є загальнодоступний метод calculateArea.
// У кожної фігури є загальнодоступні властивості - колір і назва,
// які не можна змінювати після створення.
// У Square і Rectangle зі свого боку є ще додатковий метод print,
// який виводить рядок із формулою розрахунку площі

const enum Shapes {
    Circle = "Circle",
    Rectangle = "Rectangle",
    Square = "Square",
    Triangle = "Triangle"
}

interface IShape {
    readonly name: string,
    readonly color: string,
    calculateArea(): number,
}

abstract class Shape implements IShape {
    protected _shapeInfo: string = `${this.name}-${this.color}`;
 
    constructor(readonly name: string, readonly color: string) {}

    static logShapeColor(shape: IShape): void {
        console.log(shape.color);
    }

    printShapeInfo(): void { 
        console.log(this._shapeInfo);
    }
    
    protected validateValues(values: {[key: string]: number}) {
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value !== "number" || value <= 0) {
                throw new Error(`The ${key} value of ${this.name} must be a positive number`)
            } 
        })
    }

    abstract calculateArea(): number
}

abstract class GeneralRectangle extends Shape {
    constructor(name: string, color: string, private _a: number, private _b: number) {
        super(name, color);
        this.validateValues({ _a, _b });
    }

    calculateArea(): number {
        return this._a * this._b;
    }

    print(): void {
        console.log(`${this.name}: Area = ${this._a} * ${this._b}`);
    }
}

class Square extends GeneralRectangle {
    constructor(color: string, _a: number) {
        super(Shapes.Square, color, _a, _a);
    }
}

class Rectangle extends GeneralRectangle {
    constructor(color: string, _a: number, _b: number) {
        super(Shapes.Rectangle, color, _a, _b);
    }
}

class Circle extends Shape {
    constructor(color: string, private _r: number) {
        super(Shapes.Circle, color);
        this.validateValues({ _r });
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this._r, 2);
    }
}

class Triangle extends Shape {
    constructor(color: string, private _a: number, private _h: number) {
        super(Shapes.Triangle, color);
        this.validateValues({ _a, _h });
    }

    calculateArea(): number {
        return (this._a * this._h) / 2;
    }
}


const circle = new Circle("red", 5);
circle.printShapeInfo();
console.log(circle.calculateArea());

const rectangle = new Rectangle("blue", 4, 5);
rectangle.print();
rectangle.printShapeInfo();
console.log(rectangle.calculateArea());

const square = new Square("green", 7);
square.print();
square.printShapeInfo();
console.log(square.calculateArea());

// const triangleErr = new Triangle("yellow", -2, 3); // Error: The _a value of Triangle must be a positive number
const triangle = new Triangle("yellow", 2, 3);
triangle.printShapeInfo();
console.log(triangle.calculateArea());

Shape.logShapeColor(triangle);

