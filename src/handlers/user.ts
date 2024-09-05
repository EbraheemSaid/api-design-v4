import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const usernameIsNotUnique = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (usernameIsNotUnique) {
    res.status(400);
    res.json({ message: "username must be unique." });
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(400);
    res.json({ message: "Incorrect username or password." });
    return;
  }

  const hashedPassword = user.password;
  const isMatchedPassword = await comparePasswords(
    req.body.password,
    hashedPassword
  );

  if (!isMatchedPassword) {
    res.status(400);
    res.json({ message: "Incorrect username or password." });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
