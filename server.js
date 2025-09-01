	// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais} = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});
// Rota principal GET para "/bruxos"
app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});
// Criar Bruxos 
app.post("/bruxos", (req, res) => {
    // Acessando dados do body
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!",
        });
    }

    // Criar novo bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa,
        ano: parseInt(ano) || new Date().getFullYear(),
        varinha: varinha || "Ainda não tem varinha!",
        mascote: mascote || "Ainda não tem mascote!",
        patrono: patrono || "Ainda não tem patrono!",
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo,
    };

    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);

    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo,
    });
});
// Rota principal GET para "/varinhas"
app.get("/varinhas", (req, res) => {
    const { material, nucleo, comprimento} = req.query;
    let resultadoVarinhas = varinhas;
    if(material) {
        resultadoVarinhas = resultadoVarinhas.filter((b) => b.material.toLowerCase().includes(material.toLowerCase()));
    }
    if(nucleo) {
        resultadoVarinhas = resultadoVarinhas.filter((b) => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }
    if(comprimento){
        resultadoVarinhas = resultadoVarinhas.filter((b) => b.comprimento == comprimento);
    }
   res.status(200).json({
        total: resultadoVarinhas.length,
        data: resultadoVarinhas,
    });
});
// Criar Varinhas
app.post("/varinhas", (req, res) => {
    const { material, nucleo, comprimento} = req.body;
    if (!nucleo, !material, !comprimento) {
        return res.status(400).json({
            success: false,
            message: "Nucleo, Comprimento e/ou Material são obrigátorios para uma varinha!"
        })
    }

    const novaVarinha = {
        id: varinhas.length + 1,
        material,
        nucleo,
        comprimento
    }
    varinhas.push(novaVarinha);
    res.status(201).json({
        sucess: true,
        message: "Nova varinha criada!",
        data: novaVarinha
    })
});
// Rota principal GET para "/pocoes"
app.get("/pocoes", (req, res) => {
    const { nome, efeito } = req.query;
    let resultadoPocoes = pocoes;
    if(nome) {
        resultadoPocoes = resultadoPocoes.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if(efeito) {
        resultadoPocoes = resultadoPocoes.filter((b) => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }
   res.status(200).json({
        total: resultadoPocoes.length,
        data: resultadoPocoes,
    });
});
// Criar Poções
app.post("/pocoes", (req, res) => {
    const { nome, efeito} = req.body;
    if (!nome, !efeito) {
        return res.status(400).json({
            success: false,
            message: "Nome e/ou Efeito são obrigátorios para uma poção!"
        })
    }

    const novaPocao = {
        id: pocoes.length + 1,
        efeito,
        nome
    }
    pocoes.push(novaPocao);
    res.status(201).json({
        sucess: true,
        message: "Nova Pocao criada!",
        data: novaPocao
    })
});
// Rota principal GET para "/animais"
app.get("/animais", (req, res) => {
    const { nome, tipo } = req.query;
    let resultadoAnimais = animais;
    if(nome) {
        resultadoAnimais = resultadoAnimais.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if(tipo) {
        resultadoAnimais = resultadoAnimais.filter((b) => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }
   res.status(200).json({
        total: resultadoAnimais.length,
        data: resultadoAnimais,
    });
});
// Criar Animais
app.post("/animais", (req, res) => {
    const { tipo, nome} = req.body;
    if (!nome, !tipo) {
        return res.status(400).json({
            success: false,
            message: "Nome e/ou tipo são obrigátorios para um animal!"
        })
    }

    const novoAnimal = {
        id: animais.length + 1,
        tipo,
        nome
    }
    animais.push(novoAnimal);
    res.status(201).json({
        sucess: true,
        message: "Novo animal criado!",
        data: novoAnimal
    })
});
// Buscar quantos bruxos há em uma casa!
app.get("/stats", (req, res) => {
    const {casa} = req.query
    let resultado = bruxos;
    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
        
        res.status(200).json({
        bruxos: `${casa} = ${resultado.length}`
    })
    }
   const contagemMateriais = {};
    for (let i = 0; i < varinhas.length; i++) {
        const varinha = varinhas[i];
        const material = varinha.material;
        if (contagemMateriais[material]) {
            contagemMateriais[material]++;
        } else {
            contagemMateriais[material] = 1;
        }
    }

    let materialMaisComum;
    let maxContagem = 0;

    for (const material in contagemMateriais) {
        if (contagemMateriais[material] > maxContagem) {
            maxContagem = contagemMateriais[material];
            materialMaisComum = material;
        }
    }

    if(contagemMateriais) {
        res.status(200).json({
            resultado: `O material mais usado é ${materialMaisComum}`
        })
    }

});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});