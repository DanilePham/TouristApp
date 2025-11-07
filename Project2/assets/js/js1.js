
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

if (listFilepondImage.length > 0) {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    FilePond.registerPlugin(FilePondPluginFileValidateType);

    listFilepondImage.forEach(filepondImage => {
        FilePond.create(filepondImage, {
            labelIdle: "+",
            acceptedFileTypes: ['image/*'],
        });
    });
}
//End Filepond

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
