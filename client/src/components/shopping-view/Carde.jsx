//shopping-view / carde.jsx

import React from 'react';
import { Card } from "@/components/ui/card";
import bento1 from "../../assets/bento1.jpg";
import bento2 from "../../assets/bento2.jpg";
import bento4 from "../../assets/bento4.jpg";
import bg from "../../assets/bg.jpg";

const categories = [
  { id: "pottery", label: "Passion for Pottery", image: bento4 },
  { id: "papier-mache", label: "Papier Mâché", image: bento1 },
  { id: "jewelry", label: "Fashion Jewellery", image: bento2 },
];

const CategoryShowcase = ({ onCategoryClick }) => {
  return (
    <section 
      className="py-12" 
      style={{ 
        backgroundImage: `url(${bg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8 text-orange-600" style={{ fontFamily: 'Brush Script MT, cursive' }}>The Maestros Recommend</h2>
        <p className="text-center text-gray-700 mb-8 text-xl italic">Specially curated collections that showcase the best from our Maestros</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-rows-2 gap-6 md:gap-4 h-96">
            {categories.slice(0, 2).map((category) => (
              <Card
                key={category.id}
                onClick={() => onCategoryClick(category)}
                className="cursor-pointer overflow-hidden flex-1 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-full group">
                  <img src={category.image} alt={category.label} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 transform transition-all duration-300 translate-y-full group-hover:translate-y-0">
                    <h3 className="font-semibold text-2xl text-orange-400 mb-1" style={{ fontFamily: 'Palatino, serif' }}>{category.label}</h3>
                    <p className="text-sm text-white font-bold uppercase tracking-wider">Shop Collection</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="row-span-2">
            <Card
              onClick={() => onCategoryClick(categories[2])}
              className="cursor-pointer overflow-hidden h-96 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-full group">
                <img src={categories[2].image} alt={categories[2].label} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 transform transition-all duration-300 translate-y-full group-hover:translate-y-0">
                  <h3 className="font-semibold text-2xl text-orange-400 mb-1" style={{ fontFamily: 'Palatino, serif' }}>{categories[2].label}</h3>
                  <p className="text-sm text-white font-bold uppercase tracking-wider">Shop Collection</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;