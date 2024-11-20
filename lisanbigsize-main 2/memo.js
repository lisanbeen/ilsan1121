function analyzeEmotion(text) {
  const emotions = [
      { words: ["기뻐", "행복", "좋아", "사랑", "멋져", "최고"], emoji: "😊" },
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

  return "🤔"; // 기본 이모티콘
}

document.getElementById("add-memo-btn").addEventListener("click", () => {
  const memoContainer = document.getElementById("memo-container");
  const newMemoText = prompt("메모를 입력하세요:");

  if (!newMemoText || newMemoText.trim() === "") {
      alert("메모를 입력해주세요.");
      return;
  }

  const newMemo = document.createElement("div");
  newMemo.classList.add("memo");

  const content = document.createElement("span");
  content.classList.add("content");
  content.textContent = newMemoText;

  const emoji = document.createElement("span");
  emoji.classList.add("emoji");
  emoji.textContent = analyzeEmotion(newMemoText);

  newMemo.appendChild(content);
  newMemo.appendChild(emoji);
  memoContainer.appendChild(newMemo);
});
