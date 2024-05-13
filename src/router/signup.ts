import { readFileSync, writeFileSync } from "fs";
import path from "path";
import e, { Request, Response } from "express";
const route = e.Router();

interface SignUpUser {
  username: string;
  password: string;
}
interface Database {
  user: { username: string; password: string };
}
const dataPath = path.join(__dirname, "../db/data.json");
route.post<SignUpUser>(
  "/signup",
  async (req: Request<SignUpUser>, res: Response) => {
    try {
      const { username, password } = req.body as SignUpUser;
      // Validate user input:
      if (!username || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Missing username or password" });
      }
      const existingData = JSON.parse(readFileSync(dataPath, "utf8"));
      if (existingData.find((db: Database) => db.user.username === username)) {
        return res
          .status(409)
          .json({ success: false, message: "Username already exists" });
      } else {
        const newUser = { user: { username, password: password } };
        const updatedData = [...existingData, newUser];
        writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));

        res
          .status(201)
          .json({ success: true, message: "User Created Successfully!" });
      }
    } catch (error) {
      console.log("error:", error);

      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default route;
