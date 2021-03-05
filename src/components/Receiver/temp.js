const model = {};
const friendList = [];


model.find({
    _id: {
        $nin: friendList,
    }
}, (err, result) => {

})



