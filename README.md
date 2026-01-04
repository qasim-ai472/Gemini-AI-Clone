# Gemini AI Chat & Vision Clone

A modern, responsive AI chatbot interface built with **Vanilla JavaScript** and **Vite**. This project integrates the **Gemini 2.5 Flash API** to provide real-time text responses and multimodal image analysis.

## 🚀 Features

* **Real-time AI Chat:** Fast and fluid text-based conversations.
* **Vision Capabilities:** Upload images and ask the AI to analyze or describe them.
* **Modern UI:** A clean, Gemini-inspired interface with shimmering loading animations.
* **Markdown Support:** AI responses are formatted with headers, bold text, and lists for readability.
* **Responsive Design:** Fully functional on desktop and mobile devices.

---

## 🛡️ Security & Environment Setup

One of the core focuses of this project was **API Security**. To prevent the Gemini API key from being exposed on GitHub, a virtual environment workflow was implemented using **Vite**.

### How the API Key is Secured:

1.  **Environment Variables (.env):** The API key is stored in a local `.env` file, which acts as a private vault.
2.  **Git Ignore (.gitignore):** The `.env` file is added to the `.gitignore` list, ensuring it is never uploaded or tracked by GitHub.
3.  **Vite Injection:** We use `import.meta.env` to safely inject the key into the application during development without hardcoding it into the `api.js` file.

---

## 🛠️ Built With

* **HTML5 & CSS3:** For the structural layout and custom shimmering animations.
* **JavaScript (ES6 Modules):** For logic, state management, and API integration.
* **Google Gemini API:** The engine behind the AI responses.
* **Vite:** Used as the build tool and for securing environment variables.
* **Marked.js:** To parse and render Markdown in the chat bubbles.

---

## ⚙️ How to Run Locally

To run this project on your own machine, follow these steps:

1.  **Clone the project** (or download the files).
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Setup API Key:**
    * Create a `.env` file in the root directory.
    * Add your key: `VITE_GEMINI_API_KEY=your_api_key_here`
4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
5.  **Open the link** provided in your terminal (usually `http://localhost:5173`).

---

## 📂 Project Structure

* `index.html` - The main entry point.
* `style.css` - Custom styles and animations.
* `script.js` - Main logic for UI updates and message handling.
* `api.js` - Secure communication module with the Gemini API.
* `.gitignore` - Security configuration to hide sensitive files.
