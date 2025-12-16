"use client";

import { useState, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-[2000] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl w-[90%] max-w-[420px] shadow-lg border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}

interface ModalButtonsProps {
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  confirmVariant?: "primary" | "danger";
  isLoading?: boolean;
}

export function ModalButtons({
  onCancel,
  onConfirm,
  confirmText = "Save",
  confirmVariant = "primary",
  isLoading = false,
}: ModalButtonsProps) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button
        onClick={onCancel}
        className="bg-transparent text-gray-500 border-none px-5 py-2.5 rounded-full cursor-pointer text-sm font-medium hover:text-gray-900"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-5 py-2.5 rounded-full cursor-pointer text-sm font-medium transition-transform active:scale-[0.98] disabled:opacity-50 ${
          confirmVariant === "danger"
            ? "bg-red-100 text-red-500 hover:bg-red-200"
            : "bg-gray-900 text-white"
        }`}
      >
        {isLoading ? "..." : confirmText}
      </button>
    </div>
  );
}

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Place?">
      <p className="text-gray-500 mb-6">
        Are you sure you want to delete <b>{itemName}</b>?
      </p>
      <ModalButtons
        onCancel={onClose}
        onConfirm={onConfirm}
        confirmText="Delete"
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </Modal>
  );
}
