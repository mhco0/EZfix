Feature: Chat de usuários
    I want to send safe messages for the server and see them on chat

Scenario: Envio de mensagem (serviço)
	Given O sistema não tem nenhuma mensagem
	When Eu envio uma mensagem com o conteudo "Teste"
	Then O sistema tem uma mensagem com o conteudo "Teste"

Scenario: Filtro de mensagem (serviço)
	Given O sistema não tem mensagens indevidas
	When Eu enviar uma mensagem que tenha o palavrão "porra"
	Then O sistema esconde a palavra "porra" como "*****" na mensagem
	Then O sistema não salva a palavra "porra"

Scenario: Falha no Envio de mensagem (gui)
	Given Eu estou na página Chat
	When Eu interajo com a interface envio de mensagem, envio a mensagem ""
	Then A mensagem "" não é salva na página do Chat

Scenario: Falha na marcação de horário (gui)
	Given Eu estou na página Chat
	Given Eu estou sem horários preenchidos
	When Eu interajo com a interface de criação de horário, enviando os horários
	Then A pagina do Chat me alerta
