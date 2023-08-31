import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux/es/hooks/useSelector';


const MyGroup = () => {

    const db = getDatabase();

    let [myGrouplist, setmyGrouplist] = useState([])

    let userData = useSelector((state)=> state.loguser.loginUser);

    useEffect(()=>{
        const groupRef = ref(db, 'groups');
          onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                console.log(item.val())
                arr.push(item.val())
            })
            setmyGrouplist(arr)
        });
    },[])




  return (
<div className='box'>
    <h3 className='title'>Group list
    <Button size='small' variant="contained">Create Group</Button>
    </h3>

    {myGrouplist.map(item=>(
            userData.uid == item.adminid &&
    <div className='list'>
        <div className='img'>
            <img src={profile}/>
        </div>
        <div className='details'>
            <p>Admin:{item.adminname}</p>
            <h4>{item.groupname}</h4>
            <p>{item.grouptagline}</p>
        </div>
        <div className='join_button'>
        <Button size='small' variant="contained">join</Button>
        </div>
    </div>
    ))}
</div>
  )
}

export default MyGroup