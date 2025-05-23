
const Tagsmodel = require("../Models/TagsModel")

const mongoose = require('mongoose');

const getTrendingTags = async (req, res) => {
    const fiveDaysAgo = new Date();
    const page = req.params.page
    const pageSize = 10
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const TenDaysAgo = new Date();
    // its actually for 20 days ago but it is written 10 days ago so i don't have to change stuff in frontend. ...I am lazy
    TenDaysAgo.setDate(TenDaysAgo.getDate() - 20)

    try {

        const totalTagsUpdatedinpast5days = await Tagsmodel.countDocuments({
            updatedAt: { $gte: fiveDaysAgo }
        });

        const totalTagsUpdatedinpast10days = await Tagsmodel.countDocuments({
            updatedAt: { $gte: TenDaysAgo }
        });



        let trendingTags;


        if (page * pageSize <= totalTagsUpdatedinpast5days) {

            trendingTags = await Tagsmodel.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: fiveDaysAgo }
                    }
                },
                {
                    $addFields: {
                        countHistoryWithin5Days: {
                            $filter: {
                                input: {
                                    $ifNull: ["$countHistory", []] // Provide an empty array if countHistory is null
                                },
                                as: "entry",
                                cond: { $gte: ["$$entry.timestamp", fiveDaysAgo] }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        fiveDaysAgoCount: { $size: "$countHistoryWithin5Days" }
                    }
                },
                {
                    $project: {
                        tagname: 1,
                        fiveDaysAgoCount: 1,

                        count: 1
                    }
                },
                {
                    $sort: { fiveDaysAgoCount: -1, count: -1 }
                },

                { $skip: (page - 1) * pageSize },
                {
                    $limit: 10 // Adjust the limit as per your requirement
                }
            ]);


        }
        else if (page * pageSize <= totalTagsUpdatedinpast10days) {


            trendingTags = await Tagsmodel.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: TenDaysAgo }
                    }
                },
                {
                    $addFields: {
                        countHistoryWithin10Days: {
                            $filter: {
                                input: {
                                    $ifNull: ["$countHistory", []] // Provide an empty array if countHistory is null
                                },
                                as: "entry",
                                cond: { $gte: ["$$entry.timestamp", TenDaysAgo] }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        tenDaysAgoCount: { $size: "$countHistoryWithin10Days" }
                    }
                },
                {
                    $project: {
                        tagname: 1,
                        tenDaysAgoCount: 1,

                        count: 1
                    }
                },
                {
                    $sort: { tenDaysAgoCount: -1, count: -1 }
                },

                { $skip: (page - 1) * pageSize },
                {
                    $limit: 10 // Adjust the limit as per your requirement
                }
            ]);


        }
        else {


            trendingTags = await Tagsmodel.find({}).skip((page - 1) * pageSize).sort({ count: -1 }).limit(10).select('tagname count');

        }




        return res.status(200).json({ success: true, trendingTags: trendingTags, totalTagsUpdatedinpast5days: totalTagsUpdatedinpast5days, totalTagsUpdatedinpast10days: totalTagsUpdatedinpast10days })
    } catch (error) {
        // throw new Error(error.message);
        return res.status(500).json({ success: false, error: error.message })
    }
};









module.exports = { getTrendingTags }