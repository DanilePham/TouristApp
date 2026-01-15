//Menu for mobile
const buttonMenuMobile = document.querySelector('.header .inner-button-menu');
if (buttonMenuMobile) {
    const menu = document.querySelector('.header .inner-navigation');
    const overlay = document.querySelector('.header .inner-overlay');
    buttonMenuMobile.addEventListener("click", () => {
        menu.classList.add('active');
    })

    overlay.addEventListener("click", () => {
        menu.classList.remove('active');
    })

    const listButton = menu.querySelectorAll("ul > li > i");
    listButton.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest("li").classList.toggle("active");
        })
    })
}
//End Menu Mobile

//Box address section 1
const boxaddress = document.querySelector('.section-1 .inner-form .inner-address');
if (boxaddress) {
    //Hide/open box address
    const input = boxaddress.querySelector('.inner-input-gr .inner-input');

    input.addEventListener("focus", () => {
        boxaddress.classList.add('active');
    })

    input.addEventListener("blur", () => {
        boxaddress.classList.remove('active');
    })
    //End Box address section 1

    //Take the event of each item
    const listItem = boxaddress.querySelectorAll(".inner-suggest > .inner-suggest-list > .inner-item");
    listItem.forEach((item) => {
        item.addEventListener("mousedown", () => {
            const title = item.querySelector(".inner-item-title").innerHTML.trim();
            input.value = title;
        })
    })

}
//End Take the event of each item

//box number of guests
const boxguests = document.querySelector('.section-1 .inner-form .inner-user');
if (boxguests) {
    const inputg = boxguests.querySelector('.inner-input-gr .inner-input');

    inputg.addEventListener("focus", () => {
        boxguests.classList.add('active');
    })

    // inputg.addEventListener("blur",()=>{
    //     boxguests.classList.remove('active');
    // })
    document.addEventListener("click", (event) => {
        if (!boxguests.contains(event.target)) {
            boxguests.classList.remove('active');
        }
    })

    //Add numbers and show in input
    const updateInputGuests = () => {
        const listBoxNumber = boxguests.querySelectorAll(".inner-quantity .inner-number");
        const listNumber = [];
        listBoxNumber.forEach((boxnumber) => {
            const number = parseInt(boxnumber.innerHTML);
            listNumber.push(number);
        })

        console.log(listNumber);
        const value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
        inputg.value = value;
    }


    //Click plus/minus
    const buttonUp = boxguests.querySelectorAll('.inner-quantity .inner-increase');
    const buttonDown = boxguests.querySelectorAll('.inner-quantity .inner-decrease');

    buttonUp.forEach((button) => {
        button.addEventListener("click", () => {
            const parent = button.closest(".inner-count");
            const boxnumber = parent.querySelector(".inner-number");
            const number = boxnumber.innerHTML;
            boxnumber.innerHTML = parseInt(number) + 1;
            updateInputGuests();
        })

    })

    buttonDown.forEach((button) => {
        button.addEventListener("click", () => {
            const parent = button.closest(".inner-count");
            const boxnumber = parent.querySelector(".inner-number");
            const number = boxnumber.innerHTML;
            if (parseInt(number) > 0) {
                boxnumber.innerHTML = parseInt(number) - 1;
                updateInputGuests();
            }
        })
    })
}

//End box number of guests

//Clock expired
const clockExpire = document.querySelector('[clock-expired]');
if (clockExpire) {
    const listBoxNumber = clockExpire.querySelectorAll(".inner-number");
    const expireDateTime = clockExpire.getAttribute('clock-expired');
    const expireDateTimeObj = new Date(expireDateTime);

    const updateClock = () => {
        const now = new Date();
        const remainingTime = expireDateTimeObj - now;
        if (remainingTime > 0) {
            const days = Math.floor(remainingTime / (1 * 24 * 60 * 60 * 1000));
            const hours = Math.floor((remainingTime / (60 * 60 * 1000)) % 24);
            const minutes = Math.floor((remainingTime / (60 * 1000)) % 60);
            const seconds = Math.floor((remainingTime / (1000)) % 60);

            listBoxNumber[0].innerHTML = days < 10 ? `0${days}` : days;
            listBoxNumber[1].innerHTML = hours < 10 ? `0${hours}` : hours;
            listBoxNumber[2].innerHTML = minutes < 10 ? `0${minutes}` : minutes;
            listBoxNumber[3].innerHTML = seconds < 10 ? `0${seconds}` : seconds;
        } else {
            clearInterval(intervalClock);
        }
    }
    const intervalClock = setInterval(updateClock, 1000);
}
//End Clock expired



//Box filter
const boxfilter = document.querySelector(".section-9 .inner-button-filter");

if (boxfilter) {
    const boxleft = document.querySelector(".section-9 .inner-wrap .inner-left");
    const overlay = boxleft.querySelector(".inner-overlay");
    overlay.addEventListener("click", () => {
        boxleft.classList.remove("active");
    })
    console.log(boxleft);
    boxfilter.addEventListener("click", () => {
        boxleft.classList.add("active");
    })
}
//End Box filter

// Tours Detail
const boxdetailofTour = document.querySelector(".section-10 .inner-left .box-tour-info");

if (boxdetailofTour) {
    const buttonshowmore = boxdetailofTour.querySelector(".inner-button .xemtatca-button");
    buttonshowmore.addEventListener("click", () => {
        if (boxdetailofTour.classList.contains("active")) {
            boxdetailofTour.classList.remove("active");
            buttonshowmore.innerHTML = "Xem tất cả";
        } else {
            boxdetailofTour.classList.add("active");
            buttonshowmore.innerHTML = "Thu gọn";
        }
    })
}

//Zoom anh
// new Viewer(boxdetailofTour);



//Khoi tao AOS
AOS.init();
//End Khoi tao AOS


//Swipper for section2
const swippersecion2 = document.querySelector(".swiperSection2");

if (swippersecion2) {
    new Swiper(swippersecion2, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    });
}

const swiperSection3 = document.querySelector(".swiperSection3");
if (swiperSection3) {
    new Swiper(swiperSection3, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 2200,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}


//Box images gallery
const boxImages = document.querySelector(".box-image");
if (boxImages) {
    const swiperImagesThumb = new Swiper(".swiperImagesThumb", {
        loop: true,
        spaceBetween: 5,
        slidesPerView: 4,
        freeMode: true,
        breakpoints: {
            576: {
                spaceBetween: 10,
            }
        },
    });
    const swiperImagesMain = new Swiper(".swiperImagesMain", {
        loop: true,
        spaceBetween: 10,

        thumbs: {
            swiper: swiperImagesThumb,
        },
    });

    const innerImageMain = boxImages.querySelector(".inner-image-main");
    new Viewer(innerImageMain);
}


// Tours Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");

if (boxTourSchedule) {
    //Zoom anh
    new Viewer(boxTourSchedule);
}


//Email form
const emailForm = document.querySelector("#email-form");
if (emailForm) {
    const validator = new JustValidate("#email-form");

    validator
        .addField("#email-input", [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập email của bạn',
            }
            ,
            {
                rule: 'email',
                errorMessage: 'Vui lòng nhập đúng định dạng email',
            }

        ])
        .onSuccess((event) => {
            const email = event.target.email.value;
            const datafinal = {
                email: email
            }
            fetch(`/contact/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datafinal),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "exist") {
                        notify.error(data.message);
                    }
                    else if (data.code === "success") {
                        notify.success(data.message);
                        event.target.email.value = "";
                    }
                })
        });

}
//end Email form

// Coupon
const couponForm = document.querySelector("#coupon-form");
if (couponForm) {
    const validator = new JustValidate("#coupon-form");

    validator
        .addField("#coupon-input", [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập mã giảm giá',
            }
        ])
        .onSuccess((event) => {
            const coupon = event.target.coupon.value;
            console.log(coupon);
        });
}
// End coupon

//Customer-detail form 
const customerDetailForm = document.querySelector("#customer-details-form");
if (customerDetailForm) {
    const validator = new JustValidate("#customer-details-form");

    validator
        .addField("#name-input", [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập họ và tên',
            }
            ,
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Họ và tên phải có ít nhất 3 ký tự',
            }
            ,
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Họ và tên không được vượt quá 50 ký tự',
            }
            ,
            {
                rule: 'customRegexp',
                value: /^[a-zA-ZÀ-ỹ\s]+$/,
                errorMessage: 'Họ và tên không được chứa ký tự đặc biệt hoặc số',
            }
        ])
        .addField("#phone-input", [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập số điện thoại',
            }
            ,
            {
                rule: 'number',
                errorMessage: 'Số điện thoại chỉ được chứa ký tự số',
            }
            ,
            {
                rule: 'customRegexp',
                value: /^[0-9]+$/,
                errorMessage: 'Số điện thoại không được chứa ký tự chữ cái',
            }
        ])
        .addField("#note-input", [
            {
                rule: 'maxLength',
                value: 200,
                errorMessage: 'Ghi chú không được vượt quá 200 ký tự',
            }
        ])
        .onSuccess((event) => {
            const name = event.target.name.value;
            const phone = event.target.phone.value;
            const note = event.target.note.value;
            console.log(name, phone, note);
        });

    //Display info-bank
    const listInput = customerDetailForm.querySelectorAll(`input[name='method']`);
    const inforbank = customerDetailForm.querySelector(".inner-info-bank");

    listInput.forEach((input) => {
        input.addEventListener("change", () => {
            if (input.value === "money-3") {
                inforbank.classList.add("active");
            }
            else {
                inforbank.classList.remove("active");
            }
        })
    })

}

//Display info-bank

//box filter
const boxfilterTourList = document.querySelector(".box-filter");
if (boxfilterTourList) {
    const url = new URL(`${window.location.origin}/search`)

    const buttonApply = boxfilterTourList.querySelector(".inner-button");

    buttonApply.addEventListener("click", () => {
        const filterList = [
            "fromCity",
            "toCity",
            "startDate",
            "adult",
            "child",
            "baby",
            "priceRange"
        ]

        filterList.forEach((filter) => {
            const value = boxfilterTourList.querySelector(`[name="${filter}"]`).value;
            if (value) {
                url.searchParams.append(filter, value);
            }
            else {
                url.searchParams.delete(filter);
            }
        });
        window.location.href = url.href;
    })
}
//end box filter

//form-search
const formSearch=document.querySelector("[form-search]") //find elements have the attribute form-search
if(formSearch){ 
    const url = new URL(`${window.location.origin}/search`) //create a URL object with base URL
    formSearch.addEventListener("submit",(event)=>{
        event.preventDefault();

        //Location To
        const location=formSearch.locationToSth.value;

        if(location){
            url.searchParams.set("locationToSth", location); //http://localhost:3000/search?locationTo=Japan if you input Japan
        }else{
            url.searchParams.delete("locationToSth")
        }

        //Number of customers
        const adultNumber=formSearch.querySelector("[stock-adult]").innerHTML.trim();
        if(adultNumber){
            url.searchParams.set("stockAdult",adultNumber);
        }
        else{
            url.searchParams.delete("stockAdult");
        }

        const childNumber=formSearch.querySelector("[stock-children]").innerHTML.trim();
        if(childNumber){
            url.searchParams.set("stockChildren",childNumber);
        }
        else{
            url.searchParams.delete("stockChildren");
        }
        
        const babyNumber=formSearch.querySelector("[stock-baby]").innerHTML.trim(); 
        if(babyNumber){
            url.searchParams.set("stockBaby",babyNumber);
        }
        else{
            url.searchParams.delete("stockBaby");
        }

        //departureDay
        const departureDate = formSearch.departureDate.value;
        if(departureDate){
            url.searchParams.set("departureDate",departureDate);
        }else{
            url.searchParams.delete("departureDate");
        }

        //Redirect to the constructed URL
        window.location.href=url.href;

    })
}

//end form-search