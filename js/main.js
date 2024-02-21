//글자에 wave 애니메이션
document.addEventListener("DOMContentLoaded", function() {
  const waveText = document.querySelector(".header__motto--wave");
  const letters = waveText.querySelectorAll(".letter");

  // 각 글자마다 랜덤한 애니메이션 지연과 속도
  letters.forEach(function(letter) {
    letter.style.animationDelay = Math.random() * 0.5 + "s";
    letter.style.animationDuration = Math.random() * 1 + 1 + "s";
  });
});

// 메일 이미지 요소흔들기
const mailImg = document.querySelector('.header__mail--shake');

mailImg.addEventListener('click', function() {
  this.style.transform = 'rotate(-15deg)';
  setTimeout(() => {
    this.style.transform = 'rotate(0deg)'; 
  }, 500); 
});

//로고 따라 다니기
const headerLogo = document.querySelector('.header__logo');
const logoImage = headerLogo.querySelector('img');
const originalSrc = logoImage.src;
const newSrc = '../images/logo_on.png';

headerLogo.addEventListener('mouseenter', () => {
  logoImage.src = newSrc;
});

headerLogo.addEventListener('mouseleave', () => {
  logoImage.src = originalSrc;
});

headerLogo.addEventListener('mousemove', (event) => {
  updateImagePosition(event);
});

function updateImagePosition(event) {
  const boundingRect = headerLogo.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const offsetY = event.clientY - boundingRect.top;
  //범위 안에 있다면 움직이고 아니면 reset
  if (offsetX >= 0 && offsetX <= boundingRect.width && offsetY >= 0 && offsetY <= boundingRect.height) {
    imageX = offsetX;
    imageY = offsetY;
    moveImage();
  } else {
    resetImage();
  }
}

function moveImage() {
  logoImage.style.left = imageX + 'px';
  logoImage.style.top = imageY + -5 + 'px';
}

function resetImage() {
  logoImage.src = originalSrc;
  logoImage.style.transition = 'left 1s, top 1s'; // transition 추가
  logoImage.style.left = '50%';
  logoImage.style.top = '50%';
  // transition이 적용된 후에 transition 속성을 초기화하여 다음에 마우스가 다시 a 태그 영역 안에 들어왔을 때 다시 적용되지 않도록 합니다.
  setTimeout(() => {
    logoImage.style.transition = 'none';
  }, 1000); // transition 시간(1초)이 지난 후에 transition을 초기화합니다.
}

//curious 마우스 올렸을 때 효과
// 마우스를 올렸을 때 효과를 활성화하는 함수

let isEffectActive = false;
function activateEffect() {
  if(!isEffectActive){
    isEffectActive = true;
    const overlay = document.querySelector('.fullscreen--overlay');
    overlay.style.display = 'block';
    // 3초 후에 효과를 비활성화
    setTimeout(() => {
      overlay.style.display = 'none';
      isEffectActive = false;
    }, 2000); 
  }
}

document.querySelector('.header__motto--wave').addEventListener('mouseover', activateEffect);

//모달 나오는 함수 
document.querySelectorAll('.modal__wrap').forEach( wrap => {
  wrap.addEventListener('click', () => {
    const modalContent = wrap.querySelector('.modal');
    modalContent.style.display = 'block';
    setTimeout(() => {
      modalContent.style.display = 'none';
    }, 1000); 
  })
})


//grid li 에 hover 했을 때 
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

// 스크롤 할 때 요소 skew
let isScrolling = false;
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let selectedWorks = document.querySelector('article');
  let scrollPosition = window.scrollY;
  
  if (scrollPosition > lastScrollTop && !isScrolling) {
    // 스크롤이 아래로 내려갈 때
    selectedWorks.classList.add('scrolled');
    selectedWorks.classList.remove('scrolled-reverse');
    isScrolling = true;
    setTimeout(function() {
      isScrolling = false;
      selectedWorks.classList.remove('scrolled');
    }, 200);
  } else if (scrollPosition < lastScrollTop && !isScrolling) {
    // 스크롤이 위로 올라갈 때
    selectedWorks.classList.add('scrolled-reverse');
    selectedWorks.classList.remove('scrolled');
    isScrolling = true;
    setTimeout(function() {
      isScrolling = false;
      selectedWorks.classList.remove('scrolled-reverse');
    }, 200);
  }
  
  lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // 스크롤 위치 업데이트
});