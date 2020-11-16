const httpError = require("../models/httpError");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const portfolioItems = require("../models/portfolioItem");
// let portFolioItems = [
//   {
//     id: 1,
//     title: "item 1",
//     description: "desc 1",
//     author: "PMD1",
//   },
//   {
//     id: 2,
//     title: "item 2",
//     description: "desc 2",
//     author: "PMD2",
//   },
//   {
//     id: 3,
//     title: "item 3",
//     description: "desc 3",
//     author: "PMD3",
//   },
// ];
const getPortfolioById = async (req, res, next) => {
  const pid = req.params.pid;
  let pObj;
  try {
    pObj = await portfolioItems.findById(pid);
  } catch (error) {
    throw new httpError("Error finding portfolio item", 500);
    return next(error);
  }

  if (!pObj) throw new httpError("Could not find the portfolio itemms !", 404);
  res.json({ object: pObj.toObject({ getters: true }) });
};
const getUserPortfolioItemById = (req, res, next) => {
  const uid = req.params.uid;
  try {
    const p2 = portFolioItems.find((p) => p.author == uid);
  } catch (error) {
    throw new httpError("Error finding portfolio item", 500);
    return next(error);
  }
  if (!p2)
    return next(
      new httpError("Could not find the portfolio itemm user id !", 404)
    );
  res.json({ p2 });
};

const createPortfolioItem = async (req, res, next) => {
  var err = validationResult(req);
  if (!err.isEmpty())
    throw new httpError(
      "Passed inputs are not valid. Check your inputs and try again.",
      400
    );
  const { title, description } = req.body;
  const obj = new portfolioItems({
    title,
    description,
    image: "https://picsum.photos/id/237/200/300",
  });
  try {
    await obj.save();
  } catch (err) {
    throw new httpError("Error in creating the portfolio item", 500);
    return next(error);
  }
  res.status(201).json({ place: obj });
};

const updatePlace = (req, res, next) => {
  var err = validationResult(req);
  if (!err.isEmpty())
    throw new httpError(
      "Passed inputs are not valid. Check your inputs and try again.",
      400
    );
  const { title, description } = req.body;
  const pid = req.params.pid;

  const obj = { ...portFolioItems.find((e) => e.id == pid) };
  const objIndex = portFolioItems.findIndex((e) => e.id == pid);

  obj.title = title;
  obj.description = description;
  portFolioItems[objIndex] = obj;
  res.status(200).json({ obj });
};

const deletePlace = (req, res, next) => {};
exports.getPortfolioById = getPortfolioById;
exports.getUserPortfolioItemById = getUserPortfolioItemById;
exports.createPortfolioItem = createPortfolioItem;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
