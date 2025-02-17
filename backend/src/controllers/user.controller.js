import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        // when we use save() method is used then all the fields are neccesary so to avoid that we have to pass an object with property {validatBeforeSave:false}
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const googleLogin = asyncHandler(async (req, res) => {
    const { name, email, profilePic } = req.body;
    
    if (!name || !email || !profilePic) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    if (!email.endsWith("@gmail.com")) {
        throw new ApiError(400, "Access Denied");
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        const loggedInUser = await User.create({
            name,
            email,
            profilePic,
            isGoogleVerified: true,
        });

        if (!loggedInUser) {
            throw new ApiError(500, "Something went wrong");
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(loggedInUser._id);

        //option object is created beacause we dont want to modified the cookie to front side
        const option = {
            httpOnly: 'true' === process.env.HTTP_ONLY,
            secure: 'true' === process.env.COOKIE_SECURE,
            maxAge: Number(process.env.COOKIE_MAX_AGE),
        }

        return res.status(200).cookie('accessToken', accessToken, option).cookie('refreshToken', refreshToken, option).json(
            new ApiResponse(200, { loggedInUser, accessToken, refreshToken }, "User logged in sucessully")
        );
    }

    const isUpdate = await User.findByIdAndUpdate(
        existedUser._id,
        {
            $set: {
                name: name,
                profilePic: profilePic,
                isGoogleVerified: true,
            },
            
        },
        { new: true }
    ).select("-password")

    if (!isUpdate) {
        throw new ApiError(500, "Something went wrong");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(isUpdate._id);

    //option object is created beacause we dont want to modified the cookie to front side
    const option = {
        httpOnly: 'true' === process.env.HTTP_ONLY,
        secure: 'true' === process.env.COOKIE_SECURE,
        maxAge: Number(process.env.COOKIE_MAX_AGE),
    }

    return res.status(200).cookie('accessToken', accessToken, option).cookie('refreshToken', refreshToken, option).json(
        new ApiResponse(200, { isUpdate, accessToken, refreshToken }, "User logged in sucessully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {

    return res.status(200).clearCookie('accessToken').status(200).json(
        new ApiResponse(200, req.user, "User logged out successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "User session is Active")
    );
});

export {
    googleLogin,
    logoutUser,
    getCurrentUser,
}