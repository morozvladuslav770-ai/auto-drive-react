import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FilterBar from './FilterBar';
import CarList from './CarList';

const CatalogPage = ({ carsData, onDetailClick }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [hpFilter, sethpFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");


  const parsePrice = (priceStr) => Number(priceStr.replace(/[^0-9]/g, ''));

  const filteredCars = carsData.filter(car => {
    const carPriceNum = parsePrice(car.price);
    const matchesModel = car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand;
    const matchesHP = hpFilter === "" || car.hp >= Number(hpFilter);
    const matchesMinPrice = minPrice === "" || carPriceNum >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || carPriceNum <= Number(maxPrice);
    return matchesModel && matchesBrand && matchesHP && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Каталог авто</h2>
      
      <FilterBar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        hpFilter={hpFilter} sethpFilter={sethpFilter}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
        carsData={carsData}
      />

      {filteredCars.length > 0 ? (
        <CarList cars={filteredCars} onDetailClick={onDetailClick} />
      ) : (
        <div className="text-center my-5 py-5 border rounded bg-white shadow-sm">
          <h3 className="text-muted">Нічого не знайдено</h3>
        </div>
      )}
    </Container>
  );
};

export default CatalogPage;