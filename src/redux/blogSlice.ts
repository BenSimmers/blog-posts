import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { RootState } from './store';

const url = import.meta.env.VITE_URL as string;

interface Post {
  id: number;
  date_published: string;
  title: string;
  author: string;
  content: string;
}

enum StatusEnum {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface BlogState extends EntityState<Post, number> {
  status: StatusEnum;
  error: string | null;
}

const todosAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.date_published.localeCompare(b.date_published),
});

const initialState: BlogState = todosAdapter.getInitialState({
  status: StatusEnum.IDLE,
  error: null,
});

export const fetchPosts = createAsyncThunk('blog/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});


export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = StatusEnum.SUCCEEDED;
      todosAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = StatusEnum.FAILED;
      state.error = action.payload as string;
    });
  },
});

export const { selectAll: selectAllPosts, selectById: selectBlogById } = todosAdapter.getSelectors(
  (state: RootState) => state.blog as BlogState,
);

export const selectStatus = (state: RootState) => state.blog.status;
export const selectError = (state: RootState) => state.blog.error;

export default initialState;
