import { makeAutoObservable } from "mobx";
import { db, storage } from "../firebase"; // Assuming you have a firebase config file for Firebase setup
import { collection, addDoc, query, getDocs } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage functions

class ItemStore {
  itemDetails = {
    itemName: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    media: [],
  };
  categories = {}; // Initialize categories to store grouped items
  errorMessage = "";
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  setItemDetails = (updatedFields) => {
    this.itemDetails = { ...this.itemDetails, ...updatedFields };
  };

  setErrorMessage = (message) => {
    this.errorMessage = message;
  };

  setSubmitting = (status) => {
    this.isSubmitting = status;
  };

  addMedia = (mediaUrl) => {
    this.itemDetails.media.push(mediaUrl);
  };

  submitItem = async () => {
    const { itemName, description, price, category, subcategory, media } = this.itemDetails;

    if (!itemName || !description || !price || !category) {
      this.setErrorMessage("Please fill in all required fields.");
      return;
    }

    this.setSubmitting(true);
    try {
      // Handle media upload
      let mediaUrls = [];
      for (let i = 0; i < media.length; i++) {
        const file = media[i];
        const fileExtension = file.split(".").pop();
        const mediaRef = ref(storage, `market-x-items/${Date.now()}.${fileExtension}`);
        const response = await fetch(file);
        const blob = await response.blob();
        await uploadBytes(mediaRef, blob);
        const downloadUrl = await getDownloadURL(mediaRef);
        mediaUrls.push(downloadUrl);
      }

      // Save item to Firestore
      await addDoc(collection(db, "market-x-items"), {
        itemName,
        description,
        price,
        category,
        subcategory,
        media: mediaUrls,
      });

      this.setErrorMessage("");
      this.setItemDetails({
        itemName: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        media: [],
      });
    } catch (error) {
      this.setErrorMessage("Failed to submit item. Please try again.");
      console.error("Error adding item to Firestore: ", error);
    } finally {
      this.setSubmitting(false);
    }
  };

  fetchItemsByCategory = async () => {
    try {
      const q = query(collection(db, "market-x-items"));
      const querySnapshot = await getDocs(q);

      const categories = {};
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        const category = item.category || "Others";

        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(item);
      });

      this.categories = categories;
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
}

const itemStore = new ItemStore();
export default itemStore;
