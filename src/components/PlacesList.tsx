"use client";

import { useState, useMemo } from "react";
import { Place, PlaceType, PLACE_TYPES, PLACE_TYPE_LABELS } from "@/lib/supabase/types";
import { useAdmin } from "@/context/AdminContext";
import { addPlace } from "@/actions/places";
import { PlaceCard } from "./PlaceCard";
import { Modal, ModalButtons } from "./Modal";

interface PlacesListProps {
  places: Place[];
  citySlug: string;
}

export function PlacesList({ places, citySlug }: PlacesListProps) {
  const { isAdmin } = useAdmin();
  const [filter, setFilter] = useState<PlaceType | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    type: "sightseeing" as PlaceType,
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  // Get available types from data
  const availableTypes = useMemo(() => {
    const types = new Set(places.map((p) => p.type));
    return types;
  }, [places]);

  // Filter places based on selected filter
  const filteredPlaces = useMemo(() => {
    if (filter === "all") return places;
    return places.filter((p) => p.type === filter);
  }, [places, filter]);

  const handleAddPlace = async () => {
    if (!newPlace.name.trim() || !newPlace.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsAdding(true);
    const result = await addPlace(
      citySlug,
      newPlace.name,
      newPlace.type,
      newPlace.description
    );
    setIsAdding(false);

    if (result.error) {
      alert("Error adding place: " + result.error);
    } else {
      setNewPlace({ name: "", type: "sightseeing", description: "" });
      setShowAddModal(false);
    }
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="max-w-[1200px] mx-auto mb-10 overflow-x-auto whitespace-nowrap flex justify-center gap-2.5 scrollbar-hide">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border ${
            filter === "all"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
          }`}
        >
          All
        </button>
        {PLACE_TYPES.filter((type) => availableTypes.has(type)).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border ${
              filter === type
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {PLACE_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1200px] mx-auto">
        {/* Add Card (Admin Only) */}
        {isAdmin && (
          <div
            onClick={() => setShowAddModal(true)}
            className="flex justify-center items-center border-2 border-dashed border-gray-200 rounded-lg p-6 bg-transparent cursor-pointer transition-all hover:border-gray-400 hover:bg-gray-50"
          >
            <span className="text-3xl text-gray-300 group-hover:text-gray-500">
              +
            </span>
          </div>
        )}

        {/* Place Cards */}
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} citySlug={citySlug} />
        ))}
      </div>

      {/* Add Place Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Place"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={newPlace.name}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors"
          />
          <select
            value={newPlace.type}
            onChange={(e) =>
              setNewPlace((prev) => ({
                ...prev,
                type: e.target.value as PlaceType,
              }))
            }
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors"
          >
            {PLACE_TYPES.map((type) => (
              <option key={type} value={type}>
                {PLACE_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          <textarea
            value={newPlace.description}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Description"
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors resize-none"
          />
        </div>
        <ModalButtons
          onCancel={() => setShowAddModal(false)}
          onConfirm={handleAddPlace}
          confirmText="Save"
          isLoading={isAdding}
        />
      </Modal>
    </>
  );
}
