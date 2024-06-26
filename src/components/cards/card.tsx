import { useEffect, useState } from "react";
import { ReactComponent as Bag } from "../../assets/shopping-bag.svg";
import { ICart, IProducts } from "../../interfaces/interfaces";
import { useCart } from "../../util/cartFunctions";
import { Card } from "./styledCard";
import { formatNumber } from "../../util/formatNumber";
import { Tooltip } from "@mui/material";
import { useGet } from "../../queries/products";

interface IProps {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  cart: ICart;
}

export const CardComponent = ({
  id,
  name,
  brand,
  description,
  photo,
  price,
  cart,
}: IProps) => {
  const { itemQtd } = useCart();

  const [showTag, setShowTag] = useState<Boolean>(false);
  
  const { data } = useGet();

  useEffect(() => {
    const foundItem = cart.cartItems.find((item) => item.id === id);
    setShowTag(Boolean(foundItem));
  }, [id, cart.cartItems]);

  return (
    <Card>
      <span className="cart--tag" style={{ opacity: showTag ? 1 : 0 }}>
        No carrinho
      </span>
      <Tooltip title={brand}>
        <img src={photo} alt="#" />
      </Tooltip>
      <div className="topContent--container">
        <h2 className="topContent--title">{name}</h2>
        <span className="topContent--price" onClick={() => itemQtd(id)}>
          R${formatNumber(Number(price))}
        </span>
      </div>
      <span className="card--description">{description}</span>
      <button
        className="card--button"
        onClick={() =>
          !showTag
            ? data.products.find((item: IProducts) =>
                item.id === id ? cart.addItemToCart(item) : null
              )
            : null
        }
        style={{
          backgroundColor: showTag ? "#2c2c2c" : " #0f52ba",
          cursor: showTag ? "not-allowed" : "pointer",
        }}>
        <Bag />
        COMPRAR
      </button>
    </Card>
  );
};
