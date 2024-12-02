import { makeAutoObservable } from "mobx";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Adjust to your firebase setup

class StreamerStore {
  kitchenList = [];
  fashionList = [];
  jewelryList = [];
  foodList = [];
  sportsList = [];
  beautyList = [];
  electronicList = [];
  othersList = [];
  stationeryList = [];
  healthcareList = [];
  servicesList = [];

  unsubscribe = null;

  constructor() {
    makeAutoObservable(this);
  }

  streamData(country, city, university) {
    const baseQuery = query(collection(db, "items"));

    let filteredQuery = baseQuery;
    if (country || city || university) {
      filteredQuery = query(
        baseQuery,
        where("availablePlaces", "array-contains-any", ["", "KNUST"])
      );
    }

    this.unsubscribe = onSnapshot(filteredQuery, (snapshot) => {
      const filteredDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      this.kitchenList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Kitchen")
      );

      this.fashionList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Fashion")
      );

      this.jewelryList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Jewelry")
      );

      this.foodList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Food")
      );

      this.sportsList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Sports")
      );

      this.beautyList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Beauty")
      );

      this.electronicList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Electronic")
      );

      this.othersList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Others")
      );

      this.stationeryList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Stationery")
      );

      this.healthcareList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Healthcare")
      );

      this.servicesList = this._sortByArrayLength(
        filteredDocs.filter((doc) => doc.itemType === "Services")
      );
    });
  }

  _sortByArrayLength(list) {
    return list.sort((a, b) => {
      const aTotal = (a.likes || []).length + (a.viewedBy || []).length;
      const bTotal = (b.likes || []).length + (b.viewedBy || []).length;
      return bTotal - aTotal;
    });
  }

  unsubscribeStream() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

const streamerStoreInstance = new StreamerStore();

export default streamerStoreInstance;
