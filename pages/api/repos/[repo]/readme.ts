// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { repo },
  } = req

  const response = await fetch(`https://api.github.com/repos/viniciusflv/${repo}/readme`);
  const body = await response.json();

  res.statusCode = response.status;
  res.json(body);
};
