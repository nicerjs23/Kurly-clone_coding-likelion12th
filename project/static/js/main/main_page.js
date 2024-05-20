
/* main page - JS */

// 클릭된 항목 스타일 변경하는 코드 
document.addEventListener('DOMContentLoaded', () => {
    let previouslyClickedLink = null;

    // 모든 a 태그를 가져옵니다.
    const tagLinks = document.querySelectorAll('.tagFrame .tag a');

    tagLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // 기본 클릭 동작을 막습니다.
            event.preventDefault();

            // 이전에 클릭된 링크의 스타일을 원래대로 돌립니다.
            if (previouslyClickedLink) {
                previouslyClickedLink.style.color = 'var(--font-font-1, #333)';
                previouslyClickedLink.style.fontWeight = 'normal';
            }

            // 현재 클릭된 링크의 스타일을 변경합니다.
            link.style.color = 'var(--point-main, #5E0080)';
            link.style.fontWeight = 'bold';

            // 현재 클릭된 링크를 previouslyClickedLink로 설정합니다.
            previouslyClickedLink = link;
        });
    });
});

// 체크박스 디자인 변경 + 초기화 기능 
document.addEventListener('DOMContentLoaded', () => {
    // 모든 체크박스를 가져옵니다.
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const refreshButton = document.querySelector('.refreshIcon');
    const refreshText = refreshButton.querySelector('.refreshText');
    const refreshIconPath = refreshButton.querySelector('svg path');

    // 체크박스 상태에 따라 초기화 버튼 색상을 업데이트하는 함수
    const updateRefreshButtonColor = () => {
        let anyChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                anyChecked = true;
            }
        });
        if (anyChecked) {
            refreshText.style.color = 'var(--font-font2, #999)';
            refreshIconPath.style.fill = 'var(--font-font2, #999)';
        } else {
            refreshText.style.color = ''; // 기본 색상으로 초기화
            refreshIconPath.style.fill = ''; // 기본 색상으로 초기화
        }
    };

    // 체크박스 클릭 이벤트 핸들러
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateRefreshButtonColor();
        });
    });

    // 초기화 버튼 클릭 이벤트 핸들러
    refreshButton.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateRefreshButtonColor();
        // 추가된 부분: 카테고리 선택 상자를 숨깁니다.
        const categoryChoiceBox = document.querySelector('.categoryChoiceBox');
        categoryChoiceBox.style.display = 'none';
    });

    // 초기화 시 초기화 버튼의 색상을 기본 상태로 되돌립니다.
    updateRefreshButtonColor();
});

// 체크박스 클릭 이벤트 핸들러
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalNumElement = document.querySelector('.totalNum');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let totalChecked = 0;
        let anyChecked = false; // 새로운 변수 추가

        checkboxes.forEach(cb => {
            if (cb.checked) {
                anyChecked = true; // 체크된 체크박스가 있는지 확인
                const categoryNumElement = cb.closest('.sidebarNav').querySelector('.categoryNavNum');
                const categoryNum = parseInt(categoryNumElement.textContent);
                totalChecked += categoryNum;
            }
        });

        // 모든 체크박스가 해제되었을 때 기본값으로 설정
        if (!anyChecked) {
            totalChecked = 120;
        }

        totalNumElement.textContent = `총 ${totalChecked}건`;
    });
});

// 체크박스 초기화 버튼 기능
const refreshButton = document.querySelector('.refreshIcon');
const refreshText = refreshButton.querySelector('.refreshText');
const refreshIconPath = refreshButton.querySelector('svg path');

const updateRefreshButtonColor = () => {
    let anyChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            anyChecked = true;
        }
    });
    if (anyChecked) {
        refreshText.style.color = 'var(--font-font2, #999)';
        refreshIconPath.style.fill = 'var(--font-font2, #999)';
    } else {
        refreshText.style.color = ''; // 기본 색상으로 초기화
        refreshIconPath.style.fill = ''; // 기본 색상으로 초기화
    }
};

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateRefreshButtonColor();
    });
});

refreshButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    totalNumElement.textContent = `총 120건`; // 초기화 시 총 건수도 초기화
    updateRefreshButtonColor();
});

// 아래에 추가된 부분입니다.
/**/ 
// 체크박스 클릭 이벤트 핸들러
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateCategoryChoiceBox();
        updateTotalNum();
    });
});

// 카테고리 선택 상자 업데이트 함수
const updateCategoryChoiceBox = () => {
    const categoryChoiceBox = document.querySelector('.categoryChoiceBox');
    categoryChoiceBox.innerHTML = ''; // 기존의 내용을 모두 비웁니다.

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const labelText = checkbox.closest('.sidebarNav').querySelector('.categoryNavText').textContent;

            const closeButton = document.createElement('button');
            closeButton.classList.add('xButton');
            closeButton.innerHTML = `
          <span class="xButtonText">${labelText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99967 11.1668L5.91634 15.2502C5.76356 15.4029 5.56912 15.4793 5.33301 15.4793C5.0969 15.4793 4.90245 15.4029 4.74967 15.2502C4.5969 15.0974 4.52051 14.9029 4.52051 14.6668C4.52051 14.4307 4.5969 14.2363 4.74967 14.0835L8.83301 10.0002L4.74967 5.91683C4.5969 5.76405 4.52051 5.56961 4.52051 5.3335C4.52051 5.09738 4.5969 4.90294 4.74967 4.75016C4.90245 4.59738 5.0969 4.521 5.33301 4.521C5.56912 4.521 5.76356 4.59738 5.91634 4.75016L9.99967 8.8335L14.083 4.75016C14.2358 4.59738 14.4302 4.521 14.6663 4.521C14.9025 4.521 15.0969 4.59738 15.2497 4.75016C15.4025 4.90294 15.4788 5.09738 15.4788 5.3335C15.4788 5.56961 15.4025 5.76405 15.2497 5.91683L11.1663 10.0002L15.2497 14.0835C15.4025 14.2363 15.4788 14.4307 15.4788 14.6668C15.4788 14.9029 15.4025 15.0974 15.2497 15.2502C15.0969 15.4029 14.9025 15.4793 14.6663 15.4793C14.4302 15.4793 14.2358 15.4029 14.083 15.2502L9.99967 11.1668Z" fill="#DDDDDD"/>
            </svg>
          `;
              closeButton.addEventListener('click', () => {
                  checkbox.checked = false; // 체크박스 해제
                  checkbox.dispatchEvent(new Event('change')); // change 이벤트 발생시켜 갱신
              });
  
              categoryChoiceBox.appendChild(closeButton);
  
              // 닫기 버튼에 클릭 이벤트 추가
              closeButton.addEventListener('click', () => {
                  checkbox.checked = false; // 체크박스 해제
                  closeButton.remove(); // 버튼 삭제
                  updateTotalNum(); // 총 건수 업데이트
                  if (!isAnyCheckboxChecked()) {
                      categoryChoiceBox.style.display = 'none'; // 카테고리 선택 상자 숨기기
                  }
              });
          }
      });
  
      // 하나 이상의 체크박스가 선택되어 있으면 카테고리 선택 상자 보이기
      if (isAnyCheckboxChecked()) {
          categoryChoiceBox.style.display = 'flex';
      } else {
          categoryChoiceBox.style.display = 'none';
      }
  };
  // 하나 이상의 체크박스가 선택되어 있는지 확인하는 함수
  const isAnyCheckboxChecked = () => {
      return Array.from(checkboxes).some(checkbox => checkbox.checked);
  };
  
  // 총 건수 업데이트 함수
  const updateTotalNum = () => {
      let totalChecked = 0;
      checkboxes.forEach(cb => {
          if (cb.checked) {
              const categoryNumElement = cb.closest('.sidebarNav').querySelector('.categoryNavNum');
              const categoryNum = parseInt(categoryNumElement.textContent);
              totalChecked += categoryNum;
          }
      });
      // 모든 체크박스가 해제되었을 때 기본값으로 설정
      if (!isAnyCheckboxChecked()) {
          totalChecked = 120;
      }
      totalNumElement.textContent = `총 ${totalChecked}건`;
  };
  
  updateCategoryChoiceBox(); // 페이지가 로드될 때 카테고리 선택 상자 업데이트
  updateTotalNum(); // 페이지가 로드될 때 총 건수 업데이트