//not complete, giving wrong answer
const {dog,cat}=require('./animal_hierarchy')

test("testcase1",()=>{
    let animal_1=new cat("billo","breed",24,"mouse");
    expect(animal_1.animal_name()).toBe("this animal's name isbillo")
})