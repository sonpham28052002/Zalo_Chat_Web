import React from "react";

export default function TotalReact({ isOpenEmotion, messageSelect }) {
  function getReactUnipue(listEmotion) {
    let mapEmotion = new Map([
      ["LIKE", "👍"],
      ["HAPPY", "😄"],
      ["HEART", "❤️"],
      ["SAD", "😥"],
      ["ANGRY", "😡"],
    ]);

    let uniqueElements = listEmotion.filter(
      (element, index, self) =>
        index === self.findIndex((t) => t.react === element.react)
    );

    let emojiArray = uniqueElements.map((element) => ({
      userId: element.user.id,
      emoji: mapEmotion.get(element.react),
    }));
    return emojiArray.slice(-3);
  }
  return (
    <div
      className={`h-[25px] text-xs w-fit rounded-full bg-white select-none shadow-3xl -mt-5 mr-1 flex flex-row justify-center items-center px-1`}
      onClick={() => {
        isOpenEmotion(true, messageSelect);
      }}
    >
      {getReactUnipue(messageSelect.react)
        .slice()
        .map((item) => (
          <p
            className="w-4 text-center  border-white border-r"
            key={item.emoji}
          >
            {item.emoji}
          </p>
        ))}
      <p
        className="w-4 text-center mx-[2px] border-white border-r"
        key={messageSelect.react.length}
      >
        {messageSelect.react.length >= 100 ? "99+" : messageSelect.react.length}
      </p>
    </div>
  );
}
