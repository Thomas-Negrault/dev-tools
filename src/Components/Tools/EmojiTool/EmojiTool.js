import React, { useCallback, useEffect, useState } from "react";
import { Metas } from "../../Layout/Metas";
import emojisList from "./emojis";
import EmojiDetailsModal from "./EmojiDetaislModal";

const TITLE = "Emoji Picker Tool";
const DESCRIPTION = "Find the perfect Emoji to express your feelings";

function EmojiTool() {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState(Object.keys(emojisList));
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSearchChange = useCallback(event => {
    setSearch(event.target.value);
  }, []);

  const onEmojiSelected = useCallback(event => {
    setSelectedEmoji(event.target.id);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (search === "") {
      setEmojis(Object.keys(emojisList));
      return;
    }
    const allowedEmojiNames = Object.keys(emojisList).filter(key => {
      if (
        key.includes(search.toLowerCase()) ||
        key.replace(/_/g, " ").includes(search.toLowerCase())
      ) {
        return true;
      }

      return search
        .toLowerCase()
        .split(" ")
        .every(searchKeyword =>
          emojisList[key].keywords.some(keyword =>
            keyword.includes(searchKeyword)
          )
        );
    });

    setEmojis(allowedEmojiNames);
  }, [search]);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <EmojiDetailsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedEmoji={selectedEmoji}
      />
      <div className="py-4 text-center">
        <input
          type="text"
          placeholder={"Type something to filter the list"}
          value={search}
          className="col-4 dark"
          onChange={onSearchChange}
        />
      </div>
      <div id="emojis" className="text-lg-center display-3">
        {emojis.map(emojiName => (
          <span
            key={emojiName}
            title={emojiName.replace(/_/g, " ")}
            id={emojiName}
            className="col-lg-1 col-md-2 col-sm-4 emoji"
            onClick={onEmojiSelected}
          >
            {emojisList[emojiName].char}
          </span>
        ))}
      </div>
    </>
  );
}

export default EmojiTool;
