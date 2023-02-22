import connectToMongo from "@/database/conn";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    connectToMongo();
  } catch (error) {
    res.json({ error: "Connection Failed" });
  }

  //post method
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Please Enter data first" });
    }

    const { name, email, password } = req.body;

    //duplicate user
    const existUser = await Users.findOne({ email });
    if (existUser) {
      res.status(422).json({ error: "User Already Exist" });
    }

    Users.create(
      { name, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    return res.status(500).json({ message: "Http methods are not valid POST" });
  }
}
