//로고 따라 다니기
const headerLogo = document.querySelector('.header__logo');
const logoImage = headerLogo.querySelector('img');
const originalSrc = logoImage.src;
const currentURL = window.location.href;
let newSrc = '';
if(currentURL === 'http://127.0.0.1:5500/pages/index.html'){
  newSrc = '../images/logo_on.png'
}else if(currentURL === 'http://127.0.0.1:5500/pages/about.html'){
  newSrc = '../images/logo-white_on.png'
}

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
  logoImage.style.transition = 'left 1s, top 1s'; 
  logoImage.style.left = '50%';
  logoImage.style.top = '50%';
  
  setTimeout(() => {
    logoImage.style.transition = 'none';
  }, 1000); 
}


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


//마우스 스크롤 gsap
let cursor = document.querySelector('.cursor');
let cursorScale = document.querySelectorAll('.cursor-scale'); 
let mouseX = 0;
let mouseY = 0;

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function(){
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      }
    })
  }
});

window.addEventListener('mousemove', (e)=> {
  mouseX = e.clientX;
  mouseY = e.clientY;
})

cursorScale.forEach(link => {
  link.addEventListener('mousemove', ()=> {
    cursor.classList.add('grow'); 
    if (link.classList.contains('small')){
      cursor.classList.remove('grow');
      cursor.classList.add('grow-small');
    }
  });
  
  link.addEventListener('mouseleave', ()=> {
    cursor.classList.remove('grow');
    cursor.classList.remove('grow-small');
  });
})
