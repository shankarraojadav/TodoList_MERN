import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import { googleSignIn } from "../redux/actions/googleSignIn";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;
      const userData = {
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      };

      dispatch(googleSignIn(userData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <img
        src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700148264/todo_ukgd6n.png"
        style={{ width: "30vh", aspectRatio: 1, borderRadius: "50%" }}
      />
      <button style={{ mt: "2vh" }} onClick={signInWithGoogle}>
        <p
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "#B15EFF",
            fontWeight: "bold",
            fontSize: "3vh",
          }}
        >
          <img
            width="30vh"
            src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700642658/google_x5kl6j.svg"
            style={{ fontSize: "3vh", mr: "1vh" }}
          />
          Sign In With Google
        </p>
      </button>
    </div>
  );
}
