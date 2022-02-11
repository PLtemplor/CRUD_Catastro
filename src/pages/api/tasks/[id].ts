
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

/* eslint-disable import/no-anonymous-default-export */
export default async (req:NextApiRequest, res:NextApiResponse) =>{

const { method, query, body } = req;

console.log(query);

    switch (method) {
        case "GET":
            try {
            const text = 'SELECT * FROM predio WHERE id = $1';
            const values = [query.id];
            const result =await conn.query(text, values);

            if (result.rows.length === 0)
                return res.status(400).json({message: "predio not found"});
            return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        case 'PUT':
            try {
            const {numeroPredial, avaluo, nombre, departamento, munucipio} = body;
            const text = 'UPDATE predio SET numeroPredial = $1, avaluo = $2, nombre= $3, departamento= $4, munucipio= $5 WHERE id = $6 RETURNING *';
            const values = [numeroPredial, avaluo, nombre, departamento, munucipio,query.id];
            const result =await conn.query(text, values);

            if (result.rows.length === 0)
                return res.status(400).json({message: "predio not found"});
            return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        case 'DELETE':
            try {
            const text = 'DELETE FROM predio WHERE id = $1 RETURNING *';
            const values = [query.id];
            const result =await conn.query(text, values);

            if (result.rowsCount === 0)
                return res.status(400).json({message: "predio not found"});
            return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        default:
            return res.status(400).json('method not allowed')
    }

}