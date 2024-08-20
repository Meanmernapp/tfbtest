// helpful articles for the solution below
// https://www.mongodb.com/community/forums/t/how-to-search-date-range-in-aggregate/153870
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfYear/
// https://stackoverflow.com/questions/5168904/group-by-dates-in-mongodb
// https://www.youtube.com/watch?v=WWnWrv2AVMY
// https://www.youtube.com/watch?v=-v2-N7V8jeE&list=PLWkguCWKqN9OwcbdYm4nUIXnA2IoXX0LI&index=23
// $match - filter by query
// $group - group
// $project - filter fields in the document (omit or rename fieldnames)
// $sort - sort
// $count - get count
// $limit - limit number of documents
// $skip - skip a certain number of documents
// "$<fieldname>" - identify field names in your document
// example: "$company.location.country"
import express from "express";
import { getAllVotes, getVotes, ageByDemo } from "../controller/analytics.js";

const router = express.Router();

router.get("/getAllVotes", getAllVotes);
router.get("/getVotes", getVotes);
router.post("/ageByDemo", ageByDemo);

export default router;
