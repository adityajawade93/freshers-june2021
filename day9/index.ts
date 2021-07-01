// function sum(a: number, b: number): number {
//   return a + b;
// }

// console.log(sum(5, 6));

// type ObjectType = {
//   a: number;
//   b: number;
//   name?: string;
// };

// type TodoSchema = {
//   uuid: string;
//   title: string;
//   content: string;
//   date: Date;
//   status: boolean;
// };

// interface ITodo {
//   uuid: string;
//   title: string;
// }

// let todo: ITodo = {
//   uuid: "Fdafa",
//   title: "fdafa",
//   content: "fdsafa",
// };

// interface ITodo {
//   content: string;
//   date: Date;
//   status: boolean;
// }

// axios.get<ITodo>()

// function add<T>(a: T, b: T): T {
//   return a + b;
// }

// type combinedType = ObjectType & TodoSchema;

// let obj: ITodo;

// class Person {
//   private name: string;
//   private readonly PI: number = Math.PI;
//   constructor(name: string) {
//     this.name = name;
//   }

//   public greet(): string {
//     let message = this.generateMessage();
//     return message;
//   }

//   private generateMessage(): string {
//     return `hello ${this.name} and the value of pi is ${this.PI}`;
//   }
// }

// let person1 = new Person("aditya");
// console.log(person1.greet());