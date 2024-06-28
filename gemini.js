import * as fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenerativeAI } from "@google/generative-ai";
(async () => {
    const key = await fs.readFile("api.key");
    const rl = readline.createInterface({ input, output });
    const ai = new GoogleGenerativeAI(key.toString().trim());
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat();
    while (true) {
        const prompt = await rl.question("prompt:");
        if (prompt === "exit") break;
        const content = await chat.sendMessage(prompt);
        console.log(content.response.text().trim());
    }
    rl.close();
})();