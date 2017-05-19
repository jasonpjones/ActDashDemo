function isGuid(sGuid) {

    var len = sGuid.length,
  	dashes = [],
    expected = [8,13,18,23];
    if(len !== 36) {
        return false;
    }

    for(var i=0;i<sGuid.length;i++) {
        if(sGuid[i] === "-") {
            dashes.push(i);
        }
    }
  
    if (dashes.length != expected.length)
    {
        return false;
    }
  
    for (var a=0;a<dashes.length;a++) {
        if(dashes[a] !==  expected[a]) {
            return false;
        }
    }
    return true
}


var options = {
    name: "Jason",
    sex: "Male",
    favoriteColor: "Green",
    petsName: "Ahmi",
    carType: "Truck",
    objProp: {
        foo: "foo",
        bar: "bar",
        foobar: "foobar"
    }
};

var options2 = {
    favoriteColor: "Gray",
    carType: "Badass Truck",
    carModel: "Tundra",
    hobbies: ['fishing', 'hunting', 'horn hunting'],
    objProp: {
        food: "apple",
        foobar: "zzzzzzzz"
    }
}

function mergeThem() {
    if (typeof Object.assign === 'function') {
        console.log("new school");
        Object.assign(options, options2);
    }
    else {
        console.log("old school");
        for (var attrname in options2) { options[attrname] = options2[attrname]; }

    }
    console.log(options);
}



