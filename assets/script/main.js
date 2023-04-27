import { getAllCategories, deleteCategoryByID,postCategory } from "./httprequests.js";

let list = document.querySelector(".categories");
getAllCategories().then(data=>{
    data.forEach(category => {
        list.innerHTML+=`<li class="list-group-item d-flex justify-content-between">
        <span>${category.name}</span>
        <button class="btn btn-danger" data-id="${category.id}">Delete</button>
        </li>`   
    });

    


    //delete button click event
   Array.from(list.children).forEach((item)=>{
        let deleteButton = item.children[1];
        let categoryName = item.children[0].textContent;
        deleteButton.addEventListener("click",(e)=>{
            // console.log(e.target)
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: `Are you sure to delete ${categoryName}?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  let id = e.target.getAttribute("data-id");
                  deleteCategoryByID(id)
                  //delete from UI
                  e.target.parentElement.remove()
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
        })
    })
});

//open modal
let openModal = document.querySelector(".open-modal");
let closeModal = document.querySelector(".close-modal")
let modal = document.querySelector("#add-category-modal");
openModal.addEventListener("click",()=>{
    document.body.classList.add("modal-body");
    modal.style.opacity="1";
    modal.style.visibility="visible";
    modal.style.transform=" translate(-50%,-50%) scale(1)";
});


closeModal.onclick=function(){
   ModalClose();
}

function ModalClose(){
    document.body.classList.remove("modal-body");
    modal.style.opacity="0";
    modal.style.visibility="hidden";
    modal.style.transform=" translate(-50%,-50%) scale(0)";
}

//add product
let nameInput = document.querySelector("#name");
let descInput = document.querySelector("#desc");
let form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const category = {
    name:nameInput.value,
    description:descInput.value
  }

  //reset inputs
  nameInput.value="";
  descInput.value="";
  postCategory(category);


  //add product UI
  list.innerHTML+=`<li class="list-group-item d-flex justify-content-between">
  <span>${category.name}</span>
  <button class="btn btn-danger" data-id="${category.id}">Delete</button>
  </li>` 
  
  
  //close modal
  ModalClose();
})
