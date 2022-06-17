
import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
    const { slug } = req.query;
    res.send(slug);
};