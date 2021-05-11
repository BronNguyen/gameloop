export default () => {
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 270;
    const context = canvas.getContext("2d");

    document.body.insertBefore(canvas, document.body.childNodes[0]);
  
    return canvas;
  };