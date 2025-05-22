"use client";

import { useEffect, useState } from "react";
import useRequestData from "../hooks/useRequestData";
import Image from "next/image";

export default function Home() {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const [current, setCurrent] = useState(0);
  

useEffect(() => {
  makeRequest("slider");
  makeRequest("product");
  makeRequest("gear/gearcategory/5f99bd1c69c11173904871cb");
}, []);


  useEffect(() => {
    if (!data["slider"]?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data["slider"].length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data["slider"]]);

  const gearList = data["gear/gearcategory/5f99bd1c69c11173904871cb"];
const gearCategoryTitle = gearList?.[0]?.gearcategory?.gearcategorytitle || "Gear";


  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center text-white">
      {isLoading && <p>Loading images...</p>}
      {error["slider"] && <p>Error loading slider.</p>}
      {error["product"] && <p>Error loading products.</p>}

      {data["slider"] && data["slider"].length > 0 && (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
          <Image
            src={`/slider/${data["slider"][current].sliderimage}`}
            alt={data["slider"][current].alttext}
            fill
            style={{ objectFit: "fill", backgroundColor: "black" }}
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-xs w-full text-center">
              <p className="text-2xl">Boston Gaming</p>
              <p>───── ★ ─────</p>
              <p className="text-white text-md">
                Affordable - Professional - Aesthetic
              </p>
              <p>Let us build your next rig</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center mb-6">
        <p className="text-4xl">Products</p>
        <p className="text-3xl">───── ★ ─────</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 pb-10">
        {data["product"] &&
          data["product"].slice(0, 6).map((item, index) => (
            <div key={index} className="text-center rounded-2xl bg-gray-700 p-6">
              <p className="mb-2">{item.title}</p>
              <Image
                src={`/product/${item.productimage}`}
                alt={item.content}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
      </div>
      
      {Object.entries(data)
  .filter(([key]) => key.startsWith("gear/gearcategory/"))
  .map(([key, gearList]) => {
    if (!Array.isArray(gearList) || gearList.length === 0) return null;

    const gearCategoryTitle = gearList[0]?.gearcategory?.gearcategorytitle || "Gear";

    return (
      <div
        key={key}
        className="w-full max-w-6xl px-4 mb-12 bg-gray-900 p-6 rounded-lg text-white flex flex-col md:flex-row justify-between gap-8"
      >
        <div className="md:w-2/3">
          <p className="text-2xl mb-4">{gearCategoryTitle}</p>
          <div className="flex flex-col space-y-3">
            {gearList.map((item) => (
              <label
                key={item._id}
                className="bg-gray-800 px-3 py-2 rounded-lg border border-white text-sm cursor-pointer flex items-center space-x-2"
              >
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>{item.geartitle}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:w-1/3 h-fit rounded-lg p-4 border border-white text-white">
          <p className="text-xl mb-1">Total</p>
          <p className="text-sm">Coming soon...</p>
        </div>
      </div>
    );
  })}








    </div>
  );
}
