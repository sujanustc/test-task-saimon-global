const Plan = require('../models/Plan')
exports.getList = async (req, res, next) => {
    try {
        const data = await Plan.find().limit(10);

        res.status(200).json({
            staus: true.valueOf,
            message: "Plan List Get Successfully!",
            data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message })
    }
};

exports.getPlanById = async (req, res, next) => {
    try {
        const { _id } = req.query;

        const data = await Plan.findOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });
        res.status(200).json({
            status: true,
            message: "Plan Get Successfully!",
            data: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.addPlan = async (req, res, next) => {
    try {
        const { packageId, singlePerPax, doublePerPax, twinPerPax, triplePerPax, child7To12, child3To6 } = req.body;
        if (!packageId)
            return res.status(424).json({ status: false, error: "Missing Fields!" })

        const plan = new Plan({
            packageId: packageId,
            singlePerPax: singlePerPax,
            doublePerPax: doublePerPax,
            twinPerPax: twinPerPax,
            twinPerPax: twinPerPax,
            triplePerPax: triplePerPax,
            child7To12: child7To12,
            child3To6: child3To6

        })

        const data = await plan.save().catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });
        res.status(200).json({
            status: true,
            message: "Plan Added Successfully!",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};

exports.updatePlan = async (req, res, next) => {
    try {
        const { _id, packageId, singlePerPax, doublePerPax, twinPerPax, triplePerPax, child7To12, child3To6 } = req.body;
        if (!packageId && !_id)
            return res.status(424).json({ status: false, error: "Missing Fields!" })

        const isPlanExist = await Plan.findOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        if (!isPlanExist)
            return res.status(424).json({ status: false, error: "No Plan Exist!" })

        const plan = await Plan.findOneAndUpdate({ _id: _id }, {
            packageId: packageId,
            singlePerPax: singlePerPax,
            doublePerPax: doublePerPax,
            twinPerPax: twinPerPax,
            twinPerPax: twinPerPax,
            triplePerPax: triplePerPax,
            child7To12: child7To12,
            child3To6: child3To6
        })

        const data = await plan.save().catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });
        res.status(200).json({
            status: true,
            message: "Plan Added Successfully!",
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

        await Plan.deleteOne({ _id: _id }).catch(error => {
            console.log(error);
            return res.json({ status: false, error: error.message })
        });

        res.status(200).json({
            success: true,
            message: "Plan Deleted Successfully!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message })
    }
};