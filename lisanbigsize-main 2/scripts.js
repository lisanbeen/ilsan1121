// 드롭다운 메뉴 토글
document.getElementById("dropdown-btn").addEventListener("click", () => {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// 드롭다운에서 섹션 이동
document.querySelectorAll(".dropdown-item").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// 추가 섹션 이동
document.getElementById("add-btn").addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("add-section").style.display = "block";
});

// 릴스 섹션 이동
document.getElementById("reels-btn").addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("reels-section").style.display = "block";
});

// 마이 섹션 이동
document.getElementById("my-btn").addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("my-section").style.display = "block";
});

// 홈 버튼
document.getElementById("home-btn").addEventListener("click", () => {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("home").style.display = "block";
});

// 게시물 추가
document.getElementById("add-post-btn").addEventListener("click", () => {
    const container = document.getElementById("post-container");
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
        <img src="https://via.placeholder.com/400" alt="게시물">
        <p>새로운 게시물이 추가되었습니다!</p>
    `;
    container.prepend(newPost); // 상단에 추가
});

// 메모 추가
document.getElementById("add-memo-btn").addEventListener("click", () => {
    const container = document.getElementById("memo-container");
    const newMemo = document.createElement("div");
    newMemo.classList.add("memo");
    newMemo.innerHTML = `
        <span class="content">새로운 메모입니다.</span>
        <span class="emoji">🤔</span>
    `;
    container.appendChild(newMemo);
});
