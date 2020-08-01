import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JOBLIST } from '../store/actions/jobListActions'
import Header from '../common/header'
import Footer from '../common/footer'
import OptionChainListCom from '../components/equityDerivatives/optionChainListCom'

class OptionChainList extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      jobFilter: {
        page: 0
      }
    };
  }
  handleData(data) {
    const objFilter = Object.assign(this.state.jobFilter, data);
    this.setState({
      jobFilter: objFilter
    });
    this.props.onFetchData(this.state.jobFilter);
  }
  componentDidMount() {
    this.props.onFetchData('');
    //this.props.onFetchFilter();
    document.title = "Stock option chain";
  }

  render() {
    const { list, filt } = this.props;
    console.log(filt);
    return (
      <div className="rows">
        <Header />
        <div className="row m-0 p-0">
          <div className="col mt-md-2 m-0 p-0">
            <OptionChainListCom pages={this.state.jobFilter.page} list={list} handlerFromParant={this.handleData} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { list: state.optionChainReducer.data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: (q) => dispatch(JOBLIST(q))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(OptionChainList);
