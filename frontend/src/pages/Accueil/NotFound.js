import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu preload-transitions 1-column  bg-full-screen-image  blank-page blank-page" data-open="click" data-menu="vertical-modern-menu" data-col="1-column">
      <div class="row">
        <div class="col s12">
          <div class="container">
            <div class="section section-404 p-0 m-0 height-100vh">
              <div class="row">
                <div class="col s12 center-align white">
                  <img src="../../../app-assets/images/gallery/error-2.png" class="bg-image-404" alt="" />
                  <h1 class="error-code m-0">404</h1>
                  <h6 class="mb-2">PAGE NOT FOUND</h6>
                  <Link to='/home' class="btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow mb-4">Back To Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound