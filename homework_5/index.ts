// Створіть класи Circle, Rectangle, Square і Triangle.
// У кожного з них є загальнодоступний метод calculateArea.
// У кожної фігури є загальнодоступні властивості - колір і назва,
// які не можна змінювати після створення.
// У Square і Rectangle зі свого боку є ще додатковий метод print,
// який виводить рядок із формулою розрахунку площі

enum Shapes {
    Circle = "Circle",
    Rectangle = "Rectangle",
    Square = "Square",
    Triangle = "Triangle"
}

interface IShape {
    readonly name: string,
    readonly color: string,
}

class Shape implements IShape {
    protected shapeInfo: string = `${this.name}-${this.color}`;
 
    constructor(readonly name: string, readonly color: string) { }

    static logShapeColor(shape: IShape): void {
        console.log(shape.color);
    }

    printShapeInfo(): void {
        console.log(this.shapeInfo);
    }
}

class Circle extends Shape {
    private readonly r: number;

    constructor(color: string, r: number) {
        super(Shapes.Circle, color);
        this.r = r;
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.r, 2);
    }
}

class Rectangle extends Shape {
    private readonly w: number;
    private readonly h: number;

    constructor(color: string, w: number, h: number) {
        super(Shapes.Rectangle, color);
        this.w = w;
        this.h = h;
    }

    calculateArea(): number {
        return this.w * this.h;
    }

    print(): void {
        console.log(`${this.name}: Area = ${this.w} * ${this.h}`);
    }
}

class Square extends Rectangle {
    override readonly name: string;
    protected override shapeInfo: string;

    constructor(color: string, a: number) {
        super(color, a, a);
        this.name = Shapes.Square;
        this.shapeInfo = `${this.name}-${this.color}`;
    }
}

class Triangle extends Shape {
    private readonly a: number;
    private readonly h: number;

    constructor(color: string, a: number, h: number) {
        super(Shapes.Triangle, color);
        this.a = a;
        this.h = h;
    }

    calculateArea(): number {
        return (this.a * this.h) / 2;
    }
}


const circle = new Circle("red", 5);
circle.printShapeInfo();

const rectangle = new Rectangle("blue", 4, 5);
rectangle.print();
rectangle.printShapeInfo();

const square = new Square("green", 7);
square.print();
square.printShapeInfo();

const triangle = new Triangle("yellow", 2, 3);
triangle.printShapeInfo();

Shape.logShapeColor(triangle);