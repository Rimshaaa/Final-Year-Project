import { Inventory } from "../models/inventory.js";

export const CreateCategory = async (req, res) => {
  const { _id } = req.user._id;
  const { name, image, cat_id } = req.body;
  try {
    const already = await Inventory.findOne({ name, created_by: _id });
    if (already) {
      return res.status(422).json({ error: "Already registered" });
    }
    const created = await Inventory.create({
      name,
      image,
      created_by: _id,
      cat_id,
    });
    if (created) {
      return res.status(200).json({ message: "Created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create category" });
  }
};

export const CreateItem = async (req, res) => {
  const { id, name, image, qty, price, category_id, unit } = req.body;
  try {
    const category = await Inventory.findById(id);
    const index = category?.items.findIndex((item) => item.name === name);
    if (index !== -1) {
      return res.status(422).json({ error: "Already registered" });
    } else {
      category.items.push({ name, image, qty, price, unit, category_id });
      await category.save();
      return res.status(200).json({ message: "Created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create category" });
  }
};

export const UpdateItem = async (req, res) => {
  const { id, name, image, qty, price, category_id } = req.body;
  try {
    const category = await Inventory.findById(category_id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const itemToUpdate = category.items.find((item) => item._id == id);

    if (!itemToUpdate) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (name) {
      const index = category.items.findIndex(
        (item) => item.name === name && item._id != id
      );

      if (index !== -1) {
        return res.status(422).json({ error: "Item name already in use" });
      }

      itemToUpdate.name = name;
    }

    if (image !== undefined) {
      itemToUpdate.image = image;
    }

    if (qty !== undefined) {
      itemToUpdate.qty = qty;
    }

    if (price !== undefined) {
      itemToUpdate.price = price;
    }

    await category.save();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const GetInventory = async (req, res) => {
  try {
    const result = await Inventory.find({ created_by: req.user._id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const DeleteItem = async (req, res) => {
  const { itemId, inventoryId } = req.params;

  try {
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    const index = inventory.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    inventory.items.splice(index, 1);

    await inventory.save();

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
