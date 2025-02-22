import express from "express";
import { createElection, getElections, endElection } from "../../controllers/electionModule/election.controller.js";


import { getLiveElections } from "../../controllers/electionModule/election.controller.js";
import Election from "../../models/electionModule/election.model.js";

const router = express.Router();

router.post("/create", createElection);
router.get("/live", getLiveElections);
router.put("/end/:id", endElection);

router.get("/upcoming", async (req, res) => {
    try {
      const elections = await Election.find(); // ✅ Ensure this works
      res.json(elections);
    } catch (error) {
      console.error("Error fetching elections:", error); // ✅ Log error
      res.status(500).json({ message: "Server Error" });
    }
});

export default router;
