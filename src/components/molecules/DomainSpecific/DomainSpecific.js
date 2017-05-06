// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"
import * as WhoisActions from "../../../actions/whois"

const buttonStyle = { }
const appKys = ['appraised_value','appraised_wholesale_value','overture_sld','language','category','alexa_link_popularity','alexa_rank',
'appraised_monetization_value', 'overture_term', 'using_previous_sales_data', 'using_sld', 'word_tracker_sld', 'trending', 'traffic_estimate',
'appraised_ignore_tm_value','search_results_phrase','search_ads','search_suggestion_phrase', 'search_results_sld', 'search_ads_sld',
'search_suggestion_sld', 'search_results_tld', 'google_site_index', 'fast_appraisal', 'using_previous_sales_data', 'pagerank',
'pagerank_real', 'traffic_estimate', 'overture_tld', 'overture_sld', 'overture_term', 'word_tracker_sld', 'word_tracker_term',
'alexa_rank', 'alexa_link_popularity', 'dmoz_listed', 'is_adult', 'udrp', 'registrant_name', 'registrant_email', 'avg_sales_price',
'similar_sales','keyword_stats','keyword_stats_ng','sales_history']
const convKys = ['keyword_stats','keyword_stats_ng','sales_history', 'search_suggestion_phrase', 'search_suggestion_sld',
'registrant_name','registrant_email','similar_sales']

export class DomainSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specObj: props.specObj
    }
  }

//
//  genEmpty = () => {
//    let pulled = {}
//    for (var x in appKys) {
//      pulled[appKys[x]] = ""
//    }
//    return pulled
//  }
//
//  formatMeta = (specific, meta) => {
//    if (meta !== undefined){
//      const met = meta.filter(( entry ) => {
//        if ('name' in entry && entry.name === specific){
//          return true
//        }
//        return false
//      })
//      if (met.length > 0) {
//        const meat = JSON.parse(JSON.parse(met[0].meta)).results.appraisal
//        console.log("Meat")
//        console.log(meat)
//        const copy = this.genCopy(meat)
//        return copy
//      } else {
//        return this.genEmpty()
//      }
//    } else {
//      return this.genEmpty()
//    }
//  }
//
//  genCopy = (met) => {
//    let pulled = {}
//    for (var x in appKys){
//      pulled[appKys[x]] = ""
//      if (appKys[x] in met) {
//        let data = met[appKys[x]]
//        if ( convKys.indexOf(appKys[x]) > -1 ) {
//          data = JSON.stringify(data)
//        }
//        pulled[appKys[x]] = data
//      }
//    }
//    return pulled
//  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specObj) !== JSON.stringify(nextProps.specObj))
    {
      console.log("Spec Changed!")
      console.log(nextProps.specObj)
      this.setState({ specObj: nextProps.specObj })
    }
  }

  renderKey = (dom, idx) => {
    return (
      <div key={ idx }>
        <span>{ dom }</span>
      </div>
    )
  }

  render() {
    const { specObj } = this.state
    console.log(specObj)
    if (specObj !== undefined && 'name' in JSON.parse(specObj)){
      const sObj = JSON.parse(specObj)
      console.log(sObj)
      const pulled = sObj.meta
      console.log( pulled )
      return (
        <div className={ styles.root }>
          <h1>{ sObj.name }</h1>
          <div style={{ "width": "220px", "border" : "1px solid black", "margin" : "1em", "padding" : "1em" }}>
            <div style={{ display: pulled['appraised_value'] ? 'block' : 'none' }}>Appraised Value: ${ pulled['appraised_value'] }.00</div>
            <div style={{ display: pulled['appraised_wholesale_value'] ? 'block' : 'none' }}>Wholesale Value: ${ pulled['appraised_wholesale_value'] }.00</div>
          </div>
          <BackButton redirect="domain" style={ buttonStyle }>Back</BackButton>
        </div>
      )
    } else {
      return <div>error</div>
    }
  }
}

DomainSpecific.propTypes = {
  specObj: PropTypes.string,
}

function mapStateToProps(state) {
  const { specObj } = state.domain
  return {
    specObj,
  }
}

export default connect(mapStateToProps)(DomainSpecific)