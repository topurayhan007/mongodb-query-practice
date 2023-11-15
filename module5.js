/*
// field filtering
db.test.find({ gender: "Male" }, { gender: 1, name: 1, phone: 1 })

// field filtering with chaining
db.test.find({ gender: "Male" }).project({ name: 1, gender: 1, email: 1 })

// mongodb operators
db.test.findOne({ gender: "Male" })

// equal to operator
db.test.find({ gender: { $eq: "Male" } })
db.test.find({ age: { $eq: 17 } })

// not equal to operator
db.test.find({ gender: { $ne: "Male" } })
db.test.find({ age: { $ne: 17 } })

// greater than operator
db.test.find({ age: { $gt: 18 } })

// greater than and equal operator
db.test.find({ age: { $gte: 18 } })
db.test.find({ age: { $gte: 18 } }).sort({ age: 1 })

// less than operator
db.test.find({ age: { $lt: 18 } })

// less than and equal to operator
db.test.find({ age: { $lte: 18 } }).sort({ age: 1 })

// implicit and
db.test.find({ gender: "Female", age: { $gt: 18, $lt: 30 } }, { age: 1, gender: 1 }).sort({ age: 1 })

// $in => fetch all the docs that matches with the specified values
db.test.find(
    {
        gender: "Female",
        age: { $in: [18, 20, 22, 24, 28, 30] }
    },
    { age: 1, gender: 1 })
    .sort({ age: 1 })


// $nin => not in the specified values
db.test.find(
    {
        gender: "Female",
        age: { $nin: [18, 20, 22, 24, 28, 30] }
    },
    { age: 1, gender: 1 })
    .sort({ age: 1 })



db.test.find(
    {
        gender: "Female",
        age: { $nin: [18, 20, 22, 24, 28, 30] },
        // interests: "Cooking"
        interests: { $in: ["Cooking", "Gaming"] },
    },
    { age: 1, gender: 1, interests: 1 })
    .sort({ age: 1 })


// $and (explicit)
db.test.find({ age: { $ne: 15, $lte: 30 })

db.test.find({
    $and: [
        { gender: "Female" },
        { age: { $ne: 15 } },
        { age: { $lte: 30 } }
    ]
}).project({ age: 1, gender: 1 })
    .sort({ age: 1 })

// $or (explicit)
db.test.find({
    $or: [
        { interests: "Travelling" },
        { interests: "Cooking" },
    ]
}).project({ interests: 1 })
    .sort({ age: 1 })


db.test.find({
    $or: [
        { "skills.name": "JAVASCRIPT" },
        { "skills.name": "PYTHON" },
    ]
}).project({ "skills.name": 1 })
    .sort({ age: 1 })


// implicit
db.test.find(
    {
        "skills.name":
            { $in: ["JAVASCRIPT", "PYTHON"] }
    }).project({ "skills.name": 1 })
    .sort({ age: 1 })



// $nor => this operator is used to get results of which will work like
// not and or at the same time, it will also give result if the field to query
// is not available
db.test.find({
    $nor: [
        { interests: "Cooking" },
        { age: { $gt: 30 } },
        { "gender.value": "Female" } // "gender.value" doesn't exists yet gives output
    ]
}).project({ interest: 1, age: 1, gender: 1 })
    .sort({ age: 1 })


// $not  
// { field: { $not: { <operator-expression> } } }

// $exists  
db.test.find({age: {$exists: true}})
db.test.find({phone: {$exists: true}})
db.test.find({un: {$exists: true}})

*/


