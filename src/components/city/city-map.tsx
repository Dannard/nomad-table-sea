import type { Recommendation } from "@/lib/content/schema";

type CityMapProps = {
  center: { lat: number; lng: number; zoom: number };
  places: Recommendation[];
};

function getBounds(places: Recommendation[], center: { lat: number; lng: number }) {
  if (!places.length) {
    const pad = 0.06;
    return {
      left: center.lng - pad,
      right: center.lng + pad,
      top: center.lat + pad,
      bottom: center.lat - pad,
    };
  }

  const lats = places.map((item) => item.lat);
  const lngs = places.map((item) => item.lng);

  return {
    left: Math.min(...lngs) - 0.03,
    right: Math.max(...lngs) + 0.03,
    top: Math.max(...lats) + 0.03,
    bottom: Math.min(...lats) - 0.03,
  };
}

export function CityMap({ center, places }: CityMapProps) {
  const bounds = getBounds(places, center);
  const query = `${bounds.left},${bounds.top},${bounds.right},${bounds.bottom}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="h-[360px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
        <iframe
          title="OpenStreetMap city food guide"
          className="h-full w-full"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${query}&layer=mapnik&marker=${center.lat}%2C${center.lng}`}
          loading="lazy"
        />
      </div>
      <ul className="space-y-3">
        {places.slice(0, 8).map((place) => (
          <li key={`${place.name}-${place.lat}`} className="border-b border-[var(--line)] pb-3">
            <p className="font-semibold text-[var(--ink)]">{place.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {place.area} · {place.priceRange} · {place.bestFor}
            </p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=16/${place.lat}/${place.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm text-[var(--accent)]"
            >
              Open map pin
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
