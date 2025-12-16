"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { verifyAdminPasscode } from "@/actions/auth";
import { Modal, ModalButtons } from "./Modal";

export function AdminToggle() {
  const { isAdmin, setIsAdmin } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowModal(true);
      setPasscode("");
      setError("");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const isValid = await verifyAdminPasscode(passcode);
    setIsLoading(false);

    if (isValid) {
      setIsAdmin(true);
      setShowModal(false);
    } else {
      setError("Incorrect passcode");
      setPasscode("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`fixed top-5 right-5 px-4 py-2 rounded-full cursor-pointer z-[1000] text-sm font-medium transition-all shadow-sm ${
          isAdmin
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        {isAdmin ? "Done" : "Edit"}
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Admin Access"
      >
        <p className="text-gray-500 mb-6">
          Please enter the passcode to edit.
        </p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Passcode"
          autoFocus
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <ModalButtons
          onCancel={() => setShowModal(false)}
          onConfirm={handleSubmit}
          confirmText="Enter"
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
}
