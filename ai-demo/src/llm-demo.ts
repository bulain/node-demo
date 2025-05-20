import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DS_API_KEY
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages:  [
      {"role": "system", content: "You are a helpful assistant." },
      {"role": "user", "content": "Hello"}
    ],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();