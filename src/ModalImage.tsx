import React, { useState, FC } from 'react';

import { Lightbox } from './Lightbox';

interface ModalImageProps {
  className?: any;
  small: any;
  smallSrcSet?: any;
  medium: any;
  large: any;
  alt: any;
  hideDownload?: any;
  hideZoom?: any;
  showRotate?: any;
  imageBackgroundColor?: any;
}

const ModalImage: FC<ModalImageProps> = ({
  className,
  small,
  smallSrcSet,
  medium,
  large,
  alt,
  hideDownload = true,
  hideZoom,
  showRotate,
  imageBackgroundColor,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div>
      <img
        className={className}
        style={{
          cursor: 'pointer',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        onClick={toggleModal}
        src={small}
        srcSet={smallSrcSet}
        alt={alt}
      />
      {modalOpen && (
        <Lightbox
          medium={medium}
          large={large}
          alt={alt}
          onClose={toggleModal}
          hideDownload={hideDownload}
          hideZoom={hideZoom}
          showRotate={showRotate}
          imageBackgroundColor={imageBackgroundColor}
        />
      )}
    </div>
  );
};

export default ModalImage;
