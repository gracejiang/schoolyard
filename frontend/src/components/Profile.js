import '../styles/App.css'
import React from 'react'

function Profile() {
  return (
    <div className='profile-wrapper'>
        <div classname='profile-header'>
            <div classname='bio-wrapper'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' classname='profile-img' height='200px' width='200px'></img>
                <div classname="profile-bio-wrapper">
                    <h1 classname="name-text">Carol Li</h1>
                    <h3 classname="desc-text">SEAS 2022</h3>
                    <h3 classname="desc-text">Major: Computer and Information Science</h3>
                    <h3 classname="desc-text"><b>22</b> following</h3>
                </div>
            </div>
            <div classname='bio'>
                <p>
                    Hi, I’m Carol. This is my short 100 word bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec dui justo. Suspendisse pulvinar facilisis risus, et lacinia orci accumsan nec. Aenean sed odio in libero aliquet hendrerit. In vel tellus ut felis aliquet consequat.
                </p>
            </div>
            <button classname='settings-button'>Settings</button>
        </div>
        <div classname='profile-schedule'>
            <h2 classname='profile-section-text'>Schedule</h2>
            <img src="https://miro.medium.com/max/1015/1*m4uMdohDG5maiJ0dIwqKuQ.png"></img>
        </div>
        <div classname='profile-classes'>
            <h2 classname='profile-section-text'>Classes</h2>
        </div>
        <div classname='profile-groups'>
            <h2 classname='profile-section-text'>Groups</h2>
        </div>
    </div>
  )
}

export default Profile
