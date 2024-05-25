"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setCars(data))
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список автомобилей</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="space-y-4">
          {cars.length === 0 ? (
            <p>No cars available</p>
          ) : (
            cars.map((car) => (
              <li key={car.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-bold">
                  {car.make} {car.model}
                </h2>
                <p>Год: {car.year}</p>
                <p>Цена: ${car.price}</p>
                <p>Пробег: {car.mileage} км</p>
                <p>Описание: {car.description}</p>
                <Link href={`/cars/${car.id}`}>Подробнее</Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
