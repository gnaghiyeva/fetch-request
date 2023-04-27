const baseURL = "https://northwind.vercel.app/api";

//get all categories
export const getAllCategories= async()=>{
    let globalData;
   await fetch(`${baseURL}/categories`)
    .then(response => response.json())
    .then(data=>{
       globalData=data;
    })
    return globalData;
}

//get category by ID

export const getCategoryByID=async(id)=>{
    let globalData;
   await fetch(`${baseURL}/categories/${id}`)
    .then(response=>response.json())
    .then(data=>{
        globalData=data
    })
    return globalData;
}

//delete category by ID
export const deleteCategoryByID = async(id)=>{
    let globalData;
    await fetch(`${baseURL}/categories/${id}`,{
        method:'DELETE',    
    })
     
}
//post Category
export const postCategory = async(category)=>{
fetch(`${baseURL}/categories`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(category),
})
}
//put Category by ID
export const editCategoryByID=async(id,category)=>{
fetch(`${baseURL}/categories/${id}`,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(category),
    // text:{
    //     'data-id':parseInt({id})
    // }    
})
}