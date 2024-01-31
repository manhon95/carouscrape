import { CarouScraper } from "./scraper";

import TelegramBot from "node-telegram-bot-api";

const scraper: CarouScraper = new CarouScraper();

// replace the value below with the Telegram token you receive from @BotFather
const token: string = "1039215093:AAHgCSXHmIWQl9oK-pbxQISlYMSjYn8qYU4";

// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, { polling: true });

// Matches "/subscribe"
bot.onText(/\/subscribe/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Subscribled to CarouScrape");
});

// Matches "/list"
bot.onText(/\/list/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  await scraper.scrape();
  const items = scraper.getItems();

  items.forEach((item) => {
    const reply = item.name + "\n\n" + item.price + "\n\n" + item.URL;
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, reply);
  });
});
