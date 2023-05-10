import { useState, useEffect } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import SearchBot from './SearchBot';

const ChatsPage = (props) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

  const handleSearch = (query) => {
    const filtered = props.messages.filter((message) =>
      message.message.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  useEffect(() => {
    setFilteredMessages(props.messages);
  }, [props.messages]);

  return (
    <div className="background">
      <SearchBot messages={props.messages} filteredMessages={filteredMessages} onSearch={handleSearch} />
      <PrettyChatWindow
        projectId='27f9bfe4-b8cf-45e1-90ed-24586ccfba1b'
        username={props.user.username}
        secret={props.user.secret}
        messages={filteredMessages}
      />
    </div>
  );
};

export default ChatsPage;