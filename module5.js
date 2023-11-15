// field filtering
// db.test.find({gender: "Male"}, {gender: 1, name: 1, phone: 1})

// field filtering with chaining
// db.test.find({gender: "Male"}).project({name:1, gender:1, email: 1})

// mongodb operators
// db.test.findOne({gender: "Male"})

// equal to operator
// db.test.find({gender: {$eq: "Male"}})
// db.test.find({age: {$eq: 17}})

// not equal to operator 
// db.test.find({gender: {$ne: "Male"}})
// db.test.find({age: {$ne: 17}})

// greater than operator
// db.test.find({age: {$gt: 18}})

// greater than and equal operator
// db.test.find({age: {$gte: 18}})
// db.test.find({age: {$gte: 18}}).sort({age: 1})

// less than operator
// db.test.find({age: {$lt: 18}})

// less than and equal to operator
// db.test.find({age: {$lte: 18}}).sort({age: 1})

// implicit and 
// db.test.find({gender: "Female",age: {$gt: 18, $lt: 30}}, {age: 1, gender: 1}).sort({age: 1})

// $in => fetch all the docs that matches with the specified values
/*db.test.find(
    {
        gender: "Female",
        age: { $in: [18, 20, 22, 24, 28, 30] }
    },
    { age: 1, gender: 1 })
    .sort({ age: 1 }) 
*/

// $nin => not in the specified values 
/*db.test.find(
    {
        gender: "Female",
        age: { $nin: [18, 20, 22, 24, 28, 30] }
    },
    { age: 1, gender: 1 })
    .sort({ age: 1 }) 
*/

/*
db.test.find(
    {
        gender: "Female",
        age: { $nin: [18, 20, 22, 24, 28, 30] },
        // interests: "Cooking"
        interests: {$in: ["Cooking", "Gaming"]},
    },
    { age: 1, gender: 1, interests: 1 })
    .sort({ age: 1 }) 

*/
