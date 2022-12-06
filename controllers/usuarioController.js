const Pessoa = require('../models/pessoa');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

module.exports = class PessoaController{


    //Cria um novo usuario e salva no banco
    static async cadastroUsuarioPost(req, res){

        //console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hashSenha = bcrypt.hashSync(req.body.senha, salt)

        const usuario = await Usuario.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: hashSenha,
        })
        .then(res.redirect('/cadastro'))
        .catch((err) => {
            console.log(err);
        });
    }


    //busca todos os usuarios do banco e manda para a pagina
    static async usuarioBusca(req, res){

        var ordenar = 'DESC';

        const usuario = await Usuario.findAll({
            order: [['createdAt', ordenar]],
        })
        .then((data) => {
            let qtd = data.length
    
            if (qtd === 0) {
              qtd = false
            }
    
            const resultado = data.map((result) => result.get({ plain: true }));
            //console.log(resultado);
            res.render('usuario/cadastroUsuario', { resultado, qtd });
          })
          .catch((err) => console.log(err)); 
    }


    static usuarioDelete(req, res){
        const id = req.body.id;
        const usuario = Usuario.destroy({where:{id: id}})        
        .then(res.redirect('/cadastro'))
        .catch((err) => {
            console.log(err);
        });
    }

    static usuarioEditar(req, res){
        const id = req.params.id
        Usuario.findOne({ where: { id: id }, raw: true })
            .then((usuario) => {
                res.render('usuario/editarUsuario', { usuario })
            })
            .catch((err) => console.log(err))
    }

    static usuarioEditarPost(req, res) {
        const idPost = req.body.id;
        const salt = bcrypt.genSaltSync(10);
        const hashSenha = bcrypt.hashSync(req.body.senha, salt); //Cria o hash

        const usuario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: hashSenha,
            bl_adm: req.body.bl_adm
        }
        Usuario.update(usuario, { where: { id: idPost }, raw: true })
            .then(() => {
                res.redirect('/cadastro')
            })
            .catch((err) => console.log(err));
    }

    static login(req, res){

        res.render('login', {layout: 'main2'});

    }

    static async loginPost(req, res) {
        const email = req.body.email
        const senha = req.body.senha
        // localiza o usuario
        const usuario = await Usuario.findOne({ where: { email: email } })
        if (!usuario) {
            res.render('login', {layout: 'main2'})
            return
        }

        // compara a senha
        const senhaCorreta = bcrypt.compareSync(senha, usuario.senha)
        if (!senhaCorreta) {
            res.render('login', {layout: 'main2'})
            return
        }

        // cria sessão do usuário
        req.session.userid = usuario.id
        req.session.save(() => {
            res.redirect('/familias')
        })
    }

}