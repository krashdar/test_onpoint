function startAnimation2(){
    let sperms = slide2.querySelectorAll(".sperm");
    for (let i=0; i<sperms.length; i++){
        sperms[i].classList.add(`sperm${i+1}`);
    }
}

function changeSlide(i){
    nowSlide = SlidesEnum[i];
    nextSlide = SlidesEnum[i+1];
    prevSlide = SlidesEnum[i-1];
    nowSlide.scrollIntoView({inline:"start", behavior:"smooth"});
}
const Slider = document.querySelector(".slider");
const BtnHome = document.querySelector(".main_head");
const BtnNext = document.querySelector(".btn");
const slide1 = document.querySelector("#slide1");
const slide2 = document.querySelector("#slide2");
const slide3 = document.querySelector("#slide3");
const BtnInfo = slide3.querySelector(".btn");
const SlidesEnum = [
    slide1,
    slide2,
    slide3
]
let nowSlide = SlidesEnum[0];
let nextSlide = SlidesEnum[1];
let prevSlide;
var positionStart;
var positionEnd;
let i=0;
var handleStart = function (e) {
    positionStart = e.touches[0].clientX;
}
var handleEnd = function (e) {
    positionEnd = e.changedTouches[0].clientX;
    if (positionStart - positionEnd > 0){
        console.log('перелистываем вправо');
        i++;
        if (i>SlidesEnum.length-1){
            i--;
        } else {
            if (i===1){startAnimation2();}
            changeSlide(i);
        }
    } else if (positionStart - positionEnd < 0){
        console.log('перелистываем влево');
        i--;
        if (i<0){
            i++;
        } else changeSlide(i);
    } else console.log('никуда не прелистываем');
}
Slider.addEventListener('touchstart', handleStart);
Slider.addEventListener('touchend',handleEnd);
BtnNext.addEventListener("click", () => {
    console.log("перелистываем на второй слайд")
    i=1;
    changeSlide(i);
});
BtnHome.addEventListener("click", () => {
    console.log("перелистываем домой")
    i=0;
    changeSlide(i);
});


(function() {
    class ScrollBox {
        static #SCROLLER_HEIGHT_MIN = 20;

        constructor(container) {
            // область просмотра, в которой находится контент и скроллбар
            this.viewport = container.querySelector('.viewport');
            // контейнер, в котором будет прокручиваться информация
            this.contentBox = container.querySelector('.customTextBox');
            this.pressed = false;
            this.init();
        }
        init(){
            // высоты полученных элементов
            this.viewportHeight = this.contentBox.offsetHeight;
            this.contentHeight = this.contentBox.scrollHeight;
            // если высота контента меньше или равна высоте вьюпорта,
            // выходим из функции
            if (this.viewportHeight >= this.contentHeight) return;

            // возможная максимальная прокрутка контента
            this.max = this.viewport.clientHeight - this.contentHeight;
            // соотношение между высотами вьюпорта и контента
            this.ratio = this.viewportHeight / this.contentHeight;

            this.createScrollbar();
            this.registerEventsHandler();
        }
        // формируем полосу прокрутки и полунок
        createScrollbar() {
            const scrollbar = document.createElement('div'),
                scroller = document.createElement('div');

            scrollbar.className = 'scrollbar';
            scroller.className = 'scroller';

            scrollbar.appendChild(scroller);
            this.viewport.insertBefore(scrollbar,this.contentBox);

            // получаем DOM-объект ползунка полосы прокрутки, вычисляем и
            // устанавливаем его высоту
            this.scroller = this.viewport.querySelector('.scroller');
            this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
            this.scrollerHeight = (this.scrollerHeight <= ScrollBox.#SCROLLER_HEIGHT_MIN) ? ScrollBox.#SCROLLER_HEIGHT_MIN : this.scrollerHeight;
            this.scroller.style.height = this.scrollerHeight + 'px';
        }
        // устанавливаем обработчики событий
        registerEventsHandler(e) {
            this.scroller.addEventListener('touchstart', e => {
                this.start = e.touches[0].clientY;
                this.pressed = true;
                e.preventDefault();
            });

            this.viewport.addEventListener('touchmove', this.drop.bind(this));

            this.viewport.addEventListener('touchend', (ev) => {this.pressed = false;
            positionStart=ev.changedTouches[0].clientX;
            });
        }
        drop(e) {
            e.preventDefault();
            // если тач не нажат, прекращаем работу функции
            if (this.pressed === false) return;

            // величина перемещения мыши
            let shiftScroller = this.start - e.touches[0].clientY;
            // изменяем положение бегунка на величину перемещения мыши
            this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';

            // величина, на которую должен переместиться контент
            let shiftContent = this.scroller.offsetTop / this.ratio;
            // сумма высоты ползунка и его отступа от верхней границы вьюпорта
            const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
            // максимальный отступ, который может быть у ползунка в зависимости от его
            // высоты и высоты вьюпорта
            const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;

            // ограничиваем перемещение ползунка
            // по верхней границе вьюпорта
            if (this.scroller.offsetTop < 0) this.scroller.style.top = '0px';
            // по нижней границе вьюпорта
            if (totalheightScroller >= this.viewportHeight) this.scroller.style.top = maxOffsetScroller + 'px';

            // прокручиваем контент на величину пропорциональную перемещению ползунка
            this.contentBox.scrollTo(0, shiftContent);
            // устанавливаем координату Y начала движения мыши равной текущей координате Y
            this.start = e.touches[0].clientY;
        }
    }

    const container = slide2.querySelector('.container');
    const scrollbox = new ScrollBox(container);
})();

const SliderContentNode = slide3.querySelector(".slider_content");
const ArrowPrev = slide3.querySelector(".slider_navigation_arrow__left");
const ArrowNext = slide3.querySelector(".slider_navigation_arrow__right");
const SliderItems = [
    {
        itemTitle: "01",
        itemText: "Самое важное и ключевое преимуществоа нашего препарата"
    },
    {
        itemTitle: "02",
        itemText: "Второе по важности преимущество"
    },
    {
        itemTitle: "03",
        itemText: "Еще одно важное преимущество препарата"
    },
    {
        itemTitle: "04",
        itemText: "Еще одно не менее важное преимущество препарата"
    },
    {
        itemTitle: "05",
        itemText: "Еще одно важное преимущество препарата"
    },
    {
        itemTitle: "06",
        itemText: "Еще одно важное преимущество препарата"
    }
];
function createcontent(){
    let content = [];
    for (let i=0; i<2; i++){
        let tempcontent = [];
        for (let j=0; j<3; j++){
            let item = document.createElement("div");
            item.classList.add("slider_content_item");

            let title = document.createElement("span");
            title.classList.add("slider_content_item_title");
            title.innerHTML = SliderItems[i*3 + j].itemTitle;
            item.appendChild(title);

            let text = document.createElement("p");
            text.classList.add("slider_content_item_text");
            text.innerHTML = SliderItems[i*3 + j].itemText;
            item.appendChild(text);

            tempcontent.push(item);
        }
        content.push(tempcontent);
    }
    return content;
}
let slidercontent = createcontent();
function showcontent(listnum){
    SliderContentNode.innerHTML = "";
    for (let item of slidercontent[listnum]){
        SliderContentNode.appendChild(item);
    }
}
showcontent(0);
let BtnClose = document.createElement("div");
BtnClose.classList.add("btn_close");
slide3.querySelector(".container2_slider").appendChild(BtnClose);

BtnInfo.addEventListener("click", () => {
    slide3.querySelector(".container1").classList.add("hide");
    slide3.querySelector(".container2").classList.remove("hide");
    slide3.classList.add("blur");
    slide3.querySelector("#Title1").classList.add("hide");
    slide3.querySelector("#Title2").classList.remove("hide");
});
BtnClose.addEventListener("click", () => {
    slide3.querySelector(".container1").classList.remove("hide");
    slide3.querySelector(".container2").classList.add("hide");
    slide3.classList.remove("blur");
    slide3.querySelector("#Title1").classList.remove("hide");
    slide3.querySelector("#Title2").classList.add("hide");
});
let circles = slide3.querySelectorAll(".slider_navigation_pointer");
let currentIndex =0;
ArrowPrev.addEventListener("click", () => {
    if (currentIndex-1 < 0) {
        currentIndex = slidercontent.length - 1;
        showcontent(currentIndex);
        circles.forEach(item => item.classList.remove("active"));
        circles[currentIndex].classList.add("active");
    }else {
        currentIndex -= 1;
        showcontent(currentIndex);
        circles.forEach(item => item.classList.remove("active"));
        circles[currentIndex].classList.add("active");
    }
});
ArrowNext.addEventListener("click", () => {
    if (currentIndex+1 > slidercontent.length - 1) {
        currentIndex = 0;
        showcontent(currentIndex);
        circles.forEach(item => item.classList.remove("active"));
        circles[currentIndex].classList.add("active");
    }else {
        currentIndex += 1;
        showcontent(currentIndex);
        circles.forEach(item => item.classList.remove("active"));
        circles[currentIndex].classList.add("active");
    }
});