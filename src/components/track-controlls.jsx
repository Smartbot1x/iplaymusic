export default function tracksControll(track) {
  return (
    <>
      <div>track controlls</div>
      <li>
        <span>{track.track.name}</span>
        <span> {track.track.artist}</span>
        <audio controls src="/lukrembo-jay.mp3"></audio>
      </li>
    </>
  );
}
