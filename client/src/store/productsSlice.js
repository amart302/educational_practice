import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:3333/products/all');
        const data = await response.json();
        return data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await fetch(`http://localhost:3333/products/${productId}`);
        const data = await response.json();
        return data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        categories: {},
        productDetails: null, // Поле для хранения данных о товаре
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload.reduce((acc, product) => {
                    const { categoryId } = product;
                    if (!acc[categoryId]) {
                        acc[categoryId] = [];
                    }
                    acc[categoryId].push(product);
                    return acc;
                }, {});
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetails = action.payload; // Сохраняем данные о товаре
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;