const midPriorityBatch = []; // Array para armazenar notificações de prioridade média
const lowPriorityBatch = []; // Array para armazenar notificações de prioridade baixa

document.getElementById("notificationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const code = document.getElementById("code").value;
    const message = document.getElementById("message").value;
    const priority = document.getElementById("priority").value;

    // Monta o objeto de notificação
    const notification = {
        code: code,
        message: message,
        priority: priority
    };

    // Envia a notificação para o backend
    fetch('http://localhost:8080/notifications/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar notificação');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("response").textContent = data; // Exibe a resposta do servidor

        // Adiciona a notificação na lista com lógica para lotes
        addNotificationToBatch(notification);
    })
    .catch(error => {
        document.getElementById("response").textContent = error.message; // Exibe o erro
    });

    // Limpa os campos do formulário
    document.getElementById("notificationForm").reset();
});

// Função para adicionar a notificação ao lote
function addNotificationToBatch(notification) {
    if (notification.priority === 'MID') {
        midPriorityBatch.push(notification);
        if (midPriorityBatch.length >= 2) {
            sendMidPriorityBatch();
        }
    } else if (notification.priority === 'LOW') {
        lowPriorityBatch.push(notification);
        if (lowPriorityBatch.length >= 5) {
            sendLowPriorityBatch();
        }
    } else {
        // Para notificações de alta prioridade, adiciona diretamente à lista
        addNotificationToList(notification);
    }
}

// Função para enviar lote de notificações de prioridade média
function sendMidPriorityBatch() {
    const batchCopy = [...midPriorityBatch]; // Faz uma cópia do lote atual
    midPriorityBatch.length = 0; // Limpa o lote atual

    // Adiciona todas as notificações do lote à lista
    batchCopy.forEach(notification => addNotificationToList(notification));
}

// Função para enviar lote de notificações de prioridade baixa
function sendLowPriorityBatch() {
    const batchCopy = [...lowPriorityBatch]; // Faz uma cópia do lote atual
    lowPriorityBatch.length = 0; // Limpa o lote atual

    // Adiciona todas as notificações do lote à lista
    batchCopy.forEach(notification => addNotificationToList(notification));
}

// Função para adicionar a notificação à lista
function addNotificationToList(notification) {
    const notificationsList = document.getElementById("notificationsList");
    const listItem = document.createElement("li");
    listItem.textContent = `Código: ${notification.code}, Mensagem: ${notification.message}, Prioridade: ${notification.priority}`;
    notificationsList.appendChild(listItem);
}
