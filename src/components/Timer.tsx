
export type TimerProps = {
  time: number;
}

export default function Timer(props: TimerProps ) {
  return <p>{props.time}</p>
}