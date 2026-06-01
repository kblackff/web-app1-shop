import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a product name"]
        },

        description: {
            type: String,
            required: false
        },

        price: {
            type: Number,
            required: [true, "Enter a product price"],
            default: 0.00
        },

        v1: {
            type: Number,
            required: [true, 'Enter id number']
        },

        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

export const Product = mongoose.model("Product", ProductSchema);

