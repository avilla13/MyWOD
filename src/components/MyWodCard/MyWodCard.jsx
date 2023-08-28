import { Link } from "react-router-dom";
import './MyWodCard.css';

export default function MyWodCard({ myWod, user }) {
  const name = myWod.name;

  return (
    <Link to={`/myWods/${myWod._id}`} >
      <div className="myWod-card" >
        <div className="myWod-info">
          <h3>{myWod.name}</h3>
          <h2>{myWod.type} </h2>
          <div>{ myWod.rounds ? `${myWod.rounds} Rounds of:` : `in ${myWod.duration} minutes:` }</div>
          <ul>
            {myWod.movements && myWod.movements.map((movement, idx) => (
              <li key={idx} >
                {movement.reps} {movement.movement} {movement.weight ? `(${movement.weight})` : `` }
              </li>
            ))}
          </ul>
        </div>
      </div>            
    </Link>
  )
}