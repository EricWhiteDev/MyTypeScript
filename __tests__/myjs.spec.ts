// Good tutorial

// https://www.tutorialsteacher.com/typescript

describe("array", () =>
{
    test("array init", () =>
    {
        const a1 = [1, 2, 3];
        expect(a1.length).toBe(3);
    })

    test("array compare array equality", () =>
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

describe("enum", () =>
{
    // Enums are always assigned numeric values when they are stored. The first
    // value always takes the numeric value of 0, while the other values in the
    // enum are incremented by 1.
    test("simple enum", () =>
    {
        enum PrintMedia {
            Newspaper,
            Newsletter,
            Magazine,
            Book
        }

        const pm: PrintMedia = PrintMedia.Newsletter;
        expect(pm).toBe(1);
    })

    test("initialized enum", () =>
    {
        enum PrintMedia {
            Newspaper = 100,
            Newsletter = 200,
            Magazine = 300,
            Book = 400
        }

        const pm: PrintMedia = PrintMedia.Newsletter;
        expect(pm).toBe(200);
    })

    test("string enum", () =>
    {
        enum PrintMedia {
            Newspaper = "NEWSPAPER",
            Newsletter = "NEWSLETTER",
            Magazine = "MAGAZINE",
            Book = "BOOK"
        }

        expect(PrintMedia.Newspaper).toBe("NEWSPAPER");
        expect(PrintMedia['Magazine']).toBe("MAGAZINE");
    })
})

describe("tuple", () =>
{
    test("tuple", () =>
    {
        var employee: [number, string] = [1, "Steve"];

        expect(employee[0]).toBe(1);
        expect(employee[1]).toBe("Steve");

        // TypeScript generates an array in JavaScript for the tuple variable.
        // For example, var employee: [number, string] = [1, 'Steve'] will be
        // compiled as var employee = [1, "Steve"] in JavaScript.

        // We can access tuple elements using index, the same way as an array.
        // An index starts from zero.
    })

    test("push onto tuple", () =>
    {
        var employee: [number, string] = [1, "Steve"];
        employee.push(2, "Bill");
        expect(employee.toString()).toBe("1,Steve,2,Bill");
    })

    test("tuple2", () =>
    {
        var user: [number, string, boolean, number, string];// declare tuple variable
        user = [1, "Steve", true, 20, "Admin"];// initialize tuple variable

        expect(user[0]).toBe(1);
        expect(user[1]).toBe("Steve");
        expect(user[2]).toBe(true);
        expect(user[3]).toBe(20);
        expect(user[4]).toBe("Admin");
    })

    test("array of tuple", () =>
    {
        var employee: [number, string][];
        employee = [[1, "Steve"], [2, "Bill"], [3, "Jeff"]];

        expect(employee[0][0]).toBe(1);
        expect(employee[0][1]).toBe("Steve");
        expect(employee[1][0]).toBe(2);
        expect(employee[1][1]).toBe("Bill");
        expect(employee[2][0]).toBe(3);
        expect(employee[2][1]).toBe("Jeff");
    })
})

// Every value has a type, but types do not have values. Constructs such as type
// and interface exist only in the type space.

// Some constructs such as class or enum introduce both a type and a value.

// typeof, this, and many other operators and keywords have different meanings
// in type space and value space.

describe("types", () =>
{
    // In the following example, the type declaration says that age is a number.
    // But any lets you assign a string to it. The type checker will believe
    // that it’s a number (that’s what you said, after all), and the chaos will
    // go uncaught.
    test("as any", () =>
    {
        let age: number;
        age = '12' as any;
        expect(age).toBe('12');

        age += 1;
        expect(age).toBe('121');
    })

    test("extends", () =>
    {
        interface Vector1D { x: number; }
        interface Vector2D extends Vector1D { y: number; }
        interface Vector3D extends Vector2D { z: number; }

        let v1D: Vector1D =
        {
            x: 42,
        };
        expect(v1D.x).toBe(42);

        let v2D: Vector2D =
        {
            x: 42,
            y: 10,
        }
        expect(v2D.x).toBe(42);
        expect(v2D.y).toBe(10);

        let v3D: Vector3D =
        {
            x: 142,
            y: 12,
            z: 11,
        }
        expect(v3D.x).toBe(142);
        expect(v3D.y).toBe(12);
        expect(v3D.z).toBe(11);
    })

    test("type space or value space", () =>
    {
        // this is in type space
        interface Cylinder {
            radius: number;
            height: number;
        }

        // this is in value space
        const Cylinder = (radius: number, height: number) => ({ radius, height });

        // Generally the symbols after a type or interface are in type space
        // while those introduced in a const or let declaration are values.

        // Statements in TypeScript can alternate between type space and value
        // space. The symbols after a type declaration (:) or an assertion (as)
        // are in type space while everything after an = is in value space.
    })

    test("typeof in type and value space", () =>
    {
        // There are many operators and keywords that mean different things in a
        // type or value context. typeof, for instance:

        class Cylinder {
            radius = 1;
            height = 1;
        }

        let c: Cylinder = {
            radius: 11,
            height: 22,
        }

        type T1 = typeof c;  // t1 is Cylinder
        let c2: T1 = {
            radius: 111,
            height: 222,
        }

        const v1 = typeof c; // v1 is "object"
        expect(v1).toBe("object");

        // In a value context, typeof is JavaScript’s runtime typeof operator.
        // It returns a string containing the runtime type of the symbol. This
        // is not the same as the TypeScript type!
        
        // JavaScript’s runtime type system is much simpler than TypeScript’s
        // static type system. In contrast to the infinite variety of TypeScript
        // types, JavaScript’s typeof operator has historically only had six
        // possible return values: “string,” “number,” “boolean,” “undefined,”
        // “object,” and “function.”
    })

    test("using another objects property as a type", () =>
    {
        class Cylinder {
            radius = 1;
            height = 1;
        }

        // but this is pretty weird
        const r1: Cylinder['radius'] = 23; // type is number
        expect(r1).toBe(23);
    })

    test("type declarations vs type assertions", () =>
    {
        interface Person { name: string };

        // this is good
        const alice: Person = { name: 'Alice' };  // Type is Person

        // this is bad
        const bob = { name: 'Bob' } as Person;  // Type is Person

        // why:

        // const alice2: Person = {};
        // ~~~~~ Property 'name' is missing in type '{}'
        //       but required in type 'Person'

        const bob2 = {} as Person;  // No error (but we want the error)
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

        // What is interesting is that you never declared the relationship
        // between Vector2D and NamedVector. And you did not have to write an
        // alternative implementation of calculateLength for NamedVectors.
        // TypeScript’s type system is modeling JavaScript’s runtime behavior
        // (Item 1). It allowed calculateLength to be called with a NamedVector
        // because its structure was compatible with Vector2D. This is where the
        // term “structural typing” comes from.

        const l = calculateLength(v);  // OK, result is 5

        expect(l).toBe(5);
    })

    // The general rule is that the values in an intersection type contain the
    // union of properties in each of its constituents.
    test("union of types / intersection of types", () =>
    {
        interface Person {
            name: string;
        }
        interface Lifespan {
            birth: Date;
            death?: Date;
        }
        type PersonSpan = Person & Lifespan;

        const ps: PersonSpan = {
            name: 'Alan Turing',
            birth: new Date('1912/06/23'),
            death: new Date('1954/06/07'),
        };  // OK

        expect(ps.name).toBe('Alan Turing');
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
    // TypeScript does provide a facility for overloading functions, but it
    // operates entirely at the type level. You can provide multiple
    // declarations for a function, but only a single implementation:
    test("function overload", () =>
    {
        // these first two only provide type information.  When TypeScript
        // produces JavaScript output, they are removed, and only the
        // implementation remains.
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

// This works because class Rectangle introduces both a type and a value,
// whereas interface only introduced a type. The Rectangle in type Shape =
// Square | Rectangle refers to the type, but the Rectangle in shape instanceof
// Rectangle refers to the value. This distinction is important to understand
// but can be quite subtle.
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

describe("keyof", () =>
{
    test("keyof1", () =>
    {
        type Staff = {
            name: string;
            salary: number;
        }
        type staffKeys = keyof Staff; // "name" | "salary"
        let staffKeys = 'name';
        expect(staffKeys).toBe('name');
        staffKeys = 'salary';
        expect(staffKeys).toBe('salary');
    })

    test("keyof2", () =>
    {
        type BooleanKeys = keyof boolean; // "valueOf"
        let bk: BooleanKeys;
        bk = 'valueOf';
        expect(bk).toBe('valueOf');
    })

    test("keyof3", () =>
    {
        let bk: keyof boolean; // "valueOf"
        bk = 'valueOf';
        expect(bk).toBe('valueOf');
        // As you can see, it’s less useful when applied to primitive types.
    })

    test("keyof4", () =>
    {
        const user = {
            name: 'John',
            age: 32
        };

        // output: Array ["name", "age"]
        expect(Object.keys(user)).toEqual(
            [ 'name', 'age' ]
        )

        let property: keyof typeof user; // Type is 'name' | 'age'
        let a: string[] = [];
        for (property in user)
        {
            a.push(`${property}: ${user[property]}`);
        }
        expect(a).toStrictEqual(
            ["name: John", "age: 32"]
        )
    })

    test("keyof5", () =>
    {
        interface Type1 {
            a1: string;
            a2: string;
        }
        interface Type2 {
            a2: string;
            a3: string;
        }

        let type1Prop: keyof Type1;
        type1Prop = "a1"; // ok
        expect(type1Prop).toBe("a1");
        type1Prop = "a2"; // ok
        expect(type1Prop).toBe("a2");
        
        let anded: Type1 & Type2;
        let andedProp: keyof typeof anded;
        andedProp = "a1";
        expect(andedProp).toBe("a1");
        andedProp = "a2";
        expect(andedProp).toBe("a2");
        andedProp = "a3";
        expect(andedProp).toBe("a3");

        let ored: Type1 | Type2;
        let ordedProp: keyof typeof ored;
        // ordedProp = "a1"; // not ok
        // expect(ordedProp).toBe("a1");
        ordedProp = "a2";
        expect(ordedProp).toBe("a2");
        // ordedProp = "a3"; // not ok
        // expect(ordedProp).toBe("a3");

        // In value space & and | are bitwise AND and OR. In type space they are
        // the intersection and union operators.
    })

    test("enumeration of properties", () =>
    {
        const obj = {
            foo: 'foo',
            bar: 10
        }

        //let property: keyof typeof obj; // Type is 'foo' | 'bar'
        let property: 'foo' | 'bar';

        let a = [];
        for (property in obj) {
            a.push(`${property}: ${obj[property]}`);
        }
        expect(a[0]).toBe('foo: foo');
        expect(a[1]).toBe('bar: 10');
        expect(a.length).toBe(2);
    })
})

describe("object tests", () =>
{
    // a property's name can be any string, including the empty string.

    // the quotes around a property's name in an object literal are optional if
    // the name would be a legal JavaScript name, and not a reserved word.
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

    // Both are suitable solutions but generally speaking keyof T is good for
    // constants or in situations where you know the object won’t have
    // additional keys and you want precise keys.
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

    // Object.entries() creates an array of tuples (key and value) that we can
    // iterate over through a simple forEach() loop.

    // note that the old javascript way of iterating through properties is now
    // obsolete.

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

