import bcrypt from "bcrypt";
import Users from "../../../models/Users";

export default async function handler(req, res) {
  const body = req.body;
  const userExist = await Users.findOne({ email: body.email });
  if (userExist) {
    res.status(200).json({ message: "Cette adresse mail est déjà utilisée" });
    return;
  }

  const salt = await bcrypt.genSalt(15);

  const hashpass = await bcrypt.hash(body.password, salt);

  const user = new Users({ username: body.username, email: body.email, password: hashpass });

  await user.save();

  res.status(200).json({ message: "Votre compte à bien été créé" });

}
