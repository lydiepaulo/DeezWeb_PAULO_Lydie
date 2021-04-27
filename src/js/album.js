const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams.get("id"));