import { useRef } from "react";
import "./welcome.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setRouteLocation} from '../../redux/store';
export default function WelcomeBody() {
  const canvasRef = useRef();
  const canvasTRef = useRef();
  const welcomeRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.93;
      canvas.height = window.innerHeight * 0.95;

    function drawCol(start_point_horizontal,end_point_horizontal) {
      context.beginPath();
      context.strokeStyle = "#008cd2";
      for (let i = 0; i < canvas.width; i += 40) {
        context.moveTo(i, start_point_horizontal);
        context.lineTo(i, end_point_horizontal);
      }
      context.lineWidth = "1";
      context.stroke();
    }

    function drawRow(start_point_vertical,end_point_vertical) {
      context.beginPath();
      context.strokeStyle = "#008cd2";
      for (let j = 0; j < canvas.height; j += 40) {
        context.moveTo(start_point_vertical, j);
        context.lineTo(end_point_vertical, j);
      }
      context.lineWidth = "1";
      context.stroke();
    }
    animata(0, 0,40, 40);
    function handleResize() {
      canvas.width = window.innerWidth * 0.93;
      canvas.height = window.innerHeight * 0.95;
      animata(0, 0,40, 40);
    }
    window.addEventListener("resize", handleResize);

    function animata(start_point_horizontal, start_point_vertical ,end_point_vertical, end_point_horizontal) {
        if (
          start_point_vertical <= canvas.width+40
        ) {
          drawRow(start_point_vertical,end_point_vertical);
          start_point_vertical = end_point_vertical;
          end_point_vertical += 40;
          setTimeout(() => {
            requestAnimationFrame(() =>
              animata(start_point_horizontal, start_point_vertical ,end_point_vertical, end_point_horizontal)
            );
        //   }, 100*canvas.width/end_point_vertical); // Delay between rows in milliseconds
        }, 100*end_point_vertical/canvas.width); 
        } else if (start_point_horizontal <= canvas.height+40) {
          drawCol(start_point_horizontal,end_point_horizontal);
          start_point_horizontal = end_point_horizontal;
          end_point_horizontal += 40;
          setTimeout(() => {
            requestAnimationFrame(() =>
              animata(start_point_horizontal, start_point_vertical,end_point_vertical, end_point_horizontal)
            );
        //   }, 100*canvas.height/end_point_horizontal); // Delay between columns in milliseconds
        }, 100*end_point_horizontal/canvas.height); // Delay between columns in milliseconds
        }
      }



      
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    const canvas = canvasTRef.current;
    const context = canvas.getContext("2d");
    const lineSpacing = 40;
    const animationSpeed = 0.5; // Adjust animation speed
    let offset = 0;

    canvas.width = 160;
    canvas.height = 160;

    function drawLines() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw horizontal lines
      for (let j = 0; j < canvas.height; j += lineSpacing) {
        context.beginPath();
        context.moveTo(0, (j + offset) % canvas.height);
        context.lineTo(canvas.width, (j + offset) % canvas.height);
        context.strokeStyle = "#3ec6b6";
        context.lineWidth = 1;
        context.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i < canvas.width; i += lineSpacing) {
        context.beginPath();
        context.moveTo((i + offset) % canvas.width, 0);
        context.lineTo((i + offset) % canvas.width, canvas.height);
        context.strokeStyle = "#3ec6b6";
        context.lineWidth = 1;
        context.stroke();
      }

      offset += animationSpeed;

      requestAnimationFrame(drawLines);
    }

    drawLines();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  function handleEnterClick()
  {
    const welcome = welcomeRef.current;
    const meshCanvas = canvasTRef.current;
    welcome.style.animation = 'animata-fadeAway 0.5s linear 0s 1 forwards';
    meshCanvas.style.animation = 'animata-translateToRight 4s linear 0s 1 forwards';
    setTimeout(()=> {
      dispatch(setRouteLocation(1));
    },1100)
  }

  return (
    <>
      <div className="welcome-container" ref={welcomeRef}>
        <canvas ref={canvasRef} className="canvas-class"></canvas>
        <canvas ref={canvasTRef} className="mesh d-none d-sm-block">
        </canvas>
        <div className="main-logo-container">
          <img
            src={"../../../assets/nasaOriginalBlack.png"}
            className="logo-image"
          ></img>
          <p className="main-heading">Exo Planet Archives</p>
          <div className="loading-bar-container" onClick={handleEnterClick}>
            <div className="top-bar"></div>
            <div className="welcome-progress-bar"><div className="progress-track"><div className="enter-text">Enter</div></div></div>
            <div className="bottom-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
