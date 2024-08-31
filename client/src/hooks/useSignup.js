import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (inputs) => {
    const { fullname, username, profilePic, password, confirmPassword } =
      inputs;

    const success = handleInputError({
      fullname,
      username,
      profilePic,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("profilePic", profilePic);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // data.user._id

      if (data.success) {
        localStorage.setItem("token", data.authToken);
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputError({
  fullname,
  username,
  profilePic,
  password,
  confirmPassword,
}) {
  if (!fullname || !username || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return false;
  }

  // Check for Profile picture
  if (!(profilePic instanceof File)) {
    toast.error("Please upload a profile picture");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
