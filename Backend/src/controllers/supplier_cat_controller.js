import { supplierCategory } from "../models/supplier_category.js";

export const supplierCategory_Create = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({ error: "please fill the name " });
  }
  supplierCategory
    .findOne({ name })
    .then((already) => {
      if (already) {
        return res.status(422).json({ message: "Already created" });
      }
      const lostandfoundCateg = new supplierCategory(req.body);
      lostandfoundCateg
        .save()
        .then((resp) => {
          res.status(200).json({ message: "Created successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const supplierCategory_Update = async (req, res) => {
  const { _id } = req.params;

  try {
    await supplierCategory.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};
export const supplierCategory_Get = async (req, res) => {
  let filter = { is_active: true };
  if (req.query._id) {
    filter = { _id: req.query._id.split(","), is_active: true };
  }
  try {
    const result = await supplierCategory.find(filter);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};
export const supplierCategory_Delete = async (req, res) => {
  const { _id } = req.params;

  try {
    await supplierCategory.findByIdAndDelete({ _id });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};
