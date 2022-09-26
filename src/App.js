import React, { useEffect, useRef, useState } from "react"
import "./App.css"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { handleTorch } from "./eyeletapi"

firebase.initializeApp({
  apiKey: "AIzaSyDj4BpuPMUeCiGQNllLqSLgza7W_KfA2V8",
  authDomain: "reactfirebasechat-12470.firebaseapp.com",
  projectId: "reactfirebasechat-12470",
  storageBucket: "reactfirebasechat-12470.appspot.com",
  messagingSenderId: "392492279219",
  appId: "1:392492279219:web:33a39ce3baf87a379b57c6",
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)
  useEffect(() => {
    handleTorch().then(response => {
      console.log({ response })
    }).catch(err => {
      console.log({ err })
    })
  }, [])

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return <button onClick={signInWithGoogle}>Sign in with Google 🔗</button>
}
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}
function ChatRoom() {
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt").limitToLast(25)

  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState("")
  const dummy = useRef()

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValue("")
  }

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="avatar" />
        <p>{text}</p>
      </div>
    </>
  )
}
export default App
