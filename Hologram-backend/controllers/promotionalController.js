import { readFileSync, writeFileSync, existsSync } from "fs";
import { offerSchema } from "../models/offerModel.js";

const FILE_PATH = "./PromotionalData.json";
let data = existsSync(FILE_PATH) ? JSON.parse(readFileSync(FILE_PATH)) : [];

export const getAllOffers = (req, res) => res.json(data);

export const getOffer = (req, res) => {
  const offer = data.find(o => o.offersid === req.params.id);
  if (!offer) return res.status(404).json({ error: "Offer not found" });
  res.json(offer);
};

export const bulkUpsert = (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates)) return res.status(400).json({ error: "Request must be an array" });

  let created = [], updated = [], errors = [];
  updates.forEach((item, idx) => {
    const { error } = offerSchema.validate(item);
    if (error) {
      errors.push({ index: idx, error: error.details[0].message });
      return;
    }
    const index = data.findIndex(o => o.offersid === item.offersid);
    if (index !== -1) {
      data[index] = { ...data[index], ...item };
      updated.push(data[index]);
    } else {
      data.push(item);
      created.push(item);
    }
  });

  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "Bulk create/update complete", created, updated, errors });
};

export const deleteOffer = (req, res) => {
  const index = data.findIndex(o => o.offersid === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Offer not found" });
  const deleted = data.splice(index, 1);
  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "Offer deleted", deleted });
};

export const deleteAllOffers = (req, res) => {
  const deleted = [...data];
  data = [];
  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "All offers deleted", deleted });
};
