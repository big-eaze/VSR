import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { MenuContext } from "./MenuContext";

/**
 * Handle user signup
 */
export async function handleSignup(form, navigate, setUserPrivate, setUserWardrobe) {
  const { username, email, password, confirmPassword } = form;
  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Create account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user doc
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date(),
    });

    // Initialize empty wardrobe
    const emptyWardrobe = {
      Tops: [],
      Bottoms: [],
      Footwears: [],
      Accessories: [],
    };

    await setDoc(doc(db, "users", user.uid, "wardrobe", "meta"), emptyWardrobe);

    // Save locally
    const userData = { uid: user.uid, email, username };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("wardrobe", JSON.stringify(emptyWardrobe));

    // Sync states
    setUserPrivate(userData);
    setUserWardrobe(emptyWardrobe);

    navigate("/");
    console.log("✅ User created successfully:", user);

    return { success: true, user };
  } catch (error) {
    let message = error.message;

    if (error.code === "auth/email-already-in-use") {
      message = "That email is already registered. Please log in instead.";
    } else if (error.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (error.code === "auth/weak-password") {
      message = "Password should be at least 6 characters.";
    }

    console.error("❌ Signup error:", message);
    return { success: false, error: message };
  }
}

/**
 * Handle user signin
 */
export async function handleSignin(form, navigate, setUserPrivate, setWardrobeOverall) {
  const { email, password } = form;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user info
    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.exists() ? userDoc.data() : { email };

    // Fetch wardrobe
    const wardrobeRef = doc(db, "users", user.uid, "wardrobe", "meta");
    const wardrobeSnap = await getDoc(wardrobeRef);
    const wardrobeData = wardrobeSnap.exists()
      ? wardrobeSnap.data()
      : { Tops: [], Bottoms: [], Footwears: [], Accessories: [] };

    // Save locally
    localStorage.setItem("user", JSON.stringify({ uid: user.uid, ...userData }));
    localStorage.setItem("wardrobe", JSON.stringify(wardrobeData));

    // Sync context
    setUserPrivate({ uid: user.uid, ...userData });
    setWardrobeOverall(wardrobeData);

    navigate("/");
    console.log("✅ Signed in successfully:", user);

    return { success: true, user };
  } catch (error) {
    let message = error.message;

    if (error.code === "auth/user-not-found") {
      message = "No account found with that email.";
    } else if (error.code === "auth/wrong-password") {
      message = "Incorrect password. Try again.";
    } else if (error.code === "auth/invalid-email") {
      message = "Please enter a valid email.";
    }

    console.error("❌ Signin error:", message);
    return { success: false, error: message };
  }
}
