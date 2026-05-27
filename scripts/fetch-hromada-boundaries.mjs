const query = `
[out:json][timeout:60];
area["ISO3166-1"="UA"]->.ua;
(
  relation["boundary"="administrative"]["admin_level"="8"]["name:uk"~"Буштинська|Колочавська|Драгівська|Синевирська",i](area.ua);
);
out tags ids;
`;

const res = await fetch("https://overpass.kumi.systems/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "tera-website/0.1 (local dev script)",
  },
  body: new URLSearchParams({ data: query }),
});
const data = await res.json();
for (const el of data.elements ?? []) {
  console.log(el.id, el.tags?.["name:uk"] ?? el.tags?.name);
}
