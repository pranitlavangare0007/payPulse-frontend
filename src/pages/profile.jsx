import { useEffect, useState } from "react";
import api from "../api";
import "../styles/profile.css";

export function Profile(){

    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function fetchProfile(){
            try{
                const response = await api.get("/profile"); 
              
                setProfile(response.data);
            }
            catch(err){
                console.log("Failed to load profile" ,err);
            }
            finally{
                setLoading(false);
            }
        }

        fetchProfile();
    },[]);

    const maskPhone = (phone)=>{
        if(!phone) return "";
        return "XXXXXX" + phone.slice(-4);
    };

    const maskEmail = (email)=>{
        if(!email) return "";
        const [user,domain] = email.split("@");
        return user.substring(0,3) + "****@" + domain;
    };

    if(loading) return <h3 style={{textAlign:"center"}}>Loading profile...</h3>;

    return(
        <>
      

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-avatar">
                    {profile.name.charAt(0).toUpperCase()}
                </div>

                <h2>{profile.name}</h2>
                <p className="username">@{profile.username}</p>

                <div className="profile-info">

                    <div className="info-row">
                        <span>Email</span>
                        <span>{maskEmail(profile.email)}</span>
                    </div>

                    <div className="info-row">
                        <span>Phone</span>
                        <span>{maskPhone(profile.phoneNumber)}</span>
                    </div>

                    <div className="info-row">
                        <span>Address</span>
                        <span className="address">{profile.address}</span>
                    </div>

                </div>

            </div>

        </div>
        </>
    );
}