use('sample_mflix')

db.comments.findOne({
    name: "Tanver"

})

let i = 5;
while (i > 1) {
    db.comments.insertOne({
        name: Math.random().toString(36).substring(7),
    });

    i--
}