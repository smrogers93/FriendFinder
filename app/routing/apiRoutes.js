var friendArray = require("../data/friends")

module.exports = function(app) {

    app.get("/api/survey", function(req, res) {
        res.json(friendArray)
    })
    
    function friendCompare(newFriend) {
        var totalDifference = 0
        var previousDifference = 9999999
        var name = ""
        var image = ""

        for (var i = 0; i < friendArray.length; i++) {
            var currentFriend = friendArray[i]

            for (var j = 0; j < currentFriend.questions.length; j++) {
                totalDifference += Math.abs(newFriend.questions[j] - currentFriend.questions[j])
                console.log(totalDifference)
            }

            if (totalDifference <= previousDifference) {
                name = currentFriend.name
                image = currentFriend.image
                previousDifference = totalDifference
                console.log(name, image)
            }
            totalDifference = 0
        }
        friendArray.push(newFriend)
        console.log(JSON.stringify(friendArray))
        var match = {name: name, image: image}
        return match
    }

    app.post("/api/survey", function(req, res) {
        var match = friendCompare(req.body)
        console.log(match)
        res.json(match)

    })
}