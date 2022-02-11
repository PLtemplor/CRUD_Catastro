
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

/* eslint-disable import/no-anonymous-default-export */
export default async (req:NextApiRequest, res:NextApiResponse) => {

    const { method, body } = req;


    switch (method) {
        case "GET":
            try {
            const query = 'SELECT * FROM predio'
            const response = await conn.query(query);
            return res.status(200).json(response.rows);
            } catch (error:any) {
                return res.status(400).json({error: error.message});
            }
        case "POST":
            try {
            const {numeroPredial, avaluo, nombre, departamento, munucipio} = body;

            const query = "INSERT INTO predio(numeroPredial, avaluo, nombre, departamento, munucipio) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const values = [numeroPredial, avaluo, nombre, departamento, munucipio];

            const response = await conn.query(query, values);

            return res.status(200).json(response.rows[0]);
            } catch (error: any) {
                return res.status(400).json({error: error.message});
            }
        default:
            return res.status(400).json("invalid method");
    }

}