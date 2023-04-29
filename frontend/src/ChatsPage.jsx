
import React, { useState } from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";
import SearchBot from './SearchBot';

const ChatsPage = (props) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

  const handleSearch = (query) => {
    const filtered = props.messages.filter((message) =>
      message.message.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  return (
    <div className="background">
      <SearchBot messages={props.messages} onSearch={handleSearch} />
      <PrettyChatWindow
        projectId='7d7e96e2-6a42-4e8f-a5e9-ecfeb6408d01'
        username={props.user.username}
        secret={props.user.secret}
        messages={filteredMessages.length > 0 ? filteredMessages : props.messages}
      />
    </div>
  );
};

export default ChatsPage;