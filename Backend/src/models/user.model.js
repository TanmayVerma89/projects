import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "FullName is required"],
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
        select: false
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
        minLength: 8,
        select: false,
    },
    pfp: {
        type: String,
        default: "https://i.pinimg.com/736x/32/9b/54/329b54d07444f009b0634f438db9a449.jpg",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    purchases: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            discount: {
                type: Number,
                required: true,
            },
        },
    ],
    maxDiscount: {
        required: false,
        type: {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            discount: {
                type: Number,
                required: true,
            },
        },
    },
});

userSchema.pre("save", function hashPassword() {
    if (!this.isModified("password")) return;

    this.password = bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
