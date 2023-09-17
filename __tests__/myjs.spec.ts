
describe("Array tests", () =>
{
    test("array init", () =>
    {
        const a1 = [1, 2, 3];
        expect(a1.length).toBe(3);
    })

    test("array compare", () =>
    {
        const a = [];
        a.push({ first: 'Eric', last: 'White' });
        a.push({ first: 'Asher', last: 'White' });

        expect(a).toEqual(
            [
                { first: 'Eric', last: 'White' },
                { first: 'Asher', last: 'White' }
            ]
        )
    })
})

describe("structural typing", () =>
{
    // Understand that JavaScript is duck typed and TypeScript uses structural
    // typing to model this: values assignable to your interfaces might have
    // properties beyond those explicitly listed in your type declarations.
    // Types are not “sealed.”

    // Be aware that classes also follow structural typing rules. You may not
    // have an instance of the class you expect!

    // Use structural typing to facilitate unit testing.

    test("structural type", () =>
    {
        interface Vector2D {
            x: number;
            y: number;
        }

        function calculateLength(v: Vector2D) {
            return Math.sqrt(v.x * v.x + v.y * v.y);
        }

        interface NamedVector {
            name: string;
            x: number;
            y: number;
        }

        const v: NamedVector = { x: 3, y: 4, name: 'Zee' };

        // What is interesting is that you never declared the relationship between Vector2D and NamedVector.
        // And you did not have to write an alternative implementation of calculateLength for NamedVectors.
        // TypeScript’s type system is modeling JavaScript’s runtime behavior (Item 1). It allowed calculateLength
        // to be called with a NamedVector because its structure was compatible with Vector2D. This is where the 
        // term “structural typing” comes from.

        const l = calculateLength(v);  // OK, result is 5

        expect(l).toBe(5);
    })
})


describe("interface", () =>
{
    test("interface", () =>
    {
        interface State {
            name: string;
            capital: string;
        }
        const states: State[] = [
            {name: 'Alabama', capital: 'Montgomery'},
            {name: 'Alaska',  capital: 'Juneau'},
            {name: 'Arizona', capital: 'Phoenix'},
        ];

        // for (const state of states) {
        //     console.log(state.capital);
        // }

        expect(states[0].name).toBe('Alabama');
    })
})

describe("function", () =>
{
    // TypeScript does provide a facility for overloading functions, but it operates entirely at the type level. You can provide multiple declarations for a function, but only a single implementation:
    test("function overload", () =>
    {
        // these first two only provide type information.  When TypeScript produces JavaScript output, they are
        // removed, and only the implementation remains.
        function add(a: number, b: number): number;
        function add(a: string, b: string): string;
        
        function add(a: any, b: any) {
          return a + b;
        }
        
        const three = add(1, 2);  // Type is number
        expect(three).toBe(3);
        const twelve = add('1', '2');  // Type is string
        expect(twelve).toBe('12');
    })
})

// test if instance of class
// This works because class Rectangle introduces both a type and a value, whereas interface only introduced a type.
// The Rectangle in type Shape = Square | Rectangle refers to the type, but the Rectangle in shape instanceof Rectangle
// refers to the value. This distinction is important to understand but can be quite subtle.
describe("class", () =>
{
    test("class", () =>
    {
        class Square {
            constructor(public width: number) { }
        }
        class Rectangle extends Square {
            constructor(public width: number, public height: number) {
                super(width);
            }
        }
        type Shape = Square | Rectangle;

        function calculateArea(shape: Shape) {
            if (shape instanceof Rectangle) {
                shape;  // Type is Rectangle
                return shape.width * shape.height;
            } else {
                shape;  // Type is Square
                return shape.width * shape.width;  // OK
            }
        }

        const r: Rectangle = new Rectangle(3, 6);

        const a = calculateArea(r);
        expect(a).toBe(18);
    })
})

describe("object tests", () =>
{
    // a property's name can be any string, including the empty string.
    // the quotes around a property's name in an object literal are optional if the name would be a legal
    // JavaScript name, and not a reserved word.
    test("object literal", () =>
    {
        var stooge = {
            "first-name": "Jerome",
            "last-name": "Howard"
        };
        expect(stooge["first-name"]).toBe("Jerome");
        expect(stooge["last-name"]).toBe("Howard");
        var stooge2 = {
            firstName: "Jerome",
            lastName: "Howard"
        };
        expect(stooge2.firstName).toBe("Jerome");
        expect(stooge2.lastName).toBe("Howard");
    })

    test("objects can nest / nested object literal", () =>
    {
        var flight = {
            airline: "Oceanic",
            number: 815,
            departure: {
                IATA: "SYD",
                time: "2004-09-22 14:55",
                city: "Sydney"
            },
            arrival: {
                IATA: "LAX",
                time: "2004-09-23 10:42",
                city: "Los Angeles"
            }
        };
        expect(flight.departure.IATA).toBe("SYD");
    })

    test("retrieving non-existent property returns undefined", () =>
    {
        var foo: any = {
            a: 1,
            b: 2
        }
        var z = "bar";
        expect(foo[z]).toBe(undefined);
        z = "a";
        expect(foo[z]).toBe(1);
    })
    
    test("The || operator can be used to fill in default values", () =>
    {
        var foo: any = {
            a: 1,
            b: 2
        }
        var z = "bar";
        var zap = foo[z] || 123;
        expect(zap).toBe(123);
    })

    // dont care - can add properties to an object after construction.

    // Objects are passed around by reference. They are never copied.
    test("objects are passed by reference", () =>
    {
        var a = {}, b = {}, c = {};
        // a, b, and c each refer to a
        // different empty object
        expect(a == b).toBe(false);
        expect(b == c).toBe(false);
        a = b = c = {};
        expect(a == b).toBe(true);
        expect(b == c).toBe(true);
    })

    test("typeof hasOwnProperty", () =>
    {
        var flight = {
            airline: "Oceanic",
            number: 815,
            departure: {
                IATA: "SYD",
                time: "2004-09-22 14:55",
                city: "Sydney"
            },
            arrival: {
                IATA: "LAX",
                time: "2004-09-23 10:42",
                city: "Los Angeles"
            }
        };
        expect(typeof flight.number).toBe("number");
        expect(typeof flight.airline).toBe("string");
        expect(typeof flight.arrival).toBe("object");
        // can't do the following, the typescript compiler will not allow
        // expect(typeof flight.manifest).toBe("undefined");
        expect(typeof flight.toString).toBe("function");
        expect(typeof flight.constructor).toBe("function");
        expect(flight.hasOwnProperty('number')).toBe(true);
        expect(flight.hasOwnProperty('constructor')).toBe(false);
    })

    // the following are two ways to iterate through properties.
    // Both are suitable solutions but generally speaking keyof T is good for constants or in situations where
    // you know the object won’t have additional keys and you want precise keys.
    test("enumeration of properties", () =>
    {
        const obj = {
            foo: 'foo',
            bar: 10
        }

        let property: keyof typeof obj; // Type is 'foo' | 'bar'

        let a = [];
        for (property in obj) {
            a.push(`${property}: ${obj[property]}`);
        }
        expect(a[0]).toBe('foo: foo');
        expect(a[1]).toBe('bar: 10');
        expect(a.length).toBe(2);
    })

    // Object.entries() creates an array of tuples (key and value) that we can iterate over through a simple forEach() loop.
    // note that the old javascript way of iterating through properties is now obsolete.
    // iterate through properties.
    test("Object.entries enumeration of properties", () =>
    {
        const obj = {
            foo: 'foo',
            bar: 10
        }

        let a: any[] = []
        Object
            .entries(obj)
            .forEach(([key, value]) => a.push(`${key}: ${value}`));
        expect(a[0]).toBe('foo: foo');
        expect(a[1]).toBe('bar: 10');
        expect(a.length).toBe(2);
    })

    // test whether an object has a property
    // if ('height' in shape)
    test("does object have property", () =>
    {
        interface Square {
            width: number;
        }
        interface Rectangle extends Square {
            height: number;
        }
        type Shape = Square | Rectangle;

        function calculateArea(shape: Shape) {
            if ('height' in shape) {
                return shape.width * shape.height;
            } else {
                return shape.width * shape.width;
            }
        }
        
        const r: Rectangle = {
            width: 4,
            height: 8,
        }

        const a = calculateArea(r);
        expect(a).toBe(32);
    })
})

describe("String tests", () =>
{
    test("character code points in literal", () =>
    {
        const s1 = "\u0041";
        expect(s1).toBe('A');
    })
    test("toUpperCase", () =>
    {
        const s = "cat";
        expect(s.toUpperCase()).toBe('CAT');
    })
})

describe("Number tests", () =>
{
    test("isNaN", () =>
    {
        const n1 = NaN;
        expect(isNaN(n1)).toBe(true);
    })
    test("Math.floor", () =>
    {
        const n = 3.14159;
        expect(Math.floor(n)).toBe(3);
    })
})

