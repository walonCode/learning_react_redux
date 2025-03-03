
---

## **Lesson Three: RTK Query CRUD with JSON Server**  

### **📌 Project Overview**  
This project demonstrates how to use **RTK Query** for performing **CRUD (Create, Read, Update, Delete) operations** while fetching and updating data dynamically. The backend is powered by a **JSON server**, with the database stored in `data/db.json`.  

---

### **🛠️ Tech Stack**  
- **React** (with Redux Toolkit)  
- **RTK Query** (for efficient API calls)  
- **JSON Server** (mock backend)  

---

### **🚀 Features**  
✅ Fetch data from `db.json` using **RTK Query**  
✅ Add new records to the database (**Create**)  
✅ Update existing records (**Update**)  
✅ Delete records (**Delete**)  
✅ Automatically update UI when data changes  

---

### **📂 Project Structure**  
```
lesson-three/
│── src/
│   ├── app/
│   │   ├── store.js   # Redux store setup  
│   ├── features/
│   │   ├── apiSlice.js  # RTK Query API slice   
│   ├── components 
│── data/
│   ├── db.json   # JSON Server database  
│── package.json  
│── README.md  
```

---

### **📥 Installation & Setup**  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/walonCode/learning_react_redux.git
cd learning_react_redux/lesson_03
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Start JSON Server**  
```sh
npm run server
```

4️⃣ **Run the React App**  
```sh
npm run dev
```

---

### **📡 RTK Query API Setup (`apiSlice.js`)**  
```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["Todos"]
    }),
    addTodos: builder.mutation({
      query: (newPost) => ({
        url: "/todo",
        method: "POST",
        body: newPost
      }),
      invalidatesTags: ["Todos"]
    }),
    updateTodos: builder.mutation({
      query: ({ id, ...updatedTodos }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: updatedPost
      }),
      invalidatesTags: ["Todos"]
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Todos"]
    })
  })
});

export const { useGetTodosQuery, useAddTodosMutation, useUpdateTodosMutation, useDeleteTodosMutation } = apiSlice;
```

---

### **📝 Sample `db.json` (Mock Database)**  
```json
{
  "todos": [
    { "id": 1, "title": "Learn RTK Query", "content": "Powerful data fetching!" },
    { "id": 2, "title": "Setup JSON Server", "content": "Fake backend for testing" }
  ]
}
```

---

### **🔗 Resources & Learning**  
- 📖 [Redux Toolkit Docs](https://redux-toolkit.js.org/)  
- 📖 [RTK Query Guide](https://redux-toolkit.js.org/rtk-query/overview)  
- 📖 [JSON Server](https://github.com/typicode/json-server)  

---

### **💡 Conclusion**  
This project demonstrates **how to efficiently fetch and manage data** using **RTK Query** while performing **CRUD operations** on a mock backend (`db.json`). 🚀  

