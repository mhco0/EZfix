Feature : Chat de usuários
.Descrição:
	- Um chat para ter a conversa entre pessoas interessadas no serviço e pessoas interessadas em prestar o serviço.
	- O chat deve filtrar palavras ofensivas. Assim como dados pessoais.
	- O chat deve ter mensagens pré gravadas.
	- Seria interessante poder marcar horários pelo chat. Como uma espécie de form.

Feature : Chat de usuários
	Cenário 0 : Marcação de um horário.	
	Cenário 1 : Envio de mensagem.
	Cenário 2 : Filtro de mensagem.
	Cenário 3 : Uso de mensagens pré-gravadas.
	Cenário 4 : Falha no Envio de mensagem.
	Cenário 5 : Falha na marcação de horário.
	Cenário 6 : Confirmação de um horário.

Scenario: Marcação de um horário
	Given Eu estou como “Usuário”.
	And Eu estou na página "Chat".
	When Eu interajo com a interface de criação de horário.
	Then Eu sugiro alguns dos meus “horários”. 
	And Espero a confirmação do outro “Usuário”.

Scenario: Envio de mensagem
	Given Eu estou como “Usuário”.
	And Eu estou na página “Chat”.
	When Eu interajo com a interface envio de mensagem.
	Then Eu vejo a mensagem que eu escrevi na página do “Chat”.
	And A mensagem é enviada para o “Chat” do outro “Usuário”.
	And A mensagem permanece salva no na página do “Chat”.

Scenario: Filtro de mensagem
	Given Eu estou como “Usuário”.
	And Eu estou na página “Chat”.
	When Eu enviar uma mensagem que tenha “dados indevidos”
	Then Os “dados indevidos” aparecem “escondidos” na mensagem do “Chat”.
	And A mensagem é enviada para o outro “Usuário” com os “dados indevidos” estando “escondidos” no “Chat”.
	And Os “dados indevidos” não são salvos.

Scenario: Uso de mensagem pré-gravada
	Given Eu estou como “Usuário”.
	And Eu estou na página “Chat”.
	When Eu interajo com a interface de mensagens pré-gravadas.
	Then Eu vejo a “mensagem pré-gravada” na página do “Chat”.
	And A mensagem é enviada para o “Chat” do outro “Usuário”.
	And A mensagem permanece salva no na página do “Chat”.

Scenario: Falha no Envio de mensagem
	Given Eu estou como "Usuário".
	And Eu estou na página "Chat".
	When Eu interajo com a interface envio de mensagem.
	And Não tem nada escrito na mensagem.
	Then A mensagem não é enviada para o "Chat" do outro "Usuário".
	And A mensagem não é salva na página do "Chat"

Scenario: Falha na marcação de horário
	Given Eu estou como “Usuário”.
	And Eu estou na página "Chat".
	When Eu interajo com a interface de criação de horário.
	And Não preencho os horários disponiveis.
	Then A mensagem de marcação de horário não é enviada.
	And O sistema espera os horários serem preenchidos.

Scenario: Confirmação de um horário
	Given Eu estou como “Usuário”.
	And Eu estou na página "Chat".
	And Me foi enviada uma mensagem de marcação de horário.
	When Eu interajo com a mensagem de marcação de horário.
	And Eu preencho meu horário dispónivel.
	Then Aparece o horário que eu preenchi na página do "Chat". 
	And Meu horário é enviado ao outro “Usuário”.

