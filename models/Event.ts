import mongoose, {Schema, Model} from "mongoose";

//typescript interface
export interface IEvent {
    title: string;
    description: string;
    time: Date;
    venue: string;
    category: string;
    image: string;
    registerLink: string;
}

//Creating schema
const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        time: {
            type: Date,
            required: true,
        },

        venue: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        registerLink: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Event: Model<IEvent> =
mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;