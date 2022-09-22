const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')

operation()
function operation () {
    inquirer.prompt([{
        type:'list',
        name:'action',
        Message:'O que você deseja fazer?',
        choices:['Criar conta','depositar','consultar saldo','sacar','sair']
    }]).then((answers) => {
        const action = answers['action']
        if(action === 'Criar conta'){
            criarconta()
        }
    }).catch((err) =>console.log(err))

}
function criarconta(){
    console.log(chalk.bgGreen.black('Parabens por ter escolhido nosso banco!'))
    console.log(chalk.bgGreen('Defina suas opções!'))
}