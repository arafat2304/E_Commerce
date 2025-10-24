const GroceryQuickItems = () => {
  const groceries = [
    { name: "Tomatoes", price: 45, img: "/images/tomato.jpg" },
    { name: "Milk 1L", price: 65, img: "/images/milk.jpg" },
    { name: "Chips", price: 20, img: "/images/chips.jpg" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {groceries.map((g, i) => (
        <div
          key={i}
          className="bg-white border rounded-lg p-3 hover:shadow-md transition text-center"
        >
          <img src={g.img} alt={g.name} className="w-24 h-24 object-contain mx-auto" />
          <p className="mt-2 font-medium">{g.name}</p>
          <p className="text-orange-600 font-semibold">₹{g.price}</p>
        </div>
      ))}
    </div>
  );
};
export default GroceryQuickItems;
