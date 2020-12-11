// // TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return 'Employee'
    }

}

module.exports=Employee


// learning example from tutor below:

// var dog={
//     name:"wolfy",
//     haricolor:"black"
// }

// var cat={
//     name:"meow",
//     haricolor:"blue"
// }

// class Animal{
//     constructor(name,haricolor){
//         this.name=name
//         this.haricolor=haricolor
//     }
//     getName(){
//         return this.name
//     }
//     getHaircolor(){
//         return this.haricolor
//     }
// }

// var dog=new Animal("wolfy","black")
// var cat=new Animal("meow","blue")