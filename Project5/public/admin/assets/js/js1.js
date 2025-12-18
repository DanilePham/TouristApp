const initTinyMCE = (selector) => {
    tinymce.init({
        selector: selector,
        plugins: ['autosave', 'anchor', 'link', 'charmap', 'lists', 'image', 'media'],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | anchor link charmap image media numlist bullist',
    });
}
initTinyMCE('[textarea-mce]');

//menu for mobile
const menuumobile = document.querySelector('.header .inner-button-menu');
if (menuumobile) {
    const sider = document.querySelector('.sider');
    const sideroverlay = document.querySelector('.sider-overlay');

    menuumobile.addEventListener('click', () => {
        sider.classList.add('active');
        sideroverlay.classList.add('active');
    });

    sideroverlay.addEventListener('click', () => {
        sider.classList.remove('active');
        sideroverlay.classList.remove('active');
    });
}
//End menu for mobile

// -------------------------------------------------------------------//


//Add more schdeule (duplicate item)
const addmoreschedulebtn = document.querySelector(".section-8 .inner-schedule")
console.log(addmoreschedulebtn);
if (addmoreschedulebtn) {
    const buttonforaddmoreschedule = addmoreschedulebtn.querySelector(".inner-schedule-create");
    const elementList = addmoreschedulebtn.querySelector(".inner-schedule-list");

    buttonforaddmoreschedule.addEventListener('click', () => {
        //Nhan bang ca cum list
        const fristitem = elementList.querySelector(".inner-schedule-item");
        const cloneItem = fristitem.cloneNode(true); //important true de clone ca content
        cloneItem.querySelector("input").value = ""; //reset value input
        const id = `mce_${Date.now()}`; //tao id moi cho textarea
        cloneItem.querySelector(".inner-schedule-body").innerHTML = `
        <textarea id="${id}"> </textarea> 
        `;
        console.log(cloneItem);
        elementList.appendChild(cloneItem);
        initTinyMCE(`#${id}`); //khoi tao tinymce cho textarea moi them vao
    });

    elementList.addEventListener('click', (e) => {
        //Them Lich trinh
        if (e.target.closest('.inner-more')) {
            const parentItem = e.target.closest(".inner-schedule-item");
            parentItem.classList.toggle("hidden");
        }
        //Xoa lich trinh
        if (e.target.closest(".inner-remove")) {
            const parentItem = e.target.closest(".inner-schedule-item");
            if (elementList.children.length <= 1) {
                alert("You must have at least one schedule item.");
                return;
            }
            elementList.removeChild(parentItem);
        }
    });

    //Keo Tha Item
    new Sortable(elementList, {
        handle: '.inner-move', // handle's class
        animation: 150,
        onStart: (event) => {
            console.log("started");
            const textarea = event.item.querySelector("textarea");
            const id = textarea.id;
            tinymce.get(id).remove();
        },
        onEnd: (event) => {
            const textarea = event.item.querySelector("textarea");
            const id = textarea.id;
            initTinyMCE(`#${id}`);
        }
    });
    //End keo tha item
}
//End Add more schdeule (duplicate item)

// -------------------------------------------------------------------//

//Filepond

const listFilepondImage = document.querySelectorAll("[filepond-image]");
let filePond = {};
if (listFilepondImage.length > 0) {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    FilePond.registerPlugin(FilePondPluginFileValidateType);

    listFilepondImage.forEach(filepondImage => {
        const imageDefault = filepondImage.getAttribute("image-default");
        let files = null;
        if (imageDefault) {
            files = [
                {
                    source: imageDefault
                }
            ]
        }
        console.log(filepondImage.name);
        filePond[filepondImage.name] = FilePond.create(filepondImage, {
            labelIdle: "+",
            acceptedFileTypes: ['image/*'],
            files: files
        });
    });
}
//End Filepond

// -------------------------------------------------------------------//


//Create chart for dashboard
const chartDashboard = document.querySelector('#revenueChart');
if (chartDashboard) {
    new Chart(chartDashboard, {
        type: 'line',
        data: {
            labels: ['01', '02', '03', '04', '05', '06'],
            datasets: [{
                label: '# of Votes 1',
                data: [12000000, 19000000, 30000000, 15000000, 20000000, 26000000],
                borderWidth: 1.5,
                borderColor: '#FF6384',
            }
                ,
            {
                label: '# of Votes 2',
                data: [10000000, 14000000, 20000000, 11000000, 13000000, 21000000],
                borderWidth: 1.5,
                borderColor: '#36A2EB',
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
        }
    });
}

// -------------------------------------------------------------------//


//Category form validate
const categoryCreateFrom = document.querySelector("#category-create-form");
console.log(categoryCreateFrom);
if (categoryCreateFrom) {
    const validator = new JustValidate('#category-create-form');
    validator
        // .addField("#nameDM", [
        //     {
        //         rule: 'required',
        //         errorMessage: 'Vui lòng nhập tên danh mục',
        //     }
        // ])
        .onSuccess((event) => {
            event.preventDefault();
            const name = event.target.nameDM.value;
            const parent = event.target.parent.value;
            const position = event.target.position.value;
            const status = event.target.status.value;
            const avatar = filePond.avatar.getFile()?.file;
            const des = tinymce.get("description").getContent();

            const formData = new FormData();
            formData.append("name", name);
            formData.append("parent", parent);
            formData.append("position", position);
            formData.append("status", status);
            formData.append("description", des);
            formData.append("avatar", avatar);

            fetch(`/${pathAdmin}/categories/create`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "error") {
                        notify.error(data.message);
                    }
                    if (data.code === "success") {
                        notify.success(data.message);
                        window.locattion.reload(); //reload page
                    }
                });
        });
}
//end category form validate

// -------------------------------------------------------------------//


//Category form validate
const categoryEditForm = document.querySelector("#category-edit-form");
console.log(categoryCreateFrom);
if (categoryEditForm) {
    const validator = new JustValidate('#category-edit-form');
    validator
        // .addField("#nameDM", [
        //     {
        //         rule: 'required',
        //         errorMessage: 'Vui lòng nhập tên danh mục',
        //     }
        // ])
        .onSuccess((event) => {
            event.preventDefault();
            const id = event.target.id.value;
            const name = event.target.name.value;
            const parent = event.target.parent.value;
            const position = event.target.position.value;
            const status = event.target.status.value;
            const avatar = filePond.avatar.getFile()?.file;
            const des = tinymce.get("description").getContent();

            const formData = new FormData();
            formData.append("name", name);
            formData.append("parent", parent);
            formData.append("position", position);
            formData.append("status", status);
            formData.append("description", des);
            formData.append("avatar", avatar);

            fetch(`/${pathAdmin}/categories/edit/${id}`, {
                method: "PATCH",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "error") {
                        notify.error(data.message);
                    }
                    if (data.code === "success") {
                        notify.success(data.message);
                    }
                });
        });
}
//end category edit form validate

// -------------------------------------------------------------------//

//Sider
const sider = document.querySelector('.sider');
if (sider) {
    const pathnameCurrent = window.location.pathname;
    const menuLists = sider.querySelectorAll("a");
    const pathNameCurrentSplit = pathnameCurrent.split('/');
    menuLists.forEach(item => {
        const pathnameItem = item.getAttribute('href');
        const pathNameSplit = pathnameItem.split('/');
        if (pathNameCurrentSplit[1] === pathNameSplit[1] && pathNameCurrentSplit[2] === pathNameSplit[2]) {
            item.classList.add('active');
        }
    })
}
//end sider

// -------------------------------------------------------------------//
//Delete button
const deletebuttons = document.querySelectorAll("[button-delete]");
if (deletebuttons.length > 0) {
    deletebuttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Delete clicked");
            const dataApi = button.getAttribute("data-api");
            fetch(dataApi, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "error") {
                        notify.error(data.message);
                    }
                    if (data.code === "success") {
                        drawNotify(data.code, data.message);
                        window.location.reload();
                    }
                });
        })
    });
}
//End delete button

// -------------------------------------------------------------------//
//button Undo
const undoButton = document.querySelectorAll("[button-undo]");
if (undoButton.length > 0) {
    undoButton.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Undo clicked");
            const dataApi = button.getAttribute("data-api");
            fetch(dataApi, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "error") {
                        notify.error(data.message);
                    }
                    if (data.code === "success") {
                        drawNotify(data.code, data.message);
                        window.location.reload();
                    }
                });
        })
    });
}
//End button Undo


// -------------------------------------------------------------------//

//filter-status
const filterStatus = document.querySelector("[filter-status]");
if (filterStatus) {
    const url = new URL(window.location.href);



    filterStatus.addEventListener('change', () => {
        const selectedValue = filterStatus.value;
        if (selectedValue) {
            url.searchParams.set('status', selectedValue);
        } else {
            url.searchParams.delete('status');
        }
        window.location.href = url.href;
    })

    //express selected default
    const currentValue = url.searchParams.get('status');
    if (currentValue) {
        filterStatus.value = currentValue;
    }
}
//End filter-status

// -------------------------------------------------------------------//

//filter-createdBy
const filterCreatedBy = document.querySelector("[filter-createdBy]");
if (filterCreatedBy) {
    const url = new URL(window.location.href);

    filterCreatedBy.addEventListener('change', () => {
        const selectedValue = filterCreatedBy.value;
        if (selectedValue) {
            url.searchParams.set('createdBy', selectedValue);
        } else {
            url.searchParams.delete('createdBy');
        }
        window.location.href = url.href;
    })

    //express selected default
    const valueCurent = url.searchParams.get('createdBy');
    if (valueCurent) {
        filterCreatedBy.value = valueCurent;
    }
}
//End filter-createdBy
// -------------------------------------------------------------------//

//filter-date start
const filterStartDate = document.querySelector("[filter-startDate]");
if (filterStartDate) {
    const url = new URL(window.location.href);

    filterStartDate.addEventListener('change', () => {
        const selectedValue = filterStartDate.value;
        if (selectedValue) {
            url.searchParams.set('startDate', selectedValue);
        } else {
            url.searchParams.delete('startDate');
        }
        window.location.href = url.href;
    })

    //express selected default
    const valueCurent = url.searchParams.get('startDate');
    if (valueCurent) {
        filterStartDate.value = valueCurent;
    }
}
//End filter-date start

// -------------------------------------------------------------------//

//filter-date end
const filterEndDate = document.querySelector("[filter-endDate]");
if (filterEndDate) {
    const url = new URL(window.location.href);

    filterEndDate.addEventListener('change', () => {
        const selectedValue = filterEndDate.value;
        if (selectedValue) {
            url.searchParams.set('endDate', selectedValue);
        } else {
            url.searchParams.delete('endDate');
        }
        window.location.href = url.href;
    })

    //express selected default      
    const valueCurent = url.searchParams.get('endDate');
    if (valueCurent) {
        filterEndDate.value = valueCurent;
    }
}
//End filter-date end

// -------------------------------------------------------------------//

//Reset filter
const filterReset = document.querySelector("[filter-reset]");
if (filterReset) {
    const url = new URL(window.location.href);
    filterReset.addEventListener('click', () => {
        url.searchParams.delete('status');
        url.searchParams.delete('createdBy');
        url.searchParams.delete('startDate');
        url.searchParams.delete('endDate');
        window.location.href = url.href;
    })
}
//End Reset filter

// -------------------------------------------------------------------//

//Check all
const checkAllBox = document.querySelector(`input[name=check-all]`);
if (checkAllBox) {
    checkAllBox.addEventListener('click', () => {
        console.log(checkAllBox.checked);
        const listCheckItem = document.querySelectorAll(`input[name=check-item]`);
        listCheckItem.forEach(item => {
            item.checked = checkAllBox.checked;
        });
    })
}
//end Check all

// -------------------------------------------------------------------//

//Change multi status
const changeMultiStatus = document.querySelector('.inner-change-status[change-multi]');
if (changeMultiStatus) {
    const button = changeMultiStatus.querySelector('button');
    const select = changeMultiStatus.querySelector('select');
    const dataApi = changeMultiStatus.getAttribute('data-api');

    button.addEventListener('click', () => {
        const listCheckItem = document.querySelectorAll(`input[name=check-item]:checked`);
        const listIds = [];
        listCheckItem.forEach(item => {
            listIds.push(item.value);
        });

        const option = select.value;
        if (listIds.length == 0) {
            notify.error("Vui long chon it nhat 1 mục.");
            return;
        }
        if (!option) {
            notify.error("Vui long chon 1 hành động.");
            return;
        }

        const dataFinal = {
            ids: listIds,
            action: option
        };

        fetch(dataApi, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataFinal)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == "error") {
                    notify.error(data.message);
                }
                if (data.code == "success") {
                    drawNotify(data.code, data.message);
                    window.location.reload();
                }
            }); 
    })
}
//End Change multi status

// -------------------------------------------------------------------//
//Search item
const searchItemInput = document.querySelector('[search-item]');
if (searchItemInput) {
    const url = new URL(window.location.href);

    searchItemInput.addEventListener('keyup', (e) => {
        if (e.code == "Enter") {
            const value = searchItemInput.value;
            if (value) {
                url.searchParams.set('keyword', value);
            }
            else{
                url.searchParams.delete('keyword');
            }
            window.location.href = url.href;
        }
    });

    //express selected default
    const valueCurrent=url.searchParams.get('keyword');
    if(valueCurrent){
        searchItemInput.value=valueCurrent;
    }
}

//End Search item

// -------------------------------------------------------------------//    
//Pagination
const boxPagination = document.querySelector('[box-pagination]');
if(boxPagination){
    const url=new URL(window.location.href);

    boxPagination.addEventListener('change',()=>{
        const page=boxPagination.value;
        if(page){
            url.searchParams.set('page',page);
        }else{
            url.searchParams.delete('page');
        }
        window.location.href=url.href;
    });

    //express selected default
    const pageCurrent=url.searchParams.get('page');
    if(pageCurrent){
        boxPagination.value=pageCurrent;
    }
}
//End Pagination

// -------------------------------------------------------------------//    

// Tour Create Form
const tourCreateForm = document.querySelector("#tour-create-form");
if(tourCreateForm) {
  const validator = new JustValidate('#tour-create-form');

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập tên tour!"
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file;
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];

      // locations
      const listLocationChecked = document.querySelectorAll(`[name="locations"]:checked`);
      listLocationChecked.forEach(input => {
        locations.push(input.value);
      })
      // End locations

      // schedules
      const listScheduleItem = document.querySelectorAll(".inner-schedule .inner-schedule-item");
      listScheduleItem.forEach(item => {
        const inputTitle = item.querySelector("input");
        const title = inputTitle.value;

        const textareaDescription = item.querySelector("textarea");
        const idDescription = textareaDescription.id;
        const description = tinymce.get(idDescription).getContent();

        schedules.push({
          title: title,
          description: description
        });
      })
      // End schedules

      // Tạo FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("priceAdult", priceAdult);
      formData.append("priceChildren", priceChildren);
      formData.append("priceBaby", priceBaby);
      formData.append("priceNewAdult", priceNewAdult);
      formData.append("priceNewChildren", priceNewChildren);
      formData.append("priceNewBaby", priceNewBaby);
      formData.append("stockAdult", stockAdult);
      formData.append("stockChildren", stockChildren);
      formData.append("stockBaby", stockBaby);
      formData.append("locations", JSON.stringify(locations));
      formData.append("time", time);
      formData.append("vehicle", vehicle);
      formData.append("departureDate", departureDate);
      formData.append("information", information);
      formData.append("schedules", JSON.stringify(schedules));

      fetch(`/${pathAdmin}/tours/create`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            drawNotify(data.code, data.message);
            window.location.reload(); // Load lại trang
          }
        })
    })
}
// End Tour Create Form
// -------------------------------------------------------------------//

// Tour Edit Form
const tourEditForm = document.querySelector("#tour-edit-form");
if(tourEditForm) {
  const validator = new JustValidate('#tour-edit-form');

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập tên tour!"
      },
    ])
    .onSuccess((event) => {
      event.preventDefault();
      const id = event.target.id.value;
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file;
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];

      // locations
      const listLocationChecked = document.querySelectorAll(`[name="locations"]:checked`);
      listLocationChecked.forEach(input => {
        locations.push(input.value);
      })
      // End locations

      // schedules
      const listScheduleItem = document.querySelectorAll(".inner-schedule .inner-schedule-item");
      listScheduleItem.forEach(item => {
        const inputTitle = item.querySelector("input");
        const title = inputTitle.value;

        const textareaDescription = item.querySelector("textarea");
        const idDescription = textareaDescription.id;
        const description = tinymce.get(idDescription).getContent();

        schedules.push({
          title: title,
          description: description
        });
      })
      // End schedules

      // Tạo FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("priceAdult", priceAdult);
      formData.append("priceChildren", priceChildren);
      formData.append("priceBaby", priceBaby);
      formData.append("priceNewAdult", priceNewAdult);
      formData.append("priceNewChildren", priceNewChildren);
      formData.append("priceNewBaby", priceNewBaby);
      formData.append("stockAdult", stockAdult);
      formData.append("stockChildren", stockChildren);
      formData.append("stockBaby", stockBaby);
      formData.append("locations", JSON.stringify(locations));
      formData.append("time", time);
      formData.append("vehicle", vehicle);
      formData.append("departureDate", departureDate);
      formData.append("information", information);
      formData.append("schedules", JSON.stringify(schedules));

      fetch(`/${pathAdmin}/tours/edit/${id}`, {
        method: "PATCH",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            notify.success(data.message);
          }
        })
    })
}
// End Tour Edit Form
