import playIcon from "../../../public/play.png";
import sig from "../../../public/sig.png";
import "./ControlAudio.scss";

function ControlAudioDemo() {
  return (
    <div className="controlAudio">
      <button id="ant" className="ant" disabled={true}>
        <img src={sig} alt="" width={25} height={25} />
      </button>
      <button disabled={true}>
        <img src={playIcon} alt="" width={25} height={25} />
      </button>

      <button className="sig" disabled={true}>
        <img src={sig} alt="" width={25} height={25} />
      </button>
      <label>00:00</label>
      <input type="range" className="timeMusic" min={0} value={0} max={100} />
      <label>00:00</label>
    </div>
  );
}

export default ControlAudioDemo;
