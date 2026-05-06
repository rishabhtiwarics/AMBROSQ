export const CATEGORIES = [
  { id: 1, title: "Men Perfume", products: "35 Products", image: "/categryimg/Gemini_Generated_Image_ (3).png" },
  { id: 2, title: "Women Perfume", products: "43 Products", image: "/categryimg/Gemini_Generated_Image_ (8).png" },
  { id: 3, title: "Unisex Fragrance", products: "16 Products", image: "/categryimg/Gemini_Generated_Image_ (9).png" },
  { id: 4, title: "Luxury Collection", products: "23 Products", image: "/categryimg/Gemini_Generated_Image_ (10).png" },
  { id: 5, title: "Attar / Oud", products: "19 Products", image: "/categryimg/Gemini_Generated_Image_ (11).png" },
];

export const FEATURED_IMAGES = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588405748347-49dbc5016f4c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595428774223-952615744827?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512781577229-ff9e3b8d145e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608528577221-90820f3869ad?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583445013765-48c220fb3f9f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616984748474-20a439775240?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627384113710-424c9181ebbb?q=80&w=600&auto=format&fit=crop",
];

export const FEATURED_PRODUCTS = FEATURED_IMAGES.map((url, i) => ({
  id: i + 1,
  name: `Essence N°${i + 1}`,
  image: url,
}));
