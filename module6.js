
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

// $bucket: this helps to organize group by a range by setting boundaries
db.test.aggregate([
    // stage1
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "80 er uporer bura gula",
            output: {
                count: { $sum: 1 },
                karakaraAse: { $push: "$$ROOT" }
            }
        }
    },
    // stage2
    {
        $sort: { count: -1 }
    },
    // stage3
    {
        $limit: 3
    },
    // stage4
    {
        $project: { count: 1}
    }
])

// $facet = multi pipeline
db.test.aggregate([
    {
        $facet: {
            // pipeline1
            "friendsCount" [
                // stage1
                { $unwind: "$friends" },
                // stage2
                { $group: { _id: "$friends", count: { $sum: 1 } } }
            ],
            // pipeline2
            "educationCount": [
                // stage1
                { $unwind: "$education" },
                // stage2
                { $group: { _id: "$education", count: { $sum: 1 } } }
            ],
            // pipeline3
            "skillsCount": [
                // stage1
                { $unwind: "$skills" },
                // stage2
                { $group: { _id: "$skills", count: { $sum: 1 } } }
            ]
        }
    }
])

// two ways to keep data by: embedding and referencing
// referencing used with foreign key to manage large data and 1:M M:M
// $lookup: joining two tables/collection
db.orders.aggregate([
    {
        $lookup: {
            from: "test",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    }
])

// Indexing: to fetch data much quicker by creating index
// indexing used IDHACK 
db.test.find({"_id" : ObjectId("6406ad63fc13ae5a40000065")}).explain("executionStats")
// indexing used COLLSCAN
db.test.find({"email" : "weffnert2r@networkadvertising.org"}).explain("executionStats")
db.getCollection("massive-data").createIndex({ email: 1 })

// Compound Index: multiple index

// Search Index
// create search index
db.getCollection("massive-data").createIndex({ about: "text" })

// find using search index
db.getCollection("massive-data").find({ $text: { $search: "dolor" } }).project({ about: 1 })
