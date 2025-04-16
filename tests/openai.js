const { OpenAI } = require('openai');

// const openai = new OpenAI({ apiKey: "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" });
(async() => {
const response = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Write a Playwright test that logs in to a website" }],
  model: "gpt-4",
});

console.log(response.choices[0].message.content);
})();