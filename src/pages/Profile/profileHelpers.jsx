export const updateUserInLocalStorage = (updatedData, notify) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const updatedUser = { ...storedUser, ...updatedData };
      try {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        notify("Profile updated successfully!");
      } catch (error) {
        console.error(error);
        notify("Error updating profile.");
      }
    }
  };
  