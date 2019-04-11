export const getBrowserSize = () => ({
  width: document.body.clientWidth,
  height: window.innerHeight,
});

export const onBrowserResize = (el) => {
  const { width, height } = getBrowserSize();
  el.style.width = width + 'px';
  el.style.height = height + 'px';
};

export const handleBrowserResize = () => {
  onBrowserResize(window.canvas);
  window.addEventListener("resize", () => onBrowserResize(window.canvas), false);
};
