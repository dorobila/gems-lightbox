import React, { FC, useState } from 'react';

import { SpinnerIcon } from './icons';

export interface ImageProps {
  id: any;
  className: any;
  src: any;
  style: any;
  handleDoubleClick: any;
  contextMenu?: any;
}

const Image: FC<ImageProps> = ({
  id,
  className,
  src,
  style,
  handleDoubleClick,
  contextMenu,
}) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading((prev) => !prev);
  };

  const handleOnContextMenu = (event: { preventDefault: () => void }) => {
    !contextMenu && event.preventDefault();
  };

  return (
    <div>
      {loading && <SpinnerIcon />}
      <img
        id={id}
        className={className}
        src={src}
        style={style}
        onLoad={handleOnLoad}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleOnContextMenu}
      />
    </div>
  );
};

export default Image;
