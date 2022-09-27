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
        else if (action === 'depositar'){
            depositar()
        }
        else if (action === 'consultar saldo'){
            consultarSaldo()
        }
        else if (action === 'sacar'){

        }
        else if (action === 'sair'){
            console.log(chalk.bgBlue.black('obrigado por usar nosso banco'))
            process.exit()
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
            console.log(chalk.bgRed( 'esse nome já existe, insira outro.'))
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
function depositar(){
    inquirer.prompt([{
        name:'accountName',
        message:'qual o nome da conta',
    },]).then((answers)=>{
        const accountName = answers['accountName']

        if(!checarconta(accountName)){
            return depositar()
        }
        
        inquirer.prompt([{
            name:'money',
            message:'insira o valor que deseja depositar:',
        },]).then((answers) => {
            const money = answers['money']

            addmoney(accountName, money)
            operation()
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
function checarconta(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('essa conta não existe!'))
        return false
    }
    return true
}
function addmoney(accountName, money){
    const accountDATA = getaccount(accountName)

    if(!money){
        console.log(chalk.bgRed.black('algo deu errado, tente novamente!'))
        return depositar()
    }

    accountDATA.balance = parseFloat(money) + parseFloat(accountDATA.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountDATA),
        function (err){
            console.log(err)
        }
    )

    console.log(chalk.bgGreen(`O valor R$${money} foi depositado em sua conta`))
}

function getaccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:'utf-8',
        flag:'r',
    })
    return JSON.parse(accountJSON)
}
function consultarSaldo(){
    inquirer.prompt([{
        name: 'saldo',
        message:'qual o nome da sua conta?',
    },]).then((answers) =>{
        const saldo = answers['saldo']

        if(!checarconta(saldo)){
            return consultarSaldo()
        }

    const accountDATA = getaccount(saldo)

        console.log(chalk.bgGreen.black(`O valor do seu saldo é R$${accountDATA.balance}`))
        operation()
    }).catch()
}