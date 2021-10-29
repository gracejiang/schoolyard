import '../styles/App.css'
import React from 'react'
import Calendar from "./Calendar";

function Profile() {
  return (
    <div id="profile" className='wrapper'>
        <div className='profile-header'>
            <button className='settings-button'>Settings</button>
            <div className='bio-info-wrapper'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' className='profile-img' height='300px' width='300px'></img>
                <div className="info-text-wrapper">
                    <h1 className="name-text">Carol Li</h1>
                    <h3 className="desc-text">
                        SEAS 2022
                        <br></br>
                        Computer and Information Science
                        <br></br>
                        <b>22</b> following
                    </h3>
                </div>
            </div>
            <div className='bio'>
                <p>
                    Hi, I’m Carol. This is my short 100 word bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec dui justo. Suspendisse pulvinar facilisis risus, et lacinia orci accumsan nec. Aenean sed odio in libero aliquet hendrerit. In vel tellus ut felis aliquet consequat.
                </p>
            </div>
        </div>
        <div className='schedule'>
            <h2 className='profile-section-text'>Schedule</h2>
            <Calendar/>
        </div>
        <div className='classes-section'>
            <h2 className='section-text'>Classes</h2>
            <div className='classes'>
                {/* TODO(caroljli): make into buttons */}
                <p>CIS 400</p>
                <p>CIS 400</p>
                <p>CIS 400</p>
            </div>
        </div>
        <div className='groups-section'>
            <h2 className='section-text'>Groups</h2>
            <div className='groups'>
                {/* TODO(caroljli): make into buttons */}
                <p>Hack4Impact</p>
                <p>Hack4Impact</p>
                <p>Hack4Impact</p>
            </div>
        </div>
    </div>
  )
}

export default Profile
