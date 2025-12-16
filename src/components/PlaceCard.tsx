"use client";

import { Place } from "@/lib/supabase/types";
import { useAdmin } from "@/context/AdminContext";
import { deletePlace } from "@/actions/places";
import { useState } from "react";
import { ConfirmDeleteModal } from "./Modal";

interface PlaceCardProps {
  place: Place;
  citySlug: string;
}

export function PlaceCard({ place, citySlug }: PlaceCardProps) {
  const { isAdmin } = useAdmin();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deletePlace(place.id, citySlug);
    setIsDeleting(false);

    if (result.error) {
      alert("Error deleting place: " + result.error);
    } else {
      setShowDeleteModal(false);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.name + " " + citySlug
  )}`;

  return (
    <>
      <div className="relative bg-white border border-gray-200 rounded-lg p-6 transition-all animate-fade-in hover:translate-y-[-2px] hover:shadow-md hover:border-gray-300 group">
        {/* Delete Button (Admin Only) */}
        {isAdmin && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white border border-gray-200 text-red-500 flex items-center justify-center cursor-pointer z-20 transition-all hover:bg-red-50 hover:border-red-200 hover:scale-110"
          >
            ×
          </button>
        )}

        {/* Card Content */}
        <a
          href={isAdmin ? undefined : mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`block h-full no-underline text-inherit ${
            isAdmin ? "pointer-events-none" : ""
          }`}
        >
          <div className="text-lg font-semibold mb-2">{place.name}</div>
          <div className="text-sm text-gray-500 leading-relaxed mb-auto">
            {place.description}
          </div>

          {/* Arrow Icon (visible on hover, hidden in admin mode) */}
          {!isAdmin && (
            <div className="absolute top-6 right-6 text-gray-400 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          )}
        </a>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemName={place.name}
        isLoading={isDeleting}
      />
    </>
  );
}
