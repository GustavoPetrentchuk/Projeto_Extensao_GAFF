const Familia = require('../models/familia');
const Pessoa = require('../models/pessoa');

module.exports = class PessoaController{

    static async familiaBusca(req, res){

        var ordenar = 'DESC';

        const familia = await Familia.findAll({
            order: [['createdAt', ordenar]],
        })
        .then((data) => {
            let qtd = data.length
    
            if (qtd === 0) {
              qtd = false
            }
    
            const resultado = data.map((result) => result.get({ plain: true }));
            //console.log(resultado);
            res.render('familia/familia', { resultado, qtd });
          })
          .catch((err) => console.log(err)); 
    }

    static criarFamilia(req, res){

        const familia = Familia.create({
            nome: req.body.nome,
            endereco: req.body.endereco,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cep: req.body.cep,
            cidade: req.body.cidade,
            telefone: req.body.telefone,
            observacao: req.body.observacao,
        })
        .then(res.redirect('/familias'))
        .catch((err) => {
            console.log(err);
        });
    }

    static async familiaInfo(req, res){
        const id = req.params.id;

        Familia.findOne({where: {id : id}, raw: true})
        .then((familia) => {
            
            Pessoa.findAll({where:{FamiliumId:id}, raw: true})
            .then((pessoa) => {
                console.log(pessoa)
                res.render('familia/familiaInfo', {familia, pessoa})
            })
        })
        .catch((err) => console.log(err))
        
    }


    static async pessoaBusca(req, res){

        const id = req.params.id
        var ordenar = 'DESC';

        const pessoa = await Pessoa.findAll({where:{FamiliumId: id},
            order: [['createdAt', ordenar]],
        })
        .then((data) => {
            let qtd = data.length
    
            if (qtd === 0) {
              qtd = false
            }
    
            const resultado = data.map((result) => result.get({ plain: true }));
            console.log(resultado);
            res.render('familia/familiaInfo', { resultado, qtd });
          })
          .catch((err) => console.log(err)); 
    }

    static pessoaDelete(req, res){
        const idPost = req.body.id

        Pessoa.destroy({where: {id:idPost}})
        .then(res.redirect('/familias'))
        .catch((err) => {
            console.log(err);
        });
    }

    static pessoaCriar(req, res){

        const pessoa = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            telefone: req.body.telefone,
            dataNascimento: req.body.dataNascimento,
            cpf: req.body.cpf,
            rendaMensal: req.body.rendaMensal,
            FamiliumId: req.body.id
        }

        Pessoa.create(pessoa)
        .then(res.redirect('/familias'))
        .catch((err) => {
            console.log(err);
        });
    }


    static familiaEditar(req, res){
        const id = req.params.id;

        Familia.findOne({where:{ id:id}, raw: true})
        .then((familia) => {

            res.render('familia/familiaEdit', { familia})
        })
        .catch((err) => console.log(err))
    }

    static async familiaEditarPost(req, res){
        const idPost = req.body.id;

        const familia = {
            nome: req.body.nome,
            endereco: req.body.endereco,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cep: req.body.cep,
            cidade: req.body.cidade,
            telefone: req.body.telefone,
            observacao: req.body.observacao,
        } 

        await Familia.update(familia, {where: {id: idPost}})
        .then(() => {
            res.redirect('/familias')
        })
        .catch((err) => console.log(err));
    }

    static familiaExcluir(req, res){
        const idPost = req.body.id;

        Familia.destroy({where: {id:idPost}})
        .then(() => {
            res.redirect('/familias')
        })
        .catch((err) => console.log(err));

    }

}