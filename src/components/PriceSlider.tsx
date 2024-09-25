// import { useState } from "react";
// import React from "react";
// import Slider from "rc-slider";
// import 'rc-slider/assets/index.css';

// const PriceSlider: React.FC = () => {
//     const [rate, setPrice] = useState<number>(75);
//     const handlePriceChange = (value: number | number[]) => {
//         if(typeof value === 'number'){
//             setPrice(value);};
//     };

//     return (
//         <div className="slide-container">
            
//     <label>${rate}</label>
      
//       <Slider className="lg: ml-1"
//         min={75}
//         max={500}
//         step={5}
//         value={rate}
//         onChange={handlePriceChange}
//       />
//         </div>
//     );
//   };

//   export default PriceSlider
  


import { useState } from "react";
import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

type PriceSliderProps = {
  onRateChange: (rate: number) => void;  // Callback prop to pass rate
};

const PriceSlider: React.FC<PriceSliderProps>  = ({onRateChange}) => {
  const [rate, setRate] = useState<number>(75);
  const handlePriceChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setRate(value);
      onRateChange(value);
    }
  };

  return (
    <div className="slide-container">
      <label>${rate}</label>
      
      <Slider
      className="lg: ml-1"
        min={75}
        max={500}
        step={5}
        value={rate}
        onChange={handlePriceChange}
        trackStyle={{ backgroundColor: "#FA8340", height: 8 }}   // Custom track style (orange)
        handleStyle={{
          borderColor: "#FA8340",  // Custom handle border (orange)
          height: 16,
          width: 16,
          marginTop: -4,
          backgroundColor: "#ffffff",
        }}
        railStyle={{ backgroundColor: "#white", height: 8 }}  // Custom rail style (gray)
      />
    </div>
  );
};

export default PriceSlider;
