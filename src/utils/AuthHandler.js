import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  verifyBeforeUpdateEmail,
  sendEmailVerification,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

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

    // Send verification email
    await sendEmailVerification(user, {
      url: `${window.location.origin}/verify-email`, // auto-detect localhost or production
      handleCodeInApp: true
    });


    // Create Firestore user doc
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date(),
      verified: false
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
    const userData = { uid: user.uid, email, username, verified: false };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("wardrobe", JSON.stringify(emptyWardrobe));

    // Sync states
    setUserPrivate(userData);
    setUserWardrobe(emptyWardrobe);

    // Redirect user to verification screen
    navigate("/verify-email");

    return { success: true };
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

    if (!user.emailVerified) {
      // Force logout since the user is not verified
      auth.signOut();

      return {
        success: false,
        error: "Please verify your email before signing in.",
        unverified: true
      };
    }

    // Fetch user data
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

    return { success: true };
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






export async function handleUpdateUsername(username, setUserPrivate) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");

    // Only update if username is actually different
    if (username && username !== user.displayName) {
      // Update in Firebase Auth
      await updateProfile(user, { displayName: username });

      // Update in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { username }, { merge: true });

      // Update local storage & context
      const updatedUserData = { uid: user.uid, username, email: user.email };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setUserPrivate(updatedUserData);

      console.log("✅ Username updated successfully");
      return { success: true, username: updatedUserData.username };
    } else {
      return { success: false, error: "No changes detected" };
    }
  } catch (error) {
    console.error("❌ Username update error:", error.message);
    return { success: false, error: error.message };
  }
}




// AuthHandler.js



/**
 * Re-authenticate user and update email + username
 */
export async function handleEmailUpdate({ username, email, password, setUserPrivate }) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  // Re-authenticate
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  // Send email verification
  await verifyBeforeUpdateEmail(user, email, {
    url: `${window.location.origin}/verify-email`,
    handleCodeInApp: true
  });

  // Update display name if changed
  if (username && username !== user.displayName) {
    await updateProfile(user, { displayName: username });
  }

  // Update Firestore
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { username, email }, { merge: true });

  // Update local storage & context
  const updatedUserData = { uid: user.uid, email, username };
  localStorage.setItem("user", JSON.stringify(updatedUserData));
  setUserPrivate(updatedUserData);

  return updatedUserData;
}




// resend email verification link  -->

export async function resendVerificationEmail() {
  const user = auth.currentUser;
  if (!user) return { success: false, error: "No user logged in" };

  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}




