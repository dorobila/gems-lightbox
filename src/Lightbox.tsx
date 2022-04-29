/* eslint-disable jsx-a11y/alt-text */
import React, { useState, FC, useCallback, useEffect } from 'react';
import Header from './Header';
import Image from './Image';
import StyleInjector, { lightboxStyles } from './StyleInjector';

interface LightboxProps {
  medium: any;
  large: any;
  alt: any;
  onClose: any;
  hideDownload: any;
  hideZoom: any;
  showRotate: any;
  imageBackgroundColor: any;
}

function isTouchEvent(
  e: React.TouchEvent | React.MouseEvent
): e is React.TouchEvent {
  return e && 'touches' in e;
}

// function isMouseEvent(
//   e: React.TouchEvent | React.MouseEvent
// ): e is React.MouseEvent {
//   return e && 'screenX' in e;
// }

export const Lightbox: FC<LightboxProps> = ({
  medium,
  large,
  alt,
  onClose,
  hideDownload,
  hideZoom,
  showRotate,
  imageBackgroundColor = 'black',
}) => {
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [moveStart, setMoveStart] =
    useState<{ x: number; y: number } | undefined>();
  const [zoomed, setZoomed] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleUserKeyPress = useCallback(
    (event: { keyCode: number }) => {
      const { keyCode } = event;
      // ESC or ENTER closes the modal
      if (keyCode === 27 || keyCode === 13) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const getCoordinatesIfOverImg = (event) => {
    const point = event.changedTouches ? event.changedTouches[0] : event;

    if (point.target.id !== 'react-modal-image-img') {
      // the img was not a target of the coordinates
      return;
    }

    const dim = contentRef.current!.getBoundingClientRect();
    const x = point.clientX - dim.left;
    const y = point.clientY - dim.top;

    return { x, y };
  };

  const handleMouseDownOrTouchStart = (
    event: React.TouchEvent | React.MouseEvent
  ) => {
    event.preventDefault();
    event.persist();

    if (isTouchEvent(event)) {
      if (event.touches && event.touches.length > 1) {
        // more than one finger, ignored
        return;
      }
    }

    const coords = getCoordinatesIfOverImg(event)!;

    if (!coords) {
      // click outside the img => close modal
      onClose();
    }

    if (!zoomed) {
      // do not allow drag'n'drop if zoom has not been applied
      return;
    }

    setMoveStart({
      x: coords.x - move.x,
      y: coords.y - move.y,
    });
  };

  const handleMouseMoveOrTouchMove = (
    event: React.TouchEvent | React.MouseEvent
  ) => {
    event.persist();
    event.preventDefault();

    if (!zoomed || !moveStart) {
      // do not allow drag'n'drop if zoom has not been applied
      // or if there has not been a click
      return;
    }

    if (isTouchEvent(event)) {
      if (event.touches && event.touches.length > 1) {
        // more than one finger, ignored
        return;
      }
    }

    const coords = getCoordinatesIfOverImg(event);

    if (!coords) {
      return;
    }

    setMove({ x: coords.x - moveStart.x, y: coords.y - moveStart.y });
  };

  const handleMouseUpOrTouchEnd = () => {
    setMoveStart(undefined);
  };

  const toggleZoom = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setZoomed((prev) => !prev);
    if (zoomed) {
      setMove({ x: 0, y: 0 });
    }
  };

  const toggleRotate = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (rotationDeg === 360) {
      setRotationDeg(90);
      return;
    }

    setRotationDeg((prev) => (prev += 90));
  };

  return (
    <div>
      <StyleInjector
        name="__react_modal_image__lightbox"
        css={lightboxStyles({ imageBackgroundColor })}
      />

      <div className="__react_modal_image__modal_container">
        <div
          className="__react_modal_image__modal_content"
          onMouseDown={handleMouseDownOrTouchStart}
          onMouseUp={handleMouseUpOrTouchEnd}
          onMouseMove={handleMouseMoveOrTouchMove}
          onTouchStart={handleMouseDownOrTouchStart}
          onTouchEnd={handleMouseUpOrTouchEnd}
          onTouchMove={handleMouseMoveOrTouchMove}
          ref={contentRef}
        >
          {zoomed && (
            <Image
              id="react-modal-image-img"
              className="__react_modal_image__large_img"
              src={large || medium}
              style={{
                transform: `translate3d(-50%, -50%, 0) translate3d(${move.x}px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
                WebkitTransform: `translate3d(-50%, -50%, 0) translate3d(${move.x}px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
                MsTransform: `translate3d(-50%, -50%, 0) translate3d(${move.x}px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
              }}
              handleDoubleClick={toggleZoom}
            />
          )}
          {!zoomed && (
            <Image
              id="react-modal-image-img"
              className="__react_modal_image__medium_img"
              src={medium || large}
              handleDoubleClick={toggleZoom}
              contextMenu={!medium}
              style={{
                transform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
                WebkitTransform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
                MsTransform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
              }}
            />
          )}
        </div>

        <Header
          image={large || medium}
          alt={alt}
          zoomed={zoomed}
          toggleZoom={toggleZoom}
          toggleRotate={toggleRotate}
          onClose={onClose}
          enableDownload={!hideDownload}
          enableZoom={!hideZoom}
          enableRotate={!!showRotate}
        />
      </div>
    </div>
  );
};
