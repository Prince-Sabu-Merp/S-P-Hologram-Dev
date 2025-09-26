let screenSaverUrl =
  process.env.Fallback_Screen_Saver_URL ||
  "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg";

export const getScreenSaver = (req, res) => {
  res.json({ screenSaverUrl });
};

export const updateScreenSaver = (req, res) => {
  const { screenSaverUrl: url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid request: URL missing or not a string" });
  }

  try {
    const safeUrl = url.replace(/ /g, "%20");
    const parsedUrl = new URL(safeUrl);

    if (parsedUrl.protocol !== "https:") {
      return res.status(400).json({ error: "Only HTTPS URLs are allowed" });
    }

    screenSaverUrl = url;
    res.json({ message: "Screen saver URL updated successfully", screenSaverUrl });
  } catch {
    res.status(400).json({ error: "Provided string is not a valid URL" });
  }
};
