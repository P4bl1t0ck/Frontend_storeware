import React from 'react';
import PropTypes from 'prop-types';
import './Banner.css';

const Banner = ({ 
  imageUrl = "/default-banner.jpg",
  title = "StoreWare",
  subtitle = "Productos de calidad",
  showOverlay = true 
}) => {
  const handleImageError = (e) => {
    e.target.src = '/fallback-banner.jpg'; // Imagen de respaldo
    console.warn('Error al cargar el banner principal');
  };

  return (
    <header className="banner-container">
      <div className="banner-image-container">
        <img
          src={imageUrl}
          alt="Banner principal"
          className="banner-image"
          onError={handleImageError}
        />
        
        {showOverlay && (
          <div className="banner-overlay">
            <h1 className="banner-title">{title}</h1>
            {subtitle && <p className="banner-subtitle">{subtitle}</p>}
          </div>
        )}
      </div>
    </header>
  );
};

Banner.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showOverlay: PropTypes.bool
};

export default Banner;