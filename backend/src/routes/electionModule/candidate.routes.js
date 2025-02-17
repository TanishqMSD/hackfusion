import express from "express";
import { addCandidate, getCandidates, getCandidateById } from "../../controllers/electionModule/candidate.controller.js";

const router = express.Router();

// Add a candidate to an election (Admin Only)
router.post("/:electionId/candidate", addCandidate);

// Get all candidates for a specific election
router.get("/:electionId/candidates", getCandidates);

// Get a specific candidate by ID
router.get("/candidate/:candidateId", getCandidateById);

router.post("/elections/:id/apply", async (req, res) => {
    try {
      const { name, department } = req.body;
      const election = await Election.findById(req.params.id);
  
      if (!election) {
        return res.status(404).json({ message: "Election not found" });
      }
  
      const application = { name, department, status: "pending" };
      election.applications.push(application);
      await election.save();
  
      res.json({ message: "Application submitted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });


export default router;
