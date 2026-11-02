# Ember & Crema - where to edit what

App.jsx                 only wires hooks + components together (no logic of its own)
config.js               CDN library URLs and the Google Fonts URL

data/                   CONTENT - change text/numbers here, no JSX needed
  steps.js              the six brewing steps (title, copy, chips, side) + step rail labels
  menu.js               drinks and prices
  navigation.js         nav links, footer "Explore" links, social links
  pins.js               positions of the numbered pins on the latte art
  keyframes.js          scroll choreography: camera, pitcher, liquid level, etc. per step

components/             UI pieces (one job each)
  Navbar, Logo, AnchorLink, Button, Reveal (scroll fade-in wrapper)
  Journey -> Hero + StepSection (x6)
  MenuSection -> MenuCard
  Footer -> FooterColumn, NewsletterForm
  ProgressBar, StepRail, PinOverlay, Toast

hooks/                  behaviour
  useToast, useCart, useReveal, usePageHead, useScrollTo
  useCoffeeScene        loads CDN libs, starts smooth scroll + 3D scene, cleans up

scene/                  the 3D scene, one file per object
  createScene.js        builds everything and runs the render loop (start here)
  helpers.js            texture/geometry helpers
  environment.js        reflections + lights
  table.js  mug.js  tableProps.js (saucer, spoon, cinnamon, book)
  liquid.js  portafilter.js  pitcher.js  streams.js (milk/espresso + splash)
  beans.js (physics)  steam.js  motes.js
  timeline.js           scroll timeline (reads data/keyframes.js)
  viewport.js           resize, pointer parallax, tab visibility
  smoothScroll.js       Lenis
  domSync.js            halo, pins, progress bar and step rail follow the scene

styles/                 CSS split by area; index.css imports them in order
  base, glass, nav, sections, pins, menu, footer, effects, responsive

Every scene file exports createX(...) that builds its objects and returns
update(st, fr), which createScene calls once per frame.
  st = animated scroll state (from data/keyframes.js)
  fr = per-frame values (time, exit progress, what is pouring, ...)
