Scenario: Escolher pagar antes do serviço, operação bem sucedida
    Given que estou na pagina de “Pagamento” 
    And estou logado como “Cliente”
    When eu seleciona a opção “Pagar antes”
    Then eu continuo na página de “Pagamento” 
    And minhas informações de pagamento são solicitadas

Scenario: Escolher pagar depois do serviço, operação bem sucedida
    Given que estou na pagina de “Pagamento” 
    And estou logado como “Cliente”
    When eu seleciono a opção “Pagar depois do serviço”
    Then uma mensagem de confirmação é mostrada
    And sou direcionado pra página de “Perfil do prestador de Serviço”

Scenario: Falha ao efetuar pagamento, dados inválidos
    Given que estou na pagina de “Pagamento” 
    And estou logado como “Cliente”
    When eu adiciono as informações do “Cartão de Crédito” para pagamento
    And e insiro o cvv “529” errado  
    Then uma mensagem de erro é mostrada

Scenario: Falha ao efetuar pagamento, CPF inválido
    Given que estou na pagina de “Pagamento” 
    And estou logado como “Cliente”
    When eu adiciono as informações do “Cartão de Crédito” para pagamento
    And e insiro o CPF “123.123.123-12” errado  
    Then uma mensagem de erro é mostrada
    And o pagamento não é efetuado

Scenario: Falha ao efetuar pagamento, dados inválidos
    Given que estou na pagina de “Pagamento” 
    And estou logado como “Cliente”
    When eu adiciono as informações do “Cartão de Crédito” para pagamento
    And e insiro o numero “1234 1234 1234 1234” errado  
    Then uma mensagem de erro é mostrada

Scenario: Cliente informe que o serviço foi realizado
    Given que estou na pagina de “Serviços” 
    And estou logado como “Cliente”
    And que escolhi previamente a opção “Pagar depois do serviço” 
    When eu seleciono a opção “Serviço Realizado”  
    Then minhas informações de pagamento são solicitadas
    

