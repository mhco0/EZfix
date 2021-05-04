Feature: Chat de usuários
    I want to send safe messages for the server and see them on chat

Scenario: Envio de mensagem (servidor)
	Given O sistema não tem nenhuma mensagem
	When Eu envio uma mensagem com o conteudo "Teste"
	Then O sistema tem uma mensagem com o conteudo "Teste"

Scenario: Filtro de mensagem (servidor)
	Given O sistema não tem mensagens indevidas
	When Eu enviar uma mensagem que tenha o palavrão "porra"
	Then O sistema esconde a palavra "porra" como "*****" na mensagem
	Then O sistema não salva a palavra "porra"

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
