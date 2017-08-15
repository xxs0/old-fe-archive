var singleton = (function(){
    var instance
    function init(){
        var name = "Lee"
        var sayName = function(){
            console.log("I am ",name)
        }
        return {
            name: name,
            sayName: sayName
        }
    }
    return {
        getInstance: function(){
            if(!instance){
                instance = init()
            }
            return instance
        }
    }
})()
var p1 = singleton.getInstance()
var p2 = singleton.getInstance()
p1 === p2 //true