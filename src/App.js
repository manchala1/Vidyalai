import "./App.css";
import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import pen from "./pen.svg";
import eraser from "./eraser-fill-svgrepo-com.svg";
import "./components/Eraser";
function App() {
  const canvasStore = useRef(null);
  const [brush, setbrush] = useState(true);

  function erase() {
    setbrush(false);
  }

  function brushColor(color) {
    setbrush(true);
    canvasStore.current.freeDrawingBrush.color = color;
  }
  function brushWidth(width) {
    canvasStore.current.freeDrawingBrush.width = width;
  }
  function eraserBrushWidth(width) {
    canvasStore.current.freeDrawingBrush.width = 10;
  }
  function clear() {
    canvasStore.current.clear();
  }

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.isDrawingMode = true;
    canvasStore.current = canvas;
  }, []);

  useEffect(() => {
    if (!brush) {
      canvasStore.current.freeDrawingBrush = new fabric.EraserBrush(
        canvasStore.current
      );
      canvasStore.current.freeDrawingBrush.width = 5; //minimum width
      canvasStore.current.isDrawingMode = true;
    } else {
      canvasStore.current.freeDrawingBrush = new fabric.PencilBrush(
        canvasStore.current
      );
    }
  }, [brush]);

  return (
    <div className="main">
      <div className="header">
        <div className="box">
          <div className="image" onClick={() => setbrush(true)}>
            <img style={{ width: "40px", height: "40px" }} src={pen} alt="" />
          </div>
          <div className="slidecontainer ">
            <input
              className="slider"
              type="range"
              min="5"
              max="50"
              defaultValue={5}
              onChange={(e) => {
                brushWidth(e.target.value);
              }}
            />
          </div>
          <div
            className="color"
            onClick={() => brushColor("#000")}
            style={{ backgroundColor: "#000" }}
          ></div>
          <div
            className="color"
            onClick={() => brushColor("#008000")}
            style={{ backgroundColor: "#008000" }}
          ></div>
          <div
            className="color"
            onClick={() => brushColor("#FFFF00")}
            style={{ backgroundColor: "#FFFF00" }}
          ></div>
          <div
            className="color"
            onClick={() => brushColor("#0000FF")}
            style={{ backgroundColor: "#0000FF" }}
          ></div>
          <div
            className="color"
            onClick={() => brushColor("#FF0000")}
            style={{ backgroundColor: "#FF0000" }}
          ></div>

          <div className="box">
            <div onClick={() => erase()} className="img2">
              <img
                style={{ width: "36px", height: "34px", margin: "2px" }}
                src={eraser}
                alt=""
              />
            </div>

            <div className="slidecontainer ">
              <input
                className="slider "
                type="range"
                min="5"
                max="50"
                defaultValue={5}
                onChange={(e) => {
                  eraserBrushWidth(e.target.value);
                }}
              />
            </div>
            <div className="button" onClick={() => clear()}>
              Clear
            </div>
          </div>
          <div />
        </div>
      </div>
      <canvas id="canvas" style={{ width: "75%" }} />
    </div>
  );
}

export default App;
