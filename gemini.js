import * as fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { GoogleGenerativeAI } from "@google/generative-ai";

let generate = async () => {
    const key = await fs.readFile("api.key");
    const data = await fs.readFile("data.txt");
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const ai = new GoogleGenerativeAI(key.toString().trim());
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = await rl.question("prompt> ");
    const result = await model.generateContent([prompt, data.toString().trim()]);
    const text = result.response.text().trim();
    rl.close();
    return text;
};

(async () => {
    try {
        var answer = await generate();
        console.log(answer);
    } catch (error) {
        console.error(error);
    }
})();