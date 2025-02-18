import { Router } from "express";
import {verifyJwt} from "../middlewares/auth.middleware.js";
import { createBooking, getBookings, updateBookingStatus } from "../controllers/booking.controller.js";

const router = Router();

router.route("/create-booking").post(verifyJwt, createBooking);
router.route("/get-bookings").get(verifyJwt, getBookings);
router.route("/update/:id").put(verifyJwt, updateBookingStatus);


export default router;