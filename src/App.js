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
        <input id="form_name" name="entry.153663014" placeholder="Name" aria-label="Name" type="text" />
        <input id="form_email" name="entry.467162401" placeholder="Email" aria-label="Email address" type="email" />
        <input id="form_phone" name="entry.1630298825" placeholder="Phone" aria-label="Phone number" type="tel" />
        <textarea id="form_message" name="entry.738084605" placeholder="Message" aria-label="Message" rows="3" />
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

function QuotePrompt() {
  return (
    <div className="clear-box-container box-container">
      <h3>For a free quote, please use this form or give us a call. Helpful info includes:</h3>
      <ul>
        <li>Square footage of flat areas</li>
        <li>Linear footage of corners (height)</li>
        <li><b>Stone Style</b> & <b>Color Scheme</b> preferences</li>
        <li>Any Trimstones</li>
        <li>Delivery location or pick-up from our Mesa shop</li>
      </ul>
    </div>
  );
}

function GMap() {
  return (
    <>
      <div className="map-text">
        <h2><a href="https://goo.gl/maps/n1ByS5gEVa5P7KRP7" className="call_to_action">9605 East Main St. Mesa, AZ 85207</a></h2>
        <i>We're at the SE corner of 96th St & Main St (aka Apache Trail), next to Craft City.</i>
        <p><b>Hours:</b>&nbsp;&nbsp;Mon to Fri: 8AM – 4:30PM&nbsp;&nbsp;&nbsp;Sat: Please call ahead for hours.</p>
      </div>
      <iframe
        width="100%"
        height="450"
        frameBorder="0"
        title="map of Sedona Stone Veneer at 9605 East Main St. Mesa, AZ 85207"
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJgVBnsl6wK4cRNDqotuzkOhc&key=AIzaSyCVHr2ug300Slszr1DiJrTCjqvO2Kmddhg&zoom=10"
      ></iframe>
    </>
  );
}

function Phone() {
  return (
    <h2><a className="call_to_action" href="tel:+1-602-845-0004">(602) 845 – 0004</a></h2>
  );
}

function LabeledBox(props) {
  return (
    <div>
      <h2 className="box-label">{props.title}</h2>
      <div className="box-container">
        {props.children}
      </div>
    </div>
  );
}

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  }
}

function App() {
  const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setIsNarrow(window.innerWidth < 600);
    }, 100)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }

  });

  const getThumbnailContent = (item) => {
    const thumbnailSize = isNarrow ? 100 : 120;
    return (
      <img
        src={item.thumbnail}
        width={thumbnailSize}
        height={thumbnailSize}
        alt={item.title}
      />
    );
    }

  return (
    <>
      <header>
        <Logo />
        <div className="description">
          <p>Beautiful stone veneer</p>
          <p>Direct from the factory</p>
          <p><b><a className="call_to_action" href="tel:+1-602-845-0004">(602) 845 - 0004</a></b></p>
        </div>
      </header>
      <div className="nav_logo"><Logo /></div>
      <nav id="navbar">
        <ul>
          <li><a href="#photos">Photos</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#visit">Visit</a></li>
          <li><a href="#stones">Stones</a></li>
          <li><a href="#trim">Trim</a></li>
        </ul>
      </nav>
      <div className="side_tel"><a className="call_to_action" href="tel:+1-602-845-0004">(602) 845 - 0004</a></div>
      <main>
        <span className="nav_anchor" id="photos"></span>
        <section id="" className="gallery">
          <div className="section_description">
            <p><b>Click on photos</b> to see Sedona Stone Veneer projects from across the Southwest. We offer 10 Stone Styles & 9 Color Schemes and a variety of trim stones.</p>
          </div>
          <PhotoSwipeGallery items={galleryItems} options={Object.assign({ galleryUID: 0 }, options)} thumbnailContent={getThumbnailContent}/>
        </section>
        <span className="nav_anchor" id="contact"></span>
        <section id="contact_section">
          <QuotePrompt />
          <LabeledBox title="Message Us">
            <Form />
          </LabeledBox>
          <LabeledBox title="Call Us">
            <Phone />
          </LabeledBox>
          <span className="nav_anchor" id="visit" />
          <LabeledBox title="Visit Us">
            <GMap />
          </LabeledBox>
        </section>
        <span className="nav_anchor" id="stones"></span>
        <section id="stones_section">
          <div className="section_description">
            <h2>10 Stone Styles</h2>
            <p>We offer a wide variety of textures and shapes to fit your tastes.</p>
            <ul>
              <li><b>QUICK FIT</b> multi-stone, segmented layers with no grouting required</li>
              <li><b>ASHLARSTONE</b> slightly worn, shallow textured blocks</li>
              <li><b>FIELDSTONE</b> angled, highly variable stone</li>
              <li><b>RUSTIC BRICK</b> old world style bricks with a weathered surface</li>
              <li><b>CHISELED LIMESTONE</b> roughly hand-carved blocks</li>
              <li><b>TUMBLED LEDGESTONE</b> long, weathered edge layers</li>
              <li><b>RIVERSTONE</b> naturally worn and rounded stones</li>
              <li><b>SPLIT LEDGESTONE</b> angular layers with many unique shapes</li>
              <li><b>CASTLESTONE</b> rectangular blocks with tightly fitting joints</li>
              <li><b>STACKSTONE</b> tightly-fitting, wide layers of smooth rectangular stone</li>
            </ul>
          </div>
          <div className="stonecontainer">
              <img className="sq" src="img/sq_qf.jpg" alt="Stone style: Quick Fit" />
              <img className="sq" src="img/sq_as.jpg" alt="Stone style: Ashlarstone" />
              <img className="sq" src="img/sq_fs.jpg" alt="Stone style: Fieldstone" />

              <img className="rc" src="img/rc_rb.jpg" alt="Stone style: Rustic Brick" />
              <img className="rc" src="img/rc_cl.jpg" alt="Stone style: Chiseled Limestone" />
              <img className="rc" src="img/rc_tl.jpg" alt="Stone style: Tumbled Ledgestone" />
              <img className="rc" src="img/rc_rs.jpg" alt="Stone style: Riverstone" />

              <img className="sq" src="img/sq_sl.jpg" alt="Stone style: Split Ledgestone" />
              <img className="sq" src="img/sq_cs.jpg" alt="Stone style: Castlestone" />
              <img className="sq" src="img/sq_ss.jpg" alt="Stone style: Stackstone" />
          </div>
        </section>
        <section id="colors">
          <div className="section_description">
            <h2>9 Color Schemes</h2>
            <p>Inspired by the striking natural landscapes of the Southwest, our nine Color Schemes range from subtle to vibrant.</p>
            <ul>
              <li><b>BAJA</b> blend of light tans and khaki</li>
              <li><b>WALNUT</b> intense shades of amber</li>
              <li><b>SEDONA</b> hues of red rock country</li>
              <li><b>GRAND CANYON</b> deep, earthy jewel tones</li>
              <li><b>IRONWOOD</b> rich grays with warm accenting</li>
              <li><b>SANTA FE</b> adobe earth tones of the high desert</li>
              <li><b>PRESCOTT</b> warm mountain shades</li>
              <li><b>MESQUITE</b> dark slate and charcoal</li>
              <li><b>OAK CREEK</b> blend of gold, soft beige, eggplant & cream</li>
            </ul>
          </div>
          <div className="stonecontainer">
              <img className="sq" src="img/color_baja.jpg" alt="Stone style: Quick Fit" />
              <img className="sq" src="img/color_wal.jpg" alt="Stone style: Ashlarstone" />
              <img className="sq" src="img/color_sed.jpg" alt="Stone style: Fieldstone" />

              <img className="sq" src="img/color_gc.jpg" alt="Stone style: Chiseled Limestone" />
              <img className="sq" src="img/color_iw.jpg" alt="Stone style: Tumbled Ledgestone" />
              <img className="sq" src="img/color_sf.jpg" alt="Stone style: Riverstone" />

              <img className="sq" src="img/color_pres.jpg" alt="Stone style: Split Ledgestone" />
              <img className="sq" src="img/color_mes.jpg" alt="Stone style: Castlestone" />
              <img className="sq" src="img/color_oak.jpg" alt="Stone style: Stackstone" />
          </div>
        </section>
        <span className="nav_anchor" id="trim"></span>
        <section id="trim_section" className="gallery">
          <div className="section_description">
            <h2>Wide selection of trim</h2>
            <p><b>Click photos to enlarge.</b> For a cohesive look, our trimstones offer accents to complete your project -- wall caps, seating surfaces, finished edges, outlet & doorway surrounds and more.</p>
          </div>
          <PhotoSwipeGallery items={trimItems} options={Object.assign({ galleryUID: 1 }, options)} thumbnailContent={getThumbnailContent}/>
        </section>
      </main>
      <footer>
        <Logo />
        <div className="description">
          <h2><a className="call_to_action" href="tel:+1-602-845-0004">(602) 845 – 0004</a></h2>
          <h3><a href="https://goo.gl/maps/n1ByS5gEVa5P7KRP7" className="call_to_action">9605 East Main St. Mesa, AZ 85207</a></h3>
        </div>
      </footer>
    </>
  );
}

export default App;
