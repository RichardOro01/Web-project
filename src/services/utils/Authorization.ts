export function authorizeModifyData(role: number | undefined, service: string) {
  let flag = true;
  let services = [
    "Brands",
    "Cars",
    "Drivers",
    "Couples",
    "Districts",
    "Fuels",
    "Countries",
    "Months",
    "Groups",
    "Users",
  ];
  if (role != 1) {
    if (services.includes(service)) flag = false;
  }
  return flag;
}
