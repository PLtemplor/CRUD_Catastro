import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

type Data ={
  message: String,
  time: String
}

/* eslint-disable import/no-anonymous-default-export */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await conn.query('SELECT NOW()');
  return res.json({message: "pong", time: response.rows[0].now});
};
