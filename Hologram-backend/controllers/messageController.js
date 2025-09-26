import { readFileSync, writeFileSync, existsSync } from "fs";

const MESSAGES_FILE = "./Messages.json";
let messages = {};

if (existsSync(MESSAGES_FILE)) {
  messages = JSON.parse(readFileSync(MESSAGES_FILE, "utf-8"));
} else {
  messages = {
    welcome: "Hello user!",
    fallback: "Sorry, I didn’t get that.",
  };
  writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export const getAllMessages = (req, res) => {
  res.json(messages);
};

export const patchMessages = (req, res) => {
  const updates = req.body;
  if (!updates || typeof updates !== "object") {
    return res.status(400).json({ error: "Invalid request: body must be an object" });
  }

  let updated = {};
  let notFound = [];

  for (const key of Object.keys(updates)) {
    if (messages.hasOwnProperty(key)) {
      messages[key] = updates[key];
      updated[key] = updates[key];
    } else {
      notFound.push(key);
    }
  }

  writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  res.json({
    message: "Bulk message update completed",
    updated,
    notFound,
  });
};
