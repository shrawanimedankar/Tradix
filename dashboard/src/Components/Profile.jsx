import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

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

      const response = await fetch(`${API_URL}/auth/profile`, {
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

  const handleChangePassword = async () => {
    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }

    setPasswordLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (!result.success) {
        setPasswordMessage(result.message);
        return;
      }

      setPasswordMessage("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      console.log(error);
      setPasswordMessage("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-3 py-5 sm:px-5 sm:py-6 md:px-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-7">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Profile
          </h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500 disabled:bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500 disabled:bg-gray-100"
            />
          </div>

          {/* Profile Message */}
          {message && (
            <p className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg break-words">
              {message}
            </p>
          )}

          {/* Save */}
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          )}

          {/* Security */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Security</h2>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>

            {showPasswordForm && (
              <div className="mt-5 space-y-4">
                {/* Current Password */}
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
                />

                {/* New Password */}
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
                />

                {/* Confirm Password */}
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
                />

                {/* Update Password */}
                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            )}

            {/* Password Message */}
            {passwordMessage && (
              <p className="mt-4 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg break-words">
                {passwordMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
