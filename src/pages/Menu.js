import React, { useState } from 'react';
import AddToCart from '../components/AddToCart';
import MenuItem from '../components/MenuItem';
import imgSelector from '../img/imgSelector';

const menuData = require('../data/db.json');

export default function Menu() {
  const [isAddCart, setIsAddCart] = useState(() => false);
  const [itemFocus, setItemFocus] = useState(() => null);

  const toggleModalClick = (id) => {
    setIsAddCart((prevState) => !prevState);
    if (itemFocus) {
      setItemFocus(() => null);
    } else {
      setItemFocus(() => menuData.items[id - 1]);
    }
  };

  const toggleModalEnter = (e, id) => {
    if (e.key === 'Enter') {
      setIsAddCart((prevState) => !prevState);
      if (itemFocus) {
        setItemFocus(() => null);
      } else {
        setItemFocus(() => menuData.items[id - 1]);
      }
    }
  };

  return (
    <>
      <div className="tile is-ancestor is-justify-content-center">
        <div className="tile is-parent is-flex is-8 is-vertical is-align-items-center">
          {menuData.items.map((item) => (
            item.isAvailable && (
              <MenuItem
                image={imgSelector(item.name.toLowerCase())}
                name={item.name}
                price={`₳${item.price.toFixed(2)}`}
                alt={item.alt}
                toggleModalClick={() => toggleModalClick(item.id)}
                toggleModalEnter={(e) => toggleModalEnter(e, item.id)}
                forceHover={false}
                key={item.id}
              />
            )
          ))}
        </div>
      </div>
      <div className={`modal ${isAddCart ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-content is-flex is-justify-content-center">
          {itemFocus && (
            <MenuItem
              image={imgSelector(itemFocus.name.toLowerCase())}
              name={itemFocus.name}
              price={`₳${itemFocus.price.toFixed(2)}`}
              alt={itemFocus.alt}
              toggleModalClick={() => toggleModalClick(itemFocus.id)}
              toggleModalEnter={(e) => toggleModalEnter(e, itemFocus.id)}
              forceHover
            />
          )}
          {/* create style rules for AddToCart to slideup from bottom of viewport */}
          <AddToCart />
        </div>
        <button className="modal-close is-large" type="button" onClick={toggleModalClick} />
      </div>
    </>
  );
}
