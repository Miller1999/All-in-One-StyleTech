import { Fragment } from "react";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

function Home() {
  const { setSearchTitle, filteredItems } = useContext(ShoppingCartContext);

  const renderView = () => {
    if (filteredItems?.length > 0) {
      return filteredItems?.map((card) => {
        return <Card key={card.id} data={card} />;
      });
    } else {
      return <div>We do not have existences</div>;
    }
  };

  return (
    <Fragment>
      <div className="flex w-80 items-center relative justify-center mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        type="text"
        placeholder="Search your product..."
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => setSearchTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Fragment>
  );
}

export default Home;
