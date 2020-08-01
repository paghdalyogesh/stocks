import React from 'react'
import { Link } from 'react-router-dom'
/*import Cookies from 'universal-cookie'
import { api } from '../config'
import { connect } from 'react-redux'
import { fetchHeader } from '../store/actions/headerActions'*/

class Header extends React.Component {

  /*userWebSetting(webID) {
    const cookies = new Cookies();
    cookies.set('webId', webID, { path: '/' });
  }
  componentWillMount() {
    if (this.props.webInfo === null) {
      //this.props.onFetchData();
    }
  }*/
  render() {
    const { error } = this.props;
    /*const cookies = new Cookies();
    let userIds = cookies.get('userID');
     let logoutbtn;
    if (userIds) {
      logoutbtn = <a className="nav-link  text-white" href={api.uiAuth + "log-out"}><i className="fa  fa-sign-out icon32" aria-hidden="true"></i><label className="menuLabel d-none d-md-block">Hi</label></a>
    } else {
      logoutbtn = <a className="nav-link  text-white" href={api.uiAuth}><i className="fa fa-sign-in icon32" aria-hidden="true"></i><label className="menuLabel d-none d-md-block">Login</label></a>
    } */

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <header className="bg-info">
          <div className="d-flex flex-column flex-md-row align-items-center">
            <div className="bg-info flex-fill">
              <h4 className="pl-2"><Link className="text-white" to={'/'}><i className="fa fa-globe icon32"></i>Option Chain</Link></h4>
            </div>
            <nav className="">
              <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-link active text-white" to={'/'}>
                    <i className="fa fa-home icon32"></i>
                    <label className="menuLabel d-none d-md-block">Home</label>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active text-white" to={'/strategy-builder'}>
                    <i className="fa fa-sellsy icon32"></i>
                    <label className="menuLabel d-none d-md-block">Strategy Builder</label>
                  </Link>
                </li>
                {/* 
                userIds && <li className="nav-item">
                    <a className="nav-link  text-white" href={api.uiPeople}>
                      <i className="fa fa-user-circle icon32"></i>
                      <label className="menuLabel d-none d-md-block">Users</label>
                    </a>
                </li>  
                <li className="nav-item">
                  <a className="nav-link  text-white" href={'/optionChainDetail'}>
                    <i className="fa fa-sellsy icon32"></i>
                    <label className="menuLabel d-none d-md-block">Report</label>
                  </a>
                </li> 
                {userIds && <li className="nav-item">
                  <a className="nav-link  text-white" href={api.uiPeople + 'myprofile'}>
                    <i className="fa fa-user icon32"></i>
                    <label className="menuLabel d-none d-md-block">Me</label>
                  </a>
                </li>}
                 <li className="nav-item">
                    <Link className="nav-link  text-white" to={'/postjob'}>
                      <i className="fa fa-plus-circle icon32"></i>
                      <label className="menuLabel d-none d-md-block">Post Jobs</label></Link>
                  </li>  
                  <li className="nav-item">
                  {logoutbtn}
                </li> */}
              </ul>
            </nav>
          </div>
        </header>
      );
    }
  }
}
/*
const mapStatetoProps = (state) => {
  return { webInfo: state.headerReducer.webInfo, error: state.error, }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: (q) => dispatch(fetchHeader())
  }
} 

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
*/
export default Header;