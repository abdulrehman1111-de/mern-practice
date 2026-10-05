import Post from "./components/Post"
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <section className="main-section">
        <Post />
        <ToastContainer />
      </section>
    </>
  )
}

export default App
