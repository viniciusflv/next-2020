// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export type HelloResponse = {
  [key in "login" | "avatar_url" | "name"]: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://api.github.com/users/viniciusflv");
  const { login, avatar_url, name } = await response.json();

  res.statusCode = response.status;
  res.json({ login, name, avatar_url });
};
