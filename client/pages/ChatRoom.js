import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import { Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../public/assets/gwent_bg.png";

import CurrentUserText from "../components/CurrentUserText";
import OtherUserText from "../components/OtherUserText";
import ChatNotification from "../components/ChatNotification";

import chatsocket from "../src/socket";

let styles = {
  div: {
    display: "flex",
    justifyContent: "space-around",
    backgroundImage: `url(${background})`,
  },
  chatRoomContainer: {
    marginTop: 10,
  },
  header: {
    height: "7vh",
    backgroundColor: "rgba(0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "column",
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  youAppearAsText: {
    fontSize: 14,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    color: "white",
  },
  usernameText: {
    fontWeight: "bold",
    marginLeft: 3,
    marginRight: 3,
  },
  chatThread: {
    backgroundColor: "rgba(227, 227, 227, .3)",
    flex: 0,
    display: "flex",
    flexDirection: "column",
    height: "75vh",
    overflowY: "auto",
    width: "50vw",
    alignSelf: "center",
    padding: 20,
    paddingBottom: 40,
    border: "1px solid rgba(0, 0, 0)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 8,
  },
  messageInputSection: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "rgba(164,150,148)",
    marginBottom: 40,
  },
  messageTextField: {
    flex: 1,
  },
  messageSubmitButton: {
    flex: 0,
  },
  button: {
    backgroundColor: "red",
  },
};

const autoScrollOffset = 100; //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: "User1",
      currentUserId: 1,
      message: "",
      chatRoomData: [],
      initialLoad: true,
    };
    this.messagesEndRef = React.createRef();
  }
  componentDidMount() {
    let userIDVal = localStorage.getItem("userID");
    let usernameVal = localStorage.getItem("username");

    if (!userIDVal) {
      chatsocket.on("SetUserData", (userData) => {
        //When user creation on server is complete, retrieve and save data to local storage
        localStorage.setItem("userID", userData.userID);
        localStorage.setItem("username", userData.username);
        console.log(userData);

        this.setState({
          currentUsername: userData.username,
          currentUserID: userData.userID,
        });

        //Notify Socket server is not ready to chat
        chatsocket.emit("UserEnteredRoom", userData);
      });

      //Send Socket command to create user info for current user
      chatsocket.emit("CreateUserData");
    } else {
      //If user already has userid and username, notify server to allow them to join chat
      this.setState({ currentUsername: usernameVal, currentUserID: userIDVal });
      chatsocket.emit("UserEnteredRoom", {
        userID: userIDVal,
        username: usernameVal,
      });
    }
    chatsocket.on("RetrieveChatRoomData", (chatRoomData) => {
      this.setState({ chatRoomData: chatRoomData }, () =>
        this.shouldScrollToBottom()
      );
    });
  }

  componentWillUnmount() {
    chatsocket.off("RetrieveChatRoomData");
    chatsocket.off("SetUserData");
  }

  setMessage(message) {
    //Set Message being typed in input field
    this.setState({ message: message });
  }

  sendMessageData() {
    let { message, currentUsername, currentUserID } = this.state;

    if (message.length > 0) {
      //Send chat message to server...
      chatsocket.emit("SendMessage", {
        message: message,
        username: currentUsername,
        userID: currentUserID,
        timeStamp: null,
      });
      //Clear chat message textfield box
      this.setState({ message: "" });
    }
  }
  shouldScrollToBottom() {
    //If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
    if (
      this.messagesEndRef.current.scrollHeight -
        this.messagesEndRef.current.scrollTop <
      this.messagesEndRef.current.offsetHeight + autoScrollOffset
    ) {
      this.scrollToBottom();
    }

    //Navigate to end of chat when entering chat the first time
    if (this.state.initialLoad) {
      this.scrollToBottom();
      this.setState({ initialLoad: false });
    }
  }

  scrollToBottom() {
    //Scrolls user to end of chat message window
    this.messagesEndRef.current.scrollTop =
      this.messagesEndRef.current.scrollHeight;
  }

  render() {
    let { chatRoomData, currentUsername } = this.state;

    return (
      <div style={styles.div}>
        <Container style={styles.chatRoomContainer}>
          <Container style={styles.header}>
            <Row style={styles.headerText}>Chat Room</Row>
            <Row style={styles.youAppearAsText}>
              You appear as
              <div style={styles.usernameText}> {currentUsername}</div>
              in chat
            </Row>
          </Container>

          <Container style={styles.chatThread} ref={this.messagesEndRef}>
            {chatRoomData.map((messageData, index) => {
              if (messageData.username == currentUsername) {
                return (
                  <CurrentUserText
                    key={index}
                    username={messageData.username}
                    message={messageData.message}
                  />
                );
              } else if (messageData.username == "") {
                return (
                  <ChatNotification
                    key={index}
                    username={messageData.username}
                    message={messageData.message}
                  />
                );
              } else {
                return (
                  <OtherUserText
                    key={index}
                    username={messageData.username}
                    message={messageData.message}
                  />
                );
              }
            })}
          </Container>

          <Container style={styles.messageInputSection}>
            <TextField
              style={styles.messageTextField}
              id="input-with-icon-adornment"
              label="Enter Message"
              variant="outlined"
              value={this.state.message}
              onChange={(event) => this.setMessage(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  console.log("Enter key pressed");
                  this.sendMessageData();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => this.sendMessageData()}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </Container>
        <Link to="/lobby">
          <Button variant="primary" style={styles.button}>
            Play the Game!
          </Button>
        </Link>
      </div>
    );
  }
}

export default ChatRoom;
