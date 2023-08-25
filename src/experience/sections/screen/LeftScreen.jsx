import "./screens.css";

const LefttScreen = () => {
  return (
    <>
      <div className="screen-container">
        <h1>Programming Languages & Stacks</h1>
        <ul>
          <li>
            Python
            <ul>
              <li>PyTorch</li>
              <li>FastAPI</li>
              <li>Flask</li>
              <li>NumPy</li>
              <li>pandas</li>
            </ul>
          </li>
          <li>
            Java
            <ul>
              <li>Spring</li>
              <li>JavaFX</li>
            </ul>
          </li>
          <li>
            JavaScript (TypeScript)
            <ul>
              <li>Angular</li>
              <li>Node.js</li>
              <li>React</li>
            </ul>
          </li>
          <li>
            SQL / MongoDB
          </li>
          <li>
            Go
          </li>
          <li>
            C++
          </li>
          <li>
            ARM32 Assembly
          </li>
          <li>
            Haskell
          </li>
          <li>
            R
          </li>
          <li>
            MATLAB
          </li>
        </ul>
      </div>
    </>
  );
};

export default LefttScreen;
