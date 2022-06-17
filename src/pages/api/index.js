
import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
    const { query } = req.body;
    res.send(query);
};