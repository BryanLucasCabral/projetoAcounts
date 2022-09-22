const inquirer = require('inquirer')
const fs = require('fs')

operation()
function operation () {
    inquirer.prompt([{
        type:'list',
        name:'action',
        Message:'O que você deseja fazer?',
        choices:['Criar conta','depositar','consultar saldo','sacar','sair']
    }]).then((answers) => {
        const action = answers('action')
        console.log(action)
    }).catch((err) =>console.log(err))

}