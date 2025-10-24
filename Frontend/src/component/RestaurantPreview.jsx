const RestaurantPreview = () => {
  const restaurants = [
    { id: 1, name: "Domino’s Pizza", img: "/images/dominos.jpg", rating: 4.3 },
    { id: 2, name: "Biryani House", img: "/images/biryani.jpg", rating: 4.1 },
    { id: 3, name: "Burger King", img: "/images/burgerking.jpg", rating: 4.4 },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {restaurants.map((r) => (
        <div
          key={r.id}
          className="bg-white rounded-xl shadow hover:shadow-lg p-3 cursor-pointer transition"
        >
          <img src={r.img} alt={r.name} className="rounded-lg w-full h-40 object-cover" />
          <h3 className="mt-2 font-medium">{r.name}</h3>
          <p className="text-sm text-gray-500">⭐ {r.rating}</p>
        </div>
      ))}
    </div>
  );
};
export default RestaurantPreview;
