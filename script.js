import { fetchGeminiResponse } from './api.js';

// 1. DOM ELEMENTS
const chatList = document.getElementById("chat-list");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const header = document.querySelector(".header");
const newChatBtn = document.querySelector(".new-chat-btn");

// Image elements
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("image-preview-container");

// APP STATE (Temporary for this session only)
let selectedImageData = null; 

// 2. HELPER FUNCTIONS

const scrollToBottom = () => {
    chatList.scrollTo({ top: chatList.scrollHeight, behavior: "smooth" });
};

// Creates the message bubble in the UI
const createMessageElement = (content, role) => {
    const div = document.createElement("div");
    div.classList.add("message", role);
    div.innerHTML = `<div class="message-content"><p>${content}</p></div>`;
    return div;
};

// 3. MAIN ACTION: SENDING MESSAGES

const handleSendMessage = async () => {
    const text = userInput.value.trim();
    
    // Stop if there is no text AND no image
    if (!text && !selectedImageData) return;

    // Hide greeting header on first message
    if (header) header.style.display = "none";

    // A. Display User Message
    const userMsg = createMessageElement(text || "Sent an image", "user");
    chatList.appendChild(userMsg);
    
    userInput.value = "";
    scrollToBottom();

    // B. Show Shimmering Loading Animation
    // We create a specific div for the AI response that starts with the animation
    const loadingEl = document.createElement("div");
    loadingEl.classList.add("message", "ai");
    
    // Using your CSS class 'typing-animation'
    loadingEl.innerHTML = `
        <div class="message-content">
            <div class="typing-animation">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>`;
    
    chatList.appendChild(loadingEl);
    scrollToBottom();

    try {
        // C. Fetch API Response
        // The animation will stay visible while this 'await' is pending
        const aiResponse = await fetchGeminiResponse(text || "What is in this image?", selectedImageData);

        // D. Update UI with AI Response
        // We find the message-content div and replace the animation with the parsed markdown
        const messageContent = loadingEl.querySelector(".message-content");
        messageContent.innerHTML = `<p>${marked.parse(aiResponse)}</p>`;
        
    } catch (error) {
        // Handle potential errors by replacing animation with error text
        const messageContent = loadingEl.querySelector(".message-content");
        messageContent.innerHTML = `<p>Sorry, something went wrong. Please try again.</p>`;
    } finally {
        // E. Reset Image Preview and Scroll
        selectedImageData = null;
        if (previewContainer) previewContainer.style.display = "none";
        scrollToBottom();
    }
};

// 4. EVENT LISTENERS

// Handle Image Selection & Preview
fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        // Store Base64 data
        selectedImageData = {
            mimeType: file.type,
            base64: e.target.result.split(",")[1]
        };

        // Show UI Preview
        previewContainer.style.display = "flex";
        previewContainer.innerHTML = `
            <div class="preview-wrapper">
                <img src="${e.target.result}">
                <span class="material-symbols-rounded close-icon" id="remove-img">cancel</span>
            </div>
        `;

        document.getElementById("remove-img").onclick = () => {
            selectedImageData = null;
            previewContainer.style.display = "none";
            fileInput.value = ""; 
        };
    };
    reader.readAsDataURL(file);
};

// Send logic
sendBtn.onclick = handleSendMessage;
userInput.onkeydown = (e) => {
    if (e.key === "Enter") handleSendMessage();
};

// New Chat Button: Simply resets the UI
newChatBtn.onclick = () => {
    chatList.innerHTML = "";
    header.style.display = "block";
    previewContainer.style.display = "none";
    selectedImageData = null;
    userInput.value = "";
};