import { Fragment, useState } from "react";
import Card from "../../Components/Card";
import { useEffect } from "react";

function Home() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <Fragment>
      Home
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {products?.map((card) => {
          return <Card key={card.id} data={card} />;
        })}
      </div>
    </Fragment>
  );
}

export default Home;
