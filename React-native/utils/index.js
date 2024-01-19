import axios from "axios";
import { CLOUD_NAME, UPLOAD_PRESET } from "../config";

export const uploadImageToCloudinary = async (image) => {
  try {
    const formData = new FormData();
    const extension = image.uri.split(".").pop();
    const type = `${image.type}/${extension}`;
    const name = image.uri.split("/").pop();
    formData.append("file", {
      uri: image.uri,
      type,
      name,
    });
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const uploadImagesToCloudinary = async (images) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      const extension = image.uri.split(".").pop();
      const type = `${image.type}/${extension}`;
      const name = image.uri.split("/").pop();
      formData.append("file", {
        uri: image.uri,
        type,
        name,
      });
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

export const generateRoomId = (userId1, userId2) => {
  const sortedUserIds = [userId1, userId2].sort();
  const roomId = sortedUserIds.join("_");
  return roomId;
};

export const extractTime = (input) => {
  const date = new Date(input);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const discount = (price, discount) => {
  const percentage = discount / 100;
  return price - price * percentage;
};

export const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus) {
    case "pending":
      return { backgroundColor: "#fef3c7" };
    case "dispatched":
      return { backgroundColor: "#bbf7d0" };
    case "received":
      return { backgroundColor: "#bae6fd" };
    case "rejected":
      return { backgroundColor: "#fecdd3" };
    default:
      return {};
  }
};
