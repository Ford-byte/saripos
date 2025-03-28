export default function PopularProductBlock() {
  const products = [
    {
      id: 1,
      name: "Product A",
      image: "/images/logo2.png",
      price: "$25",
      top: true,
    },
    {
      id: 2,
      name: "Product B",
      image: "/images/logo2.png",
      price: "$30",
      top: true,
    },
    {
      id: 3,
      name: "Product C",
      image: "/images/logo2.png",
      price: "$20",
      top: true,
    },
    {
      id: 4,
      name: "Product D",
      image: "/images/logo2.png",
      price: "$40",
      top: true,
    },
    {
      id: 5,
      name: "Product E",
      image: "/images/logo2.png",
      price: "$35",
      top: true,
    },
  ];

  return (
    <div className="center mb-8">
      <div className="container shadow p-4">
        <h2 className="text-2xl font-[700] text-[#2E8D2B] capitalize mb-4">
          our top products
        </h2>
        <div className="grid grid-cols-4 gap-4 h-fit">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative h-[250px] shadow-lg border-gray-200 rounded-lg border text-center"
            >
              {item?.top && (
                <div className="absolute w-[40px] h-[fit] bg-[#960100] top-4 py-2 text-sm text-white">
                  <div className="w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-l-[18px] border-l-[#960100] absolute ml-[40px] top-1/2 transform -translate-y-1/2"></div>
                  TOP
                </div>
              )}
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
