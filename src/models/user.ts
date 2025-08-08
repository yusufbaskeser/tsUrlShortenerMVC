import mongoose from "mongoose";
interface Iuser{
    username:string
    password : string
    token: string
}
const userSchema = new mongoose.Schema<Iuser>({
  username: String,
  password: String,
  token: String,
});

const User = mongoose.model<Iuser>("User", userSchema);

export default User;