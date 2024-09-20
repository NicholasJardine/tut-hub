import React, { useState } from 'react';

const PlatformSelector: React.FC = () => {
  const [platforms, setPlatforms] = useState<{ meet: boolean, zoom: boolean, skype: boolean }>({
    meet: false,
    zoom: false,
    skype: false,
  });

  // Handle checkbox changes
  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPlatforms((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="platforms-grid">
      <label>
        <input
          type="checkbox"
          name="meet"
          checked={platforms.meet}
          onChange={handlePlatformChange}
        />
        Google Meet
      </label>

      <label>
        <input
          type="checkbox"
          name="zoom"
          checked={platforms.zoom}
          onChange={handlePlatformChange}
        />
        Zoom
      </label>

      <label>
        <input
          type="checkbox"
          name="skype"
          checked={platforms.skype}
          onChange={handlePlatformChange}
        />
        Skype
      </label>
    </div>
  );
};

export default PlatformSelector;
