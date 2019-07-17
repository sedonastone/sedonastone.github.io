import React from 'react';
import logo from './logo.png';
import './App.css';
import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipeGallery } from 'react-photoswipe';
import photoData from './photoData.json';

const styles = {
  sl: 'Split Ledgestone',
  cs: 'Castlestone',
  as: 'Ashlarstone',
  rb: 'Rustic Brick',
  cl: 'Chiseled Limestone',
  tl: 'Tumbled Ledgestone',
  rs: 'Riverstone',
  qf: 'Quick Fit',
  fs: 'Fieldstone',
  ss: 'Stackstone',
};

const getStyleNames = (names) => {
  if (names.length === 1) {
    return styles[names[0]];
  } else {
    return 'Blend of ' + names.map((name) => styles[name]).join(' & ') + '.';
  }
}

const getPhotoGroup = (group) => {
  const fileList = photoData[group];
  return fileList
    // .sort()
    .map((raw) => ({
      src: `img/${raw.file}.jpg`,
      thumbnail: `img/${raw.file}t.jpg`,
      w: raw.w,
      h: raw.h,
      title: getStyleNames(raw.stone) + (raw.detail ? `. ${raw.detail}` : ""),
      stone: raw.stone,
    }));
};

let options = {
  //http://photoswipe.com/documentation/options.html
  showHideOpacity: true,
  getThumbBoundsFn: false,
};

const getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={120}/>
  );
}

const items = getPhotoGroup('gallery');

function App() {
  return (
    <>
      <header>
        <div className="logo">
          <p>SEDONA</p>
          <p>STONE</p>
          <p>VENEER</p>
        </div>
        <div className="description">Family owned & operated local manufacturer of beautiful stone veneer. We are proud to offer our high quality products at factory direct prices.</div>
      </header>
      <nav>
        <ul>
          <li><a href="#photos">Photos</a></li>
          <li><a href="#visit">Visit Us</a></li>
          <li><a href="#stones">Stone Styles</a></li>
          <li><a href="#trim">Trim</a></li>
        </ul>
      </nav>
      <main>
        <section id="photos" className="gallery">
          <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>
        </section>
        <section id="visit">
          <div>left</div>
          <div>right</div>
        </section>
        <section id="stones">
          10 grid in single image?
        </section>
        <section id="trim" className="gallery">
          <PhotoSwipeGallery items={[items[0]]} options={options} thumbnailContent={getThumbnailContent}/>
        </section>

      </main>
      <footer>
      f
      </footer>
    </>
  );
}

export default App;
