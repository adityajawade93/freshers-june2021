//not complete, giving wrong answer
const {Animal,Dog,Cat}=require('./animal_hierarchy_behind.js')

test("testcase1",()=>{
    let animal_1=new Cat('billo','breed',24,'mouse')
    expect(animal_1.animal_name()).toEqual("this animal name is billo")
})

test("testcase2",()=>{
    let animal_2=new Dog('fuzz','german sheperd',55,'bhow bhow')
    expect(animal_2.mysound()).toEqual("i am dog and my sound is bhow bhow")
})

test("testcase3",()=>{
    let animal_3=new Cat('billo','breed',24,'mouse')
    expect(animal_3).toEqual({ name:'billo',breed:'breed',weight:24,food:'mouse'})
})

test("testcase4",()=>{
    let animal_4=new Cat('billo','breed',24,'mouse')
    expect(animal_4.fav_food()).toEqual("i am cat and my favourite food is mouse")
})

test("testcase5",()=>{
    let animal_5=new Dog('fuzz','german sheperd',55,'bhow bhow')
    expect(animal_5.weight).toEqual(55)
})