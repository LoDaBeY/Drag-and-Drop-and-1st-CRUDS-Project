let title = document.getElementById('title');
let price = document.getElementById('price');
let tex = document.getElementById('tex');
let discount = document.getElementById('discount');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let count = document.getElementById('count');
let Catagory = document.getElementById('catagory')
let submit = document.getElementById('loginSubmit');
let submitCreate = document.getElementById('submit')
let searchbar = document.getElementById('searchbar');
let SearchByTitle = document.getElementById('SearchByTitle');
let SearchByCatagory = document.getElementById('SearchByCatagory');
let Delete = document.getElementById('Delete');
let DeleteAllBtn = document.getElementById('DeleteAllBtn')
let Update = document.getElementById('Update');
let mood = 'Create'
let temp;
let dataproduct;
let SearchMood = 'SearchByTitle';


// Totoal Color
function GetTotalandChangeColoroftheTotal() {
    if (price.value != '') {
        let result = (+price.value + +tex.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product)
}else{
    dataproduct = [];
}
// create btn and Local Storage
function SUBMIT() {
    let newproduct = {

        title : title.value,
        price : price.value,
        tex : tex.value,
        discount : discount.value,
        ads : ads.value,
        total : total.innerHTML,
        count : count.value,
        Catagory : Catagory.value,
    }
    if (mood === 'Create') {
            if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
            
            dataproduct.push(newproduct);
        }
    } else {
        dataproduct.push(newproduct);
    }
    } else {
        dataproduct [temp]= newproduct;
        submitCreate.innerHTML = 'Create';
        total.innerHTML = '';
        count.style.display = 'block'
        

    }

    mood = 'Create';
    localStorage.setItem('product', JSON.stringify(dataproduct))
    ClearDataAfterClickOnCreate()
    showdata()
}


//Data clear after create 
function ClearDataAfterClickOnCreate() {
    title.value = '';
    price.value = '';
    tex.value = '';
    discount.value = '';
    ads.value = '';
    count.value = '';
    Catagory.value = '';
    total.innerHTML = '';
}
// Data show in Table
function showdata() {
    let Table = '';

    for (let i = 0; i < dataproduct.length; i++) {
       Table += `
       <tr>
       <td> ${[i+1]} </td>
       <td> ${dataproduct[i].title} </td>
       <td>${dataproduct[i].price}</td>
       <td>${dataproduct[i].tex}</td>
       <td>${dataproduct[i].discount}</td>
       <td>${dataproduct[i].ads}</td>
       <td>${dataproduct[i].Catagory}</td>
       <td>${dataproduct[i].total}</td>
       <td><button onclick="updatabtn(${i})" id="Update" >Update </button></td>
       <td><button onclick="deletebtn(${i})" id="Delete" >Delete </button></td>
       `
        
    }
    if (dataproduct.length > 0) {
        DeleteAllBtn.innerHTML = `
        <button onclick=" deleteALL()" id="deleteallinsidebtb" > Delete All ( ${dataproduct.length} )</button>
        `
        DeleteAllBtn.style.display = 'block';
    } else {
        DeleteAllBtn.innerHTML = '';
        DeleteAllBtn.style.display = 'none';

    }

    document.getElementById('tbody').innerHTML = Table
}
showdata()



// delete btn All
function deleteALL() {
    localStorage.clear()
    dataproduct.splice(0)
    showdata()
}

// Updata btn
function updatabtn(i) {
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    tex.value = dataproduct[i].tex;
    discount.value = dataproduct[i].discount;
    ads.value = dataproduct[i].ads;
    total.innerHTML = dataproduct[i].total;
    Catagory.value = dataproduct[i].Catagory;
    submitCreate.innerHTML = 'Update';
    count.style.display = 'none';
    GetTotalandChangeColoroftheTotal()
    mood = 'update'
    temp= i
    scroll({
        top : 0,
        behavior : "smooth",
    })
}

// Delete btn
function deletebtn(i) {
    dataproduct.splice(i,1);
    localStorage.product = JSON.stringify(dataproduct);
    showdata()
}

// Search by Title and Catagory


function SearchonBarBy(id) {
    if (id == 'SearchByTitle' ) {
        SearchMood = 'SearchByTitle';
        searchbar.placeholder = 'Search By Title'
    } else {
        SearchMood = 'SearchByCatagory';
        searchbar.placeholder = 'Search By Catagory'
    }
    searchbar.focus()
    searchbar.value = '';
    showdata()
}
// Search In table
let table = '';
function SearchInTable(value) {
    for (let i = 0; i < dataproduct.length; i++) {
        if (SearchMood == 'SearchByTitle') {
                if (dataproduct[i].title.includes(value)) {
                    table += `
                    <tr>
                    <td>${[i+1]} </td>
                    <td>${dataproduct[i].title} </td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].tex}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].Catagory}</td>
                    <td>${dataproduct[i].total}</td>
                    <td><button onclick="updatabtn(${i})" id="Update" >Update </button></td>
                    <td><button onclick="deletebtn(${i})" id="Delete" >Delete </button></td>`}
                }
                    else { 
                        if (dataproduct[i].Catagory.includes(value)) {
                        table += `
                        <tr>
                        <td>${[i+1]} </td>
                        <td>${dataproduct[i].title} </td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].tex}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].Catagory}</td>
                        <td>${dataproduct[i].total}</td>
                        <td><button onclick="updatabtn(${i})" id="Update" >Update </button></td>
                        <td><button onclick="deletebtn(${i})" id="Delete" >Delete </button></td>`
                } }
    }
    document.getElementById('tbody').innerHTML = table
    
}
showdata()
// clean all data

