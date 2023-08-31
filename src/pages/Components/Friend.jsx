import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, set, push, onValue, remove, DataSnapshot } from 'firebase/database';
import { updateCurrentUser } from 'firebase/auth';
import { useSelector } from 'react-redux/es/hooks/useSelector';



const Friend = () => {

    const db = getDatabase()
    
    let [friend,setFriends] = useState([]);
    
    let userData = useSelector((state) => state.loguser.loginUser);


    useEffect(() => {
        const friendsRef = ref(db, "friends");
        onValue(friendsRef, (snapshot)=>{
            let arr = []
            snapshot. forEach(item=>{

                if(
                    item.val().whosendid == userData.uid 
                    ||
                    item.val().whoreceiveid == userData.uid
                    ){
                    arr.push({...item.val(), id:item.key});
                }

            });
            setFriends(arr);
            console.log(arr);
        });
    },[]);


    let handleUnFriend = (item) => {
        remove(ref(db, "friends/" + item.id))
    }

    let handleBlock = (item) => {

        if(userData.uid == item.whosendid){
            set(push(ref(db, "block/")),{
                blockedname: item.whoreceivename,
                blockedid: item.whoreceiveid,
                blockbyid: item.whosendid,
                blockbyname: item.whosendname,
            })
            .then(()=>{
                remove(ref(db, "friends/" + item.id))
            })
        }else{
            set(push(ref(db, "block/")),{
                blockedname: item.whosendname,
                blockedid: item.whosendid,
                blockbyid: item.whoreceiveid,
                blockbyname: item.whoreceivename,
            })
            .then(()=>{
                remove(ref(db, "friends/" + item.id))
            })
        }
    }

  return (
<div className='box'>
    <h3 className='title'>Friend List
    <Button size='small' variant="contained">Create Group</Button>
    </h3>

    {friend.map(item=>(
        <>
        
    <div className='list'>
        <div className='img'>
            <img src={profile}/>
        </div>
        <div className='details'>

            {item.whoreciveid == userData.uid
            ?
            <h4>{item.whoreceivename}</h4>
            :
            <h4>{item.whosendname}</h4>
            }

            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='join_button'>
        <Button size='small' variant="contained" onClick={()=>handleBlock(item)}>Block</Button>
        <Button size='small' variant="contained" color='error'onClick={()=>handleUnFriend(item)}>unfriend</Button>
        </div>
    </div>
        </>
    ))}
</div>
  )
}

export default Friend