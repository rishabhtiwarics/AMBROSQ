import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: '1',
      name: 'Noir Elegance',
      price: 245,
      description: 'A sophisticated blend of deep oud and mysterious spices.',
      category: 'Parfum',
      image: '/product_images/Gemini_Generated_Image_(1).png',
      hoverImage: '/product_images/Gemini_Generated_Image_(4).png',
      rating: 5,
    },
    {
      id: '2',
      name: 'Golden Oud',
      price: 320,
      description: 'Pure liquid gold captured in a bottle with hints of saffron.',
      category: 'Extrait de Parfum',
      image: '/product_images/Gemini_Generated_Image_(5).png',
      hoverImage: '/product_images/Gemini_Generated_Image_(20).png',
      rating: 4,
    },
    {
      id: '3',
      name: 'Rose Garden',
      price: 185,
      description: 'Morning dew on fresh Damask roses with a base of white musk.',
      category: 'Eau de Parfum',
      image: '/product_images/Gemini_Generated_Image_(21).png',
      hoverImage: '/product_images/Gemini_Generated_Image_(22).png',
      rating: 5,
    },
    {
      id: '4',
      name: 'Imperial Scent',
      price: 290,
      description: 'An majestic aroma of amber and royal spices.',
      category: 'Signature',
      image: '/product_images/Gemini_Generated_Image_(24).png',
      hoverImage: '/product_images/Gemini_Generated_Image_(25).png',
      rating: 5,
    }
  ],
  isLoading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
