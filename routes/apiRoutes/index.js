import express from "express";
const router = express.Router();

// location of the routes
router.use(require("./candidateRoutes"));
router.use(require("./partyRoutes"));
router.use(require("./voterRoutes"));
router.use(require("./voteRoutes"));

export default router;
