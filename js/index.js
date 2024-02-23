//grid hover 했을 때 정보 보여주기
document.querySelectorAll('.article__contents--grid > li').forEach( li => {
  li.addEventListener('mouseenter', function() {
    this.querySelector('.contents__cover').style.opacity = 1;
  })
  li.addEventListener('mouseleave', function() {
    this.querySelector('.contents__cover').style.opacity = 0;
  })
})


//display grid, flex 교체
const flexEl = document.querySelector('.article__contents--flex');
const gridEl = document.querySelector('.article__contents--grid');
const viewIcon = document.querySelector('.article--view');
let isGrid = false;

document.querySelector('.article--view').addEventListener('click',()=>{
  if(!isGrid){
    gridEl.style.display = 'grid';
    flexEl.style.display = 'none';
    viewIcon.innerHTML = 'view_list';
    isGrid =! isGrid
  }else if(isGrid){
    gridEl.style.display = 'none';
    flexEl.style.display = 'block';
    viewIcon.innerHTML = 'grid_view';
    isGrid =! isGrid
  }
})

//flex모드에서 hover 이미지 그 자리에 등장
//getBoundingClientRect 정확하게 모르겠음
let imgHoverTimer; 

const liElements = document.querySelectorAll('.article__contents--flex > li');

liElements.forEach(li => {
  const imgHover = li.querySelector('.img--hover'); 

  if (imgHover) {
    li.addEventListener('mouseenter', function(event) {
      imgHover.style.display = 'block';
      imgHover.style.left = event.clientX - this.getBoundingClientRect().left + 'px';
      imgHover.style.top = event.clientY - this.getBoundingClientRect().top + -100 + 'px';

      // console.log(`event.clientX:${event.clientX}`);
      // console.log(`event.clientY:${event.clientY}`);
      // console.log(`imgHove left:${imgHover.style.left}`);
      // console.log(`imgHove top:${imgHover.style.top}`);
      // console.log(`event.getleft:${this.getBoundingClientRect().left}`);
      // console.log(`event.gettop:${this.getBoundingClientRect().top}`);
      // console.log('---------------------')
      clearTimeout(imgHoverTimer);

      //이미지 숨기기
      imgHoverTimer = setTimeout(() => {
        imgHover.style.display = 'none';
      }, 1000);
    });

    li.addEventListener('mouseleave', function(event) {
      imgHover.style.display = 'none';

      clearTimeout(imgHoverTimer);
    });
  }
});