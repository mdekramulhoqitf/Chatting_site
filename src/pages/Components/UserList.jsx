import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,GoogleAuthProvider,signInWithPopup,updateProfile } from "firebase/auth";
import {getDatabase, ref, onValue, set, push, remove} from "firebase/database";

const UserList = () => {
    const db = getDatabase();
    const auth = getAuth(); 
    let [userList,setUserList] = useState([]);
    let [friendRequest,setFriendRequest] = useState([]);
    let [friends,setFriends] = useState([]);
    let [block,setBlock] = useState([]);


    // let userData = useSelector((state) => state.loggedUser.loginUser);
    
    

    useEffect(()=>{
        const usersRef = ref(db, 'friendrequest/');
        onValue(usersRef, (snapshot) => {
         let arr = []
         snapshot.forEach(item=>{
             arr.push(item.val().whoreceiveid+item.val().whosendid);
         });
         setFriendRequest(arr);

     });
    },[]);




    useEffect(()=>{
        const usersRef = ref(db, 'friends/');
        onValue(usersRef, (snapshot) => {
         let arr = []
         snapshot.forEach(item=>{
             arr.push(item.val().whoreceiveid+item.val().whosendid);
         });
         setFriends(arr);
     });
    },[]);
 




    useEffect(()=>{
        const usersRef = ref(db, 'users/');
           onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(auth.currentUser.uid != item.key){
                    arr.push({...item.val(),id:item.key})
                }
            });
            setUserList(arr)
        });

        
        
    },[]);




    useEffect(()=>{
        const usersRef = ref(db, 'block/');
           onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                    arr.push(item.val().blockedid + item.val().blockbyid);
            });
            setBlock(arr)
        });

        
        
    },[]);
    
    


    let handlefriendRequest = (item)=>{

        set(ref(db, 'friendrequest/'+item.id),{
            whosendid: auth.currentUser.uid,
            whosendname: auth.currentUser.displayName,
            whoreceiveid: item.id,
            whoreceivename: item.username
        });
    }

    let handleCancel = (item)=>{
        remove(ref(db, 'friendrequest/'+item.id))
        
    }

    let handleUnblock = (item)=>{

    }


  return (

<div className='box'>
    <h3 className='title'>
        User List
    </h3>
    {userList.map(item=>(
    <div className='list'>
        <div className='img'>
            <img src={profile}/>
        </div>
        <div className='details'>
            <h4>{item.username}</h4>
            <p>{item.email}</p>
        </div>
        <div className='join_button'>
            {friendRequest.includes(item.id+auth.currentUser.uid)
            ?
            (<Button className='cancelBtn' onClick={()=>handleCancel(item)} size="small" variant="contained">-</Button>)
            :
            friendRequest.includes(auth.currentUser.uid + item.id) 
            ?
            (<Button size='small' variant="contained"> Panding </Button>)
            :
            friends.includes(auth.currentUser.uid + item.id) 
            ||
            friends.includes(item.id + auth.currentUser.uid)
            ?
            (<Button size='small' variant="contained" color='success'> Friend </Button>)
            :
            block.includes(auth.currentUser.uid + item.id) 
            ||
            block.includes(item.id + auth.currentUser.uid)
            ?
            (<Button size='small' variant="contained"color='error'> Block </Button>)
            :
            (<Button onClick={()=>handlefriendRequest(item)} size='small' variant="contained">+</Button>)
            }
        </div>
    </div>
    ))}

</div>
  )
}

export default UserList