import { checkToken } from '../../utilities/users-service';

export default function MyWodsPage(){
  async function handleCheckToken(){
    const expDate = await checkToken();
    console.log(expDate);
  }
  return (
    <div>
      <h1>My WODS Page</h1>
      <button onClick={handleCheckToken} >Check When My Login Expires</button>
    </div>
  )
}