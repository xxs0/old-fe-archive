var Person = (function(){
    var name = "Lee"
    function sayName(){
        console.log("I am ",name)
    }
    return {
        name: name,
        sayName: sayName
    }
})()