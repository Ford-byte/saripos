export default function ProductBlock() {
  const products = [
    {
      id: 1,
      name: "Product A",
      image: "/images/logo2.png",
      price: "$25",
    },
    {
      id: 2,
      name: "Product B",
      image: "/images/logo2.png",
      price: "$30",
    },
    {
      id: 3,
      name: "Product C",
      image: "/images/logo2.png",
      price: "$20",
    },
    {
      id: 4,
      name: "Product D",
      image: "/images/logo2.png",
      price: "$40",
    },
    {
      id: 5,
      name: "Product E",
      image: "/images/logo2.png",
      price: "$35",
    },
  ];
  return (
    <div className="center mb-8">
      <div className="container">
        <div className="center relative bg-gray-200 mb-6">
          <div className="w-full h-[20px] bg-[#2E8D2B] absolute"></div>
          <h2 className="text-2xl font-[700] text-[#2E8D2B] capitalize pt-6 pb-2">
            our top products
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 h-fit">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative h-[250px] shadow-lg border-gray-200 rounded-lg border text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full object-cover mb-2"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>
                <div className="flex justify-center">
                  <button className="text-xs my-2 border py-2 w-fit px-2 capitalize text-[#2E8D2B] border-gray-300 hover:border-[#2E8D2B] pointer rounded-lg">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
