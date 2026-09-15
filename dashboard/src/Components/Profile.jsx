import React, { useEffect, useState } from "react";

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  
  useEffect(() => {
  if (user) {
    setFullName(user.fullName);
    setEmail(user.email);
  }
}, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          email,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (!result.success) {
        setMessage(result.message);
        setIsLoading(false);
        return;
      }

      setMessage("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none disabled:bg-gray-100"
            />
          </div>

          {message && (
            <p className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
              {message}
            </p>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
