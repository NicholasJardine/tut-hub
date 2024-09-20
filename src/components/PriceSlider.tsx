import { useState } from "react";
import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const PriceSlider: React.FC = () => {
    const [rate, setPrice] = useState<number>(75);
    const handlePriceChange = (value: number | number[]) => {
        if(typeof value === 'number'){
            setPrice(value);};
    };

    return (
        <div className="slide-container">
            
    <label>${rate}</label>
      
      <Slider
        min={75}
        max={500}
        step={5}
        value={rate}
        onChange={handlePriceChange}
      />
        </div>
    );
  };

  export default PriceSlider
  