export const getShopkeeperToken = () => localStorage.getItem("shopkeeperToken");

export const setShopkeeperToken = (token) => {
  localStorage.setItem("shopkeeperToken", token);
};

export const removeShopkeeperToken = () => {
  localStorage.removeItem("shopkeeperToken");
};
