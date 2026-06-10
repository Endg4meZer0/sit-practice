import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildingsGrid from './components/BuildingsGrid';

function List() {
  return (
    <div>
      <Navbar active="2" />
      <BuildingsGrid />
      <Footer />
    </div>
  );
}

export default List;
