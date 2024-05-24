import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLinks = createAsyncThunk(
    'links/fetchLinks',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:2000/links/getAll', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch links');
        }
        const data = await response.json();
        console.log('Fetched links data:', data.links);
        return data.links;
    }
);

export const addLinks = createAsyncThunk(
    'links/addLink',
    async (linkData, thunkAPI) => {
        try {
            thunkAPI.dispatch(addLinksStart());
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:2000/links/addLink', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ links: linkData })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add list');
            }
            const updatedLinks = await response.json();
            thunkAPI.dispatch(addLinksSuccess());
            return updatedLinks;
        } catch (error) {
            thunkAPI.dispatch(addLinksFailure(error.message));
            throw error;
        }
    }
);

const initialState = {
    links: [],
    loading: false,
    error: null,
};

export const linksSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        addLinksStart(state) {
            state.loading = true;
            state.error = null;
        },
        addLinksSuccess(state) {
            state.loading = false;
        },
        addLinksFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addLinksStart, addLinksSuccess, addLinksFailure } = linksSlice.actions;

export default linksSlice.reducer;