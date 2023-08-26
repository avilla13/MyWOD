import { checkToken } from '../../utilities/users-service';

export default function MyWodsPage({ user }){
  async function handleCheckToken(){
    const expDate = await checkToken();
    console.log(expDate);
  }
  return (
    <div>
      <h1>{ user.name }'s WODS </h1>
      <button onClick={handleCheckToken} >Check When My Login Expires</button>
    </div>
  )
}