
function Person(name,age){
    this.name = name;
    this.age = age
}
Person.prototype.introduce = function(){
    console.log("I am " + this.name + " and I am " + this.age)
}
function Adult(name,age,sex,work){
    Person.call(this,name,age)
    this.sex = sex
    this.work = work
}
Adult.prototype.__proto__ = Person.prototype
Adult.prototype.constructor = Adult
Adult.prototype.say = function(){
    console.log(this.sex,this.age)
}
var a2 = new Adult("Lee",20,"male","front-end developer")