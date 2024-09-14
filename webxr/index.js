function human(_age, _name)
{
    function walk()
    {
        console.log("Walking")
    }
    // age = _age
    // name = _name
    return {
        age : _age,
        name : _name,
        walk
    }
}

const hari = human(18, "Hari");
console.log(hari.name);
console.log(hari.age);
hari.walk();