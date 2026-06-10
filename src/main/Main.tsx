import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from './components/Gallery';
import Content from './components/Content';

function Main() {
  return (
    <div className="App" id="top">
      <Navbar active="1" />
      <main>
        <Gallery />
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
