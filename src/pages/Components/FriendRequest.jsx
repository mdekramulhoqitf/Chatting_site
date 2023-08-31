import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { ListItem } from '@mui/material';
import { useSelector , useDispatch } from "react-redux";



const FriendRequest = () => {


    const db = getDatabase();

    let userData = useSelector((state)=> state.loguser.loginUser);

    let [reqList, setReqList] = useState([])

    useEffect(()=>{
        const friendeRequestRef = ref(db, 'friendrequest' );
           onValue(friendeRequestRef, (snapshot) => {
             let arr = []

             snapshot.forEach(item=>{
                console.log(item.val().whoreceiveid)

                if(item.val().whoreceiveid == userData.uid){
                    arr.push({...item.val(),id:item.key})
                }
             })
             setReqList(arr)
       });
    },[])


    let handleDelete = (id) => {
        remove(ref(db, 'friendrequest/'+id))
    }


    let handleAccept = (item) => {
        set(push(ref(db, 'friends/')), {
            ...item,
          }).then(()=>{
            remove(ref(db, "friendrequest/" + item.id))
          })
    }


  return (
<div className='box'>
    <h3 className='title'>Group list
    <Button size='small' variant="contained">Create Group</Button>
    </h3>

    {reqList.map(item=>(
    <div className='list'>
        <div className='img'>
            <img src={profile}/>
        </div>
        <div className='details'>
            <h3>{item.whosendname}</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='join_button'>
        <Button onClick={()=>handleAccept(item)} size='small' variant="contained">Accept</Button>
        <Button onClick={()=>handleDelete(item.id)} size='small' variant="contained" color='error'>Reject</Button>
        </div>
    </div>
    ))}
</div>
  )
}

export default FriendRequest