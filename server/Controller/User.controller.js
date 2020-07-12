function create(req, res){
    console.log(req.body);
    res.status(200).json({data: 'done'});
}

module.exports = {
    create: create
};
