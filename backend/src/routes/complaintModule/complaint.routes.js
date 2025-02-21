import { Router } from "express";
import { submitComplaint } from "../../controllers/complaintModule/complaint.controller.js";
import { voteToReveal } from "../../controllers/complaintModule/votetoreveal.controller.js";
import { verifyJwt } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/submit-complaint").post( submitComplaint);
router.route("/vote-to-reveal/:complaintId").post(voteToReveal);

export default router;