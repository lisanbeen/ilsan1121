document.addEventListener("DOMContentLoaded", () => {
    // 드롭다운 메뉴 토글
    document.getElementById("dropdown-btn").addEventListener("click", () => {
        const dropdown = document.getElementById("dropdown-menu");
        const dropdownBtn = document.getElementById("dropdown-btn");
        dropdown.classList.toggle("hidden");
        dropdown.style.bottom = (dropdownBtn.offsetHeight + 10) + "px";
    });

    document.addEventListener("click", (event) => {
        const dropdown = document.getElementById("dropdown-menu");
        const dropdownBtn = document.getElementById("dropdown-btn");
        if (!dropdown.contains(event.target) && event.target !== dropdownBtn) {
            dropdown.classList.add("hidden");
        }
    });

    //로컬스토리지 로그인 정보
    document.addEventListener("DOMContentLoaded", function() {
        const currentUserId = localStorage.getItem("currentUserId"); 
        const allUsers = JSON.parse(localStorage.getItem("users")) || []; 
        
        const loggedInUser = allUsers.find(user => user.id === currentUserId);
      
        if (loggedInUser) {
            document.getElementById("user-info").innerHTML = `
                <li>학번: ${loggedInUser.id}</li>
                <li>이름: ${loggedInUser.name}</li>
            `;
        } else {
            document.getElementById("user-info").innerHTML = "<li>로그인된 사용자가 없습니다.</li>";
        }
    });

    // 섹션 변경
    const sections = {
        "home-btn": "home",
        "add-btn": "add-section",
        "reels-btn": "reels-section",
        "my-btn": "my-section"
    };

    Object.keys(sections).forEach(id => {
        document.getElementById(id).addEventListener("click", () => {
            displaySection(sections[id]);
        });
    });

    function displaySection(sectionId) {
        document.querySelectorAll("main").forEach(main => (main.style.display = "none"));
        document.getElementById(sectionId).style.display = "block";
        document.getElementById("dropdown-menu").classList.add("hidden");
    }

    // 추가 섹션 내 버튼 이벤트
    document.getElementById("add-story-btn").addEventListener("click", () => {
        displaySection("story-add-section");
    });

    document.getElementById("add-post-btn").addEventListener("click", () => {
        displaySection("post-add-section");
    });

    document.getElementById("add-memo-btn").addEventListener("click", () => {
        displaySection("memo-add-section");
    });

    // 스토리 추가 기능
    const storyCanvas = document.getElementById("story-canvas");
    const storyCtx = storyCanvas.getContext("2d");
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    document.getElementById("story-image").addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                storyCtx.clearRect(0, 0, storyCanvas.width, storyCanvas.height);
                storyCtx.drawImage(img, 0, 0, storyCanvas.width, storyCanvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    storyCanvas.addEventListener("mousedown", (e) => {
        drawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    storyCanvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        const currentX = e.offsetX;
        const currentY = e.offsetY;
        storyCtx.beginPath();
        storyCtx.moveTo(lastX, lastY);
        storyCtx.lineTo(currentX, currentY);
        storyCtx.stroke();
        lastX = currentX;
        lastY = currentY;
    });

    storyCanvas.addEventListener("mouseup", () => {
        drawing = false;
    });

    document.getElementById("upload-story").addEventListener("click", () => {
        const storyContainer = document.getElementById("story-container");
        const storyWrapper = document.createElement("div");
        storyWrapper.classList.add("story-item");

        const img = document.createElement("img");
        img.src = storyCanvas.toDataURL();
        img.classList.add("story-image");

        img.addEventListener('click', () => {
            const fullscreenOverlay = document.createElement('div');
            fullscreenOverlay.classList.add('fullscreen-overlay');
            
            const fullscreenImg = document.createElement('img');
            fullscreenImg.src = img.src;
            fullscreenImg.classList.add('fullscreen-image');
            
            fullscreenOverlay.appendChild(fullscreenImg);
            document.body.appendChild(fullscreenOverlay);
            
            fullscreenOverlay.addEventListener('click', () => {
                document.body.removeChild(fullscreenOverlay);
            });
        });

        storyWrapper.appendChild(img);
        storyContainer.insertBefore(storyWrapper, storyContainer.firstChild);
        displaySection("home");
    });

    document.getElementById("upload-post").addEventListener("click", () => {
        const postContainer = document.getElementById("post-container");
        const postDescription = document.getElementById("post-description").value;
        const postImage = document.getElementById("post-image").files[0];

        if (!postImage || !postDescription.trim()) {
            alert("게시물 이미지를 선택하고 설명을 작성해주세요.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const postWrapper = document.createElement("div");
            postWrapper.classList.add("memo");

            const content = document.createElement("span");
            content.classList.add("content");
            content.textContent = postDescription;

            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("story-image");

            postWrapper.appendChild(img);
            postWrapper.appendChild(content);
            postContainer.appendChild(postWrapper);
            displaySection("home");
        };
        reader.readAsDataURL(postImage);
    });

    // 메모 추가
    document.getElementById("save-memo").addEventListener("click", () => {
        const memoContainer = document.getElementById("memo-container");
        const memoText = document.getElementById("memo-input").value;

        if (!memoText.trim()) {
            alert("메모를 입력해주세요.");
            return;
        }

        const newMemo = document.createElement("div");
        newMemo.classList.add("memo");

        const content = document.createElement("span");
        content.classList.add("content");
        content.textContent = memoText;

        const emoji = document.createElement("span");
        emoji.classList.add("emoji");
        emoji.textContent = analyzeEmotion(memoText);

        newMemo.appendChild(content);
        newMemo.appendChild(emoji);
        memoContainer.appendChild(newMemo);
        displaySection("home");
    });


    function analyzeEmotion(text) {
        const emotions = [
            { words: ["기뻐", "행복", "좋아", "사랑", "멋져", "최고","ㅋㅋㅋㅋ"], emoji: "😊" },
            { words: ["화나", "짜증", "힘들어", "싫어", "우울", "불편"], emoji: "😡" },
            { words: ["슬퍼", "눈물", "아파", "지쳤어", "외로워"], emoji: "😢" },
            { words: ["놀라워", "깜짝", "대박", "헉", "충격"], emoji: "😲" },
            { words: ["졸려", "지루해", "심심해"], emoji: "😴" },
            { words: ["감사", "고마워", "정말 좋아"], emoji: "😍" },
        ];

        for (const emotion of emotions) {
            for (const word of emotion.words) {
                if (text.includes(word)) {
                    return emotion.emoji;
                }
            }
        }

        return "🤔";
    }

    // 드롭다운 메뉴 항목 클릭
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetSectionId = item.getAttribute('data-target');
            displaySection('home');
            const targetSection = document.getElementById(targetSectionId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            document.getElementById("dropdown-menu").classList.add("hidden");
        });
    });
});