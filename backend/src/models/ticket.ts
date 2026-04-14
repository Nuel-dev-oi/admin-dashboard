import mongoose, {
  Document,
  Model,
  type ObjectIdSchemaDefinition,
} from "mongoose";

export interface ITicket extends Document {
  name: string;
  email: string;
  description: string;
  priority: string;
  createdBy: ObjectIdSchemaDefinition;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new mongoose.Schema<ITicket, Model<ITicket, {}>>(
  {
    name: {
      type: String,
      required: [true, "A name is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "An email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    description: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      minlength: [8, "Description must be 8 characters long"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  },
);

const Ticket = mongoose.model<ITicket>("ticket", TicketSchema);

export default Ticket;
