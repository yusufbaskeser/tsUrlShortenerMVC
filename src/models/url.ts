import mongoose from "mongoose";
interface Iurl{
    shortUrl : string
    originalUrl : string
    createdBy : string
}
const urlSchema = new mongoose.Schema<Iurl>({
  shortUrl: String,
  originalUrl: String,
  createdBy: String,
});
const Url = mongoose.model<Iurl>("Url", urlSchema);

export default Url;