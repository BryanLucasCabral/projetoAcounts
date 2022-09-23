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

    buildAccount()
}
function buildAccount(){
    inquirer.prompt([{
        name:'AccountName',
        message:'digite um nome para sua conta',
    }]).then((answers)=>{
        const accountName = answers['AccountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed('esse nome já existe, insira outro.'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', function(err){
            console.log(err)
        })
        console.log(chalk.bgGreen('parabens sua conta foi criada'))
        operation()
    }).catch((err) => console.log(err))
}