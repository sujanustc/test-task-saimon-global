const Package = require('../models/package')
exports.getList = async (req, res, next) => {
    try {
        const data = await Package.find().limit(10);

        res.status(200).json({
            staus: true.valueOf,
            message: "Package List Get Successfully!",
            data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message })
    }
};

exports.getPackageById = async (req, res, next) => {
    try {
        const { _id } = req.query;

        const data = await Package.findOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });
        res.status(200).json({
            status: true,
            message: "Package Get Successfully!",
            data: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.getListBySearch = async (req, res, next) => {
    try {
        let { filter } = req.query;

        let newFilter = {
            _id: { $ne: null },
            title: { $ne: null },
            startingPrice: { $ne: null },
            duration: { $ne: null },
            cityName: { $ne: null },
            isActive: true,
            isMostPopular: true
        }
        if (filter) {
            filter = JSON.parse(filter)
            newFilter = {
                _id: filter._id?? { $ne: null },
                title: filter.title?{ $regex: '.*' + filter.title + '.*' }:{$ne:null},
                startingPrice: filter.startingPrice??{$ne:null},
                duration: filter.duration??{$ne:null},
                cityName: filter.cityName??{$ne:null},
                isActive: filter.isActive??{$ne:null},
                isMostPopular: filter.isMostPopular??{$ne:null}
            }
        }
        console.log(filter.title, newFilter);

        const data = await Package.find(newFilter).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        return res.json({
            status: true,
            data: data,
            message: "Search Result Get Successfully!"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.addPackage = async (req, res, next) => {
    try {
        const { title, description, startingPrice, duration, isMostPopular, isActive, cityName } = req.body;
        if (!title || !cityName)
            return res.status(424).json({ status: false, error: "Missing Fields!" })

        const isPackageExist = await Package.findOne({ title: title }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        if (isPackageExist)
            return res.status(424).json({ status: false, error: "Title Already Exist!" })

        const package = new Package({
            title: title,
            description: description,
            startingPrice: startingPrice,
            duration: duration,
            isMostPopular: isMostPopular,
            isActive: isActive,
            cityName: cityName
        })

        const data = await package.save().catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });
        res.status(200).json({
            status: true,
            message: "Package Added Successfully!",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.updatePackage = async (req, res, next) => {
    try {
        const { _id, title, description, startingPrice, duration, isMostPopular, isActive, cityName } = req.body;
        if (!_id || !title || !cityName)
            return res.status(424).json({ status: false, error: "Missing Fields!" })

        const isPackageExist = await Package.findOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        if (!isPackageExist)
            return res.status(404).json({ status: false, error: "No Package Found!" })

        const isTitleExist = await Package.findOne({ title: title }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        if (isTitleExist && isPackageExist._id != isTitleExist._id)
            return res.status(424).json({ status: false, error: "Title Already Exist!" })

        const data = await Package.findOneAndUpdate({ _id: _id }, {
            title: title,
            description: description,
            startingPrice: startingPrice,
            duration: duration,
            isMostPopular: isMostPopular,
            isActive: isActive,
            cityName: cityName
        }, { new: true }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        res.status(200).json({
            status: true,
            message: "Package Updated Successfully!",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { _id } = req.query;

        const data = Package.deleteOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });


        res.status(200).json({
            success: true,
            message: "Package Deleted Successfully!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};