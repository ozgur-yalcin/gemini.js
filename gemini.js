import * as fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenerativeAI } from "@google/generative-ai";
(async () => {
    const key = await fs.readFile("api.key");
    const data = await fs.readFile("data.txt");
    const rl = readline.createInterface({ input, output });
    const ai = new GoogleGenerativeAI(key.toString().trim());
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = await rl.question("prompt> ");
    const result = await model.generateContent([prompt, data.toString()]);
    const output = result.response.text().trim();
    console.log(output);
})();