import * as db from "../models/index.js"

const { Genero } = db

export const getGeneros = async (req, res) => {
    try{
        const generos = await Genero.findAll({
        attributes: ["id", "nombre"],
        raw: true
        })
        return res.status(200).json(generos)
    }
    catch (error) {
        return res.status(500).json({
        message: 'Error al obtener los géneros',
        error: error.message
    });
    }
}