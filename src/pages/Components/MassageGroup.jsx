import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';



const MassageGroup = () => {

    const db = getDatabase();

    let [myGrouplist, setmyGrouplist] = useState([]);
    let [member, setMember] = useState([]);

    let userData = useSelector((state)=> state.loguser.loginUser);


    useEffect(()=>{
        const groupRef = ref(db, 'groups');
          onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                arr.push({...item.val(),groupid:item.key})
            })
            setmyGrouplist(arr)
        });
    },[])


    useEffect(()=>{
        const groupRef = ref(db, 'members');
          onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{        
                    arr.push(item.val())
            })
            setMember(arr)  
        });
    },[])

  return (
    <div className='box'>

    {myGrouplist.map(item=>(
            userData.uid == item.adminid ? 
             (
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
        <Button onClick={()=>handleOpen2(item)} size='small' variant="contained" color='success'>member</Button>
        </div>
    </div>
            )
            :
            member.map(mes=>(mes.userid == userData.uid && item.groupid == mes.groupid && 
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
        <Button onClick={()=>handleOpen2(item)} size='small' variant="contained" color='success'>member</Button>
        </div>
    </div>
                ))
    ))}
    </div>
  )
}

export default MassageGroup