import { Denuncia } from "../models/Index.js";
import { poligono } from "../data/cep63488000.js";
import { pontoDentroDoPoligono } from "../utils/validarCEP.js";

export const criarDenuncia = async ( req, res ) => {
    try {
        const { tipo, descricao, latitude, longitude, imagem, status } = req.body; 
        const lat = Number(latitude);
        const lng = Number(longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return res.status(400).json({error: 'Latitude ou longitude inválidas'});
        const permitido = pontoDentroDoPoligono(lat,lng,poligono);
        if (!permitido) return res.status(403).json({error: 'Denúncia permitida apenas para o CEP 64388000'});
        const novaDenuncia = await Denuncia.create({ tipo, descricao, latitude: lat, longitude: lng, imagem, status });

        res.status(201).json(novaDenuncia);
    } catch ( error ) { 
        return res.status(500).json({ error: "Erro ao criar denúncia" });
    }
};

export const listarDenuncias = async ( req, res ) => {
    try {
        const denuncias = await Denuncia.findAll();
        const resultado = denuncias.map(d => ({
            tipo: d.tipo,
            descricao: d.descricao,
            latitude: Number(d.latitude.toFixed(6)),
            longitude: Number(d.longitude.toFixed(6)),
            imagem: d.imagem,
            votos: d.votos,
            status: d.status,
        }));
        return res.status(200).json(resultado);
    } catch ( error ) {
        return res.status(500).json({ error: "Erro ao listar denúncias" });
    }
};

export const updateStatus = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        if (!status) return res.status(400).json({ error: "Status é obrigatório" });    
        const denuncia = await Denuncia.update({ status }, {where: {id} } );
        return res.status(200).json({ message: "Denúncia atualizada com sucesso" });
    } catch ( error ) {
        return res.status(500).json({ error: "Erro ao atualizar denúncia" });
    }
};

export const deletarDenuncia = async ( req, res ) => {
    try {
        const { id } = req.params;
        const denuncia = await Denuncia.destroy({ where: { id } });
        if (!denuncia) return res.status(404).json({ error: "Denúncia não encontrada" } );
        return res.status(200).json({ message: "Denúncia deletada com sucesso" });
    } catch ( error ) {
        return res.status(500).json({ error: "Erro ao deletar denúncia" });
    }
};

export const updateImagem = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { imagem } = req.body;
        if (!imagem) return res.status(400).json({ error: "Imagem é obrigatória" });
        const denuncia = await Denuncia.update({ imagem }, { where: { id } });
        return res.status(200).json({ message: "Imagem atualizada com sucesso" });
    } catch ( error ) {
        return res.status(500).json({ error: "Erro ao atualizar imagem" });
    }
};

export const votarDenuncia = async ( req, res ) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "ID é obrigatório" });
        
        const denuncia = await Denuncia.findByPk(id);
  
        await denuncia.increment("votos");
        return res.status(200).json({ message: "Voto registrado com sucesso" });
    } catch ( error ) {
        return res.status(500).json({ error: "Erro ao votar na denúncia" });
    }
};