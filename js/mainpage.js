var data = document.querySelector('#data')
var web_search = document.querySelector('#search')
var show_data = document.getElementById('show_data');
var data_list ;
var btn_lo = document.querySelector('#logout')
var btn_add = document.querySelector('#add')
var btn_update = document.querySelector('#update')
var s = JSON.parse(localStorage.getItem('userinfo'))
var globalindex ; 



btn_lo.addEventListener('click',logout)


if (localStorage.getItem('data')==null){
    data_list = [];
}
else{
    data_list = JSON.parse(localStorage.getItem('data'));
    display(data_list)
}

btn_add.addEventListener('click',save)
function save(){
    if(data.value == ""){
        window.alert('Please enter data')
    }
    else{
        var obg ={
            info:data.value, 
        }
        data_list.push(obg)
        localStorage.setItem('data',JSON.stringify(data_list))
        display(data_list)
        clear()
    }
}
function display(array){
    var box;
    for (var i = 0; i < array.length; i++) {
        var corectindex = data_list.indexOf(array[i])
        box += `
            <tr>
                <td>
                    <p class="my-2" >${array[i].info}</p>
                </td>
                <td>
                    <a class="btn text-white bg-warning" onclick="update(${corectindex})"><i
                        class="fa-solid fa-eye pe-2 me-1"></i>Update</a>
                </td>
                <td>
                    <a href="#" class="btn bg-danger text-white "onclick="delet(${corectindex})" ><i class="fa-solid fa-trash-can me-1"></i>Delet</a>
                </td>
            </tr>
        `;
    }
    show_data.innerHTML = box
}
function clear(){
    data.value = null
}
function delet(index){
    data_list.splice(index,1);
    localStorage.setItem('data',JSON.stringify(data_list))
    display(data_list)
}

btn_update.addEventListener('click',saveupdate)
function update(index){
    globalindex = index;
    btn_update.classList.replace('d-none','d-block')
    btn_add.classList.add('d-none')
    data.value = data_list[index].info;
}
function saveupdate(){
    if(data.value == ""){
        window.alert('Please enter data')
    }
    else{
        btn_update.classList.replace('d-block','d-none')
        btn_add.classList.remove('d-none')
        data_list[globalindex].info = data.value
        localStorage.setItem('data',JSON.stringify(data_list))
        display(data_list)
    }
}

web_search.addEventListener('input',Searchh)
function Searchh(){
    var tre = web_search.value.trim().toLowerCase()
    var searcharray =[];
    for (let i = 0; i < data_list.length; i++) {
        if(data_list[i].info.trim().toLowerCase().includes(tre)==true){
            searcharray.push(data_list[i])
        }
    }
    display(searcharray)
}


function logout(){
    localStorage.removeItem('sessionUsername')
    window.open('singin.html','_self')
}
function getdata(){
    var info = localStorage.getItem('sessionUsername');
    if(info){
        document.getElementById('username').innerHTML = 'Welcome ' + info
    }
    else{
        window.open('singin.html','_self')
    }
}
getdata()