import { 
    createSlice, 
    nanoid,
    createAsyncThunk,
    createSelector,
    createEntityAdapter 
} from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdaptor = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdaptor.getInitialState({
    status: 'idle',  
    error: null,
    count: 0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL)
    return response.data
}) 

export const addNewPost = createAsyncThunk('/posts/addNewPost', async(initialPost) => {
    try {
        const res = await axios.post(POST_URL,initialPost)
        return res.data
    }catch(error){
        console.error(error)
    }
})

export const updatePost = createAsyncThunk('/posts/updatePost',async(initialPost) => {
    const { id }  = initialPost
    try{
        const res = await axios.put(`${POST_URL}/${id}`,initialPost)
        return res.data
    }catch(error){
        console.error(error)
        return initialPost //test only
    }
})

export const deletePost = createAsyncThunk('/posts/deletePost', async(initialPost) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POST_URL}/${Number(id)}`)
    if(response?.status === 200) return initialPost    
    return `${response?.status}: ${response?.statusText}` 
})

//creating the post slice
const postSlice = createSlice({
    //name
    name:"posts",
    //initial state
    initialState,
    //function on the slice
    reducers:{
        //adding post to the initial state
        addPost:  {
            reducer: (state, action) => {
            state.posts.push(action.payload)
            },
            // helps to validate data in one place
            prepare: (title, content,userId) => {
                return {
                    payload: {
                        id:nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions : {
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                            thumbsUp: 0
                        }
                    }
                }
            },
        },
        reactionAdded : (state,action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        },
        increaseCount(state){
            state.count = state.count + 1;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state,action) => {
            state.status='succeeded'
            //Adding the items
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), {minutes:min++}).toISOString()
                post.reactions = {
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                    thumbsUp: 0
                }
                return post;
            });
            postsAdaptor.upsertMany(state, loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state,action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
                thumbsUp: 0
            }
            console.log(action.payload)
            postsAdaptor.addOne(state,action.payload);
        })
        .addCase(updatePost.fulfilled, (state,action) => {
            if(!action.payload?.id){
                console.log('update could not complete')
                console.log(action.payload)
                return
            }
            // const { id } = action.payload
            action.payload.date = new Date().toISOString()
            // const posts = state.posts.filter(post => post.id !== id)
            postsAdaptor.upsertOne(state, action.payload)
        })
        .addCase(deletePost.fulfilled, (state,action) => {
            if(!action.payload.id){
                console.log('Delete could not complete')
                console.log(action.payload)
                return
            }
            const { id } = action.payload
            // const post = state.posts.filter(post => post.id !== Number(id))
            postsAdaptor.removeOne(state,id)
        })
    }
})

// exporting the addPost function
export const { addPost,reactionAdded,increaseCount }  = postSlice.actions; 

//send the state 

//using getSelector from the createAdaptorApi for state
export const {
    selectAll:selectAllPost,
    selectById:selectPostById,
    selectIds: selectPostId
} = postsAdaptor.getSelectors(state => state.posts)

export const getPostStatus = (state) => state.posts.status; 
export const getPostError = (state) => state.posts.error ;
export const getCount = (state) => state.posts.count;

//sending an indiviual post
export const selectPostByUser = createSelector(
    [selectAllPost,(state, userId) => userId],
    (posts,userId) => posts.filter(post => post.userId === userId)
)

//used by the store
export default postSlice.reducer;