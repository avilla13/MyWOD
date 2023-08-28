import { useParams } from "react-router-dom";


export default function WodDetailPage({ user }) {
  let { myWodId } = useParams();

  return (
    <h1>WodDetailPage</h1>
  )
}
