import { Schema, model, Document } from "mongoose";

interface MessageModel extends Document {
  _id: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  message: string;
  receiver: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageModel>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Message = model("Message", messageSchema);
