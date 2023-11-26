class ContaBancaria {
    constructor(numeroConta, titularConta, saldo) {
      this.numeroConta = numeroConta;
      this.titularConta = titularConta;
      this.saldo = saldo;
    }
  
    depositar(valor) {
      this.saldo += valor;
    }
  
    sacar(valor) {
      if (this.saldo >= valor) {
        this.saldo -= valor;
      } else {
        console.log("Saldo insuficiente!");
      }
    }
  
    verificarSaldo() {
      return this.saldo;
    }
  }
  
  //programa principal.
  
  //Funções para mostrar opções ao usuário
  function opcoes() {
    console.log("1 - Criar nova conta");
    console.log("2 - Realizar depósito");
    console.log("3 - Realizar saque");
    console.log("4 - Verificar saldo na conta");
    console.log("0 - Sair");
  }
  
  //Array que vai armazenar as contas criadas.
  let contasCriadas = [];
  
  //Loop de opções
  for (let loop = true; loop; ) {
    opcoes();
  
    const exibirOpcao = parseInt(prompt("Digite uma opção: "));
  
    switch (exibirOpcao) {
      case 1:
        const numeroConta = prompt("Digite o numero da conta: ");
  
        const titularConta = prompt("Digite o nome do títular: ");
  
        const conta = new ContaBancaria(numeroConta, titularConta, 0);
  
        contasCriadas.push(conta); //Vai adicionar minha nova conta ao array
  
        console.log("Conta criada com sucesso!");
  
        break;
  
      case 2:
        const numeroContaDeposito = prompt("Digite o numero da conta: ");
  
        const valorDeposito = parseFloat(
          prompt("Digite o valor que deseja depositar: ")
        );
  
        const contaDeposito = contasCriadas.find(
          (conta) => conta.numeroConta === numeroContaDeposito
        );
  
        if (contaDeposito) {
          contaDeposito.depositar(valorDeposito);
          console.log("Valor depositado com sucesso!");
        } else {
          console.log("Conta não encontrada");
        }
  
        break;
  
      case 3:
        const numeroContaSaque = prompt("Digite o numero da conta: ");
  
        const valorSaque = parseFloat(
          prompt("Digite o valor que deseja sacar: ")
        );
  
        const contaSaque = contasCriadas.find(
          (conta) => conta.numeroConta === numeroContaSaque
        );
  
        if (contaSaque) {
          if (contaSaque.saldo >= valorSaque) {
            contaSaque.sacar(valorSaque);
            console.log("Saque realizado com sucesso!");
          } else {
            console.log("Saldo insuficiente :(");
            break;
          }
        } else {
          console.log("Conta não encontrada");
        }
  
        break;
  
      case 4:
        const numeroContaSaldo = prompt("Digite o numero da conta: ");
  
        const contaSaldo = contasCriadas.find(
          (conta) => conta.numeroConta === numeroContaSaldo
        );
  
        if (contaSaldo) {
          const saldo = contaSaldo.verificarSaldo();
  
          console.log(`Seu saldo é: R$ ${parseFloat(saldo).toFixed(2)}`);
        } else {
          console.log("Conta não encontrada");
        }
  
        break;
  
      case 0:
        loop = false;
        break;
  
      default:
        console.log("Opção inválida. Tente novamente.");
        break;
    }
  }