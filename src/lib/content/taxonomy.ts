import { categorySchema, citySchema, tagSchema, type Category, type City, type Tag } from "@/lib/content/schema";

const citiesSource = [
  {
    slug: "bangkok",
    name: "Bangkok",
    intro:
      "Bangkok offers dense neighborhood variety, reliable transit links, and enough cafe and street-food depth to support long nomad stays.",
    heroImage:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: 13.7563, lng: 100.5018, zoom: 12 },
  },
  {
    slug: "chiang-mai",
    name: "Chiang Mai",
    intro:
      "Chiang Mai balances calm work rhythms with strong local food value, especially around Nimman and old city edges.",
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: 18.7883, lng: 98.9853, zoom: 12 },
  },
  {
    slug: "ho-chi-minh-city",
    name: "Ho Chi Minh City",
    intro:
      "Fast-paced and food-rich, HCMC is ideal for nomads who want strong late-night options and neighborhood-by-neighborhood variety.",
    heroImage:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: 10.7769, lng: 106.7009, zoom: 12 },
  },
  {
    slug: "da-nang",
    name: "Da Nang",
    intro:
      "Da Nang gives remote workers easy logistics, beachside mornings, and a practical balance of cafe and local food scenes.",
    heroImage:
      "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: 16.0544, lng: 108.2022, zoom: 12 },
  },
  {
    slug: "canggu",
    name: "Canggu",
    intro:
      "Canggu remains a nomad magnet, but the best food-and-work spots are usually just off the main social strips.",
    heroImage:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: -8.6481, lng: 115.1385, zoom: 13 },
  },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    intro:
      "KL is one of Southeast Asia's easiest cities for food exploration with strong rail access and layered neighborhood choices.",
    heroImage:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=80",
    mapCenter: { lat: 3.139, lng: 101.6869, zoom: 12 },
  },
];

const categoriesSource = [
  {
    slug: "best-cafes",
    name: "Best Cafes",
    description: "Laptop-friendly coffee spots with reliable seating, power, and food worth revisiting.",
  },
  {
    slug: "cheap-eats",
    name: "Cheap Eats",
    description: "Budget-friendly meals that still hold up for longer stays and repeat visits.",
  },
  {
    slug: "local-dishes",
    name: "Local Dishes",
    description: "Essential local dishes and where to find dependable versions in each city.",
  },
  {
    slug: "neighborhood-guides",
    name: "Neighborhood Guides",
    description: "Area-by-area recommendations designed for walkable food discovery.",
  },
  {
    slug: "workday-guides",
    name: "Workday Guides",
    description: "Food and cafe routes optimized for productive remote work days.",
  },
  {
    slug: "late-night",
    name: "Late Night",
    description: "Late-night meals and post-work options that are actually worth the detour.",
  },
];

const tagsSource = [
  { slug: "wifi", name: "Wi-Fi", description: "Guides that prioritize reliable internet and work-friendly setup." },
  { slug: "budget", name: "Budget", description: "Lower-cost food recommendations that avoid low-quality tradeoffs." },
  { slug: "coffee", name: "Coffee", description: "Specialty coffee spots with practical workday usability." },
  { slug: "night-owls", name: "Night Owls", description: "Food routes designed for later schedules and evening work blocks." },
  { slug: "remote-work", name: "Remote Work", description: "Content focused on routines that pair food discovery with work output." },
  { slug: "hawker", name: "Hawker", description: "Street-side and hawker-style food picks for quick, flavorful meals." },
];

export const cities: City[] = citySchema.array().parse(citiesSource);
export const categories: Category[] = categorySchema.array().parse(categoriesSource);
export const tags: Tag[] = tagSchema.array().parse(tagsSource);

export const citiesBySlug = new Map(cities.map((item) => [item.slug, item]));
export const categoriesBySlug = new Map(categories.map((item) => [item.slug, item]));
export const tagsBySlug = new Map(tags.map((item) => [item.slug, item]));
