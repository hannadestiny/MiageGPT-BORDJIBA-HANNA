const endpointURL = 'http://localhost:3001/chat';

let outputElement, submitButton, inputElement, historyElement, newChatButton, modal, span, createChatBtn, newChatName;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let currentChatIndex = -1;

window.onload = init;

function init() {
    outputElement = document.getElementById('output');
    submitButton = document.getElementById('submit');
    inputElement = document.getElementById('input');
    historyElement = document.querySelector('.history');
    newChatButton = document.getElementById('newChatBtn');
    modal = document.getElementById('newChatModal');
    span = document.getElementsByClassName('close')[0];
    createChatBtn = document.getElementById('createChatBtn');
    newChatName = document.getElementById('newChatName');
    
    document.querySelectorAll('.prompt-option').forEach(button => {
        button.addEventListener('click', () => handlePromptOptionClick(button.textContent));
    });

    submitButton.addEventListener('click', getMessage);
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            getMessage();
        }
    });
    newChatButton.addEventListener('click', openModal);
    span.addEventListener('click', closeModal);
    createChatBtn.addEventListener('click', () => createNewChat(newChatName.value.trim()));

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    updateChatHistory();
}

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    newChatName.value = '';
}

function createNewChat(chatName) {
    if (chatName === '') return;

    const newChat = {
        name: chatName,
        messages: []
    };

    chatHistory.push(newChat);
    currentChatIndex = chatHistory.length - 1;
    saveChatHistory();
    updateChatHistory();
    closeModal();
    clearChat();

    const promptOptions = document.querySelectorAll('.prompt-option');
    promptOptions.forEach(option => {
        option.style.display = 'block';
    });
}


function clearChat() {
    inputElement.value = '';
    outputElement.innerHTML = '';
}

function handlePromptOptionClick(prompt) {
    inputElement.value = prompt;
    getMessage();

    const promptOptions = document.querySelectorAll('.prompt-option');
    promptOptions.forEach(option => {
        option.style.display = 'none';
    });
}



async function getMessage() {
    let prompt = inputElement.value.trim().toLowerCase();

    if (prompt === '') return;

    if (currentChatIndex === -1) {
        createNewChat(prompt.substring(0, 20));
    }

    displayUserMessage(prompt);

    const promptOptions = document.querySelectorAll('.prompt-option');
    promptOptions.forEach(option => {
        option.style.display = 'none';
    });

    await getResponseFromServer(prompt);
    inputElement.value = '';
}


async function getResponseFromServer(prompt) {
    try {
        const promptData = new FormData();
        promptData.append('prompt', prompt);

        const response = await fetch(endpointURL, {
            method: 'POST',
            body: promptData,
        });

        const data = await response.json();
        console.log(data);

        let chatGptResponseTxt;

        if (data.image) {
            const imgElement = document.createElement('img');
            imgElement.src = data.image;
            imgElement.alt = prompt;
            imgElement.className = 'image-container small-image';
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container-wrapper';
            
            imageContainer.appendChild(imgElement);
            outputElement.appendChild(imageContainer);
            
            chatGptResponseTxt = `Generated image for prompt: ${prompt}`;
        } else {
            chatGptResponseTxt = data.choices ? data.choices[0].message.content : data.message;
            displayAIMessage(chatGptResponseTxt);

            if (data.speech) {
                speak(chatGptResponseTxt);
            }
        }

        if (chatGptResponseTxt) {
            const chatItem = {
                prompt: prompt,
                response: chatGptResponseTxt,
            };
            chatHistory[currentChatIndex].messages.push(chatItem);
            saveChatHistory();
            updateChatHistory();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function displayUserMessage(message) {
    const pElementUser = document.createElement('p');
    pElementUser.textContent = `You: ${message}`;
    pElementUser.className = 'user-message';
    outputElement.appendChild(pElementUser);
    outputElement.scrollTop = outputElement.scrollHeight;
}

function displayAIMessage(message) {
    const pElementAI = document.createElement('p');
    pElementAI.textContent = `AI: ${message}`;
    pElementAI.className = 'ai-message';

    const readAloudIcon = document.createElement('span');
    readAloudIcon.innerHTML = '🔊';
    readAloudIcon.classList.add('read-aloud-icon');
    readAloudIcon.onclick = () => speak(message);

    pElementAI.appendChild(readAloudIcon);

    outputElement.appendChild(pElementAI);
    outputElement.scrollTop = outputElement.scrollHeight;
}

function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function updateChatHistory() {
    historyElement.innerHTML = '';

    chatHistory.forEach((chat, index) => {
        const chatElement = document.createElement('div');
        chatElement.classList.add('chat-item');

        const chatName = document.createElement('span');
        chatName.textContent = chat.name;
        chatName.onclick = () => loadChat(index);
        chatName.classList.add('chat-name');

        const renameButton = document.createElement('span');
        renameButton.textContent = '🖊️';
        renameButton.classList.add('rename-button');
        renameButton.onclick = () => renameChat(index);

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '🗑️';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteChat(index);
        };

        chatElement.appendChild(chatName);
        chatElement.appendChild(renameButton);
        chatElement.appendChild(deleteButton);

        historyElement.appendChild(chatElement);
        historyElement.scrollTop = historyElement.scrollHeight;
    });
}

function loadChat(index) {
    currentChatIndex = index;
    const chat = chatHistory[index];
    outputElement.innerHTML = '';

    chat.messages.forEach(message => {
        displayUserMessage(message.prompt);
        displayAIMessage(message.response);
    });
}

function deleteChat(index) {
    const confirmation = window.confirm("Are you sure you want to delete this chat?");
    
    if (confirmation) {
        chatHistory.splice(index, 1);
        saveChatHistory();
        updateChatHistory();
        if (currentChatIndex === index) {
            clearChat();
            currentChatIndex = -1;
        }
    }
}

function renameChat(index) {
    const newChatName = prompt('Enter new chat name:');
    if (newChatName === null || newChatName.trim() === '') {
        return;
    }

    chatHistory[index].name = newChatName.trim();
    saveChatHistory();
    updateChatHistory();
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
}
