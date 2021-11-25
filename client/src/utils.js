const formatAddress = (address) => {
  return (
    address?.slice(0, 4) +
    "..." +
    address?.slice(address.length - 4, address.length)
  );
};

export { formatAddress };

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
