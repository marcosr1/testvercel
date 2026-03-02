import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Denuncia = sequelize.define("denuncia", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.ENUM("infraestrutura", "iluminacao", "lixo", "alagamento", "transito", "seguranca", "outros"),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false    
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('novo', 'iniciado', 'em andamento', 'finalizado'),
        allowNull: false,
        defaultValue: "novo"
    },
    votos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

export default Denuncia;
