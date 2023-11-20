/*

// aggregation
db.test.aggregate([
    // stage1
    { $match: { gender: "Male", age: { $lt: 30 } } },
    // stage2
    { $project: { name: 1, age: 1, gender: 1 } }
])

// $addFields: adds a field only in the pipeline not in the actual doc
db.test.aggregate([
    // stage1
    { $match: { gender: "Male" } },
    // stage2
    { $addFields: { course: "level-2" } },
    // stage3
    { $project: { course: 1 } }
])

// $out: add fields and output to a new collection specified in $addFields
// with only fields specified in the $project stage if there is any
// otherwise just adds the additional fields specificed in $out
db.test.aggregate([
    // stage1
    { $match: { gender: "Male" } },
    // stage2
    { $addFields: { course: "level-2", eduTech: "Programming Hero", monerMoto: "Moner Iccha" } },
    // stage3
    // { $project: { course: 1, eduTech: 1 } },
    // stage4
    { $out: "course-students" }
])

// $merge: add fields to the specified collection when used with $addFields
db.test.aggregate([
    // stage1
    // { $match: { gender: "Male" } },
    // stage2
    { $addFields: { course: "level-2", eduTech: "Programming Hero", monerMoto: "Moner Iccha" } },
    // stage3
    { $merge: "test" }
])

// $group : grouping based on a certain field
// $count: sum up the each grouped data
db.test.aggregate([
    // stage1
    { $group: { _id: "$gender", count: { $sum: 1 } } },
])

// $push 
db.test.aggregate([
    {   // stage1
        $group: {
            _id: "$address.country",
            count: { $sum: 1 },
            // showMeName: { $push: "$name" } } 
            fullDoc: { $push: "$$ROOT" } // whole doc not just one field
        }
    },
    {
        $project: {
            "fullDoc.name": 1,
            "fullDoc.email": 1,
            "fullDoc.phone": 1
        }
    }
])

// $sum, $max, $min, $avg, $substract in $group
db.test.aggregate([
    {
        $group: {
            _id: null,
            totalSalary: { $sum: "$salary" },
            maxSalary: { $max: "$salary" },
            minSalary: { $min: "$salary" },
            avgSalary: { $avg: "$salary" },
        }
    },
    {
        $project: {
            totalSalary: 1,
            minSalary: 1,
            maxSalary: 1,
            averageSalary: "$avgSalary",
            rangeBtwMaxAndMin: { $subtract: ["$maxSalary", "$minSalary"] }
        }
    }
])

// $unwind = makes separate document for each of the elem of an array field
db.test.aggregate([
    // stage1
    { $unwind: "$friends" },
    // stage2
    {
        $group: {
            _id: "$friends",
            count: { $sum: 1 },
        }
    },
])

db.test.aggregate([
    // stage1
    { $unwind: "$interests" },
    {
        $group: {
            _id: "$age",
            interestsPerAge: { $push: "$interests" }
        }
    }
])
*/



