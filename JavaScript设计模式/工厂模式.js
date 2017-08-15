function createPerson(opts){
    var person = {
        name: opts.name || "Jane"
    };
    person.sayName = function(){
        console.log(this.name);
    }
    return person
}
var p1 = createPerson({name: "Lee"});
var p2 = createPerson({name: "Tom"})