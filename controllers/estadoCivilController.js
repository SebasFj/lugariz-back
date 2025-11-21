import * as db from "../models/index.js"

const { EstadoCivil } = db

export const getEstadoCivil = async (req, res) => {
    try{
        const estadoCivil = await EstadoCivil.findAll({
        attributes: ["id", "nombre"],
        raw: true
        })
        return res.status(200).json(estadoCivil)
    }
    catch (error) {
        return res.status(500).json({
        message: 'Error al obtener los estados civiles',
        error: error.message
    });
    }
}