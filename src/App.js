import React from 'react';
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
  if (!names) {
    return '';
  } else if (names.length === 1) {
    return styles[names[0]] + '. ';
  } else {
    return 'Blend of ' + names.map((name) => styles[name]).join(' & ') + '. ';
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
      title: getStyleNames(raw.stone) + (raw.detail ? `${raw.detail}` : ""),
      stone: raw.stone,
    }));
};

let options = {
  showHideOpacity: true,
  getThumbBoundsFn: false,
  shareEl: false,
  captionEl: false,
  fullscreenEl: false,
  zoomEl: false,
  bgOpacity: 0.8,
};

const getThumbnailContent = (item) => {
  return (
    <img
      src={item.thumbnail}
      width={120}
      height={120}
      alt={item.title}
    />
  );
}

const galleryItems = getPhotoGroup('gallery');
const trimItems = getPhotoGroup('trim');

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfyUbgbMsnVviN_Feip4fBi22bhrqixjcXptkcZFH91ydYijA/formResponse', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    }).then((r) => {
      this.setState({
        submitted: true,
      });
    });

    sendTag('form', [...data.values()].toString());
  }

  render() {
    if (this.state.submitted) {
      return (<div className="quote"><h1>Form sent. Thanks!</h1></div>)
    }
    return (
      <form onSubmit={this.handleSubmit} className="quote">
        {/* <div> */}
          <label htmlFor="form_name">Name</label>
          <input id="form_name" name="entry.153663014" type="text" />
        {/* </div> */}
        {/* <div> */}
          <label htmlFor="form_email">Email</label>
          <input id="form_email" name="entry.467162401" type="email" />
        {/* </div> */}
        {/* <div> */}
          <label htmlFor="form_phone">Phone</label>
          <input id="form_phone" name="entry.1630298825" type="tel" />
        {/* </div> */}
        {/* <div> */}
          <label htmlFor="form_message">Message</label>
          <textarea id="form_message" name="entry.738084605" rows="3" />
        {/* </div> */}
        <button>Send</button>
      </form>
    );
  }
}

function sendTag(key, val) {
  const payload = {
    [key]: val,
  }
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }
}

function Logo() {
  return (
    <div className="logo">
      <p>SEDONA</p>
      <p>STONE</p>
      <p>VENEER</p>
    </div>
  );
}

function App() {
  return (
    <>
      <header>
        <Logo />
        <div className="description">
          <p>Local manufacturer of beautiful stone veneer.</p>
          <p>High quality products at factory direct prices.</p>
          <p>Family owned & operated. <b>(602) 845 - 0004</b></p>
        </div>
      </header>
      <nav id="navbar">
        <ul>
          <li><a href="#photos">Photos</a></li>
          <li><a href="#visit">Visit Us</a></li>
          <li><a href="#stones">Stone Styles</a></li>
          <li><a href="#trim">Trim</a></li>
        </ul>
      </nav>
      <main>
        <section id="photos" className="gallery">
          {/* <p>A selection of photos from some of the many Sedona Stone Veneer installations in the Phoenix metro area and across the Southwest. These include remodels, new construction, small updates, homes, businesses, interiors, exteriors, and more. Click photos to enlarge.</p>  */}
          <PhotoSwipeGallery items={galleryItems} options={Object.assign({ galleryUID: 0 }, options)} thumbnailContent={getThumbnailContent}/>
        </section>
        <section id="visit">
          <div className="questions">
            <div className="textcontent">
              <h2>(602) 845 – 0004</h2>
              <i>Give us a call for a free quote & more info. Or use this form:</i>
            </div>
            <Form />
          </div>
          
          <div className="map">
            <div className="textcontent">
              <h2>9605 East Main St. Mesa, AZ 85207</h2>
              <i>At the SE corner of 96th St. & Main St. (Apache Trail), next to Craft City.</i>
              <h3>Mon to Fri: 8 – 4:30</h3>
              <h3>Sat: Please call ahead for hours</h3>
            </div>
            <iframe
              width="100%"
              height="450"
              frameBorder="0"
              title="map of Sedona Stone Veneer at 9605 East Main St. Mesa, AZ 85207"
              src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJgVBnsl6wK4cRNDqotuzkOhc&key=AIzaSyCVHr2ug300Slszr1DiJrTCjqvO2Kmddhg&zoom=10"
            ></iframe>
          </div>
        </section>
        <section id="stones">
          <div className="section_description">
            <h2>10 Stone Styles</h2>
            <p>We offer ten Stone Styles, with a wide variety of textures and shapes to fit your tastes, whether you are looking for something traditional or contemporary.</p>
            <ul>
              <li><b>QUICK FIT</b> has multi-stone, segmented layers with no grouting required.</li>
              <li><b>ASHLARSTONE</b> has slightly worn, shallow texture blocks.</li>
              <li><b>FIELDSTONE</b> has angled, highly variable stone.</li>
              <li><b>RUSTIC BRICK</b> has old world style bricks with a weathered surface.</li>
              <li><b>CHISELED LIMESTONE</b> has roughly hand-carved blocks.</li>
              <li><b>TUMBLED LEDGESTONE</b> has long, weathered edge layers.</li>
              <li><b>RIVERSTONE</b> has naturally worn and rounded stones.</li>
              <li><b>SPLIT LEDGESTONE</b> has angular layers with many unique shapes.</li>
              <li><b>CASTLESTONE</b> has rectangular blocks with tightly fitting joints.</li>
              <li><b>STACKSTONE</b> has tightly-fitting, wide layers of smooth rectangular stone.</li>
            </ul>
          </div>
          <div className="stonecontainer">
            {/* <div className="stonerow"> */}
              <img className="sq" src="img/sq_qf.jpg" alt="Stone style: Quick Fit" />
              <img className="sq" src="img/sq_as.jpg" alt="Stone style: Ashlarstone" />
              <img className="sq" src="img/sq_fs.jpg" alt="Stone style: Fieldstone" />
            {/* </div> */}
            {/* <div className="stonerow"> */}
              <img className="rc" src="img/rc_rb.jpg" alt="Stone style: Rustic Brick" />
              <img className="rc" src="img/rc_cl.jpg" alt="Stone style: Chiseled Limestone" />
              <img className="rc" src="img/rc_tl.jpg" alt="Stone style: Tumbled Ledgestone" />
              <img className="rc" src="img/rc_rs.jpg" alt="Stone style: Riverstone" />
            {/* </div> */}
            {/* <div className="stonerow"> */}
              <img className="sq" src="img/sq_sl.jpg" alt="Stone style: Split Ledgestone" />
              <img className="sq" src="img/sq_cs.jpg" alt="Stone style: Castlestone" />
              <img className="sq" src="img/sq_ss.jpg" alt="Stone style: Stackstone" />
            {/* </div> */}
          </div>
          {/* <div id="spacer" /> */}
        </section>
        <section id="trim" className="gallery">
          <div className="section_description">
            <h2>Wide selection of trim</h2>
            <p>For a cohesive look, our trimstones offer the necessary accents to complete your project. We offer a wide range of trim to cap walls, provide seating surfaces, finish edges, surround outlets and doorways, and more. Trimstones are available in the same wide range of Color Schemes seen above. <b>Click photos to enlarge.</b></p>
          </div>
          <PhotoSwipeGallery items={trimItems} options={Object.assign({ galleryUID: 1 }, options)} thumbnailContent={getThumbnailContent}/>
        </section>
      </main>
      <footer>
        <Logo />
        <div className="description">
          <h2>(602) 845 - 0004</h2>
          <h3>9605 East Main St. Mesa, AZ 85207</h3>
        </div>
      </footer>
    </>
  );
}

export default App;
