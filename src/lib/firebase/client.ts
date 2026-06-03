"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig, isFirebaseConfigured } from "./config";

function getFirebaseApp() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Check .env.local.");
  }
  return getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
}

export function getClientAuth() {
  return getAuth(getFirebaseApp());
}

export function getClientFirestore() {
  return getFirestore(getFirebaseApp());
}

export function getClientStorage() {
  return getStorage(getFirebaseApp());
}
