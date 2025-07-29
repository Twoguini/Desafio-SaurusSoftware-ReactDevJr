import '../style/ErroMessage.css'

type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  return <p className="erro-message">{message}</p>;
}