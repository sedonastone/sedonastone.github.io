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
};

const getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={120}/>
  );
}

const items = getPhotoGroup('gallery');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>hello world.</p>
        <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>

      </header>
    </div>
  );
}

export default App;
