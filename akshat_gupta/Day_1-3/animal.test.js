const {Animal,Dog,Cat} = require('./animal')

test("should return correct age when dog object asks age", () => {
    let d = new Dog("dog","canine","lab","brown",12)
    const found=d.getAge()
    expect(found).toBe(12)
})

test("should return correct age when cat object asks age", () => {
    let c = new Cat("cat","feline","persian","brown",12)
    const found=c.getAge()
    expect(found).toBe(12)
})

test("should return correct sound when dog object asks to say hello", () => {
    let d = new Dog("dog","canine","lab","black",16)
    const found=d.sayHello()
    expect(found).toBe("bark...woof...bark..!!")
})

test("should return correct sound when cat object asks to say hello", () => {
    let c = new Cat("cat","feline","persian","brown",12)
    const found=c.sayHello()
    expect(found).toBe("meow?!")
})

test("animal class function to get type should work on both cat and dog objects", () => {
    let d = new Dog("dog","canine","lab","black",16)
    let c = new Cat("cat","feline","persian","brown",12)
    const found=d.getType()
    const found2=c.getType()
    expect(found).toBe("dog")
    expect(found2).toBe("cat")
})