Feature: Chat de usuários
        I want to die

Scenario: Marcação de um horário
	Given Eu estou na página "Chat"
	When Eu interajo com a interface de criação de horário
	Then Eu sugiro alguns dos meus "horários" 
	Then Espero a confirmação do "Provedor"

Scenario: Envio de mensagem
	Given Eu estou na página "Chat"
	Given Eu não consigo ver a mensagem "Teste"
	When Eu interajo com a interface envio de mensagem, envio a mensagem "Teste"
	Then Eu vejo a mensagem "Teste" na página do "Chat"

Scenario: Filtro de mensagem
	Given Eu estou na página "Chat" como "Cliente"
	When Eu enviar uma mensagem que tenha "dados indevidos"
	Then Os "dados indevidos" aparecem "escondidos" na mensagem do "Chat"
	Then A mensagem é enviada para o "Provedor" com os "dados indevidos" estando "escondidos" no "Chat"
	Then Os "dados indevidos" não são salvos

Scenario: Uso de mensagem pré-gravada
	Given Eu estou na página "Chat" como "Cliente"
	When Eu interajo com a interface de mensagens pré-gravadas, envio a mensagem "Oi, tudo bem"
	Then Eu vejo a "mensagem pré-gravada" na página do "Chat"
	Then A mensagem "Oi, tudo bem" é enviada para o "Chat" do "Provedor"
	Then A mensagem "Oi, tudo bem" permanece salva na página do "Chat"

Scenario: Falha no Envio de mensagem
	Given Eu estou na página "Chat" como "Cliente"
	When Eu interajo com a interface envio de mensagem, envio a mensagem ""
	When Não tem nada escrito na mensagem
	Then A mensagem "" não é enviada para o "Chat" do "Provedor"
	Then A mensagem "" não é salva na página do "Chat"

Scenario: Falha na marcação de horário
	Given Eu estou na página "Chat" como "Cliente"
	When Eu interajo com a interface de criação de horário
	When Não preencho os horários disponiveis
	Then A mensagem de marcação de horário não é enviada
	Then O sistema espera os horários serem preenchidos

Scenario: Confirmação de um horário
	Given Eu estou na página "Chat" como "Cliente"
	Given Me foi enviada uma mensagem de marcação de horário
	When Eu interajo com a mensagem de marcação de horário
	When Eu preencho meu horário dispónivel
	Then Aparece o horário que eu preenchi na página do "Chat" 
	Then Meu horário é enviado ao "Provedor"