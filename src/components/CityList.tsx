"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { addCity } from "@/actions/cities";
import { City } from "@/lib/supabase/types";

interface CityListProps {
  cities: City[];
}

export function CityList({ cities }: CityListProps) {
  const { isAdmin } = useAdmin();
  const [newCityName, setNewCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCity = async () => {
    if (!newCityName.trim()) {
      alert("Enter a city name");
      return;
    }

    setIsLoading(true);
    const result = await addCity(newCityName);
    setIsLoading(false);

    if (result.error) {
      alert("Error adding city: " + result.error);
    } else {
      setNewCityName("");
    }
  };

  return (
    <>
      {/* Admin: Add City Form */}
      {isAdmin && (
        <div className="flex flex-row items-center gap-3 max-w-[600px] mx-auto mb-4">
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="City Name (e.g. Udaipur)"
            className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-900 focus:bg-white outline-none transition-colors"
          />
          <button
            onClick={handleAddCity}
            disabled={isLoading}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add City"}
          </button>
        </div>
      )}

      {/* City List */}
      <ul className="list-none p-0 mt-10">
        {cities.map((city) => (
          <li key={city.id}>
            <Link
              href={`/cities/${encodeURIComponent(city.slug)}`}
              className="flex items-center p-5 border-b border-gray-200 no-underline text-gray-900 transition-all hover:bg-gray-50 hover:pl-6"
            >
              <span className="w-5 h-5 border-2 border-gray-200 rounded mr-4 transition-all group-hover:border-gray-900" />
              <span className="text-xl font-medium">{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
