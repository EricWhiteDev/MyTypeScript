
describe("Array tests", () =>
{
    test("array init", () =>
    {
        const a1 = [1, 2, 3];
        expect(a1.length).toBe(3);
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

    // Every object is linked to a prototype object from which it can inherit properties.
    // All objects created from object literals are linked to Object.prototype, an object that comes standard with JavaScript.
    // When you make a new object, you can select the object that should be its prototype.
    // TODO this doesn't compile
    // test("Object.create", () =>
    // {
    //     var stooge = {
    //         "first-name": "Jerome",
    //         "last-name": "Howard"
    //     };

    //     if (typeof Object.create !== 'function') {
    //         Object.create = function (o): any
    //         {
    //             var F = function () {};
    //             F.prototype = o;
    //             return new F();
    //         };
    //     }

    //     var anotherStooge = Object.create(stooge);
    // })

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

