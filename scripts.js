// 定義 createChangeButton() 函數
function createChangeButton() {
    const changeButton = document.createElement('button');
    changeButton.textContent = '更改影片';
    changeButton.classList.add('change-button');
    return changeButton;
}

const select = document.getElementById('select');
const container = document.getElementById('gridContainer');

// 載入時觸發 change 事件
window.addEventListener('load', function() {
    select.dispatchEvent(new Event('change'));
});

select.addEventListener('change', function() {
    const value = parseInt(select.value);
    container.innerHTML = ''; // Clear previous boxes
    container.style.gridTemplateColumns = `repeat(${value > 2 ? 2 : value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${Math.ceil(value / 2)}, auto)`;

    for (let i = 0; i < value; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.setAttribute('id', 'box' + i); // 添加 ID

        // 創建更改影片按鈕，使用 createChangeButton() 函數
        const changeButton = createChangeButton();

        changeButton.onclick = function(event) {
            event.stopPropagation(); 
            const boxNumber = this.parentNode.id.replace('box', '');
            changeVideo(boxNumber);
        };

        box.appendChild(changeButton); 

        container.appendChild(box); 

        box.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const boxNumber = this.id.replace('box', '');
            changeVideo(boxNumber);
        });
    }
});


function changeVideo(boxNumber) {
    const videoID = prompt('请输入 YouTube 影片 ID：');

    if (videoID != null && videoID.trim() !== '') {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');

        const box = document.getElementById('box' + boxNumber);
        box.innerHTML = '';
        box.appendChild(iframe);

        if (!box.querySelector('.change-button')) {
            const changeButton = createChangeButton();
            changeButton.onclick = function(event) {
                event.stopPropagation(); 
                changeVideo(boxNumber);
            };
            box.appendChild(changeButton);
        }
    }
}
