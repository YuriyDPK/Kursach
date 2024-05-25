"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [description, setDescription] = useState("");
  const [sellerId, setSellerId] = useState(0);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [dealerId, setDealerId] = useState<number | null>(null);
  const [users, setUsers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, brandsRes, dealersRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/brands"),
          fetch("/api/dealers"),
        ]);

        if (!usersRes.ok || !brandsRes.ok || !dealersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [usersData, brandsData, dealersData] = await Promise.all([
          usersRes.json(),
          brandsRes.json(),
          dealersRes.json(),
        ]);

        setUsers(usersData);
        setBrands(brandsData);
        setDealers(dealersData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        make,
        model,
        year,
        price,
        mileage,
        description,
        sellerId,
        brandId,
        dealerId,
      }),
    });

    if (res.ok) {
      router.push("/cars");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Добавить автомобиль</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Марка"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            type="number"
            placeholder="Год"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <input
            className="border p-2 w-full"
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <input
            className="border p-2 w-full"
            type="number"
            placeholder="Пробег"
            value={mileage}
            onChange={(e) => setMileage(parseInt(e.target.value))}
          />
          <textarea
            className="border p-2 w-full"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            className="border p-2 w-full"
            value={sellerId}
            onChange={(e) => setSellerId(parseInt(e.target.value))}
          >
            <option value="">Выберите продавца</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <select
            className="border p-2 w-full"
            value={brandId ?? ""}
            onChange={(e) =>
              setBrandId(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">Выберите бренд</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 w-full"
            value={dealerId ?? ""}
            onChange={(e) =>
              setDealerId(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">Выберите дилера</option>
            {dealers.map((dealer) => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.name}
              </option>
            ))}
          </select>
          <button className="bg-blue-500 text-white p-2" type="submit">
            Добавить
          </button>
        </form>
      )}
    </div>
  );
}
